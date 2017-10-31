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
        console.log(this.tabbar)
    }

    render() {
        var activeTab = this.props.tabID
        var language = this.props.language.page
        let pagemenu = this.props.theme.page.pagemenu
        let scrollBtnStyle = this.props.theme.scrolling.button

        return (
            <div className="scrolling-tabs-main tab-bar" id="pagemenu" style={pagemenu}>
                
                <div className="scrolling-tabs-left">
                    <button className="hks-btn btn-tab-prev" onClick={e => this.onTabSlideClick(1)} style={scrollBtnStyle}>
                        <span className="glyphicon glyphicon-menu-left" ></span>
                    </button>
                </div>

                <div className="scroll">
                    <div className="scrolling-tabs" id="scrolling-menu-tabs">
                        <nav className='vertical-align-middle'>
                            {
                                this.tabbar.map(tab => {
                                    console.log(tab)
                                    if(tab.enabled) {
                                        return (
                                            <span key={tab.id} className={'tabs-item ' + (tab.id === activeTab ? 'actived' : 'normal')}
                                                onClick={e => this.onTabClick(tab.id)} style={tab.id === activeTab ? this.props.theme.tabactived : this.props.theme.tabnormal}>

                                                {language.tab[tab.title]}
                                                {/* <button
                                                    className="hks-btn btn-tab-reload"
                                                    type="button"
                                                    onClick={e => this.onReloadPage(tab.id)}
                                                >
                                                    <span className="glyphicon glyphicon-repeat"></span>
                                                </button> */}

                                            </span>
                                        )
                                    }
                                    
                                })
                            }

                        </nav>
                    </div>
                </div>
                <div className="scrolling-tabs-right">

                    <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)} style={scrollBtnStyle}>
                        <span className="glyphicon glyphicon-menu-right" ></span>
                    </button>
                    <button className="hks-btn btn-save-layout" onClick={e => this.saveLayout()} style={scrollBtnStyle}>
                        <span className="glyphicon glyphicon-floppy-disk" ></span>
                            {language.button.saveLayout}
                    </button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener("keydown", this.myEventHandler, false)
    }

    componentWillReceiveProps(nextProps) {

    }

    onReloadPage(tabID) {

    }

    onTabClick(tabID) {
        this.props.onTabClick(tabID)
    }

    onTabSlideClick(i) {
        if(i === 1){
            $("#scrolling-menu-tabs").animate( { scrollLeft: '-=200' }, 500);
        }
        else{
            $("#scrolling-menu-tabs").animate( { scrollLeft: '+=200' }, 500);
        }
    }

    saveLayout() {
        let userSavedData = this.props.userSavedData
        if(userSavedData && userSavedData.mvCfgList.length > 0) {
            let groupId = userSavedData.mvCfgList[0].GROUPID
            
            this.props.onSaveLayout(groupId, this.props.language.page)
        }
        
    }

}

const mapStateToProps = (state, props) => {
    return {
        tabID: state.menuSelected.tabID,
        savedcontent: state.menuSelected.savedcontent,
        resultSavelayout: state.menuSelected.resultSavelayout,

        userSavedData: state.dologin.userSavedData,
        userService: state.dologin.userService
    }

}

const mapDispatchToProps = (dispatch, props) => ({
    onSaveLayout: (params, language) => {
        dispatch(actions.saveLayout(params, language))
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

