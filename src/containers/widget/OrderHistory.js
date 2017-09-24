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

class OrderHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns: [
                {
                    id: 'mvOrderGroupID',
                    Header: this.props.language.ordershistory.header.ordergroupid,
                    accessor: 'mvOrderGroupID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvmatchedDate',
                    Header: this.props.language.ordershistory.header.matcheddate,
                    accessor: 'matchedDate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockID',
                    Header: this.props.language.ordershistory.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: this.props.language.ordershistory.header.marketid,
                    accessor: 'mvMarketID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.ordershistory.header.buysell,
                    accessor: 'mvBS',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.ordershistory.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvdQty',
                    Header: this.props.language.ordershistory.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledPrice',
                    Header: this.props.language.ordershistory.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledQty',
                    Header: this.props.language.ordershistory.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAvgPriceValue',
                    Header: this.props.language.ordershistory.header.matchedvalue,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderTypeValue',
                    Header: this.props.language.ordershistory.header.tradingtype,
                    accessor: 'mvOrderTypeValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.ordershistory.header.matchedorderstatus,
                    accessor: 'mvStatus',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvInputTime',
                    Header: this.props.language.ordershistory.header.matcheddate,
                    accessor: 'mvInputTime',
                    width: 80,
                    skip: false,
                    show: true,
                },


            ],
            pageIndex: 1,
        }

        this.id = 'ordershistory'
        this.pageIndex = 1

        this.params = {
            start: 0,
            limit: 15,
            mvBS: 'A',
            mvInstrumentID: 'ALL',
            mvStatus: 'ALL',
            mvSorting: 'InputTime desc',
            mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        }
        this.exportParams = {
            mvLastAction: 'ACCOUNT',
            mvChildLastAction: 'ORDERHISTORYENQUIRY',
            mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
            mvBS: '',
            mvInstrumentID: '',
            mvStatus: 'ALL',
            mvSorting: 'InputTime desc',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns:
            [
                {
                    id: 'mvOrderGroupID',
                    Header: nextProps.language.ordershistory.header.ordergroupid,
                    accessor: 'mvOrderGroupID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvmatchedDate',
                    Header: nextProps.language.ordershistory.header.matcheddate,
                    accessor: 'matchedDate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockID',
                    Header: nextProps.language.ordershistory.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: nextProps.language.ordershistory.header.marketid,
                    accessor: 'mvMarketID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: nextProps.language.ordershistory.header.buysell,
                    accessor: 'mvBS',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: nextProps.language.ordershistory.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvdQty',
                    Header: nextProps.language.ordershistory.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledPrice',
                    Header: nextProps.language.ordershistory.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledQty',
                    Header: nextProps.language.ordershistory.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAvgPriceValue',
                    Header: nextProps.language.ordershistory.header.matchedvalue,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderTypeValue',
                    Header: nextProps.language.ordershistory.header.tradingtype,
                    accessor: 'mvOrderTypeValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: nextProps.language.ordershistory.header.matchedorderstatus,
                    accessor: 'mvStatus',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvInputTime',
                    Header: nextProps.language.ordershistory.header.matcheddate,
                    accessor: 'mvInputTime',
                    width: 80,
                    skip: false,
                    show: true,
                },


            ]
        });
    }


    render() {
        var data = this.props.data.mvOrderBeanList === undefined ? [] : this.props.data.mvOrderBeanList
        var pageIndex = this.props.data.mvPage === undefined ? 1 : this.props.data.mvPage.pageIndex
        var totalRecord = this.props.data.mvTotalOrders === undefined ? 1 : this.props.data.mvTotalOrders
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main">
                        <Table
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data}
                        />
                    </div>

                    <div className="table-header">
                        <SearchBar
                            id={this.id}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{stockList: this.props.stockList}}
                        param={['mvStockId', 'mvBuysell', 'mvStartDate', 'mvEndDate']} />
                    </div>

                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.pageIndex}
                            totalRecord={this.props.data.mvTotalOrders}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                            onReloadPage={this.onReloadPage.bind(this)}
                            onExportExcel={this.onExportExcel.bind(this)}
                        />
                    </div>

                </Body>
            </div>
        )

    }
componentDidMount() {
        // var d = new Date()
        // var today = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
        // this.params['mvStartTime'] = today
        // this.params['mvEndTime'] = today
        this.props.onSearch(this.params)
    }

    onPageChange(pageIndex) {
        if (pageIndex > 0) {
            this.state.pageIndex = pageIndex
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onNextPage() {
        if (this.state.pageIndex > 0) {
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onPrevPage() {
        if (this.state.pageIndex > 1) {
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onReloadPage() {
        this.props.onSearch(this.params, !this.props.reload)
    }

    onSearch(param) {
        console.log(param, 'la gi')
        this.params['mvBS'] = param['mvBuysell']
        this.params['mvInstrumentID'] = param['mvStockId']
        this.params['mvStartTime'] = param['mvStartDate']
        this.params['mvEndTime'] = param['mvEndDate']
        console.log(this.params)
        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }
    onExportExcel() {
        console.log(this.params['mvStartTime'])

        this.exportParams['mvStartTime'] = this.params['mvStartTime']
        this.exportParams['mvEndTime'] = this.params['mvEndTime']
        this.exportParams['mvBS'] = this.params['mvBS']
        this.exportParams['mvInstrumentID'] = this.params['mvInstrumentID'] != '' ? this.params['mvInstrumentID'] : 'ALL'
        
        this.props.onExportExcel(this.exportParams)
    }


}
const mapStateToProps = (state) => {
    return {
        data: state.orderhistory.data,
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
