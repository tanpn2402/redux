import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';


class CheckAuthenticationModal extends Component {
    
    constructor(props) {
        super(props)

        this.defaultParam = {
            matrixKey01: '[5,A]',
            matrixKey02: '[4,F]',
            matrixValue01: '7',
            matrixValue02: '4',
            savedAuthen: false,
        }

        // if(this.props.ref !== undefined){
        //     this.props.ref = this
        // }
    }

    generateChar() {
        const char = "ABCDEFG";
        return char.charAt(Math.floor(Math.random() * char.length));
    }

    generateNum() {
        const num = "1234567";
        return num.charAt(Math.floor(Math.random() * num.length));
    } 


    getParam(){
        if(this.props.authType){
            return {
                matrixKey01: document.getElementById("matrix-key01").value,
                matrixKey02: document.getElementById("matrix-key02").value,
                matrixValue01: document.getElementById("matrix-value01").value.toUpperCase(),
                matrixValue02: document.getElementById("matrix-value02").value.toUpperCase(),
                savedAuthen: document.getElementById("matrix-save-authen").checked,
            }
        }else{
            return this.defaultParam
        }
    }

    render() {
        if(this.props.authType){
            return (
                <div className="auth-cardmatrix">
                    <div className="auth-content">
                        <div className="auth-title">{this.props.language.enterorder.popup.comfirm} </div>
                        <Col xs={4}>
                            {this.props.language.enterorder.popup.checknum}
                        </Col>
                        <Col xs={4} style={{textAlign: 'center'}}>
                            <input className="auth-matrix-key" id="matrix-key01" value={ '[' + this.generateNum() + ',' + this.generateChar() + ']' } readonly />
                        </Col>
                        <Col xs={4} style={{textAlign: 'center'}}>
                            <input className="auth-matrix-key" id="matrix-key02" value={ '[' + this.generateNum() + ',' + this.generateChar() + ']' } readonly />
                        </Col>

                        <Col xs={4}>
                            {this.props.language.enterorder.popup.verifiednum}
                        </Col>
                        <Col xs={4} style={{textAlign: 'center'}}>
                            <input className="auth-matrix-value" maxLength="1" id="matrix-value01" required/>
                        </Col>
                        <Col xs={4} style={{textAlign: 'center'}}>
                            <input className="auth-matrix-value" maxLength="1" id="matrix-value02" required/>
                        </Col>

                        <div className="clearfix"></div>
                        <div>
                            <input type="checkbox" id="matrix-save-authen" /> {this.props.language.enterorder.popup.saveauthentication}
                        </div>
                    </div>
                    
                </div>
            );
        }else{
            return ( <div></div>)
        }
    }
}




export default (CheckAuthenticationModal);
