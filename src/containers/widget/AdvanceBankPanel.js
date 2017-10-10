import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'
import config from '../../core/config'

class AdBankPanel extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceBankPanel'
        this.lang = config.cache.lang




        this.queryBankInfoParams = {
            key: (new Date()).getTime()
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
    }


    render() {
        var queryBankInfo = this.props.queryBankInfo
        var calculateInterestAmt = this.props.calculateInterestAmt
        return (
            <div>
                <Title theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>

                    <Form onSubmit={this.handleSubmit.bind(this)} id={this.id}  className="widget-form">
                        <FormGroup>
                            <Table theme={this.props.theme} responsive>
                                <tbody >
                                     <tr>
                                        <th>{this.props.language.cashadvancebank.header.bankaccount}</th>
                                        <td>
                                            <select id="mvBank" style={{width: '100%'}} 
                                                onChange={this.getAdvanceOrderData.bind(this)}>
                                                {
                                                    queryBankInfo.mvBankInfoList.map(bank => {
                                                        return (
                                                            <option value={bank.mvBankID}>
                                                                {bank.mvSettlementAccountDisplayName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="advanceAvailable"
                                                ref={e => this.txtAdvanceAvailable = e}
                                                readOnly/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="advanceAvailable"
                                                ref={e => this.txtAdvanceFee = e}
                                                value={Utils.toTTLCurrencyFormat(calculateInterestAmt.mvInterestAmt)}
                                                readOnly/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td>
                                            <FormGroup>
                                                <input type="number" 
                                                    name="volume" 
                                                    min="0" 
                                                    onBlur={this.doCalculateInterest.bind(this)}  
                                                    id="advancePayment"
                                                    ref={e => this.txtAdvancePayment = e}
                                                    required />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="button" className="hks-btn btn-cancel" 
                                        onClick={e => this.handleResetForm(this.props.paymentSelected)}>
                                        {this.props.language.button.cancel}
                                    </button>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit" 
                                        onClick={this.handleSubmit.bind(this)}>
                                        {this.props.language.button.submit}
                                    </button>
                                </span>
                            </div>
                        </FormGroup>
                    </Form>
                    
                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.getqueryBankInfo(this.queryBankInfoParams)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.queryBankInfo.mvBankInfoList.length > 0){
            var params = {
                'mvBankID' : nextProps.queryBankInfo.mvBankInfoList[0].mvBankID,
                'mvSettlement' : "3T"
            }
            this.props.getqueryAdvancePaymentInfo(params)
        }

        if(nextProps.paymentSelected){
            this.calculateWhenPaymentSelectedChange(nextProps.paymentSelected)
        }
    }

    componentWillUnmount(){
        this.props.paymentSelectionChange([])
    }

    calculateWhenPaymentSelectedChange(list){
        if(list.length > 0){
            this.MatchOrderBankListData.cTovalValue = 0;
            this.MatchOrderBankListData.cOrderIDArray = new Array()
            this.MatchOrderBankListData.cContractIDArray = new Array()

            for (var i = 0; i < list.length; i++) {
                this.MatchOrderBankListData.cOrderIDArray[i] = list[i].mvOrderID
                this.MatchOrderBankListData.cContractIDArray[i] = list[i].mvContractID
                this.MatchOrderBankListData.cTovalValue += parseFloat(list[i].mvAvailableAmount)
                this.MatchOrderBankListData.cTPLUSXHF = list[i].mvSettleDay
            }

            
            this.txtAdvanceAvailable.value = Utils.currencyShowFormatter(this.MatchOrderBankListData.cTovalValue, ",", this.lang)

        } else {
            this.handleResetForm(list)
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        let advPayment = this.txtAdvancePayment.value
        this.MatchOrderBankListData['advAmt'] = advPayment
        this.props.beforeSubmitCashAdvBank({
            advPayment: advPayment,
            language: this.props.language,
            data: this.MatchOrderBankListData
        })
    }

    handleResetForm(paymentSelected){
        if(paymentSelected.length <= 0){
            // do not reset txt Advance Available if some row selected
            this.txtAdvanceAvailable.value = '0'

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
        }
        this.txtAdvanceFee.value = "0"
        this.txtAdvancePayment.value = ''
        

        
    }

    doCalculateInterest(e) {
        e.preventDefault();
        if(this.MatchOrderBankListData.cTPLUSXHF){
            this.txtAdvanceFee.value = "0"
            this.props.calculateInterest({
                advPayment: this.txtAdvancePayment.value,
                cTPLUSXHF: this.MatchOrderBankListData.cTPLUSXHF,
                language: this.props.language
            })
        }
            
    }

    getAdvanceOrderData(e){
        // get data and fill out to table 1
        var bank = e.target.value

        if(bank){
            var stleDay = "3T"
            var params = {
                'mvBankID' : bank,
                'mvSettlement' : stleDay
            }

            this.props.getqueryAdvancePaymentInfo(params)
        }
        
    }

}
const mapStateToProps = (state) => {
    return {
        queryBankInfo: state.cashadvancebank.queryBankInfo,
        calculateInterestAmt: state.cashadvancebank.calculateInterestAmt,
        //queryAdvancePaymentInfo: state.cashadvancebank.queryAdvancePaymentInfo,

        paymentSelected: state.cashadvancebank.paymentSelected,
        reloadTmp: state.cashadvancebank.key,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getqueryAdvancePaymentInfo: (params) => {
        dispatch(actions.getqueryAdvancePaymentInfo(params))
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
    paymentSelectionChange: (list) => {
        dispatch(actions.paymentSelectionChange(list))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdBankPanel)
