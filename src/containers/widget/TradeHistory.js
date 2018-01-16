import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"

class TradeHistory extends Component {
    constructor(props) {
        super(props)
        this.id = "tradehistory"
        this.state = {
            data : [
                
            ]
        }

        this.balance = {
            "price": 0.235
        }
    }

    fillColor(props, accessor) {
        let child = <span style={{color: "#000"}}>{props[accessor]}</span>
        if(props["price"] > this.balance["price"]) {
            child = <span style={{color: "#ea0070"}}>{props[accessor]}</span>
        }
        else {
            child = <span style={{color: "#70a800"}}>{props[accessor]}</span>
        }
        return child
    }

    render() {
        let currency = "VND"
        let language = this.props.language.trading.header
        let header = [
            
            {
                title: language.time,
                style: {width: "25%", textAlign: "right", paddingRight: "10px"},
                bodyStyle: {width: "25%", textAlign: "right"},
                accessor: "time"
            },
            {
                title: language.price.replace("{0}", ""),
                style: {width: "25%", textAlign: "right", paddingRight: "10px"},
                bodyStyle: {width: "25%", textAlign: "right"},
                accessor: "price",
                cell: props => {
                    return this.fillColor(props, "price")
                }
            },
            {
                title: language.vol,
                style: {width: "25%", textAlign: "right", paddingRight: "0px"},
                bodyStyle: {width: "25%", textAlign: "right"},
                accessor: "vol",
                cell: props => {
                    return this.fillColor(props, "vol")
                }
            },
            {
                title: language.totalvol,
                style: {width: "25%", textAlign: "right"},
                bodyStyle: {width: "25%", textAlign: "right"},
                accessor: "totalvol",
                cell: props => {
                    return this.fillColor(props, "totalvol")
                }
            }
        ]

        return (
            <div className="trd-body" style={{height: "100%", backgroundColor: "#FFF"}}>
                <label>{this.props.language.menu.tradehistory}</label>
                <div className="trd-log-table">
                    <TTLTable data={this.state.data} header={header}
                        getTHeaderProps={(theader)=> {
                            // theader.style.display = "none"

                        }}
                        getTBodyProps={(tbody)=>{
                            // tbody.style.height = "100%"
                        }}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        
        setInterval( this.simulate.bind(this) , 2000)
    }

    simulate() {
        // console.log("adssddsdsd")
        let _data = this.state.data
        _data.unshift({
            "price": Math.random().toFixed(4) + 10,
            "vol": Math.random().toFixed(4),
            "totalvol": Math.random().toFixed(4),
            "time": moment().format("HH:mm:ss")
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
        instrument: state.trading.instrument
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory)