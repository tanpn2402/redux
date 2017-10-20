//render modal body + footer
import React, { Component } from 'react';
import { Table, Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'

class EnterOrderConfirm extends Component{
    constructor(props) {
        super(props)
        
        this.id = 'enterorderconfirm'
    }


    render(){
        var data = this.props.data
        var language = this.props.language

        return(
            <div>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table table-bordered table-odd-even">
                            <tbody >
                                <tr>
                                    <th>{language.enterorder.header.stock} </th>
                                    <td>{data.mvStockCode}</td>
                                </tr>
                                <tr>
                                    <th>{language.enterorder.popup.stockname} </th>
                                    <td>{data.mvStockName}</td>
                                </tr>
                                <tr>
                                    <th>{language.enterorder.header.price} </th>
                                    <td>{data.mvPrice}</td>
                                </tr>
                                <tr>
                                    <th>{language.enterorder.header.volume} </th>
                                    <td>{data.mvVolume}</td>
                                </tr>
                                <tr>
                                    <th>{language.enterorder.header.ordertype} </th>
                                    <td>{data.mvOrderType}</td>
                                </tr>
                                <tr>
                                    <th>{language.enterorder.header.value} </th>
                                    <td>{data.mvGrossAmt}</td>
                                </tr>
                                <tr>
                                    <th>{language.enterorder.popup.expirydate} </th>
                                    <td>{data.mvExpireChecked ? data.mvExpireDate : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>
                
                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.cancel}</Button>
                    <Button className="submit" onClick={this.submit.bind(this)}> {language.button.submit}</Button>
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
