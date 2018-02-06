import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as Utils from '../../utils'
import config from '../../core/config'

class AdvancePanel extends Component {
    constructor(props) {
        super(props)
        this.id = "advancePanel"
        this.lang = config.cache.lang

        this.getLocalAdvanceCreationParam = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT',
        }

        this.state = {
            advancePayment: 0,
            advanceFee: 0,
        }
    }

    render() {
        var localAdvance = this.props.localAdCreation.mvAdvanceBean
        let advAvailable = Utils.numUnFormat(localAdvance.advAvailable) - Utils.numUnFormat(localAdvance.advPending)
        let rowOdd = this.props.theme.table.rowOdd.backgroundColor
        let rowEven = this.props.theme.table.rowEven.backgroundColor
        let font2 = this.props.theme.font.sub1.color
        let background = this.props.theme.form.background
        let formStyle = this.props.theme.form
        return (
            <div>
                <Title language={this.props.language} theme={this.props.theme} widgetID={this.id}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}  style={background}>
                    <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table theme={this.props.theme} responsive>
                                <tbody >
                                    <tr style={{ color: font2 }} >
                                        <th>{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="advanceFee"
                                                ref={e => this.txtAdFee = e}
                                                value={Utils.currencyShowFormatter(advAvailable, ",", this.lang)}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{ color: font2 }} >
                                        <th>{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="advanceFee"
                                                ref={e => this.txtAdFee = e}
                                                value={Utils.currencyShowFormatter(localAdvance.advFee, ",", this.lang)}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{ color: font2 }} >
                                        <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td style={{ color: 'black' }}>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input border"
                                                type="number" name="volume" min="0"
                                                onChange={this.onAdvancePaymentChange.bind(this)}
                                                ref={e => this.txtAdAmount = e}
                                                id="txtAdvancePayment" required />
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="reset" className="hks-btn btn-cancel"
                                        onClick={e => this.handleResetForm()} style={formStyle.button.clear} >
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

    componentDidMount() {
        this.props.getLocalAdvanceCreation(this.querySoldOrdersParams)
        this.txtAdAmount.focus()
    }

    handleSubmit(e) {
        e.preventDefault()
        let advPayment = document.getElementById('txtAdvancePayment').value
        this.props.beforeSubmit(advPayment, this.props.localAdCreation.mvAdvanceBean, this.props.language)
    }

    handleResetForm() {

    }

    onAdvancePaymentChange(e) {
        e.preventDefault();
        let advPayment = e.target.value
        let advCfgInfor = this.props.localAdCreation.mvAdvanceBean

        if (advCfgInfor && advPayment > 0) {

            var tempFee = 0;

            var advAmt = Utils.devideByCurrencyUnit(advPayment)

            var nt2Adv = parseFloat(advCfgInfor.t2AdvAvailable)
            var cont = true;
            if (nt2Adv > 0) {
                if (advAmt > nt2Adv) {
                    tempFee += parseFloat(nt2Adv) * parseFloat(advCfgInfor.t2Days) * parseFloat(advCfgInfor.interestRate) / 100;
                    advAmt = advAmt - nt2Adv;
                } else {
                    tempFee += parseFloat(advAmt) * parseFloat(advCfgInfor.t2Days) * parseFloat(advCfgInfor.interestRate) / 100;
                    cont = false;
                }
            }

            var nt1Adv = parseFloat(advCfgInfor.t1AdvAvailable);
            if (cont && nt1Adv > 0) {
                if (advAmt > nt1Adv) {
                    tempFee += parseFloat(nt1Adv) * parseFloat(advCfgInfor.t1Days) * parseFloat(advCfgInfor.interestRate) / 100;
                    advAmt = advAmt - nt1Adv;
                } else {
                    tempFee += parseFloat(advAmt) * parseFloat(advCfgInfor.t1Days) * parseFloat(advCfgInfor.interestRate) / 100;
                    cont = false;
                }
            }

            var nt0Adv = parseFloat(advCfgInfor.t0AdvAvailable);
            if (cont && nt0Adv > 0) {
                if (advAmt > nt0Adv) {
                    tempFee += parseFloat(nt0Adv) * parseFloat(advCfgInfor.t0Days) * parseFloat(advCfgInfor.interestRate) / 100;
                    advAmt = advAmt - nt0Adv;
                } else {
                    tempFee += parseFloat(advAmt) * parseFloat(advCfgInfor.t0Days) * parseFloat(advCfgInfor.interestRate) / 100;
                    cont = false;
                }
            }
            this.txtAdFee.value = Utils.currencyShowFormatter(tempFee, ",", this.lang)
        }
    }

}
const mapStateToProps = (state) => {
    return {
        localAdCreation: state.loanrefund.localAdvanceCreation,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getLocalAdvanceCreation: (params) => {
        // this action in loanrefund.js
        dispatch(actions.getLocalAdvanceCreation(params))
    },
    beforeSubmit: (advPayment, mvAdvanceBean, language) => {
        dispatch(actions.beforeSubmitCashAdvance(advPayment, mvAdvanceBean, language))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancePanel)
