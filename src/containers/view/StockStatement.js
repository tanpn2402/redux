import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'

const buttonStyle = {
    display: 'none',
}

class StockStatement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns : [
                {
                    id: 'mvOrder',
                    Header: this.props.language.stockstatement.header.order,
                    accessor: 'mvOrder',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: this.props.language.stockstatement.header.transactiondate,
                    accessor: 'mvTransactionDate',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockCode',
                    Header: this.props.language.stockstatement.header.stockcode,
                    accessor: 'mvStockCode',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAction',
                    Header: this.props.language.stockstatement.header.action,
                    accessor: 'mvAction',
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
                            accessor: 'mvCreditQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAvgPrice',
                            Header: this.props.language.stockstatement.header.avgprice,
                            accessor: 'mvCreditAvgPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAmt',
                            Header: this.props.language.stockstatement.header.amt,
                            accessor: 'mvCreditAmt',
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
                            accessor: 'mvDebitQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAvgPrice',
                            Header: this.props.language.stockstatement.header.avgprice,
                            accessor: 'mvDebitAvgPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAmt',
                            Header: this.props.language.stockstatement.header.amt,
                            accessor: 'mvDebitAmt',
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
                            accessor: 'mvValue',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPercentage',
                            Header: this.props.language.stockstatement.header.percentage,
                            accessor: 'mvPercentage',
                            width: 60,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvDescription',
                    Header: this.props.language.stockstatement.header.description,
                    accessor: 'mvDescription',
                    width: 200,
                    skip: false,
                    show: true,
                },
            ]
        }

        //this.buttonAction = [<Button style={buttonStyle} bsStyle="primary" type="button"></Button>,]
        this.id='stockstatement'
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns : [
                {
                    id: 'mvOrder',
                    Header: nextProps.language.stockstatement.header.order,
                    accessor: 'mvOrder',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: nextProps.language.stockstatement.header.transactiondate,
                    accessor: 'mvTransactionDate',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockCode',
                    Header: nextProps.language.stockstatement.header.stockcode,
                    accessor: 'mvStockCode',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAction',
                    Header: nextProps.language.stockstatement.header.action,
                    accessor: 'mvAction',
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
                            accessor: 'mvCreditQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAvgPrice',
                            Header: nextProps.language.stockstatement.header.avgprice,
                            accessor: 'mvCreditAvgPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvCreditAmt',
                            Header: nextProps.language.stockstatement.header.amt,
                            accessor: 'mvCreditAmt',
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
                            accessor: 'mvDebitQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAvgPrice',
                            Header: nextProps.language.stockstatement.header.avgprice,
                            accessor: 'mvDebitAvgPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvDebitAmt',
                            Header: nextProps.language.stockstatement.header.amt,
                            accessor: 'mvDebitAmt',
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
                            accessor: 'mvValue',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPercentage',
                            Header: nextProps.language.stockstatement.header.percentage,
                            accessor: 'mvPercentage',
                            width: 60,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvDescription',
                    Header: nextProps.language.stockstatement.header.description,
                    accessor: 'mvDescription',
                    width: 200,
                    skip: false,
                    show: true,
                },
            ]
        })
    }

    render() {
        var data = this.props.data.mvStockStatementList === undefined ? [] : this.props.data.mvStockStatementList
        var page = this.props.data.mvPage === undefined ? [] : this.props.data.mvPage

        return (
            <div id={this.id + '-body'} className="layout-body">
                <SearchBar
                    id={this.id}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={[]} 
                    stockList={this.props.stockList} 
                    language={this.props.language.searchbar} 
                    theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={['mvStartDate', 'mvEndDate', 'dropdown']}
                />
                <DataTable 
                    id={this.id + '-table'}
                    columns={this.state.columns} 
                    data={data}
                />
                
                <Footer pageIndex={page} onPageChange={this.onPageChange.bind(this)}/>
            </div>
        )
    }
    
    componentDidMount() {
        this.props.onSearch(this.id)
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
        console.log('stockstatement onSearch', param)
        this.props.onSearch(param, !this.props.reload)
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

export default connect(mapStateToProps, mapDispatchToProps) (StockStatement)
