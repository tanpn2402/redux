import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import PageContent from '../containers/PageContent'
import Header from '../containers/Header'
import MenuNav from '../containers/MenuNav'
import MainContent from '../containers/MainContent'

export class Captcha extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render() {
        return(
            <div className="captcha-box">
                <img src={this.props.capImg} id="activateCodeImg" width="100px" height="24px"/>
            </div>
        )
    }

}




const mapStateToProps = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated,
    language: state.config.language,
    theme: state.config.style,

    session: state.config.session
});

const mapDispatchToProps = (dispatch, props) => ({
    checkSession: () => {dispatch(actions.checkSession())},
    changeConfig: (lang, theme) => {dispatch(actions.changeConfig(lang,theme))},
})

export default connect(mapStateToProps, mapDispatchToProps)(Captcha);

