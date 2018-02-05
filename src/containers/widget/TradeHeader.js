import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import InputSelect from "../commons/InputSelect"
import config from "../../core/config"
import TradeHeaderStatus from "../commons/TradeHeaderStatus"
import Component from "../commons/Component"

class TradeHeader extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ],
            mvStockSelected: {},
            watched: false,
            instrument: this.props.instrument
        }

        this.balance = 0.3654
    }

    handleStockChange(option) {

        
        let {mvStockSelected, watched} = this.state
        let {listInstrumentInWatchList, portfolioData} = this.props

        if(option.stockCode == mvStockSelected.stockCode) {
            // selected same instrument
            return
        }
        else {

            // remove previous instrument if it not in watchlist and not in portfolio list
            if(listInstrumentInWatchList.indexOf(mvStockSelected.stockCode) < 0 && 
                this.props.portfolioData.filter(e => e.mvStockID == mvStockSelected.stockCode).length < 1) 
            {
                this.props.removeInstrumentFromWatch(mvStockSelected.stockCode, mvStockSelected.mvMarketID)
            }

            this.setState({
                watched: option.stockCode == this.state.mvStockSelected.stockCode,
                mvStockSelected: option,
                instrument: option.stockCode
            })
    
            // checkif instrument already in watchlist or portfolio list
            if(listInstrumentInWatchList.indexOf(option.stockCode) > -1 || 
                this.props.portfolioData.filter(e => e.mvStockID == option.stockCode).length > 0 )
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

    onWatchClick() {
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            instrument: nextProps.instrument,
            mvStockSelected: {
                stockCode: nextProps.instrument
            }
        })
    }

    render() {
        let header = this.props.language.stockmarketinform.header
        let currency = "VND"
        let {instrument, watched} = this.state
        let {listInstrumentInWatchList} = this.props
        let instrumentName = "---"

        if(instrument != undefined) {
            let tmp = config.cache.stockList.filter(e => e.stockCode == instrument)
            if(tmp.length > 0) {
                instrumentName = tmp[0].stockName
            }
        }

        let tmp = "-empty"
        // console.log(listInstrumentToWatch)
        if(listInstrumentInWatchList.indexOf(instrument) > -1) {
            this.state.watched = true
            tmp = ""
        }

        let className = "glyphicon glyphicon-star" + tmp
        let theme = this.props.theme
        return (
            <Component className="trd-header" theme={theme}>
                <div className="trd-header-control">
                    {/* <InputSelect
                        className="stock-selector"
                        key="rStockSelector-header"
                        ref={r => this.rStockSelector = r}
                        options={this.props.stockList}
                        selected={this.state.mvStockSelected}
                        optionLabelPath={'stockCode'}
                        handleChange={this.handleStockChange.bind(this)}
                        searchEnabled={true}
                    />
                    <span className="trd-control-watch" onClick={e => this.onWatchClick()}>
                        <span className={className}></span>
                    </span> */}
                    <div className="trd-instrument-name" ref={r => this.StockName = r}>
                        <p style={theme.font.main} className="trd-instrument-code">{instrumentName}</p>
                    </div>
                </div>
                
                <TradeHeaderStatus language={this.props.language} theme={theme} />
            </Component>
        )
    }

    componentDidMount() {
        if(this.StockName != undefined) {
            if(this.StockName.offsetHeight < 46) {
                this.StockName.style.paddingTop = "20px"
            } else {
                this.StockName.style.paddingTop = "10px"
            }
        }
        
        // setInterval( this.simulate.bind(this) , 1500)
    }

    componentDidUpdate() {
        if(this.StockName != undefined) {
            if(this.StockName.offsetHeight < 46) {
                this.StockName.style.paddingTop = "20px"
            } else {
                this.StockName.style.paddingTop = "10px"
            }
        }
    }

    simulate() {
        // console.log("adssddsdsd")
        let _data = this.state.data
        _data.unshift({
            "value1": Math.random().toFixed(6),
            "value2": Math.random().toFixed(6),
            "value3": Math.random().toFixed(6)
        })

        if(_data.length > 30) {
            _data.pop()
        }

        this.setState({
            data: _data
        })
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
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeHeader)