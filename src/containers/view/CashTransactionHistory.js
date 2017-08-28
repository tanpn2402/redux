import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'
import DataTable from '../DataTable'
import Footer from '../DataTableFooter'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'

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
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        console.log('data' + this.id, this.props.data)
        var page = this.props.data.mvCurrentPage === undefined ? 1 : this.props.data.mvCurrentPage

        let buttonAction = [
            <Pagination
                    pageIndex={this.pageIndex} 
                    totalRecord={this.props.data.totalCount} 
                    onPageChange={this.onPageChange.bind(this)}
                    onNextPage={this.onNextPage.bind(this)}
                    onPrevPage={this.onPrevPage.bind(this)}
                    onReloadPage={this.onReloadPage.bind(this)}
                />,
        ]

        return (

            <div id={'cashtransactionhistory-body'} className="layout-body">
                <SearchBar
                    id={this.id}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={buttonAction}
                    stockList={[]}
                    language={this.props.language.searchbar}
                    columns={this.state.columns}
                    theme={this.props.theme}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={['mvTrade', 'mvStartDate', 'mvEndDate', 'dropdown']} />
                <DataUpperTable
                    onRowSelected={this.onRowSelected.bind(this)}
                    columns={this.state.columns}
                    data={data}
                    maxRows={19}
                    defaultPageSize={19}/>
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
        //this.setState({ pageIndex: pageIndex })
        if(pageIndex > 0){
            this.pageIndex = pageIndex
            this.params['page'] = this.pageIndex
            this.params['start'] = (this.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onNextPage(){
        if(this.pageIndex > 0){
            this.pageIndex = parseInt(this.pageIndex) + 1
            this.params['page'] = this.pageIndex
            this.params['start'] = (this.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onPrevPage(){
        if(this.pageIndex > 1){
            this.pageIndex = parseInt(this.pageIndex) - 1
            this.params['page'] = this.pageIndex
            this.params['start'] = (this.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onReloadPage(){
        this.props.onSearch(this.params, !this.props.reload)
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
