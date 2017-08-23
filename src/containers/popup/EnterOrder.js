import React, { Component } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import '../../css/App.css';
import CheckAuthenticationModal from './CheckAuthenticationModal';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class EnterOrderPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.param ={
            "mvBS": this.props.json.mvStatus,
            "mvStockCode": this.props.json.mvStock,
            "mvLending": this.props.mvStockBean.mvStockInfoBean.mvMarginPercentage,
            "mvBuyingPower": this.props.json.mvBuyPower,
            "mvOrderTypeValue": this.props.json.mvOrderType,
            "mvQuantity": this.props.json.mvVolume,
            "mvPrice": this.props.json.mvPrice,
            "mvGrossAmt": this.props.json.mvTotalPrice,
            "mvNetFee": this.props.json.mvNetFee,
            "mvMarketID": this.props.json.mvMarketID,
            "refId": "",
            "mvWaitOrder": "off", // not sure
            "mvGoodTillDate": "",
            "mvAfterServerVerification": "Y", // not sure
            "ext-gen1360": this.props.mvStockBean.mvStockInfoBean.mvTemporaryFee,
            "ext-gen1361": this.props.mvStockBean.mvStockInfoBean.mvStockName,
            "ext-gen1362": "",
            "mvBankID": "",
            "mvBankACID": "",
        }
    }

    // shouldComponentUpdate(nextProps) {
    //     if(nextProps.matrixResponse === "SUCCESS")
    //         return true;
    // }

    // componentWillUpdate(nextProps) {   
    //     console.log("will update")
    //     this.props.onHide();
    // }
    checkAuthentication(e) {
        // Prevent from reloading page when submit
        e.preventDefault();
        const code1 = document.getElementById("code1").innerText;
        const code2 = document.getElementById("code2").innerText;
        const input1 = document.getElementById("input1").value;
        const input2 = document.getElementById("input2").value;
        var json = {
            "wordMatrixKey01": code1,
            "wordMatrixValue01": input1,
            "wordMatrixKey02": code2,
            "wordMatrixValue02": input2,
            "serialnumber": input2,
            "mvSaveAuthenticate": "true",
        }
        
        this.props.getMatrixCard(this.param);
    }

    render() {
        return (
            <div className="modalbody">
                <Modal.Body>
                    <Table responsive bordered>
                        <tbody >
                            <tr>
                                <th className="enterorder">{this.props.language.enterorder.header.stock} </th>
                                <td colSpan="2">{this.props.json.mvStock}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.enterorder.popup.stockname} </th>
                                <td colSpan="2">{this.props.mvStockBean.mvStockInfoBean.mvStockName}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.enterorder.header.price} </th>
                                <td colSpan="2">{this.props.json.mvPrice}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.enterorder.header.volume} </th>
                                <td colSpan="2">{this.props.json.mvVolume}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.enterorder.header.ordertype} </th>
                                <td colSpan="2">{this.props.json.mvOrderType}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.enterorder.header.value} </th>
                                <td colSpan="2">{this.props.json.mvTotalPrice}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.enterorder.popup.expirydate} </th>
                                <td colSpan="2">{this.props.json.mvDate}</td>
                            </tr>
                        </tbody>
                        <CheckAuthenticationModal language={this.props.language} />

                    </Table>
                    <div>{this.props.isAuthenFail && <h5>{this.props.isAuthenFail}</h5>}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button onClick={this.checkAuthentication}> Submit</Button>
                </Modal.Footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenFail: state.checkAuthen.isAuthenFail,
        matrixResponse: state.checkAuthen.matrixResponse,
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    getMatrixCard: (param) => {
        dispatch(actions.submitEnterOrder(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrderPopup);
