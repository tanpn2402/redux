import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import CheckAuthenticationModal from './CheckAuthenticationModal'

class ModifyOrder extends Component {
    constructor(props) {
        super(props)

        var data = this.props.data.data

        this.paramGenModifyOrder = {
            mvOrderId: data.mvOrderID,
            mvBSValue: data.mvBSValue,
            mvStockId: data.mvStockID,
            mvMarketId: data.mvMarketID,
            mvPriceValue: data.mvPriceValue,
            mvQtyValue: data.mvQtyValue,
            mvCancelQtyValue: data.mvCancelQtyValue,
            mvInputTime: data.mvInputTime,
            mvStopTypeValue: data.mvStopTypeValue,
            mvStopPriceValue: data.mvStopPriceValue,
            mvStopOrderExpiryDate: data.mvStopOrderExpiryDate == null ? "" : data.mvStopOrderExpiryDate,
            mvOrderTypeValue: data.mvOrderTypeValue,
            mvAllOrNothing: data.mvAllorNothing,
            mvValidityDate: data.mvValidityDate == null ? "" : data.mvValidityDate,
            mvActivationDate: data.mvActivationDate,
            mvGoodTillDate: data.mvGoodTillDate,
            mvRemark: data.mvRemark,
            mvContactPhone:  data.mvContactPhone,
            mvGrossAmt:  data.mvGrossAmt,
            mvNetAmtValue:  data.mvNetAmtValue,
            mvSCRIP:  data.mvSCRIP,
            mvlotSize:  data.mvLotSize,
            mvOrderGroupId:  data.mvOrderGroupID,
            mvBaseNetAmtValue:  data.mvGrossAmt,
            mvAvgPriceValue:  data.mvAvgPriceValue,
            mvFilledQty:  data.mvFilledQty,
            mvStatus:  data.mvStatus
        }
    }

    onModifySubmit() {
        var authParams = this.auth.getParam()

        this.props.onModifySubmit(this.props.genModifyOrderData.mvGenModifyOrderBean, 
            this.mvPrice.value, this.mvQty.value, authParams, this.props.language, this.props.data.me)

        this.props.onHide()
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount(){
        this.props.genModifyOrder(this.paramGenModifyOrder)
    }

    render() {
        var data = this.props.data.data
        var mvGenModifyOrderBean = this.props.genModifyOrderData.mvGenModifyOrderBean
        var language = this.props.language
        var price = data.mvPrice
        try{
            price = parseInt(data.mvPrice)
        }catch(e){}
        
        return (
            <div >
                <Modal.Body>
                    <table className="table table-bordered" >
                        <tbody >
                            <tr className="modalbody">
                                <th>{this.props.language.orderjournal.header.stockid}</th>
                                <td>
                                    <input type='text' className='form-control'value={data.mvStockID} disabled />
                                </td>
                            </tr>
                            <tr className="modalbody">
                                <th>{this.props.language.orderjournal.header.price}</th>
                                <td>
                                    <input ref={e => this.mvPrice = e} type='number' className='form-control' defaultValue={price} />
                                </td>
                            </tr>
                            <tr className="modalbody">
                                <th>{this.props.language.orderjournal.header.quantity}</th>
                                <td>
                                    <input ref={e => this.mvQty = e} type='number' className='form-control' defaultValue={data.mvQty}/>
                                </td>
                            </tr>
                            <tr className="modalbody">
                                <th>Floor/Ceil: </th>
                                <td>
                                    <font color='#3399CC'>
                                        <b>
                                            {mvGenModifyOrderBean.floor}
                                        </b>
                                    </font>
                                    <font color='#FF66CC'><b>/{mvGenModifyOrderBean.ceiling}</b></font>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>

                <Modal.Footer>
                    <button className="hks-btn btn-cancel" onClick={this.props.onHide}>{language.button.cancel}</button>
                    <button className="hks-btn btn-submit" onClick={this.onModifySubmit.bind(this)}> {language.button.confirmModify}</button>
                </Modal.Footer>
            </div>
        )
        
    }
}
const mapStateToProps = (state) => {
    return {
        genModifyOrderData: state.orderjournal.genmodifyorder
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onModifySubmit: (param, newPrice, newQty, authParams, language, me) => {
        dispatch(actions.onModifySubmit(param, newPrice, newQty, authParams, language, me))
    },
    genModifyOrder: (param) => {
        dispatch(actions.genModifyOrder(param))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOrder)
