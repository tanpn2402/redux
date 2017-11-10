import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import Header from './Header'
import MainContent from './MainContent'
import config from '../../core/config'
import { getLanguage, getTheme } from '../../utils'

class Home extends Component {
    constructor(props) {
        super(props)
        this.handleCheckSessionID = this.handleCheckSessionID.bind(this)
        this.state = {
            theme: getTheme(config.cache.theme),
            language: getLanguage(config.cache.lang)
        }
    }

    render() {
        return (
            <div>
                <Header
                    theme={this.state.theme}
                    language={this.state.language}
                />
                <MainContent
                    theme={this.state.theme}
                    language={this.state.language}
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            theme: getTheme(config.cache.theme),
            language: getLanguage(config.cache.lang)
        })
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

