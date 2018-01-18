import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import config from "../../core/config"
const MODE_CHANGE = "change"
const MODE_VOL = "volume"
const MODE_PERCENT = "percent"

class WatchListA extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ],
            modeView: MODE_CHANGE,
            stockSelected: this.props.instrument,
            listStock: this.props.listInstrumentToWatch.slice(0)
        }

        this.balance = {
            "change": 0.356,
            "percent": 0.555,
            "price": 0.666
        }


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stockSelected: nextProps.instrument
        })
        this.onStockChange(nextProps.listInstrumentToWatch)
        
    }

    changeModeView(mode) {
        this.setState({
            modeView: this.state.modeView == MODE_PERCENT ? MODE_CHANGE : MODE_PERCENT
        })
    }
    

    render() {
        // console.log("AAAAAAA", this.state)
        let currency = "VND"
        let language = this.props.language.watchlist.header
        let header = [
            {
                title: language.stock,
                style: {width: "20%"},
                bodyStyle: {width: "20%"},
                accessor: "stockCode",
            },
            {
                title: language.price,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "price",
                cell: props => {
                    return this.fillColor(props, "price")
                }
            },
            {
                title: language.volume,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "volume",
                cell: props => {
                    return this.fillColor(props, "volume")
                }
            },
            {
                title: language.totalvol,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "totalvol",
                cell: props => {
                    return this.fillColor(props, "totalvol")
                }
            },
            {
                // title:  this.state.modeView == MODE_CHANGE ? language.change : language.volume,
                style: {width: "20%", textAlign: "right", paddingRight: "4px"},
                bodyStyle: {width: "20%", textAlign: "right"},
                title: props => {
                    return (
                        <div>
                            <span className="glyphicon glyphicon-menu-left" onClick={e => this.changeModeView(MODE_CHANGE)} 
                                style={{cursor: "pointer"}}></span>
                            <span>{this.state.modeView == MODE_CHANGE ? language.change : language.percent}</span>
                            <span className="glyphicon glyphicon-menu-right" onClick={e => this.changeModeView(MODE_PERCENT)} 
                                style={{cursor: "pointer"}}></span>
                        </div>
                    )

                },
                cell: props => {
                    return this.fillColor(props, this.state.modeView == MODE_CHANGE ? "change" : "percent")
                }
                
            }
        ]
        // console.log(this.state.stockSelected)
        return (
            <div className="trd-body" style={{height: "100%", backgroundColor: "#FFF"}}>
                <div className="wl-sm-controls">
                    <label>{this.props.language.menu.watchlist}</label>

                    <input className="wl-sm-input"
                        ref={r => this.input = r}
                        onChange={e => this.onStockChange(this.props.listInstrumentToWatch)}/>
                   
                </div>
                <div className="wl-sm-table">
                    <TTLTable className="watchlist-small" data={this.state.data} header={header}
                        getTRowProps={(data) => {
                            if(data.stockCode == this.state.stockSelected) {
                                return {
                                    style: {
                                        backgroundColor: "rgba(244,186,17,0.4)",
                                        fontWeight: "900"
                                    }
                                }
                            }else {
                                return {
                                    style: {
                                        
                                    }
                                }
                            }
                            
                        }}
                        onRowClick={(e, props) => this.onRowClick(e, props) }
                    />
                </div>
            </div>
        )
    }

    onRowClick(e, prop) {
        // this.setState({stockSelected: prop.stockCode})
        this.props.changeInstrument(prop.stockCode)

        // console.log(this.props)
        
        let tmp = config.cache.stockList.filter(e => e.stockCode == prop.stockCode)
        if(tmp.length > 0) {
            let tp = tmp[0]
            this.props.setDefaultOrderParams({
                mvBS: this.props.portfolioData.filter(el => el.mvStockID == prop.stockCode).length > 0 ? "SELL" : "BUY",
                mvStockCode: tp.stockCode,
                mvStockName: tp.stockName,
                mvMarketID: tp.mvMarketID
            })
        }
    }

    onStockChange(listStock) {
        let val = this.input.value
        // console.log("BBBB", val, listStock)
        let tmp = listStock.filter(e => e.toUpperCase().includes(val.toUpperCase()))
        
        this.setState({
            listStock: tmp.slice(0)
        })
    }

    handleViewModeChange(mode) {
        this.setState({
            modeView: mode
        })
    }

    fillColor(props, accessor) {
        
        let child = <span style={{color: "#000"}}>{props[accessor]}</span>
        if(props[accessor] > this.balance[accessor]) {
            if(accessor == "change")
                child = <span style={{color: "#ea0070"}}>{"+" + props[accessor]}</span>
            else if(accessor == "percent")
                child = <span style={{color: "#ea0070"}}>{props[accessor] + "%"}</span>
        }
        else {
            if(accessor == "change")
                child = <span style={{color: "#70a800"}}>{"-" + props[accessor]}</span>
            else if(accessor == "percent")
                child = <span style={{color: "#70a800"}}>{props[accessor] + "%"}</span>
        }
        return child
    }

    componentDidMount() {
        this.simulate()
        this.interval = setInterval( this.simulate.bind(this) , 2000)

        // if(this.state.listStock.length > 0) { 
        //     this.props.changeInstrument(this.state.listStock[0])
        // }
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    simulate() {
        
        let _data = new Array()
        this.state.listStock.map(stock => {
            _data.push({
                "stockCode": stock,
                "price": Math.random().toFixed(4),
                "volume": Math.random().toFixed(4),
                "change": Math.random().toFixed(4),
                "percent": Math.random().toFixed(2),
                "totalvol": Math.random().toFixed(4)
                
            })
        })

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
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },

    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchListA)