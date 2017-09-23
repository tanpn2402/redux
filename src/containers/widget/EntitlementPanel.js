import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
class EntitlementPanel extends Component {
    constructor(props) {
        super(props)

        this.id = 'entitlementPanel'
    }


    render() {
        var bankInfo = this.props.bankInfo
        var entitlementStockList = this.props.entitlementStockList
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <Form onSubmit={this.submitEntitlement.bind(this)} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive >
                                <tbody >
                                    <tr>
                                        <th>{this.props.language.entitlement.header.bankaccount}</th>
                                        <td>
                                            <select onChange={this.getAccountBalance.bind(this)} className="hks-select bank-account">
                                                {
                                                    bankInfo.mvBankInfoList.map(bank => {
                                                        return (
                                                            <option value={bank.mvSettlementAccountDisplayName}>
                                                                {bank.mvSettlementAccountDisplayName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.cashbalance}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="cashBalance"
                                                ref={e => this.cashBalance = e}
                                                readOnly/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.cashavailable}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="cashAvailable"
                                                ref={e => this.cashAvailable = e}
                                                readOnly/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.buyingpower}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="buyingPower"
                                                ref={e => this.buyingPower = e}
                                                readOnly/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.stockcode}</th>
                                        <td>
                                            <InputSearch data={entitlementStockList.stockCmbList} onChange={this.onStockChange.bind(this)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.availableqty}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="txtStockExistQty" 
                                                ref={e => this.txtStockExistQty = e}
                                                readOnly
                                                required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.registerqty}</th>
                                        <td>
                                            <input
                                                className="hks-input border"
                                                id="txtTradeQty" 
                                                ref={e => this.txtTradeQty = e}
                                                type="number"
                                                min="0"
                                                required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.actionprice}</th>
                                        <td>
                                            <input
                                                id="txtPrice" 
                                                className="hks-input read-only"
                                                ref={e => this.txtPrice = e}
                                                readOnly
                                                required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.entitlement.header.amountVND}</th>
                                        <td>
                                            <input
                                                id="txtAmount" 
                                                className="hks-input read-only"
                                                ref={e => this.txtAmount = e}
                                                readOnly
                                                required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <input ref={e => this.txtTradeStockCode = e} type="hidden"/>
                                        <input ref={e => this.txtBeginTransferDate = e} type="hidden"/>
                                        <input ref={e => this.txtEndTransferDate = e} type="hidden"/>
                                        <input ref={e => this.txtMaxQty = e} type="hidden"/>
                                        <input ref={e => this.txtRequestedQty = e} type="hidden"/>
                                        <input ref={e => this.txtQuantity = e} type="hidden"/>
                                        <input ref={e => this.txtRightDate = e} type="hidden"/>
                                        <input ref={e => this.txtStockRequestedQty = e} type="hidden"/>
                                        <input ref={e => this.txtTotalRights = e} type="hidden"/>
                                        <input ref={e => this.txtTotalStock = e} type="hidden"/>
                                        <input ref={e => this.txtTimePeriod = e} type="hidden"/>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action cashadvance-action">
                                <span>
                                    <Button className="btn btn-default" type="submit" className="submit">
                                        Submit
                                    </Button>
                                    <Button className="btn btn-default" type="reset" className="cancel">
                                        Clear
                                    </Button>
                                </span>
                            </div>
                        </FormGroup>
                    </Form>
                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.getqueryBankInfo(this.queryBankInfoParams)
        this.props.getEntitlementStockList(this.getEntitlementStockListParams)
        this.props.entitlementGetAccountBalance({
            bankInfo: {
                mvBankID: "",
                mvBankACID: ""
            }
        })
    }


    submitEntitlement(e){
        e.preventDefault()
        this.props.submitEntitlement({
            me: this,
            language: this.props.language
        })
    }
    getAccountBalance(e){
        var bankInfo = this.props.bankInfo.mvBankInfoList.filter(el => el.mvSettlementAccountDisplayName === e.target.value)
        if(bankInfo.length > 0){
            this.props.entitlementGetAccountBalance({
                me: this,
                bankInfo: bankInfo[0]
            })
        }
    }
    onStockChange(value){
        console.log(value)
        this.cboStockCode = value
        var record = {}
        this.getEntitlementData(record)
    }

}
const mapStateToProps = (state) => {
    return {
        bankInfo: state.cashadvancebank.queryBankInfo,
        entitlementStockList: state.entitlement.entitlementStockList
    }
}

const mapDispatchToProps = (dispatch, props) => ({

    submitEntitlement: (params) => {
        dispatch(actions.submitEntitlement(params))
    },
    getqueryBankInfo: (params) => {
        dispatch(actions.getqueryBankInfo(params))
    },
    getEntitlementStockList: (params) => {
        dispatch(actions.getEntitlementStockList(params))
    },
    entitlementGetAccountBalance: (params) => {
        dispatch(actions.entitlementGetAccountBalance(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitlementPanel)
