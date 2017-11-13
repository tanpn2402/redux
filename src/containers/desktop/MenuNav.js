import React, { Component } from 'react'
import config from '../../core/config'
import { connect } from "react-redux"
import * as actions from "../../actions"
import $ from 'jquery'

class MenuNav extends Component {

    constructor(props) {
        super(props)

        this.tabbar = config.tabbar
    }

    render() {
        var activeTab = this.props.tabID
        var language = this.props.language.page
        let pagemenu = this.props.theme.page.pagemenu
        let scrollBtnStyle = this.props.theme.scrolling.button

        return (
            <div className="scrolling-tabs-main tab-bar" id="pagemenu" style={pagemenu}>
              

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

                                            </span>
                                        )
                                    }
                                    
                                })
                            }

                        </nav>
                    </div>
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
    onTabClick: (tabID) => {
        dispatch(actions.onTabClick(tabID));
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuNav);
