import React, { Component } from 'react';
import { Table, Button, Modal, } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import CheckAuthenticationModal from '../CheckAuthenticationModal';
import PopupTable from '../../commons/PopupTable';
import Input from '../../commons/Input';
import * as api from '../../../api/web_service_api';
import * as ACTION from '../../../api/action_name';
import * as Utils from '../../../utils'

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

        this.store = {
            stockInfoBean: null
        }
    }

    onModifySubmit() {
        var authParams = this.auth.getParam()

        this.props.onModifySubmit(
            this.props.genModifyOrderData.mvGenModifyOrderBean, 
            this.mvNewPrice.getValue(), 
            this.mvNewQuantity.getValue(), 
            authParams, 
            this.props.language, 
            this.props.data.me
        )

        this.props.onHide()
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount(){
        this.props.genModifyOrder(this.paramGenModifyOrder)
    }

    onPriceChange(value) {
        this.calculateGrossAmt()
    }

    onQtyChange(value) {

        this.calculateGrossAmt()
    }
    render() {
        console.log(this.props.data.data)
        var tmp = this.props.data.data
        var data = [
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "tradeId",
                value: tmp.mvOrderGroupID
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
                value: tmp.mvBS
            },
            {
                header: "initialPrice",
                value: tmp.mvPriceValue
            },
            {
                header: "newPrice",
                Cell: props => {
                    return <Input key="newPrice" type="number" ref={ref => this.mvNewPrice =  ref} step={10}
                        defaultValue={tmp.mvPriceValue}
                        onChange={this.onPriceChange.bind(this)}/>
                }
            },
            {
                header: "initialQuantity",
                value: tmp.mvQtyValue
            },
            {
                header: "matchedQuantity",
                value: tmp.mvFilledQty
            },
            {
                header: "newQuantity",
                Cell: props => {
                    return <Input key="newQuantity" type="number" ref={ref => this.mvNewQuantity =  ref} step={100}
                        defaultValue={tmp.mvQtyValue}
                        onChange={this.onQtyChange.bind(this)}/>
                }
            },
            {
                header: "totalCash",
                Cell: props => {
                    return <Input key="mvGrossAmt" className="showOnly"
                        ref={ref => this.mvGrossAmt = ref} readOnly value={0}/>
                }
            }
        ]

        var mvGenModifyOrderBean = this.props.genModifyOrderData.mvGenModifyOrderBean
        var language = this.props.language
        
        return (
            <div >
                <Modal.Body>
                    <PopupTable theme={this.props.theme} language={this.props.language.orderjournal.header} data={data} />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>

                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.cancel}</Button>
                    <Button className="submit" onClick={this.onModifySubmit.bind(this)}> {language.button.confirmModify}</Button>
                </Modal.Footer>
            </div>
        )
        
    }

    componentWillMount() {
        let data = this.props.data.data
        let me = this

        let mvEnableGetStockInfo = "N";
        let mvActionStockInfo = "OI";   //OI = Order Info
        if (data.mvBSValue === 'B') {
            mvActionStockInfo += ",BP";
        }


        let params = {
            mvInstrument: data.mvStockID,
            mvMarketId: data.mvMarketID,
            mvBS: data.mvBSValue,
            mvEnableGetStockInfo: mvEnableGetStockInfo,
            mvAction: mvActionStockInfo,
            key: (new Date()).getTime()
        }

        api.fetch(ACTION.STOCKINFO, params, 'POST', function (response) {
            me.store.stockInfoBean = response.mvStockInfoBean;
        })
    }


    calculateGrossAmt() {
        // get mvPrice from Form    
        var data = this.props.data.data 
        var stockInfoBean = this.store.stockInfoBean
        if (!stockInfoBean)
            return;

        var price = this.mvNewPrice.getValue()
        var orderType = data.mvOrderTypeValue
        var bsValue = data.mvBSValue
        
        if (orderType == "O" || orderType == "C" || orderType == "M" ||
            orderType == "B" || orderType == "Z" || orderType == "R") 
        {
            if (bsValue === 'B') {
                price = (stockInfoBean.mvCeiling && stockInfoBean.mvCeiling.trim().length > 0) ?
                    stockInfoBean.mvCeiling : "0";
            } else {
                price = (stockInfoBean.mvFloor && stockInfoBean.mvFloor.trim().length > 0) ?
                    stockInfoBean.mvFloor : "0";
            }
        }

        // get mvVol from Form
        var volume = this.mvNewQuantity.getValue()

        if (volume === 0 || price === 0) {
            return false;
        }
       
        this.mvGrossAmt.value(Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang))
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
