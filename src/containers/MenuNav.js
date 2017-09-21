import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"
import $ from 'jquery'
import SlideNav from './SlideNav'

class MenuNav extends Component {

    constructor(props) {
        super(props)

        this.tabbar = config.tabbar
    }

    render() {
        var activeTab = this.props.tabID
        var language = this.props.language
        return (
            <div className="scrolling-tabs-main tab-bar" id="pagemenu">
               <div className="scroll">
                    <div className="scrolling-tabs" id="scrolling-tabs">
                        <nav className='vertical-align-middle'>
                            {
                                this.tabbar.map(tab => {
                                    return ( 
                                        <div key={tab.id} className={'tabs-item ' + (tab.id === activeTab ? 'actived' : 'normal')}
                                            onClick={e=> this.onTabClick(tab.id)}>
                                           
                                                {language.tab[tab.id]}
                                                <button
                                                    className="hks-btn btn-tab-reload"
                                                    type="button"
                                                    onClick={e => this.onReloadPage(tab.id)}
                                                    >
                                                    <span className="glyphicon glyphicon-repeat"></span>
                                                </button>
                                            
                                        </div>
                                    )
                                })
                            }
                            
                        </nav>
                    </div>
                </div>
                <div className="scrolling-tabs-right">

                    <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)}>
                        <span className="glyphicon glyphicon-menu-right"></span>
                    </button>
                    <button className="hks-btn btn-save-layout" onClick={e => this.onTabSlideClick(2)}>
                        <span className="glyphicon glyphicon-floppy-saved"></span>
                        Save Layout
                    </button>
                </div>
            </div>
        )
    }

    componentDidMount(){
        window.addEventListener("keydown", this.myEventHandler, false)
    }

    onReloadPage(tabID){

    }

    onTabClick(tabID){
        this.props.onTabClick(tabID)
    }

}

const mapStateToProps = state => ({
    tabID: state.menuSelected.tabID
});

const mapDispatchToProps = (dispatch, props) => ({
    
    onRemoveTab: (menuid, pageid, tabList, reload) => {
        dispatch(actions.menuRemoved(menuid, pageid, tabList, reload));
    },

    onPageClicked: (pageid, tabList) => {
        dispatch(actions.onPageClicked(pageid, tabList));
    },
    onTabClick: (tabID) => {
        dispatch(actions.onTabClick(tabID));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuNav);   

