import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Radio,
    Table,
    Col,
    Button,
    Modal
} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'

class FundTransPanel extends Component {
    constructor(props) {
        super(props)
        this.id = 'fundTransPanel'
        this.listReceiverInternal = []
        this.listReceiverExternal = []
        this.paramsgenfund = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'FUNDTRANSFER'
        }

        this.state = {
            receivers: [],
            //     paramsfund: {       mvBankId: '',       mvDestClientID: '',
            // mvDestBankID: '',       inputBankName: '',       inputBankBranch: '',
            // mvDestAccountName: 'Test',       mvAmount: '1000',       mvTransferType: '',
            //      mvRemark: 'FUND TRANSFER',       mvSeriNo: '[5,A][4,f]',       mvAnswer:
            // '7|4',       mvSaveAuthenticate: 'true',       mvPersonCharged: '1',
            // mvWithdrawAmt: '1,000,000',       mvAvaiableAmt: '15,000,000',
            // mvTransferFee: '0'     },
        }

        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    buildFundsTransferStore(isExternal) {
        if (this.props.datagenfund.mvReceiversList.length == 0) 
            return
        if (isExternal) {
            return this
                .props
                .datagenfund
                .mvReceiversList
                .filter(receiver => {
                    return receiver.receiverAccType == 'E'
                })
        }
        return this
            .props
            .datagenfund
            .mvReceiversList
            .filter(receiver => {
                return receiver.receiverAccType == 'I'
            })
    }

    componentWillReceiveProps(nextProps) {
        this.listReceiverExternal = this.buildFundsTransferStore(true)
        this.listReceiverInternal = this.buildFundsTransferStore(false)
        if (this.listReceiverInternal.length == 0) this.internalOpt.disabled = true
            this.setState({
                receivers: (nextProps.datagenfund.mvReceiversList == undefined)
                    ? []
                    : nextProps.datagenfund.mvReceiversList
            })
    }

    render() {
        console.log("RENDER")
        var mreceive = this.props.datagenfund.mvReceiversList[0]
        return (
            <div
                style={{
                height: '100%',
                position: 'relative'
            }}>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <Form
                        onSubmit={this
                        .handleSubmit
                        .bind(this)}
                        id={"form-" + this.id}
                        className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody >
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.cashbalance}</th>
                                        <td>
                                            {this.props.datagenfund.mvBalance}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.cashwithdrawable}</th>
                                        <td ref={e => this.withdrawAmt = e}>
                                            {this.props.datagenfund.mvAvailable}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.transfertype}</th>
                                        <td>
                                            <input type='hidden' id="mvStatus" ref={(ref) => this.inputStatus = ref}/>
                                            <Radio
                                                ref={e => this.internalOpt = e}
                                                inline
                                                onChange={() => {
                                                this.inputStatus.value = "E";
                                                this.beneficiaryfullname.readOnly = false
                                                this.bankName.readOnly = false
                                                this.bankBranch.readOnly = false

                                            }}
                                                checked="checked"
                                                requiredExname="radioGroup" >
                                                <div className="Radiobox">External</div>
                                            </Radio>
                                            <Radio
                                                name="radioGroup"
                                                inline
                                                disabled
                                                onChange={() => {
                                                this.inputStatus.value = "I"
                                                this.beneficiaryfullname.readOnly = true
                                                this.bankName.readOnly = true
                                                this.bankBranch.readOnly = true
                                            }}>
                                                <div className="Radiobox">Internal</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                                        <td>
                                            <select
                                                ref={e => this.destClientID = e}
                                                name="destClientID"
                                                onChange={(e) => this.handleInputChange(e)}
                                                style={{
                                                width: "100%",
                                                "border-radius": "2px"
                                            }}>
                                                <option/> {(this.state.receivers == undefined)
                                                    ? []
                                                    : this.state.receivers.map((reciever => <option key={reciever.receiverAccID} value={reciever.receiverAccID}>{reciever.receiverAccID}</option>))};
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.accounttype}</th>
                                        <td>
                                            {this.props.language.cashtransfer.header.bankordertype}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.beneficiaryfullname}</th>
                                        <td>
                                            <input
                                                ref={e => this.beneficiaryfullname = e}
                                                style={{
                                                width: "180px"
                                            }}
                                                required/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.bankname}</th>
                                        <td>
                                            <input
                                                ref={e => this.bankName = e}
                                                style={{
                                                width: "180px"
                                            }}
                                                required/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.bankbranch}</th>
                                        <td>
                                            <input
                                                ref={e => this.bankBranch = e}
                                                id="bankbranch"
                                                style={{
                                                width: "180px"
                                            }}
                                                required/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.transferamount}</th>
                                        <td>
                                            <input
                                                ref={e => this.transferAmount = e}
                                                style={{
                                                width: "180px"
                                            }}
                                                required/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.remark}</th>
                                        <td>
                                            <textarea ref={e => this.remark = e} rows="3" cols="26"></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action cashtransfer-action">
                                <span>
                                    <Button
                                        className="btn btn-default"
                                        onClick={this
                                        .getranSubmit
                                        .bind(this)}
                                        type="submit"
                                        className="submit">
                                        Submit
                                    </Button>
                                    <Button className="btn btn-default" type="reset" className="cancel">Cancel</Button>
                                </span>
                            </div>
                        </FormGroup>
                    </Form>

                </Body>

            </div>
        )

    }

    //
    //Update paramsfund on user's input change
    handleInputChange(e) {
        if (e.value == "") 
            return;
        var curReciever = this
            .state
            .receivers
            .find((reciever) => {
                return e.target.value == reciever.receiverAccID
            })
        this.bankName.value = curReciever.receiverBankName
        this.beneficiaryfullname.value = curReciever.receiverName
    }

    handleSubmit(e) {
        e.preventDefault()
        var params = {
            mvBankId: 'VDSC',
            mvDestClientID: this.destClientID.value,
            mvDestBankID: '',
            inputBankName: this.bankName.value,
            inputBankBranch: this.bankBranch.value,
            mvDestAccountName: this.beneficiaryfullname.value,
            mvAmount: this.transferAmount.value,
            mvTransferType: this.inputStatus.value,
            mvRemark: this.remark.value,
            mvSeriNo: '[5,A][4,f]',
            mvAnswer: '7|4',
            mvSaveAuthenticate: 'true',
            mvPersonCharged: '1',
            mvWithdrawAmt: this.transferAmount.value,
            mvAvaiableAmt: this.withdrawAmt.innerHTML,
            mvTransferFee: '0'
        }
        // this.setState({ isShow: true }) let advPayment =
        // document.getElementById('txtAdvancePayment').value
        // this.props.beforeSubmit(advPayment, this.props.LocalAdvance.mvAdvanceBean,
        // this.props.language) check if transfer amount is over available amount
        // if(this.props.datagenfundtransfer.transferamount >
        // this.props.datagenfundtransfer.mvAvaiableAmt){}
        this
            .props
            .beforeSubmit(params, this.props.datagenfund, this.props.language)
    }

    componentDidMount() {
        this
            .props
            .getgenfundtransfer(this.paramsgenfund, !this.props.reload);

    }

    getranSubmit() {
        this
            .props
            .gettranSubmit()
    }

    // handleSubmit(e) {     e.preventDefault();     this.setState({ isShow: true })
    // }

}
const mapStateToProps = (state) => {
    return {datagenfund: state.cashtransfer.datagenfundtransfer}
}

const mapDispatchToProps = (dispatch, props) => ({
    gettranSubmit: (paramsfund) => {
        dispatch(actions.getFundtransfer(paramsfund))
    },
    getgenfundtransfer: (paramsgenfund) => {
        dispatch(actions.getGenfundtransfer(paramsgenfund))
    },
    beforeSubmit: (paramsTransfer, mvTransferBean, language) => {
        dispatch(actions.beforeSubmitCashTransfer(paramsTransfer, mvTransferBean, language))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FundTransPanel)