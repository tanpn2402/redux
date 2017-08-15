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
        this.props.checkAuthen(code1, code2, input1, input2);
    }

    render() {
        return (
            <div>
                <Modal.Body>
                    <Table responsive bordered>
                        <tbody >
                            <tr>
                                <th className="enterorder">Stock Code </th>
                                <td colSpan="2">{this.props.json.mvStock}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">Stock Name </th>
                                <td colSpan="2">{this.props.mvStockBean.mvStockName}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">Price </th>
                                <td colSpan="2">{this.props.json.mvPrice}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">Volume </th>
                                <td colSpan="2">{this.props.json.mvVolume}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">Order Type </th>
                                <td colSpan="2">{this.props.json.mvOrderType}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">Value </th>
                                <td colSpan="2">{this.props.json.mvTotalPrice}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">Date </th>
                                <td colSpan="2">{this.props.json.mvDate}</td>
                            </tr>
                        </tbody>
                        <CheckAuthenticationModal />
                    </Table>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button onClick={this.checkAuthentication}> Submit</Button>
                </Modal.Footer>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch, props) => ({
    checkAuthen: (code1, code2, input1, input2) => {
        dispatch(actions.checkAuthen(code1, code2, input1, input2))
    }
})

export default connect(null,mapDispatchToProps)(EnterOrderPopup);