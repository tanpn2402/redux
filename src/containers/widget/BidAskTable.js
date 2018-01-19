import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"

class BidAskTable extends Component {
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
                openprice: 80,
                highprice: 70,
                lowprice: 60,
                
                floor: 70.216,
                ceil: 100.135,
                total: 80.235,
    
                price1: 85,
                price2: 75,
                price3: 65,
                price4: 75,
                price5: 47,
                price6: 96,
                price7: 65,
                price8: 87,
                price9: 97,
                price10: 65,
                price11: 97,
                price12: 65,
                price13: 4,
                price14: 69
        }
    }

    _renderValue(accessor) {
        let color = "#000"
        if(this.state.data[accessor] > this.balance[accessor])
            color = "#70a800"
        else
            color = "#ea0070"
        return {color: color}
    }

    render() {
        let currency = "VND"
        let {data} = this.state
        let header = this.props.language.stockmarketinform.header

        let tmp = config.cache.stockList.filter(e => e.stockCode == this.props.instrument)
        let stock = {stockCode: this.props.instrument, mvMarketID: "", stockName: ""}
        if(tmp.length > 0) {
            stock = tmp[0]
        }
        return (

            <div className="trd-body bidask" style={{display: "inline-flex", width: "100%", height: "100%", backgroundColor: "#FFF"}}>
                <div className="wl-sm-controls">
                    <label>{this.props.language.menu.stockmarketinfo}</label>

                    <label className="stockname">{stock.stockCode + " | " + stock.mvMarketID}</label>
                    
                </div>
                <div className="bidask-table">
                    <table>
                        <tbody>
                            <tr className="bidask-row align-center header">
                                <td className="bidask-td left">
                                    <div><span className="">{header.BestBid}</span></div>
                                </td>
                                <td className="bidask-td mid">
                                    <div><span className=""></span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div><span className="">{header.BestAsk}</span></div>
                                </td>
                            </tr>
                            <tr className="bidask-row">
                                <td className="bidask-td left">
                                    <div>
                                        <span className="bidask-title">{header.openprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("openprice")}>{data.openprice}</span>
                                    </div>
                                    <div>
                                        <span className="bidask-title">{header.highprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("highprice")}>{data.highprice}</span>
                                    </div>
                                    <div>
                                        <span className="bidask-title">{header.lowprice}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("lowprice")}>{data.lowprice}</span>
                                    </div>
                                </td>
                                <td className="bidask-td mid pink">
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price1")}>{data.price1}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price2")}>{data.price2}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price3")}>{data.price3}</span></div>
                                </td>
                                <td className="bidask-td right pink">
                                    <div><span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("price4")}>{data.price4}</span></div>
                                    <div><span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("price5")}>{data.price5}</span></div>
                                    <div><span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("price5")}>{data.price5}</span></div>
                                </td>
                            </tr>
                            <tr className="bidask-row">
                                <td className="bidask-td left green">
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price6")}>{data.price6}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price7")}>{data.price7}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price7")}>{data.price7}</span></div>
                                </td>
                                <td className="bidask-td mid green">
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price8")}>{data.price8}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price9")}>{data.price9}</span></div>
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price10")}>{data.price10}</span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div>
                                        <span className="bidask-title">{header.cell}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("ceil")}>{data.ceil}</span>
                                    </div>
                                    <div>
                                        <span className="bidask-title">{header.floor}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("floor")}>{data.floor}</span>
                                    </div>
                                    <div>
                                        <span className="bidask-title">{header.ref}</span>
                                        <span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("total")}>{data.total}</span>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bidask-row">
                                <td className="bidask-td left">
                                    <div><span className="bidask-value binding" onClick={e => this.onClick()} style={this._renderValue("price11")}>{data.price11}</span></div>
                                </td>
                                <td className="bidask-td mid">
                                    <div><span className=""></span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div><span className="bidask-title binding" onClick={e => this.onClick()} style={this._renderValue("price12")}>{data.price12}</span></div>
                                </td>
                            </tr>
                            <tr className="bidask-row align-center">
                                <td className="bidask-td left">
                                    <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("price13")}>{data.price13}</span></div>
                                </td>
                                <td className="bidask-td mid">
                                    <div><span className="">{header.foreigner}</span></div>
                                </td>
                                <td className="bidask-td right">
                                    <div><span className="binding" onClick={e => this.onClick()} style={this._renderValue("price14")}>{data.price14}</span></div>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    onClick() {
        
    }

    fillColor(props, accessor) {
        let child = <span style={{color: "#000"}}>{props[accessor]}</span>
        if(props[accessor] > this.balance[accessor]) {
            child = <span style={{color: "#ea0070"}}>{props[accessor]}</span>
        }
        else {
            child = <span style={{color: "#70a800"}}>{props[accessor]}</span>
        }
        return child
    }

    componentDidMount() {
        
        this.interval = setInterval( this.simulate.bind(this) , 2000)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    simulate() {
        // console.log("adssddsdsd")
        let _data = {
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

        this.setState({
            data: _data
        })
    }

}
const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BidAskTable)