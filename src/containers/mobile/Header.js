import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'
import $ from 'jquery'
import * as actions from '../../actions/index'


const styles = {
    "light": {
        background: {
            backgroundColor: "rgb(240, 240, 240)",
            borderBottom: "1px solid #dddddd"
        },
        logo: {
            backgroundColor: "#FFF",
            color: "#bc0000"
        },
        menuicon: {
            backgroundColor: "transparent",
            color: "#bc0000"
        },
        searchicon: {
            backgroundColor: "transparent",
            color: "#666"
        }
    },
    "dark": {
        background: {
            backgroundColor: "rgb(31, 31, 31)",
            borderBottom: "0px"
        },
        logo: {
            backgroundColor: "#000",
            color: "#FFF"
        },
        menuicon: {
            backgroundColor: "transparent",
            color: "#FFF"
        },
        searchicon: {
            backgroundColor: "transparent",
            color: "#FFF"
        }
    }
}


class Header extends React.Component {
	constructor() {
		super()

        this.menuIcon = "glyphicon glyphicon-menu-hamburger"
        this.closeIcon = "glyphicon glyphicon-remove"

	}

	render() {
        let pageHeader = this.props.theme.page.pageHeader
        
        let theme = this.props.theme
        let style = styles[theme.title]
        if(style == undefined) {
            style = styles["light"]
        }


		return (
			<div id="pageheader" style={Object.assign({}, pageHeader, style.background)} className="header-mobi">
            
                <div className="header-logo" style={style.logo}>
                    TTL
                </div>
				<div className="header-menu" style={style.menuicon}>
                    <span className={this.props.openMenu ? this.closeIcon : this.menuIcon} onClick={e => this.onOpenMenu()}></span>
				</div>
                <div className="header-search" style={style.searchicon}>
                    <span className="glyphicon glyphicon-search" onClick={e => this.onOpenSearch()}></span>
                </div>
                <div className="header-account" style={style.searchicon}>
                    <span className="glyphicon glyphicon-user" onClick={e => this.onOpenAccountInfo()}></span>
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
    onOpenAccountInfo() {
        this.props.showAccountInfo({
            data: {
                theme: this.props.theme,
                language: this.props.language
            },
            title: "Account Info",
            id: "accountinfo",
            theme: this.props.theme,
            language: this.props.language
        })
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
    showAccountInfo: (param) => {
        dispatch(actions.showPopup(param))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)