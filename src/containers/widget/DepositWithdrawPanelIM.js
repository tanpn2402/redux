import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SelectControl from '../commons/Select'
import { PowerSelect } from 'react-power-select'
import * as utils from "../../utils"

class DepositWithdrawIMPanel extends Component {
    constructor(props) {
        super(props)

        this.id = 'depositwithdraw'

        this.state = {
            hasFSAccount: false,
            depositable: 0,
            withdrawable: 0,

            type: "D",
            firmBankAcc: {
                accountCode: "VSDVDSCXX.R",
                bankid: "VTB"
            },
            firmBankAccList: [
                {
                    accountCode: "VSDVDSCXX.R",
                    bankid: "VTB"
                }
            ]
        }

        this.checkIfHasFSAccount = this.checkIfHasFSAccount.bind(this)
        
    }


    changeType(id) {
        this.setState({
            type: id
        })
    }

    getDepositable(props) {
        console.log(props)
        let data = 0
        try {
            data = props[0]["accountSummary"]["depositable"]
            // this.setState({
            //     depositable: data
            // })
        }
        catch(e) {
            data = 0
        }
        
        return data
    }
    getWithdrawable(props) {
        console.log(props)

        let data = 0
        try {
            data = props[0]["exchangeAssets"]["cashWithdrawable"]
            // this.setState({
            //     withdrawable: data
            // })
        }
        catch(e) {
            data = 0
        }

        return data
    }

    componentWillMount() {
        let {currentTrdAccount} = this.props
        this.checkIfHasFSAccount(currentTrdAccount)
    }

    componentWillReceiveProps(nextProps) {
        // filter DERIVATES account
        let {tradingAccounts} = nextProps
        this.checkIfHasFSAccount(tradingAccounts)
    }

    checkIfHasFSAccount(currentTrdAccount) {

        if(this.state.hasFSAccount == false && currentTrdAccount.investorType == "DERIVATIVES") {
            this.setState({
                hasFSAccount: true
            })

            this.props.cashBalanceEnquiry({
                tradingAccSeq : parseInt(currentTrdAccount.accountSeq),
                subAccountID : currentTrdAccount.subAccountID
            })
        }
    }

    handleFirmBankChange(opt) {
        this.setState({
            firmBankAcc: opt
        })
    }

    render() {
        let {accountBalanceInfoFS, language, theme} = this.props
        let rowOdd = theme.table.rowOdd.backgroundColor
        let rowEven = theme.table.rowEven.backgroundColor
        let font2 = theme.font.sub1.color
        let background = theme.form.background
        let formStyle = theme.form

        let header = language.deposit.header

        
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={language} theme={theme} widgetID= 'depositwithdraw' >
                    {language.menu[this.id]}
                </Title>
                <Body theme={theme}  style={background}>
                    <Form onSubmit={this.submit.bind(this)} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody >

                                    <tr style={{height: "30px", color: font2}} >
                                        <th>{header.type}</th>
                                        <td>
                                            <Radio
                                                inline
                                                defaultChecked={true}
                                                name="radioGroup"
                                                onClick={e => this.changeType("D")}>
                                                <div className="Radiobox">{header.deposit}</div>
                                            </Radio>
                                            <Radio
                                                name="radioGroup"
                                                inline
                                                onClick={e => this.changeType("W")}>
                                                <div className="Radiobox">{header.withdraw}</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    
                                    
                                    <tr style={{  color: font2 }}>
                                        <th>{header.depositable}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="depositable"
                                                ref={e => this.depositable = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{  color: font2 }}>
                                        <th>{header.withdrawable}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="withdrawable"
                                                ref={e => this.withdrawable = e}
                                                readOnly />
                                        </td>
                                    </tr>

                                     <tr  style={{  color: font2 }}>
                                        <th style={{ color: font2 }}>{header.firmbankaccount}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="withdrawable"
                                                ref={e => this.firmbankaccount = e}
                                                defaultValue={this.state.firmBankAcc.bankid + " - (" + this.state.firmBankAcc.accountCode + ")"}
                                                readOnly />
                                        </td>
                                    </tr>
                                 
                                    <tr>
                                        <th style={{ color: font2 }}>{header.amount}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input border"
                                                type="number"
                                                ref={e => this.txtAmount = e}
                                                style={{textAlign:'right'}}
                                                required />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <th style={{ color: font2 }}>{header.remark}</th>
                                        <td>
                                            <textarea ref={e => this.txtRemark = e} className="hks-input border"
                                                rows="3" cols="26"></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="button" className="hks-btn btn-cancel"
                                        onClick={this.handleResetForm.bind(this)} style={formStyle.button.clear} >
                                        {language.button.cancel}
                                    </button>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit"
                                        onClick={this.submit.bind(this)} style={formStyle.button.submit} >
                                        {language.button.submit}
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
        
        let {accountBalanceInfoFS} = this.props
        let depositable = this.getDepositable(accountBalanceInfoFS)
        let withdrawable = this.getWithdrawable(accountBalanceInfoFS)

        this.depositable.value = utils.currencyShowFormatter(depositable)
        this.withdrawable.value = utils.currencyShowFormatter(withdrawable)
        this.txtAmount.focus()
        console.log(depositable, withdrawable)
        
    }

    componentDidUpdate() {
        let {accountBalanceInfoFS} = this.props
        let depositable = this.getDepositable(accountBalanceInfoFS)
        let withdrawable = this.getWithdrawable(accountBalanceInfoFS)

        this.depositable.value = utils.currencyShowFormatter(depositable)
        this.withdrawable.value = utils.currencyShowFormatter(withdrawable)
        this.txtAmount.focus()
    }

    handleResetForm(e) {
       
        this.txtAmount.value = ''
        this.txtRemark.value = ''
    }

    submit(e) {
        e.preventDefault()
        let {currentTrdAccount, language} = this.props
        let {type, firmBankAcc} = this.state

        let amt = 0
        try {
            amt = parseInt(this.txtAmount.value)
        } catch(ex) {
            amt = 0
        }
            if(amt == 0 || isNaN(amt)) {
                this.props.showMsg(language.messagebox.title.error, language.messagebox.message.wrongAmount)
            } else {
                if(currentTrdAccount.investorType == "DERIVATIVES") {
                    this.props.submitCPCashDWFS({
                        amount : amt,
                        remarks : this.txtRemark.value,
                        DW: type,
                        tradingAccSeq : parseInt(currentTrdAccount.tradingAccSeq),
                        subAccountID : currentTrdAccount.subAccountID,
                        bankid: firmBankAcc.bankid,
                        accountCode: firmBankAcc.accountCode,
                        CounterPartyAC: "005C0055558"
                    })
                }
            }
        
    }
    

}
const mapStateToProps = (state) => {
    return {
        accountBalanceInfoFS: state.portfolio.accountBalanceInfoFS,
        currentTrdAccount: state.dologin.currentTrdAccount
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    cashBalanceEnquiry: (params) => {dispatch( actions.cashBalanceEnquiry(params) )},
    submitCPCashDWFS: (params) => {dispatch( actions.submitCPCashDWFS(params) )},
    showMsg: (title, mes) => {dispatch(actions.showMessageBox(title, mes))}
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithdrawIMPanel)
