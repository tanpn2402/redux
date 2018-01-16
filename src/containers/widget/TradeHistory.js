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

        this.balance = 0.3654
    }

    render() {
        let currency = "VND"
        let language = this.props.language.trading.header
        let header = [
            {
                title: language.price.replace("{0}", "(" + currency + ")"),
                style: {width: "34%"},
                bodyStyle: {width: "34%"},
                accessor: "value1",
                cell: props => {
                    let child = <span style={{color: "#70a800"}}>{props.value1}</span>
                    if(props.value1 > this.balance) {
                        child = <span style={{color: "#ea0070"}}>{props.value1}</span>
                    }
                    else {

                    }
                    return child
                }
            },
            {
                title: language.amount.replace("{0}", "(" + currency + ")"),
                style: {width: "33%", textAlign: "right"},
                bodyStyle: {width: "33%", textAlign: "right"},
                accessor: "value2"
            },
            {
                title: language.total.replace("{0}", "(" + currency + ")"),
                style: {width: "33%", textAlign: "right"},
                bodyStyle: {width: "33%", textAlign: "right"},
                accessor: "value3"
            }
        ]

        return (
            <div style={{height: "100%", backgroundColor: "#FFF"}}>
                <label>{this.props.language.menu.tradehistory}</label>
                <div style={{height: "calc(100% - 22px)"}}>
                    <TTLTable data={this.state.data} header={header}
                        getTHeaderProps={(theader)=> {
                            theader.style.display = "none"

                        }}
                        getTBodyProps={(tbody)=>{
                            tbody.style.height = "100%"
                        }}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        
        setInterval( this.simulate.bind(this) , 1500)
    }

    simulate() {
        // console.log("adssddsdsd")
        let _data = this.state.data
        _data.unshift({
            "value1": Math.random().toFixed(8),
            "value2": Math.random().toFixed(4),
            "value3": moment().format("HH:mm:ss")
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