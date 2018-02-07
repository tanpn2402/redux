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
                    background: props.theme.table.colText
                },
                {
                    id: "marketid",
                    accessor: "mvMarketID",
                    width: 50,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "price",
                    accessor: "mvPrice",
                    Cell: props =>  Utils.formatCurrency(props.value),
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.number.col2
                },
                {
                    id: "buysell",
                    accessor: "mvBS",
                    width: 50,
                    Cell: props => {
                        
                        if (props.aggregated) {
                            
                        } else {
                            var value=props.original.mvBS.trim()
                            if (value == this.props.language.ordershistory.buysell.S) {
                                return (
                                 <div style={{ backgroundColor: '#b5383e', color: '#fff', width: '100%' }}>
                                        {this.props.language.searchbar.sell}
                                    </div>
                                )
                            } else {
                                return (
                                    
                                       <div style={{ backgroundColor: '#39b567', color: '#fff', width: '100%' }}>
                                        {this.props.language.searchbar.buy}
                                    </div>
                                )
                            }
                        }
                    },
                    skip: false,
                    show: true,
                },
                {
                    id: "quantity",
                    accessor: "mvQty",
                    Cell: props =>  Utils.formatQty(props.value),
                    width: 80,
                    skip: false,
                    show: true,
                    background: props.theme.number.col2
                },
                {
                    id: "filledprice",
                    accessor: "mvFilledPrice",
                    Cell: props =>  Utils.formatCurrency(props.value),
                    width: 80,
                    skip: false,
                    show: true,
                    background: props.theme.number.col2
                },
                {
                    id: "filledquantity",
                    accessor: "mvFilledQty",
                    Cell: props =>  Utils.formatQty(props.value),
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.number.col2
                },
                {
                    id: "matchedvalue",
                    accessor: "mvAvgPriceValue",
                    Cell: props =>  Utils.formatCurrency(props.value),
                    width: 80,
                    skip: false,
                    show: true,
                    background: props.theme.number.col2
                },
                {
                    id: "tradingtype",
                    accessor: "mvOrderTypeValue",
                    width: 100,
                    Cell: props => {
                        if (props.aggregated) {
            
                        } else {
                            var value=props.original.mvOrderTypeValue.trim()
                            let text = this.props.language.ordershistory.trandtype[value]
                            return (
                                Utils.statusRenderer(text,value)
                            )
                        }
                    },
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "matchedorderstatus",
                    accessor: "mvStatus",
                    width: 100,
                    Cell: props => {
                        if (props.aggregated) {
            
                        } else {
                            var value=props.original.mvStatus.trim()
                            let text = this.props.language.ordershistory.status[value]
                            return (
                                Utils.statusRenderer(text,value)
                            )
                        }
                    },
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
                    width: 200,
                    skip: false,
                    show: true,
                },


            ],
            pageIndex: 1,
            filterable: false
        }

        this.id = "ordershistory"
        this.pageIndex = 1
        this.defaultPageSize = props.defaultPageSize

        this.params = {
            start: 0,
            limit: this.defaultPageSize,
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
        console.log('adsdsd')
        var data = this.props.historyOrder.mvOrderBeanList
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    widgetID= 'orderHistory'
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
                        searchMobileParams={[]}
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
OrderHistory.defaultProps = {
    defaultPageSize: 15
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