import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'

class Entitlement extends Component {
    constructor(props) {
        super(props)

        this.paramsdynamic = {
            FirstTime: '',
            key: (new Date()).getTime(),
            mvTimelyUpdate: 'N',
            dynCashBalance: true,
        }

        this.paramsright = {
            mvActionType: '',
            mvStockId: '',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            key: (new Date()).getTime(),
            start: '0',
            limit: '15',
        }

        this.paramsaddition = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ENTITLEMENT',
            key: (new Date()).getTime(),
            start: '0',
            limit: '15',
        }

        this.paramshis = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ENTITLEMENT',
            mvStockId: '',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            key: (new Date()).getTime(),
            start: '0',
            limit: '15',
        }

        this.queryBankInfoParams = {
            key: (new Date()).getTime()
        }

        this.getEntitlementStockListParams = {
           mvLastAction:'OTHERSERVICES',
           mvChildLastAction:'ENTITLEMENT'
        }

        this.state = {
            columns: [
                {
                    id: 'stockId',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'issueType',
                    Header: this.props.language.entitlement.header.actiontype,
                    Cell: props => { return this.getRightType(this.props.language, props.original.issueType) },
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate',
                    Header: this.props.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalBonusRight',
                    Header: this.props.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'ratecash',
                    Header: this.props.language.entitlement.header.ratecash,
                    Cell: props => {
                        return this.redererToCash(props.original)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'stockRate',
                    Header: this.props.language.entitlement.header.rate,
                    accessor: 'stockRate',
                    width:100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.entitlement.header.pervalue,
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width:100,
                    skip: false,
                    show: true,
                },
                {   // SL CK
                    id: 'totalScript',
                    Header: this.props.language.entitlement.header.recievecash,
                    accessor: 'totalScript',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.totalScript, ",", this.lang)
                    },
                    width:100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalIssue',
                    Header: this.props.language.entitlement.header.receivedstock,
                    accessor: 'totalIssue',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: this.props.language.entitlement.header.status,
                    Cell: props => { return this.getRightStatus(this.props.language, props.original.status) },
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'payableDate',
                    Header: this.props.language.entitlement.header.payabledate,
                    accessor: 'payableDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'paidDate',
                    Header: this.props.language.entitlement.header.paiddate,
                    accessor: 'paidDate',
                    width: 200,
                    skip: false,
                    show: true,
            }],
            columns2: [
                {
                    id: 'stockId',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate',
                    Header: this.props.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalBonusRight',
                    Header: this.props.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 100, 
                    skip: false,
                    show: true,
                },
                {
                    id: 'rightRate',
                    Header: this.props.language.entitlement.header.rightrate,
                    accessor: 'rightRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'actionRate',
                    Header: this.props.language.entitlement.header.actionrate,
                    accessor: 'actionRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'maxQtyCanBuy',
                    Header: this.props.language.entitlement.header.availableqty,
                    accessor: 'maxQtyCanBuy',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.entitlement.header.actionprice,
                    accessor: 'price',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'startDate',
                    Header: this.props.language.entitlement.header.startdate,
                    accessor: 'startDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate1',
                    Header: this.props.language.entitlement.header.transferdeadline,
                    accessor: 'bookCloseDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transenddate',
                    Header: this.props.language.entitlement.header.registerdeadline,
                    accessor: 'transenddate',
                    width: 200,
                    skip: false,
                    show: true,
            }],

            columns3: [
                {
                    id: 'createTime',
                    Header: this.props.language.entitlement.header.registerdate,
                    accessor: 'createTime',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'tradeStockCode',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'tradeStockCode',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'resultQty',
                    Header: this.props.language.entitlement.header.volume,
                    accessor: 'resultQty',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.entitlement.header.actionprice,
                    accessor: 'price',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'appliedAmt',
                    Header: this.props.language.entitlement.header.amount,
                    accessor: 'appliedAmt',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'comfirmedDate',
                    Header: this.props.language.entitlement.header.paiddate,
                    width: 100,
                    accessor: 'comfirmedDate',
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: this.props.language.entitlement.header.status,
                    Cell: props => { return this.getEntitlementStatus(this.props.language, props.original.status) },
                    width: 200,
                    skip: false,
                    show: true,
            }],
            formValues: {},
            json: {},


            pageIndex1: 1,
            pageIndex2: 1,
            pageIndex3: 1,
        }

        this.id = 'entitlement'
        this.defaultPageSize = 15

        this.lang = 'vi-VN'

        this.actionTypeStore= [
            {text: 'ALL',        value: 'ALL'},
            {text: this.props.language.entitlement.issueType.ISSUE_1,    value: '1'},
            {text: this.props.language.entitlement.issueType.ISSUE_I,    value: 'I'},
            {text: this.props.language.entitlement.issueType.ISSUE_B,    value: 'B'},
            {text: this.props.language.entitlement.issueType.ISSUE_D,    value: 'D'},            
        ]

        this.entitlementData = null

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns: [
                {
                    id: 'stockId',
                    Header: nextProps.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'issueType',
                    Header: nextProps.language.entitlement.header.actiontype,
                    Cell: props => { return this.getRightType(nextProps.language, props.original.issueType) },
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate',
                    Header: nextProps.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalBonusRight',
                    Header: nextProps.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'ratecash',
                    Header: nextProps.language.entitlement.header.ratecash,
                    Cell: props => {
                        return this.redererToCash(props.original)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'stockRate',
                    Header: nextProps.language.entitlement.header.rate,
                    accessor: 'stockRate',
                    width:100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: nextProps.language.entitlement.header.pervalue,
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width:100,
                    skip: false,
                    show: true,
                },
                {   // SL CK
                    id: 'totalScript',
                    Header: nextProps.language.entitlement.header.recievecash,
                    accessor: 'totalScript',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.totalScript, ",", this.lang)
                    },
                    width:100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalIssue',
                    Header: nextProps.language.entitlement.header.receivedstock,
                    accessor: 'totalIssue',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: nextProps.language.entitlement.header.status,
                    Cell: props => { return this.getRightStatus(nextProps.language, props.original.status) },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'payableDate',
                    Header: nextProps.language.entitlement.header.payabledate,
                    accessor: 'payableDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'paidDate',
                    Header: nextProps.language.entitlement.header.paiddate,
                    accessor: 'paidDate',
                    width: 100,
                    skip: false,
                    show: true,
            }],
            columns2: [
                {
                    id: 'stockId',
                    Header: nextProps.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate',
                    Header: nextProps.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalBonusRight',
                    Header: nextProps.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 100, 
                    skip: false,
                    show: true,
                },
                {
                    id: 'rightRate',
                    Header: nextProps.language.entitlement.header.rightrate,
                    accessor: 'rightRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'actionRate',
                    Header: nextProps.language.entitlement.header.actionrate,
                    accessor: 'actionRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'maxQtyCanBuy',
                    Header: nextProps.language.entitlement.header.availableqty,
                    accessor: 'maxQtyCanBuy',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: nextProps.language.entitlement.header.actionprice,
                    accessor: 'price',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'startDate',
                    Header: nextProps.language.entitlement.header.startdate,
                    accessor: 'startDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate1',
                    Header: nextProps.language.entitlement.header.transferdeadline,
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transenddate',
                    Header: nextProps.language.entitlement.header.registerdeadline,
                    accessor: 'transenddate',
                    width: 100,
                    skip: false,
                    show: true,
            }],

            columns3: [
                {
                    id: 'createTime',
                    Header: nextProps.language.entitlement.header.registerdate,
                    accessor: 'createTime',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'tradeStockCode',
                    Header: nextProps.language.entitlement.header.stock,
                    accessor: 'tradeStockCode',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'resultQty',
                    Header: nextProps.language.entitlement.header.volume,
                    accessor: 'resultQty',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: nextProps.language.entitlement.header.actionprice,
                    accessor: 'price',
                    width: 70,
                    skip: false,
                    show: true,
                },
                {
                    id: 'appliedAmt',
                    Header: nextProps.language.entitlement.header.amount,
                    accessor: 'appliedAmt',
                    width: 70,
                    skip: false,
                    show: true,
                },
                {
                    id: 'comfirmedDate',
                    Header: nextProps.language.entitlement.header.paiddate,
                    width: 100,
                    accessor: 'comfirmedDate',
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: nextProps.language.entitlement.header.status,
                    Cell: props => { return this.getEntitlementStatus(nextProps.language, props.original.status) },
                    width: 120,
                    skip: false,
                    show: true,
            }]
        })
    }

    getEntitlementStatus(language, status) {
		let stt = language.entitlement.status['STATUS_' + status.toUpperCase()]
        return stt === undefined ? status.toUpperCase() : stt
	}

    getRightType(language, type) {
        let t = language.entitlement.issueType['ISSUE_' + type]
        return t === undefined ? type: t
    }
    
	getRightStatus(language, status) {
        let stt = language.entitlement.rightStatus['STATUS_' + status]
        return stt === undefined ? status: stt
    }
    
    redererToCash (original) {
        console.log(original)
		if (original.cashRate !== null && original.cashRate.length > 0) {
			var value = (original.issueRatioDelivery / original.issueRatioPer);
			return Utils.currencyShowFormatter(value, ",", this.lang);			
		}else{
            return ''
        }
    }
    
    // getExerciseStatus(language, v) {
    // 	var d = "C"
    // 	if(v == "O"){
    // 		status = "O"
    //     }
    //     return language.entitlement.exercise['STATUS_' + status.toUpperCase()]
	// }

    handleInputChange(event) {}

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    getEntitlementSubmit() {
        this.props.getEntitlementSubmit()
    }

    render() {
            var allRightList = this.props.allRightList
            var additionIssueShareInfo = this.props.additionIssueShareInfo
            var entitlementHistory = this.props.entitlementHistory
            
            var bankInfo = this.props.bankInfo
            var entitlementStockList = this.props.entitlementStockList
            
            // DANH SACH QUYEN
            let buttonAction1 = [
                <Pagination
                        pageIndex={this.state.pageIndex1}
                        totalRecord={Math.ceil(allRightList.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange1.bind(this)}
                        onNextPage={this.onNextPage1.bind(this)}
                        onPrevPage={this.onPrevPage1.bind(this)}
                        onReloadPage={this.onReloadPage1.bind(this)}
                    />,
            ]

            // THONG TIN CO PHIEU PHAT HANH THEM
            let buttonAction2 = [
                <Pagination
                        pageIndex={this.state.pageIndex2}
                        totalRecord={Math.ceil(additionIssueShareInfo.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange2.bind(this)}
                        onNextPage={this.onNextPage2.bind(this)}
                        onPrevPage={this.onPrevPage2.bind(this)}
                        onReloadPage={this.onReloadPage2.bind(this)}
                    />,
            ]

            // TRA CUU LICH SU GIAO DICH CO PHIEU PHAT HANH THEM
            let buttonAction3 = [
                <Pagination
                        pageIndex={this.state.pageIndex3}
                        totalRecord={Math.ceil(entitlementHistory.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange3.bind(this)}
                        onNextPage={this.onNextPage3.bind(this)}
                        onPrevPage={this.onPrevPage3.bind(this)}
                        onReloadPage={this.onReloadPage3.bind(this)}
                    />,
            ]

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
                    <div className="component-main entitlement">

                        <div className="entitlement-form">
                            <div className="title" style={this.props.theme.porfolio.titlestock}>
                                <span>{this.props.language.entitlement.header.entitlementplace}</span>
                            </div>
                            <Form onSubmit={this.submitEntitlement.bind(this)} id={"form-" + this.id} className={"form-" + this.id}>
                                <FormGroup>
                                    <Table responsive >
                                        <tbody >
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.bankaccount}</th>
                                                <td>
                                                    <select onChange={this.getAccountBalance.bind(this)} className="hks-select bank-account">
                                                        {
                                                            bankInfo.mvBankInfoList.map(bank => {
                                                                return (
                                                                    <option value={bank.mvSettlementAccountDisplayName}>
                                                                        {bank.mvSettlementAccountDisplayName}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.cashbalance}</th>
                                                <td>
                                                    <input
                                                        className="hks-input border-none"
                                                        id="cashBalance"
                                                        ref={e => this.cashBalance = e}
                                                        readOnly/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.cashavailable}</th>
                                                <td>
                                                    <input
                                                        className="hks-input border-none"
                                                        id="cashAvailable"
                                                        ref={e => this.cashAvailable = e}
                                                        readOnly/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.buyingpower}</th>
                                                <td>
                                                    <input
                                                        className="hks-input border-none"
                                                        id="buyingPower"
                                                        ref={e => this.buyingPower = e}
                                                        readOnly/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.stockcode}</th>
                                                <td>
                                                    <InputSearch data={entitlementStockList.stockCmbList} onChange={this.onStockChange.bind(this)}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.availableqty}</th>
                                                <td>
                                                    <input
                                                        className="hks-input border-none"
                                                        id="txtStockExistQty" 
                                                        ref={e => this.txtStockExistQty = e}
                                                        readOnly
                                                        required />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.registerqty}</th>
                                                <td>
                                                    <input
                                                        className="hks-input border"
                                                        id="txtTradeQty" 
                                                        ref={e => this.txtTradeQty = e}
                                                        type="number"
                                                        min="0"
                                                        required />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.actionprice}</th>
                                                <td>
                                                    <input
                                                        id="txtPrice" 
                                                        className="hks-input border-none"
                                                        ref={e => this.txtPrice = e}
                                                        readOnly
                                                        required />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="enterorder">{this.props.language.entitlement.header.amountVND}</th>
                                                <td>
                                                    <input
                                                        id="txtAmount" 
                                                        className="hks-input border-none"
                                                        ref={e => this.txtAmount = e}
                                                        readOnly
                                                        required />
                                                </td>
                                            </tr>
                                            <tr>
                                                <input ref={e => this.txtTradeStockCode = e} type="hidden"/>
                                                <input ref={e => this.txtBeginTransferDate = e} type="hidden"/>
                                                <input ref={e => this.txtEndTransferDate = e} type="hidden"/>
                                                <input ref={e => this.txtMaxQty = e} type="hidden"/>
                                                <input ref={e => this.txtRequestedQty = e} type="hidden"/>
                                                <input ref={e => this.txtQuantity = e} type="hidden"/>
                                                <input ref={e => this.txtRightDate = e} type="hidden"/>
                                                <input ref={e => this.txtStockRequestedQty = e} type="hidden"/>
                                                <input ref={e => this.txtTotalRights = e} type="hidden"/>
                                                <input ref={e => this.txtTotalStock = e} type="hidden"/>
                                                <input ref={e => this.txtTimePeriod = e} type="hidden"/>
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

                        <div className="entitlement-table">

                            <div key={this.id + "-xtable1"} id={this.id + "-xtable1"}>
                                <div className="table-main">
                                    <DataUpperTable
                                    key={this.id + "-table1"}
                                    id={this.id + "-table1"}
                                    language={this.props.language.entitlement.header}
                                    columns={this.state.columns}
                                    defaultPageSize={this.defaultPageSize}
                                    data={allRightList.rightList}/>
                                </div>
                                <div className="table-header">
                                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                                        <span>{this.props.language.entitlement.header.corporateactionlist}</span>
                                    </div>
                                    <SearchBar
                                    key={this.id+ '-search1'}
                                    id={this.id+ '-search1'}
                                    onSearch={this.onSearch1.bind(this)}
                                    buttonAction={buttonAction1}
                                    language={this.props.language.searchbar}
                                    theme={this.props.theme}
                                    data={{columns:this.state.columns , actionType: this.actionTypeStore, stockList: this.props.stockList}}
                                    onChangeStateColumn={this.onChangeStateColumn1.bind(this)}
                                    param={['mvActionType', 'mvStockId', 'mvStartDate', 'mvEndDate', 'dropdown']}/>
                                </div>
                            </div>

                            <div key={this.id + "-xtable3"} id={this.id + "-xtable3"}>
                            <div className="table-main">
                                <DataUpperTable
                                    key={this.id + "-table2"}
                                    id={this.id + "-table2"}
                                    language={this.props.language.entitlement.header}
                                    columns={this.state.columns2}
                                    defaultPageSize={this.defaultPageSize}
                                    data={additionIssueShareInfo.additionList}/>
                                </div>
                                <div className="table-header">
                                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                                    <span>{this.props.language.entitlement.header.additionalissuesharesinformation}</span>
                                    </div>
                                    <SearchBar
                                    key={this.id + '-search2'}
                                    id={this.id + '-search2'}
                                    buttonAction={buttonAction2}
                                    language={this.props.language.searchbar}
                                    theme={this.props.theme}
                                    data={{columns:this.state.columns2 ,stockList: this.props.stockList}}
                                    onChangeStateColumn={this.onChangeStateColumn2.bind(this)}
                                    param={['dropdown']}/>
                                </div>
                            </div>

                            <div key={this.id + "-xtable2"}  id={this.id + "-xtable2"}>
                            <div className="table-main">
                                    <DataUpperTable
                                    key={this.id + "-table3"}
                                    id={this.id + "-table3"}
                                    language={this.props.language.entitlement.header}
                                    columns={this.state.columns3}
                                    defaultPageSize={this.defaultPageSize}
                                    data={entitlementHistory.historyList}/>
                                </div>
                                <div className="table-header">
                                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                                        <span>{this.props.language.entitlement.header.additionalissuesharesbuyinghistory}</span>
                                    </div>

                                    <SearchBar
                                    key={this.id + '-search3'}
                                    id={this.id + '-search3'}
                                    onSearch={this.onSearch2.bind(this)}
                                    buttonAction={buttonAction3}
                                    language={this.props.language.searchbar}
                                    theme={this.props.theme}
                                    data={{columns:this.state.columns3 ,stockList: this.props.stockList}}
                                    onChangeStateColumn={this.onChangeStateColumn3.bind(this)}
                                    param={['mvStockId', 'mvStartDate', 'mvEndDate', 'dropdown']}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
    

    onSearch1(param){
        this.state.pageIndex1 = 1
        this.paramsright['start']= 0
        this.paramsright['page']= 1        
        this.paramsright['mvActionType']= param['mvActionType']
        this.paramsright['mvStockId'] = param['mvStockId']
        this.paramsright['mvStartDate'] = param['mvStartDate']
        this.paramsright['mvEndDate'] = param['mvEndDate']
        this.paramsright['key']= new Date().getTime()

        this.props.getRightlist(this.paramsright)
    }
  
    onSearch2(param){
        this.state.pageIndex1 = 1

        this.paramshis['start'] = 0
        this.paramshis['page'] = 1
        this.paramshis['mvStockId'] = param['mvStockId']
        this.paramshis['mvStartDate'] = param['mvStartDate']
        this.paramshis['mvEndDate'] = param['mvEndDate']
        this.paramsright['key']= new Date().getTime()

        this.props.getHistorylist(this.paramshis)
    }

    //table 1
    onChangeStateColumn1(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
      }

    onNextPage1(){
        this.state.pageIndex1 = parseInt(this.state.pageIndex1) + 1
        this.paramsright['page'] = this.state.pageIndex1
        this.paramsright['start'] = (this.state.pageIndex1 - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onPrevPage1(){
        this.state.pageIndex1 = parseInt(this.state.pageIndex1) - 1
        this.paramsright['page'] = this.state.pageIndex1
        this.paramsright['start'] = (this.state.pageIndex1 - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onReloadPage1(){
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onPageChange1(pageIndex) {
        this.state.pageIndex1 = parseInt(pageIndex)
        this.paramsright['page'] = this.state.pageIndex1
        this.paramsright['start'] = (this.state.pageIndex1 - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    //table 2
    onChangeStateColumn2(e){
        const id = e.target.id
        this.setState({
            columns2: this.state.columns2.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }

    onNextPage2(){
        this.state.pageIndex2 = parseInt(this.state.pageIndex2) + 1
        this.paramsaddition['page'] = this.state.pageIndex2
        this.paramsaddition['start'] = (this.state.pageIndex2 - 1) * this.paramsaddition['limit']
        this.paramsaddition['key'] = (new Date()).getTime()
        
        this.props.getAdditionalshareinfo(this.paramsaddition)
    }

    onPrevPage2(){
        this.state.pageIndex2 = parseInt(this.state.pageIndex2) - 1
        this.paramsaddition['page'] = this.state.pageIndex2
        this.paramsaddition['start'] = (this.state.pageIndex2 - 1) * this.paramsaddition['limit']
        this.paramsaddition['key'] = (new Date()).getTime()
        
        this.props.getAdditionalshareinfo(this.paramsaddition)
    }

    onReloadPage2(){
        this.paramsaddition['key'] = (new Date()).getTime()
        
        this.props.getAdditionalshareinfo(this.paramsaddition)
    }

    onPageChange2(pageIndex) {
        this.state.pageIndex2 = parseInt(pageIndex)
        this.paramsaddition['page'] = this.state.pageIndex2
        this.paramsaddition['start'] = (this.state.pageIndex2 - 1) * this.paramsaddition['limit']
        this.paramsaddition['key'] = (new Date()).getTime()
        
        this.props.getAdditionalshareinfo(this.paramsaddition)
    }

    // table 3
    onChangeStateColumn3(e) {
        const id = e.target.id
        this.setState({
            columns3: this.state.columns3.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }

    onNextPage3(){
        this.state.pageIndex3 = parseInt(this.state.pageIndex3) + 1
        this.paramshis['page'] = this.state.pageIndex3
        this.paramshis['start'] = (this.state.pageIndex3 - 1) * this.paramshis['limit']
        this.paramshis['key'] = (new Date()).getTime()
        
        this.props.getHistorylist(this.paramshis)
    }

    onPrevPage3(){
        this.state.pageIndex3 = parseInt(this.state.pageIndex3) - 1
        this.paramshis['page'] = this.state.pageIndex3
        this.paramshis['start'] = (this.state.pageIndex3 - 1) * this.paramshis['limit']
        this.paramshis['key'] = (new Date()).getTime()
        
        this.props.getHistorylist(this.paramshis)
    }

    onReloadPage3(){
        this.paramshis['key'] = (new Date()).getTime()
        
        this.props.getHistorylist(this.paramshis)
    }

    onPageChange3(pageIndex) {
        this.state.pageIndex3 = parseInt(pageIndex)
        this.paramshis['page'] = this.state.pageIndex3
        this.paramshis['start'] = (this.state.pageIndex3 - 1) * this.paramshis['limit']
        this.paramshis['key'] = (new Date()).getTime()
        
        this.props.getHistorylist(this.paramshis)    
    }

    componentDidMount() {
        this.props.getAdditionalshareinfo(this.paramsaddition)
        this.props.getqueryBankInfo(this.queryBankInfoParams)
        this.props.getEntitlementStockList(this.getEntitlementStockListParams)
        this.props.getRightlist(this.paramsright)
        this.props.getHistorylist(this.paramshis)
        this.props.entitlementGetAccountBalance({
            bankInfo: {
                mvBankID: "",
                mvBankACID: ""
            }
        })
    
    }

    // setValue
    setCashBalanceValue(value){
        this.cashBalance.value = value
    }

    setCashAvailableValue(value){
        this.cashAvailable.value = value
    }

    setBuyPowerValue(value){
        this.buyingPower.value = value
    }

    getAccountBalance(e){
        var bankInfo = this.props.bankInfo.mvBankInfoList.filter(el => el.mvSettlementAccountDisplayName === e.target.value)
        if(bankInfo.length > 0){
            this.props.entitlementGetAccountBalance({
                me: this,
                bankInfo: bankInfo[0]
            })
        }
    }

    onStockChange(value){
        console.log(value)
        this.cboStockCode = value
        var record = {}
        this.getEntitlementData(record)
    }

    getEntitlementData(record){
        this.props.getEntitlementData({
            me: this,
            language: this.props.language,
            record: record,
        })
    }

    submitEntitlement(e){
        e.preventDefault()
        this.props.submitEntitlement({
            me: this,
            language: this.props.language
        })
    }
}

const mapStateToProps = (state) => {
    return {
        allRightList: state.entitlement.allRightList,
        additionIssueShareInfo: state.entitlement.additionIssueShareInfo,
        entitlementHistory: state.entitlement.entitlementHistory,
        bankInfo: state.cashadvancebank.queryBankInfo,
        entitlementStockList: state.entitlement.entitlementStockList
        //dynamicdata: state.entitlement.dynamicdata,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getRightlist: (params) => {
      dispatch(actions.getRightlist(params))
    },
    getHistorylist: (params) => {
      dispatch(actions.getEntitlementHistorylist(params))
    },
    getAdditionalshareinfo: (params) => {
      dispatch(actions.getAdditionalshareinfo(params))
    },
    getqueryBankInfo: (params) => {
        dispatch(actions.getqueryBankInfo(params))
    },
    getEntitlementStockList: (params) => {
        dispatch(actions.getEntitlementStockList(params))
    },
    entitlementGetAccountBalance: (params) => {
        dispatch(actions.entitlementGetAccountBalance(params))
    },
    // getdynamicdata: (paramsdynamic) => {
    //   dispatch(actions.getDynamicdata(paramsdynamic))
    // },
    getEntitlementSubmit: (params) => {
      dispatch(actions.getDynamicdata(params))
    },
    getEntitlementData: (params) => {
      dispatch(actions.getEntitlementData(params))      
    },
    submitEntitlement: (params) => {
        dispatch(actions.submitEntitlement(params))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Entitlement);
