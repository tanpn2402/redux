import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import { Button } from 'react-bootstrap'
import config from '../../core/config'
import moment from 'moment'

class StockStatement extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList

        this.params = {
            mvLastAction: 'ACCOUNT',
            mvChildLastAction: 'TRANSACTIONHISTORY',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: 15,
            timePeriod: 'Customize',
            key: (new Date()).getTime()
        }

        this.exportParams = {
            mvLastAction: 'ACCOUNT',
            mvLastChildAction: 'CASHTRANSACTIONHISTORYREPORT',
            timePeriod: 'Customize',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            tradeType: 'ALL',
        }

        this.state = {
            columns: [
                {
                    id: 'mvOrder',
                    Header: this.props.language.stockstatement.header.order,
                    accessor: 'refId',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: this.props.language.stockstatement.header.transactiondate,
                    accessor: 'tradeDate',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockCode',
                    Header: this.props.language.stockstatement.header.stockcode,
                    accessor: 'stockCode',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAction',
                    Header: this.props.language.stockstatement.header.action,
                    accessor: 'action',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    Header: this.props.language.stockstatement.header.credit,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvCreditQty',
                            Header: this.props.language.stockstatement.header.quantity,
                            accessor: 'buyQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAvgPrice',
                            Header: this.props.language.stockstatement.header.avgprice,
                            accessor: 'buyPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAmt',
                            Header: this.props.language.stockstatement.header.amt,
                            accessor: 'buyAmount',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    Header: this.props.language.stockstatement.header.debit,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvDebitQty',
                            Header: this.props.language.stockstatement.header.quantity,
                            accessor: 'sellQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAvgPrice',
                            Header: this.props.language.stockstatement.header.avgprice,
                            accessor: 'sellPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAmt',
                            Header: this.props.language.stockstatement.header.amt,
                            accessor: 'sellAmount',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    Header: this.props.language.stockstatement.header.feetax,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvValue',
                            Header: this.props.language.stockstatement.header.value,
                            accessor: 'fee',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPercentage',
                            Header: this.props.language.stockstatement.header.percentage,
                            accessor: 'feePercent',
                            width: 60,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvDescription',
                    Header: this.props.language.stockstatement.header.description,
                    accessor: 'desc',
                    width: 200,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
        }

        this.id = 'stockstatement'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    id: 'mvOrder',
                    Header: nextProps.language.stockstatement.header.order,
                    accessor: 'refId',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: nextProps.language.stockstatement.header.transactiondate,
                    accessor: 'tradeDate',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockCode',
                    Header: nextProps.language.stockstatement.header.stockcode,
                    accessor: 'stockCode',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAction',
                    Header: nextProps.language.stockstatement.header.action,
                    accessor: 'action',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    Header: nextProps.language.stockstatement.header.credit,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvCreditQty',
                            Header: nextProps.language.stockstatement.header.quantity,
                            accessor: 'buyQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAvgPrice',
                            Header: nextProps.language.stockstatement.header.avgprice,
                            accessor: 'buyPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAmt',
                            Header: nextProps.language.stockstatement.header.amt,
                            accessor: 'buyAmount',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    Header: nextProps.language.stockstatement.header.debit,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvDebitQty',
                            Header: nextProps.language.stockstatement.header.quantity,
                            accessor: 'sellQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAvgPrice',
                            Header: nextProps.language.stockstatement.header.avgprice,
                            accessor: 'sellPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAmt',
                            Header: nextProps.language.stockstatement.header.amt,
                            accessor: 'sellAmount',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    Header: nextProps.language.stockstatement.header.feetax,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvValue',
                            Header: nextProps.language.stockstatement.header.value,
                            accessor: 'fee',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPercentage',
                            Header: nextProps.language.stockstatement.header.percentage,
                            accessor: 'feePercent',
                            width: 60,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvDescription',
                    Header: nextProps.language.stockstatement.header.description,
                    accessor: 'desc',
                    width: 200,
                    skip: false,
                    show: true,
                },
            ]
        })
    }

    render() {
        let data = this.props.data
        let tableheader = this.props.theme.table == undefined? undefined:this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined? undefined:this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main">
                        <Table 
                            theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data.list}
                        />
                    </div>

                    <div className="table-header" style={tableheader}>
                        <SearchBar
                            id={this.id}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: this.stockList }}
                            param={['mvStartDate', 'mvEndDate']} />
                    </div>

                    <div className="table-footer" style={tablefooter} style={tablefooter}>
                        <Pagination
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(data.totalCount / this.defaultPageSize)}
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
        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = pageIndex
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onNextPage() {
        this.state.pageIndex = this.state.pageIndex + 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onPrevPage() {
        this.state.pageIndex = this.state.pageIndex - 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onReloadPage() {
        this.param['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']

        this.params['mvStartDate'] = param['mvStartDate']
        this.params['mvEndDate'] = param['mvEndDate']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onExportExcel() {
        this.exportParams['mvStartDate'] = this.params['mvStartDate']
        this.exportParams['mvEndDate'] = this.params['mvEndDate']

        this.props.onExportExcel(this.exportParams)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.stockstatement.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryStockStatement(param, reload))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportTransactionHistory(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(StockStatement)
