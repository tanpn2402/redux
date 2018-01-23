import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"
import Component from "../commons/Component"

class BidAskTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : {
                openprice: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                highprice: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                lowprice: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                
                floor: 70.216,
                ceil: 100.135,
                total: 80.235,
    
                price1: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price2: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price3: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price4: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price5: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price6: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price7: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price8: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price9: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price10: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price11: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price12: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price13: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2),
                price14: (Math.floor(Math.random() * 10) + 5) + Math.random().toFixed(2)
                
            }
        }

        this.balance = {
                mvOpen: 80.4,
                mvHigh: 70.5,
                mvLow: 60.5,
                
                mvCeiling: 80.216,
                mvFloor: 70.135,
                mvReferences: 80.235,
    
                mvBidPrice1: 85.56,
                mvBidPrice2: 75.26,
                mvBidPrice3: 65.85,

                mvBidVol1: 75.76,
                mvBidVol2: 47.52,
                mvBidVol3: 96.67,

                mvOfferPrice1: 65.26,
                mvOfferPrice2: 87.12,
                mvOfferPrice3: 97.45,

                mvOfferVol1: 65.56,
                mvOfferVol2: 97.34,
                mvOfferVol3: 65.6,

                mvForeignForBuy: 56.5,
                mvForeignForSell: 69.3
        }
    }

    _renderValue(accessor) {
        let theme = this.props.theme.bindingdata
        let style = theme.normal
        
        if(this.state.data[accessor] > this.balance[accessor])
            style = theme.up
        else
            style = theme.down

        return {color: style.color}
    }

    render() {
        let currency = "VND"
        let data = []
        let _tmp = this.props.listInstrumentData.filter(e => e.mvStockCode == this.props.instrument)
        if(_tmp.length > 0) {
            data = _tmp[0]
            this.state.data = data
        }
        let header = this.props.language.stockmarketinform.header

        let tmp = config.cache.stockList.filter(e => e.stockCode == this.props.instrument)
        let stock = {stockCode: this.props.instrument, mvMarketID: "", stockName: ""}
        if(tmp.length > 0) {
            stock = tmp[0]
        }

        let theme = this.props.theme
        return (

            <Component className="trd-body bidask" theme={theme}
                style={{display: "inline-flex", width: "100%", height: "100%"}}>
                <div className="wl-sm-controls">
                    <label style={theme.font.main}>{this.props.language.menu.stockmarketinfo}</label>

                    <label style={theme.font.main} className="stockname">{stock.stockCode + " | " + stock.mvMarketID}</label>
                    
                </div>
                <div className="bidask-table">
                    <table>
                        <tbody>
                            <tr className="bidask-row align-center header">
                                <td className="bidask-td left">
                                    <div>
                                    </div>
                                </td>
                                <td className="bidask-td mid pink">
                                    <div><span style={theme.font.main} className=""></span></div>
                                </td>
                                <td className="bidask-td right pink vl-left">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.total}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("openprice")}>{data.mvOpen}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bidask-row">
                                <td className="bidask-td left">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.openprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("openprice")}>{data.mvOpen}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.highprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("highprice")}>{data.mvHigh}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.lowprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("lowprice")}>{data.mvLow}</span>
                                    </div>
                                </td>
                                <td className="bidask-td mid pink">
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidPrice1")}>{data.mvBidPrice1}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidPrice2")}>{data.mvBidPrice2}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidPrice3")}>{data.mvBidPrice3}</span></div>
                                </td>
                                <td className="bidask-td right pink vl-left">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestBid + " 1"}</span>
                                        <span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("mvBidVol1")}>{data.mvBidVol1}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestBid + " 2"}</span>
                                        <span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("mvBidVol2")}>{data.mvBidVol2}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestBid + " 3"}</span>
                                        <span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("mvBidVol3")}>{data.mvBidVol3}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bidask-row">
                                <td className="bidask-td left green vl-right">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 1"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferVol1")}>{data.mvOfferVol1}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 2"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferVol2")}>{data.mvOfferVol2}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 3"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferVol3")}>{data.mvOfferVol3}</span>
                                    </div>
                                </td>
                                <td className="bidask-td mid green">
                                    <div>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferPrice1")}>{data.mvOfferPrice1}</span>
                                    </div>
                                    <div>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferPrice2")}>{data.mvOfferPrice2}</span>
                                    </div>
                                    <div>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferPrice3")}>{data.mvOfferPrice3}</span>
                                    </div>
                                </td>
                                <td className="bidask-td right vl-right">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.cell}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvCeiling")}>{data.mvCeiling}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.floor}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvFloor")}>{data.mvFloor}</span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.ref}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvReferences")}>{data.mvReferences}</span>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bidask-row">
                                <td className="bidask-td left green vl-right">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.total}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvForeignForSell")}>{data.mvForeignForSell}</span>
                                    </div>
                                </td>
                                <td className="bidask-td mid green">
                                    <div><span className=""></span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div><span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("mvForeignForBuy")}></span></div>
                                </td>
                            </tr>
                            <tr className="bidask-row align-center">
                                <td className="bidask-td left">
                                    <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("mvForeignForBuy")}>{data.mvForeignForBuy}</span></div>
                                </td>
                                <td className="bidask-td mid">
                                    <div><span style={theme.font.main} className="">{header.foreigner}</span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("mvForeignForSell")}>{data.mvForeignForSell}</span></div>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </Component>
        )
    }

    onClick() {
        
    }

    componentDidMount() {
        
    }
}
const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument,
        listInstrumentData: state.trading.listInstrumentData
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BidAskTable)