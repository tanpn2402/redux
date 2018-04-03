import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/table/index'
import * as Utils from '../../utils'
import {TabControl, TabItem} from "../commons/TabControl"

const images = Utils.importAll(require.context('../../assets/images/flags', false, /\.(png|jpe?g|svg)$/))

const { Contants } = require("../../core/constants")
class PortfolioFS extends Component {
    constructor(props) {
        super(props)
        this.id = "portfolio"
        this.defaultPageSize = 15

        this.params = {
            mvLastAction: 'AccountInfo',
            mvChildLastAction: 'AccountInfo',
            key: (new Date()).getTime(),
        }

        this.state = {
            pageIndex: 1,
            activeKey: 2,

            cpdwCol: [
                {
                    id: "txnID",
                    accessor: "txnID",
                    minWidth: 80,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "tranDate",
                    accessor: "tranDate",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "inputDate",
                    accessor: "inputDate",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "counterPartyAccountID",
                    accessor: "counterPartyAccountID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "counterPartyAccountName",
                    accessor: "counterPartyAccountName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "brokerID",
                    accessor: "brokerID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "brokerName",
                    accessor: "brokerName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "txnTypeID",
                    accessor: "txnTypeID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "txnTypeDesc",
                    accessor: "txnTypeDesc",
                    minWidth: 80,
                    maxWidth: 140,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "bankID",
                    accessor: "bankID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "bankShortName",
                    accessor: "bankShortName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "accountCode",
                    accessor: "accountCode",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "chequeNumber",
                    accessor: "chequeNumber",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "currencyID",
                    accessor: "currencyID",
                    minWidth: 100,
                    maxWidth: 120,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "remarks",
                    accessor: "remarks",
                    minWidth: 200,
                    maxWidth: 300,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "csettled",
                    accessor: "csettled",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "otherType",
                    accessor: "otherType",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "movementID",
                    accessor: "movementID",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                }
            ],
            openposCol: [
                {
                    id: "orderGroupId",
                    accessor: "orderGroupId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "seriesId",
                    accessor: "seriesId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "marketId",
                    accessor: "marketId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "bs",
                    accessor: "bs",
                    minWidth: 60,
                    maxWidth: 110,
                    skip: false,
                    show: true,
                },
                {
                    id: "isOutstanding",
                    accessor: "isOutstanding",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: true,
                    show: false,
                    background: props.theme.table.colText
                },
                {
                    id: "tradePrice",
                    accessor: "tradePrice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "ccy",
                    accessor: "ccy",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "marketprice",
                    accessor: "marketprice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "tradePrice",
                    accessor: "tradePrice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "floatingPL",
                    accessor: "floatingPL",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "long",
                    accessor: "_long",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "short",
                    accessor: "_short",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "net",
                    accessor: "net",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "broadName",
                    accessor: "broadName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                }
            ],
            closeposCol: [
                {
                    id: "orderGroupId",
                    accessor: "orderGroupId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "seriesId",
                    accessor: "seriesId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "marketId",
                    accessor: "marketId",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "bs",
                    accessor: "bs",
                    minWidth: 60,
                    maxWidth: 110,
                    skip: false,
                    show: true,
                },
                {
                    id: "isOutstanding",
                    accessor: "isOutstanding",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: true,
                    show: false,
                    background: props.theme.table.colText
                },
                {
                    id: "tradePrice",
                    accessor: "tradePrice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "ccy",
                    accessor: "ccy",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "marketprice",
                    accessor: "marketprice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "tradePrice",
                    accessor: "tradePrice",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "tradePL",
                    accessor: "floatingPL",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "long",
                    accessor: "_long",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "short",
                    accessor: "_short",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "net",
                    accessor: "net",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "broadName",
                    accessor: "broadName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                }
            ],
            stockbalCol: [
                {
                    id: "MarketID",
                    accessor: "MarketID",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "StockID",
                    accessor: "StockID",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "StockName",
                    accessor: "StockName",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "Qty",
                    accessor: "Qty",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "Currency",
                    accessor: "Currency",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "Price",
                    accessor: "Price",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "MarketValue",
                    accessor: "MarketValue",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "StockCollateralQty",
                    accessor: "StockCollateralQty",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "StockCollateralPercentage",
                    accessor: "StockCollateralPercentage",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "StockCollateralValue",
                    accessor: "StockCollateralValue",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                }
            ],
            stockmovCol: [

                {
                    id: "TranID",
                    accessor: "TranID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "TranDate",
                    accessor: "TranDate",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "InputDate",
                    accessor: "InputDate",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "ClientID",
                    accessor: "ClientID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "TradingAccSeq",
                    accessor: "TradingAccSeq",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "AEID",
                    accessor: "AEID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "ProductID",
                    accessor: "ProductID",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "MarketID",
                    accessor: "MarketID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "InstrumentID",
                    accessor: "InstrumentID",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "TranType",
                    accessor: "TranType",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },

                {
                    id: "TranTypeDesc",
                    accessor: "TranTypeDesc",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "SettleBrokerLocationID",
                    accessor: "SettleBrokerLocationID",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "SettleLocationSeq",
                    accessor: "SettleLocationSeq",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "Qty",
                    accessor: "Qty",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "RegisteredQty",
                    accessor: "RegisteredQty",
                    width: 80,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "Remark",
                    accessor: "Remark",
                    minWidth: 150,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "CurrencyID",
                    accessor: "CurrencyID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "CostPerShare",
                    accessor: "CostPerShare",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "SettleInstrumentBy",
                    accessor: "SettleInstrumentBy",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "SettleInterfaceID",
                    accessor: "SettleInterfaceID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },


                {
                    id: "SettleCurrencyID",
                    accessor: "SettleCurrencyID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "Amount",
                    accessor: "Amount",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "FeeAmount",
                    accessor: "FeeAmount",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "CreatorUserID",
                    accessor: "CreatorUserID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "LastApproverUserID",
                    accessor: "LastApproverUserID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "OverridedFlag",
                    accessor: "OverridedFlag",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "State",
                    accessor: "State",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "InstrumentShortName",
                    accessor: "InstrumentShortName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "Name",
                    accessor: "Name",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "BaseCCY",
                    accessor: "BaseCCY",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "BranchID",
                    accessor: "BranchID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "ClientRemarks",
                    accessor: "ClientRemarks",
                    minWidth: 150,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "BranchName",
                    accessor: "BranchName",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "BaseCurrency",
                    accessor: "BaseCurrency",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "MarketCurrency",
                    accessor: "MarketCurrency",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "LocalMarketFlag",
                    accessor: "LocalMarketFlag",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "FreezeType",
                    accessor: "FreezeType",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "FreezeTypeDesc",
                    accessor: "FreezeTypeDesc",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "ReleaseDate",
                    accessor: "ReleaseDate",
                    minWidth: 80,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "TradingBranchID",
                    accessor: "TradingBranchID",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "SettleInstrumentByDesc",
                    accessor: "SettleInstrumentByDesc",
                    minWidth: 50,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                }
            ],



            filterable: false
        }
    }

    onTabChange(key) {
        this.setState({activeKey: key})
    }

    _renderTitle(title, i) {
        let theme = this.props.theme.font
        let font = this.state.activeKey == i ? {fontWeight: "bold"} : {fontWeight: "normal"}
        return <div style={font} className="wl-sm-tab-title">{title}</div>
    }

    getColumn() {
        switch(this.state.activeKey) {
            case 1: return this.state.cpdwCol
            case 2: return this.state.openposCol
            case 3: return this.state.closeposCol
            case 4: return this.state.stockbalCol
            case 5: return this.state.stockmovCol
            
        }
    }

    getColumnKey() {
        switch(this.state.activeKey) {
            case 1: return "cpdwCol"
            case 2: return "openposCol"
            case 3: return "closeposCol"
            case 4: return "stockbalCol"
            case 5: return "stockmovCol"
            
        }
    }

    getData() {
        let {clientPortfolio} = this.props
        console.log(clientPortfolio)
        let get = () => {
            let data = []
            let tmp = []
            switch(this.state.activeKey) {
                case 1: return clientPortfolio.counterPartyDWList == null ? [] : clientPortfolio.counterPartyDWList
                case 2: 
                    tmp = clientPortfolio.openPositionSummaryList == null ? [] : clientPortfolio.openPositionSummaryList
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
                case 3: 
                    tmp = clientPortfolio.closePositionSummaryList == null ? [] : clientPortfolio.closePositionSummaryList
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
                case 4: return clientPortfolio.stockBalanceList == null ? [] : clientPortfolio.stockBalanceList
                case 5: return clientPortfolio.stockMovementList == null ? [] : clientPortfolio.stockMovementList
                
            }
        }

        let data = get()
        console.log(data)
        return data == null ? [] : data
    }

    render() {
        let {theme, language} = this.props
        let column = this.getColumn()
        let data = this.getData()
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={language} theme={this.props.theme}
                    columns={column}
                    widgetID= 'portfolio'
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)} theme={this.props.theme}>
                        {/* <TabItem eventKey={1} title={this._renderTitle(language.portfolio.tab.cpdw, 1)} >
                            <Table 
                                theme={theme}
                                id={this.id}
                                language={language}

                                pageSize={this.defaultPageSize}
                                columns={this.state.cpdwCol}
                                filterable={this.state.filterable}
                                tableData={data.slice( (this.state.pageIndex -1)*this.defaultPageSize, this.state.pageIndex*this.defaultPageSize)}

                                pageIndex={this.state.pageIndex}
                                onPageChange={this.onPageChange.bind(this)}
                                totalPage={Math.ceil(data.length / this.defaultPageSize)}

                                searchEnable={false}

                            />
                        </TabItem> */}
                        <TabItem eventKey={2} title={this._renderTitle(language.portfolio.tab.openposition, 1)} >
                            <Table 
                                theme={theme}
                                id={this.id}
                                language={language}

                                pageSize={this.defaultPageSize}
                                columns={this.state.openposCol}
                                filterable={this.state.filterable}
                                tableData={data.slice( (this.state.pageIndex -1)*this.defaultPageSize, this.state.pageIndex*this.defaultPageSize)}

                                pageIndex={this.state.pageIndex}
                                onPageChange={this.onPageChange.bind(this)}
                                totalPage={Math.ceil(data.length / this.defaultPageSize)}

                                searchEnable={false}

                            />

                        </TabItem>
                        <TabItem eventKey={3} title={this._renderTitle(language.portfolio.tab.closeposition, 1)} >
                            <Table 
                                theme={theme}
                                id={this.id}
                                language={language}

                                pageSize={this.defaultPageSize}
                                columns={this.state.closeposCol}
                                filterable={this.state.filterable}
                                tableData={data.slice( (this.state.pageIndex -1)*this.defaultPageSize, this.state.pageIndex*this.defaultPageSize)}

                                pageIndex={this.state.pageIndex}
                                onPageChange={this.onPageChange.bind(this)}
                                totalPage={Math.ceil(data.length / this.defaultPageSize)}

                                searchEnable={false}

                            />

                        </TabItem>
                        {/* <TabItem eventKey={4} title={this._renderTitle(language.portfolio.tab.stockbalance, 1)} >
                            <Table 
                                theme={theme}
                                id={this.id}
                                language={language}

                                pageSize={this.defaultPageSize}
                                columns={this.state.stockbalCol}
                                filterable={this.state.filterable}
                                tableData={data.slice( (this.state.pageIndex -1)*this.defaultPageSize, this.state.pageIndex*this.defaultPageSize)}

                                pageIndex={this.state.pageIndex}
                                onPageChange={this.onPageChange.bind(this)}
                                totalPage={Math.ceil(data.length / this.defaultPageSize)}

                                searchEnable={false}

                            />

                        </TabItem> */}
                        {/* <TabItem eventKey={5} title={this._renderTitle(language.portfolio.tab.stockmovement, 1)} >
                            <Table 
                                theme={theme}
                                id={this.id}
                                language={language}

                                pageSize={this.defaultPageSize}
                                columns={this.state.stockmovCol}
                                filterable={this.state.filterable}
                                tableData={data.slice( (this.state.pageIndex -1)*this.defaultPageSize, this.state.pageIndex*this.defaultPageSize)}

                                pageIndex={this.state.pageIndex}
                                onPageChange={this.onPageChange.bind(this)}
                                totalPage={Math.ceil(data.length / this.defaultPageSize)}

                                searchEnable={false}

                            />

                        </TabItem> */}

                    </TabControl>

                            

                </Body>
            </div>
        )

    }

    onCellClick(state, rowInfo, column, instance) {
        
    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.clientPortfolioEnquiryFS({
            tradingAccSeq : parseInt(this.props.tradingAccount.accountSeq),
            subAccountID : this.props.tradingAccount.subAccountID
        })
    }

    onChangeStateColumn(e) {
        const column = this.getColumn()
        const columnKey = this.getColumnKey()

        const id = e.target.id
        this.setState({
            columnKey: column.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        this.setState({ pageIndex: pageIndex });
    }
}

const mapStateToProps = (state) => {
    return {
        clientPortfolio: state.portfolio.clientPortfolio
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    clientPortfolioEnquiryFS:(param) => { dispatch(actions.clientPortfolioEnquiryFS(param)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioFS)
