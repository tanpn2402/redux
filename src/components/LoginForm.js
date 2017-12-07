import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Form, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';
import * as FetchAPI from '../api/fetchAPI';
import {getLanguage} from '../utils'
import config from '../core/config'
import Select from "../containers/commons/Select"

// const OptionComponent = ({ option }) => {
//     console.log(option)
//     let s = "../assets/images/flags/flag_viet.jpg"
//     let x  = require(s)
//     return (
//         <div>
//             <img className="flag" src={x} />
//             {option.name} {option.text}
//         </div>
//     )
// };

// const SelectedOptionComponent = ({ option }) => (
//     <b style={{ color: 'orange' }}>
        
//     </b>
// );


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.params1 = {
            chanelID: 'MOB',
            clientID: '',
            tradingAccSeq: '',
            password: '',
            // encrypt: '',
            // externalPassword: '12345',
            // isFX: '',
            // clientIP: '',
            language: ''
        }

        this.state = {
            language: "",
            mvLanguage: config.language[0]
        }
        this.params = {
            mvClientID: '',
            mvPassword: '',
            securitycode: '12345'
        }

        this.captchaURL = FetchAPI.getServerUrl() + "randomImage.jpg"
        this.onSubmit = this.onSubmit.bind(this);

        this.loginMethod = config.loginBy;
    }

    componentWillReceiveProps(nextProps) {
       
        if (nextProps.loginResult && nextProps.loginResult.success) {
            // go to home
            window.location.assign('/')
        }
        this.setState({language: nextProps.language})
    }

    handleChange = ({ option }) => {
        this.setState({ language: option });
      };

    render() {
        let language = getLanguage(this.state.language).page
        let configLang = config.language
        

        let userForm;
        if(this.loginMethod == "subAccount") {
            userForm = <FormGroup>
                            <div className="col-xs-4 title">
                                {language.login.subaccount}
                            </div>
                            <Col xs={8}>
                                <input type="text" defaultValue="077" autoComplete="off"
                                name="username" className="hks-input border" ref={node => { this.subAccount = node }} />
                            </Col>
                        </FormGroup>
        }
        else if(this.loginMethod == "username") {
            userForm = <FormGroup>
                            <div className="col-xs-4 title">
                                {language.login.username}
                            </div>
                            <Col xs={8}>
                                <input type="text" defaultValue="077" autoComplete="off"
                                name="username" className="hks-input border" ref={node => { this.username = node }} />
                            </Col>
                        </FormGroup>
        }
        else {
            userForm = <FormGroup>
                            <div className="col-xs-4 title">
                                {language.login.clientid}
                            </div>
                            <Col xs={8}>
                                <input type="text" defaultValue="077" autoComplete="off"
                                name="username" className="hks-input border" ref={node => { this.clientID = node }} />
                            </Col>
                        </FormGroup>
        }
        return (
            <div className="login">
                <div className="login-wrapper">
                    <div className="login-header">
                        <div className="logo">
                            <img src={require("../assets/images/logo_main_ttl.png")} />
                        </div>
                        <div className="language-selector">
                           

                            {/* <Select
                                ket="rStockSelector"
                                options={configLang}
                                selected={this.state.mvLanguage}
                                optionLabelPath={'text'}
                                optionComponent={<OptionComponent />}
                                selectedOptionComponent={<SelectedOptionComponent />}
                                handleChange={this.handleChange.bind(this)}
                            /> */}
                        </div>
                    </div>
                    <div className="login-body">
                        <h3>GIAO DỊCH TRỰC TUYẾN</h3>
                        <Form horizontal onSubmit={this.onSubmit} className="login-form">
                            {userForm}
                            <FormGroup>
                                <div className="col-xs-4 title">
                                    {language.login.password}
                                </div>
                                <Col xs={8}>
                                    <input type="password" defaultValue="" className="hks-input border" name="password" ref={node => { this.password = node }} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <div className="col-xs-4 title">
                                    {language.login.securityCode}
                                </div>
                                <Col xs={8}>
                                    <input pattern="\d{4}" type="text" className="hks-input border security-input" name="security" ref={node => { this.securitycode = node }} />
                                    <img className="security-image" src={this.captchaURL} />
                                </Col>
                                
                            </FormGroup>

                            
                            
                            <div className="login-button-group">
                                <button className={"hks-btn btn-login" + (this.props.loginStatus === "ERROR" ? " disabled" : "")} 
                                    type="submit" disabled={this.props.loginStatus === "ERROR" ? true : false}>
                                    {language.button.login}
                                </button>
                            </div>
                        </Form>
                    </div>
                    <div className="login-footer">
                        <ul className="links">
                            <li><a href="#">Hướng dẫn</a></li>	
                            <li><a href="#">Hỗ trợ</a></li>	
                            <li><a href="#">Bảo mật</a></li>	
                            <li><a href="#">Đ.khoản sử dụng</a></li>
                        </ul>

                        <div className="about">
                            <strong>TRỤ SỞ CHÍNH</strong>
                            <div>
                                Tòa nhà Le Meridien, Tầng 7, 3C Tôn Đức Thắng, Phường Bến Nghé, 
                                Quận 1, Tp. Hồ Chí Minh
                                ĐT: 84-28-39102222 Fax: 84-28-39107222
                            </div>
                            <strong>TRỤ SỞ CHÍNH</strong>
                            <div>
                                Tòa nhà Le Meridien, Tầng 7, 3C Tôn Đức Thắng, Phường Bến Nghé, 
                                Quận 1, Tp. Hồ Chí Minh
                                ĐT: 84-28-39102222 Fax: 84-28-39107222
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    onLanguageChange(val) {
        this.params.language = val
        this.setState({language: val})
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.loginMethod == "subAccount") {
            this.params1["subAccountID"] = this.subAccount.value
        }
        else if(this.loginMethod == "username") {
            this.params1["username"] = this.username.value
        }
        else {
            this.params1["clientID"] = this.clientID.value

            this.params['mvClientID'] = this.clientID.value
        }

        
        this.params['mvPassword'] = this.password.value
        this.params['securitycode'] = this.securitycode.value
        this.props.login(this.params)
    }
}

const mapStateToProps = (state) => {
    return {
        loginResult: state.dologin.loginResult,
        language: state.config.language,
        loginStatus: state.dologin.loginStatus
    };
}


const mapDispatchToProps = (dispatch, props) => ({
    login: (params) => {
        dispatch(actions.doLogin(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);