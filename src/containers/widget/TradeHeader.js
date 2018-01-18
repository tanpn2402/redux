import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import Select from "../commons/Select"

class TradeHeader extends Component {
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
        this.setState({
            watched: option.stockCode == this.state.mvStockSelected.stockCode,
            mvStockSelected: option,
            instrument: option.stockCode
        })

        this.props.changeInstrument(option.stockCode)
        this.props.setDefaultOrderParams({
            mvBS: this.props.portfolioData.filter(e => e.mvStockID == option.stockCode).length > 0 ? "SELL" : "BUY",
            mvStockCode: option.stockCode,
            mvStockName: option.stockName,
            mvMarketID: option.mvMarketID
        })
    }

    onWatchClick() {
        if(this.state.instrument != null) {
            if(this.state.watched) {
                // unwatch
                this.props.removeInstrument(this.state.instrument)
            } else {
                // watch
                this.props.addInstrument(this.state.instrument)
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
        let currency = "VND"
        let {instrument, watched} = this.state
        let {listInstrumentToWatch} = this.props

        if(instrument == undefined) {
            instrument = "---"
        }

        let tmp = "-empty"
        if(listInstrumentToWatch.indexOf(instrument) > -1) {
            this.state.watched = true
            tmp = ""
        }
        let className = "glyphicon glyphicon-star" + tmp
        // console.log(className)
        return (
            <div className="trd-header">
                <div className="trd-header-control">
                    <Select
                        ket="rStockSelector"
                        ref={r => this.rStockSelector = r}
                        options={this.props.stockList}
                        selected={this.state.mvStockSelected}
                        optionLabelPath={'stockCode'}
                        handleChange={this.handleStockChange.bind(this)}
                        searchEnabled={true}
                    />
                    <span className="trd-instrument-code">{instrument}</span>
                    <span className="trd-control-watch" onClick={e => this.onWatchClick()}>
                        <span className={className}></span>
                    </span>
                </div>
                
                <ul>
                    <li>
                        <h4 class="trd-binding">Last Price</h4>
                        <strong className="">12,821.02</strong>
                        <strong className="trd-transMoney">$12,821.02</strong>
                    </li>
                    <li>
                        <h4 className="trd-binding">24h Change</h4>
                        <strong className="trd-binding">-616.17</strong>
                        <strong className="trd-changeRate">-4.59%</strong>
                        
                    </li>
                    <li>
                        <h4 className="trd-binding">24h High</h4>
                        <strong className="ng-binding">14,249.99</strong>
                    </li>
                    <li>
                        <h4 className="trd-binding">24h Low</h4>
                        <strong className="ng-binding">12,501.00</strong>
                    </li>
                    <li>
                        <h4 className="trd-binding">24h Volume</h4>
                        <strong className="trd-binding">264,906,607.20 USDT</strong>
                    </li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        
        // setInterval( this.simulate.bind(this) , 1500)
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
        listInstrumentToWatch: state.trading.listInstrumentToWatch,
        portfolioData: state.porfolio.data.mvPortfolioBeanList,

    }
}

const mapDispatchToProps = (dispatch, props) => ({
    addInstrument: (ins) => { dispatch(actions.addInstrumentToWatch(ins)) },
    removeInstrument: (ins) => { dispatch(actions.removeInstrumentFromWatch(ins)) },
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },

    
    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeHeader)