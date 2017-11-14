import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'
import $ from 'jquery'
import * as actions from '../../actions/index'
class Header extends React.Component {
	constructor() {
		super()

        this.menuIcon = "glyphicon glyphicon-menu-hamburger"
        this.closeIcon = "glyphicon glyphicon-remove"

	}

	render() {
		let pageHeader = this.props.theme.page.pageHeader
		return (
			<div id="pageheader" style={pageHeader} className="header-mobi">
            
                <div className="header-logo">
                    GSL
                </div>
				<div className="header-menu">
                    <span className={this.props.openMenu ? this.closeIcon : this.menuIcon} onClick={e => this.onOpenMenu()}></span>
				</div>

                <div className="header-search">
                    <span className="glyphicon glyphicon-search" onClick={e => this.onOpenSearch()}></span>
                </div>
                
			</div>
		)
    }
    
    onOpenMenu() {
        this.props.onOpenMenu()
        this.props.onOpenSearch(false)
    }

    onOpenSearch() {
        this.props.onOpenSearch()
        this.props.onOpenMenu(false)
    }
}


const mapStateToProps = state => ({
    openSearch: state.menuSelected.openSearch,
    openMenu: state.menuSelected.openMenu,
    
});

const mapDispatchToProps = (dispatch, props) => ({
    onOpenMenu: (open) => { 
        dispatch(actions.openSideMenu(open)) 
    },
    onOpenSearch: (open) => { 
        dispatch(actions.openSearch(open)) 
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)