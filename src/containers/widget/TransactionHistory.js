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
                    width: 80,
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
                    id: "marketid",
                    accessor: "mvMarketID",
                    width: 56,
                    skip: false,
                    show: true,
                },
                {
                    id: "buysell",
                    accessor: "mvBS",
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: "quantity",
                    accessor: "mvQty",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "filledprice",
                    accessor: "mvFilledPrice",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "filledquantity",
                    accessor: "mvFilledQty",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "matchedvalue",
                    accessor: "mvAvgPriceValue",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "tradingtype",
                    accessor: "mvOrderTypeValue",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "matchedorderstatus",
                    accessor: "mvStatus",
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: "matcheddate",
                    accessor: "matchedDate",
                    width: 130,
                    skip: false,
                    show: true,
                },
                {
                    id: "tradetime",
                    accessor: "mvInputTime",
                    width: 100,
                    skip: false,
                    show: true,
                },


            ],
            orderHisPageIndex: 1,

            cashHisColumns: [
                {
                    id: 'transid',
                    accessor: 'tranID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'amount',
                    accessor: 'totalLendingAmt',
                    width: 120,
                    skip: false,
                    skip: false,
                    show: true,
                    style: {textAlign: "right"}
                },
                {
                    id: 'datetrans',
                    accessor: 'trandate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transtype',


                    width: 150,
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    width: 70,
                    maxWidth: 80,
                    sortable: true,
                    skip: false,
                    show: true,
                },
                {
                    id: 'notes',
                    accessor: 'remark',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'lastupdate',
                    accessor: 'lastApprovaltime',
                    width: 150,
                    skip: false,
                    show: true,
                }
            ],
            cashHisPageIndex: 1,
        }

        this.id = "ordershistory"
        this.defaultPageSize = 15

        this.orderHisParams = {
            start: 0,
            limit: 15,
            mvBS: "A",
            mvInstrumentID: "ALL",
            mvStatus: "ALL",
            mvSorting: "InputTime desc",
            mvStartTime: "01/01/2001",
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        }

        this.cashHisParams = {
            tradeType: 'ALL',
            mvStartDate: "01/01/2001",
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: this.defaultPageSize,
            page: 1
        }
        
    }


    render() {
        
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)}>
                        <TabItem eventKey={1} title="Order History" >
                            <Table 
                                theme={this.props.theme}
                                id={"ordershistory"}
                                language={this.props.language}

                                pageSize={this.defaultPageSize}
                                columns={this.state.orderHisColumns}
                                tableData={this.props.orderHistory.mvOrderBeanList}

                                pageIndex={this.state.orderHisPageIndex}
                                onPageChange={this.onOrderHisPageChange.bind(this)}
                                totalPage={Math.ceil(this.props.orderHistory.mvTotalOrders / this.defaultPageSize)}
                                onExportExcel={this.onExportExcel.bind(this)}

                                searchParams={["mvStockId", "mvBuysell", "mvStartDate", "mvEndDate"]}
                                searchActions={[]}
                                searchData={{ stockList: this.stockList }}
                                onSearch={this.onOrderHisSearch.bind(this)}

                            />
                        </TabItem>
                        <TabItem eventKey={2} title="Cash Transation History">
                            <Table 
                                theme={this.props.theme}
                                id={"cashtransaction"}
                                language={this.props.language}

                                pageSize={this.defaultPageSize}
                                columns={this.state.cashHisColumns}
                                tableData={this.props.cashTransHistory.list}

                                pageIndex={this.state.cashHisPageIndex}
                                onPageChange={this.onCashHisPageChange.bind(this)}
                                totalPage={Math.ceil(this.props.cashTransHistory.totalCount / this.defaultPageSize)}
                                onExportExcel={this.onExportExcel.bind(this)}

                                searchParams={["mvStockId", "mvBuysell", "mvStartDate", "mvEndDate"]}
                                searchActions={[]}
                                searchData={{ stockList: this.stockList }}
                                onSearch={this.onCashHisSearch.bind(this)}

                            />
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
        this.props.onCashHisSearch(this.cashHisParams)
    }

    onOrderHisPageChange(page) {
        this.state.orderHisPageIndex = page
        this.orderHisParams["page"] = this.state.orderHisPageIndex
        this.orderHisParams["start"] = (this.state.orderHisPageIndex - 1) * this.orderHisParams["limit"]
        this.props.onOrderHisSearch(this.orderHisParams)
    }

    onOrderHisSearch(param) {
        this.state.orderHisPageIndex = 1
        this.orderHisParams["page"] = 1
        this.orderHisParams["start"] = 0

        this.orderHisParams["mvBS"] = param["mvBuysell"]
        this.orderHisParams["mvInstrumentID"] = param["mvStockId"]
        this.orderHisParams["mvStartTime"] = param["mvStartDate"]
        this.orderHisParams["mvEndTime"] = param["mvEndDate"]
        
        this.props.onOrderHisSearch(this.orderHisParams)
    }

    onExportExcel() {}




    onCashHisSearch(param) {
        this.state.orderHisPageIndex = 1
        this.cashHisParams["page"] = 1
        this.cashHisParams["start"] = 0

        this.cashHisParams["mvBS"] = param["mvBuysell"]
        this.cashHisParams["mvInstrumentID"] = param["mvStockId"]
        this.cashHisParams["mvStartTime"] = param["mvStartDate"]
        this.cashHisParams["mvEndTime"] = param["mvEndDate"]
        
        this.props.onCashHisSearch(this.cashHisParams)
    }

    onCashHisPageChange(page) {
        this.state.cashHisPageIndex = page
        this.cashHisParams["page"] = this.state.cashHisPageIndex
        this.cashHisParams["start"] = (this.state.cashHisPageIndex - 1) * this.cashHisParams["limit"]
        this.props.onCashHisSearch(this.cashHisParams)
    }


}
const mapStateToProps = (state) => {
    return {
        orderHistory: state.orderhistory.historyOrder,
        cashTransHistory: state.cashtranshistory.cashTransHistory
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onOrderHisSearch: (param, reload) => {
        dispatch(actions.enquiryOrderHistory(param, reload))
    },
    onCashHisSearch: (param, reload) => {
        dispatch(actions.enquiryCashTransaction(param, reload))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportOrderHistory(param))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)