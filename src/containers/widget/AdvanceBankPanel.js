import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'

class AdBankPanel extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceBankPanel'




        this.queryBankInfoParams = {
            key: (new Date()).getTime()
        }
    }


    render() {
        var queryBankInfo = this.props.queryBankInfo
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
                                            <select id="mvBank" onChange={this.getAdvanceOrderData.bind(this)}>
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
                                        <td id="txtAdvanceAvailable">4.600.630</td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                            {Utils.toTTLCurrencyFormat(calculateInterestAmt.mvInterestAmt)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td>
                                            <FormGroup controlID="volume">
                                                <input type="number" name="volume" min="0" onBlur={this.doCalculateInterest.bind(this)}  
                                                    id="txtAdvancePayment" required />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit" onClick={this.handleSubmit.bind(this)}>
                                        Submit
                                    </button>
                                    <button className="btn btn-default" type="reset" className="hks-btn btn-cancel">
                                        Cancel
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
        calculateInterestAmt: state.cashadvancebank.calculateInterestAmt
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
})

export default connect(mapStateToProps, mapDispatchToProps)(AdBankPanel)
