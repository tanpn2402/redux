import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"
import Component from "../commons/Component"
import * as utils from "../../utils"

class PortfolioSmall extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ]
        }
    }

    fillColor(props, accessor) {
        
        let theme = this.props.theme.bindingdata
        let style = theme.nochange

        if(props["mvPL"] > 0) {
            style = theme.up
        } else if(props["mvPL"] < 0) {
            style = theme.down
        }

        let child = <span style={style}>{props[accessor]}</span>
        return child
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        let _data = new Array()
        nextProps.porfolioBeanList.mvPortfolioBeanList.map(e=>{
            console.log(e)
            let avgPrice = e.mvWAC
            let marketPrice = e.mvMarketPrice
            let pl = e.mvPL
            let stockRealtimeData = nextProps.listInstrumentData.filter(el => el.mvStockCode == e.mvStockID)
            
            if(stockRealtimeData.length > 0) {
                marketPrice = stockRealtimeData[0].mvMatchPrice
                pl = utils.round(utils.numUnFormat(e.mvTSettled) * ( marketPrice - avgPrice ), 1)
            }
            console.log(stockRealtimeData)

            _data.push({
                "stockCode": e.mvStockID,
                "mvTSettled": e.mvTSettled,
                "mvAvgPrice": avgPrice,
                "mvMarketPrice": marketPrice,
                "mvPL": pl
                
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
                style: {width: "12%"},
                bodyStyle: {width: "12%"},
                accessor: "stockCode",
            },
            {
                title: language.mvTSettled,
                style: {width: "24%", textAlign: "right"},
                bodyStyle: {width: "24%", textAlign: "right"},
                accessor: "mvTSettled",
                // cell: props => {
                //     return this.fillColor(props, "mvTSettled")
                // }
            },
            {
                title: language.mvAvgPrice,
                style: {width: "18%", textAlign: "right"},
                bodyStyle: {width: "18%", textAlign: "right"},
                accessor: "mvAvgPrice",
                // cell: props => {
                //     return this.fillColor(props, "mvAvgPrice")
                // }
            },
            {
                title: language.mvMarketPrice,
                style: {width: "18%", textAlign: "right"},
                bodyStyle: {width: "18%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvMarketPrice")
                }
            },
            {
                title: language.mvPL,
                style: {width: "28%", textAlign: "right", paddingRight: "10px"},
                bodyStyle: {width: "28%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvPL")
                }
            },
        ]

        let theme = this.props.theme

        return (
            <Component className="trd-body" theme={theme}>
                <label style={theme.font.main}>{this.props.language.menu.portfolio}</label>
                <div className="por-sm-table">
                    <TTLTable data={this.state.data} header={header} theme={this.props.theme}
                        getTHeaderProps={(theader)=> {
                            // console.log(theader)

                        }}
                        onCellClick={(e, rowData, cellData)=> this.onRowClick(e, rowData, cellData)}
                    />
                </div>
            </Component>
        )
    }

    onRowClick(e, rowData, cellData) {
        let stock = config.cache.stockList.filter(s => s.stockCode == rowData.stockCode)
       
        if(stock.length > 0 && rowData.mvTSettled != 0) {
           
            let qty = rowData.mvTSettled
            let marketPrice = rowData.mvMarketPrice
            let avgPrice = rowData.mvAvgPrice


            let price = rowData.mvMarketPrice
            if(cellData.accessor == "mvAvgPrice") price = rowData.mvAvgPrice
            
            let tmp = stock[0]
            this.props.setDefaultOrderParams({
                mvBS: "SELL",
                mvStockCode: tmp.stockCode,
                mvStockName: tmp.stockName,
                mvMarketID: tmp.mvMarketID,
                mvQty: qty,
                mvPrice: price
            })
        }
    }

    componentDidMount() {
        let params = {
            mvLastAction: 'AccountInfo',
            mvChildLastAction: 'AccountInfo',
            key: (new Date()).getTime(),
        }
        this.props.getPorfolio(params)
    }
}
const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument,
        porfolioBeanList: state.trading.portfolioData,
        listInstrumentData: state.trading.listInstrumentData
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getPorfolio: (params) => { dispatch(actions.getPorfolio(params)) },
    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioSmall)