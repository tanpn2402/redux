import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Radio,
    Table,
    Col,
    Button,
    Modal,
} from 'react-bootstrap'
import { connect } from 'react-redux'
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
        this.globalLoad = false;
        
        this.paramsgenfund = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'FUNDTRANSFER'
        }

        this.state = {
            isExternalFilter: true,
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

    buildFundsTransferStore(data, isExternal) {
        if (data.datagenfund.mvReceiversList.length == 0)
            return []
        if (isExternal) {
            return data
                .datagenfund
                .mvReceiversList
                .filter(receiver => {
                    return receiver.receiverAccType == 'E'
                })
        }
        return data
            .datagenfund
            .mvReceiversList
            .filter(receiver => {
                return receiver.receiverAccType == 'I'
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.datagenfund.mvReceiversList == null) return;
        var isExternal = this.state.isExternalFilter
        this.listReceiverExternal = this.buildFundsTransferStore(nextProps, isExternal)
        this.listReceiverInternal = this.buildFundsTransferStore(nextProps, !isExternal)
        this.setState({
            receivers: (isExternal) ? this.listReceiverExternal : this.listReceiverInternal
        })

    }

    render() {
        console.log("Reload", this.id)        
        let rowodd = this.props.theme.table == undefined ? undefined : this.props.theme.table.rowodd.backgroundColor
        let roweven = this.props.theme.table == undefined ? undefined : this.props.theme.table.roweven.backgroundColor
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
        return (
            
            <div
                style={{
                    height: '100%',
                    position: 'relative'
                }}>
                <Title widgetID={ this.id } theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Form
                        onSubmit={this
                            .handleSubmit
                            .bind(this)}
                        id={"form-" + this.id}
                        className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody>
                                    <tr style={{ backgroundColor: rowodd, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.cashbalance}</th>
                                        <td>
                                            {this.props.datagenfund.mvBalance}
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.cashwithdrawable}</th>
                                        <td ref={e => this.withdrawAmt = e}>
                                            {this.props.datagenfund.mvAvailable}
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowodd, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.transfertype}</th>
                                        <td>
                                            <Radio
                                                inline
                                                defaultChecked={true}
                                                name="radioGroup"
                                                onClick={(e => {
                                                    this.setState({
                                                        isExternalFilter: true,
                                                        receivers: this.listReceiverExternal
                                                    })

                                                    this.beneficiaryfullname.disabled = false
                                                    this.bankName.disabled = false
                                                    this.bankBranch.disabled = false
                                                    this.destClientID.value = ""
                                                    this.beneficiaryfullname.value = ""
                                                    this.bankName.value = ""
                                                    this.bankBranch.value = ""
                                                    this.transferAmount.value = ""
                                                    this.remark.value = ""
                                                })}>
                                                <div className="Radiobox">External</div>
                                            </Radio>
                                            <Radio
                                                name="radioGroup"
                                                inline
                                                disabled={this.listReceiverInternal.length == 0}
                                                onClick={(e => {
                                                    this.setState({
                                                        isExternalFilter: false,
                                                        receivers: this.listReceiverInternal
                                                    })
                                                    this.beneficiaryfullname.disabled = true
                                                    this.bankName.disabled = true
                                                    this.bankBranch.disabled = true
                                                    this.destClientID.selectedIndex = -1
                                                    this.beneficiaryfullname.value = ""
                                                    this.bankName.value = ""
                                                    this.bankBranch.value = ""
                                                    this.transferAmount.value = ""
                                                    this.remark.value = ""
                                                })}>
                                                <div className="Radiobox">Internal</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                                        <td>
                                            <select
                                                required
                                                ref={e => this.destClientID = e}
                                                name="destClientID"
                                                onChange={(e) => this.handleInputChange(e)}
                                                style={{
                                                    width: "100%",
                                                    "border-radius": "2px"
                                                }}>
                                                <option style={{ display: "none" }}></option>
                                                {(this.state.receivers == undefined)
                                                    ? []
                                                    : this.state.receivers.map((reciever => <option key={reciever.receiverAccID} value={reciever.receiverAccID}>{reciever.receiverAccID}</option>))};
                                            </select>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowodd, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.accounttype}</th>
                                        <td>
                                            {this.state.isExternalFilter ? this.props.language.cashtransfer.header.bankaccount : this.props.language.cashtransfer.header.localaccount}
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.beneficiaryfullname}</th>
                                        <td>
                                            <input
                                                ref={e => this.beneficiaryfullname = e}
                                                style={{
                                                    width: "180px"
                                                }}
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowodd }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.bankname}</th>
                                        <td>
                                            <input
                                                ref={e => this.bankName = e}
                                                style={{
                                                    width: "180px"
                                                }}
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.bankbranch}</th>
                                        <td>
                                            <input
                                                ref={e => this.bankBranch = e}
                                                id="bankbranch"
                                                style={{
                                                    width: "180px"
                                                }}
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowodd }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.transferamount}</th>
                                        <td>
                                            <input
                                                type="number"
                                                ref={e => this.transferAmount = e}
                                                style={{
                                                    width: "180px"
                                                }}
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.remark}</th>
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
        if (e.target.value == "")
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
            mvTransferType: this.state.isExternalFilter,
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
            .getgenfundtransfer(this.paramsgenfund, this.props.language);

    }

    // getranSubmit() {
    //     this
    //         .props
    //         .gettranSubmit()
    // }

    // handleSubmit(e) {     e.preventDefault();     this.setState({ isShow: true })
    // }

}
const mapStateToProps = (state) => {
    return { 
        datagenfund: state.cashtransfer.datagenfundtransfer,
        load: state.menuSelected.load,
        loadWidgetID: state.menuSelected.loadWidgetID,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    gettranSubmit: (paramsfund) => {
        dispatch(actions.getFundtransfer(paramsfund))
    },
    getgenfundtransfer: (paramsgenfund, language) => {
        dispatch(actions.getGenfundtransfer(paramsgenfund, language))
    },
    beforeSubmit: (paramsTransfer, mvTransferBean, language) => {
        dispatch(actions.beforeSubmitCashTransfer(paramsTransfer, mvTransferBean, language))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FundTransPanel)
