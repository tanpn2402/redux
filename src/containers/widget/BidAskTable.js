import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"

class BidAskTable extends Component {
    constructor(props) {
        super(props)

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
                accessor: "value3",
            }
        ]

        return (
            <div style={{height: "100%", backgroundColor: "#FFF"}}>
                <TTLTable data={this.state.data} header={header}
                    getTHeaderProps={(theader)=> {
                        // console.log(theader)

                    }}
                />
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
        instrument: state.trading.instrument
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BidAskTable)