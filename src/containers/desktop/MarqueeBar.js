import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../actions"
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { ComposedChart } from '../commons/ComposedChart'

class MarqueeItem extends React.Component {
    constructor(props) {
        super(props)
        this.genPopover = this.genPopover.bind(this)
        this.state = {
            threshHold: 110,
            data: [
                { hour: 915, index: 110.9808, volume: 1595.6 }, { hour: 1012, index: 109.5505, volume: 1796.6 },
                { hour: 1125, index: 109.0000, volume: 1748.5 }, { hour: 1230, index: 110.1041, volume: 1131.1 },
                { hour: 1305, index: 110.4313, volume: 1336.1 }, { hour: 1442, index: 109.8071, volume: 1067.9 },
            ]
        }
        this.data = [
            { hour: 9, index: 109.0000, volume: 1595.6 }, { hour: 10, index: 110.4802, volume: 1796.6 },
            { hour: 11, index: 110.3331, volume: 1748.5 }, { hour: 12, index: 110.1637, volume: 1131.1 },
            { hour: 13, index: 109.5084, volume: 1336.1 }, { hour: 14, index: 110.7820, volume: 1067.9 },
        ]
        this.data2 = [
            { hour: 900, index: 110.9808, volume: 1595.6 }, { hour: 1000, index: 109.5505, volume: 1796.6 },
            { hour: 1100, index: 109.0000, volume: 1748.5 }, { hour: 1200, index: 110.1041, volume: 1131.1 },
            { hour: 1300, index: 110.4313, volume: 1336.1 }, { hour: 1400, index: 109.8071, volume: 1067.9 },
        ]
        this.data3 = [
            { hour: 9, index: 109.1825, volume: 1595.6 }, { hour: 10, index: 109.3075, volume: 1796.6 },
            { hour: 11, index: 110.8301, volume: 1748.5 }, { hour: 12, index: 110.1019, volume: 1131.1 },
            { hour: 13, index: 109.2077, volume: 1336.1 }, { hour: 14, index: 109.5897, volume: 1067.9 },
        ]
    }

    render() {
        let data = this.props.data
        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={this.genPopover(data)} onEnter={() => this.props.onPause()} onExit={() => this.props.onResume()}>
                <li>
                    <strong className="title">{data.title}</strong>
                    <span className={data.status}>&nbsp;{data.id}</span>
                    <span className="percent">
                        <span className="netchange">&nbsp;{data.netchange}</span>&nbsp;(<span className="changepercentage">{data.changeper}</span>%)
                    </span>
                </li>
            </OverlayTrigger>
        )
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.setState((prevState) => {
        //         return {
        //             threshHold: prevState.threshHold + 0.05
        //         }
        //     })
        // }, 1000)
        setInterval(() => {
            let randomValue = Math.random() > 0.5 ? Math.random() : Math.random() * -1.5
            let randomValue2 = Math.random() > 0.5 ? Math.random() * Math.pow(3, 5) : Math.random() * Math.pow(-3, 5)
            let randomValue3 = Math.random() * 20
            let newData = this.state.data.concat({
                hour: this.state.data.slice(-1)[0].hour + randomValue3,
                index: this.state.data.slice(-1)[0].index + randomValue,
                volume: this.state.data.slice(-1)[0].volume + randomValue2
            })
            this.setState({data: newData})
        }, 2000)
    }

    genPopover(d) {
        let background = this.props.theme.chart.popoverChart.backgroundColor

        const colorBreakPoint = this.state.threshHold //threshold
        const { minIndex, maxIndex } = this.state.data.reduce((result, dataPoint) => ({
            minIndex: (dataPoint.index < result.minIndex || result.minIndex === 0) ? dataPoint.index : result.minIndex,
            maxIndex: (dataPoint.index > result.maxIndex || result.maxIndex === 0) ? dataPoint.index : result.maxIndex,
        }), { minIndex: 0, maxIndex: 0 });
        const { minVolume, maxVolume } = this.state.data.reduce((result, dataPoint) => ({
            minVolume: (dataPoint.index < result.minVolume || result.minVolume === 0) ? dataPoint.index : result.minVolume,
            maxVolume: (dataPoint.index > result.maxVolume || result.maxVolume === 0) ? dataPoint.index : result.maxVolume,
        }), { minVolume: 0, maxVolume: 0 });
        const colorBreakPointPercentage = (1 - ((colorBreakPoint - minIndex) / (maxIndex - minIndex)))
        const dataObject = {
            data: this.state.data,
            width: 500,
            height: 250,
            threshHoldPercentage: colorBreakPointPercentage,
            leftTicks: [109, 110, 111],
            rightTicks: [1000, 4000, 8000],
            threshHold: colorBreakPoint,
            indexDataKey: 'index',
            volumeDataKey: 'volume',
            theme: this.props.theme.chart.popoverChart,
            minIndex: minIndex,
            maxIndex: maxIndex,
            minVolume: minVolume,
            maxVolume: maxVolume
        }
        return (
            <Popover id="popover-trigger-hover-focus" style={{
                width: '550px', maxWidth: 'none', backgroundColor: background,
                border: '2px solid #6790fc'
            }}>
                <ComposedChart dataObject={dataObject}/>
            </Popover>
        )
    }
}


class MarqueeBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onScroll: false,
            onHover: false,
            stack1: [],
            stack2: [],
        }
        this.organizedData = {}
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
            market: '',
            netchange: 0,
            changeper: 0,
        }

        //Hard-coded generated data
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
                <div ref={e => this.slider = e} style={{ "position": "absolute", "width": "3000px", "overflow": "hidden", "white-space": "nowrap", height: '30px' }}>{this.state.stack1}</div>
                <div ref={e => this.slider2 = e} style={{ "position": "absolute", "width": "3000px", "overflow": "hidden", "white-space": "nowrap", "display": "none", height: '30px' }}>{this.state.stack2}</div>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let stockList = nextProps.watchListLocalStockList
        this.data.forEach(stock => {
            let isRemoved = !stockList.find(s => s.mvStockCode == stock.title && s.mvMarketID == stock.market)
            if (isRemoved) {
                let newData = [...this.data]
                newData.splice(newData.indexOf(stock), 1)
                this.data = newData
            }
        })
        stockList.forEach(stock => {
            let isExist = this.data.find(obj => (obj.title == stock.mvStockCode && obj.market == stock.mvMarketID))
            let newDataE = Object.assign({}, this.defaultData)
            if (!isExist) {
                newDataE.id = (Math.floor(Math.random() * 1000) + 1) / 10
                newDataE.title = stock.mvStockCode
                newDataE.market = stock.mvMarketID
                newDataE.status = this.randomSym()
                newDataE.netchange = (Math.floor(Math.random() * 100) + 1) / 1000
                newDataE.changeper = (Math.floor(Math.random() * 100) + 1) / 1000 + 1
                newDataE.value = (Math.floor(Math.random() * 10000000000000) + 1) / 10
                newDataE.volume = (Math.floor(Math.random() * 100000000000) + 1) / 10
                newDataE.advance = (Math.floor(Math.random() * 1000) + 1) / 10
                newDataE.statusValue = '-'
                newDataE.price = (Math.floor(Math.random() * 100000000000) + 1) / 10
                this.data.push(newDataE)
                let hasProp = this.organizedData.hasOwnProperty(stock.mvMarketID)
                this.organizedData[stock.mvMarketID] = hasProp ? this.organizedData[stock.mvMarketID].concat(newDataE) : [].concat(newDataE)
            }
        })
        this.text = this.data.map(dataE => (
            <MarqueeItem data={dataE} onPause={this.onPause.bind(this)} onResume={this.onResume.bind(this)}
                theme={nextProps.theme} />
        ))

        // if (this.state.currentSliderInterval.length > 1) {
        if (this.text.length > this.capacity) {
            //Check whether slider or slider2 to add data
            let currentStackIndex = (this.curSliderObj == this.slider && this.curSliderObj != null) ? "1" : "2";
            let nextStackIndex = currentStackIndex == "1" ? "2" : "1"

            //Compare the number of data's element and slider capacity 
            let nextHead = (this.curHead + this.capacity) % this.text.length
            let nextNextHead = (nextHead + this.capacity) % this.text.length
            this.setState({
                ["stack" + currentStackIndex]: this.getStack(this.curHead, nextHead),
                ["stack" + nextStackIndex]: this.getStack(nextHead, nextNextHead)
            })
            this.curHead = nextNextHead
            // else {
            //     var nextHead = (this.curHead + this.capacity) % this.text.length
            //     var newArray = this.text.slice()
            //     while (this.capacity - newArray.length >= this.text.length) {
            //         newArray = newArray.concat(this.text)
            //     }
            //     this.setState({
            //         ["stack" + nextStackIndex]: newArray.concat(this.getStack(0, nextHead))
            //     })
            // }
        } else {
            let HA = {
                id: 0,
                title: 'HA',
                market: 'HA',
                status: 'decrease',
                netchange: 0,
                changeper: 0
            }
            let HO = {
                id: 1,
                title: 'HO',
                market: 'H0',
                status: 'nocrease',
                netchange: 0,
                changeper: 0
            }
            let OTC = {
                id: 2,
                title: 'OTC',
                market: 'OTC',
                status: 'increase',
                netchange: 0,
                changeper: 0
            }
            let markets = [
                <MarqueeItem theme={nextProps.theme} data={HA} onPause={this.onPause.bind(this)} onResume={this.onResume.bind(this)} />,
                <MarqueeItem theme={nextProps.theme} data={HO} onPause={this.onPause.bind(this)} onResume={this.onResume.bind(this)} />,
                <MarqueeItem theme={nextProps.theme} data={OTC} onPause={this.onPause.bind(this)} onResume={this.onResume.bind(this)} />
            ]
            this.setState({
                stack1: markets,
                stack2: markets
            })
        }
        // } else {
        //     let slicedWidth = (this.marqueeWrapper.offsetWidth - (this.curSliderObj.style.left.replace('px', '')))
        //     this.curSliderObj.style.width = ((Math.ceil(slicedWidth / 200)) * 200) + 'px'
        // }

    }


    // Generate first loop
    componentDidMount() {
        this.props.getLocalStockList()


        window.addEventListener('wheel', this.handleScroll.bind(this))


        this.capacity = Math.round(this.slider.offsetWidth / this.liWidth)
        this.loop()
        this.curSliderObj = this.slider
        this.setState({
            currentSliderInterval: [setInterval((e => (this.animation(this.curSliderObj))).bind(this), 20)],
        })
        this.curSliderObj.style.left = this.marqueeWrapper.offsetWidth + "px";

    }

    componentWillUnmount() {
        window.removeEventListener('wheel', e => (this.handleScroll(e)))
    }

    // Import data into marquee
    loop() {
        if (this.text.length > this.capacity) {
            //Check whether slider or slider2 to add data
            var nextStackIndex = (this.curSliderObj == this.slider && this.curSliderObj != null) ? "2" : "1";

            //Compare the number of data's element and slider capacity 
            var nextHead = (this.curHead + this.capacity) % this.text.length
            this.setState({
                ["stack" + nextStackIndex]: this.getStack(this.curHead, nextHead)
            })
            this.curHead = nextHead
        } else {
            let HA = {
                id: 0,
                title: 'HA',
                market: 'HA',
                status: 'decrease',
                netchange: 0,
                changeper: 0
            }
            let HO = {
                id: 1,
                title: 'HO',
                market: 'H0',
                status: 'nocrease',
                netchange: 0,
                changeper: 0
            }
            let OTC = {
                id: 2,
                title: 'OTC',
                market: 'OTC',
                status: 'increase',
                netchange: 0,
                changeper: 0
            }
            let markets = [
                <MarqueeItem theme={this.props.theme} data={HA} onPause={this.onPause.bind(this)} onResume={this.onResume.bind(this)} />,
                <MarqueeItem theme={this.props.theme} data={HO} onPause={this.onPause.bind(this)} onResume={this.onResume.bind(this)} />,
                <MarqueeItem theme={this.props.theme} data={OTC} onPause={this.onPause.bind(this)} onResume={this.onResume.bind(this)} />
            ]
            this.setState({
                stack1: markets,
                stack2: markets
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
                currentSliderInterval: [this.state.currentSliderInterval[0], setInterval((e => (this.animation(nextSlider))).bind(this), 20)]
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

const mapStateToProps = (state) => {
    return {
        watchListLocalStockList: state.watchlist.watchListLocalStockList
    }
}

const mapDispatchToProps = (dispatch, state) => ({
    getLocalStockList: () => {
        dispatch(actions.getStocksFromLocalStore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MarqueeBar)