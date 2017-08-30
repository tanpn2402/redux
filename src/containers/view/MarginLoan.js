import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'

class MarginLoan extends Component {
    constructor(props) {
        super(props)
        this.params = {
            mvLastAction:'',
            mvChildLastAction:'',
            mvStartDate :'01/01/2001',
            mvEndDate :'01/01/2017',
            start:'0',
            limit:'15',
            timePeriod:'Customize'
        }
        this.state = {
            columns : [
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
            ]
        }

        this.id='marginloan'
    }

    componentWillReceiveProps(nextProps){
        this.state = {
            columns : [
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
            />,

            <Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button"
                onClick={() => this.showPopup()}>Hủy GD</Button>,
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
                    buttonAction={[]} 
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
        var d = new Date()
        var today = d.getDate()+ '/' + (d.getMonth()+1) +'/'+ d.getFullYear()
        this.params['mvStartDate'] = today
        this.params['mvEndDate'] = today
        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
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

    onSearch(param){
        this.params['mvStartDate'] = param['mvStartDate']
        this.params['mvEndDate'] = param['mvEndDate']
        this.props.onSearch(this.params, !this.props.reload)
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
})

export default connect(mapStateToProps, mapDispatchToProps) (MarginLoan)