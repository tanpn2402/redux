import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Form, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';
import * as FetchAPI from '../api/fetchAPI';


const user = [
    {
        email: 'linh@yahoo.com',
        name: 'Jordan Walke',
        clientID: 'linh',
        password: '123'
    },
]

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.props = {
            isLoginError: true,
        };
        this.params = {
            mvClientID: '',
            mvPassword: '',
            securitycode: '12345'
        }
        this.captchaURL = FetchAPI.getServerUrl() + "randomImage.jpg"
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoginError === false) {
            sessionApi.login(user[0]).then(response => {
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
        return (
            <div className="login-form">
                <div className="login-form-header">
                    <div className="login-logo mirae-logo" />
                    <div className="login-logo ttx-logo" />
                </div>

                <div className="login-form-footer">                 
                    <div className="divBranch">
                        <a id="headOffice" href="#">TRỤ SỞ CHÍNH:</a>
                        <p id="headOfficeData">Tầng 7, Tòa nhà Sài Gòn Royal, số 91 Pasteur, Phường Bến Nghé, Quận 1, Tp. Hồ Chí Minh
                            <br/> ĐT: 84-8-3-9102222 - Fax: 84-8-3-9107222</p>
                    </div>
                    <div className="divBranch">
                        <a id="hanoiBranch" href="#">CHI NHÁNH HÀ NỘI:</a>
                        <p id="hanoiBranchData">Tòa nhà Phương Nam Bank, lầu 4, 27 Hàng Bài, Quận Hoàn Kiếm, Hà Nội
                            <br/> ĐT: 84-4-62730541 - Fax: 84-4-62730544</p>
                    </div>
                    <div className="divCopyright">
                        <p id="copyrightData">© 2013 Bản quyền thuộc về CTCP Chứng khoán Mirae Asset (Việt Nam)</p>
                    </div>
                </div>
                
                <Form horizontal onSubmit={this.onSubmit} className="login">
                    <FormGroup controlId="formHorizontalUser">
                        <div sm={3}>
                            Username
                        </div>
                        <div className="inputgroup" sm={8}>
                            <span className="glyphicon glyphicon-user"></span>
                            <input type="text" name="username" className="form-control inputs" ref={node => { this.username = node }} />
                        </div>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPass">
                        <div sm={3}>
                            Password
                        </div>
                        <div className="inputgroup" sm={8}>
                            <span className="glyphicon glyphicon-lock"></span>
                            <input type="password" className="form-control inputs" name="password" ref={node => { this.password = node }} />
                        </div>
                    </FormGroup>
                    <FormGroup id="security-wrapper">
                            <img src={this.captchaURL} id="activateCodeImg" />
                            <input pattern="\d{4}" type="text" className="form-control" id="security" name="security" ref={node => { this.securitycode = node }} />
                    </FormGroup>
                    <FormGroup>
                            <div className="login-button-group">
                                <button className="hks-btn btn-login" type="submit">
                                    Login
                                </button>
                            </div>
                    </FormGroup>
                    <div className="msg">
                        {this.props.isLoginError && <div>Something Wrong</div>}
                    </div>
                </Form>
                
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
        isLoginError: state.dologin.isLoginError,
    };
}


const mapDispatchToProps = (dispatch, props) => ({
    login: (params) => {
        dispatch(actions.doLogin(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
