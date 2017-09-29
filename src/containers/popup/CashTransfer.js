import React, { Component } from 'react';
import {  Table, Modal,Button} from 'react-bootstrap';
import '../../css/App.css';
import CheckAuthenticationModal from './CheckAuthenticationModal';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class CashTransferPopup extends Component {
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
            <div>
                <Modal.Body>
                    <div>
                        {this.props.language.cashadvance.popup.message}
                    </div>
                </Modal.Body>
                {
                    this.props.authcard === false ? '' : <CheckAuthenticationModal language={this.props.language}/>
                }
                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{this.props.language.cashadvance.popup.cancel}</Button>
                    <Button className="submit" onClick={this.submit.bind(this)}> {this.props.language.cashadvance.popup.ok}</Button>
                </Modal.Footer>
            </div>
        );
    }

    submit(e){
        e.preventDefault();

        let authParams = {
            matrixKey01: document.getElementById("matrix-key01").value,
            matrixKey02: document.getElementById("matrix-key02").value,
            matrixValue01: document.getElementById("matrix-value01").value,
            matrixValue02: document.getElementById("matrix-value02").value,
            savedAuthen: document.getElementById("matrix-save-authen").checked,
        }
        this.props.submit(this.props.data, authParams , this.props.language)
    }


}

const mapStateToProps = (state) => {
    return {
        isAuthenFail: state.checkAuthen.isAuthenFail,
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    submit: (data, authParams, language) => {
        dispatch(actions.submitCashTransfer(data, authParams, language))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CashTransferPopup);
