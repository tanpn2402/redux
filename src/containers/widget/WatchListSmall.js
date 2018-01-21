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
            listStock: this.props.listInstrumentInWatchList.slice(0)
        }

        this.balance = {
            "mvMatchUpDown": 1.35,
            "mvMatchPercent": 0.555,
            "mvMatchVol": 569.2,
            "mvMatchPrice": 86.56
        }


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stockSelected: nextProps.instrument
        })
        this.onStockChange(nextProps.listInstrumentInWatchList)
        
    }

    changeModeView(mode) {
        this.setState({
            modeView: this.state.modeView == MODE_PERCENT ? MODE_CHANGE : MODE_PERCENT
        })
    }
    

    render() {
        // console.log("AAAAAAA", this.state)
        let currency = "VND"
        let {listInstrumentData, listInstrumentInWatchList, listInstrumentInPortfolio} = this.props
        let data = listInstrumentData.filter(stock => {
            if(listInstrumentInWatchList.indexOf(stock.mvStockCode) > -1) {
                return stock
            }
        })

        // if(data.length < 1) {
        //     data = listInstrumentData.filter(stock => {
        //         if(listInstrumentInPortfolio.indexOf(stock.mvStockCode) > -1) {
        //             return stock
        //         }
        //     })
        // }

        let language = this.props.language.watchlist.header
        let header = [
            {
                title: language.stock,
                style: {width: "20%"},
                bodyStyle: {width: "20%"},
                accessor: "mvStockCode",
            },
            {
                title: language.price,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvMatchPrice")
                }
            },
            {
                title: language.volume,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvMatchVol")
                }
            },
            {
                title: language.totalvol,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvMatchVolTotal")
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
                    return this.fillColor(props, this.state.modeView == MODE_CHANGE ? "mvMatchUpDown" : "mvMatchUpDown")
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
                        onChange={e => this.onStockChange(this.props.listInstrumentInWatchList)}/>
                   
                </div>
                <div className="wl-sm-table">
                    <TTLTable className="watchlist-small" data={data} header={header}
                        getTRowProps={(data) => {
                            if(data.mvStockCode == this.state.stockSelected) {
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
        this.props.changeInstrument(prop.mvStockCode)

        // console.log(this.props)
        
        let tmp = config.cache.stockList.filter(e => e.stockCode == prop.mvStockCode)
        if(tmp.length > 0) {
            let tp = tmp[0]
            this.props.setDefaultOrderParams({
                mvBS: this.props.portfolioData.filter(el => el.mvStockID == prop.mvStockCode).length > 0 ? "SELL" : "BUY",
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
            if(accessor == "mvMatchUpDown")
                child = <span style={{color: "#70a800"}}>{"+" + props[accessor]}</span>
            else if(accessor == "mvMatchPercent")
                child = <span style={{color: "#70a800"}}>{props[accessor] + "%"}</span>
        }
        else {
            if(accessor == "mvMatchUpDown")
                child = <span style={{color: "#ea0070"}}>{"-" + props[accessor]}</span>
            else if(accessor == "mvMatchPercent")
                child = <span style={{color: "#ea0070"}}>{props[accessor] + "%"}</span>
        }
        return child
    }

    componentDidMount() {

    }

}

const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
        portfolioData: state.trading.portfolioData.mvPortfolioBeanList,
        listInstrumentInPortfolio: state.trading.listInstrumentInPortfolio,
        listInstrumentData: state.trading.listInstrumentData
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },

    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchListA)