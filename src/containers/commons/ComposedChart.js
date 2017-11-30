import React from 'react'
import * as d3 from 'd3'

export class ComposedChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { time: "09:00", index: 110.00, volume: 1595.6 }
                // { time: "10:15", index: 110.4802, volume: 1796.6 },
                // { time: "11:37", index: 110.3331, volume: 1748.5 },
                // { time: "12:02", index: 110.1637, volume: 1131.1 },
                // { time: "13:46", index: 109.5084, volume: 1336.1 },
                // { time: "13:50", index: 110.782, volume: 1067.9 }
            ]
        }
        this.simulateUpdate.bind(this)
        this.draw.bind(this)
        this.theme = this.props.dataObject.theme
    }

    simulateUpdate() {
        let newData = this.state.data.slice(-1).map(data => {
            return {
                time: this.timeFormat(d3.timeMinute.offset(this.timeParse(data.time), 1)),
                index: data.index + Math.round((Math.random() > 0.5 ? Math.random() : Math.random() * (-1)) * 10) / 100,
                volume: data.volume + (Math.random() > 0.5 ? Math.random() * 100 : Math.random() * (-100)),
            }
        })
        this.setState((prevState) => {
            return {
                data: prevState.data.concat(newData[0])
            }
        })
    }

    render(){
        return(
            <div className="composedChart" style={{ background: this.theme.backgroundColor}} ></div>
        )
    }

    draw() {
        let data = this.state.data.map(data => Object.assign({}, data, { time: this.timeParse(data.time) }))
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
            let index = text.append("tspan").attr("x", (x > 280 ? x - 170 : x + 70)).attr("dy", 20).text("Index: " + data.index.toFixed(2))
            let volume = text.append("tspan").attr("x", (x > 280 ? x - 170 : x + 70)).attr("dy", 20).text("Volume: " + data.index.toFixed(2))
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
        this.id = setInterval(() => {
            this.simulateUpdate()
        }, 20)
        setTimeout(() => clearInterval(this.id), 7225)
    }

    componentWillUnmount(){
        if(this.id){
            clearInterval(this.id)
        }
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
            .domain([0, 9000.0])
            .range([this.props.dataObject.height - 20, 20]);
        this.colorBreak = (d3.scaleLinear().domain([109, 111]).range([1, 0]))(110)
        this.xAxis = d3.axisBottom(this.xScale).ticks(d3.timeHour, 1).tickFormat(this.timeFormat)
        this.yAxisIndex = d3.axisLeft(this.yScaleIndex).ticks(4)
        this.yAxisVolume = d3.axisRight(this.yScaleVolume).ticks(3)
        this.lineRender = d3.line()
            .x(d => this.xScale(d.time))
            .y(d => this.yScaleIndex(d.index))
        this.areaRender = d3.area()
            .x(d => this.xScale(d.time))
            .y0(230)
            .y1(d => this.yScaleVolume(d.volume))
    }



    // render() {
    //     let {data, width, height, threshHoldPercentage, leftTicks, rightTicks, threshHold, indexDataKey,
    //         volumeDataKey, theme, minIndex, maxIndex, minVolume, maxVolume} = this.props.dataObject
    //     let font = theme.color
    //     let background = theme.backgroundColor
    //     let increaseColor = theme.increaseLine.color
    //     let decreaseColor = theme.decreaseLine.color
    //     let refColor = theme.referenceLine.color
    //     return (
    //         <ComposedChartRC
    //             data={data}
    //             width={width}
    //             height={height}>
    //             <defs>
    //                 <linearGradient x1='0%' x2='0%' y1='0%' y2='100%' id='gradientLine'>
    //                     <stop offset='0%' stopColor={increaseColor} />
    //                     <stop offset={threshHoldPercentage} stopColor={increaseColor} />
    //                     <stop offset={threshHoldPercentage} stopColor={decreaseColor} />
    //                     <stop offset='100%' stopColor={decreaseColor} />
    //                 </linearGradient>
    //             </defs>
    //             <Tooltip />
    //             <XAxis stroke={font} scale={'point'} ticks={['']} />
    //             <YAxis yAxisId="left" stroke={font} domain={[minIndex, maxIndex]} orientation="left"
    //                 ticks={leftTicks}/>
    //             <YAxis yAxisId="right" stroke={font} ticks={rightTicks}
    //                 domain={['0', maxVolume + 7000]} orientation="right" />
    //             <ReferenceLine strokeWidth='2' yAxisId="left" stroke={refColor}
    //                 strokeDasharray="9 9" y={threshHold} /*the 'y' props is the breakpoint (threshold)*/ />
    //             <Line yAxisId="left" type="linear" dot={false} dataKey={indexDataKey} strokeWidth='2'
    //                 stroke='url(#gradientLine)' isAnimationActive={false} />
    //             <Area yAxisId="right" type="monotone" dataKey={volumeDataKey} fill="#8884d8" stroke="#7bdff2"
    //                  isAnimationActive={false} />
    //         </ComposedChartRC>
    //     )
    // }
}