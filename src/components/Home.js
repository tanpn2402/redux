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

        return (
            <div>
                <Header />
                <MenuBar />
                <PageContent />
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
    authenticated: state.session.authenticated
});

const mapDispatchToProps = (dispatch, props) => ({
    logout: () => {
        dispatch(actions.logout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(House);
