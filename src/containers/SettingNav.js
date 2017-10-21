import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"



// import '../assets/js/plugins/smoothdivscroll/jquery-ui-1.10.3.custom.js'
// import '../assets/js/plugins/smoothdivscroll/jquery.kinetic.js'
// import '../assets/js/plugins/smoothdivscroll/jquery.mousewheel.js'
// import '../assets/js/plugins/smoothdivscroll/jquery.smoothDivScroll-1.3.js'


class SettingNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuitem: config.menu_items,
            language: this.props.language,
            theme: this.props.currentTheme
        }

        this.list = config.settings

        this.theme = 'blue'
        this.language = 'vi'


        this.setting = {
            language: this.state.language.code,
            appearance: this.state.theme
        }
    }

    render() {
        console.log(this.state.language.page)
        let settingtitle = this.props.currentTheme.setting == undefined ? undefined : this.props.currentTheme.setting.settingtitle
        let settingpanel = this.props.currentTheme.setting == undefined ? undefined : this.props.currentTheme.setting.settingpanel
        return (
            <div id="settingnav" className="settingnav">
                <div className="overlay" onClick={e => this.closeSetting()}></div>
                <div className="setting-panel" style={settingpanel} >
                    <div className="title" style={settingtitle} >
                        Settings
                    </div>
                    <div className="setting-list">
                        {
                            this.list.map(e => {
                                return (
                                    <div>
                                        <div data-toggle="collapse" data-target={'#' + e.id} className="st-header">
                                            <div className="st-icon"><i className="material-icons md-36">{e.icon}</i></div>
                                            <label aria-expanded="true" className="main-menu-header">{this.state.language.page.setting[e.id].title}</label>
                                        </div>
                                        <ul id={e.id} className="nav nav-list tree setting-item collapse" aria-expanded="true">
                                            {
                                                e.value.map(v => {
                                                    return (
                                                        <li ><a onClick={() => { this.onChangeConfig(e.id, v) }} id={v} >
                                                            {this.state.language.page.setting[e.id][v]}
                                                            {
                                                                this.setting[e.id].title !== v ?
                                                                    this.setting[e.id] !== v ? '' :
                                                                        <i className="material-icons md-18 selected">check_box</i>
                                                                    : <i className="material-icons md-18 selected">check_box</i>
                                                            }
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
    componentDidMount(){
      
    }
    componentWillReceiveProps(nextProps) {
        console.log("NEW PROPS", nextProps.language, nextProps.theme)
        if (this.state.language !== nextProps.language && nextProps.language !== undefined) {
            this.setting.language = nextProps.language.code
            this.setState({
                language: nextProps.language
            })
        }
        if (this.state.theme !== nextProps.theme && nextProps.theme !== undefined) {
            this.setting.appearance = nextProps.theme.substring(6)
            this.setState({
                theme: nextProps.theme.substring(6)
            })
        }
    }

    closeSetting() {
        document.getElementById('settingnav').classList.toggle("open")
    }

    onChangeConfig(id, value) {
        switch (id) {
            case 'language':
                value = (value.split('_'))[0]
                // this.props.changeConfig(value, 'blue')
                this.props.switchLanguage(value)
                break;
            case 'appearance':
                this.props.switchTheme(value)
                break;
        }
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
        // switch (id) {
        //     case 'language'
        // }
    }
}

const mapStateToProps = state => ({
    language: state.config.language,
    theme: state.config.style,
});

const mapDispatchToProps = (dispatch, props) => ({
    changeConfig: (lang, theme) => { dispatch(actions.changeConfig(lang, theme)) },
    switchLanguage: (language) => { dispatch(actions.switchLanguage(language)) },
    switchTheme: (theme) => { dispatch(actions.switchTheme(theme)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingNav)