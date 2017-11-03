import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import moment from 'moment'
import config from '../../core/config'
import ListView from '../commons/ListView'

import {TabControl, TabItem} from "../commons/TabControl"
class OrderHistory extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.state = {
            activeKey: 1,
            columns: [
                {
                    id: 'ordergroupid',
                    Header: this.props.language.ordershistory.header.ordergroupid,
                    accessor: 'mvOrderGroupID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'stockid',
                    Header: this.props.language.ordershistory.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'buysell',
                    Header: this.props.language.ordershistory.header.buysell,
                    accessor: 'mvBS',
                    width: 40,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.ordershistory.header.price,
                    accessor: 'mvPrice',
                    style: {textAlign: 'right'},
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'marketid',
                    Header: this.props.language.ordershistory.header.marketid,
                    accessor: 'mvMarketID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'quantity',
                    Header: this.props.language.ordershistory.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'filledprice',
                    Header: this.props.language.ordershistory.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'filledquantity',
                    Header: this.props.language.ordershistory.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 80,
                    skip: false,
                    show: true,
                }
            ],
            pageIndex: 1,
            filterable: true
        }

        this.id = 'ordershistory'
        this.pageIndex = 1
        this.defaultPageSize = 5

        this.paramsOrderHistory = {
            start: 0,
            limit: 5,
            mvBS: 'ALL',
            mvInstrumentID: 'ALL',
            mvStatus: 'ALL',
            mvSorting: 'InputTime desc',
            mvStartTime: '01/01/2010',
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        }
        this.paramsCashTransaction = {
            tradeType: 'ALL',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: this.defaultPageSize,
            page: 1
        }
        // this.exportParams = {
        //     mvLastAction: 'ACCOUNT',
        //     mvChildLastAction: 'ORDERHISTORYENQUIRY',
        //     mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
        //     mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        //     mvBS: '',
        //     mvInstrumentID: '',
        //     mvStatus: 'ALL',
        //     mvSorting: 'InputTime desc',
        // }
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         columns:
    //         [
    //             {
    //                 id: 'mvOrderGroupID',
    //                 Header: nextProps.language.ordershistory.header.ordergroupid,
    //                 accessor: 'mvOrderGroupID',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvmatchedDate',
    //                 Header: nextProps.language.ordershistory.header.matcheddate,
    //                 accessor: 'matchedDate',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvStockID',
    //                 Header: nextProps.language.ordershistory.header.stockid,
    //                 accessor: 'mvStockID',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvMarketID',
    //                 Header: nextProps.language.ordershistory.header.marketid,
    //                 accessor: 'mvMarketID',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvBS',
    //                 Header: nextProps.language.ordershistory.header.buysell,
    //                 accessor: 'mvBS',
    //                 width: 50,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvPrice',
    //                 Header: nextProps.language.ordershistory.header.price,
    //                 accessor: 'mvPrice',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvdQty',
    //                 Header: nextProps.language.ordershistory.header.quantity,
    //                 accessor: 'mvQty',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvFilledPrice',
    //                 Header: nextProps.language.ordershistory.header.filledprice,
    //                 accessor: 'mvFilledPrice',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvFilledQty',
    //                 Header: nextProps.language.ordershistory.header.filledquantity,
    //                 accessor: 'mvFilledQty',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvAvgPriceValue',
    //                 Header: nextProps.language.ordershistory.header.matchedvalue,
    //                 accessor: 'mvAvgPriceValue',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvOrderTypeValue',
    //                 Header: nextProps.language.ordershistory.header.tradingtype,
    //                 accessor: 'mvOrderTypeValue',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvStatus',
    //                 Header: nextProps.language.ordershistory.header.matchedorderstatus,
    //                 accessor: 'mvStatus',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },
    //             {
    //                 id: 'mvInputTime',
    //                 Header: nextProps.language.ordershistory.header.matcheddate,
    //                 accessor: 'mvInputTime',
    //                 width: 80,
    //                 skip: false,
    //                 show: true,
    //             },


    //         ]
    //     });
    // }

    onTabChange(key) {
        this.setState({activeKey: key})
    }

    render() {
        // var data = this.props.historyOrder.mvOrderBeanList
        // let tableheader = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader
        // let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        // return (
        //     <div style={{ height: '100%', position: 'relative' }}>
        //         <Title language={this.props.language} theme={this.props.theme}
        //             columns={this.state.columns}
        //             onChangeStateColumn={this.onChangeStateColumn.bind(this)}
        //             onToggleFilter={e => this.onToggleFilter(e)} >
        //             {this.props.language.menu[this.id]}
        //         </Title>
        //         <Body theme={this.props.theme}>
        //             <div className="table-main">
        //                 <Table theme={this.props.theme}
        //                     key={this.id}
        //                     id={this.id}
        //                     defaultPageSize={this.defaultPageSize}
        //                     columns={this.state.columns}
        //                     filterable={this.state.filterable}
        //                     data={data}
        //                 />
        //             </div>

        //             <div className="table-header" style={tableheader}>
        //                 <SearchBar
        //                     id={this.id}
        //                     onSearch={this.onSearch.bind(this)}
        //                     buttonAction={[]}
        //                     language={this.props.language.searchbar}
        //                     theme={this.props.theme}
        //                     data={{ stockList: this.stockList }}
        //                     param={['mvStockId', 'mvBuysell', 'mvStartDate', 'mvEndDate']} />
        //             </div>

        //             <div className="table-footer" style={tablefooter}>
        //                 <Pagination theme={this.props.theme}
        //                     pageIndex={this.state.pageIndex}
        //                     totalRecord={Math.ceil(this.props.historyOrder.mvTotalOrders / this.defaultPageSize)}
        //                     onPageChange={this.onPageChange.bind(this)}
        //                     onNextPage={this.onNextPage.bind(this)}
        //                     onPrevPage={this.onPrevPage.bind(this)}
        //                     onReloadPage={this.onReloadPage.bind(this)}
        //                     onExportExcel={this.onExportExcel.bind(this)}
        //                 />
        //             </div>

        //         </Body>
        //     </div>
        // )
        
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} theme={this.props.theme}
                   
                    onToggleFilter={e => {}} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)}>
                        <TabItem eventKey={1} title="Order History" >
                            <div style={{ padding: "0px", height: "100%" }}>
                                <ListView 
                                    language={this.props.language.ordershistory} 
                                    columns={this.state.columns} 
                                    pageIndex={this.state.pageIndex}
                                    totalPage={Math.ceil(this.props.historyOrder.mvTotalOrders / 5)}
                                    handlePageChange={this.handlePageChange.bind(this)}
                                    data={this.props.historyOrder.mvOrderBeanList}/>
                            </div>
                            
                        </TabItem>
                        <TabItem eventKey={2} title="Cash Trans History">
                            <div style={{ padding: "0px", height: "100%" }}>
                                Maintainning
                            </div>
                            
                            
                        </TabItem>
                    </TabControl>
                </Body>
            </div>
        )

    }

    handlePageChange(page) {
        this.paramsOrderHistory['page'] = page
        this.state.pageIndex = page
        this.paramsOrderHistory['start'] = (page - 1) * 5
        this.props.onSearchOrderHistory(this.paramsOrderHistory)
    }

    // onToggleFilter(value) {
    //     this.setState((prevState) => {
    //         return { filterable: !prevState.filterable }
    //     })
    // }

    componentDidMount() {
        this.props.onSearchOrderHistory(this.paramsOrderHistory)
        //this.props.onSearchCashTransaction(this.paramsCashTransaction)
    }

    // onPageChange(pageIndex) {
    //     this.state.pageIndex = pageIndex
    //     this.params['page'] = this.state.pageIndex
    //     this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
    //     this.props.onSearch(this.params)
    // }

    // onNextPage() {
    //     this.state.pageIndex = parseInt(this.state.pageIndex) + 1
    //     this.params['page'] = this.state.pageIndex
    //     this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
    //     this.props.onSearch(this.params)
    // }

    // onPrevPage() {
    //     this.state.pageIndex = parseInt(this.state.pageIndex) - 1
    //     this.params['page'] = this.state.pageIndex
    //     this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
    //     this.props.onSearch(this.params)
    // }

    // onReloadPage() {
    //     this.props.onSearch(this.params)
    // }

    // onSearch(param) {
    //     this.state.pageIndex = 1
    //     this.params['page'] = 1
    //     this.params['start'] = 0

    //     this.params['mvBS'] = param['mvBuysell']
    //     this.params['mvInstrumentID'] = param['mvStockId']
    //     this.params['mvStartTime'] = param['mvStartDate']
    //     this.params['mvEndTime'] = param['mvEndDate']
        
    //     this.props.onSearch(this.params)
    // }

    // onChangeStateColumn(e) {
    //     const id = e.target.id
    //     this.setState({
    //         columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
    //     });
    // }
    // onExportExcel() {

    //     this.exportParams['mvStartTime'] = this.params['mvStartTime']
    //     this.exportParams['mvEndTime'] = this.params['mvEndTime']
    //     this.exportParams['mvBS'] = this.params['mvBS']
    //     this.exportParams['mvInstrumentID'] = this.params['mvInstrumentID'] != '' ? this.params['mvInstrumentID'] : 'ALL'

    //     this.props.onExportExcel(this.exportParams)
    // }


}
const mapStateToProps = (state) => {
    return {
        historyOrder: state.orderhistory.historyOrder,
        cashTransHistory: state.cashtranshistory.cashTransHistory
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearchOrderHistory: (param, reload) => {
        dispatch(actions.enquiryOrderHistory(param, reload))
    },
    onSearchCashTransaction: (param, reload) => {
        dispatch(actions.enquiryCashTransaction(param, reload))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportOrderHistory(param))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
