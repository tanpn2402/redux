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

        this.balance = {
            "price1": 0.356,
            "qty1": 0.555,
            "price2": 0.666,
            "qty2": 0.3333
        }
    }

    render() {
        let currency = "VND"
        let language = this.props.language.trading.header
        let header = [
            {
                title: language.price.replace("{0}", "1"),
                style: {width: "25%", textAlign: "center"},
                bodyStyle: {width: "25%", textAlign: "right", paddingRight: "10px"},
                accessor: "value1",
                cell: props => {return this.fillColor(props, "price1")}
            },
            {
                title: language.qty.replace("{0}", "1"),
                style: {width: "25%", textAlign: "center"},
                bodyStyle: {width: "25%", textAlign: "right", paddingRight: "10px"},
                accessor: "value2",
                cell: props => {return this.fillColor(props, "qty1")}
            },
            {
                title: language.price.replace("{0}", "2"),
                style: {width: "25%", textAlign: "center"},
                bodyStyle: {width: "25%", textAlign: "right", paddingRight: "10px"},
                accessor: "value3",
                cell: props => {return this.fillColor(props, "price2")}
            },
            {
                title: language.qty.replace("{0}", "2"),
                style: {width: "25%", textAlign: "center"},
                bodyStyle: {width: "25%", textAlign: "right", paddingRight: "10px"},
                accessor: "value4",
                cell: props => {return this.fillColor(props, "qty2")}
            },
        ]

        return (
            <div className="trd-body" style={{height: "100%", backgroundColor: "#FFF"}}>
                <TTLTable data={this.state.data} header={header}
                    getTHeaderProps={(theader)=> {
                        // console.log(theader)

                    }}
                />
            </div>
        )
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
        
        setInterval( this.simulate.bind(this) , 2000)
    }

    simulate() {
        // console.log("adssddsdsd")
        let _data = this.state.data
        _data.unshift({
            "price1": Math.random().toFixed(6),
            "qty1": Math.random().toFixed(6),
            "price2": Math.random().toFixed(6),
            "qty2": Math.random().toFixed(6),
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