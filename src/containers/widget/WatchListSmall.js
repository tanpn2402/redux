import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, 
    OverlayTrigger, Tooltip } from 'react-bootstrap'
import config from "../../core/config"
import Component from "../commons/Component"
import * as utils from "../../utils"
import {TabControl, TabItem} from "../commons/TabControl"
import RecommendTable from "./RecommendTable"
import {Icon}   from "react-fa"


import DataTable from '../commons/table/index'

const MODE_CHANGE = "change"
const MODE_VOL = "volume"
const MODE_PERCENT = "percent"

class WatchListSmall extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ],
            modeView: MODE_CHANGE,
            stockSelected: this.props.instrument,
            listStock: this.props.listInstrumentInWatchList.slice(0),

            activeKey: 1
        }

        this.balance = {
            "mvMatchUpDown": 1.35,
            "mvMatchPercent": 0.555,
            "mvMatchVol": 569.2,
            "mvMatchPrice": 86.56
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stockSelected: nextProps.instrument
        })
        this.onStockChange(nextProps.listInstrumentInWatchList)
        
    }

    changeModeView(mode) {
        this.setState({
            modeView: this.state.modeView == MODE_PERCENT ? MODE_CHANGE : MODE_PERCENT
        })
    }

    onTabChange(key) {
        this.setState({activeKey: key})
    }

    showTooltip(props) {
        return (
            <Tooltip id="tooltip">
                {"QUICK BUY - QUICK SELL"}
            </Tooltip>
        )
        
    }

    _renderTitle(title, i) {
        let theme = this.props.theme.font
        let font = this.state.activeKey == i ? {fontWeight: "bold"} : {fontWeight: "normal"}
        return <div style={font} className="wl-sm-tab-title">{title}</div>
    }

    render() {
        let currency = "VND"
        let {listInstrumentData, listInstrumentInWatchList, listInstrumentInPortfolio, derivativeList} = this.props
        let data = []
        
        // combine: derivative + watchlist
        let listStockCombined = []
        if(this.state.activeKey == 1) {
            listStockCombined = listInstrumentInWatchList.concat(derivativeList)
        } else {
            listStockCombined = listInstrumentInWatchList
        }
        data = listInstrumentData.filter(stock => {
            if(listStockCombined.indexOf(stock.mvStockCode) > -1) {
                return stock
            }
        })
        config.cache.watchlistData = data
        let language = this.props.language.watchlist.header
        let header = [
            {
                title: language.market,
                style: {width: "55px"},
                bodyStyle: {width: "55px"},
                accessor: "mvMarket",
                cell: p => { return <span></span> }
            },
            {
                title: language.stock,
                style: {width: "55px"},
                bodyStyle: {width: "55px"},
                accessor: "mvStockCode",
            },
            {
                title: language.price,
                style: {width: "calc(16% - 30px)", textAlign: "right"},
                bodyStyle: {width: "calc(16% - 30px)", textAlign: "right"},
                accessor: "mvMatchPrice",
                cell: props => {
                    return this.fillColor(props, "mvMatchPrice", "price")
                }
            },
            {
                title: language.volume,
                style: {width: "calc(22% - 25px)", textAlign: "right"},
                bodyStyle: {width: "calc(22% - 25px)", textAlign: "right"},
                accessor: "mvMatchVol",
                cell: props => {
                    return this.fillColor(props, "mvMatchVol", "quantity")
                }
            },
            {
                title: language.totalvol,
                style: {width: "calc(22% - 25px)", textAlign: "right"},
                bodyStyle: {width: "calc(22% - 25px)", textAlign: "right"},
                accessor: "mvMatchVolTotal",
                cell: props => {
                    return this.fillColor(props, "mvMatchVolTotal", "quantity")
                }
            },
            {
                // title:  this.state.modeView == MODE_CHANGE ? language.change : language.volume,
                style: {width: "calc(15% - 30px)", textAlign: "right", paddingRight: "4px"},
                bodyStyle: {width: "calc(15% - 30px)", textAlign: "right", paddingRight: "5px"},
                title: props => {
                    return (
                        <div>
                            <span className="glyphicon glyphicon-menu-left" onClick={e => this.changeModeView(MODE_CHANGE)} 
                                style={{cursor: "pointer"}}></span>
                            <span style={{width: "13px", display: "inline-block", textAlign: "center"}}>
                                {this.state.modeView == MODE_CHANGE ? language.change : language.percent}
                            </span>
                            <span className="glyphicon glyphicon-menu-right" onClick={e => this.changeModeView(MODE_PERCENT)} 
                                style={{cursor: "pointer"}}></span>
                        </div>
                    )

                },
                cell: props => {
                    return this.fillColor(props, this.state.modeView == MODE_CHANGE ? "mvMatchUpDown" : "mvMatchPercent")
                }
                
            },
            {
                title: language.signal,
                style: {width: "15%", textAlign: "center", paddingRight: "4px"},
                bodyStyle: {width: "15%", textAlign: "center"},
                cell: props => {
                    return (
                        <OverlayTrigger overlay={this.showTooltip(props)} >
                            <span style={{color: "#009900"}} className="glyphicon glyphicon-arrow-up"></span>
                         </OverlayTrigger>
                    )
                }
            }
        ]
       
        let theme = this.props.theme
        
        return (
            <Component className="wl-small" theme={theme}>
                <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)} theme={this.props.theme}>
                    <TabItem eventKey={1} title={this._renderTitle(this.props.language.menu.watchlist, 1)} >
                        <div className="wl-sm-table">
                            <TTLTable className="watchlist-small" data={data} header={header} theme={this.props.theme} pivot={"mvMarket"} 
                                getTRowProps={(data) => {
                                    if(data.mvStockCode == this.state.stockSelected) {
                                        return {
                                            style: {
                                                backgroundColor: "rgba(244,186,17,0.4)",
                                                fontWeight: "900"
                                            }
                                        }
                                    } else {
                                        return {
                                            style: {}
                                        }
                                    }
                                    
                                }}
                                getGroupHeaderProps={(data) => {
                                    return {
                                        style: Object.assign({}, theme.table.pivotRow, {paddingLeft: "10px"}),
                                        render: (props) => {
                                            return (
                                                <span className="wl-index">
                                                    <span className="index-name">{props["mvMarket"]}</span>
                                                    <span className="index-vl" style={theme.bindingdata.up}>
                                                        <Icon name="caret-up" />
                                                        <span >{props["mvMarket"] == "HO" ? "1,123.37 (2.92 0.26%)" : props["mvMarket"] == "HA" ? "1,564.71 (3.57 0.23%)" : "1,102.13 (4.84 0.44%)" }</span>
                                                    </span>

                                                    <span className="index-stat">
                                                        <span  style={theme.bindingdata.up}><Icon name="caret-up" /> <span>{props["mvMarket"] == "HO" ? 138 : props["mvMarket"] == "HA" ? 58 : 2 }</span></span>
                                                        <span  style={theme.bindingdata.nochange}><Icon name="caret-down" /> <span>{props["mvMarket"] == "HO" ? 76 : props["mvMarket"] == "HA" ? 70 : 0 }</span></span>
                                                        <span  style={theme.bindingdata.down}><Icon name="square" /> <span>{props["mvMarket"] == "HO" ? 202 : props["mvMarket"] == "HA" ? 88 : 2 }</span></span>                                         
                                                    </span>
                                                    <span className="index-status">Intermission</span>
                                                </span>
                                            )
                                        }
                                    }
                                }}
                                onRowClick={(e, props) => this.onRowClick(e, props) }
                            />
                        </div>
                    </TabItem>
                    <TabItem eventKey={2} title={this._renderTitle(this.props.language.menu.recommendation, 2)} >
                        <div className="wl-sm-table">
                            <TTLTable className="watchlist-small" data={data} header={header} theme={this.props.theme} pivot={"mvMarket"} 
                                getTRowProps={(data) => {
                                    if(data.mvStockCode == this.state.stockSelected) {
                                        return {
                                            style: {
                                                backgroundColor: "rgba(244,186,17,0.4)",
                                                fontWeight: "900"
                                            }
                                        }
                                    } else {
                                        return {
                                            style: {}
                                        }
                                    }
                                    
                                }}
                                getGroupHeaderProps={(data) => {
                                    return {
                                        style: Object.assign({}, theme.table.pivotRow, {paddingLeft: "10px"}),
                                        render: (props) => {
                                            return (
                                                <span className="wl-index">
                                                    <span className="index-name">{props["mvMarket"]}</span>
                                                    <span className="index-vl" style={theme.bindingdata.up}>
                                                        <Icon name="caret-up" />
                                                        <span >{props["mvMarket"] == "HO" ? "1,123.37 (2.92 0.26%)" : props["mvMarket"] == "HA" ? "1,564.71 (3.57 0.23%)" : "1,102.13 (4.84 0.44%)" }</span>
                                                    </span>

                                                    <span className="index-stat">
                                                        <span  style={theme.bindingdata.up}><Icon name="caret-up" /> <span>{props["mvMarket"] == "HO" ? 138 : props["mvMarket"] == "HA" ? 58 : 2 }</span></span>
                                                        <span  style={theme.bindingdata.nochange}><Icon name="caret-down" /> <span>{props["mvMarket"] == "HO" ? 76 : props["mvMarket"] == "HA" ? 70 : 0 }</span></span>
                                                        <span  style={theme.bindingdata.down}><Icon name="square" /> <span>{props["mvMarket"] == "HO" ? 202 : props["mvMarket"] == "HA" ? 88 : 2 }</span></span>                                         
                                                    </span>
                                                    <span className="index-status">Intermission</span>
                                                </span>
                                            )
                                        }
                                    }
                                }}
                                onRowClick={(e, props) => this.onRowClick(e, props) }
                            />
                        </div>

                    </TabItem>
                </TabControl>
              
            </Component>
        )
    }

    onRowClick(e, prop) {
        // this.setState({stockSelected: prop.stockCode})
        this.props.changeInstrument(prop.mvStockCode)

        // console.log(this.props)
        
        let tmp = config.cache.stockList.filter(e => e.stockCode == prop.mvStockCode)
        if(tmp.length > 0) {
            let tp = tmp[0]
            this.props.setDefaultOrderParams({
                mvBS: this.props.portfolioData.filter(el => el.mvStockID == prop.mvStockCode).length > 0 ? "SELL" : "BUY",
                mvStockCode: tp.stockCode,
                mvStockName: tp.stockName,
                mvMarketID: tp.mvMarketID,
                mvQty: prop.mvMatchVol,
                mvPrice: prop.mvMatchPrice
                
            })
        }
    }

    onStockChange(listStock) {
    }

    handleViewModeChange(mode) {
        this.setState({
            modeView: mode
        })
    }

    format(unit, value) {
        if(value == "") {
            return "---"
        }
        if(unit == "price") {
            value = utils.formatCurrency(Number(value).toFixed(2))
            // console.log("-------------PRICE " , value)
            return value
        } else if(unit == "quantity") {
            value = utils.formatQty(Number(Math.ceil(value)).toFixed(0))
            // console.log("-------------quantity " , value)
            return value
        } else {
            return value
        }
    }

    fillColor(props, accessor, isFormated) {

        let refPrice = props["mvReferences"]
        let matchPrice = props["mvMatchPrice"]
        let percent = Math.abs(utils.round( (refPrice - matchPrice) / refPrice * 100, 1))
        let change = Math.abs(utils.round(refPrice - matchPrice, 1))
        

        let theme = this.props.theme.bindingdata
        let child = <span style={theme.normal}>{props[accessor]}</span>

        if(refPrice > matchPrice) {
            if(accessor == "mvMatchUpDown")
                child = <span style={theme.down}>{matchPrice != "" ? "-" + change : "---" }</span>
            else if(accessor == "mvMatchPercent")
                child = <span style={theme.down}>{matchPrice != "" ? percent + "%" : "---"}</span>
            else if(isFormated != undefined)
                child = <span style={theme.down}>{this.format(isFormated, props[accessor])}</span>
            else 
                child = <span style={theme.down}>{props[accessor] == "" ? "---" : props[accessor]}</span>
        }
        else if(refPrice < matchPrice) {
            if(accessor == "mvMatchUpDown")
                child = <span style={theme.up}>{matchPrice != "" ? "+" + change : "---" }</span>
            else if(accessor == "mvMatchPercent")
                child = <span style={theme.up}>{matchPrice != "" ? percent + "%" : "---"}</span>
            else if(isFormated != undefined)
                child = <span style={theme.up}>{this.format(isFormated, props[accessor])}</span>
            else 
                child = <span style={theme.up}>{props[accessor] == "" ? "---" : props[accessor]}</span>
        } else {
            if(accessor == "mvMatchUpDown")
                child = <span style={theme.up}>{matchPrice != "" ? "" + change : "---" }</span>
            else if(accessor == "mvMatchPercent")
                child = <span style={theme.up}>{matchPrice != "" ? percent + "%" : "---"}</span>
            else if(isFormated != undefined)
                child = <span style={theme.up}>{this.format(isFormated, props[accessor])}</span>
            else 
                child = <span style={theme.up}>{props[accessor] == "" ? "---" : props[accessor]}</span>
        }
        
        return child
    }

    componentDidMount() {

    }

}

const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
        portfolioData: state.trading.portfolioData.mvPortfolioBeanList,
        listInstrumentInPortfolio: state.trading.listInstrumentInPortfolio,
        listInstrumentData: state.trading.listInstrumentData,

        instrumentData: state.trading.instrumentData,

        // derivative
        derivativeList: state.trading.derivativeList
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },

    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchListSmall)