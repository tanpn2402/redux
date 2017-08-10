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
        this.theme = require('../themes/' + this.props.theme)
        //console.log(this.theme)
    }

    render() {
        //let { authenticated, user } = this.props

        return (
            <div>
                <Header theme={this.theme.default} switchLanguage={this.props.switchLanguage}/>
                <MenuBar language= {this.props.language.page.menu} theme={this.theme.default}/>
                <PageContent theme={this.theme.default} language= {this.props.language.page.pagecontent}/>
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
    switchLanguage: (lang) => {dispatch(actions.changeConfig(lang, 'dark'))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

