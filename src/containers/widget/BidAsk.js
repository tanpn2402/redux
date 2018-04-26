import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"
import Component from "../commons/Component"
import * as utils from "../../utils"
import InputSelect from "../commons/InputSelect"
import BidAskTable from "../commons/BidAskTable"
import {TabControl, TabItem} from "../commons/TabControl"

class BidAsk extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : {},
            instrument: this.props.instrument,
            mvStockSelected: {},
            instrumentData: {},
            watched: false,

            activeKey: 1
        }
        
    }

    onWatchClick() {
        console.log(this.state)
        if(this.state.instrument != null && this.state.instrument != "") {
            if(this.state.watched) {
                // unwatch
                this.props.removeInstrumentFromWatchList(this.state.instrument, this.state.mvStockSelected.mvMarketID)
            } else {
                // watch
                this.props.addInstrumentToWatchList(this.state.instrument, this.state.mvStockSelected.mvMarketID)
                this.props.getTradeLogDataOfStock(this.state.instrument, this.state.mvStockSelected.mvMarketID)
            }
            
            this.setState({
                watched: !this.state.watched
            })
        }
    }

    handleStockChange(option) {
        let {mvStockSelected, watched} = this.state
        let {listInstrumentInWatchList, portfolioData, instrument} = this.props

        if(option.stockCode == instrument.stockCode) {
            // selected same instrument
            return
        }
        else {
            // console.log(portfolioData)
            // remove previous instrument if it not in watchlist and not in portfolio list
            if(listInstrumentInWatchList.indexOf(mvStockSelected.stockCode) < 0 && 
                portfolioData.filter(e => e.mvStockID == mvStockSelected.stockCode).length < 1) 
            {
                this.props.removeInstrumentFromWatch(mvStockSelected.stockCode, mvStockSelected.mvMarketID)
            }

            this.setState({
                watched: !watched,
                mvStockSelected: option,
                instrument: option.stockCode
            })
    
            // checkif instrument already in watchlist or portfolio list
            if(listInstrumentInWatchList.indexOf(option.stockCode) > -1 || 
                portfolioData.filter(e => e.mvStockID == option.stockCode).length > 0 )
            {
                // already in watchlist and portfolio list
            } else {
                // add new instrument is selected to watch  ( not watchlist )
                this.props.addInstrumentToWatch(option.stockCode, option.mvMarketID)
            }

            
            this.props.changeInstrument(option.stockCode)
            this.props.setDefaultOrderParams({
                mvBS: this.props.portfolioData.filter(e => e.mvStockID == option.stockCode).length > 0 ? "SELL" : "BUY",
                mvStockCode: option.stockCode,
                mvStockName: option.stockName,
                mvMarketID: option.mvMarketID
            })
        } 
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            instrument: nextProps.instrument
        })
    }


    render() {
        let {listInstrumentInWatchList, listInstrumentData, instrument, language} = this.props
        let { mvStockSelected } = this.state

        
        let header = this.props.language.stockmarketinform.header

        let tmp = config.cache.stockList.filter(e => e.stockCode == instrument)
        let stock = {stockCode: instrument, mvMarketID: "", stockName: ""}
        if(tmp.length > 0) {
            stock = tmp[0]
            this.state.mvStockSelected = stock
        }
        let theme = this.props.theme

        let className = "glyphicon glyphicon-star-empty"
        if(listInstrumentInWatchList.indexOf(instrument) > -1) {
            this.state.watched = true
            className = "glyphicon glyphicon-star"
        } else {
            this.state.watched = false
        }

        let selectorStyles = {
            background: "#2159a0",
            color: "#FFF"
        } 
        if(this.props.theme.title == "virtual") {
            selectorStyles = {
                background: "#ee514c",
                color: "#FFF"
            } 
        }
        
        return (

            <Component className="trd-body bidask" theme={theme}
                style={{width: "100%", height: "100%"}}>
                <div className="bidask-control">
                    <InputSelect
                        style={selectorStyles}
                        className="stock-selector"
                        key="rStockSelector-header"
                        ref={r => this.rStockSelector = r}
                        options={this.props.stockList}
                        selected={this.state.instrument}
                        optionLabelPath={'stockCode'}
                        handleChange={this.handleStockChange.bind(this)}
                        searchEnabled={true}
                        stockSelector={true}
                    />
                    <span className="trd-control-watch" onClick={e => this.onWatchClick()}>
                        <span className={className}></span>
                    </span>
                    <div className="trd-instrument-name" ref={r => this.StockName = r}>
                        <span style={theme.font.main} className="trd-instrument-code">{stock.stockName}</span>
                        <span style={Object.assign({}, theme.font.main, {margin: "0 10px"})}>{"-"}</span>
                        <span style={theme.font.main} className="trd-instrument-code">{stock.mvMarketID}</span>
                    </div>
                    <span className="info-icon">
                        <span className="glyphicon glyphicon-info-sign" onClick={e => this.viewMarketDetail()}></span>
                    </span>
                    
                </div>
                {/* <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)} theme={this.props.theme}>
                    <TabItem eventKey={1} title={this._renderTitle(header.order, 1)} >
                        <BidAskTable theme={theme} language={this.props.language} instrument={this.state.mvStockSelected} />
                    </TabItem>
                    <TabItem eventKey={2} title={this._renderTitle(header.stockinfo, 2)} >
                    </TabItem>

                    <TabItem eventKey={3} title={this._renderTitle(header.brokersum, 3)} >
                    </TabItem>
                    <TabItem eventKey={4} title={this._renderTitle(header.tradebook, 4)} >
                    </TabItem>
                </TabControl> */}
                <BidAskTable theme={theme} language={this.props.language} instrument={this.state.mvStockSelected} />

                    
            </Component>
        )
    }

    onTabChange(key) {
        this.setState({activeKey: key})
    }

    _renderTitle(title, i) {
        let theme = this.props.theme.font
        let font = this.state.activeKey == i ? {fontWeight: "bold"} : {fontWeight: "normal"}
        return <div style={font} className="wl-sm-tab-title">{title}</div>
    }

    viewMarketDetail() {
        this.props.onDesktopTabClick("marketinfo", "markettrading")
    }
    
}
const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
        portfolioData: state.trading.portfolioData.mvPortfolioBeanList
        
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    addInstrumentToWatch: (ins, market) => { dispatch(actions.addInstrumentToWatch(ins, market)) },
    removeInstrumentFromWatch: (ins, market) => { dispatch(actions.removeInstrumentFromWatch(ins, market)) },

    addInstrumentToWatchList: (ins, market) => { dispatch(actions.addInstrumentToWatchList(ins, market)) },
    removeInstrumentFromWatchList: (ins, market) => { dispatch(actions.removeInstrumentFromWatchList(ins, market)) },

    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },
    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
    showAccBalance: (param) => {
        dispatch(actions.showPopup(param))
    },

    getTradeLogDataOfStock: (stockCode, market) => { dispatch(actions.getTradeLogDataOfStock(stockCode, market)) },

    onDesktopTabClick: (tabID, subTabID) => {
        dispatch(actions.onTabClick(tabID, subTabID));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BidAsk)