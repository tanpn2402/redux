import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Title from "../commons/WidgetTitle"
import Body from "../commons/WidgetBody"
import Table from "../commons/DataTable"
import * as Utils from "../../utils"
import moment from "moment"
import config from "../../core/config"
import {TabControl, TabItem} from "../commons/TabControl"


// Transaction History For Mobile
class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: 1,

            orderHisColumns: [
                {
                    id: "ordergroupid",
                    accessor: "mvOrderGroupID",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "stockid",
                    accessor: "mvStockID",
                    width: 85,
                    skip: false,
                    show: true,
                },
                {
                    id: "price",
                    accessor: "mvPrice",
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: "quantity",
                    accessor: "mvStockID",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "filled",
                    accessor: "mvStockID",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "avgprice",
                    accessor: "mvMarketID",
                    width: 56,
                    skip: false,
                    show: true,
                },
                {
                    id: "status",
                    accessor: "mvBS",
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: "ordertype",
                    accessor: "mvQty",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "inputtime",
                    accessor: "mvFilledPrice",
                    width: 80,
                    skip: false,
                    show: true,
                }


            ],
            orderHisPageIndex: 1,

            cashHisColumns: [
                {
                    id: 'stockcode',
                    accessor: 'stockID',
                    width: 60,
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'stockname',
                    accessor: 'instrumentName',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'quantity',
                    accessor: 'qty',
                    width: 100,
                    skip: false,
                    skip: false,
                    show: true,
                    style: {textAlign: "right"}
                },
                {
                    id: 'price',
                    width: 100,
                    sortable: true,
                    skip: false,
                    show: true,
                    style: {textAlign: "right"}
                },
                {
                    id: 'currency',
                    accessor: 'currencyID',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'amount',
                    accessor: 'amt',
                    width: 150,
                    skip: false,
                    show: true,
                    style: {textAlign: "right"}
                },
                {
                    id: 'transdate',
                    accessor: 'tradeDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transtype',
                    accessor: 'txnType',
                    width: 150,
                    sortable: false,
                    skip: false,
                    show: true,
                },
            ],
            cashHisPageIndex: 1,
        }

        this.id = "transactionhistory"
        this.defaultPageSize = 15

        this.orderHisParams = {
            ClientID: config.cache.clientID,        // mandatory
            SessionID: config.cache.sessionID,        // mandatory

            // MarketID: "",
            Status: "",             // -> transaction status
            // BranchID: "",
            // OperatorID: "",
            // ChannelID: "MOB",
            StartDate: moment(new Date()).format("DD/MM/YYYY"),
            EndDate: moment(new Date()).format("DD/MM/YYYY"),
            Language: config.cache.lang
        }

        this.transHisParams = {
            clientID: config.cache.clientID,        // mandatory
            sessionID: config.cache.sessionID,        // mandatory
            
            // tradingAccSeq: config.cache.tradingAccSeq,
            fromDate: moment(new Date()).format("DD/MM/YYYY"),
            toDate: moment(new Date()).format("DD/MM/YYYY"),
            // MarketID: "",
            // InstrumentID: "",
            txnType: config.txnType[0],             // -> transaction type
            Language: config.cache.lang
            
        }
        
    }


    render() {
        let orderHisData = this.props.orderHistory
        let transHisData = this.props.transactionHistory

        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)}>
                        <TabItem eventKey={1} title="Order History" >
                            {
                                this.state.activeKey == 1 ? 
                                (
                                    <Table 
                                        theme={this.props.theme}
                                        id={"ordershistory"}
                                        language={this.props.language}
                                        key={"ordershistory"}

                                        pageSize={this.defaultPageSize}
                                        columns={this.state.orderHisColumns}
                                        tableData={orderHisData.OrderInfo}

                                        pageIndex={this.state.orderHisPageIndex}
                                        onPageChange={this.onOrderHisPageChange.bind(this)}
                                        totalPage={Math.ceil(orderHisData.OrderInfo.length / this.defaultPageSize)}
                                        onExportExcel={this.onExportExcel.bind(this)}

                                        searchParams={["mvStartDate", "mvEndDate"]}
                                        searchMobileParams={["mvStartDate", "mvEndDate", "mvTransStatus"]}
                                        searchActions={[]}
                                        searchData={{ mvTransStatus: [] }}
                                        searchDefaultValues={{
                                                mvStartDate: this.orderHisParams.StartTime, 
                                                mvEndDate: this.orderHisParams.EndTime,
                                                mvTransStatus: this.orderHisParams.Status}}
                                        onSearch={this.onOrderHisSearch.bind(this)}
                                    />
                                ) : null
                            }
                        </TabItem>
                        <TabItem eventKey={2} title="Cash Transation History">
                            {
                                this.state.activeKey == 2 ? 
                                (
                                    <Table 
                                        theme={this.props.theme}
                                        id={"transactionhistory"}
                                        language={this.props.language}
                                        key={"transactionhistory"}
                                        pageSize={this.defaultPageSize}
                                        columns={this.state.cashHisColumns}
                                        tableData={transHisData.OrderInfo}
        
                                        pageIndex={this.state.cashHisPageIndex}
                                        onPageChange={this.onCashHisPageChange.bind(this)}
                                        totalPage={Math.ceil(transHisData.loopCounter / this.defaultPageSize)}
                                        onExportExcel={this.onExportExcel.bind(this)}
        
                                        searchParams={["mvStartDate", "mvEndDate", "mvTxnType"]}
                                        searchMobileParams={["mvStartDate", "mvEndDate", "mvTxnType"]}
                                        searchActions={[]}
                                        searchData={{ tradeType: config.txnType }}
                                        searchDefaultValues={{
                                                mvEndDate: this.transHisParams.toDate, 
                                                mvStartDate: this.transHisParams.fromDate, 
                                                tradeType: this.transHisParams.txnType }}
                                        onSearch={this.onTransHisSearch.bind(this)}
        
                                        />
                                ) : null
                            }
                        </TabItem>
                    </TabControl>
                    

                </Body>
            </div>
        )

    }

    onTabChange(eventKey) {
        this.setState({ activeKey: eventKey })
    }

    componentDidMount() {
        this.props.onOrderHisSearch(this.orderHisParams)
        this.props.onTransHisSearch(this.transHisParams)
    }

    onOrderHisPageChange(page) {
        // this.state.orderHisPageIndex = page
        // this.orderHisParams["page"] = this.state.orderHisPageIndex
        // this.orderHisParams["start"] = (this.state.orderHisPageIndex - 1) * this.orderHisParams["limit"]
        this.props.onOrderHisSearch(this.orderHisParams)
    }

    onOrderHisSearch(param) {
        
        this.orderHisParams.StartDate = param.mvStartDate
        this.orderHisParams.EndDate = param.mvEndDate
        this.orderHisParams.Status = param.mvTransStatus
        this.props.onOrderHisSearch(this.orderHisParams)
    }

    onExportExcel() {}




    onTransHisSearch(param) {
        this.transHisParams.txnType = param.mvTxnType
        this.transHisParams.fromDate = param.mvStartDate
        this.transHisParams.toDate = param.mvEndDate

        this.props.onTransHisSearch(this.transHisParams)
    }

    onCashHisPageChange(page) {
        // this.state.cashHisPageIndex = page
        // this.transHisParams["page"] = this.state.cashHisPageIndex
        // this.transHisParams["start"] = (this.state.cashHisPageIndex - 1) * this.transHisParams["limit"]
        this.props.onTransHisSearch(this.transHisParams)
    }


}
const mapStateToProps = (state) => {
    return {
        orderHistory: state.daytrade.response,
        transactionHistory: state.orderhistory.transactionHistory
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onOrderHisSearch: (param) => {
        dispatch(actions.queryOrderInfo(param))
    },
    onTransHisSearch: (param, reload) => {
        dispatch(actions.transactionHistory(param))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportOrderHistory(param))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)