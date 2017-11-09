//render modal body + footer
import React, { Component } from 'react';
import { Table, Button, Modal, } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import CheckAuthenticationModal from '../CheckAuthenticationModal';
import PopupTable from '../../commons/PopupTable';



class EnterOrderConfirm extends Component{
    constructor(props) {
        super(props)
        
        this.id = 'enterorderconfirm'
    }


    render(){
        var tmp = this.props.data
        var data = [
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "stockCode",
                value: tmp.mvStockCode
            },
            {
                header: "price",
                value: tmp.mvPrice
            },
            {
                header: "quantity",
                value: tmp.mvVolume
            },
            {
                header: "buysell",
                value: tmp.mvBS
            },
            {
                header: "type",
                value: tmp.mvOrderType
            },
            {
                header: "totalCash",
                value: tmp.mvGrossAmt
            }
        ]
        var language = this.props.language

        return(
            <div>
                <Modal.Body>
                    <PopupTable language={this.props.language.enterorder.header} data={data} />
                </Modal.Body>

                <CheckAuthenticationModal authType={false} ref={e => this.auth = e} language={language}/>
                
                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.cancel}</Button>
                    <Button className="submit" onClick={this.submit.bind(this)}> {language.button.sure}</Button>
                </Modal.Footer>
            </div>
        )
    }

    submit(e){
        
        var data = this.props.data
        var params = {
            "mvBS": data.mvBS,
            "mvStockCode": data.mvStockCode,
            "mvLending": "" + data.mvLending,
            "mvBuyingPower": data.mvBuyPower,
            "mvOrderTypeValue": data.mvOrderType,
            "mvQuantity": data.mvVolume,
            "mvPrice": data.mvPrice,
            "mvGrossAmt": data.mvGrossAmt,
            "mvNetFee": data.mvNetFee,
            "mvMarketID": data.mvMarketID,
            //"refId": "",
            "mvWaitOrder": data.mvExpireChecked ? "on" : "off",
            "mvGoodTillDate": data.mvExpireChecked ? data.mvExpireDate : '',
            "mvAfterServerVerification": "Y",
            "mvBankID": data.mvBankID,
            "mvBankACID": data.mvBankACID,
        }

        //console.log(params)
        var authParams = this.auth.getParam()
        this.props.enterOrderSubmit(data.language, params, authParams)

        this.props.onHide()
    }
}


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    enterOrderSubmit: (lang, params, authParams) => {
        dispatch(actions.enterOrderSubmit(lang, params, authParams))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrderConfirm)
