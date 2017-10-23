import React from 'react'
import { OverlayTrigger, Popover, Table } from 'react-bootstrap'
import { ComposedChart, ReferenceLine, Line, Area, Legend, CartesianGrid, XAxis, YAxis } from 'recharts'

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
        let popoverHoverFocus = (d) => {
            // let popoverchartBackground = this.props.theme.chart == undefined ? undefined : this.props.theme.chart.popoverchart.backgroundColor
            // let popoverchartColor = this.props.theme.chart == undefined ? undefined : this.props.theme.chart.popoverchart.color
            var config = {
                chart: {
                    height: '200',
                    type: 'line',
                    // backgroundColor: popoverchartBackground
                },
                title: {
                    text: ''
                },
                xAxis: {
                    // labels: {
                    //     style: {
                    //         color: popoverchartColor
                    //     }
                    // }
                    // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: '',
                    // labels: {
                    //     style: {
                    //         color: popoverchartColor
                    //     }
                    // }
                },
                navigator: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                series: [
                    {
                        name: 'A',
                        data: [71.4, 80.1, 66.9, 99.9, 58.4, 96.5, 85.4, 51.9, 50.0, 29.9, 19.7, 57.2],
                        type: 'line',
                    },
                    // {
                    //     name: 'B',
                    //     data: [98.74, 43.82, 29.55, 25.7, 57.02, 24.99, 55.75, 80.87, 21.51, 7.34, 46.29, 45.75],
                    //     type: 'area',
                    // },
                    // {
                    //     name: 'C',
                    //     data: [31.8, 8.95, 86.39, 96.33, 78.82, 44.43, 75.36, 59.04, 45.61, 42.93, 94.02, 49.78],

                    // }
                ]
            }
            const data = [
                { name: '09:00', index: 109.0000, volume: 1595.6 }, { name: '10:00', index: 110.4802, volume: 1796.6 },
                { name: '11:00', index: 110.3331, volume: 1748.5 }, { name: '12:00', index: 110.1637, volume: 1131.1 },
                { name: '13:00', index: 109.5084, volume: 1336.1 }, { name: '14:00', index: 110.7820, volume: 1067.9 },
            ]
            const data2 = [
                { name: '09:00', index: 110.9808, volume: 1595.6 }, { name: '10:00', index: 109.5505, volume: 1796.6 },
                { name: '11:00', index: 109.0000, volume: 1748.5 }, { name: '12:00', index: 110.1041, volume: 1131.1 },
                { name: '13:00', index: 110.4313, volume: 1336.1 }, { name: '14:00', index: 109.8071, volume: 1067.9 },
            ]
            const data3 = [
                { name: '09:00', index: 109.1825, volume: 1595.6 }, { name: '10:00', index: 109.3075, volume: 1796.6 },
                { name: '11:00', index: 110.8301, volume: 1748.5 }, { name: '12:00', index: 110.1019, volume: 1131.1 },
                { name: '13:00', index: 109.2077, volume: 1336.1 }, { name: '14:00', index: 109.5897, volume: 1067.9 },
            ]
            const colorBreakPoint = 110 //threshold
            const { min, max } = data2.reduce((result, dataPoint) => ({
                min: (dataPoint.index < result.min || result.min === 0) ? dataPoint.index : result.min,
                max: (dataPoint.index > result.max || result.max === 0) ? dataPoint.index : result.max,
            }), { min: 0, max: 0 });
            const colorBreakPointPercentage = (1 - ((colorBreakPoint - min) / (max - min)))
            return (
                <Popover id="popover-trigger-hover-focus" style={{ width: '550px', maxWidth: 'none', backgroundColor: '#000', color: '#FFF' }}>
                    <ComposedChart
                        data={data2}
                        width={500}
                        height={250}>
                        <defs>
                            <linearGradient x1='0%' x2='0%' y1='0%' y2='100%' id='aaa'>
                                <stop offset='0%' stopColor='#00ff1d' />
                                <stop offset={colorBreakPointPercentage} stopColor='#00ff1d' />
                                <stop offset={colorBreakPointPercentage} stopColor='red' />
                                <stop offset='100%' stopColor='red' />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke='white' />
                        <YAxis yAxisId="left" stroke='white' domain={['dataMin', 'dataMax']} orientation="left" ticks={[109, 110, 111]} />
                        <YAxis type="number" stroke='white' ticks={[1000, 4000, 8000]} domain={['0', 'dataMax + 7000']} yAxisId="right" orientation="right" />
                        <CartesianGrid stroke='black' fill='black' />
                        <ReferenceLine strokeWidth='2' yAxisId="left" stroke='yellow' strokeDasharray="9 9" y={colorBreakPoint} /*the 'y' props is the breakpoint (threshold)*/ />
                        <Line yAxisId="left" type="linear" dot={false} dataKey="index" strokeWidth='2' stroke='url(#aaa)' />
                        <Area yAxisId="right" type="monotone" dataKey='volume' fill="#8884d8" stroke="#7bdff2" />
                    </ComposedChart>
                </Popover>
            )
        }

        //Default props
        this.curSliderObj = null
        this.liWidth = 220  //width of every <li>
        this.capacity = 0   //how many <li> does slider contain
        this.curHead = 0    //the index of slider's first <li>'s data
        this.count = 0      //count var to loop
        this.countTemp = 0  //count var for sub-loop after loop
        this.step = 1       //speed
        this.interval = 20  //interval time gap
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

            var newDataE = Object.assign({}, this.defaultData)
            newDataE.id = (Math.floor(Math.random() * 1000) + 1) / 10
            newDataE.title = this.randomStockCode()
            newDataE.status = this.randomSym()
            newDataE.netchange = (Math.floor(Math.random() * 100) + 1) / 1000
            newDataE.changeper = (Math.floor(Math.random() * 100) + 1) / 1000 + 1
            newDataE.value = (Math.floor(Math.random() * 10000000000000) + 1) / 10
            newDataE.volume = (Math.floor(Math.random() * 100000000000) + 1) / 10
            newDataE.advance = (Math.floor(Math.random() * 1000) + 1) / 10
            newDataE.statusValue = '-'
            newDataE.price = (Math.floor(Math.random() * 100000000000) + 1) / 10


            this.data.push(newDataE)
        }

        this.text = this.data.map(dataE => (
            <OverlayTrigger key={dataE.key} trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus(dataE)} onEnter={this.onPause.bind(this)} onExit={this.onResume.bind(this)}>
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
        var random = Math.floor(Math.random() * 3) + 1
        switch (random) {
            case 1: return "increase"
            case 2: return "decrease"
            case 3: return "nocrease"
        }
    }
    randomStockCode() {
        var random = []
        for (var i = 0; i < 3; i++) {
            random.push(Math.floor(Math.random() * 26) + 65)
        }
        return String.fromCharCode(random[0], random[1], random[2])
    }

    render() {
        return (
            <div ref={e => this.marqueeWrapper = e} className="stockMarquee" >
                <div ref={e => this.slider = e} style={{ "position": "absolute", "width": "2200px", "overflow": "hidden", "white-space": "nowrap" }}>{this.state.stack1}</div>
                <div ref={e => this.slider2 = e} style={{ "position": "absolute", "width": "2200px", "overflow": "hidden", "white-space": "nowrap", "display": "none" }}>{this.state.stack2}</div>
            </div>
        )
    }

    // Generate first loop
    componentDidMount() {

        window.addEventListener('wheel', this.handleScroll.bind(this))


        this.capacity = Math.round(this.slider.offsetWidth / this.liWidth)
        this.loop()
        this.curSliderObj = this.slider
        this.setState({
            currentSliderInterval: [setInterval((e => (this.animation(this.curSliderObj))).bind(this), this.interval)],
        })
        this.curSliderObj.style.left = this.marqueeWrapper.offsetWidth + "px";

    }

    componentWillUnmount() {
        window.removeEventListener('wheel', e => (this.handleScroll(e)))
    }

    // Import data into marquee
    loop() {
        //Check whether slider or slider2 to add data
        var nextStackIndex = (this.curSliderObj == this.slider && this.curSliderObj != null) ? "2" : "1";

        //Compare the number of data's element and slider capacity 
        if (this.text.length > this.capacity) {
            var nextHead = (this.curHead + this.capacity) % this.text.length
            this.setState({
                ["stack" + nextStackIndex]: this.getStack(this.curHead, nextHead)
            })
            this.curHead = nextHead
        } else {
            var nextHead = (this.curHead + this.capacity) % this.text.length
            var newArray = this.text.slice()
            while (this.capacity - newArray.length >= this.text.length) {
                newArray = newArray.concat(this.text)
            }
            this.setState({
                ["stack" + nextStackIndex]: newArray.concat(this.getStack(0, nextHead))
            })
        }


    }

    // Render an array from data array by start and end index 
    getStack(start, end) {
        if (end > start) {
            return this.text.slice(start, end)
        } else {
            return this.text.slice(start, this.text.length).concat(this.text.slice(0, end - this.text.length))
        }
    }

    // Make marquee moving
    animation(sliderObj) {
        //Return if marquee is onHover
        if (this.state.onHover) {
            return;
        }

        //Check whenether count or tempCount
        var count = (sliderObj == this.curSliderObj) ? this.count : this.countTemp

        if (count % this.liWidth == 0) {
        }

        //Slide left effect
        count += this.step
        sliderObj.style.left = this.marqueeWrapper.offsetWidth - (count + this.step) + "px"

        //Check if the second slider should be render (the first slider have 1 more page width to finish)
        if ((count - sliderObj.offsetWidth) > 0 && this.state.currentSliderInterval.length == 1) {

            //Check which slider to be render next
            var nextSlider = (this.curSliderObj === this.slider) ? this.slider2 : this.slider

            //Show slider
            nextSlider.style.display = "block"

            //Prepare data for slider
            this.loop();

            //Add setInterval event
            this.setState({
                currentSliderInterval: [this.state.currentSliderInterval[0], setInterval((e => (this.animation(nextSlider))).bind(this), this.interval)]
            })

        }

        //Set count var to global
        if (sliderObj == this.curSliderObj) {
            this.count = count
        } else {
            this.countTemp = count
        }


        //Check stop condition for current slider
        if (count >= sliderObj.offsetWidth + this.marqueeWrapper.offsetWidth) {
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

            if (sliderObj == this.slider) {
                this.curSliderObj = this.slider2
            } else {
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
        if (this.state.onHover) {
            this.setState({
                onScroll: true
            })

            if (this.count + e.deltaY > this.liWidth &&
                (this.count + e.deltaY < this.curSliderObj.offsetWidth ||
                    (this.count + e.deltaY >= this.curSliderObj.offsetWidth && this.countTemp > 0))) {

                this.count += e.deltaY
                this.curSliderObj.style.left = this.marqueeWrapper.offsetWidth - this.count + "px"


                if (this.countTemp > 0) {
                    this.countTemp += e.deltaY
                    //Check which slider to be render next
                    var nextSlider = (this.curSliderObj === this.slider) ? this.slider2 : this.slider
                    nextSlider.style.left = this.marqueeWrapper.offsetWidth - this.countTemp + "px"
                }
            }

        }
        this.setState({
            onScroll: false
        })
    }
}