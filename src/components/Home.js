import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MenuBar from '../containers/MenuBar'
import PageContent from '../containers/PageContent'
import Header from '../containers/Header'

class Home extends Component {

    // constructor(props) {
    //     super(props)    
    // }

    componentWillMount(){
    //  this.theme = require('../themes/' + this.props.theme)
        
    }

    render() {
        this.theme = require('../themes/' + this.props.theme)
        return (
            <div>
                <Header theme={this.theme.default} 
                currentThemeName={this.props.theme} 
                currentLanguage={this.props.language.lang}
                changeConfig={this.props.changeConfig} 
                />  
                <MenuBar language= {this.props.language.page.menu} theme={this.theme.default}/>
                <PageContent theme={this.theme.default} language= {this.props.language.page.pagecontent} title={this.props.language.page.menu}/>
            {/* <ul>
                <li><a href="#" data-target="#" onClick={switchLanguage.bind(this,'en')}>EN</a></li>
                <li><a href="#" data-target="#" onClick={switchLanguage.bind(this,'vi')}>VI</a></li>
            </ul> */}
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

