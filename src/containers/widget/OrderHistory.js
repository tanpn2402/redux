import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Title from "../commons/WidgetTitle"
import Body from "../commons/WidgetBody"
import Table from "../commons/DataTable"
import * as Utils from "../../utils"
import moment from "moment"
import config from "../../core/config"

class OrderHistory extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.state = {
            columns: [
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
                    width: 50,
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
            pageIndex: 1,
            filterable: true
        }

        this.id = "ordershistory"
        this.pageIndex = 1
        this.defaultPageSize = 15

        this.params = {
            start: 0,
            limit: 15,
            mvBS: "A",
            mvInstrumentID: "ALL",
            mvStatus: "ALL",
            mvSorting: "InputTime desc",
            mvStartTime: "01/01/2001",
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        }
        this.exportParams = {
            mvLastAction: "ACCOUNT",
            mvChildLastAction: "ORDERHISTORYENQUIRY",
            mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
            mvBS: "",
            mvInstrumentID: "",
            mvStatus: "ALL",
            mvSorting: "InputTime desc",
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            
        });
    }


    render() {
        var data = this.props.historyOrder.mvOrderBeanList
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table 
                        theme={this.props.theme}
                        id={this.id}
                        language={this.props.language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={data}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(this.props.historyOrder.mvTotalOrders / this.defaultPageSize)}
                        onExportExcel={this.onExportExcel.bind(this)}

                        searchParams={["mvStockId", "mvBuysell", "mvStartDate", "mvEndDate"]}
                        searchActions={[]}
                        searchData={{ stockList: this.stockList }}
                        onSearch={this.onSearch.bind(this)}

                    />

                </Body>
            </div>
        )

    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.onSearch(this.params)
    }

    onPageChange(page) {
        this.state.pageIndex = page
        this.params["page"] = this.state.pageIndex
        this.params["start"] = (this.state.pageIndex - 1) * this.params["limit"]
        this.props.onSearch(this.params)
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params["page"] = 1
        this.params["start"] = 0

        this.params["mvBS"] = param["mvBuysell"]
        this.params["mvInstrumentID"] = param["mvStockId"]
        this.params["mvStartTime"] = param["mvStartDate"]
        this.params["mvEndTime"] = param["mvEndDate"]
        
        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onExportExcel() {

        this.exportParams["mvStartTime"] = this.params["mvStartTime"]
        this.exportParams["mvEndTime"] = this.params["mvEndTime"]
        this.exportParams["mvBS"] = this.params["mvBS"]
        this.exportParams["mvInstrumentID"] = this.params["mvInstrumentID"] != "" ? this.params["mvInstrumentID"] : "ALL"

        this.props.onExportExcel(this.exportParams)
    }


}
const mapStateToProps = (state) => {
    return {
        historyOrder: state.orderhistory.historyOrder,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryOrderHistory(param, reload))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportOrderHistory(param))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)