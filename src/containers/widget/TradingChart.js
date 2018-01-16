import React, { Component } from "react";
import { connect } from "react-redux"
import * as actions from "../../actions"
import Title from "../commons/WidgetTitle"
import Body from "../commons/WidgetBody"
import Chart from "../commons/chart/index"
import moment from "moment"
import Config from "../../core/config"

class TradingChart extends Component {

    constructor(props) {
        super(props)
        this.id = "techanalysis"

        

        this.data = [
            ["2018-01-16 13:35:00", 114.92, 116.13, 114.04, 115.12, 79763890],
            ["2018-01-16 13:36:00", 113.58, 116.18, 113.25, 115.19, 46937190],
            ["2018-01-16 14:10:34", 127.5018, 130.1348, 200.80180000000001, 207.05880000000002, 3397260],
            ["2018-01-16 14:10:39", 123.74, 282.201, 111.0798, 210.37900000000002, 2291253],
            ["2018-01-16 14:10:44", 236.7878, 155.4706, 262.91179999999997, 123.5204, 11002288],
            ["2018-01-16 14:10:49", 203.0432, 272.216, 265.55920000000003, 173.4614, 10771509]
        ]


        this.state = {
            startRender: false,
            data: this.data
        }
    }

    componentDidMount() {
        setInterval( this.simulate.bind(this) , 5000)
    }

    simulate() {
        let _data = this.state.data
        _data.push([
            moment().format("YYYY-MM-DD HH:mm:ss"),
            Math.random().toFixed(6)*200 + 100,
            Math.random().toFixed(6)*200 + 100,
            Math.random().toFixed(6)*200 + 100,
            Math.random().toFixed(6)*200 + 100,
            Math.floor(Math.random() * 10000000) + 2000000
        ])

        this.setState({
            data: _data,
            startRender: !this.state.startRender
        })
    }

    render() {
        // console.log(JSON.parse(JSON.stringify(Config.technical_analysis_setting.inChartList)))

        let theme = this.props.theme.techanalysis.chartConfig
        
        let config = {
            chart: {
                type: Config.technical_analysis_setting.mainChartSeries || 'Candle' /*Line, Area, Candle*/,
                appearance: {
                    strokeDasharray: "Solid",
                    strokeWidth: 1,
                    strokeNormal: theme.chart.appearance.strokeNormal,
                    strokeUp: theme.chart.appearance.strokeUp,
                    strokeDown: theme.chart.appearance.strokeDown,
                    fill: theme.chart.appearance.fill,
                    opacity: theme.chart.appearance.opacity,
                    wickStroke: theme.chart.appearance.wickStroke, // for Candlestick Chart
                    background: theme.chart.appearance.background,
                    theme: theme.chart.appearance.theme
                },
            },

            axis: {
                xAxis: true,
                yAxis: true,

                showGrid: false,
                tickStrokeDasharray: "Solid",
                tickStrokeOpacity: 0.2,
                tickStrokeWidth: 1,

                showTicks: true,
                stroke: theme.axis.stroke,
                tickStroke: theme.axis.tickStroke

            },

            tooltip: {
                fontSize: "12px",
            },

            option: {
                timeline: false,
                control: true,
                editor: true,
            },
            
            inCharts: Config.technical_analysis_setting.inChartList || [] /*[["InChartVol"],["InChartSMA",[60]],["InChartBB"]]*/,
            subCharts: Config.technical_analysis_setting.subChartList || [] /*[["Volume", [], 125], ["RSI", [11], 100], ["MACD", [13,5,3], 125]]*/,
            interactGraph: Config.technical_analysis_setting.interactGraph || {},
            control: theme.control
        }
        console.log(this.state.data)
        
       
        if(this.state.startRender) {
            return (
                <div style={{ height: "100%", position: "relative", backgroundColor: "#FFF" }} className="trd-chart">
                <Chart height={240} rawData={this.state.data} config={config} />
                </div>
            )
        } else {
            return (
                <div style={{ height: "100%", position: "relative", backgroundColor: "#FFF" }} className="trd-chart">
                <Chart height={240} rawData={this.state.data} config={config} />
                </div>
            )
        }

    }

}

class tmpa extends Component {
    render() {
        return (
            
                <Chart height={240} rawData={this.props.data} config={this.props.config} />
           
        )
    }
}
class tmpb extends Component {
    render() {
        return (
                <Chart height={240} rawData={this.props.data} config={this.props.config} />
        )
    }
}
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => ({
    
})



export default connect(mapStateToProps, mapDispatchToProps)(TradingChart)