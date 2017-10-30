import React from 'react';
import { Router, Route,IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Login from './LoginForm';
import * as actions from '../actions';
import { connect } from 'react-redux';

class AppRouter extends React.Component {
    constructor(){
        super()
        this.checkAuth = this.checkAuth.bind(this)
    }

    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/" onEnter={this.checkAuth}>
                    <IndexRoute component={App} />
                    <Route path="/login" component={Login} />
                </Route>
            </Router>
        )
    }

    checkAuth(){
        this.props.checkAuth()
    }
}
const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch, props) => ({
    checkAuth: () => {
        dispatch(actions.checkAuth())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);