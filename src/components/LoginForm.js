import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Form, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';
import * as FetchAPI from '../api/fetchAPI';


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.params = {
            mvClientID: '',
            mvPassword: '',
            securitycode: '12345'
        }
        this.user = 
            {
                mvClientID: 'linh'
            }
        this.captchaURL = FetchAPI.getServerUrl() + "randomImage.jpg"
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.user.mvClientID = nextProps.mvClientID
        if (nextProps.loginResult.success) {
            sessionApi.login(this.user).then(response => {
                const { token, data } = response;
                sessionService.saveSession({ token })
                    .then(() => {
                        sessionService.saveUser(data)
                            .then(() => {
                                window.location.assign('/')
                            });
                    });
            });
        }
    }

    render() {
        let language = this.props.language.page
        console.log(language)
        return (
            <div className="login-form-wrapper">
                <div className="login-form-header">
                    <div id="company-logo" />
                </div>

                <div className="login-form-body">
                    <Form horizontal onSubmit={this.onSubmit} className="login-form">
                        <FormGroup>
                            <Col xs={4}>
                                {language.login.username}
                            </Col>
                            <Col xs={8}>
                                <input type="text" defaultValue="077C081111" autoComplete="off"
                                name="username" className="hks-input border" ref={node => { this.username = node }} />
                            </Col>
                            
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPass">
                            <Col xs={4}>
                                {language.login.password}
                            </Col>
                            <Col xs={8}>
                                <input type="password" defaultValue="123456" className="hks-input border" name="password" ref={node => { this.password = node }} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col xs={4}>
                            </Col>
                            <Col xs={8} id="security-image">
                                <img src={this.captchaURL} />
                            </Col>
                        </FormGroup>

                        <FormGroup id="security-input">
                            <Col xs={4}>
                                {language.login.securityCode}
                            </Col>
                            <Col xs={8}>
                                <input pattern="\d{4}" type="text" className="hks-input border" name="security" ref={node => { this.securitycode = node }} />
                            </Col>
                        </FormGroup>
                        
                        <div className="login-button-group">
                            <button className="hks-btn btn-login" type="submit">
                                {language.button.login}
                            </button>
                        </div>
                    </Form>
                    <div className="login-message">
                        {this.props.loginResult.mvMessage}
                    </div>
                </div>

                

                <div className="login-form-footer">                 
                    <Col sm={4}>
                        <h5> Hong Kong Head Office:</h5>
                        <p>21/F, Guangdong Finance Building, 88 Connaught Road West, Sheung Wan, Hong Kong
                            <br/> Phone: (+852) 2869-6346 - Fax: (+852) 2869-7998</p>
                    </Col>
                    <Col sm={4}>
                        <h5>Vietnam Office:</h5>
                        <p>5/F HBT Tower, 456-458 Hai Bai Trung Street, Tan Dinh Ward, Dist. 1, HCMC, Vietnam
                            <br/> Phone: 0283 848 4472</p>
                    </Col>
                    <Col sm={4}>
                        <p>©2017 TTL</p>
                    </Col>
                </div>
                
                
                
            </div>
        )
    }

    onSubmit(e) {
        e.preventDefault();
        this.params['mvClientID'] = this.username.value
        this.params['mvPassword'] = this.password.value
        this.params['securitycode'] = this.securitycode.value
        this.props.login(this.params)
    }
}

const mapStateToProps = (state) => {
    return {
        loginResult: state.dologin.result,
        mvClientID: state.dologin.mvClientID,
        language: state.config.language,
    };
}


const mapDispatchToProps = (dispatch, props) => ({
    login: (params) => {
        dispatch(actions.doLogin(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);