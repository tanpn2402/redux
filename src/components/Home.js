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
        this.handleCheckSessionID = this.handleCheckSessionID.bind(this)
        this.handleSetConfig = this.handleSetConfig.bind(this)
        this.state = {
            language: this.props.language,
            theme: this.props.theme
        }


        
        
    }

    componentWillMount() {
        // this.theme = require('../themes/' + this.props.theme)
        //console.log(this.theme)
        this.props.checkSession(this.handleCheckSessionID)
        this.params['mvAction'] = 'QUERYDEFAULT'
        this.props.onGetSavedContentLayout(this.params)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sessionState != null) {
            const logout = () => { this.props.logout(this.checkSessionID) }
            var message = ''
            switch (nextProps.sessionState) {
                case 'SYSTEM_MAINTENANCE':
                    message = this.props.language.page.messagebox.message.systemMaintain
                    break
                case "MULTI_USERS_LOGIN":
                    message = this.props.language.page.messagebox.message.multiUsers
                    break
                case "SESSION_EXPIRED":
                    message = this.props.language.page.messagebox.message.sessionExpired
                case "Time Out":
                    message = this.props.language.page.messagebox.message.sessionExpired
                    break
                case "Will time Out":
                    message = this.props.language.page.messagebox.message.willTimeOut
                    break
            }
            this.props.onShowMessageBox(this.props.language.page.messagebox.title.error, message, logout)
        }
        if (this.state.language !== nextProps.language && nextProps.language !== undefined) {
            this.setState({
                language: nextProps.language
            })
        }
        if (this.state.theme !== nextProps.theme && nextProps.theme !== undefined) {
            this.setState({
                theme: nextProps.theme
            })
        }

    }

    render() {
        //let { authenticated, user } = this.props

        
        this.theme = require('../themes/' + this.state.theme)
        this.handleSetConfig()
        return (
            <div>
                <Header theme={this.theme.default}
                    currentThemeName={this.state.theme}
                    currentLanguage={this.state.language.lang}
                    changeConfig={this.props.changeConfig}
                />
                <MenuNav language={this.state.language.page} theme={this.theme.default} />
                <MainContent theme={this.theme.default} language={this.state.language.page} title={this.state.language.page.menu} checkSessionID={this.checkSessionID} />


            </div>
        )
    }
    handleCheckSessionID(id) {
        this.checkSessionID = id
    }

    handleSetConfig() {
        if (this.props.savedcontent != undefined) {
            var savedContent = $.parseJSON(this.props.savedcontent.mvCfgList[0].SAVEDCONTENT)
            if (savedContent.windows == undefined) {
                config.tabbar = savedContent
            }
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated,
    language: state.config.language,
    theme: state.config.style,
    savedcontent: state.menuSelected.savedcontent,

    sessionState: state.config.sessionState
});

const mapDispatchToProps = (dispatch, props) => ({
    onGetSavedContentLayout: (params) => {
        dispatch(actions.getSavedContentLayout(params))
    },
    checkSession: (handleCheckSessionID) => { dispatch(actions.checkSession(handleCheckSessionID)) },
    changeConfig: (lang, theme) => { dispatch(actions.changeConfig(lang, theme)) },
    onShowMessageBox: (type, message, handleFunction) => {
        dispatch(actions.showMessageBox(type, message, handleFunction))
    },
    logout: (id) => { dispatch(actions.logout(id)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

