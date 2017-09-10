import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Table, Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table"
import "react-table/react-table.css"
import '../../css/App.css';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import Popup from '../Popup'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'
import * as Utils from '../../utils'

class CashAdvanceBank extends Component {
    constructor(props) {
        super(props)

        this.id = 'cashadvancebank'
        this.defaultPageSize = 15
        this.rowSelected = []

        this.queryBankInfoParams = {
            key: (new Date()).getTime()
        }

        this.getCashAdvanceHistoryParams = {
            key: (new Date()).getTime(),
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT',
            queryBank: true,
            start: '0',
            limit: this.defaultPageSize,
            page: '1'
        }

        this.queryAdvancePaymentInfoParams = {
            mvBankID: '',
            mvSettlement: '',
        }

        this.MatchOrderBankListData = {
            cOrderIDArray: [],
            cContractIDArray: [],
            cTovalValue: 0,
            cAmount: 0,
            cMaxAmt: 0,
            cCurrencySymbol: "",
            cBankIDHF: "",
            cBankACIDHF: "",
            cTPLUSXHF: ""
        }

        this.state = {
            formValues: {},
            cashAdvHistoryPageIndex: 1,
            matchOrderBankListPageIndex: 1,
            columns1: [
                {
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    Header: this.props.language.cashadvancebank.header.contractid,
                    accessor: 'contractid',
                    id: 'contractid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.orderid,
                    accessor: 'orderid',
                    id: 'orderid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.settlementdate,
                    accessor: 'settlementdate',
                    id: 'settlementdate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.tradedate,
                    accessor: 'tradedate',
                    id: 'tradedate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.stockid,
                    accessor: 'stockid',
                    id: 'stockid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.price,
                    accessor: 'price',
                    id: 'price',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.quantity,
                    accessor: 'quantity',
                    id: 'quantity',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.value,
                    accessor: 'value',
                    id: 'value',
                    show: true,
                    skip: false,
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvancebank.header.date,
                    accessor: 'date',
                    id: 'date',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.advanceamount,
                    accessor: 'advanceamount',
                    id: 'advanceamount',
                    show: true,
                    skip: false,

                },
                {
                    Header: this.props.language.cashadvancebank.header.advancefee,
                    accessor: 'advancefee',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.processingstatus,
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.lastupdate,
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.note,
                    accessor: 'note',
                    id: 'note',
                    show: true,
                    skip: false,
                }
            ],
        }

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns1: [
                {
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    Header: this.props.language.cashadvancebank.header.contractid,
                    accessor: 'mvContractID',
                    id: 'contractid',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.orderid,
                    accessor: 'mvOrderID',
                    id: 'orderid',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.settlementdate,
                    accessor: 'mvSettleDay',
                    id: 'settlementdate',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.tradedate,
                    accessor: 'tranDate',
                    id: 'tradedate',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.stockid,
                    accessor: 'mvStockID',
                    id: 'stockid',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.price,
                    accessor: 'mvPrice',
                    id: 'price',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.quantity,
                    accessor: 'mvAmount',
                    id: 'quantity',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.value,
                    accessor: 'mvAvailableAmount',
                    id: 'value',
                    show: true,
                    skip: false
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvancebank.header.date,
                    accessor: 'creationTime',
                    id: 'date',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.advanceamount,
                    accessor: 'totalLendingAmt',
                    id: 'advanceamount',
                    show: true,
                    skip: false

                },
                {
                    Header: this.props.language.cashadvancebank.header.advancefee,
                    accessor: 'fee',
                    id: 'advancefee',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.processingstatus,
                    accessor: 'status',
                    id: 'processingstatus',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    id: 'lastupdate',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.note,
                    accessor: 'remark',
                    id: 'note',
                    show: true,
                    skip: false
                }
            ],
        })
    }

    render() {
        var queryAdvancePaymentInfo = this.props.queryAdvancePaymentInfo
        var cashAdvanceHistory = this.props.cashAdvanceHistory
        var queryBankInfo = this.props.queryBankInfo
        var calculateInterestAmt = this.props.calculateInterestAmt
        
        // table 1
        let buttonAction1 = [
            <Pagination
                    pageIndex={this.state.cashAdvHistoryPageIndex} 
                    totalRecord={Math.ceil(cashAdvanceHistory.totalCount / this.defaultPageSize)} 
                    onPageChange={this.onPageChange1.bind(this)}
                    onNextPage={this.onNextPage1.bind(this)}
                    onPrevPage={this.onPrevPage1.bind(this)}
                    onReloadPage={this.onReloadPage1.bind(this)}
                />,
        ]

        // table 2
        let buttonAction2 = [
            <Pagination
                    pageIndex={this.state.matchOrderBankListPageIndex} 
                    totalRecord={Math.ceil(queryAdvancePaymentInfo.mvChildBeanList.length / this.defaultPageSize)} 
                    onPageChange={this.onPageChange2.bind(this)}
                    onNextPage={this.onNextPage2.bind(this)}
                    onPrevPage={this.onPrevPage2.bind(this)}
                    onReloadPage={this.onReloadPage2.bind(this)}
                />,
        ]
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
            <div className="component-main cashadvancebank">

            <div className="cashadvancebank-order-list">
                <div className="cashadvancebank-form">
                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                        <span>{this.props.language.cashadvance.header.cashadvanceplace}</span>
                    </div>
                    <Form onSubmit={this.handleSubmit.bind(this)} id="form-cashadvance">
                        <FormGroup>
                            <Table responsive>
                                <tbody >
                                     <tr>
                                        <th className="enterorder">{this.props.language.cashadvancebank.header.bankaccount}</th>
                                        <td>
                                            <input id="mvBank" list="Bank" name="bank" id="mvBank" onChange={this.getAdvanceOrderData.bind(this)} required />
                                            <datalist id="Bank">
                                                {
                                                    queryBankInfo.mvBankInfoList.map(bank => {
                                                        return (
                                                            <option value={bank.mvSettlementAccountDisplayName} />
                                                        )
                                                    })
                                                }
                                            </datalist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="enterorder">{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                        <td id="txtAdvanceAvailable">4.600.630</td>
                                    </tr>
                                    <tr>
                                        <th className="enterorder">{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                            {Utils.toTTLCurrencyFormat(calculateInterestAmt.mvInterestAmt)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="enterorder">{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td>
                                            <FormGroup controlID="volume">
                                                <input type="number" name="volume" min="0" onBlur={this.doCalculateInterest.bind(this)}  
                                                    id="txtAdvancePayment" required />
                                            </FormGroup>
                                        </td>
                                    </tr>
                              </tbody>
                          </Table>
                          <div className="group-btn-action cashadvancebank-action">
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
                <div className="cashadvancebank-table1"> {/*table 1*/}
                    <div className="table-main">
                        <DataUpperTable
                            key={this.id + "-table1"}
                            id={this.id + "-table1"}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns1}
                            data={queryAdvancePaymentInfo.mvChildBeanList.slice(
                                    (this.state.matchOrderBankListPageIndex - 1) * this.defaultPageSize + 1, 
                                    this.state.matchOrderBankListPageIndex * this.defaultPageSize + 1)}
                            />

                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.cashadvance.header.ordermatchinglist}</span>
                        </div>
                        <SearchBar
                          key={this.id + '-search3'}
                          id={this.id + '-search3'}
                          onSearch={[]}
                          hideSearchButton={true}
                          buttonAction={buttonAction1}
                          stockList={this.props.stockList}
                          language={this.props.language.searchbar}
                          theme={this.props.theme}
                          columns={this.state.columns1}
                          onChangeStateColumn={this.onChangeStateColumn1.bind(this)}
                          param={['dropdown']}
                          />
                    </div>
                 </div>
            </div>

            <div className="cashadvancebank-table2"> {/*table 2*/}
                <div className="table-main">
                    <DataUpperTable
                        key={this.id + "-table2"}
                        id={this.id + "-table2"}
                        defaultPageSize={this.defaultPageSize}
                        columns={this.state.columns2}/>
                </div>
                <div className="table-header">
                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                        <span>{this.props.language.cashadvance.header.ordermatchinglist}</span>
                    </div>
                    <SearchBar
                      key={this.id + '-search3'}
                      id={this.id + '-search3'}
                      onSearch={[]}
                      hideSearchButton={true}
                      buttonAction={buttonAction2}
                      stockList={this.props.stockList}
                      language={this.props.language.searchbar}
                      theme={this.props.theme}
                      columns={this.state.columns2}
                      onChangeStateColumn={this.onChangeStateColumn2.bind(this)}
                      param={['dropdown']}
                      data={cashAdvanceHistory.list}/>
                </div>
                
            </div>    

            </div>
            </div>
        );
    }
/// 1//
    onChangeStateColumn1(e) {
        const id = e.target.id
        this.setState({
            columns1: this.state.columns1.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage1(){
        this.setState({ matchOrderBankListPageIndex:  parseInt(this.state.matchOrderBankListPageIndex) + 1});
    }

    onPrevPage1(){
        this.setState({ matchOrderBankListPageIndex:  parseInt(this.state.matchOrderBankListPageIndex) - 1});
        
    }

    onReloadPage1(){
    }

    onPageChange1(pageIndex) {
        this.setState({ matchOrderBankListPageIndex:  parseInt(pageIndex)});
        
    }
///2///
    onChangeStateColumn2(e) {
        const id = e.target.id
        this.setState({
            columns2: this.state.columns2.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage2(){
        this.state.cashAdvHistoryPageIndex = parseInt(this.state.cashAdvHistoryPageIndex) + 1
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdvHistoryPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdvHistoryPageIndex
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()

        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onPrevPage2(){
        this.state.cashAdvHistoryPageIndex = parseInt(this.state.cashAdvHistoryPageIndex) + 1
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdvHistoryPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdvHistoryPageIndex
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()

        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onReloadPage2(){
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onPageChange2(pageIndex) {
        this.state.cashAdvHistoryPageIndex = parseInt(pageIndex)
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdvHistoryPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdvHistoryPageIndex
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()

        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }
    ////

     onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all').checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.queryAdvancePaymentInfo.mvChildBeanList
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

            if (document.getElementsByClassName(this.id + '-row-checkbox').length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all").checked = true
            else
                document.getElementById(this.id + "-cb-all").checked = false
        }

        this.MatchOrderBankListData.cTovalValue = 0;
        this.MatchOrderBankListData.cOrderIDArray = new Array()
        this.MatchOrderBankListData.cContractIDArray = new Array()

        for (var i = 0; i < this.rowSelected.length; i++) {
            this.MatchOrderBankListData.cOrderIDArray[i] = this.rowSelected[i].mvOrderID
            this.MatchOrderBankListData.cContractIDArray[i] = this.rowSelected[i].mvContractID
            this.MatchOrderBankListData.cTovalValue += parseFloat(this.rowSelected[i].mvAvailableAmount)
            this.MatchOrderBankListData.cTPLUSXHF = this.rowSelected[i].mvSettleDay
        }
        
        var txtAdvanceAvailable = document.getElementById('txtAdvanceAvailable')
        var txtAdvancePayment = document.getElementById('txtAdvancePayment')
        txtAdvanceAvailable.value = Utils.currencyShowFormatter(this.MatchOrderBankListData.cTovalValue, ",", 'vi-VN')
        txtAdvancePayment.value = Utils.currencyShowFormatter(this.MatchOrderBankListData.cTovalValue, ",", 'vi-VN')
        
        this.props.calculateInterest({
            advPayment: document.getElementById('txtAdvancePayment').value,
            language: this.props.language
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let advPayment = document.getElementById('txtAdvancePayment').value
        this.MatchOrderBankListData['advAmt'] = advPayment
        this.props.beforeSubmitCashAdvBank({
            advPayment: advPayment,
            language: this.props.language,
            data: this.MatchOrderBankListData
        })
    }

    doCalculateInterest(e) {
        e.preventDefault();
        this.props.calculateInterest({
            advPayment: document.getElementById('txtAdvancePayment').value,
            language: this.props.language
        })
    }

    getAdvanceOrderData(e){
        // get data and fill out to table 1
        var bank = this.props.queryBankInfo.mvBankInfoList.filter(el => el.mvSettlementAccountDisplayName === e.target.value)
        if(bank.length > 0){
            var stleDay = "3T"
            var params = {
                'mvBankID' : bank[0].mvBankID,
                'mvSettlement' : stleDay
            }

            this.props.getqueryAdvancePaymentInfo(params)
        }
        
    }


    componentDidMount(){
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
        this.props.getqueryBankInfo(this.queryBankInfoParams)
    }
}

const mapStateToProps = (state) => {
    return {
        queryAdvancePaymentInfo: state.cashadvancebank.queryAdvancePaymentInfo,
        cashAdvanceHistory: state.cashadvancebank.CashAdvanceHistory,
        queryBankInfo: state.cashadvancebank.queryBankInfo,
        calculateInterestAmt: state.cashadvancebank.calculateInterestAmt
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getqueryAdvancePaymentInfo: (params) => {
        dispatch(actions.getqueryAdvancePaymentInfo(params))
    },
    getCashAdvance: (params) => {
        dispatch(actions.getCashAdvance(params))
    },
    getqueryBankInfo: (params) => {
        dispatch(actions.getqueryBankInfo(params))
    },
    calculateInterest: (params) => {
        dispatch(actions.calculateInterest(params))
    },
    beforeSubmitCashAdvBank: (params) => {
        dispatch(actions.beforeSubmitCashAdvBank(params))
    },
    onShowMessageBox: (title, message) => {
        dispatch(actions.showMessageBox(title, message))
    },

})




export default connect(mapStateToProps, mapDispatchToProps)(CashAdvanceBank)
