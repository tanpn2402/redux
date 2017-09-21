import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"

class SettingNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuitem : config.menu_items

        }

        this.list = config.settings
    }

    render() {
        return (
            <div id="settingnav" className="settingnav">
                <div className="overlay" onClick={e => this.closeSetting()}></div>
                <div className="setting-panel">
                    <div className="title">
                        Settings
                    </div>
                    <div className="setting-list">
                        {
                            this.list.map(e => {
                                return(
                                    <div>
                                        <div data-toggle="collapse" data-target={'#' + e.id} className="st-header">
                                            <div className="st-icon"><span className={e.icon}></span></div>
                                            <label aria-expanded="true" className="main-menu-header">{e.id}</label>
                                        </div>
                                            <ul  id={e.id} className="nav nav-list tree main-menu-sub collapse" aria-expanded="true">
                                                {
                                                    e.value.map(v => {
                                                        return (
                                                            <li><a href="javascript:void(0)" id={v} >
                                                                {v}
                                                            </a></li>
                                                        )
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

    closeSetting(){
        document.getElementById('settingnav').classList.toggle("open")
    }

    onChangeConfig(e, language, style){
        // let tmp = e.target.className.split(' ')
        // let selected = tmp[tmp.length - 1]
        // if(selected === 'selected')
        //     return

        // var classList = document.getElementsByClassName(selected)
        // console.log(classList)
        // for(var i = 0; i < classList.length; i++){
            
        //     document.getElementById(classList[i].id).className = 
        //         document.getElementById(classList[i].id).className.replace(' selected', '')
        // }
        // console.log( e.target.id)
        // document.getElementById(e.target.id).className = 
        //         document.getElementById(e.target.id).className + ' selected'
        
        // console.log(language, style)
        // this.props.changeConfig(language, style)
    }
}

const mapStateToProps = state => ({
    language: state.config.language,
    style: state.config.style,
});

const mapDispatchToProps = (dispatch, props) => ({
    changeConfig: (lang, theme) => {dispatch(actions.changeConfig(lang,theme))},
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingNav)