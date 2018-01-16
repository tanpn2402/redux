import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"

class PortfolioSmall extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ]
        }

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
            "B22"
        ]

        this.balance = 0.3654

        this.balance = {
            "change": 0.356,
            "volume": 0.555,
            "price": 0.666
        }
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

    render() {
        let currency = "VND"
        let language = this.props.language.portfolio.header
        let header = [
            {
                title: language.mvStockID,
                style: {width: "20%"},
                bodyStyle: {width: "20%"},
                accessor: "stockCode",
            },
            {
                title: language.mvTSettled,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "price",
                cell: props => {
                    return this.fillColor(props, "price")
                }
            },
            {
                title: language.mvAvgPrice,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "change",
                cell: props => {
                    return this.fillColor(props, "change")
                }
            },
            {
                title: language.mvMarketPrice,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "change",
                cell: props => {
                    return this.fillColor(props, "change")
                }
            },
            {
                title: language.mvPL,
                style: {width: "20%", textAlign: "right", paddingRight: "10px"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "change",
                cell: props => {
                    return this.fillColor(props, "change")
                }
            },
        ]

        return (
            <div  className="trd-body" style={{height: "100%", backgroundColor: "#FFF"}}>
                <label>{this.props.language.menu.portfolio}</label>
                <div className="por-sm-table">
                    <TTLTable data={this.state.data} header={header}
                        getTHeaderProps={(theader)=> {
                            // console.log(theader)

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
        
        let _data = new Array()
        this.listStock.map(stock => {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioSmall)