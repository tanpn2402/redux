import React, { Component } from 'react'
import config from '../../core/config'
import { connect } from "react-redux"
import * as actions from "../../actions"

class SettingNav extends Component {

    constructor(props) {
        super(props)
        this.list = config.settings
    }

    render() {
        let settingTitle = this.props.theme.setting.settingTitle
        let settingPanel = this.props.theme.setting.settingPanel

        let actived = {
            appearance: this.props.theme.title,
            language: this.props.language.title
        }
        
        return (
            <div id="settingnav" className="settingnav">
                <div className="overlay" onClick={e => this.closeSetting()}></div>
                <div className="setting-panel" style={settingPanel} >
                    <div className="title" style={settingTitle} >
                        {this.props.language.page.menu.setting}
                    </div>
                    <div className="setting-list">
                        {
                            this.list.map(e => {
                                return (
                                    <div>
                                        <div data-toggle="collapse" data-target={'#' + e.id} className="st-header">
                                            <div className="st-icon"><i className="material-icons md-24">{e.icon}</i></div>
                                            <label aria-expanded="true" className="main-menu-header">
                                                {this.props.language.page.setting[e.id].title}
                                            </label>
                                        </div>
                                        <ul id={e.id} className="nav nav-list tree setting-item collapse" aria-expanded="true">
                                            {
                                                e.value.map(v => {
                                                    if(e.id == 'preference'){
                                                        return (
                                                            <li><a id={v} >
                                                                {this.props.language.page.setting[e.id][v]}
                                                                <select className="default-tab-chooser" onChange={e => this.onDefaultTabChange(e)}>
                                                                    {
                                                                        config.tabbar.map(el => {
                                                                            if(el.id == config.cache.defaultTab)
                                                                                return <option value={el.id} selected='true'>{this.props.language.page.tab[el.title]}</option>
                                                                            else
                                                                                return <option value={el.id} >{this.props.language.page.tab[el.title]}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </a></li>
                                                        )
                                                    } else {
                                                        return (
                                                            <li ><a onClick={() => { this.onChangeConfig(e.id, v) }} id={v} >
                                                                {this.props.language.page.setting[e.id][v]}
                                                                {
                                                                    v === actived[e.id] ? <i className="material-icons md-18 selected">check_box</i> : ""
                                                                }
                                                            </a></li>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
      
    }
    componentWillReceiveProps(nextProps) {
        
    }

    closeSetting() {
        document.getElementById('settingnav').classList.toggle("open")
    }

    onChangeConfig(id, value) {
        switch (id) {
            case 'language':
                this.props.switchLanguage(value)
                break;
            case 'appearance':
                this.props.switchTheme(value)
                break;
        }
    }

    onDefaultTabChange(e){
        config.cache.defaultTab = e.target.value;
        let userSavedData = this.props.userSavedData
        if(userSavedData && userSavedData.mvCfgList.length > 0) {
            let groupId = userSavedData.mvCfgList[0].GROUPID
            this.props.saveDefaultTab(groupId, this.props.language.page)
        }
    }
}

const mapStateToProps = state => ({
    userSavedData: state.dologin.userSavedData,
});

const mapDispatchToProps = (dispatch, props) => ({
    switchLanguage: (language) => { 
        dispatch(actions.switchLanguage(language)) 
    },
    switchTheme: (theme) => { 
        dispatch(actions.switchTheme(theme)) 
    },
    saveDefaultTab: (params, language) => {
        dispatch(actions.saveDefaultTab(params, language))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingNav)