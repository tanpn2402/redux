//render modal body + footer
import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import CheckAuthenticationModal from './CheckAuthenticationModal'
import {getTheme} from "../../utils"
import PopupTable from '../commons/PopupTable';

class EnterOrderConfirm extends Component{
    constructor(props) {
        super(props)
        
        this.id = 'enterorderconfirm'
    }


    render(){
        var tmp = this.props.data
        var language = this.props.language
        var buttonStyle = this.props.theme.button
        var tableStyle = this.props.theme.popup.table

        var data = [
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "stock",
                value: tmp.mvStockCode
            },
            {
                header: "stockName",
                value: tmp.mvStockName
            },
            {
                header: "price",
                Cell: props => {
                    return <span style={{fontWeight: "bold", fontSize: 15}}>{tmp.mvPrice}</span>
                }
            },
            {
                header: "volume",
                Cell: props => {
                    return <span style={{fontWeight: "bold", fontSize: 15}}>{tmp.mvVolume}</span>
                }
            }
        ]
        return(
            <div>
                <Modal.Body>
                    <PopupTable theme={this.props.theme} language={this.props.language.enterorder.header} data={data} />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>
                
                <Modal.Footer>
                    <button className="hks-btn btn-cancel" onClick={this.props.onHide} style={buttonStyle.cancel}>
                        {language.button.cancel}
                    </button>
                    <button className="hks-btn btn-submit" onClick={this.submit.bind(this)} 
                        style={ data.mvBS == "B" ? buttonStyle.buy : buttonStyle.sell }>
                        {language.button.submit}
                    </button>
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
        
        if(data.tradingType == "DERIVATIVES") {
            this.props.enterDerivativeOrder(data.language, {
                orderInfo: {
                    bs: data.mvBS,
                    marketId: "VNFE",
                    seriesId: data.mvStockCode,
                    // orderId: "",
                    // orderGroupId: ""
                },
                price: data.mvPrice,
                qty: data.mvVolume,
            }, data.pin, data.tradingAccount)
        } else {
            this.props.enterOrderSubmit(data.language, params, authParams)
        }

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
    },
    enterDerivativeOrder: (lang, params, pin, tradingAccount) => {
        dispatch(actions.enterorderFS(lang, params, pin, tradingAccount))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrderConfirm)
