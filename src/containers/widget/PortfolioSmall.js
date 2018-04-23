import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import config from "../../core/config"
import Component from "../commons/Component"
import * as utils from "../../utils"
import Table from '../commons/table/index'
import ConfigColumnTable from "../commons/ConfigColumnTable"
import $ from "jquery"

class PortfolioSmall extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            positionCol: [
                {
                    id: "orderGroupId",
                    accessor: "orderGroupId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: true,
                    show: false,
                    background: props.theme.table.colText,
                    Cell: p => this.renderValue(p, "orderGroupId")
                },
                {
                    id: "seriesId",
                    accessor: "seriesId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText,
                    Cell: p => this.renderValue(p, "seriesId")
                },
                {
                    id: "marketId",
                    accessor: "marketId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText,
                    Cell: p => this.renderValue(p, "marketId")
                },
                {
                    id: "isOutstanding",
                    accessor: "isOutstanding",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: true,
                    show: false,
                    background: props.theme.table.colText,
                    Cell: p => this.renderValue(p, "isOutstanding")
                },
                {
                    id: "tradePrice",
                    accessor: "tradePrice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderPrice(p, "tradePrice")
                },
                {
                    id: "ccy",
                    accessor: "ccy",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: true,
                    show: false,
                    background: props.theme.table.colText,
                    Cell: p => this.renderQty(p, "ccy")
                },
                {
                    id: "marketprice",
                    accessor: "marketprice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderPrice(p, "marketprice")
                },
                {
                    id: "askAvgPrice",
                    accessor: "askAvgPrice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderPrice(p, "askAvgPrice")
                },
                {
                    id: "bidAvgPrice",
                    accessor: "bidAvgPrice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderPrice(p, "bidAvgPrice")
                },
                {
                    id: "floatingPL",
                    accessor: "floatingPL",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderPL(p, "floatingPL")
                },
                {
                    id: "long",
                    accessor: "_long",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: false,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderQty(p, "_long")
                },
                {
                    id: "short",
                    accessor: "_short",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: false,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderQty(p, "_short")
                },
                {
                    id: "net",
                    accessor: "net",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: false,
                    background: props.theme.table.colNumber,
                    Cell: p => this.renderQty(p, "net")
                },
                {
                    id: "broadName",
                    accessor: "broadName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: false,
                    background: props.theme.table.colText,
                    Cell: p => this.renderValue(p)
                }
            ],

            data: [],

            pageIndex: 1
        }

        this.id = "portfolio"
        this.defaultPageSize = 10
        
    }

   
    renderValue(props, accessor) {
        return (<span className="por-sm-series" data-symbol={props.original.seriesId}>{props.value}</span>)
    }

    renderQty(props, accessor) {
        return (<span className="por-sm-series" data-symbol={props.original.seriesId}>{utils.quantityShowFormatter(props.value)}</span>)
    }

    renderPrice(props, accessor) {
        return (<span className="por-sm-series" data-symbol={props.original.seriesId}>{utils.currencyShowFormatter(props.value)}</span>)
    }

    renderPL(props, accessor) {
        let pl = parseFloat(props.original.marketprice) - parseFloat(props.original.bidAvgPrice)
        let styles = this.props.theme.bindingdata

        let style = pl == 0 ? styles.nochange : pl > 0 ? styles.up : styles.down

        return (
            <span className="por-sm-series" data-symbol={props.original.seriesId} style={style}>
                { (pl > 0 ? "+" : "") + utils.currencyShowFormatter(pl)} 
            </span>
        )
    }

    getData() {
        let {clientPortfolio} = this.props
        let get = () => {
            let data = []
            let tmp  = clientPortfolio.openPositionSummaryList == null ? [] : clientPortfolio.openPositionSummaryList
            data = tmp.map(e => {
                for (var key in e.orderInfo) {
                    if (e.orderInfo.hasOwnProperty(key)) {
                        e[key] = e.orderInfo[key]
                    }
                }
                delete e.orderInfo

                return e
            })
            return data
        }

        let data = get()
        return data == null ? [] : data
    }

    render() {
        let {theme, language} = this.props
        let data = this.getData()
        this.state.data = data

        return (
            <Component className="trd-body" theme={theme}>
                <div className="por-sm-header">
                    <label style={theme.font.main} className="por-sm-title">{this.props.language.menu.portfolio}</label>
                    <ConfigColumnTable
                        id={this.id}
                        columns={this.state.positionCol}
                        filterEnabled={false}
                        language={language}
                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                        onToggleFilter={(e) => { }} />
                </div>
                <div className="por-sm-table">
                    <Table 
                        theme={theme}
                        id={this.id}
                        language={language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.positionCol}
                        filterable={false}
                        tableData={data.slice( (this.state.pageIndex -1)*this.defaultPageSize, this.state.pageIndex*this.defaultPageSize)}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(data.length / this.defaultPageSize)}

                        searchEnable={false}
                        footerEnable={false}
                        />
                </div>
            </Component>
        )
    }

    onPageChange(pageIndex) {
        this.setState({ pageIndex: pageIndex });
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            positionCol: this.state.positionCol.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    componentDidMount() {
        // let params = {
        //     mvLastAction: 'AccountInfo',
        //     mvChildLastAction: 'AccountInfo',
        //     key: (new Date()).getTime(),
        // }
        // this.props.getPorfolio(params)


        console.log(this.props)
        // for Derivatives account
        this.props.clientPortfolioEnquiryFS({
            tradingAccSeq : parseInt(this.props.currentTrdAccount.accountSeq),
            subAccountID : this.props.currentTrdAccount.subAccountID
        })
    }

    componentDidUpdate() {
        let sefl = this,
            data = this.state.data
        $(".por-sm-series")
        .mouseenter(function(e) {
            $(this).parent().parent().addClass("-hover")
        })
        .mouseleave(function(e){
            $(this).parent().parent().removeClass("-hover")
        })
        .click(function(e) {
            let symbol = e.target.getAttribute("data-symbol")
            let t = data.filter(e => e.seriesId == symbol)
            console.log(symbol, t)
            if(t.length > 0) {
                let bs = t[0]._long > t[0]._short ? "BUY" : "SELL"
                sefl.props.setDefaultOrderParams({
                    mvBS: bs,
                    mvStockCode: t[0].seriesId,
                    mvStockName: t[0].seriesId,
                    mvMarketID: t[0].marketId,
                    mvQty: bs == "SELL" ? t[0]._short : t[0]._long,
                    mvPrice: t[0].bidAvgPrice
                })
            }
        })
    }
}
const mapStateToProps = (state) => {
    return {
        clientPortfolio: state.portfolio.clientPortfolio,

        currentTrdAccount: state.dologin.currentTrdAccount,
        tradingAccounts: state.dologin.tradingAccounts,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getPorfolio: (params) => { dispatch(actions.getPorfolio(params)) },
    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },

    clientPortfolioEnquiryFS:(param) => { dispatch(actions.clientPortfolioEnquiryFS(param)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioSmall)