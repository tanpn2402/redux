import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import { PowerSelect } from 'react-power-select'

class EntitlementPanel extends Component {
    constructor(props) {
        super(props)

        this.id = 'entitlementPanel'

        this.state = {
            mvStockSelected: '',
            mvSettlementAccount: {
                'mvSettlementAccountDisplayName': "MAS"
            }
        }
    }


    render() {
        var bankInfoList = this.props.bankInfo.mvBankInfoList
        if (bankInfoList && bankInfoList.length > 0 && bankInfoList[0].mvSettlementAccountDisplayName !== 'MAS') {
            bankInfoList.unshift({
                'mvBankID': "",
                'mvBankACID': "",
                'mvSettlementAccountDisplayName': "MAS",
                'mvIsDefault': "N",
                'mvInterfaceSeq': "-1"
            })
        }
        var entitlementStockList = this.props.entitlementStockList
        let rowodd = this.props.theme.table == undefined ? undefined : this.props.theme.table.rowodd.backgroundColor
        let roweven = this.props.theme.table == undefined ? undefined : this.props.theme.table.roweven.backgroundColor
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Form onSubmit={this.submitEntitlement.bind(this)} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive >
                                <tbody >
                                    <tr style={{ backgroundColor: rowodd, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.bankaccount}</th>
                                        <td>
                                            <PowerSelect
                                                options={bankInfoList}
                                                selected={this.state.mvSettlementAccount}
                                                onChange={this.onSettlementAccountChange.bind(this)}
                                                optionLabelPath={'mvSettlementAccountDisplayName'}
                                                showClear={false}
                                                searchEnabled={false}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.cashbalance}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="cashBalance"
                                                ref={e => this.cashBalance = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowodd, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.cashavailable}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="cashAvailable"
                                                ref={e => this.cashAvailable = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.buyingpower}</th>
                                        <td>
                                            <input
                                                className="hks-input read-only"
                                                id="buyingPower"
                                                ref={e => this.buyingPower = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowodd, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.stockcode}</th>
                                        <td>
                                            <PowerSelect
                                                options={entitlementStockList.stockCmbList}
                                                selected={this.state.mvStockSelected}
                                                onChange={this.onStockChange.bind(this)}
                                                optionLabelPath={'stockCode'}
                                                showClear={false}
                                            />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven, color: font2 }}>
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
                                    <tr style={{ backgroundColor: rowodd, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.registerqty}</th>
                                        <td style={{ color: 'black' }}>
                                            <input
                                                className="hks-input border"
                                                id="txtTradeQty"
                                                ref={e => this.txtTradeQty = e}
                                                type="number"
                                                min="0"
                                                required />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: roweven, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.actionprice}</th>
                                        <td>
                                            <input
                                                id="txtPrice"
                                                className="hks-input read-only"
                                                ref={e => this.txtPrice = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: rowodd, color: font2 }}>
                                        <th>{this.props.language.entitlement.header.amountVND}</th>
                                        <td>
                                            <input
                                                id="txtAmount"
                                                className="hks-input read-only"
                                                ref={e => this.txtAmount = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <input ref={e => this.txtTradeStockCode = e} type="hidden" />
                                        <input ref={e => this.txtBeginTransferDate = e} type="hidden" />
                                        <input ref={e => this.txtEndTransferDate = e} type="hidden" />
                                        <input ref={e => this.txtMaxQty = e} type="hidden" />
                                        <input ref={e => this.txtRequestedQty = e} type="hidden" />
                                        <input ref={e => this.txtQuantity = e} type="hidden" />
                                        <input ref={e => this.txtRightDate = e} type="hidden" />
                                        <input ref={e => this.txtStockRequestedQty = e} type="hidden" />
                                        <input ref={e => this.txtTotalRights = e} type="hidden" />
                                        <input ref={e => this.txtTotalStock = e} type="hidden" />
                                        <input ref={e => this.txtTimePeriod = e} type="hidden" />
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="button" className="hks-btn btn-cancel"
                                        onClick={this.handleResetForm.bind(this)}>
                                        {this.props.language.button.cancel}
                                    </button>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit"
                                        onClick={this.submitEntitlement.bind(this)}>
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
        this.props.getqueryBankInfo(this.queryBankInfoParams)
        this.props.getEntitlementStockList(this.getEntitlementStockListParams)
        this.props.entitlementGetAccountBalance({
            me: this,
            bankInfo: {
                mvBankID: "",
                mvBankACID: ""
            }
        })
    }

    handleResetForm(e) {
        this.txtAmount.value = ''
        this.txtPrice.value = ''
        this.txtTradeQty.value = ''
        this.txtStockExistQty.value = ''
    }

    submitEntitlement(e) {
        e.preventDefault()
        this.props.submitEntitlement({
            me: this,
            language: this.props.language
        })
    }
    getAccountBalance(bankInfo) {
        if (bankInfo) {
            this.props.entitlementGetAccountBalance({
                me: this,
                bankInfo: bankInfo
            })
        }
    }
    onStockChange = ({ option }) => {
        this.setState({ mvStockSelected: option })
        var record = {}
        this.getEntitlementData(record)
    }

    onSettlementAccountChange = ({ option }) => {
        if (option) {
            this.setState({ mvSettlementAccount: option })
            this.getAccountBalance(option)
        }
    }
    // setValue
    setCashBalanceValue(value) {
        this.cashBalance.value = value
    }

    setCashAvailableValue(value) {
        this.cashAvailable.value = value
    }

    setBuyPowerValue(value) {
        this.buyingPower.value = value
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
