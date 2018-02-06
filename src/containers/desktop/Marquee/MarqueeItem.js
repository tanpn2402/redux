import React from 'react'
import { connect } from "react-redux"
import * as actions from "../../../actions"
import { OverlayTrigger, Popover } from 'react-bootstrap'
import ComposedChart from '../../commons/ComposedChart'
import config from "../../../core/config"
import * as utils from "../../../utils"
import moment from "moment"

class MarqueeItem extends React.Component {
    constructor(props) {
        super(props)
        this.genPopover = this.genPopover.bind(this)
        this.state = {
            threshHold: 110,
            data: []
        }

    }

    __renderMarketIndex() {
        let stock = this.props.stock

        let {stockCode, market, marketData, type} = this.props
        let tmp = marketData.filter(e=> e.mvMarket == market)
        let data = {}
        if(tmp.length > 0) {
            data = tmp[0]
        } else {
            data = {
                time: moment(),
                mvStockCode: stock,
                mvMarket: "HA",
                mvTotalVol: utils.randomInt(500000),
                mvTotalValue: utils.randomInt(200000),
                mvIndex: parseFloat(utils.randomInt(100) + Math.random().toFixed(2)),
                mvChangeValue: utils.randomInt(2) % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2),
                mvChangePercent: utils.randomInt(2) % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2)
            }
        }
        let theme = this.props.theme
        let status ="nocrease"
        let bindingStyle = theme.bindingdata.normal
        if(data.mvChangeValue < 0) {
            status = "decrease"
            bindingStyle = theme.bindingdata.down
        } else if(data.mvChangeValue > 0) {
            status = "increase"
            bindingStyle = theme.bindingdata.up
        }

        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={this.genPopover(data)} onEnter={() => this.props.onPause()} onExit={() => this.props.onResume()}>
                <li className="marquee-overlay _marqueeitem _market" >
                    <strong className="title">{data.mvMarket}</strong>
                    <span className={status} style={Object.assign({}, bindingStyle, {fontWeight: "bold"})} >&nbsp;{data.mvIndex}</span>
                    <span className="percent" style={Object.assign({}, bindingStyle, {fontWeight: "bold"})}>
                        <span className="netchange">&nbsp;{data.mvChangeValue}</span>&nbsp;(<span className="changepercentage">{data.mvChangePercent}</span>%)
                    </span>
                    <span className="vol-value">
                        &nbsp;
                        <span>&nbsp;&nbsp;Total Vol:&nbsp;{utils.quantityShowFormatter(data.mvTotalVol)}</span>
                    
                        <span>&nbsp;&nbsp;Total VaLue:&nbsp;{utils.quantityShowFormatter(data.mvTotalValue)}</span>
                    </span>
                </li>
            </OverlayTrigger>
        )
    }


    _renderStockIndex() {
        // console.log(this.props)
        let {stock, market, listInstrumentData} = this.props
        let tmp = listInstrumentData.filter(e=> e.mvStockCode == stock /*&& e.mvMarket == market*/)
        let data = {}
        if(tmp.length > 0) {
            data = tmp[0]
        }
        let theme = this.props.theme
        let status ="nocrease"
        let bindingStyle = theme.bindingdata.nochange
        if(data.mvMatchPrice < data.mvReferences) {
            status = "decrease"
            bindingStyle = theme.bindingdata.down
        } else if(data.mvMatchPrice > data.mvReferences ) {
            status = "increase"
            bindingStyle = theme.bindingdata.up
        }

        let mvChangeValue = utils.round(data.mvMatchPrice - data.mvReferences, 2)
        let mvChangePercent = utils.round( (data.mvMatchPrice - data.mvReferences) / data.mvReferences * 100, 2)

      
        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={this.genPopover(data)} onEnter={() => this.props.onPause()} onExit={() => this.props.onResume()}>
                <li className="marquee-overlay _marqueeitem _stock" >
                    <strong className="title">{data.mvStockCode}</strong>
                    <span className={status} style={Object.assign({}, bindingStyle, {fontWeight: "bold"})} >&nbsp;{data.mvMatchPrice}</span>
                    <span className="percent" style={Object.assign({}, bindingStyle, {fontWeight: "bold"})}>
                        <span className="netchange">&nbsp;{mvChangeValue}</span>&nbsp;(<span className="changepercentage">{mvChangePercent}</span>%)
                    </span>
                </li>
            </OverlayTrigger>
        )
        
    }

    render() {
        
      
        return this.props.type == "MARKET" ? this.__renderMarketIndex() : this._renderStockIndex()
      
            
    }

    genPopover(data) {
        let {type, stock, market} = this.props
            console.log(stock, type, market)
            let background = this.props.theme.chart.popoverChart.backgroundColor

            const dataObject = {
                width: 500,
                height: 250,
                theme: this.props.theme.chart.popoverChart,
            }
            
            return (
                <Popover id="popover-trigger-hover-focus" style={{
                    width: '550px', maxWidth: 'none', backgroundColor: background,
                    border: '2px solid #6790fc'
                }}>
                    <ComposedChart dataObject={dataObject} stock={stock} market={market} type={this.props.type}/>
                </Popover>
            )
        }
    
}


const mapStateToProps = (state) => {
    return {
        marketData: state.tradelog.marketData,
        flagMarketDataUpdated: state.tradelog.flagMarketDataUpdated,
        listInstrumentData: state.trading.listInstrumentData
    }
}

const mapDispatchToProps = (dispatch, state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MarqueeItem)