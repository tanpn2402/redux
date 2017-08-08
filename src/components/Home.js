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
    }
     
    render() {
        return (
            <div>
                <MenuBar data= {this.props.language.page.menu} theme={this.theme.default}/>
                <PageContent theme={this.theme.default}/>
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
  // switchLanguage: (lang, style) => {dispatch(actions.changeConfig(lang, style))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

