import React, { Component } from 'react';
import {  Table, Modal,Button} from 'react-bootstrap';
import '../../css/App.css';
import CheckAuthenticationModal from './CheckAuthenticationModal';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class EnterOrderPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.checkAuthentication = this.checkAuthentication.bind(this);
    }

    checkAuthentication(e) {
        // Prevent from reloading page when submit
        e.preventDefault();
        const code1 = document.getElementById("code1").innerText;
        const code2 = document.getElementById("code2").innerText;
        const input1 = document.getElementById("input1").value;
        const input2 = document.getElementById("input2").value;
        this.props.checkAuthen(code1, code2, input1, input2, this.props.language.matrixcard);
    }

    render() {
        console.log(this.props.language);
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
                                <td colSpan="2">{this.props.mvStockBean.mvStockName}</td>
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
                        <CheckAuthenticationModal language={this.props.language}/>
                        
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
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    checkAuthen: (code1, code2, input1, input2, language) => {
        dispatch(actions.checkAuthen(code1, code2, input1, input2, language))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(EnterOrderPopup);
