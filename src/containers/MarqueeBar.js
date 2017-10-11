import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'

export default class MarqueeBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onScroll: false,
            onHover: false,
            stack1: [],
            stack2: [],
            currentSlider: [],
        }

        //HoverFocus event
        var popoverHoverFocus = (title) => {

            return (<Popover id="popover-trigger-hover-focus" title="Thông tin chi tiết">
              <strong>Tên Mã</strong> {title}<br/>
              <strong>Giá</strong> {(Math.floor(Math.random()*1000)+1)/10} VNĐ
            </Popover>)
        }
        
        //Default props
        this.curSliderObj = null
        this.liWidth = 200  //width of every <li>
        this.capacity = 0   //how many <li> does slider contain
        this.curHead = 0    //the index of slider's first <li>'s data
        this.count = 0      //count var to loop
        this.countTemp = 0  //count var for sub-loop after loop
        this.step = 1       //speed
        ////////////////////////
        this.data = []
        this.text = []

        this.defaultData = {
            id: 0,
            title: "",
            status: "",
            netchange: 0,
            changeper: 0,
        }

        //Hard-coded generated data
        for (let i = 0; i < 200; i++) {
            
            var newDataE = Object.assign({},this.defaultData)
            newDataE.id = i
            newDataE.title = this.randomStockCode()
            newDataE.status = this.randomSym()
            newDataE.netchange = (Math.floor(Math.random()*100)+1)/1000
            newDataE.changeper = (Math.floor(Math.random()*100)+1)/1000 + 1
            this.data.push(newDataE)
        }

        this.text = this.data.map(dataE=>(
            <OverlayTrigger key={dataE.key} trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus(dataE.title)} onEnter={this.onPause.bind(this)} onExit={this.onResume.bind(this)}>
                <li>
                    <strong className="title">{dataE.title}</strong>
                    <span className={dataE.status}>&nbsp;{dataE.id}</span>
                    <span className="percent">
                        <span className="netchange">&nbsp;{dataE.netchange}</span>&nbsp;(<span className="changepercentage">{dataE.changeper}</span>%)
                    </span>             
                </li>
            </OverlayTrigger>
        ))
    }

    //For testing
    randomSym() {
        var random = Math.floor(Math.random()*3)+1
        switch (random) {
            case 1: return "increase"
            case 2: return "decrease"
            case 3: return "nocrease"
        }
    }
    randomStockCode() {
        var random = []
        for (var i = 0; i < 3; i++){
            random.push(Math.floor(Math.random()*26)+65)
        }
        return String.fromCharCode(random[0], random[1], random[2])
    }

    render() {
        return (
            <div ref={e => this.marqueeWrapper = e} className="stockMarquee" >
                <div ref={e => this.slider = e} style={{"position":"absolute","width":"3000px","overflow":"hidden","white-space": "nowrap"}}>{this.state.stack1}</div>
                <div ref={e => this.slider2 = e} style={{"position":"absolute","width":"3000px","overflow":"hidden","white-space": "nowrap","display":"none"}}>{this.state.stack2}</div>
            </div>
        )
    }

    // Generate first loop
    componentDidMount() {

        window.addEventListener('wheel',this.handleScroll.bind(this))


        this.capacity = Math.round(this.slider.offsetWidth/this.liWidth)
        this.loop()
        this.curSliderObj = this.slider
        this.setState({
            currentSliderInterval: [setInterval((e=>(this.animation(this.curSliderObj))).bind(this),20)],
        })
        this.curSliderObj.style.left = this.marqueeWrapper.offsetWidth + "px";
        
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', e=>(this.handleScroll(e)))
    }

    // Import data into marquee
    loop(){
        //Check whether slider or slider2 to add data
        var nextStackIndex = (this.curSliderObj == this.slider && this.curSliderObj != null)?"2":"1";

        //Compare the number of data's element and slider capacity 
        if (this.text.length > this.capacity){
            var nextHead = (this.curHead + this.capacity) % this.text.length
            this.setState({
                ["stack"+nextStackIndex]: this.getStack(this.curHead, nextHead)
            })
            this.curHead = nextHead
        } else {
            var nextHead = (this.curHead + this.capacity) % this.text.length
            var newArray = this.text.slice()
            while (this.capacity - newArray.length >= this.text.length) {
                newArray = newArray.concat(this.text)
            }
            this.setState({
                ["stack"+nextStackIndex]: newArray.concat(this.getStack(0, nextHead))
            })
        }
        

    }

    // Render an array from data array by start and end index 
    getStack(start, end) {
        if (end > start) {
            return this.text.slice(start, end)
        }else {
            return this.text.slice(start,this.text.length).concat(this.text.slice(0, end - this.text.length))
        }
    }

    // Make marquee moving
    animation(sliderObj) {
        //Return if marquee is onHover
        if (this.state.onHover){
            return;
        }

        //Check whenether count or tempCount
        var count = (sliderObj==this.curSliderObj)?this.count:this.countTemp

        if (count%this.liWidth==0) {
        }

        //Slide left effect
        count += this.step
        sliderObj.style.left = this.marqueeWrapper.offsetWidth-(count + this.step) + "px"
        
        //Check if the second slider should be render (the first slider have 1 more page width to finish)
        if ((count - sliderObj.offsetWidth) > 0 && this.state.currentSliderInterval.length==1){
            
            //Check which slider to be render next
            var nextSlider = (this.curSliderObj===this.slider)?this.slider2:this.slider
            
            //Show slider
            nextSlider.style.display = "block"
            
            //Prepare data for slider
            this.loop();

            //Add setInterval event
            this.setState({
                currentSliderInterval: [this.state.currentSliderInterval[0],setInterval((e=>(this.animation(nextSlider))).bind(this),20)]
            })
            
        }

        //Set count var to global
        if (sliderObj==this.curSliderObj) {
            this.count = count
        }else {
            this.countTemp = count
        }

        
        //Check stop condition for current slider
        if (count >= sliderObj.offsetWidth + this.marqueeWrapper.offsetWidth){
            clearInterval(this.state.currentSliderInterval[0])
            
            //Switch count and countTemp (reset countTemp to 0)
            this.count = this.countTemp
            this.countTemp = 0

            //Remove current slider's setInterval event
            var newSliderInterval = this.state.currentSliderInterval.slice()
            this.setState({
                currentSliderInterval: [newSliderInterval[1]]
            })

            //Hide current slider and move to beginning position
            sliderObj.style.display = "none"
            sliderObj.style.left = this.marqueeWrapper.offsetWidth + "px"

            if (sliderObj==this.slider) {
                this.curSliderObj = this.slider2
            }else {
                this.curSliderObj = this.slider
            }
        }
    }


    onPause() {
        this.setState({
            onHover: true
        })    
    }

    onResume() {
        if (this.state.onScroll) return
        this.setState({
            onHover: false
        })
    }
    
    handleScroll(e) {
        if (this.state.onHover){
            this.setState({
                onScroll: true
            })

            if (this.count + e.deltaY > this.liWidth &&
                ( this.count + e.deltaY < this.curSliderObj.offsetWidth || 
                    (this.count+e.deltaY >= this.curSliderObj.offsetWidth && this.countTemp > 0))){

                this.count+= e.deltaY
                this.curSliderObj.style.left = this.marqueeWrapper.offsetWidth-this.count + "px"

                
                if (this.countTemp > 0) {
                    this.countTemp += e.deltaY
                    //Check which slider to be render next
                    var nextSlider = (this.curSliderObj===this.slider)?this.slider2:this.slider
                    nextSlider.style.left = this.marqueeWrapper.offsetWidth-this.countTemp + "px"
                }
            }
            
        }
        this.setState({
            onScroll: false
        })
    }
}