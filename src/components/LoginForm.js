import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import '../css/style.css';
import { Form, FormGroup, Col, ControlLabel, Button } from 'react-bootstrap';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        let { isLoginError } = this.props;

        return (
            <Form horizontal onSubmit={this.onSubmit} className="login">
                <FormGroup controlId="formHorizontalUser">
                    <Col componentClass={ControlLabel} sm={3}>
                        Username
                    </Col>
                    <Col sm={8}>
                        <input type="text" name="username" className="form-control" ref={node => { this.username = node }} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPass">
                    <Col componentClass={ControlLabel} sm={3}>
                        Password
                </Col>
                    <Col sm={8}>
                        <input type="password" className="form-control" name="password" ref={node => { this.password = node }} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button className="btn btn-default" type="submit">
                            Login
                        </Button>
                    </Col>
                </FormGroup>
                <div className="msg">
                    {isLoginError && <div>Something Wrong</div>}
                </div>
            </Form>
        )
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.login(this.username.value, this.password.value);
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginError: state.dologin.isLoginError,
    };
}


const mapDispatchToProps = (dispatch, props) => ({
    login: (username, password) => {
        dispatch(actions.doLogin(username, password))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);