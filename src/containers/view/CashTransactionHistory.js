import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar';
import DataTable from '../DataTable';
import Footer from '../DataTableFooter';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CashTransactionHistory extends Component {
    constructor(props) {
        super(props)

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
                    skip: true
                },
                {
                    id: 'mvAmount',
                    Header: this.props.language.cashtransaction.header.amount,
                    accessor: 'totalLendingAmt',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.cashtransaction.header.status,
                    width: 70,
                    maxWidth: 80,
                    Cell: props => {
                        return(
                            <span>{this.props.language.cashtransaction.status[props.original.status]}</span>
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'mvNotes',
                    Header: this.props.language.cashtransaction.header.notes,
                    accessor: 'remark',
                    width: 625,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLastUpdate',
                    Header: this.props.language.cashtransaction.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    width: 200,
                    skip: false,
                    show: true,
                }
            ]
        }

        this.rowSelected = []
        this.id = 'cashtransactionhistory'
    }

  
    render() {
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        console.log('data' + this.id, this.props.data)
        var page = this.props.data.mvCurrentPage === undefined ? 1 : this.props.data.mvCurrentPage
        return (

            <div id={'cashtransactionhistory-body'} className="layout-body">
                <SearchBar
                    id={this.id}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={[]}
                    stockList={[]}
                    language={this.props.language.searchbar}
                    columns={this.state.columns}
                    theme={this.props.theme}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={['mvTrade', 'mvStartDate', 'mvEndDate',]} />
                <DataTable
                    onRowSelected={this.onRowSelected.bind(this)}
                    columns={this.state.columns}
                    data={data}
                    page={page}
                    windowid="cashtransactionhistory" />
                <Footer pageIndex={page} totalRecord={this.props.data.totalCount} onPageChange={this.onPageChange.bind(this)} />
            </div>
        )
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('should update cash trans', nextProps, nextState)
        return nextProps.menuid === this.id
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
        console.log('orderjournal onPageChange', pageIndex)
    }

    onSearch(param) {
        console.log(this.id + ' onSearch', param)
        this.props.onSearch(this.id, param, !this.props.reload)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.orderjournal.data,
        menuid: state.orderjournal.menuid,
        reload: state.orderjournal.reload,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (menuid, param, reload) => {
        dispatch(actions.enquiryOrder(menuid, param, reload))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(CashTransactionHistory);
