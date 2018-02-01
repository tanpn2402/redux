import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"
import Component from "../commons/Component"
import * as utils from "../../utils"
import InputSelect from "../commons/InputSelect"

const backgroundStyles = {
    "dark": {
        "bid": {
            backgroundColor: "#0d2b00"
        },
        "ask": {
            backgroundColor: "rgb(71, 71, 71)"
        }
    },
    "light": {
        "bid": {
            backgroundColor: "#edf6e9"
        },
        "ask": {
            backgroundColor: "#feeff1"
        }
    }
}

class BidAskTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : {}
        }
        
    }

    _renderValue(accessor) {
        let theme = this.props.theme.bindingdata
        let style = theme.normal

        if(accessor == "") {
            style = theme.normal
        }
        else if(this.state.data[accessor] > this.state.data["mvReferences"] ) {
            style = theme.up
        } else if(this.state.data[accessor] < this.state.data["mvReferences"]) {
            style = theme.down
        }
        
        return {color: style.color}
    }

    _renderChange() {
       
        let theme = this.props.theme.bindingdata
        let style = theme.nochange

        let refPrice = this.state.data["mvReferences"]
        let matchPrice = this.state.data["mvMatchPrice"]
        
        

        let percent = Math.abs( utils.round( (refPrice - matchPrice) / refPrice * 100, 1) )
        let change = Math.abs( utils.round(refPrice - matchPrice, 1) )

        let className = "nocrease"
        if(matchPrice == "" || matchPrice == undefined ) {
            percent = <span style={{color: style.color}} className="trd-binding">---</span>
            change = <span style={{color: style.color}} className="trd-binding">---</span>
        } 
        else if(refPrice > matchPrice) {
            style = theme.down
            percent = <span style={{color: style.color}} className="trd-binding">{"" + percent + "%"}</span>
            change = <span style={{color: style.color}} className="trd-binding">{"-" + change + ""}</span>
            className = "decrease"
        }
        else if(refPrice < matchPrice) {
            style = theme.up
            percent = <span style={{color: style.color}} className="trd-binding">{"" + percent + "%"}</span>
            change = <span style={{color: style.color}} className="trd-binding">{"+" + change + ""}</span>
            className = "increase"
        } else {
            percent = <span style={{color: style.color}} className="trd-binding">{percent + "%"}</span>
            change = <span style={{color: style.color}} className="trd-binding">{change + ""}</span>
        }

        return <div>{change}
            {<span style={{color: style.color, marginLeft: 3, marginRight: 3}} className={className}></span>}
            {percent}</div>
    }

    _renderTradingStatus() {
        let theme = this.props.theme.font.sub3
        let status = this.props.language.trading.status
        return (
            <div className="trading-status" style={theme}>{status.STATUS_0}</div>
        )
    }
    _renderMatchPrice() {
        let theme = this.props.theme.bindingdata
        let style = theme.nochange
        if(this.state.data["mvMatchPrice"] > this.state.data["mvReferences"] ) {
            style = theme.up
        } else if(this.state.data["mvMatchPrice"] < this.state.data["mvReferences"]) {
            style = theme.down
        }
        let val = this.state.data["mvMatchPrice"]
        if(val == "") {
            val = "---"
        }
        return <div className="match-price" style={style} onClick={e => this.onClick("match")} >{val}</div>
    }

    getValue(data, accessor) {
        if(data[accessor] == null || data[accessor] == 0 || data[accessor] == "" || data[accessor] == "-") {
            return 0
        } else {
            return utils.numUnFormat(data[accessor])
        }
    }

    render() {
        
        let data = []
        let {instrument} = this.props
        console.log("BID ASKKKKKKKKKKKKK", this.props)
        this.state.mvStockSelected = instrument
        let _tmp = this.props.listInstrumentData.filter(e => e.mvStockCode == instrument.stockCode)
        if(_tmp.length > 0) {
            data = _tmp[0]
            this.state.data = data
            data["mvTotalAskVol"] = this.getValue(data, "mvOfferVol1") + this.getValue(data, "mvOfferVol2") + this.getValue(data, "mvOfferVol3")
            data["mvTotalBidVol"] = this.getValue(data, "mvBidVol1") + this.getValue(data, "mvBidVol2") + this.getValue(data, "mvBidVol3")
            
            data["mvTotalAskVol"] = utils.quantityShowFormatter(data["mvTotalAskVol"])
            data["mvTotalBidVol"] = utils.quantityShowFormatter(data["mvTotalBidVol"])
            
        }
        
        let header = this.props.language.stockmarketinform.header
        let theme = this.props.theme

      
        
        return (
            <div className="bidask-table">
                <table>
                    <tbody>
                        <tr className="bidask-row align-center header">
                            <td className="bidask-td status" rowSpan="4">
                                {
                                    this._renderMatchPrice()
                                }
                                {
                                    this._renderChange()
                                }
                                {
                                    this._renderTradingStatus()
                                }
                                
                            </td>
                            <td className="bidask-td core" rowSpan="4">
                                <div style={{height: "16px"}}></div>
                                <div>
                                    <span style={theme.font.main} className="bidask-title">{header.openprice}</span>
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {(utils.formatCurrency(data.mvOpen))}
                                    </span>
                                </div>
                                <div>
                                    <span style={theme.font.main} className="bidask-title">{header.highprice}</span>
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {utils.formatCurrency(data.mvHigh)}
                                    </span>
                                </div>
                                <div>
                                    <span style={theme.font.main} className="bidask-title">{header.lowprice}</span>
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {utils.formatCurrency(data.mvLow)}
                                    </span>
                                </div>
                                <div>
                                    <span style={theme.font.main} className="bidask-title">{header.cell}</span>
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {utils.formatCurrency(data.mvCeiling)}
                                    </span>
                                </div>
                                <div>
                                    <span style={theme.font.main} className="bidask-title">{header.floor}</span>
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {utils.formatCurrency(data.mvFloor)}
                                    </span>
                                </div>
                                <div>
                                    <span style={theme.font.main} className="bidask-title">{header.ref}</span>
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {utils.formatCurrency(data.mvReferences)}
                                    </span>
                                </div>
                                <div style={{height: "21px"}}></div>
                            </td>
                            <td className="bidask-td left">
                                <div><span style={theme.font.main}>{header.BestBid}</span></div>
                            </td>
                            <td className="bidask-td mid"></td>
                            <td className="bidask-td right">
                                <div><span style={theme.font.main}>{header.BestAsk}</span></div>
                            </td>
                            
                        </tr>
                        <tr className="bidask-row">
                            
                            <td className="bidask-td left">
                                <div>
                                    {<span style={theme.font.main} className="bidask-title">{header.total}</span>}
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {utils.formatQty(data.mvTotalBidVol)}
                                    </span>
                                </div>

                            </td>
                            <td className="bidask-td mid pink" style={backgroundStyles[theme.title].ask}>
                                <div><span className="bidask-value binding" onClick={e => this.onClick("ask1")} style={this._renderValue("mvOfferPrice1")}>
                                    {utils.formatCurrency(data.mvOfferPrice1)}</span>
                                </div>
                                <div><span className="bidask-value binding" onClick={e => this.onClick("ask2")} style={this._renderValue("mvOfferPrice2")}>
                                    {utils.formatCurrency(data.mvOfferPrice2)}</span>
                                </div>
                                <div><span className="bidask-value binding" onClick={e => this.onClick("ask3")} style={this._renderValue("mvOfferPrice3")}>
                                    {utils.formatCurrency(data.mvOfferPrice3)}</span>
                                </div>
                            </td>
                            <td className="bidask-td right pink vl-left" style={backgroundStyles[theme.title].ask}>
                                <div>
                                    {/* {<span style={theme.font.main} className="bidask-title">{header.BestAsk + " 1"}</span>} */}
                                    <span className="bidask-value binding" onClick={e => this.onClick("ask1")} style={this._renderValue("")}>
                                        {(utils.formatQty( data.mvOfferVol1 ))}
                                    </span>
                                </div>
                                <div>
                                    {/* <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 2"}</span> */}
                                    <span className="bidask-value binding" onClick={e => this.onClick("ask2")} style={this._renderValue("")}>
                                        {utils.formatQty(data.mvOfferVol2)}
                                    </span>
                                </div>
                                <div>
                                    {/* <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 3"}</span> */}
                                    <span className="bidask-value binding" onClick={e => this.onClick("ask3")} style={this._renderValue("")}>
                                        {utils.formatQty(data.mvOfferVol3)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="bidask-row">
                            <td className="bidask-td left green vl-right" style={backgroundStyles[theme.title].bid}>
                                <div>
                                    {/* {<span style={theme.font.main} className="bidask-title">{header.BestBid + " 1"}</span>} */}
                                    <span className="bidask-value binding" onClick={e => this.onClick("bid1")} style={this._renderValue("")}>
                                        {utils.formatQty(data.mvBidVol1)}
                                    </span>
                                </div>
                                <div>
                                    {/* <span style={theme.font.main} className="bidask-title">{header.BestBid + " 2"}</span> */}
                                    <span className="bidask-value binding" onClick={e => this.onClick("bid2")} style={this._renderValue("")}>
                                        {utils.formatQty(data.mvBidVol2)}
                                    </span>
                                </div>
                                <div>
                                    {/* <span style={theme.font.main} className="bidask-title">{header.BestBid + " 3"}</span> */}
                                    <span className="bidask-value binding" onClick={e => this.onClick("bid3")} style={this._renderValue("")}>
                                        {utils.formatQty(data.mvBidVol3)}
                                    </span>
                                </div>
                                
                            </td>
                            <td className="bidask-td mid green" style={backgroundStyles[theme.title].bid}>
                                <div>
                                    <span className="bidask-value binding" onClick={e => this.onClick("bid1")} style={this._renderValue("mvBidPrice1")}>
                                        {utils.formatCurrency(data.mvBidPrice1)}
                                    </span>
                                </div>
                                <div>
                                    <span className="bidask-value binding" onClick={e => this.onClick("bid2")} style={this._renderValue("mvBidPrice2")}>
                                        {utils.formatCurrency(data.mvBidPrice2)}
                                    </span>
                                </div>
                                <div>
                                    <span className="bidask-value binding" onClick={e => this.onClick("bid3")} style={this._renderValue("mvBidPrice3")}>
                                        {utils.formatCurrency(data.mvBidPrice3)}
                                    </span>
                                </div>
                            </td>
                            <td className="bidask-td right vl-left">
                                <div>
                                    <span style={theme.font.main} className="bidask-title">{header.total}</span>
                                    <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                        {utils.formatQty(data.mvTotalAskVol)}
                                    </span>
                                </div>
                            </td>
                        </tr>

                        <tr className="bidask-row align-center">
                            <td className="bidask-td left">
                                <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                    {(data.mvForeignForBuy)}</span>
                                </div>
                            </td>
                            <td className="bidask-td mid">
                                <div><span style={theme.font.main} className="">{header.foreigner}</span></div>
                            </td>
                            <td className="bidask-td right">
                                <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("")}>
                                    {(data.mvForeignForSell)}</span>
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        )
    }

    onClick(accessor) {
        let stockName = this.state.mvStockSelected.stockName
        let stockCode = this.state.mvStockSelected.stockCode
        let market = this.state.mvStockSelected.mvMarketID
        // console.log(this.state.instrument)
        let data = this.state.data
        if(data == {}) {
            return
        } else {
            if(accessor == "bid1") {
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvStockCode: stockCode,
                    mvStockName: stockName,
                    mvMarketID: market,
                    mvQty: data.mvBidVol1,
                    mvPrice: data.mvBidPrice1
                })
            } else if(accessor == "bid2") {
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvStockCode: stockCode,
                    mvStockName: stockName,
                    mvMarketID: market,
                    mvQty: data.mvBidVol2,
                    mvPrice: data.mvBidPrice2
                })
            } else if(accessor == "bid3") {
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvStockCode: stockCode,
                    mvStockName: stockName,
                    mvMarketID: market,
                    mvQty: data.mvBidVol3,
                    mvPrice: data.mvBidPrice3
                })
            } else if(accessor == "ask1") {
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvStockCode: stockCode,
                    mvStockName: stockName,
                    mvMarketID: market,
                    mvQty: data.mvOfferVol1,
                    mvPrice: data.mvOfferPrice1
                })
            } else if(accessor == "ask2") {
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvStockCode: stockCode,
                    mvStockName: stockName,
                    mvMarketID: market,
                    mvQty: data.mvOfferVol2,
                    mvPrice: data.mvOfferPrice2
                })
            } else if(accessor == "ask3") {
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvStockCode: stockCode,
                    mvStockName: stockName,
                    mvMarketID: market,
                    mvQty: data.mvOfferVol3,
                    mvPrice: data.mvOfferPrice3
                })
            } else if(accessor == "match") {
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvStockCode: stockCode,
                    mvStockName: stockName,
                    mvMarketID: market,
                    mvQty: data.mvMatchVol,
                    mvPrice: data.mvMatchPrice
                })
            }
        }
        
        
        
    }

    componentDidMount() {
        
    }
}
const mapStateToProps = (state) => {
    return {
        listInstrumentData: state.trading.listInstrumentData,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
        portfolioData: state.trading.portfolioData.mvPortfolioBeanList,
        flag: state.trading.flag
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    addInstrumentToWatch: (ins, market) => { dispatch(actions.addInstrumentToWatch(ins, market)) },
    removeInstrumentFromWatch: (ins, market) => { dispatch(actions.removeInstrumentFromWatch(ins, market)) },

    addInstrumentToWatchList: (ins, market) => { dispatch(actions.addInstrumentToWatchList(ins, market)) },
    removeInstrumentFromWatchList: (ins, market) => { dispatch(actions.removeInstrumentFromWatchList(ins, market)) },

    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },
    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(BidAskTable)