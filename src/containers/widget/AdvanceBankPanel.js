import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'
import config from '../../core/config'
import * as api from '../../api/web_service_api'
import * as ACTION from '../../api/action_name'

class AdBankPanel extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceBankPanel'
        this.lang = config.cache.lang
    }


    render() {
        var queryBankInfo = this.props.bankInfo
        var calculateInterestAmt = this.props.calculateInterestAmt
        return (
            <div>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>

                    <Form onSubmit={this.handleSubmit.bind(this)} id={this.id}  className="widget-form">
                        <FormGroup>
                            <Table responsive>
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
                                                value={Utils.currencyShowFormatter(this.props.data.cTovalValue, ",", this.lang)}
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
                                                value="0"
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
                                                    disabled={this.props.data.cTovalValue == '0'}
                                                    onBlur={e => this.doCalculateInterest()}  
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

    componentDidUpdate(){
        this.txtAdvancePayment.value = this.props.data.cTovalValue * 1000
        this.doCalculateInterest()
    }

    handleSubmit(e) {
        e.preventDefault()
        let advPayment = this.txtAdvancePayment.value
        var data = this.props.data
        data['advAmt'] = advPayment
        this.props.beforeSubmitCashAdvBank({
            advPayment: advPayment,
            language: this.props.language,
            data: data
        })
    }

    handleResetForm(paymentSelected){
        this.txtAdvanceFee.value = "0"
        this.txtAdvancePayment.value = '' 
    }

    doCalculateInterest() {
        if(this.props.data.cTPLUSXHF){
            this.txtAdvanceFee.value = "0"

            var advPayment = this.txtAdvancePayment.value
            var soldT = this.props.data.cTPLUSXHF
            var me = this

            if (advPayment <= 0) {
                
            } else {
                var stleDay = "3";
                if (soldT == "T0") {
                    stleDay = "3";
                } else if (soldT == "T1") {
                    stleDay = "2";
                } else if (soldT == "T2") {
                    stleDay = "1";
                }
        
                var _params = {
                    "mvSettlement": stleDay,
                    'mvAmount': advPayment
                }

                api.fetch(ACTION.CALCULATEINTERSETAMT, _params, 'POST',
                    function(response){ // success handler
                        if (response != null) {
                            me.txtAdvanceFee.value = Utils.toTTLCurrencyFormat(response.mvInterestAmt)
                        }
                    })
            }
        }
            
    }

    getAdvanceOrderData(e){
        var bank = e.target.value
        if(bank){
            this.props.getAdvanceOrderData(bank)
        }
        
    }

}
const mapStateToProps = (state) => {
    return {
        bankInfo: state.cashadvancebank.queryBankInfo,
        calculateInterestAmt: state.cashadvancebank.calculateInterestAmt
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    beforeSubmitCashAdvBank: (params) => {
        dispatch(actions.beforeSubmitCashAdvBank(params))
    },
    onShowMessageBox: (title, message) => {
        dispatch(actions.showMessageBox(title, message))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdBankPanel)
