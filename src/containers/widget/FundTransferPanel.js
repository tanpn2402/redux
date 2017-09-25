import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'

class FundTransPanel extends Component {
    constructor(props) {
        super(props)
        this.id = 'fundTransPanel'
        this.paramsgenfund = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'FUNDTRANSFER',
        }
    }


    render() {
        var mreceive = this.props.datagenfund.mvReceiversList === undefined ? []: this.props.datagenfund.mvReceiversList[0]
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                        <Form onSubmit={this.handleSubmit.bind(this)} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive >
                                <tbody >
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.cashbalance}</th>
                                        <td>
                                            {this.props.datagenfund.mvBalance}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.cashwithdrawable}</th>
                                        <td>
                                            {this.props.datagenfund.mvAvailable}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.transfertype}</th>
                                        <td>
                                            <input type='hidden' id="mvStatus" ref={(ref) => this.inputStatus = ref} />
                                            <Radio name="radioGroup" inline onChange={() =>
                                                { this.inputStatus.value = "External" }} checked="checked" required>
                                                <div className="Radiobox">External</div>
                                            </Radio>
                                            <Radio name="radioGroup" inline disabled onChange={() =>
                                                { this.inputStatus.value = "Internal" }}>
                                                <div className="Radiobox">Internal</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                                        <td>
                                          <select>
                                            <option>{mreceive.receiverAccID}</option>
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
                                            <input name="beneficiaryfullname" value={mreceive.receiverName} id="beneficiaryfullname" style={{width: "180px"}} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.bankname}</th>
                                        <td>
                                            <input name="bankname" value={mreceive.receiverBankName} id="bankname" style={{width: "180px"}} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.bankbranch}</th>
                                        <td>
                                            <input name="bankbranch" id="bankbranch" style={{width: "180px"}} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.transferamount}</th>
                                        <td>
                                            <input name="transferamount" id="transferamount" style={{width: "180px"}} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.remark}</th>
                                        <td>
                                            <textarea rows="3" cols="26">
                                            </textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action cashtransfer-action">
                                <span>
                                <Button className="btn btn-default" onClick={this.getranSubmit.bind(this)} type="submit" className="submit">
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

    componentDidMount() {
        this.props.getgenfundtransfer(this.paramsgenfund, !this.props.reload);

    }

    getranSubmit() {
        this.props.gettranSubmit()
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isShow: true })
    }

}
const mapStateToProps = (state) => {
    return {
        datagenfund: state.cashtransfer.datagenfundtransfer,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    gettranSubmit: (paramsfund) => {
        dispatch(actions.getFundtransfer(paramsfund))
    },
    getgenfundtransfer: (paramsgenfund) => {
        dispatch(actions.getGenfundtransfer(paramsgenfund))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FundTransPanel)
