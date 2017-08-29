import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import Footer from '../DataTableFooter'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'

class CashTransactionHistory extends Component {
    constructor(props) {
        super(props)

        this.params = {
            tradeType: 'ALL',
            mvStartDate: moment(),
            mvEndDate: moment(),
            start: 0,
            limit: 15,
            page: 1
        }

        this.state = {
            columns: [
                {
                    id: 'mvTransId',
                    Header: this.props.language.cashtransaction.header.transid,
                    accessor: 'tranID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDateTrans',
                    Header: this.props.language.cashtransaction.header.datetrans,
                    accessor: 'trandate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransType',
                    Header: this.props.language.cashtransaction.header.transtype,


                    width: 150,
                    Cell: props => {
                        return (
                            <span>{this.props.language.searchbar[props.original.transType]}</span>
                        )
                    },
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAmount',
                    Header: this.props.language.cashtransaction.header.amount,
                    accessor: 'totalLendingAmt',
                    width: 150,
                    skip: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.cashtransaction.header.status,
                    width: 70,
                    maxWidth: 80,
                    Cell: props => {
                        return (
                            <span>{this.props.language.cashtransaction.status[props.original.status]}</span>
                        )
                    },
                    sortable: true,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvNotes',
                    Header: this.props.language.cashtransaction.header.notes,
                    accessor: 'remark',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLastUpdate',
                    Header: this.props.language.cashtransaction.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    width: 150,
                    skip: false,
                    show: true,
                }
            ],
            pageIndex: 1,
        }
        this.pageIndex = 1
        this.rowSelected = []
        this.id = 'cashtransactionhistory'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    id: 'mvTransId',
                    Header: nextProps.language.cashtransaction.header.transid,
                    accessor: 'tranID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDateTrans',
                    Header: nextProps.language.cashtransaction.header.datetrans,
                    accessor: 'trandate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransType',
                    Header: nextProps.language.cashtransaction.header.transtype,


                    width: 150,
                    Cell: props => {
                        return (
                            <span>{nextProps.language.searchbar[props.original.transType]}</span>
                        )
                    },
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAmount',
                    Header: nextProps.language.cashtransaction.header.amount,
                    accessor: 'totalLendingAmt',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: nextProps.language.cashtransaction.header.status,
                    width: 70,
                    maxWidth: 80,
                    Cell: props => {
                        return (
                            <span>{nextProps.language.cashtransaction.status[props.original.status]}</span>
                        )
                    },
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvNotes',
                    Header: nextProps.language.cashtransaction.header.notes,
                    accessor: 'remark',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLastUpdate',
                    Header: nextProps.language.cashtransaction.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    width: 150,
                    skip: false,
                    show: true,
                }
            ]
        });

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

            <Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button"
                onClick={() => this.showPopup()}>Hủy GD</Button>,
        ]
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        console.log('data' + this.id, this.props.data)
        var page = this.props.data.mvCurrentPage === undefined ? 1 : this.props.data.mvCurrentPage

        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
                <div className="component-main">
                    <DataUpperTable
                        id="cashtransactionhistory-table"

                        columns={this.state.columns}
                        data={data}
                        defaultPageSize={15} />
                </div>
                <div className="component-body">

                    <SearchBar
                        id={this.id}
                        onSearch={this.onSearch.bind(this)}
                        stockList={[]}
                        buttonAction={[]}
                        language={this.props.language.searchbar}
                        columns={this.state.columns}
                        theme={this.props.theme}
                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                        param={['mvTrade', 'mvStartDate', 'mvEndDate', 'dropdown']} />
                </div>
            </div>
        )

    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById('orderjournal-cb-all').checked

            if (current)
                this.rowSelected = this.props.data.List !== undefined ?
                    this.props.data.List.filter(el => el.mvShowCancelIcon !== null && el.mvShowCancelIcon === 'Y') : []
            else
                this.rowSelected = []
        }
        else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            }
            else {
                this.rowSelected.splice(index, 1)
            }
        }
        console.log('onRowSelected', this.rowSelected)
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
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onNextPage() {
        if (this.state.pageIndex > 0) {
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onPrevPage() {
        if (this.state.pageIndex > 1) {
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onReloadPage() {
        this.props.onSearch(this.param, !this.props.reload)
    }

    onSearch(param) {
        this.params['tradeType'] = param.mvTrade.toUpperCase()
        this.params['mvStartDate'] = param.mvStartDate
        this.params['mvEndDate'] = param.mvEndDate
        this.props.onSearch(this.params, !this.props.reload)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.cashtranshistory.data,
        reload: state.cashtranshistory.reload,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryCashTransaction(param, reload))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(CashTransactionHistory);
