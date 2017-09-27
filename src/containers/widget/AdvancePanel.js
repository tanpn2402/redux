import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'

class AdvancePanel extends Component {
    constructor(props) {
        super(props)
        this.id = "advancePanel"

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
        var localAdvance = this.props.LocalAdvance.mvAdvanceBean === undefined ? [] : this.props.LocalAdvance.mvAdvanceBean
        localAdvance = localAdvance === null ? [] : localAdvance
        let advAvailable = Utils.numUnFormat(localAdvance.advAvailable) - Utils.numUnFormat(localAdvance.advPending)
        return (
            <div>
                <Title widgetID={this.id}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody >
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                        <td>{Utils.currencyShowFormatter(advAvailable,",", 'vi-VN')}</td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                            {Utils.currencyShowFormatter(this.state.advanceFee, ",", 'vi-VN')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td>
                                            <FormGroup>
                                                <input type="number" name="volume" min="0" onChange={this.onAdvancePaymentChange.bind(this)}  
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
        this.props.getLocalAdvanceCreation(this.querySoldOrdersParams)
    }

    handleSubmit(e) {
        e.preventDefault()
        let advPayment = document.getElementById('txtAdvancePayment').value
        this.props.beforeSubmit(advPayment, this.props.LocalAdvance.mvAdvanceBean, this.props.language)
    }

    onAdvancePaymentChange(e) {
        e.preventDefault();
        let advPayment = e.target.value
        let advCfgInfor = this.props.LocalAdvance.mvAdvanceBean

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

            this.setState({ advanceFee: tempFee })
        } 
    }

}
const mapStateToProps = (state) => {
    return {
        LocalAdvance: state.cashadvance.LocalAdvance,
<<<<<<< HEAD
=======

>>>>>>> origin/ver2
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getLocalAdvanceCreation: (params) => {
        dispatch(actions.getLocalAdvanceCreation(params))
    },
<<<<<<< HEAD
=======

>>>>>>> origin/ver2
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancePanel)
