import React from 'react'
import moment from 'moment'
import * as d3 from 'd3'

export default class PieChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className="pieChart"></div>
        )
    }

    componentDidMount() {
        var r=100
        var w=this.props.pieSize.width
        var h=this.props.pieSize.height
        let dataValue=this.props.data.map(e=>e.value)
        let colors=['red','#2159a0','orange','pink','green','grey']
        let ordinalScale = d3.scaleOrdinal(d3.schemeCategory10)
        let canvas = d3.select(".pieChart").append("svg")
        .attr("id", "pieChartSVG")
        .attr("viewBox", "10 5 100 100")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("width", w)
        .attr("height", h);
        let radius = 40
        let g = canvas.append("g").attr("transform", "translate(" + 58 + ", " + 45 + ")")
        let pieRender = d3.pie().sort(null).value(d => d.value)
        let path = d3.arc().outerRadius(radius).innerRadius(0)
        let arc = g.selectAll(".arc").data(pieRender(this.props.data)).enter().append("g").attr("id", (d, i) => "arc_" + i).attr("class", "arc")
            .on("mousemove", (d, i) => this.handleMouseMove(canvas, canvas.node(), d, i))
            .on("mouseleave", (d, i) => this.handleMouseLeave(canvas, canvas.node(), d, i))

        arc.append("path").attr("d", path).attr("fill", (d, i) => colors[i]);
        arc.append("svg:text") .attr("transform", function(d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + path.centroid(d) + ")";}).attr("text-anchor", "middle")
                .attr("class", "pieValues").text(function(d, i) { return dataValue[i]})
                .style("fill", "white")

    }

    handleMouseMove(chart, canvas, d, i) {
        d3.selectAll("g.mouse-data-g").remove()
        let [x, y] = d3.mouse(canvas)
        let infoTooltip = chart.append("g").attr("class", "mouse-data-g")
        infoTooltip.append("rect").attr("width", 55).attr("height", 50/4).attr("x", x - 15)
            .attr("y", y + 5).attr("rx", -1).attr("ry", 0)
            .attr("fill", "gray").attr("opacity", 0.9)
            .style("stroke-width", 2);
        let text = infoTooltip.append("text").attr("x", x - 15).attr("y", y + 10)
        let name = text.append("tspan").text("Name: "+ d.data.name).style("font-size", "5px")
        let value = text.append("tspan").attr("x", x - 15).attr("y", y + 10).attr("dy", 5).style("font-size", "5px").text("Value: " + d.data.value)
    }

    handleMouseLeave(chart, canvas) {
        d3.selectAll("g.mouse-data-g").remove()
    }

    // render() {
    //     let backgroundColor = this.props.theme.chart.pieChart.backgroundColor
    //     let rawData = this.props.data
    //     const totalValue = rawData.reduce((prevValue, curValue, curIndex, rawData) => prevValue += curValue.value, 0)
    //     const data = rawData.reduce((prevValue, curValue, curIndex, rawData) => {
    //         return {
    //             totalValue: prevValue.totalValue,
    //             processedData: prevValue.processedData.concat({
    //                 name: curValue.name,
    //                 value: parseFloat(((+curValue.value / +prevValue.totalValue) * 100).toFixed(1))
    //             })
    //         }
    //     }, { totalValue: totalValue, processedData: [] })
    //     const colors = ['#55dde0', '#eac435', '#f2545b', '#927cb7', '#1a181b', '#0fc11e']
    //     return (
    //         <ResponsiveContainer>
    //             <PChart>
    //                 <Pie data={data.processedData}>
    //                     {
    //                         data.processedData.map((entry, index) => {
    //                             return (
    //                                 <Cell key={'cell-' + index} fill={colors[index]} />
    //                             )
    //                         })
    //                     }
    //                 </Pie>
    //                 <Tooltip isAnimationActive={false} formatter={(value, name, entry, index) => {
    //                     return value + '%'
    //                 }} />
    //             </PChart>
    //         </ResponsiveContainer>
    //     )
    // }
}