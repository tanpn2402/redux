import React from 'react'
import * as d3 from 'd3'
import moment from "moment"
import config from "../../core/config"
import { connect } from "react-redux"

class ComposedChart extends React.Component {
    constructor(props) {
        super(props)

        let data = [
            { time: "09:00", index: 110.00, volume: 1595.6 }
        ]
        let tmp = this.props.tradeLogData.filter(e => e.mvStockCode == this.props.stock/* && e.mvMarket == market*/)
        if(tmp.length > 0) {
            data = tmp[0].data
        }
        this.state = {
            data: data 
        }

        this.draw.bind(this)
        this.theme = this.props.dataObject.theme

        this.xAxisAccessor = "time"
        this.yAxisLineAccessor = "mvIndex"
        this.yAxisAreaAccessor = "mvTotalVol"
        
        console.log(this.props)
        
    }

    render(){
        console.log("RENDER CHAR")
        return(
            <div className="composedChart" style={{ background: this.theme.backgroundColor}} ></div>
        )
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        let {stock, market, tradeLogData} = nextProps
        let tmp = tradeLogData.filter(e => e.mvStockCode == stock/* && e.mvMarket == market*/)
        if(tmp.length > 0) {
            // console.log(tmp[0].data)
            this.setState({
                data: tmp[0].data
            })
        }
    }

    draw() {
        let data = this.state.data.map(data => Object.assign({}, data, { time: this.timeParse(data.time) }))
        console.log(data)
        this.canvas.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "0%")
            .attr("y2", "100%")
            .selectAll("stop")
            .data([
                { offset: "0%", color: '#00ff00' },
                { offset: this.colorBreak, color: '#00ff00' },
                { offset: this.colorBreak, color: '#ff0000' },
                { offset: "100%", color: '#ff0000' }
            ]).enter().append("stop").attr("offset", d => d.offset).attr("stop-color", d => d.color)
        this.canvas.append("path")
            .attr("d", this.areaRender(data))
            .attr("fill", "steelblue");
        this.canvas.append("path")
            .attr("d", this.lineRender(data))
            .attr("stroke", "url(#line-gradient)")
            .attr("fill", "none")
            .attr("stroke-width", 2)
        this.canvas.append("g").attr("transform", "translate(0, " + (this.props.dataObject.height - 20) + ")").attr("stroke", this.theme.color).call(this.xAxis)
        this.canvas.append("g").attr("transform", "translate(40, 0)").attr("stroke", this.theme.color).call(this.yAxisIndex)
        this.canvas.append("g").attr("transform", "translate(" + (this.props.dataObject.width - 40) + ", 0)").attr("stroke", this.theme.color).call(this.yAxisVolume)
        this.canvas.selectAll(".domain").attr("fill", "white")
        this.canvas.append("line").attr("x1", 40).attr("y1", this.yScaleIndex(110)).attr("x2", 460).attr("y2", this.yScaleIndex(110))
            .attr("stroke", this.theme.referenceLine.color).attr("stroke-width", 2).attr("stroke-dasharray", "5, 5")
        this.canvas
            .on("mousemove", () => this.handleMouseMove(this, this.canvas.node()))
            .on("mouseleave", () => this.handleMouseLeave(this, this.canvas.node()))
        this.canvas.selectAll("path.domain").attr("fill", "none")
        this.canvas.selectAll("g.tick line").attr("stroke", "white")
    }

    handleMouseMove(chart, canvas) {
        d3.selectAll("line.mouse-data-line").remove()
        d3.selectAll("g.mouse-data-g").remove()
        let [x, y] = d3.mouse(canvas)
        let timeStamp = this.timeFormat(chart.xScale.invert(x))
        let data = this.state.data.find(data => data.time == timeStamp)
        if (data) {
            chart.canvas.append("line").attr("class", "mouse-data-line").attr("x1", x).attr("y1", 0).attr("x2", x).attr("y2", 230)
                .attr("stroke", "#ff0000").attr("stroke-width", 2)
            let infoTooltip = chart.canvas.append("g").attr("class", "mouse-data-g")
            infoTooltip.append("rect").attr("width", 200).attr("height", 80)
                .attr("x", (x > 280 ? x - 220 : x + 20)).attr("y", (230 - this.yScaleIndex(data.index) < 80 ? 150:this.yScaleIndex(data.index) < 0 ? 0:this.yScaleIndex(data.index)))
                .attr("rx", 5).attr("ry", 5)
                .style("opacity", 0.9)
                .attr("fill", "white")
            let text = infoTooltip.append("text").attr("x", (x > 280 ? x - 170 : x + 70)).attr("y", (230 - this.yScaleIndex(data.index) < 80 ? 175 : this.yScaleIndex(data.index) < 0 ? 25 : this.yScaleIndex(data.index) + 25))
            let time = text.append("tspan").text("Time: " + data.time)
            let index = text.append("tspan").attr("x", (x > 280 ? x - 170 : x + 70)).attr("dy", 20).text("Index: " + data.mvIndex.toFixed(2))
            let volume = text.append("tspan").attr("x", (x > 280 ? x - 170 : x + 70)).attr("dy", 20).text("Volume: " + data.mvTotalVol.toFixed(2))
        }
    }


    handleMouseLeave(chart, canvas) {
        d3.selectAll("line.mouse-data-line").remove()
        d3.selectAll("g.mouse-data-g").remove()
    }

    componentWillUpdate(nextProps, nextState) {
        d3.select("svg#composedChartSVG").remove()
    }

    componentDidUpdate() {
        this.initVariables()
        this.draw()
    }

    componentDidMount() {
        this.initVariables()
        this.draw()
    }



    initVariables() {
        this.timeParse = d3.timeParse("%H:%M")
        this.timeFormat = d3.timeFormat("%H:%M")
        this.canvas = d3
            .select(".composedChart")
            .append("svg")
            .attr("id", "composedChartSVG")
            .attr("width", this.props.dataObject.width)
            .attr("height", this.props.dataObject.height)
        this.xScale = d3.scaleTime()
            .domain([this.timeParse("09:00"), this.timeParse("15:00")])
            .nice(d3.timeHour)
            .range([40, this.props.dataObject.width - 40])
        this.yScaleIndex = d3.scaleLinear()
            .domain([109, 111])
            .range([this.props.dataObject.height - 20, 20]);
        this.yScaleVolume = d3.scaleLinear()
            .domain([50000, 52000])
            .range([this.props.dataObject.height - 20, 20]);
        this.colorBreak = (d3.scaleLinear().domain([109, 111]).range([1, 0]))(110)
        this.xAxis = d3.axisBottom(this.xScale).ticks(d3.timeHour, 1).tickFormat(this.timeFormat)
        this.yAxisIndex = d3.axisLeft(this.yScaleIndex).ticks(4)
        this.yAxisVolume = d3.axisRight(this.yScaleVolume).ticks(3)
        this.lineRender = d3.line()
            .x(d => this.xScale(d[this.xAxisAccessor]))
            .y(d => this.yScaleIndex(d[this.yAxisLineAccessor]))
        this.areaRender = d3.area()
            .x(d => this.xScale(this.xAxisAccessor))
            .y0(230)
            .y1(d => this.yScaleVolume(d[this.yAxisAreaAccessor]))


            
    }
}

const mapStateToProps = (state) => {
    return {
        tradeLogData: state.tradelog.tradeLogData,
        flag: state.tradelog.flag
    }
}

const mapDispatchToProps = (dispatch, state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ComposedChart)