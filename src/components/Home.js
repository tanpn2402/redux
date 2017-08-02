import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    render() {
        let { authenticated, user } = this.props;

        return (
            <div>
                <h3>Welcome {user.email}, {user.name}</h3>
                <h5>{authenticated ? 'You are authenticated :)' : 'Error'}</h5>
                <button onClick={this.onClick}>
                    LOGOUT
                </button>
            </div>
        )
    }

    onClick(e) {
        e.preventDefault();
        this.props.logout();
    }
}

const mapStateToProps = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated
});

const mapDispatchToProps = (dispatch, props) => ({
    logout: () => {
        dispatch(actions.logout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
