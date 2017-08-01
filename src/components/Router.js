import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import App from '../components/App';
import LoginForm from '../components/LoginForm';

class Router extends Component {
    render() {
        return (
            <div>
                {this.props.isLoginSuccess ? <App /> : <LoginForm />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.dologin.isLoginSuccess
    };
}

export default connect(mapStateToProps)(Router);

