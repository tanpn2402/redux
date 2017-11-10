import React from 'react';
import { connect } from 'react-redux';
import HomeDesktop from '../containers/desktop/Home';
import HomeMobile from '../containers/mobile/Home';
import { browserHistory } from 'react-router';
import config from '../core/config';
import * as actions from '../actions/index';

class App extends React.Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.loginStatus !== "SUCCESS"){
            browserHistory.replace('/login');
        }
    }

    render() {
        
        if( this.props.loginStatus === "SUCCESS" ){
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                return (
                    <HomeMobile/>
                )
            }
            else {
                return (
                    <HomeDesktop/>
                )
            }
            
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
const mapDispatchToProps = (dispatch, props) => ({
    // onTabClick: (tabID) => {
    //     dispatch(actions.onTabClick(tabID));
    // }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);