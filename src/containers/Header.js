import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <div>
                
            </div>
        )
    }

   
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
