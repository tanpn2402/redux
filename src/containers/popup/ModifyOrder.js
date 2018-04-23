import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import CheckAuthenticationModal from './CheckAuthenticationModal'
import PopupTable from '../commons/PopupTable';
import Input from '../commons/Input';

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
        var mvMarketID = this.props.data.data.mvMarketID

        if(mvMarketID == "VNFE") {
            let data = this.props.data.data
            data.newPrice = this.mvNewPrice.getValue()
            data.newVolume = this.mvNewQuantity.getValue()
            this.props.onModifyFSOrder(data, this.props.language)
        } else {
            this.props.onModifySubmit(
                this.props.genModifyOrderData.mvGenModifyOrderBean, 
                this.mvNewPrice.getValue(), this.mvNewQuantity.getValue(), 
                authParams, this.props.language, this.props.data.me)
        }

            

        this.props.onHide()
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount(){
        var mvMarketID = this.props.data.data.mvMarketID
        if(mvMarketID == "VNFE") {
            
        } else {
            this.props.genModifyOrder(this.paramGenModifyOrder)
        }
    }

    onPriceChange(value) {
        
        
    }
    onQtyChange(value) {
        
        
    }

    render() {
        var data = this.props.data.data
        var mvGenModifyOrderBean = this.props.genModifyOrderData.mvGenModifyOrderBean
        var language = this.props.language
        var price = data.mvPrice
        try {
            price = parseInt(data.mvPrice)
        } catch(e){}

        var tmp = this.props.data.data
        
        var data = [
            {
                Header: p => {
                    return (
                        <span>
                            <span style={{marginRight: "5px"}}>{language.enterorder.header.subaccount}:</span>
                            <span>{tmp.mvClientID}</span>
                        </span>
                    )
                },
                Cell: p => {
                    return (
                        <span>
                        </span>
                    )
                }
            },
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "stockid",
                value: tmp.mvStockID
            },
            {
                header: "stockName",
                value: tmp.mvStockName
            },
            {
                header: "buysell",
                value: this.props.language.global.bs[tmp.mvBSValue]
            },
            {
                header: "initialPrice",
                value: tmp.mvPriceValue
            },
            {
                header: "newPrice",
                Cell: props => {
                    return (
                        <Input key="newPrice" type="number" ref={ref => this.mvNewPrice =  ref} step={10}
                            defaultValue={tmp.mvPriceValue}
                            onChange={this.onPriceChange.bind(this)}/>
                    )
                }
            },
            {
                header: "initialQuantity",
                value: tmp.mvQtyValue
            },
            {
                header: "newQuantity",
                Cell: props => {
                    return <Input key="newQuantity" type="number" ref={ref => this.mvNewQuantity =  ref} step={100}
                        defaultValue={tmp.mvQtyValue}
                        onChange={this.onQtyChange.bind(this)}/>
                }
            }
        ]

        // console.log(this.props.theme)
        var buttonStyle = this.props.theme.button
        var tableStyle = this.props.theme.popup.table
        
        return (
            <div >
                <Modal.Body>
                    <PopupTable theme={this.props.theme} language={this.props.language.orderjournal.header} data={data} />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>

                <Modal.Footer>
                    <button className="hks-btn btn-cancel" onClick={this.props.onHide} style={buttonStyle.cancel}>
                        {language.button.cancel}
                    </button>
                    <button className="hks-btn btn-submit" onClick={this.onModifySubmit.bind(this)} style={buttonStyle.confirm}>
                        {language.button.confirmModify}
                    </button>
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
    onModifyFSOrder: (param, language) => {
        dispatch(actions.modifyFSOrder(param, language))
    },
    genModifyOrder: (param) => {
        dispatch(actions.genModifyOrder(param))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOrder)
