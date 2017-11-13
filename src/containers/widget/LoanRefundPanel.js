import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'
import config from '../../core/config'

class LoanTrans extends Component {
    constructor(props) {
        super(props)
        this.id = "loanRefundPanel"
        this.lang = config.cache.lang



        this.localLoanRefundCreationParams = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'LOANREFUND'
        }
    }


    render() {
        var localLoanRefundCreation = this.props.localLoanRefundCreation
        let font2 = this.props.theme.font.sub1.color
		let tableFooter = this.props.theme.table.tableFooter
		let rowOdd = this.props.theme.table.rowOdd.backgroundColor
		let rowEven = this.props.theme.table.rowEven.backgroundColor
        return (
            <div>
                <Title language={this.props.language} theme={this.props.theme} widgetID={this.id}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Form onSubmit={this.beforeSubmitLoanRefund.bind(this)} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody>
                                    <tr style={{backgroundColor: rowOdd, color: font2}}>
                                        <th>{this.props.language.loanrefund.form.beginningloan}</th>
                                        <td >
                                            <input
                                                className="hks-input read-only" 
                                                id="txtBeginLoan"
                                                readOnly
                                                ref={el => this.txtBeginLoan = el}
                                                value=  {Utils.currencyShowFormatter(localLoanRefundCreation.mvLoanBean.loan, ",", this.lang)}
                                            />
                                            
                                        </td>
                                    </tr>
                                    <tr style={{backgroundColor: rowEven, color: font2}}>
                                        <th>{this.props.language.loanrefund.form.availablecashforrefund}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only" 
                                                id="txtCashAvailable"
                                                readOnly
                                                ref={el => this.txtCashAvailable = el}
                                                value=  {
                                                            localLoanRefundCreation.mvLoanBean.cashrsv < 0 ? 0 : 
                                                            Utils.currencyShowFormatter(localLoanRefundCreation.mvLoanBean.cashrsv, ",", this.lang)
                                                        }
                                            />
                                                        
                                        </td>
                                    </tr>
                                    <tr style={{backgroundColor: rowOdd, color: font2}}>
                                        <th>{this.props.language.loanrefund.form.cashadvanceable}</th>
                                        <td >
                                            <input
                                                className="hks-input read-only" 
                                                id="txtAdvanceAvailable"
                                                readOnly
                                                ref={el => this.txtAdvanceAvailable = el}
                                                value=  {Utils.currencyShowFormatter(localLoanRefundCreation.mvLoanBean.advAvailable, ",", this.lang)}
                                            />
                                            
                                        </td>
                                    </tr>
                                    <tr style={{backgroundColor: rowEven, color: font2}}>
                                        <th>{this.props.language.loanrefund.form.loanrefundamount}</th>
                                        <td style={{color: 'black'}}>
                                            <input 
                                                className="hks-input border" 
                                                id="txtRefundAmt" 
                                                required type="number" min="0" step="any" 
                                                ref={el => this.txtRefundAmt = el} />
                                        </td>
                                    </tr>
                                    <tr style={{backgroundColor: rowOdd, color: font2}}>
                                        <th>{this.props.language.loanrefund.form.remark}</th>
                                        <td style={{color: 'black'}}>
                                            <input 
                                                className="hks-input border" 
                                                id="txtRemark" autoComplete='off'
                                                ref={el => this.txtRemark = el} />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="reset" className="hks-btn btn-cancel"
                                        onClick={e => this.handleResetLoanRefundForm()}>
                                        {this.props.language.button.cancel}
                                    </button>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit" >
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
        this.props.getLocalRefundCreation(this.localLoanRefundCreationParams)
    }

    // submit loan refund
    beforeSubmitLoanRefund(e){
        e.preventDefault()
        this.doValidateLoanRefund()
    }

    doValidateLoanRefund(){
        var advPayment = this.txtRefundAmt.value
        var advAvailable = this.txtCashAvailable.value
        var language = this.props.language

        this.props.beforeSubmitLoanRefund({
            refundAmt: advPayment,
            cashAvailable: advAvailable,
            language: language,
            me: this

        })
    }

    handleResetLoanRefundForm(){
        
    }

}
const mapStateToProps = (state) => {
    return {
        localLoanRefundCreation: state.loanrefund.localLoanRefundCreation,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getLocalRefundCreation: (params) => {
        dispatch(actions.getLocalRefundCreation(params))
    },
    beforeSubmitLoanRefund: (params) => {
        dispatch(actions.beforeSubmitLoanRefund(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(LoanTrans)
