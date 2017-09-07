import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';


class CheckAuthenticationModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = { };
        // this.checkAuthentication = this.checkAuthentication.bind(this);
    }

    generateChar() {
        const char = "ABCDEFG";
        return char.charAt(Math.floor(Math.random() * char.length));
    }

    generateNum() {
        const num = "1234567";
        return num.charAt(Math.floor(Math.random() * num.length));
    } 

    // checkAuthentication(e) {
    //     // Prevent from reloading page when submit
    //     e.preventDefault();
    //     const code1 = document.getElementById("code1").innerText;
    //     const code2 = document.getElementById("code2").innerText;
    //     this.props.checkAuthen(code1, code2, this.input1.value, this.input2.value);
    // }

    render() {
        let { isAuthenFail } = this.props;
        return (
            <div className="auth-cardmatrix">
                <div className="auth-content">
                    <div className="auth-title">{this.props.language.enterorder.popup.comfirm} </div>
                    <Col xs={4}>
                        {this.props.language.enterorder.popup.checknum}
                    </Col>
                    <Col xs={4} style={{textAlign: 'center'}}>
                        [{this.generateNum()},{this.generateChar()}]
                    </Col>
                    <Col xs={4} style={{textAlign: 'center'}}>
                        [{this.generateNum()},{this.generateChar()}]
                    </Col>

                    <Col xs={4}>
                        {this.props.language.enterorder.popup.verifiednum}
                    </Col>
                    <Col xs={4} style={{textAlign: 'center'}}>
                        <input type="text" maxLength="1" id="input1" required/>
                    </Col>
                    <Col xs={4} style={{textAlign: 'center'}}>
                        <input type="text" maxLength="1" id="input2" required/>
                    </Col>

                    <div className="clearfix"></div>
                    <div>
                        <input type="checkbox" id="saveAuthen" /> {this.props.language.enterorder.popup.saveauthentication}
                    </div>
                </div>
                
            </div>
        );
    }
}




export default (CheckAuthenticationModal);
