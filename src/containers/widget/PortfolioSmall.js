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
        this.pivot = "mvMarketID"
    }

    fillColor(props, accessor) {
        
        let theme = this.props.theme.bindingdata
        let style = theme.nochange

        if(props["mvPL"] > 0) {
            style = theme.up
        } else if(props["mvPL"] < 0) {
            style = theme.down
        }

        let content = props[accessor]
        if(accessor == "mvAvgPrice" || accessor == "mvMarketPrice" || accessor == "mvPL") {
            content = utils.formatCurrency(content)
        } else if(accessor == "mvTSettled" ) {
            content = utils.formatQty(content)
        }


        let child = <span style={style}>{content}</span>
        return child
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        let _data = new Array()
        nextProps.porfolioBeanList.mvPortfolioBeanList.map(e=>{
            // console.log(e)
            let avgPrice = e.mvAvgPrice
            let marketPrice = e.mvMarketPrice
            let pl = e.mvPL
            let stockRealtimeData = nextProps.listInstrumentData.filter(el => el.mvStockCode == e.mvStockID)
            
            if(stockRealtimeData.length > 0) {
                marketPrice = stockRealtimeData[0].mvMatchPrice
                pl = utils.round(utils.numUnFormat(e.mvTSettled) * ( marketPrice - utils.numUnFormat(avgPrice) ), 1)
            }
            // console.log(stockRealtimeData)

            _data.push({
                "stockCode": e.mvStockID,
                "mvTSettled": utils.formatQty(e.mvTSettled),
                "mvAvgPrice": utils.formatCurrency(avgPrice),
                "mvMarketPrice": marketPrice,
                "mvPL": utils.formatCurrency(pl),
                "mvMarketID": e.mvMarketID
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
                title: language.mvMarketID,
                style: {width: "55px"},
                bodyStyle: {width: "55px"},
                accessor: "mvMarket",
                cell: p => { return <span></span> }
            },
            {
                title: language.mvStockID,
                style: {width: "55px"},
                bodyStyle: {width: "55px"},
                accessor: "stockCode",
            },
            {
                title: language.mvTSettled,
                style: {width: "calc(24% - 25px)", textAlign: "right"},
                bodyStyle: {width: "calc(24% - 25px)", textAlign: "right"},
                accessor: "mvTSettled",
                // cell: props => {
                //     return this.fillColor(props, "mvTSettled")
                // }
            },
            {
                title: language.mvAvgPrice,
                style: {width: "calc(18% - 25px)", textAlign: "right"},
                bodyStyle: {width: "calc(18% - 25px)", textAlign: "right"},
                accessor: "mvAvgPrice",
                // cell: props => {
                //     return this.fillColor(props, "mvAvgPrice")
                // }
            },
            {
                title: language.mvMarketPrice,
                style: {width: "calc(18% - 25px)", textAlign: "right"},
                bodyStyle: {width: "calc(18% - 25px)", textAlign: "right"},
                accessor: "mvMarketPrice",
                cell: props => {
                    return this.fillColor(props, "mvMarketPrice")
                }
            },
            {
                title: language.mvPL,
                style: {width: "calc(28% - 35px)", textAlign: "right", paddingRight: "10px"},
                bodyStyle: {width: "calc(28% - 35px)", textAlign: "right"},
                accessor: "mvPL",
                cell: props => {
                    return this.fillColor(props, "mvPL")
                }
            },
        ]

        let theme = this.props.theme

        return (
            <Component className="trd-body" theme={theme}>
                <label style={theme.font.main} className="por-sm-title">{this.props.language.menu.portfolio}</label>
                <div className="por-sm-table">
                    <TTLTable data={this.state.data} header={header} theme={this.props.theme} pivot={this.pivot}
                        getTHeaderProps={(theader)=> {
                            // console.log(theader)

                        }}
                        getGroupHeaderProps={(data) => {
                            return {
                                style:{
                                    backgroundColor: "#2159a0",
                                    width: "100%",
                                    color: "white",
                                    paddingLeft: '10px'  
                                }
                            }
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


            let price = utils.numUnFormat(rowData.mvMarketPrice)
            if(cellData.accessor == "mvAvgPrice") price = utils.numUnFormat(rowData.mvAvgPrice)
            
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