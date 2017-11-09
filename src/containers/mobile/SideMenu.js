import React, { Component } from 'react'
import config from '../../core/config'
import { connect } from "react-redux"
import * as actions from "../../actions"

class Item extends Component {
    render() {
        return (
            
            <ul id={this.props.id} className="nav nav-list tree sidemenu-list-item collapse in" aria-expanded="true">
                {
                    this.props.items.map(item => {
                        return (
                            <li key={item.id}>
                                <p id={item.id} className="sidemenu-item"
                                    onClick={this.props.onMenuSelected}>
                                    {this.props.language[item.text]}
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
            
        );
    }
}

class MenuItem extends Component {
    constructor(props) {
        super(props)

        this.minus = 'glyphicon glyphicon-minus'
        this.expand = 'glyphicon glyphicon-plus'

        this.state = {
            expanded: true
        }
    }
    render() {
        return (
            <div className="sidemenu-menuitem">
                <div data-toggle="collapse" data-target={'#' + this.props.id} 
                    className="sidemenu-label" onClick={e => this.onClick()}>
                    <span className={this.state.expanded ? this.minus : this.expand}></span>
                    <label aria-expanded={this.state.expanded}>{this.props.text}</label>
                </div>
                    <Item 
                        items={this.props.subitems} 
                        id={this.props.id} 
                        language={this.props.language} 
                        onMenuSelected={this.props.onMenuSelected}/>
            </div>
        );
    }

    onClick() {
        this.setState({ expanded: !this.state.expanded })
    }
}

class SideMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuitem : config.menu_items

        }

        console.log(config.menu_items)
    }

    render() {
        let language = this.props.language.page.menu
        return (
            <div className={"sidemenu " + (this.props.openMenu ? 'open' : 'hide')}>
                <div className="sidemenu-outer" onClick={e => this.onCloseMenu()}> </div>
                <div className="sidemenu-wrapper">
                    {/* <div className="sidemenu-body">
                        {
                            this.state.menuitem.map(item => {
                                return(
                                    <MenuItem 
                                        id={item.id} 
                                        subitems={item.subitems} 
                                        language={language} 
                                        text={language[item.text]} 
                                        onMenuSelected={this.onMenuSelected.bind(this)}/>
                                )
                            })
                        }
                    </div>
                    <div className="sidemenu-footer">
                        <div className="setting">
                            <span className="glyphicon glyphicon-cog"></span>
                            <label>Setting</label>
                        </div>

                        <div className="logout" onClick={e => this.onLogOut()}>
                            <span className="glyphicon glyphicon-log-out"></span>
                            <label>Log out</label>
                        </div>

                    </div> */}
                </div>


                
                    
          
            </div>
        );
    }

    onCloseMenu() {
        this.props.onCloseMenu(false)
    }

    onMenuSelected(e) {
        var id = e.target.id
        this.props.onMobileMenuSelect(id)
        this.props.reloadCustom(this.props.load)
    }

    onChange(e) {
        
    }

    onLogOut() {
        this.props.showDialog({
            data: {checkSessionID: this.props.checkSessionID},
            title: this.props.language.page.menu.savelayout,
            language: this.props.language.page,
            id: 'savelayout',
            authcard: false
        })
    }
}

const mapStateToProps = state => ({
    openMenu: state.menuSelected.openMenu,
    load: state.menuSelected.load,
});

const mapDispatchToProps = (dispatch, props) => ({
    onMobileMenuSelect: (id) => {
        dispatch(actions.onMobileMenuSelect(id));
    },
    reloadCustom: (load) => {
        dispatch(actions.reloadCustom(load))
    },
    onCloseMenu: (open) => { 
        dispatch(actions.openSideMenu(open)) 
    },
    showDialog: (param) => {
        dispatch(actions.showPopup(param))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)