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

class BidAsk extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : {},
            instrument: this.props.instrument,
            mvStockSelected: {},
            instrumentData: {},
            watched: false
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
        let {listInstrumentInWatchList, listInstrumentData, instrument} = this.props
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
        
        return (

            <Component className="trd-body bidask" theme={theme}
                style={{width: "100%", height: "100%"}}>
                <div className="bidask-control">
                    <InputSelect
                        className="stock-selector"
                        key="rStockSelector-header"
                        ref={r => this.rStockSelector = r}
                        options={this.props.stockList}
                        selected={this.state.instrument}
                        optionLabelPath={'stockCode'}
                        handleChange={this.handleStockChange.bind(this)}
                        searchEnabled={true}
                    />
                    <span className="trd-control-watch" onClick={e => this.onWatchClick()}>
                        <span className={className}></span>
                    </span>
                    <div className="trd-instrument-name" ref={r => this.StockName = r}>
                        <span style={theme.font.main} className="trd-instrument-code">{stock.stockName}</span>
                        <span style={Object.assign({}, theme.font.main, {margin: "0 10px"})}>{"-"}</span>
                        <span style={theme.font.main} className="trd-instrument-code">{stock.mvMarketID}</span>
                    </div>
                    
                </div>
                <BidAskTable theme={theme} language={this.props.language} instrument={this.state.mvStockSelected} />
            </Component>
        )
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
})

export default connect(mapStateToProps, mapDispatchToProps)(BidAsk)