import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'

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
        return (
            <div id={this.id + '-body'} className="layout-body">
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
                <DataTable 
                    id={this.id + '-table'}
                    columns={this.state.columns} 
                    data={[]}
                />
                
                <Footer pageIndex={1} onPageChange={this.onPageChange.bind(this)}/>
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

    onPageChange(pageIndex){
        // console.log('stockstatement onPageChange', pageIndex)
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