import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Form, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';

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
                                browserHistory.replace('/');
                            });
                    });
            });
        }
    }

    render() {
        return (
            <div className="login-form">
                <Form horizontal onSubmit={this.onSubmit} className="login">
                    <FormGroup controlId="formHorizontalUser">
                        <Col componentClass={ControlLabel} sm={3}>
                            Username
                        </Col>
                        <Col sm={8}>
                            <input type="text" name="username" className="form-control inputs" ref={node => { this.username = node }} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPass">
                        <Col componentClass={ControlLabel} sm={3}>
                            Password
                    </Col>
                        <Col sm={8}>
                            <input type="password" className="form-control inputs" name="password" ref={node => { this.password = node }} />
                        </Col>
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
        this.props.login(this.params);
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
