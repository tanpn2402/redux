import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"
import Component from "../commons/Component"
import * as utils from "../../utils"

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
        
        if(this.state.data[accessor] > this.balance[accessor])
            style = theme.up
        else
            style = theme.down

        return {color: style.color}
    }

    getValue(data, accessor) {
        if(data[accessor] == null || data[accessor] == 0 || data[accessor] == "" || data[accessor] == "-") {
            return 0
        } else {
            return data[accessor]
        }
    }

    render() {
        let currency = "VND"
        let data = []
        let _tmp = this.props.listInstrumentData.filter(e => e.mvStockCode == this.props.instrument)
        if(_tmp.length > 0) {
            data = _tmp[0]
            this.state.data = data
            data["mvTotalAskVol"] = this.getValue(data, "mvOfferVol1") + this.getValue(data, "mvOfferVol2") + this.getValue(data, "mvOfferVol3")
            data["mvTotalBidVol"] = this.getValue(data, "mvBidPrice1") + this.getValue(data, "mvBidPrice2") + this.getValue(data, "mvBidPrice3")
            
        }
        let header = this.props.language.stockmarketinform.header

        let tmp = config.cache.stockList.filter(e => e.stockCode == this.props.instrument)
        let stock = {stockCode: this.props.instrument, mvMarketID: "", stockName: ""}
        if(tmp.length > 0) {
            stock = tmp[0]
        }
        console.log("AA")
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
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvTotalAskVol")}>
                                            {utils.currencyShowFormatter(data.mvTotalAskVol)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bidask-row">
                                <td className="bidask-td left">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.openprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOpen")}>
                                            {utils.currencyShowFormatter(data.mvOpen)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.highprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvHigh")}>
                                            {utils.currencyShowFormatter(data.mvHigh)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.lowprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvLow")}>
                                            {utils.currencyShowFormatter(data.mvLow)}
                                        </span>
                                    </div>
                                </td>
                                <td className="bidask-td mid pink">
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidPrice1")}>
                                        {utils.currencyShowFormatter(data.mvBidPrice1)}</span>
                                    </div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidPrice2")}>
                                        {utils.currencyShowFormatter(data.mvBidPrice2)}</span>
                                    </div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidPrice3")}>
                                        {utils.currencyShowFormatter(data.mvBidPrice3)}</span>
                                    </div>
                                </td>
                                <td className="bidask-td right pink vl-left">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestBid + " 1"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidVol1")}>
                                            {utils.currencyShowFormatter(data.mvBidVol1)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestBid + " 2"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidVol2")}>
                                            {utils.currencyShowFormatter(data.mvBidVol2)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestBid + " 3"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvBidVol3")}>
                                            {utils.currencyShowFormatter(data.mvBidVol3)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bidask-row">
                                <td className="bidask-td left green vl-right">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 1"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferVol1")}>
                                            {utils.currencyShowFormatter(data.mvOfferVol1)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 2"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferVol2")}>
                                            {utils.currencyShowFormatter(data.mvOfferVol2)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.BestAsk + " 3"}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferVol3")}>
                                            {utils.currencyShowFormatter(data.mvOfferVol3)}
                                        </span>
                                    </div>
                                </td>
                                <td className="bidask-td mid green">
                                    <div>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferPrice1")}>
                                            {utils.currencyShowFormatter(data.mvOfferPrice1)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferPrice2")}>
                                            {utils.currencyShowFormatter(data.mvOfferPrice2)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvOfferPrice3")}>
                                            {utils.currencyShowFormatter(data.mvOfferPrice3)}
                                        </span>
                                    </div>
                                </td>
                                <td className="bidask-td right vl-right">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.cell}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvCeiling")}>
                                            {utils.currencyShowFormatter(data.mvCeiling)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.floor}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvFloor")}>
                                            {utils.currencyShowFormatter(data.mvFloor)}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.ref}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvReferences")}>
                                            {utils.currencyShowFormatter(data.mvReferences)}
                                        </span>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bidask-row">
                                <td className="bidask-td left green vl-right">
                                    <div>
                                        <span style={theme.font.main} className="bidask-title">{header.total}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("mvForeignForSell")}>
                                            {utils.currencyShowFormatter(data.mvForeignForSell)}
                                        </span>
                                    </div>
                                </td>
                                <td className="bidask-td mid green">
                                    <div><span className=""></span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div><span className=""></span></div>
                                </td>
                            </tr>
                            <tr className="bidask-row align-center">
                                <td className="bidask-td left">
                                    <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("mvForeignForBuy")}>
                                        {utils.currencyShowFormatter(data.mvForeignForBuy)}</span>
                                    </div>
                                </td>
                                <td className="bidask-td mid">
                                    <div><span style={theme.font.main} className="">{header.foreigner}</span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("mvForeignForSell")}>
                                        {utils.currencyShowFormatter(data.mvForeignForSell)}</span>
                                    </div>
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