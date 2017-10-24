import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import { browserHistory } from 'react-router';
class App extends React.Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.loginStatus !== "SUCCESS"){
            browserHistory.replace('/login');
        }
    }

    render() {
        console.log(this.props.loginStatus)
        if( this.props.loginStatus === "SUCCESS" ){
            return (
                <Home />
            )
        } else {
            return (
                <div className="loading">
                    <img src={require('../assets/images/loading.gif')} />
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    loginStatus: state.dologin.loginStatus
});
export default connect(mapStateToProps)(App);