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
        let pagemenu = this.props.theme.page == undefined ? undefined : this.props.theme.page.pagemenu
        return (
            <div className="scrolling-tabs-main tab-bar" id="pagemenu" style={pagemenu}>
                <div className="scroll">
                    <div className="scrolling-tabs" id="scrolling-tabs">
                        <nav className='vertical-align-middle'>
                            {
                                this.tabbar.map(tab => {
                                    return (
                                        <div key={tab.id} className={'tabs-item ' + (tab.id === activeTab ? 'actived' : 'normal')}
                                            onClick={e => this.onTabClick(tab.id)} style={tab.id === activeTab ? this.props.theme.tabactived : this.props.theme.tabnormal}>

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

                    <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)} style={this.props.theme.tabnormal}>
                        <span className="glyphicon glyphicon-menu-right" style={this.props.theme.font3}></span>
                    </button>
                    <button className="hks-btn btn-save-layout" onClick={e => this.saveLayout()} style={this.props.theme.savelayoutbutton}>
                        <span className="glyphicon glyphicon-floppy-disk" style={{ margin: '0 1px' }}></span>
                        Save Layout
                    </button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.params['mvAction'] = 'QUERYDEFAULT'
        this.props.onGetSavedContentLayout(this.params)
        window.addEventListener("keydown", this.myEventHandler, false)
    }

    componentWillReceiveProps(nextProps) {

    }

    onReloadPage(tabID) {

    }

    onTabClick(tabID) {
        this.props.onTabClick(tabID)
    }

    onTabSlideClick() {

    }

    saveLayout() {
        const groupId = this.props.savedcontent.mvCfgList[0].GROUPID
        this.params['mvGroupName'] = 'User1'
        this.params['mvIsDefault'] = 'Y'
        this.params['mvGroupType'] = 'U'
        this.params['mvGroupID'] = groupId
        this.params['mvSavedContent'] = JSON.stringify(config.tabbar)
        this.params['mvAction'] = 'MODIFY'
        this.props.onSaveLayout(this.params, this.props.language)
    }

}

const mapStateToProps = (state, props) => {
    return {
        tabID: state.menuSelected.tabID,
        savedcontent: state.menuSelected.savedcontent,
        resultSavelayout: state.menuSelected.resultSavelayout
    }

}

const mapDispatchToProps = (dispatch, props) => ({
    onGetSavedContentLayout: (params) => {
        dispatch(actions.getSavedContentLayout(params))
    },
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

