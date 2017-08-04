import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import MenuBar from '../containers/MenuBar'
import PageContent from '../containers/PageContent'
import Header from '../containers/Header'

class House extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    render() {
        let { authenticated, user } = this.props;
        const content = this.props.content;
        const switchLanguage = this.props.switchLanguage;

        return (
            <div>
                <Header />
                <MenuBar data= {content.page.menu}/>
                <PageContent />
<ul>
           <li><a href="#" data-target="#" onClick={switchLanguage.bind(this,'en')}>EN</a></li>
              <li><a href="#" data-target="#" onClick={switchLanguage.bind(this,'vi')}>VI</a></li>
              </ul>
            </div>
        )
    }

    onClick(e) {
        e.preventDefault();
        this.props.logout();
    }
}

const mapStateToProps = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated,
    content: state.lang_reducers.content
});

const mapDispatchToProps = (dispatch, props) => ({
    logout: () => {
        dispatch(actions.logout())
    },
    switchLanguage: (lang) => {dispatch(actions.switchLanguage(lang))}
})

export default connect(mapStateToProps, mapDispatchToProps)(House);
