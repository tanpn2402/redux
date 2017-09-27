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
        this.params = {}
    }

    render() {
        var activeTab = this.props.tabID
        var language = this.props.language
        if(this.props.savedcontent != undefined){
            config.tabbar = $.parseJSON(this.props.savedcontent.mvCfgList[0].SAVEDCONTENT)
        }
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
                                           
                                                {language.tab[tab.title]}
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
                    <button className="hks-btn btn-save-layout" onClick={e => this.saveLayout()}>
                        <span className="glyphicon glyphicon-floppy-disk" style={{margin: '0 1px'}}></span>
                        Save Layout
                    </button>
                </div>
            </div>
        )
    }

    componentWillMount(){
        this.params['mvAction'] = 'QUERYDEFAULT'
        this.props.onGetSavedContentLayout(this.params)
    }

    componentDidMount(){
        window.addEventListener("keydown", this.myEventHandler, false)
    }

    onReloadPage(tabID){

    }

    onTabClick(tabID){
        this.props.onTabClick(tabID)
    }

    onTabSlideClick(){

    }

    saveLayout(){
        const groupId = this.props.savedcontent.mvCfgList[0].GROUPID
        this.params['mvGroupName'] = 'User1'
        this.params['mvIsDefault'] = 'Y'
        this.params['mvGroupType'] = 'U'
        this.params['mvGroupID'] = groupId
        this.params['mvSavedContent'] = JSON.stringify(config.tabbar)
        this.params['mvAction'] = 'MODIFY'
        this.props.onSaveLayout(this.params)
    }

}

const mapStateToProps = (state, props) => {
    return {
        tabID: state.menuSelected.tabID,
        savedcontent: state.menuSelected.savedcontent
    }
    
}

const mapDispatchToProps = (dispatch, props) => ({
    onGetSavedContentLayout: (params) => {
        dispatch(actions.getSavedContentLayout(params))
    },
    onSaveLayout: (params) => {
        dispatch(actions.saveLayout(params))
    },
    onRemoveTab: (menuid, pageid, tabList, reload) => {
        dispatch(actions.menuRemoved(menuid, pageid, tabList, reload));
    },
    onPageClicked: (pageid, tabList) => {
        dispatch(actions.onPageClicked(pageid, tabList));
    },
    onTabClick: (tabID) => {
        dispatch(actions.onTabClick(tabID));
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuNav);   

