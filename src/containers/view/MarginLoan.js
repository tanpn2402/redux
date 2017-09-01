import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'
import moment from 'moment'

class MarginLoan extends Component {
    constructor(props) {
        super(props)
        this.params = {
            mvLastAction: '',
            mvChildLastAction: '',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: 15,
            timePeriod: 'Customize'
        }
        this.exportParams = {
            // mvLastAction: 'ACCOUNT',
            // mvChildLastAction: 'ORDERHISTORYENQUIRY',
            // mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
            // mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
            // mvBS: '',
            // mvInstrumentID: '',
            // mvStatus: 'ALL',
            // mvSorting: 'InputTime desc',
        }
        this.state = {
            columns: [
                {
                    id: 'mvRowNum',
                    Header: this.props.language.marginloan.header.rownum,
                    accessor: 'rowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: this.props.language.marginloan.header.transactiondate,
                    accessor: 'tranDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDescription',
                    Header: this.props.language.marginloan.header.description,
                    accessor: 'desc',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    Header: this.props.language.marginloan.header.marginusage,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvDebt',
                            Header: this.props.language.marginloan.header.debt,
                            accessor: 'out',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPayment',
                            Header: this.props.language.marginloan.header.payment,
                            accessor: 'in',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvFinalDebt',
                            Header: this.props.language.marginloan.header.finaldept,
                            accessor: 'balance',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvMarginCall',
                    Header: this.props.language.marginloan.header.margincall,
                    accessor: 'marginCallF',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvForceSell',
                    Header: this.props.language.marginloan.header.forcesell,
                    accessor: 'sellAmount',
                    width: 250,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
        }

        this.id = 'marginloan'
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            columns: [
                {
                    id: 'mvRowNum',
                    Header: nextProps.language.marginloan.header.rownum,
                    accessor: 'rowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: nextProps.language.marginloan.header.transactiondate,
                    accessor: 'tranDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDescription',
                    Header: nextProps.language.marginloan.header.description,
                    accessor: 'desc',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    Header: nextProps.language.marginloan.header.marginusage,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvDebt',
                            Header: nextProps.language.marginloan.header.debt,
                            accessor: 'out',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPayment',
                            Header: nextProps.language.marginloan.header.payment,
                            accessor: 'in',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvFinalDebt',
                            Header: nextProps.language.marginloan.header.finaldept,
                            accessor: 'balance',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvMarginCall',
                    Header: nextProps.language.marginloan.header.margincall,
                    accessor: 'marginCallF',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvForceSell',
                    Header: nextProps.language.marginloan.header.forcesell,
                    accessor: 'sellAmount',
                    width: 250,
                    skip: false,
                    show: true,
                },
            ]
        }
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
                onExportExcel={this.onExportExcel.bind(this)}
            />,
        ]
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
                <div className="component-main">
                    <DataUpperTable
                        id="marginloan-table"

                        columns={this.state.columns}
                        data={data}
                        defaultPageSize={15} />
                </div>
                <div className="component-body">
                    <SearchBar
                        id={this.id}
                        onSearch={this.onSearch.bind(this)}
                        buttonAction={this.buttonAction}
                        stockList={[]}
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
    onExportExcel() {
        
        //this.props.onExportExcel(this.exportParams)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.marginloan.data,
        reload: state.marginloan.reload,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryMarginLoan(param, reload))
    },
    // onExportExcel: (param) => {
    //     dispatch(actions.exportOrderHistory(param))
    // },
})

export default connect(mapStateToProps, mapDispatchToProps)(MarginLoan)