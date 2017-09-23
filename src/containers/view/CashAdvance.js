import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Table, Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table"
import "react-table/react-table.css"
import '../../css/App.css';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import DataUpperTable from '../DataUpperTable'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import * as Utils from '../../utils'
import moment from 'moment'
import $ from 'jquery'
class CashAdvance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {},
            isShow: false,
            advancePayment: 0,
            advanceFee: 0,
            columns1: [
                {
                    Header: this.props.language.cashadvance.header.id,
                    accessor: 'mvOrderID',
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.matchingdate,
                    accessor: 'tradeDate',
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.paymentdate,
                    accessor: 'cashSettleDay',
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.stock,
                    accessor: 'mvStockID',
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.volume,
                    accessor: 'mvQuantity',
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.value,
                    accessor: 'mvAmount',
                    id: 'value',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.fee,
                    accessor: 'tradingFee',
                    id: 'fee',
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvance.header.date,
                    accessor: 'creationTime',
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.advanceamount,
                    accessor: 'totalLendingAmt',
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: this.props.language.cashadvance.header.advancefee,
                    accessor: 'interestAccured',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.processingstatus,
                    accessor: 'status',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.note,
                    accessor: 'remark',
                    id: 'note',
                    show: true,
                    skip: false,
                    width: 120,
                }
            ],
            cashAdTransPageIndex: 1,
            orderMatchListPageIndex: 1,

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.id = 'cashadvance'
        this.defaultPageSize = 15
       
        this.querySoldOrdersParams = {
            key: moment().valueOf(),
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCE',
            start: '0',
            limit: this.defaultPageSize,
            page: '1',
        }

        this.getCashAdvanceHistoryParams = {
            key: moment().valueOf(),
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT',
            start: '0',
            limit: this.defaultPageSize,
            page: '1'
        }

        this.getLocalAdvanceCreationParam = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT',
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns1: [
                {
                    Header: nextProps.language.cashadvance.header.id,
                    accessor: 'mvOrderID',
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.matchingdate,
                    accessor: 'tradeDate',
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.paymentdate,
                    accessor: 'cashSettleDay',
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.stock,
                    accessor: 'mvStockID',
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.volume,
                    accessor: 'mvQuantity',
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.value,
                    accessor: 'mvAmount',
                    id: 'value',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.fee,
                    accessor: 'tradingFee',
                    id: 'fee',
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
            columns2: [
                {
                    Header: nextProps.language.cashadvance.header.date,
                    accessor: 'creationTime',
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.advanceamount,
                    accessor: 'totalLendingAmt',
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: nextProps.language.cashadvance.header.advancefee,
                    accessor: 'interestAccured',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    id: 'status',
                    accessor: 'status',
                    Header: nextProps.language.cashadvance.header.processingstatus,
                    Cell: props => {
                        if(props.original.status === 'A')
                            return nextProps.language.cashadvance.status.authorized;
                        if(props.original.status === '')
                            return nextProps.language.cashadvance.status.pending;
                        else
                            return props.original.status;
                    },
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.note,
                    accessor: 'remark',
                    id: 'note',
                    Cell: props => {
                        if(props.original.status === '')
                            return nextProps.language.cashadvance.remark.remark;
                        else
                            return props.original.remark;
                    },
                    show: true,
                    skip: false,
                    width: 400,
                }
            ],

        })

        this.setState({advanceFee: nextProps.LocalAdvance.mvAdvanceBean.advFee})

        
        
    }

    render() {

        console.log(this.props.SoldOrders.mvChildBeanList, this.props.CashAdvanceHistory.list, this.props.LocalAdvance.mvAdvanceBean)
        var soldOrders = this.props.SoldOrders.mvChildBeanList === undefined ? [] : this.props.SoldOrders.mvChildBeanList
        var cashAdvanceHistory = this.props.CashAdvanceHistory.list === undefined ? [] : this.props.CashAdvanceHistory.list
        var localAdvance = this.props.LocalAdvance.mvAdvanceBean === undefined ? [] : this.props.LocalAdvance.mvAdvanceBean

        soldOrders = soldOrders === null ? [] : soldOrders
        cashAdvanceHistory = cashAdvanceHistory === null ? [] : cashAdvanceHistory
        localAdvance = localAdvance === null ? [] : localAdvance

        let lgClose = () => this.setState({ isShow: false })

        let buttonActionCashAdTrans = [
            <Pagination
                    pageIndex={this.state.cashAdTransPageIndex} 
                    totalRecord={Math.ceil(cashAdvanceHistory.length / this.defaultPageSize)} 
                    onPageChange={this.onCashAdTransPageChange.bind(this)}
                    onNextPage={this.onCashAdTransNextPage.bind(this)}
                    onPrevPage={this.onCashAdTransPrevPage.bind(this)}
                    onReloadPage={this.onCashAdTransReloadPage.bind(this)}
                />,
        ]
        let buttonActionOrderMatchList = [
            <Pagination
                    pageIndex={this.state.orderMatchListPageIndex} 
                    totalRecord={soldOrders.length} 
                    onPageChange={this.onOrderMatchListPageChange.bind(this)}
                    onNextPage={this.onOrderMatchListNextPage.bind(this)}
                    onPrevPage={this.onOrderMatchListPrevPage.bind(this)}
                    onReloadPage={this.onOrderMatchListReloadPage.bind(this)}
                />,
        ]

        let advAvailable = Utils.numUnFormat(localAdvance.advAvailable) - Utils.numUnFormat(localAdvance.advPending)
        return (
        <div style={{height: '100%'}}>
            <div className="component-header" >
                <span className="content-block-head">
                    {this.props.language.menu[this.id]}
                </span>
                <ul className="btn-action">
                    <li className="btn-close">
                        <span className="glyphicon glyphicon-remove" ></span>
                    </li>
                </ul>
            </div>
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
            <div className="component-main cashadvance">
                <div className="cashadvance-history">
                    <div className="cashadvance-form" style={{paddingRight:"2px", paddingLeft: "2px",}}>
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.cashadvance.header.cashadvanceplace}</span>
                        </div>
                        <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className={"form-" + this.id}>
                            <FormGroup>
                                <Table responsive>
                                    <tbody >
                                        <tr>
                                            <th>{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                            <td>{Utils.currencyShowFormatter(advAvailable,",", 'vi-VN')}</td>
                                        </tr>
                                        <tr>
                                            <th>{this.props.language.cashadvance.header.advancefee}</th>
                                            <td>
                                                {Utils.currencyShowFormatter(this.state.advanceFee, ",", 'vi-VN')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                            <td>
                                                <FormGroup>
                                                    <input type="number" name="volume" min="0" onChange={this.onAdvancePaymentChange.bind(this)}  
                                                        id="txtAdvancePayment" required />
                                                </FormGroup>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </Table>
                                <div className="group-btn-action cashadvance-action">
                                    <span>
                                        <Button className="btn btn-default" type="submit" className="submit">
                                            Submit
                                        </Button>
                                        <Button className="btn btn-default" type="reset" className="cancel">
                                            Clear
                                        </Button>
                                    </span>
                                </div>
                            </FormGroup>
                           
                        </Form>
                    </div>
                    <div className="cashadvance-his-table" style={{paddingRight:"2px", paddingLeft: "2px",}}>
                        <div className="table-main">
                            <DataUpperTable
                                id={this.id + "-table2"}
                                data={cashAdvanceHistory.slice((this.state.cashAdTransPageIndex - 1)*6, this.state.cashAdTransPageIndex*6)}
                                columns={this.state.columns2}
                                defaultPageSize={15}/>
                        </div>
                        <div className="table-header">
                            <div className="title" style={this.props.theme.porfolio.titlestock}>
                                <span>{this.props.language.cashadvance.header.cashadvancetransaction}</span>
                            </div>
                        
                            <SearchBar
                                id={this.id+"-searchbar2"}
                                buttonAction={buttonActionCashAdTrans}
                                language={this.props.language.searchbar}
                                theme={this.props.theme}
                                onChangeStateColumn={this.onCashAdTransChangeStateColumn.bind(this)}
                                data={{stockList: [], columns: this.state.columns2}}
                                param={['dropdown']}
                                 />
                        </div>
                        
                    </div>
                </div>

                <div className="cashadvance-order-matching">
                    <div className="table-main">
                        <DataUpperTable
                            id={this.id + "-table1"}
                            columns={this.state.columns1}
                            data={soldOrders.slice((this.state.orderMatchListPageIndex - 1)*15, this.state.orderMatchListPageIndex*15 )}
                            defaultPageSize={15}/>
                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.cashadvance.header.ordermatchinglist}</span>
                        </div>
                        <SearchBar
                            id={this.id+"-searchbar1"}
                            buttonAction={buttonActionOrderMatchList}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            onChangeStateColumn={this.onOrderMatchListChangeStateColumn.bind(this)}
                            data={{stockList: [], columns: this.state.columns1}}
                            param={['dropdown']} />
                    </div>

                </div>
            </div>
            </div>
        </div>
        );
    }

    componentDidMount(){
        this.props.getQuerySoldOrders(this.querySoldOrdersParams);
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams);
        this.props.getLocalAdvanceCreation(this.querySoldOrdersParams);
    }

    // page change of cash advance transaction (table 1)
    onCashAdTransChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns2: this.state.columns2.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onCashAdTransNextPage(){
            this.state.cashAdTransPageIndex = parseInt(this.state.cashAdTransPageIndex) + 1
            this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdTransPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
            this.getCashAdvanceHistoryParams['key'] = moment().valueOf()
            this.getCashAdvanceHistoryParams['page'] = this.state.cashAdTransPageIndex
            this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onCashAdTransPrevPage(){
            this.state.cashAdTransPageIndex = parseInt(this.state.cashAdTransPageIndex) - 1
            this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdTransPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
            this.getCashAdvanceHistoryParams['key'] = moment().valueOf()
            this.getCashAdvanceHistoryParams['page'] = this.state.cashAdTransPageIndex
            this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onCashAdTransReloadPage(){
        this.getCashAdvanceHistoryParams['key'] = moment().valueOf()
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }
    onCashAdTransPageChange(pageIndex) {
            this.state.cashAdTransPageIndex = pageIndex
            this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdTransPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
            this.getCashAdvanceHistoryParams['key'] = moment().valueOf()
            this.getCashAdvanceHistoryParams['page'] = this.state.cashAdTransPageIndex
            this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    // page change of order matching list (table 2)
    onOrderMatchListChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns1: this.state.columns1.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onOrderMatchListNextPage(){
            this.state.orderMatchListPageIndex = parseInt(this.state.orderMatchListPageIndex) + 1
            this.querySoldOrdersParams['start'] = (this.state.orderMatchListPageIndex - 1) * this.querySoldOrdersParams['limit']
            this.querySoldOrdersParams['page'] = this.state.orderMatchListPageIndex
            this.querySoldOrdersParams['key'] = moment().valueOf() 
            this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }

    onOrderMatchListPrevPage(){
            this.state.orderMatchListPageIndex = parseInt(this.state.orderMatchListPageIndex) - 1
            this.querySoldOrdersParams['start'] = (this.state.orderMatchListPageIndex - 1) * this.querySoldOrdersParams['limit']
            this.querySoldOrdersParams['page'] = this.state.orderMatchListPageIndex
            this.querySoldOrdersParams['key'] = moment().valueOf() 
            this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }

    onOrderMatchListReloadPage(){
        this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }
    onOrderMatchListPageChange(pageIndex) {
            this.state.orderMatchListPageIndex = pageIndex
            this.querySoldOrdersParams['start'] = (this.state.orderMatchListPageIndex - 1) * this.querySoldOrdersParams['limit']
            this.querySoldOrdersParams['page'] = this.state.orderMatchListPageIndex
            this.querySoldOrdersParams['key'] = moment().valueOf() 
            this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }
    ////

    handleSubmit(e) {
        e.preventDefault()
        let advPayment = document.getElementById('txtAdvancePayment').value
        this.props.beforeSubmit(advPayment, this.props.LocalAdvance.mvAdvanceBean, this.props.language)
    }

    onAdvancePaymentChange(e) {
        e.preventDefault();
        let advPayment = e.target.value
        let advCfgInfor = this.props.LocalAdvance.mvAdvanceBean

        if(advCfgInfor && advPayment > 0){
            
            var tempFee = 0;
            
            var advAmt = Utils.devideByCurrencyUnit(advPayment)
            
            var nt2Adv = parseFloat(advCfgInfor.t2AdvAvailable)
            var cont = true;
            if(nt2Adv > 0){
                if(advAmt > nt2Adv){
                    tempFee += parseFloat(nt2Adv)*parseFloat(advCfgInfor.t2Days)*parseFloat(advCfgInfor.interestRate)/100;
                    advAmt = advAmt - nt2Adv;
                }else {
                    tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t2Days)*parseFloat(advCfgInfor.interestRate)/100;
                    cont = false;
                }
            } 
            
            var nt1Adv = parseFloat(advCfgInfor.t1AdvAvailable);
            if(cont && nt1Adv > 0){
                if(advAmt > nt1Adv){
                    tempFee += parseFloat(nt1Adv)*parseFloat(advCfgInfor.t1Days)*parseFloat(advCfgInfor.interestRate)/100;
                    advAmt = advAmt - nt1Adv;
                }else {
                    tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t1Days)*parseFloat(advCfgInfor.interestRate)/100;
                    cont = false;
                }
            }
            
            var nt0Adv = parseFloat(advCfgInfor.t0AdvAvailable);
            if(cont && nt0Adv > 0){
                if(advAmt > nt0Adv){
                    tempFee += parseFloat(nt0Adv)*parseFloat(advCfgInfor.t0Days)*parseFloat(advCfgInfor.interestRate)/100;
                    advAmt = advAmt - nt0Adv;
                }else {
                    tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t0Days)*parseFloat(advCfgInfor.interestRate)/100;
                    cont = false;
                }
            }	

            this.setState({ advanceFee: tempFee })
        }
					
        
    }

}


const mapStateToProps = (state) => {
    return {
        SoldOrders: state.cashadvance.SoldOrders,
        CashAdvanceHistory: state.cashadvance.CashAdvanceHistory,
        LocalAdvance: state.cashadvance.LocalAdvance,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getQuerySoldOrders: (params) => {
        dispatch(actions.getQuerySoldOrders(params))
    },
    getCashAdvance: (params) => {
        dispatch(actions.getCashAdvance(params))
    },
    getLocalAdvanceCreation: (params) => {
        dispatch(actions.getLocalAdvanceCreation(params))
    },
    beforeSubmit: (advPayment, mvAdvanceBean, language) => {
        dispatch(actions.beforeSubmitCashAdvance(advPayment, mvAdvanceBean, language))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(CashAdvance)
