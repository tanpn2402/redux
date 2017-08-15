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
                    <tbody>
                        <tr> 
                        <th className="enterorder">{this.props.language.enterorder.popup.checknum}</th>
                            <td id="code1"> [{this.generateNum()},{this.generateChar()}] </td>
                            <td id="code2"> [{this.generateNum()},{this.generateChar()}] </td>
                        </tr>
                        <tr>
                        <th className="enterorder">{this.props.language.enterorder.popup.verifiednum}</th>
                            <td>
                                <input type="text" maxLength="1" id="input1" required/>
                            </td>
                            <td> 
                                <input type="text" maxLength="1" id="input2" required/>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td colSpan="2">
                                <input type="checkbox" id="saveAuthen" /> {this.props.language.enterorder.popup.saveauthentication}
                            </td>
                        </tr>
                    </tbody>
            
        );
    }
}




export default (CheckAuthenticationModal);
