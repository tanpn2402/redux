import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal,} from 'react-bootstrap';
import SearchBar from './../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import * as Utils from '../../utils'

class LoanRefund extends Component {
    constructor(props) {
        super(props)

        this.defaultPageSize = 15

        this.localLoanRefundCreationParams = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'LOANREFUND'
        }
        this.localAdvanceCreationParams = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT'
        }
        this.loanRefundDataParams = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'LOANREFUND',
            key: (new Date()).getTime(),
            start: 0,
            limit: this.defaultPageSize,
            page: 1
        }
        this.loanRefundHistoryParams = {
            mvStartDate: (new Date()).getDate() + '/' + ((new Date()).getMonth() + 1) + '/' + (new Date()).getFullYear(),
            mvEndDate: (new Date()).getDate() + '/' + ((new Date()).getMonth() + 1) + '/' + (new Date()).getFullYear(),
            key: (new Date()).getTime(),
            start: 0,
            limit: this.defaultPageSize,
            page: 1
        }

        this.state = {
            loanRefundStatusPageIndex: 1,
            loanRefundHistoryPageIndex: 1,

            loanRefundStatusCol: [
                {
                    id: 'loanID',
                    Header: this.props.language.loanrefund.header.loanID,
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'tradeDate',
                    Header: this.props.language.loanrefund.header.trandate,
                    accessor: 'tradeDate',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundAmt',
                    Header: this.props.language.loanrefund.header.refundamount,
                    accessor: 'refundAmt',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'type',
                    Header: this.props.language.loanrefund.header.type,
                    accessor: 'type',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'status',
                    Header: this.props.language.loanrefund.header.status,
                    accessor: 'status',
                    width: 100,
                    Cell: props => {
                        if (props.original.status === 'A')
                            return this.props.language.loanrefund.type.autorepayment;
                        if (props.original.status === 'M')
                            return this.props.language.loanrefund.type.repaymentbyrequest;
                        if (props.original.status == 'A')
                            return this.props.language.loanrefund.status.approved;
                    },
                    show: true,
                    skip: false,
                }, {
                    id: 'remark',
                    Header: this.props.language.loanrefund.header.remark,
                    accessor: 'remark',
                    width: 250,
                    Cell: props => {
                        if (props.original.remark === 'For Margin Call')
                            return this.props.language.loanrefund.remark.formargincall;
                    },
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate',
                    Header: this.props.language.loanrefund.header.lastupdate,
                    accessor: 'lastupdate',
                    width: 150,
                    show: true,
                    skip: false,
                },

            ],

            loanRefundHistoryCol: [
                {
                    id: 'loanID1',
                    Header: this.props.language.loanrefund.header.loanID,
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'tradeDate1',
                    Header: this.props.language.loanrefund.header.trandate,
                    accessor: 'tradeDate',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundAmt1',
                    Header: this.props.language.loanrefund.header.refundamount,
                    accessor: 'refundAmt',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'type1',
                    Header: this.props.language.loanrefund.header.type,
                    accessor: 'type',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'status1',
                    Header: this.props.language.loanrefund.header.status,
                    accessor: 'status',
                    width: 100,
                    Cell: props => {
                        if (props.original.status === 'A')
                            return this.props.language.loanrefund.type.autorepayment;
                        if (props.original.status === 'M')
                            return this.props.language.loanrefund.type.repaymentbyrequest;
                        if (props.original.status == 'A')
                            return this.props.language.loanrefund.status.approved;
                    },
                    show: true,
                    skip: false,
                }, {
                    id: 'remark1',
                    Header: this.props.language.loanrefund.header.remark,
                    accessor: 'remark',
                    width: 250,
                    Cell: props => {
                        if (props.original.remark === 'For Margin Call')
                            return this.props.language.loanrefund.remark.formargincall;
                    },
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate1',
                    Header: this.props.language.loanrefund.header.lastupdate,
                    accessor: 'lastupdate',
                    width: 150,
                    show: true,
                    skip: false,
                },

            ]
        },


        this.id = 'loanrefund'
        this.lang = 'vi-VN'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({

            loanRefundStatusCol: [
                {
                    id: 'loanID',
                    Header: nextProps.language.loanrefund.header.loanID,
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'tradeDate',
                    Header: nextProps.language.loanrefund.header.trandate,
                    accessor: 'tradeDate',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundAmt',
                    Header: nextProps.language.loanrefund.header.refundamount,
                    accessor: 'refundAmt',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.refundAmt, ",", this.lang)
                    },
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'type',
                    Header: nextProps.language.loanrefund.header.type,
                    accessor: 'type',
                    Cell: props => {
                        var ty = nextProps.language.loanrefund.type['TYPE_' + props.original.type]
                        ty = ty === undefined ? props.original.status : ty
                        return ty
                    },
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'status',
                    Header: nextProps.language.loanrefund.header.status,
                    accessor: 'status',
                    width: 100,
                    Cell: props => {
                        var stt = nextProps.language.loanrefund.status['STATUS_' + props.original.status]
                        stt = stt === undefined ? props.original.status : stt
                        return stt
                    },
                    show: true,
                    skip: false,
                }, {
                    id: 'remark',
                    Header: nextProps.language.loanrefund.header.remark,
                    accessor: 'remark',
                    Cell: props => {
                        if (props.original.remark === 'For Margin Call')
                            return nextProps.language.loanrefund.remark.formargincall
                        else
                            return props.original.remark
                    },
                    width: 250,
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate',
                    Header: nextProps.language.loanrefund.header.lastupdate,
                    accessor: 'lastupdate',
                    width: 150,
                    show: true,
                    skip: false,
                },

            ],

            loanRefundHistoryCol: [
                {
                    id: 'loanID1',
                    Header: nextProps.language.loanrefund.header.loanID,
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'tradeDate1',
                    Header: nextProps.language.loanrefund.header.trandate,
                    accessor: 'tradeDate',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundAmt1',
                    Header: nextProps.language.loanrefund.header.refundamount,
                    accessor: 'refundAmt',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.refundAmt, ",", this.lang)
                    },
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'type1',
                    Header: nextProps.language.loanrefund.header.type,
                    accessor: 'type',
                    Cell: props => {
                        var ty = nextProps.language.loanrefund.type['TYPE_' + props.original.type]
                        ty = ty === undefined ? props.original.status : ty
                        return ty
                    },
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'status1',
                    Header: nextProps.language.loanrefund.header.status,
                    accessor: 'status',
                    width: 100,
                    Cell: props => {
                        var stt = nextProps.language.loanrefund.status['STATUS_' + props.original.status]
                        stt = stt === undefined ? props.original.status : stt
                        return stt
                    },
                    show: true,
                    skip: false,
                }, {
                    id: 'remark1',
                    Header: nextProps.language.loanrefund.header.remark,
                    accessor: 'remark',
                    width: 250,
                    Cell: props => {
                        if (props.original.remark === 'For Margin Call')
                            return nextProps.language.loanrefund.remark.formargincall
                        else
                            return props.original.remark
                    },
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate',
                    Header: nextProps.language.loanrefund.header.lastupdate,
                    accessor: 'lastupdate',
                    width: 150,
                    show: true,
                    skip: false,
                },

            ]


        })
    }


    render() {
        
        var localLoanRefundCreation = this.props.localLoanRefundCreation
        var localAdvanceCreation = this.props.localAdvanceCreation
        var loanRefundData = this.props.loanRefundData
        var loanRefundHistory = this.props.loanRefundHistory

        var lang = 'vi-VN'
        let buttonAction1 = [
            <Pagination
                    pageIndex={this.state.loanRefundStatusPageIndex}
                    totalRecord={Math.ceil(loanRefundData.totalCount / this.defaultPageSize)}
                    onPageChange={this.onPageChange1.bind(this)}
                    onNextPage={this.onNextPage1.bind(this)}
                    onPrevPage={this.onPrevPage1.bind(this)}
                    onReloadPage={this.onReloadPage1.bind(this)}
                />,
        ]
        let buttonAction2 = [
            <Pagination
                    pageIndex={this.state.loanRefundHistoryPageIndex}
                    totalRecord={Math.ceil(loanRefundHistory.totalCount / this.defaultPageSize)}
                    onPageChange={this.onPageChange2.bind(this)}
                    onNextPage={this.onNextPage2.bind(this)}
                    onPrevPage={this.onPrevPage2.bind(this)}
                    onReloadPage={this.onReloadPage2.bind(this)}
                />,
        ]
        console.log( loanRefundHistory, this.state.loanRefundStatusCol )
        
        return (
            <div id={ 'component-' + this.id} className="component-wrapper" onMouseDown={ e=> e.stopPropagation() }>
                <div className="component-main loanrefund">
                    <div className="loanrefund-form">
                        <div className="loanrefund-form-group">
                            <div className="title" style={this.props.theme.loanrefund.titleloanrefundform}>
                                <span>{this.props.language.loanrefund.title.titleloanrefundform}</span>
                            </div>
                            <Form onSubmit={this.beforeSubmitLoanRefund.bind(this)} id="form-enterorder1">
                                <FormGroup>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.beginningloan}</th>
                                                <td >
                                                    <input
                                                        className="hks-input border-none" 
                                                        id="txtBeginLoan"
                                                        readOnly
                                                        ref={el => this.txtBeginLoan = el}
                                                        value=  {Utils.currencyShowFormatter(localLoanRefundCreation.mvLoanBean.loan, ",", lang)}
                                                    />
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.availablecashforrefund}</th>
                                                <td>
                                                    <input
                                                        className="hks-input border-none" 
                                                        id="txtCashAvailable"
                                                        readOnly
                                                        ref={el => this.txtCashAvailable = el}
                                                        value=  {
                                                                    localLoanRefundCreation.mvLoanBean.cashrsv < 0 ? 0 : 
                                                                    Utils.currencyShowFormatter(localLoanRefundCreation.mvLoanBean.cashrsv, ",", lang)
                                                                }
                                                    />
                                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.cashadvanceable}</th>
                                                <td >
                                                    <input
                                                        className="hks-input border-none" 
                                                        id="txtAdvanceAvailable"
                                                        readOnly
                                                        ref={el => this.txtAdvanceAvailable = el}
                                                        value=  {Utils.currencyShowFormatter(localLoanRefundCreation.mvLoanBean.advAvailable, ",", lang)}
                                                    />
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.loanrefundamount}</th>
                                                <td>
                                                    <input 
                                                        className="hks-input border" 
                                                        id="txtRefundAmt" 
                                                        required type="number" min="0" step="any" 
                                                        ref={el => this.txtRefundAmt = el} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.remark}</th>
                                                <td>
                                                    <input 
                                                        className="hks-input border" 
                                                        id="txtRemark"
                                                        ref={el => this.txtRemark = el} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div className="group-btn-action loanrefund-action">
                                        <span>
                                            <Button className="btn btn-default" type="submit" className="submit">
                                                {this.props.language.loanrefund.form.submit}
                                            </Button>
                                            <Button className="btn btn-default" type="reset" className="cancel">
                                                {this.props.language.loanrefund.form.cancel}
                                            </Button>
                                        </span>
                                    </div>
                                </FormGroup>
                            </Form>
                            <Form onSubmit={this.beforeSubmitAdvance.bind(this)} id="form-enterorder2">
                                <FormGroup>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.cashadvanceavailable}</th>
                                                <td >
                                                    <input
                                                        className="hks-input border-none" 
                                                        id="txtAdvanceAvailabler"
                                                        readOnly
                                                        ref={el => this.txtAdvanceAvailabler = el}
                                                        value= {Utils.currencyShowFormatter(localAdvanceCreation.mvAdvanceBean.advAvailable, ",", lang)}
                                                    />
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.advancefee}</th>
                                                <td >
                                                    <input
                                                        className="hks-input border-none" 
                                                        id="txtAdvanceFeer"
                                                        readOnly
                                                        ref={el => this.txtAdvanceFeer = el}
                                                        value= {Utils.currencyShowFormatter(localAdvanceCreation.mvAdvanceBean.advFee)}
                                                    />
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>{this.props.language.loanrefund.form.advanceamount}</th>
                                                <td>
                                                    <input 
                                                        className="hks-input border" 
                                                        type="number" min="0" step="any" onChange={this.caculateFee.bind(this)} 
                                                        id="txtAdvancePaymentr" required ref={el => this.txtAdvancePaymentr = el} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div className="group-btn-action loanrefund-action">
                                        <span>
                                            <Button className="btn btn-default" type="submit" className="submit">
                                                {this.props.language.loanrefund.form.submit}
                                            </Button>
                                            <Button className="btn btn-default" type="reset" className="cancel">
                                                {this.props.language.loanrefund.form.cancel}
                                            </Button>
                                        </span>
                                    </div>
                                </FormGroup>
            
                            </Form>
                        </div>
                        <div className="loanrefund-note">
                            <div className="title" style={this.props.theme.loanrefund.titleloanrefundnotice}>
                                <span>{this.props.language.loanrefund.title.titleloanrefundnotice}</span>
                            </div>
                            <div className="note-content">
                                <span>
                                    {this.props.language.loanrefund.title.titleloanrefundnoticeinfos}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="loanrefund-table">
                        <div id={this.id + "-xtable1"}>
                            <div className="table-main">
                                <DataUpperTable 
                                    id={this.id + "-table1"} 
                                    data={loanRefundData.loanrefundList}
                                    columns={this.state.loanRefundStatusCol} 
                                    defaultPageSize={this.defaultPageSize}/>
                            </div>
                            <div className="table-header">
                                <div className="title" style={this.props.theme.loanrefund.titleloanrefundstatus}>
                                    <span>{this.props.language.loanrefund.title.titleloanrefundstatus}</span>
                                </div>
                                <SearchBar 
                                    key={this.id+ '-search1'} 
                                    id={this.id+ '-search1'} 
                                    buttonAction={buttonAction1} 
                                    language={this.props.language.searchbar} 
                                    theme={this.props.theme} 
                                    onChangeStateColumn={this.onLoanRefundStatusColChange.bind(this)}
                                    data={{stockList: this.props.stockList, columns: this.state.loanRefundStatusCol}}
                                    param={[ 'dropdown']}/>
                            </div>
                        </div>
                        <div id={this.id + "-xtable2"}>
                            <div className="table-main">
                                <DataUpperTable 
                                    id={this.id + "-table2"} 
                                    columns={this.state.loanRefundHistoryCol} 
                                    data={loanRefundHistory.loanrefundhistoryList}
                                    defaultPageSize={this.defaultPageSize}/>
                            </div>
                            <div className="table-header">
                                <div className="title" style={this.props.theme.loanrefund.titleloanrefundhistory}>
                                    <span>{this.props.language.loanrefund.title.titleloanrefundhistory}</span>
                                </div>
                                <SearchBar 
                                    id={this.id + "-search2"} 
                                    onSearch={this.onLoanRefundHistorySearch.bind(this)} 
                                    buttonAction={buttonAction2} 
                                    language={this.props.language.searchbar} 
                                    theme={this.props.theme} 
                                    onChangeStateColumn={this.onLoanRefundHistoryColChange.bind(this)} 
                                    data={{stockList: this.props.stockList, columns: this.state.loanRefundHistoryCol}}
                                    param={[ 'mvStartDate', 'mvEndDate', 'dropdown']}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

        this.props.getLocalRefundCreation(this.localLoanRefundCreationParams)
        this.props.getLocalAdvanceCreation(this.localAdvanceCreationParams)
        this.props.getLoanRefundData(this.loanRefundDataParams)
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }

    handleSubmit(e) {
        e.preventDefault();
        // var loanrefundamount = document.getElementById('loanrefundamount').value
        // var cashrsv = document.getElementById('cashrsv').innerHTML
        // if (loanrefundamount <= 0)
        //     this.props.onShowMessageBox(1, this.props.language.loanrefund.warning.notblank)
        // else
        // if (cashrsv < loanrefundamount)
        //     this.props.onShowMessageBox(1, this.props.language.loanrefund.warning.insufficient)
        // else
        //     this.setState({
        //         isShow: true
        //     })
    }

    handleSubmit2(e) {
        // e.preventDefault();
        // var advavailable = parseInt(document.getElementById('advavailable').innerHTML.replace(/\./g, ''))
        // var advamount = document.getElementById('advamount').value
        // if (advamount <= 0)
        //     this.props.onShowMessageBox(1, this.props.language.loanrefund.warning.notblank)
        // else
        // if (advavailable < advamount)
        //     this.props.onShowMessageBox(1, this.props.language.loanrefund.warning.overlimit)
        // else
        //     this.setState({
        //         isShow2: true
        //     })
    }


    /// 1//
    onLoanRefundStatusColChange(e) {
        const id = e.target.id
        console.log(this.state.loanRefundStatusCol)
        this.setState({
            loanRefundStatusCol: this.state.loanRefundStatusCol.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }

    onNextPage1() {
            this.state.loanRefundStatusPageIndex = parseInt(this.state.loanRefundStatusPageIndex) + 1
            this.loanRefundDataParams['start'] = (this.state.loanRefundStatusPageIndex - 1) * this.loanRefundDataParams['limit']
            this.loanRefundDataParams['key'] = (new Date()).getTime()
            this.loanRefundDataParams['page'] = this.state.loanRefundStatusPageIndex
            this.props.getLoanRefundData(this.loanRefundDataParams)
    }

    onPrevPage1() {
            this.state.loanRefundStatusPageIndex = parseInt(this.state.loanRefundStatusPageIndex) - 1
            this.loanRefundDataParams['start'] = (this.state.loanRefundStatusPageIndex - 1) * this.loanRefundDataParams['limit']
            this.loanRefundDataParams['key'] = (new Date()).getTime()
            this.loanRefundDataParams['page'] = this.state.loanRefundStatusPageIndex
            this.props.getLoanRefundData(this.loanRefundDataParams)
    }

    onReloadPage1() {
        this.loanRefundDataParams['key'] = (new Date()).getTime()
        this.props.getLoanRefundData(this.loanRefundDataParams)
    }

    onPageChange1(pageIndex) {
            this.state.loanRefundStatusPageIndex = parseInt(pageIndex)
            this.loanRefundDataParams['start'] = (this.state.loanRefundStatusPageIndex - 1) * this.loanRefundDataParams['limit']
            this.loanRefundDataParams['key'] = (new Date()).getTime()
            this.loanRefundDataParams['page'] = this.state.loanRefundStatusPageIndex
            this.props.getLoanRefundData(this.loanRefundDataParams)
    }

    onLoanRefundHistoryColChange(e) {
        const id = e.target.id
        let columns = this.state.loanRefundHistoryCol.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        this.setState({
            loanRefundHistoryCol: columns
        });
    }

    onNextPage2() {
        this.state.loanRefundHistoryPageIndex = parseInt(this.state.loanRefundHistoryPageIndex) + 1
        this.loanRefundHistoryParams['start'] = (this.state.loanRefundHistoryPageIndex - 1) * this.loanRefundHistoryParams['limit']
        this.loanRefundHistoryParams['key'] = (new Date()).getTime()
        this.loanRefundHistoryParams['page'] = this.state.loanRefundHistoryPageIndex
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }

    onPrevPage2() {
        this.state.loanRefundHistoryPageIndex = parseInt(this.state.loanRefundHistoryPageIndex) - 1
        this.loanRefundHistoryParams['start'] = (this.state.loanRefundHistoryPageIndex - 1) * this.loanRefundHistoryParams['limit']
        this.loanRefundHistoryParams['key'] = (new Date()).getTime()
        this.loanRefundHistoryParams['page'] = this.state.loanRefundHistoryPageIndex
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }

    onReloadPage2() {
        this.loanRefundHistoryParams['key'] = (new Date()).getTime()
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }

    onPageChange2(pageIndex) {
        this.state.loanRefundHistoryPageIndex = parseInt(pageIndex)
        this.loanRefundHistoryParams['start'] = (this.state.loanRefundHistoryPageIndex - 1) * this.loanRefundHistoryParams['limit']
        this.loanRefundHistoryParams['key'] = (new Date()).getTime()
        this.loanRefundHistoryParams['page'] = this.state.loanRefundHistoryPageIndex
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }

    beforeSubmitLoanRefund(e){
        e.preventDefault()
        this.doValidateLoanRefund()
    }

    beforeSubmitAdvance(e){
        e.preventDefault()
        this.doValidateAdvance()
    }

    doValidateLoanRefund(){
        var advPayment = this.txtRefundAmt.value
        var advAvailable = this.txtCashAvailable.value
        var language = this.props.language

        this.props.beforeSubmitLoanRefund({
            refundAmt: advPayment,
            cashAvailable: advAvailable,
            language: language

        })
    }

    doValidateAdvance(){
        var advPayment = this.txtAdvancePaymentr.value
        var advAvailable = this.txtAdvanceAvailabler.value
        var language = this.props.language

        this.props.beforeSubmitAdvance({
            advPayment: advPayment,
            advAvailable: advAvailable,
            language: language

        })
    
    }


    caculateFee(e){

        var advPayment = this.txtAdvancePaymentr.value
        var advCfgInfor = this.props.localAdvanceCreation.mvAdvanceBean
        if(advPayment < 0){
            this.txtAdvanceFeer.value = '0'
        }
        else{
            if(advCfgInfor && advPayment > 0){
                
                var tempFee = 0;
                
                var advAmt = Utils.devideByCurrencyUnit(advPayment)
                
                var nt2Adv = parseFloat(advCfgInfor.t2AdvAvailable)
                var cont = true
                if(nt2Adv > 0){
                    if(advAmt > nt2Adv){
                        tempFee += parseFloat(nt2Adv)*parseFloat(advCfgInfor.t2Days)*parseFloat(advCfgInfor.interestRate)/100
                        advAmt = advAmt - nt2Adv
                    }else {
                        tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t2Days)*parseFloat(advCfgInfor.interestRate)/100
                        cont = false
                    }
                } 
                
                var nt1Adv = parseFloat(advCfgInfor.t1AdvAvailable)
                if(cont && nt1Adv > 0){
                    if(advAmt > nt1Adv){
                        tempFee += parseFloat(nt1Adv)*parseFloat(advCfgInfor.t1Days)*parseFloat(advCfgInfor.interestRate)/100
                        advAmt = advAmt - nt1Adv
                    }else {
                        tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t1Days)*parseFloat(advCfgInfor.interestRate)/100
                        cont = false
                    }
                }
                
                var nt0Adv = parseFloat(advCfgInfor.t0AdvAvailable)
                if(cont && nt0Adv > 0){
                    if(advAmt > nt0Adv){
                        tempFee += parseFloat(nt0Adv)*parseFloat(advCfgInfor.t0Days)*parseFloat(advCfgInfor.interestRate)/100
                        advAmt = advAmt - nt0Adv
                    }else {
                        tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t0Days)*parseFloat(advCfgInfor.interestRate)/100
                        cont = false
                    }
                }   
                                 
                this.txtAdvanceFeer.value = Utils.currencyShowFormatter(tempFee, ",", 'vi-VN')
            }
        }   
        
                
    }

    onLoanRefundHistorySearch(param) {
        console.log(param)
        this.loanRefundHistoryParams['mvStartDate'] = param['mvStartDate']
        this.loanRefundHistoryParams['mvEndDate'] = param['mvEndDate']
        this.loanRefundHistoryParams['key'] = (new Date()).getTime()
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }


}
const mapStateToProps = (state) => {
    return {
        localLoanRefundCreation: state.loanrefund.localLoanRefundCreation,
        localAdvanceCreation: state.loanrefund.localAdvanceCreation,
        loanRefundData: state.loanrefund.loanRefundData,
        loanRefundHistory: state.loanrefund.loanRefundHistory
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getLocalRefundCreation: (params) => {
        dispatch(actions.getLocalRefundCreation(params))
    },
    getLocalAdvanceCreation: (params) => {
        dispatch(actions.getLocalAdvanceCreation(params))
    },
    getLoanRefundData: (params) => {
        dispatch(actions.getLoanRefundData(params))
    },
    getLoanRefundHistory: (params) => {
        dispatch(actions.getLoanRefundHistory(params))
    },
    beforeSubmitLoanRefund: (params) => {
        dispatch(actions.beforeSubmitLoanRefund(params))
    },
    beforeSubmitAdvance: (params) => {
        dispatch(actions.beforeSubmitAdvance(params))
    },
    showMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(LoanRefund)