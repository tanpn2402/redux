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

        this.params = {
            tradeType: 'ALL',
            mvStartDate: '',
            mvEndDate: '',
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
                        return (
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
                    skip: true
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
                    skip: true
                },
                {
                    id: 'mvNotes',
                    Header: nextProps.language.cashtransaction.header.notes,
                    accessor: 'remark',
                    width: 625,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLastUpdate',
                    Header: nextProps.language.cashtransaction.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    width: 200,
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
                    param={['mvTrade', 'mvStartDate', 'mvEndDate', 'dropdown']} />
                <DataTable
                    onRowSelected={this.onRowSelected.bind(this)}
                    columns={this.state.columns}
                    data={data}
                    windowid="cashtransactionhistory" />
                <Footer pageIndex={this.pageIndex} totalRecord={this.props.data.totalCount} onPageChange={this.onPageChange.bind(this)} />
            </div>
        )

    }


    // componentDidMount() {
    //     console.log('did mount', this.params)
    //     var d = new Date()
    //     var today = d.getDate()+ '/' + (d.getMonth()+1) +'/'+ d.getFullYear()
    //     this.params['mvStartDate'] = today
    //     this.params['mvEndDate'] = today
    //     this.props.onSearch(this.params)
    // }

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
        this.setState({ pageIndex: pageIndex });
        this.pageIndex = pageIndex;
        this.params['page'] = this.pageIndex;
        this.params['start'] = (this.pageIndex - 1) * 15;
        console.log(this.params)
        this.props.onSearch(this.params, !this.props.reload)
    }

    onSearch(param) {
        console.log(this.id + ' onSearch', this.params)
        this.params['tradeType'] = param.mvTrade.toUpperCase();
        this.params['mvStartDate'] = param.mvStartDate;
        this.params['mvEndDate'] = param.mvEndDate;
        // this.params['page'] = this.pageIndex;
        // this.params['start'] = (this.pageIndex - 1) * 15;
        console.log(this.params)
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
