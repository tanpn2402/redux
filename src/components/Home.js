import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import PageContent from '../containers/PageContent'
import Header from '../containers/Header'
import MenuNav from '../containers/MenuNav'
import MainContent from '../containers/MainContent'
import $ from 'jquery'
import config from '../core/config'
import {getLanguage, getTheme } from '../utils'

class Home extends Component {
    /*
    This component only reRender when:
    - F5
    - change Theme, Language
    */
    constructor(props) {
        super(props)
        this.handleCheckSessionID = this.handleCheckSessionID.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        
    }

    render() {
        // we do not use state at here
        // we use state to reload this component
        let theme = getTheme(config.cache.theme)
        let lang = getLanguage(config.cache.lang)

        return (
            <div>
                <Header 
                    theme={theme}
                    language={lang}
                />
                <MenuNav 
                    language={lang} 
                    theme={theme} />
                <MainContent 
                    theme={theme} 
                    language={lang}
                    checkSessionID={this.checkSessionID} />


            </div>
        )
    }

    handleCheckSessionID(id) {
        this.checkSessionID = id
    }

    componentDidMount() {
        this.props.checkSession(this.handleCheckSessionID)
    }
}

const mapStateToProps = (state) => ({
    language: state.config.language,
    theme: state.config.style
});

const mapDispatchToProps = (dispatch, props) => ({
    checkSession: (handleCheckSessionID) => { 
        dispatch(actions.checkSession(handleCheckSessionID)) 
    },
    onShowMessageBox: (type, message, handleFunction) => {
        dispatch(actions.showMessageBox(type, message, handleFunction))
    },
    onLogout: (id) => { 
        dispatch(actions.doLogout(id)) 
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

