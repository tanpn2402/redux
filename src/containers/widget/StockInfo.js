import React from 'react'
import { connect } from 'react-redux'
import {Col} from 'react-bootstrap'
import * as actions from '../../actions'
import SearchBar from '../commons/SearchBar'
import config from '../../core/config.js'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import ScrollingTabs from './../commons/ScrollingTabs'
import Table from '../commons/PopupTable'
import Chart from "../commons/chart/index"
class BalanceBar extends React.Component {
    render() {
        
        return (
            <div className="balance-bar">
                <div className="balance-title">
                    <div className="-left">
                        <span style={{marginRight: "5px"}}>{this.props.left.label}</span>
                        <span>{this.props.left.value}</span>
                    </div>
                    <div className="-middle">
                        <span>{this.props.title}</span>
                    </div>
                    <div className="-right">
                        <span>{this.props.right.value}</span>
                        <span style={{marginLeft: "5px"}}>{this.props.right.label}</span>
                    </div>
                </div>
                <div className="balance-outer" ref={r => this.Outer = r} 
                    style={{backgroundColor: this.props.background[1]}}>
                    <div className="bar-inner" ref={r => this.Inner = r} 
                        style={{backgroundColor: this.props.background[0]}} >
                    </div>
                </div>

                {
                    !this.props.hasIndex ? null :
                    (
                        <div className="balance-index">
                            <div>
                                <div className="index-icon" ref={r => this.IndexIcon = r} style={{height: "12px"}}>
                                    <span className="glyphicon glyphicon-triangle-top"></span>
                                </div>
                                <div className="index-value" ref={r => this.IndexValue = r}>
                                    <span ref={r => this.Value = r}>{this.props.indexValue}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
    
    componentDidMount() {
        let t = this.Outer.offsetWidth * (this.props.percent > 1 ? 1 : this.props.percent)
        this.Inner.style.width = t + "px"
        if(this.props.hasIndex) {
            if(this.Outer.offsetWidth - t < 7)
                this.IndexIcon.style.paddingLeft = this.Outer.offsetWidth - 14 + "px"
            else 
                this.IndexIcon.style.paddingLeft = t - 7 + "px"
            
            if(this.Outer.offsetWidth - t < this.Value.offsetWidth/2)
                this.IndexValue.style.paddingLeft = this.Outer.offsetWidth - this.Value.offsetWidth + "px"
            else 
                 this.IndexValue.style.paddingLeft = t - this.Value.offsetWidth/2 + "px"
        }
    }

    componentDidUpdate() {
        let t = this.Outer.offsetWidth * (this.props.percent > 1 ? 1 : this.props.percent)
        this.Inner.style.width = t + "px"
        if(this.props.hasIndex) {
            if(this.Outer.offsetWidth - t < 7)
                this.IndexIcon.style.paddingLeft = this.Outer.offsetWidth - 14 + "px"
            else 
                this.IndexIcon.style.paddingLeft = t - 7 + "px"
            
            if(this.Outer.offsetWidth - t < this.Value.offsetWidth/2)
                this.IndexValue.style.paddingLeft = this.Outer.offsetWidth - this.Value.offsetWidth + "px"
            else 
                 this.IndexValue.style.paddingLeft = t - this.Value.offsetWidth/2 + "px"  
        }
    }
}

BalanceBar.defaultProps = {
    left: {
        label: "",
        value: 0
    },
    right: {
        label: "",
        value: 0
    },
    title: "",
    hasIndex: false,
    indexValue: 0,
    background: ["#f47622", "#4990e0"],
    percent: 0.5
}

class StockSearchBox extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="stock-searchbox" style={{background: "#ddd", padding: "0 10px"}}>
                <Col sm={6} style={{display: "table", padding: "5px 0"}}>
                    
                        <label style={{display: "table-cell", whiteSpace: "nowrap"}}>Delayed Quote</label>
                    
                        <div style={{display: "table-cell", width: "100%", paddingLeft: "15px"}}>
                            <input type="text" className="form-control" style={{background: "#9a9a9a", borderRadius: "20px", color: "#FFF"}}/> 
                        </div>
                    
                </Col>
                <Col sm={6} style={{display: "table", padding: "5px 0"}}>
                    <div style={{display: "table-cell", whiteSpace: "nowrap"}}>
                        <label style={{display: "block"}}>Real-time Quote</label>
                        <label style={{display: "block"}}>Available Times:</label>
                    </div>
                    <div style={{display: "table-cell", width: "100%"}}>
                        <div style={{position: "relative"}}>
                            <div style={{position: "absolute", width: "100%", height: "40px", padding: "5px 50px 0 15px"}}>
                                <div style={{width: "100%", height: "30px", background: "#9b9b9b", borderRadius: "7px"}}>
                                    <div style={{width: "40%", height: "100%", background: "#f5a622", 
                                        borderRadius: "inherit", color: "#FFF", fontSize: "18px", padding: "3px 8px"}}>
                                        311
                                    </div>
                                </div>

                            </div>
                            <div style={{position: "absolute", right: "0"}}>
                                <button style={{borderRadius: "99px", background: "#FFF", border: "none", width: "40px", height: "40px", paddingTop: "4px"}}>
                                    <span className="glyphicon glyphicon-refresh"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
        )
    }
}

class StockStatistis extends React.Component {
    constructor(props) {
        super(props)


    }

    render() {

        let data = [
            {
                Header: props => {
                    return <div>Value 1</div>
                },
                value: 0.00
            },
            {
                Header: props => {
                    return <div>Value 2</div>
                },
                value: 0.00
            },
            {
                Header: props => {
                    return <div>Value 3</div>
                },
                value: 0.00
            },
            {
                Header: props => {
                    return <div>Value 4</div>
                },
                value: 0.00
            }
        ]

        return (
            <div className="stock-statistis">
                <div className="-title">
                    <label >ACB BANK</label>
                    <label >ACB</label>
                </div>
                <div style={{display: "table", width: "100%"}}>
                    <Col xs={8}>
                        <p>Nominal</p>
                        <div>
                            <label style={{fontSize: "30px", color: "#48c15c"}}>99.500</label>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <p>Net Change</p>
                        <div>
                            <div style={{color: "#48c15c"}}>+ 120.47</div>
                            <div style={{color: "#48c15c"}}>+ (0.4%)</div>
                        </div>
                    </Col>
                </div>

                <div style={{display: "table", width: "100%", background: "#666", color: "#FFF"}}>
                    <Col xs={6} style={{padding: "6px 10px", borderRight: "1px solid #FFF"}}>
                        <span>Bid</span>
                        {"  "}
                        <span>88.450</span>
                    </Col>
                    <Col xs={6} style={{padding: "6px 10px"}}>
                        <span>Ask</span>
                        {"  "}
                        <span>99.563</span>
                    </Col>
                </div>
                <BalanceBar left={{label: "Buy", value: "45%"}} right={{label: "Sell", value: "55%"}}
                    title="Volume" percent={0.45}/>

                <BalanceBar left={{label: "Low", value: "99.500"}} right={{label: "Hight", value: "110.675"}}
                    title="Today" percent={ (105.600 - 99.500) / (110.675 - 99.500) }
                    background={["#f5a621", "#d8d8d8"]} indexValue={105.600} hasIndex={true}/>


                <div style={{display: "table", width: "100%"}}>
                    <Col xs={6} style={{paddingRight: "10px"}}>
                        <Table language={this.props.language.stockinfo.header} data={data} className="border-line"/>
                    </Col>
                    <Col xs={6} style={{paddingLeft: "10px"}}>
                        <Table language={this.props.language.stockinfo.header} data={data} className="border-line"/>
                    </Col>
                    
                </div>
            </div>
        )
    }
}

class StockInfoDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = []
        for(let i = 0; i < 16; i++) {
            data.push(
                {
                    Header: props => <div>{"Value " + i}</div>,
                    value: 0
                }
            )
        }

        let theme = this.props.theme.techanalysis.chartConfig
        var test = [["2016-09-16 00:00:00", 114.92, 116.13, 114.04, 115.12, 79763890], ["2016-09-19 00:00:00", 113.58, 116.18, 113.25, 115.19, 46937190], ["2016-09-20 00:00:00", 113.57, 114.12, 112.51, 113.05, 34494150], ["2016-09-21 00:00:00", 113.55, 113.989, 112.441, 113.85, 35951900], ["2016-09-22 00:00:00", 114.62, 114.94, 114, 114.35, 31048170], ["2016-09-23 00:00:00", 112.71, 114.79, 111.55, 114.42, 52411070], ["2016-09-26 00:00:00", 112.88, 113.39, 111.55, 111.64, 29800240], ["2016-09-27 00:00:00", 113.09, 113.18, 112.34, 113, 24587490], ["2016-09-28 00:00:00", 113.95, 114.64, 113.43, 113.69, 29608390], ["2016-09-29 00:00:00", 112.18, 113.8, 111.8, 113.16, 35850010], ["2016-09-30 00:00:00", 113.05, 113.37, 111.8, 112.46, 36340670], ["2016-10-03 00:00:00", 112.52, 113.05, 112.28, 112.71, 21634520], ["2016-10-04 00:00:00", 113, 114.31, 112.63, 113.06, 29707270], ["2016-10-05 00:00:00", 113.05, 113.66, 112.69, 113.4, 21400410], ["2016-10-06 00:00:00", 113.89, 114.34, 113.13, 113.7, 28508710], ["2016-10-07 00:00:00", 114.06, 114.56, 113.51, 114.31, 24336440], ["2016-10-10 00:00:00", 116.05, 116.75, 114.72, 115.02, 36087910], ["2016-10-11 00:00:00", 116.3, 118.69, 116.2, 117.7, 63963010], ["2016-10-12 00:00:00", 117.34, 117.98, 116.75, 117.35, 37512930], ["2016-10-13 00:00:00", 116.98, 117.44, 115.72, 116.79, 35041820], ["2016-10-14 00:00:00", 117.63, 118.17, 117.13, 117.88, 35626020], ["2016-10-17 00:00:00", 117.55, 117.84, 116.78, 117.33, 23583810], ["2016-10-18 00:00:00", 117.47, 118.21, 117.45, 118.18, 24308210], ["2016-10-19 00:00:00", 117.12, 117.76, 113.8, 117.25, 19977160], ["2016-10-20 00:00:00", 117.06, 117.38, 116.33, 116.86, 24100150], ["2016-10-21 00:00:00", 116.6, 116.91, 116.28, 116.81, 22527690], ["2016-10-24 00:00:00", 117.65, 117.74, 117, 117.1, 23492650], ["2016-10-25 00:00:00", 118.25, 118.36, 117.31, 117.95, 46820600], ["2016-10-26 00:00:00", 115.59, 115.7, 113.31, 114.31, 66028640], ["2016-10-27 00:00:00", 114.48, 115.86, 114.1, 115.39, 31396130], ["2016-10-28 00:00:00", 113.72, 115.21, 113.45, 113.87, 36792100], ["2016-10-31 00:00:00", 113.54, 114.23, 113.2, 113.65, 26378910], ["2016-11-01 00:00:00", 111.49, 113.77, 110.53, 113.46, 43403760], ["2016-11-02 00:00:00", 111.59, 112.35, 111.23, 111.4, 28174980], ["2016-11-03 00:00:00", 109.83, 111.46, 109.55, 110.98, 26538700], ["2016-11-04 00:00:00", 108.84, 110.25, 108.11, 108.53, 30790930], ["2016-11-07 00:00:00", 110.41, 110.51, 109.46, 110.08, 32361930], ["2016-11-08 00:00:00", 111.06, 111.72, 109.7, 110.31, 24129630], ["2016-11-09 00:00:00", 110.88, 111.32, 108.05, 109.88, 59118740], ["2016-11-10 00:00:00", 107.79, 111.09, 105.83, 111.09, 57097740], ["2016-11-11 00:00:00", 108.43, 108.87, 106.55, 107.12, 34117030], ["2016-11-14 00:00:00", 105.71, 107.809, 104.08, 107.71, 50901380], ["2016-11-15 00:00:00", 107.11, 107.68, 106.1593, 106.57, 32230590], ["2016-11-16 00:00:00", 109.99, 110.23, 106.6, 106.7, 58724080], ["2016-11-17 00:00:00", 109.95, 110.35, 108.83, 109.81, 27623150], ["2016-11-18 00:00:00", 110.06, 110.54, 109.66, 109.72, 28310840], ["2016-11-21 00:00:00", 111.73, 111.99, 110.01, 110.12, 29164190], ["2016-11-22 00:00:00", 111.8, 112.42, 111.4, 111.95, 25931710], ["2016-11-23 00:00:00", 111.23, 111.51, 110.33, 111.36, 27420550], ["2016-11-25 00:00:00", 111.79, 111.87, 110.95, 111.13, 11475920], ["2016-11-28 00:00:00", 111.57, 112.465, 111.39, 111.43, 27054320], ["2016-11-29 00:00:00", 111.46, 112.03, 110.07, 110.78, 28507780], ["2016-11-30 00:00:00", 110.52, 112.2, 110.27, 111.6, 36151450], ["2016-12-01 00:00:00", 109.49, 110.94, 109.03, 110.365, 37034520], ["2016-12-02 00:00:00", 109.9, 110.09, 108.85, 109.17, 26481320], ["2016-12-05 00:00:00", 109.11, 110.03, 108.25, 110, 34113880], ["2016-12-06 00:00:00", 109.95, 110.36, 109.19, 109.5, 26160560], ["2016-12-07 00:00:00", 111.03, 111.19, 109.16, 109.26, 29976030], ["2016-12-08 00:00:00", 112.12, 112.43, 110.6, 110.86, 27049830], ["2016-12-09 00:00:00", 113.95, 114.7, 112.31, 112.31, 34324350], ["2016-12-12 00:00:00", 113.3, 115, 112.49, 113.29, 26176690], ["2016-12-13 00:00:00", 115.19, 115.92, 113.75, 113.84, 43293350], ["2016-12-14 00:00:00", 115.19, 116.2, 114.98, 115.04, 33962370], ["2016-12-15 00:00:00", 115.82, 116.73, 115.23, 115.38, 46286150], ["2016-12-16 00:00:00", 115.97, 116.5, 115.645, 116.47, 44284660]];
        let config = {
            chart: {
                type: "Line",
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
                timeline: true,
                control: true,
                editor: true,
            },

            control: theme.control
        }

        return (
            <div className="stockinfo-detail">
                <Table language={this.props.language.stockinfo.header} data={data} className="border-line"/>
            
                <div className="stockinfo-chart">
                    <Chart height={250} rawData={test} config={config} />
                </div>

            </div>

            
        )
    }
}

class StockInfo extends React.Component {
    constructor(props) {
        super(props)
        this.id = "stockinfo"
        this.myTab = []
        let isExpended = false
        let t1 = config.mobileTab.filter(e => e.id === "trading")
        if(t1.length > 0) {
            let t2 = t1[0].widget.filter(e => e.i === "stockinfo")
            if(t2.length > 0) {
                let t3 = t2[0]
                this.myTab = t3
                if(t3.h == 23) {
                    isExpended = true
                } else {
                    isExpended = false
                }
            }
        }

        this.state = {
            isExpended: isExpended
        }
    }

    render() {
        return (
            <div  style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} widgetID={this.id}
                    theme={this.props.theme} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body key={this.id + "-body-" + (new Date()).getTime()} theme={this.props.theme}>
                    <StockSearchBox {...this.props} />
                    <StockStatistis {...this.props} />
                    
                    {
                        !this.state.isExpended ? null :
                            <StockInfoDetail {...this.props} />
                    }

                    <div style={{position: "absolute", bottom: "0", width: "100%", height: "40px", textAlign: "center", background: "#bc0000"}}>
                        <button style={{border: "none", height: "100%", width: "100%", background: "transparent", color: "#FFF"}}
                            onClick={() => this.expandStockInfoPanel()}>
                            {
                                this.state.isExpended ? " - Less " : " + More "
                            }
                        </button>
                    </div>
                   
                    
                </Body>
            </div>
        )
    }

    expandStockInfoPanel() {
        if(this.myTab != []) {
            if(this.myTab.h == 23) {
                this.myTab.h = 10
            } else {
                this.myTab.h = 23
            }
        }
        this.props.onReloadPageContent()
    }
}




const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onReloadPageContent: () => {
        dispatch(actions.onReloadPageContent())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StockInfo)