import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'

const MODE_CHANGE = "change"
const MODE_VOL = "volume"

class WatchListA extends Component {
    constructor(props) {
        super(props)

        this.listStock = [
            "ACB",
            "VNM",
            "HAG",
            "HCM",
            "TLH",
            "TNH",
            "BBC",
            "B82",
            "HBG",
            "HGM",
            "TQH",
            "TFH",
            "HGC",
            "B22",
            "ALC",
            "T82",
            "JBG",
            "KGM",
            "PQH",
            "YUH",
            "DHC",
            "UI2",
            "HTC",
            "BG2",
            "ARC",
            "TY2",
            "JQG",
            "KJM",
            "PKH",
            "YLH",
            "DUC",
            "UO2"
        ]

        this.state = {
            data : [
                
            ],
            modeView: MODE_CHANGE,
            stockSelected: "ACB",
            listStock: this.listStock.slice(0)
        }

        this.balance = {
            "change": 0.356,
            "volume": 0.555,
            "price": 0.666
        }


    }
    

    render() {
        let currency = "VND"
        let language = this.props.language.watchlist.header
        let header = [
            {
                title: language.stock,
                style: {width: "34%"},
                bodyStyle: {width: "34%"},
                accessor: "stockCode",
            },
            {
                title: language.price,
                style: {width: "33%", textAlign: "right"},
                bodyStyle: {width: "33%", textAlign: "right"},
                accessor: "price",
                cell: props => {
                    return this.fillColor(props, "price")
                }
            },
            {
                title: language.change,
                style: {width: "33%", textAlign: "right"},
                bodyStyle: {width: "33%", textAlign: "right"},
                accessor: "change",
                show: this.state.modeView == MODE_CHANGE,
                cell: props => {
                    return this.fillColor(props, "change")
                }
            },
            {
                title: language.volume,
                style: {width: "33%", textAlign: "right"},
                bodyStyle: {width: "33%", textAlign: "right"},
                accessor: "volume",
                show: this.state.modeView == MODE_VOL,
                cell: props => {
                    return this.fillColor(props, "volume")
                }
            },

        ]
        // console.log(this.state.stockSelected)
        return (
            <div style={{height: "100%", backgroundColor: "#FFF"}}>
                <div className="wl-sm-controls">
                    <input className="wl-sm-input" onChange={e => this.onStockChange(e)}/>
                    <div className="wl-sm-form-group">
                        <Radio name="radioGroup" inline checked={this.state.modeView == MODE_CHANGE} 
                            style={{margin: "0"}}
                            onChange={() => this.handleViewModeChange(MODE_CHANGE) }>
                            {"Change"}
                        </Radio>
                        
                        <Radio name="radioGroup" inline checked={this.state.modeView == MODE_VOL} 
                            style={{margin: "0 0 0 15px"}}
                            onChange={() => this.handleViewModeChange(MODE_VOL) }>
                            {"Volume"}
                        </Radio>
                    </div>
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
        this.setState({stockSelected: prop.stockCode})
        this.props.changeInstrument(prop.stockCode)

        // console.log(this.props)
    }

    onStockChange(e) {
        
        let val = e.target.value
        let tmp = this.listStock.filter(e => e.toUpperCase().includes(val.toUpperCase()))
        
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
            child = <span style={{color: "#ea0070"}}>{props[accessor]}</span>
        }
        else {
            child = <span style={{color: "#70a800"}}>{props[accessor]}</span>
        }
        return child
    }

    componentDidMount() {
        this.simulate()
        setInterval( this.simulate.bind(this) , 2000)

        if(this.state.listStock.length > 0) { 
            this.props.changeInstrument(this.state.listStock[0])
        }
    }

    simulate() {
        
        let _data = new Array()
        this.state.listStock.map(stock => {
            _data.push({
                "stockCode": stock,
                "price": Math.random().toFixed(4),
                "change": Math.random().toFixed(4),
                "volume": Math.random().toFixed(4)
                
            })
        })

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
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchListA)