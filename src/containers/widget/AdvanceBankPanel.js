import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as Utils from '../../utils'
import config from '../../core/config'
import * as api from '../../api/web_service_api'
import * as ACTION from '../../api/action_name'
import Select from '../commons/Select'

class AdBankPanel extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceBankPanel'
        this.lang = config.cache.lang
        this.state = {
            mvSettlementAccount: ''
        }
    }


    render() {
        var queryBankInfo = this.props.bankInfo
        if (queryBankInfo.mvBankInfoList.length > 0) {
            this.state.mvSettlementAccount = {
                mvSettlementAccountDisplayName: queryBankInfo.mvBankInfoList[0].mvSettlementAccountDisplayName
            }
        }
        var calculateInterestAmt = this.props.calculateInterestAmt
        let rowOdd = this.props.theme.table.rowOdd.backgroundColor
        let rowEven = this.props.theme.table.rowEven.backgroundColor
        let font2 = this.props.theme.font.sub1.color

        let formStyle = this.props.theme.form
        return (
            <div>
                <Title language={this.props.language} theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Form onSubmit={this.handleSubmit.bind(this)} id={this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody >
                                    <tr style={{  color: font2 }}>
                                        <th>{this.props.language.cashadvancebank.header.bankaccount}</th>
                                        <td>
                                            <Select
                                                options={queryBankInfo.mvBankInfoList}
                                                selected={this.state.mvSettlementAccount}
                                                onChange={this.getAdvanceOrderData.bind(this)}
                                                optionLabelPath={'mvSettlementAccountDisplayName'}
                                                showClear={false}
                                                searchEnabled={false}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{  color: font2 }}>
                                        <th>{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="advanceAvailable"
                                                value={Utils.currencyShowFormatter(this.props.data.cTovalValue, ",", this.lang)}
                                                ref={e => this.txtAdvanceAvailable = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{  color: font2 }}>
                                        <th>{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="advanceAvailable"
                                                ref={e => this.txtAdvanceFee = e}
                                                value="0"
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{  color: font2 }}>
                                        <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td style={{ color: 'black' }}>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input border"
                                                type="number" name="volume" min="0"
                                                disabled={this.props.data.cTovalValue == '0'}
                                                onBlur={e => this.doCalculateInterest()}
                                                id="advancePayment"
                                                ref={e => this.txtAdvancePayment = e}
                                                required />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="button" className="hks-btn btn-cancel"
                                        onClick={e => this.handleResetForm(this.props.paymentSelected)} style={formStyle.button.clear} >
                                        {this.props.language.button.cancel}
                                    </button>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit"
                                        onClick={this.handleSubmit.bind(this)} style={formStyle.button.submit} >
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

    componentDidUpdate() {
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

    handleResetForm(paymentSelected) {
        this.txtAdvanceFee.value = "0"
        this.txtAdvancePayment.value = ''
    }

    doCalculateInterest() {
        if (this.props.data.cTPLUSXHF) {
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
                    function (response) { // success handler
                        if (response != null) {
                            me.txtAdvanceFee.value = Utils.toTTLCurrencyFormat(response.mvInterestAmt)
                        }
                    })
            }
        }

    }

    getAdvanceOrderData = ({ option }) => {
        if (option) {
            this.setState({ mvSettlementAccount: option })
            var bank = option.mvBankID
            if (bank) {
                this.props.getAdvanceOrderData(bank)
            }
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
