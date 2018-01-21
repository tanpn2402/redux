import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"

class PortfolioSmall extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ]
        }
        this.params = {
            mvLastAction: 'AccountInfo',
            mvChildLastAction: 'AccountInfo',
            key: (new Date()).getTime(),
        }

        this.balance = 0.3654

        this.balance = {
            "change": 0.356,
            "volume": 0.555,
            "price": 0.666
        }
    }

    fillColor(props, accessor) {
        
        
        let color = "#000"
        if(props[accessor] < 0) {
            color = "#ea0070"
        } else if (props[accessor] > 0 ) {
            color = "#70a800"
        }
        let child = <span style={{color: color}}>{props[accessor]}</span>
        // if(props[accessor] > this.balance[accessor]) {
        //     child = <span style={{color: "#ea0070"}}>{props[accessor]}</span>
        // }
        // else {
        //     child = <span style={{color: "#70a800"}}>{props[accessor]}</span>
        // }
        return child
    }

    componentWillReceiveProps(nextProps) {
        let _data = new Array()
        nextProps.porfolioBeanList.mvPortfolioBeanList.map(e=>{
            // console.log(e)
            _data.push({
                "stockCode": e.mvStockID,
                "mvTSettled": e.mvTSettled,
                "mvAvgPrice": e.mvAvgPrice,
                "mvMarketPrice": e.mvMarketPrice,
                "mvPL": e.mvPL
                
            })
        })
        this.setState({
            data: _data
        })
    }

    render() {
        let currency = "VND"
        let language = this.props.language.portfolio.header
        let header = [
            {
                title: language.mvStockID,
                style: {width: "15%"},
                bodyStyle: {width: "15%"},
                accessor: "stockCode",
            },
            {
                title: language.mvTSettled,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "mvTSettled",
                // cell: props => {
                //     return this.fillColor(props, "mvTSettled")
                // }
            },
            {
                title: language.mvAvgPrice,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "mvAvgPrice",
                // cell: props => {
                //     return this.fillColor(props, "mvAvgPrice")
                // }
            },
            {
                title: language.mvMarketPrice,
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "mvMarketPrice",
                // cell: props => {
                //     return this.fillColor(props, "mvMarketPrice")
                // }
            },
            {
                title: language.mvPL,
                style: {width: "25%", textAlign: "right", paddingRight: "10px"},
                bodyStyle: {width: "25%", textAlign: "right"},
                accessor: "mvPL",
                cell: props => {
                    return this.fillColor(props, "mvPL")
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
                        onRowClick={(e, data)=> this.onRowClick(e, data)}
                    />
                </div>
            </div>
        )
    }

    onRowClick(e, data) {
        let stock = config.cache.stockList.filter(s => s.stockCode == data.stockCode)
        // console.log(data)
        if(stock.length > 0 && data.mvTSettled != 0) {
            
            let tmp = stock[0]
            this.props.setDefaultOrderParams({
                mvBS: "SELL",
                mvStockCode: tmp.stockCode,
                mvStockName: tmp.stockName,
                mvMarketID: tmp.mvMarketID
            })
        }
    }

    componentDidMount() {
        
        this.interval = setInterval( this.simulate.bind(this) , 1500)
        this.props.getPorfolio(this.params)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    simulate() {
        
        let _data = new Array()
        this.state.data.map(stock => {

            let avgPrice =  (Math.floor(Math.random() * 20) + 9) + Math.random().toFixed(2)
            let marketPrice = (Math.floor(Math.random() * 20) + 9) +  Math.random().toFixed(2)
            _data.push({
                "stockCode": stock.stockCode,
                "mvAvgPrice": avgPrice,
                "mvTSettled": stock.mvTSettled,
                "mvMarketPrice": marketPrice,
                "mvPL": Math.round( (marketPrice - avgPrice)*1000)/1000
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
        porfolioBeanList: state.trading.portfolioData,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getPorfolio: (params) => { dispatch(actions.getPorfolio(params)) },
    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioSmall)