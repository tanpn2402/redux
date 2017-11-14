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
import Select from '../commons/Select'

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
            isExternalFilter: true,
            receivers: [],
            destClientID: ''
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
        let rowOdd = this.props.theme.table.rowOdd.backgroundColor
        let rowEven = this.props.theme.table.rowEven.backgroundColor
        let font2 = this.props.theme.font.sub1.color
        return (
            <div
                style={{
                    height: '100%',
                    position: 'relative'
                }}>
                <Title language={this.props.language} theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Form onSubmit={this.handleSubmit.bind(this)} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody>
                                    <tr style={{ backgroundColor: rowOdd, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.cashbalance}</th>
                                        <td>
                                            {this.props.datagenfund.mvBalance}
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowEven, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.cashwithdrawable}</th>
                                        <td ref={e => this.withdrawAmt = e}>
                                            {this.props.datagenfund.mvAvailable}
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowOdd, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.transfertype}</th>
                                        <td>
                                            <Radio
                                                inline
                                                defaultChecked={true}
                                                name="radioGroup"
                                                onClick={(e => {
                                                    this.setState({
                                                        isExternalFilter: true,
                                                        receivers: this.listReceiverExternal,
                                                        destClientID: ''
                                                    })

                                                    this.beneficiaryfullname.disabled = false
                                                    this.bankName.disabled = false
                                                    this.bankBranch.disabled = false
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
                                                        receivers: this.listReceiverInternal,
                                                        destClientID: ''
                                                    })
                                                    this.beneficiaryfullname.disabled = true
                                                    this.bankName.disabled = true
                                                    this.bankBranch.disabled = true
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
                                    <tr style={{ backgroundColor: rowEven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                                        <td>

                                            <Select
                                                options={this.state.receivers}
                                                searchEnabled={false}
                                                selected={this.state.destClientID}
                                                optionLabelPath={'receiverAccID'}
                                                onChange={e => this.handleInputChange(e.option)}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowOdd, color: font2 }} >
                                        <th>{this.props.language.cashtransfer.header.accounttype}</th>
                                        <td>
                                            {this.state.isExternalFilter ? this.props.language.cashtransfer.header.bankaccount : this.props.language.cashtransfer.header.localaccount}
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowEven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.beneficiaryfullname}</th>
                                        <td>
                                            <input
                                                className="hks-input border"
                                                ref={e => this.beneficiaryfullname = e}
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowOdd }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.bankname}</th>
                                        <td>
                                            <input
                                                className="hks-input border"
                                                ref={e => this.bankName = e}
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowEven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.bankbranch}</th>
                                        <td>
                                            <input
                                                className="hks-input border"
                                                ref={e => this.bankBranch = e}
                                                id="bankbranch"
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowOdd }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.transferamount}</th>
                                        <td>
                                            <input
                                                className="hks-input border"
                                                type="number"
                                                ref={e => this.transferAmount = e}
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowEven }} >
                                        <th style={{ color: font2 }}>{this.props.language.cashtransfer.header.remark}</th>
                                        <td>
                                            <textarea ref={e => this.remark = e} className="hks-input border"
                                                rows="3" cols="26"></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="reset" className="hks-btn btn-cancel" >
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

    //
    //Update paramsfund on user's input change
    handleInputChange(e) {
        if (e) {
            console.log(this.destClientID)
            if (e.receiverAccID == "")
                return;
            var curReciever = this.state.receivers.find((reciever) => {
                return e.receiverAccID == reciever.receiverAccID
            })
            this.bankName.value = curReciever.receiverBankName
            this.beneficiaryfullname.value = curReciever.receiverName
            this.setState({ destClientID: e.receiverAccID })
        } else {
            this.setState({ destClientID: '' })
            this.beneficiaryfullname.value = ''
            this.bankName.value = ''
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        var params = {
            mvBankId: 'VDSC',
            mvDestClientID: this.state.destClientID,
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
    return { datagenfund: state.cashtransfer.datagenfundtransfer }
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
