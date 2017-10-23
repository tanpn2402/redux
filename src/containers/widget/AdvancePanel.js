import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'
import config from '../../core/config'

class AdvancePanel extends Component {
    constructor(props) {
        super(props)
        this.id = "advancePanel"
        this.lang = config.cache.lang
        this.globalLoad = false;
        

        this.getLocalAdvanceCreationParam = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT',
        }

        this.state = {
            advancePayment: 0,
            advanceFee: 0,
        }
    }

    componentWillReceiProps(n){
        
    }

    shouldComponentUpdate (nextProps, nextState){
        // return a boolean value
        if (this.globalLoad != nextProps.load){
			this.globalLoad = nextProps.load
            if (nextProps.loadWidgetID === this.id) {
                return true
            }else {
                return false
            }
        }
        
        return true
    }

    render() {
        var localAdvance = this.props.localAdCreation.mvAdvanceBean
        let advAvailable = Utils.numUnFormat(localAdvance.advAvailable) - Utils.numUnFormat(localAdvance.advPending)
        let rowodd = this.props.theme.table == undefined? undefined:this.props.theme.table.rowodd.backgroundColor
        let roweven = this.props.theme.table == undefined? undefined:this.props.theme.table.roweven.backgroundColor
        let font2 = this.props.theme.font2 == undefined? 'black':this.props.theme.font2.color
        return (
            <div>
                <Title widgetID={this.id} theme={this.props.theme} widgetID={this.id}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table theme={this.props.theme} responsive>
                                <tbody >
                                    <tr style={{backgroundColor: rowodd, color: font2}} >
                                        <th>{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                        <td>{Utils.currencyShowFormatter(advAvailable,",", this.lang)}</td>
                                    </tr>
                                    <tr style={{backgroundColor: roweven, color: font2}} >
                                        <th>{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="advanceFee"
                                                ref={e => this.txtAdFee = e}
                                                value={Utils.currencyShowFormatter(localAdvance.advFee, ",", this.lang)}
                                                readOnly/>
                                        </td>
                                    </tr>
                                    <tr style={{backgroundColor: rowodd, color: font2}} >
                                        <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td style={{color: 'black'}}>
                                            <FormGroup>
                                                <input 
                                                    className="hks-input border"
                                                    type="number" name="volume" min="0" 
                                                    onChange={this.onAdvancePaymentChange.bind(this)}  
                                                    id="txtAdvancePayment" required />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="reset" className="hks-btn btn-cancel"
                                        onClick={e => this.handleResetForm()}>
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
        this.props.getLocalAdvanceCreation(this.querySoldOrdersParams)
    }

    handleSubmit(e) {
        e.preventDefault()
        let advPayment = document.getElementById('txtAdvancePayment').value
        this.props.beforeSubmit(advPayment, this.props.localAdCreation.mvAdvanceBean, this.props.language)
    }

    handleResetForm(){

    }

    onAdvancePaymentChange(e) {
        e.preventDefault();
        let advPayment = e.target.value
        let advCfgInfor = this.props.localAdCreation.mvAdvanceBean

        if(advCfgInfor && advPayment > 0){
            
            var tempFee = 0;
            
            var advAmt = Utils.devideByCurrencyUnit(advPayment)
            
            var nt2Adv = parseFloat(advCfgInfor.t2AdvAvailable)
            var cont = true;
            if(nt2Adv > 0){
                if(advAmt > nt2Adv){
                    tempFee += parseFloat(nt2Adv)*parseFloat(advCfgInfor.t2Days)*parseFloat(advCfgInfor.interestRate)/100;
                    advAmt = advAmt - nt2Adv;
                }else {
                    tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t2Days)*parseFloat(advCfgInfor.interestRate)/100;
                    cont = false;
                }
            } 
            
            var nt1Adv = parseFloat(advCfgInfor.t1AdvAvailable);
            if(cont && nt1Adv > 0){
                if(advAmt > nt1Adv){
                    tempFee += parseFloat(nt1Adv)*parseFloat(advCfgInfor.t1Days)*parseFloat(advCfgInfor.interestRate)/100;
                    advAmt = advAmt - nt1Adv;
                }else {
                    tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t1Days)*parseFloat(advCfgInfor.interestRate)/100;
                    cont = false;
                }
            }
            
            var nt0Adv = parseFloat(advCfgInfor.t0AdvAvailable);
            if(cont && nt0Adv > 0){
                if(advAmt > nt0Adv){
                    tempFee += parseFloat(nt0Adv)*parseFloat(advCfgInfor.t0Days)*parseFloat(advCfgInfor.interestRate)/100;
                    advAmt = advAmt - nt0Adv;
                }else {
                    tempFee += parseFloat(advAmt)*parseFloat(advCfgInfor.t0Days)*parseFloat(advCfgInfor.interestRate)/100;
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
        load: state.menuSelected.load,
        loadWidgetID: state.menuSelected.loadWidgetID,
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
