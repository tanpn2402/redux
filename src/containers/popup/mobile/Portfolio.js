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
                cell: props => {
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
                cell: props => {
                    return <Input key="newQuantity" type="number" ref={ref => this.mvNewQuantity =  ref} step={100}
                        defaultValue={tmp.mvQtyValue}
                        onChange={this.onQtyChange.bind(this)}/>
                }
            },
            {
                header: "totalCash",
                cell: props => {
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
                    <PopupTable language={this.props.language.orderjournal.header} data={data} />
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
