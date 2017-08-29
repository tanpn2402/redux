import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import PageContent from '../containers/PageContent'
import Header from '../containers/Header'
import MenuNav from '../containers/MenuNav'
import MainContent from '../containers/MainContent'

class Home extends Component {

    // constructor(props) {
    //     super(props)        
    // }

    componentWillMount(){
       // this.theme = require('../themes/' + this.props.theme)
        //console.log(this.theme)
    }

    render() {
        //let { authenticated, user } = this.props
        console.log(this.props.language)
        this.theme = require('../themes/' + this.props.theme)
        return (
            <div>
                <Header theme={this.theme.default} 
                currentThemeName={this.props.theme} 
                currentLanguage={this.props.language.lang}
                changeConfig={this.props.changeConfig} 
                />  
                <MenuNav language= {this.props.language.page.menu} theme={this.theme.default}/>
                <MainContent theme={this.theme.default} language={this.props.language.page} title={this.props.language.page.menu} />

                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated,
    language: state.config.language,
    theme: state.config.style,
});

const mapDispatchToProps = (dispatch, props) => ({
    changeConfig: (lang, theme) => {dispatch(actions.changeConfig(lang,theme))},
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

