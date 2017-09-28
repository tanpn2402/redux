import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import PageContent from '../containers/PageContent'
import Header from '../containers/Header'
import MenuNav from '../containers/MenuNav'
import MainContent from '../containers/MainContent'
import $ from 'jquery'
import config from '../core/config'

class Home extends Component {

    constructor(props) {
        super(props)   
        this.params = {}     
    }

    componentWillMount(){
       // this.theme = require('../themes/' + this.props.theme)
        //console.log(this.theme)
        this.props.checkSession()
    }

    render() {
        //let { authenticated, user } = this.props
        console.log(this.props.language)
        this.theme = require('../themes/' + this.props.theme)
        if(this.props.savedcontent != undefined){
            var savedContent = $.parseJSON(this.props.savedcontent.mvCfgList[0].SAVEDCONTENT)
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', config.tabbar)
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', savedContent)
            console.log(config.tabbar==savedContent)
            config.tabbar = savedContent
            console.log(config.tabbar)
        }
        return (
            <div>
                <Header theme={this.theme.default} 
                currentThemeName={this.props.theme} 
                currentLanguage={this.props.language.lang}
                changeConfig={this.props.changeConfig} 
                />  
                <MenuNav language= {this.props.language.page} theme={this.theme.default}/>
                <MainContent theme={this.theme.default} language={this.props.language.page} title={this.props.language.page.menu} />

                
            </div>
        )
    }

    componenWillMount(){
        this.params['mvAction'] = 'QUERYDEFAULT'
        this.props.onGetSavedContentLayout(this.params)
    }
}

const mapStateToProps = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated,
    language: state.config.language,
    theme: state.config.style,
    savedcontent: state.menuSelected.savedcontent,
    
    session: state.config.session
});

const mapDispatchToProps = (dispatch, props) => ({
    onGetSavedContentLayout: (params) => {
        dispatch(actions.getSavedContentLayout(params))
    },
    checkSession: () => {dispatch(actions.checkSession())},
    changeConfig: (lang, theme) => {dispatch(actions.changeConfig(lang,theme))},
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

