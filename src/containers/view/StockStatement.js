import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'

class StockStatement extends Component {
    constructor(props) {
        super(props)
        this.params = {
            mvLastAction: '',
            mvChildLastAction: '',
            mvStartDate: '01/01/2001',
            mvEndDate: '01/01/2017',
            start: 0,
            limit: 15,
            timePeriod: 'Customize'
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
        this.buttonAction = [
            <Pagination
                pageIndex={this.state.pageIndex}
                totalRecord={this.props.data.mvTotalOrders}
                onPageChange={this.onPageChange.bind(this)}
                onNextPage={this.onNextPage.bind(this)}
                onPrevPage={this.onPrevPage.bind(this)}
                onReloadPage={this.onReloadPage.bind(this)}
            />,
        ]
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        var page = 1

        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            for (let j in data[i]) {
                if (data[i][j] === null || data[i][j] === "") {
                    data[i][j] = 0
                }
            }
        }

        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
                <div className="component-main">
                    <DataUpperTable
                        id="stockstatement-table"

                        columns={this.state.columns}
                        data={data}
                        defaultPageSize={15} />
                </div>
                <div className="component-body">
                    <SearchBar
                        id={this.id}
                        onSearch={this.onSearch.bind(this)}
                        buttonAction={this.buttonAction}
                        stockList={this.props.stockList}
                        language={this.props.language.searchbar}
                        theme={this.props.theme}
                        columns={this.state.columns}
                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                        param={['mvStartDate', 'mvEndDate', 'dropdown']}
                    />
                </div>
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
        this.params['mvStartDate'] = param['mvStartDate']
        this.params['mvEndDate'] = param['mvEndDate']
        this.props.onSearch(this.params, !this.props.reload)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.stockstatement.data,
        reload: state.stockstatement.reload,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryStockStatement(param, reload))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(StockStatement)
