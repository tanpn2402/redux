import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import Header from './Header'
import MainContent from './MainContent'
import config from '../../core/config'
import {getLanguage, getTheme } from '../../utils'

class Home extends Component {
    constructor(props) {
        super(props)
        this.handleCheckSessionID = this.handleCheckSessionID.bind(this)
    }

    render() {
        let theme = getTheme(config.cache.theme)
        let lang = getLanguage(config.cache.lang)
        // console.log("THEMEEEEEE")
        return (
            <div>
                <Header 
                    theme={theme}
                    language={lang}
                />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
