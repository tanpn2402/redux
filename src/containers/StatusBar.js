import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions'
import config from '../core/config'
import MenuItem from './SideMenu/MenuItem'
import Popup from './Popup'

class StatusBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInputVal: '',
            searchResult: [],
            reload: false,
            showSearchBox: true,
            lgShow: false
        }
        this.allWidget = config.widget
        this.onBlur = this.onBlur.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.openSetting = this.openSetting.bind(this)
        this.openProfile = this.openProfile.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentWillMount() {
    }

    render() {

        let lgClose = () => { this.setState({ lgShow: false }) }
        let searchResultBox = (
            <div tabIndex="0" className="widget-search-result" style={{ display: this.state.showSearchBox ? "block" : "none" }}>
                {
                    this.state.searchResult.map(el => {
                        return (
                            <div key={el.i} onClick={e => this.gotoResultTab(el.i, this.props.language)}>{this.props.language.menu[el.i]}</div>
                        )
                    })
                }
            </div>
        )

        return (
            <div id="status-bar" style={this.props.theme.statusbar}>
                <div className="connection-status open">
                    <span className="glyphicon glyphicon-signal"></span>
                </div>
                <div className="widget-search">
                    <input type="text" value={this.state.searchInputVal} className="form-control" placeholder="Menu"
                        onChange={e => this.onChange(e, this.props.language)} 
                        onBlur={e => this.onBlur(e)} 
                        onFocus={this.onFocus} />

                    {(this.state.searchResult.length > 0 ) ? searchResultBox : null}
                </div>


                <div className="user-action">
                    <span className="glyphicon glyphicon-user" onClick={this.openProfile}></span>
                    <span className="glyphicon glyphicon-cog" onClick={this.openSetting}></span>
                    <span className="glyphicon glyphicon-log-out" onClick={this.logout} ></span>

                </div>
                <Popup title={this.props.language.menu.savelayout} show={this.state.lgShow} id={'savelayout'} 
                    onHide={lgClose} checkSessionID={this.props.checkSessionID} config={config.tabbar} language={this.props.language} />
            </div>

        )
    }

    componentDidMount() {
    }

    openSetting(e) {
        document.getElementById('settingnav').classList.toggle("open")
    }

    openProfile(e) {
        document.getElementById('profilenav').classList.toggle('open')
    }

    logout() {
        this.setState({
            lgShow: true
        })
    }

    gotoResultTab(subMenuID, language) {
        let isTabMenu = false;
        let tabItems = config.tabbar
        var widgetList = config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget

        tabItems.forEach(item => {
            var tmp = item.widget.filter(subitem => {
                return subitem.i == subMenuID
            })
            if (tmp.length > 0) {
                this.props.onTabClick(item.id, subMenuID)
                isTabMenu = true
            }
        })

        if (!isTabMenu && widgetList.find(wg => wg == subMenuID) == null) {
            this.addWidget(subMenuID)
        }

        this.setState({
            showSearchBox: false,
        })
    }

    onFocus() {
        if(this.state.searchInputVal !== ''){
            this.setState({
                showSearchBox: true,
            })
        } else{
            this.setState({
                showSearchBox: true,
                menuitem: config.widget,
                searchResult: config.widget,
            })
        }   
    }

    onBlur(e) {
        if (e.relatedTarget != null) {
            return;
        }
        this.setState({
            showSearchBox: false
        })
    }

    onChange(e, language) {
        let value = e.target.value
        var widgets = config.widget

        var matchesFilter = new RegExp(value, "i")
        var tmp = widgets.filter(el => {
            var text = language.menu[el.i]
            if (matchesFilter.test(text))
                return true
        })

        //Control text input
        this.setState({
            searchInputVal: value,
            searchResult: tmp,
        })

    }

    widgetIsExist(widgetID, widgetList) {

        if (widgetList == null) return null

        var result = widgetList.find(existWid => {
            return (existWid.i == widgetID)
        })
        return result
    }

    addWidget(widgetID) {
        var curWidgets = config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget
        var isWidgetExist = this.widgetIsExist(widgetID, config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget) != null
        if (isWidgetExist) {
            return
        }

        var newWidgetList = this.allWidget.filter(el => el.i === widgetID)
        if (newWidgetList.length > 0) {
            var newWidget = newWidgetList[0]
            config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget = [...curWidgets, newWidget]
            this.props.onTabClick("customization")
            this.props.reloadCustom(this.props.load)
        }
    }


}



const mapStateToProps = (state) => {
    return {
        load: state.menuSelected.load,
        tabID: state.menuSelected.tabID,
        widgetList: state.menuSelected.widgetList,
    }
}



const mapDispatchToProps = (dispatch, props) => ({
    onLogoutClick: (params) => {
        dispatch(actions.logout(params))
    },
    onTabClick: (tabID, subTabID) => {
        dispatch(actions.onTabClick(tabID, subTabID));
    },
    reloadCustom: (load) => {
        dispatch(actions.reloadCustom(load))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)