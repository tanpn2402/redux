import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import config from '../../core/config'
import Popup from '../popup/Popup'
import Clock from './Clock'

class StatusBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInputVal: '',
            searchResult: [],
            reload: false,
            showSearchBox: true,
            lgShow: false,
            onHoverDiv: {
                backgroundColor: '#ccc',
                color: '#555',
                cursor: 'hand',
                cursor: 'pointer'
            },
            currentlySelectedItemIndex: 0
        }
        this.allWidget = config.widget
        this.onBlur = this.onBlur.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.openSetting = this.openSetting.bind(this)
        this.openProfile = this.openProfile.bind(this)
        this.logout = this.logout.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    componentWillMount() {
    }

    render() {
        let lgClose = () => { this.setState({ lgShow: false }) }
        let searchResultBox = (
            <div tabIndex="0" className="widget-search-result"
                id="widget-search-result"
                style={{ display: this.state.showSearchBox ? "block" : "none" }}
            >
                {
                    this.state.searchResult.map((el, index) => {
                        return (
                            <div
                                id={'item-' + index}
                                style={index == this.state.currentlySelectedItemIndex ? this.state.onHoverDiv : undefined}
                                key={el.i}
                                onClick={e => this.gotoResultTab(el.i, this.props.language)}>{this.props.language.menu[el.i]}</div>
                        )
                    })
                }
            </div>
        )

        return (
            <div id="status-bar" style={this.props.theme.statusbar}>
                <div className="connection-status open"  >
                    <span className="glyphicon glyphicon-th-large" onClick={this.onFocus}></span>
                </div>
                <div className="widget-search">
                    <input ref={input => this.inputSearchValue = input} type="text" value={this.state.searchInputVal} className="form-control" placeholder="Menu"
                        onChange={e => this.onChange(e, this.props.language)}
                        onBlur={e => this.onBlur(e)}
                        onClick={this.onFocus}
                        onKeyDown={e => this.onKeyDown(e)}
                    />

                    {(this.state.searchResult.length > 0) ? searchResultBox : null}
                </div>


                <div className="user-action">
                    <span className="glyphicon glyphicon-user" onClick={this.openProfile}></span>
                    <span className="glyphicon glyphicon-cog" onClick={this.openSetting}></span>
                    <span className="glyphicon glyphicon-log-out" onClick={this.logout} ></span>
                    <Clock/>
                </div>
            </div>

        )
    }

    componentDidMount() {
        var lastTab = localStorage.getItem('lastTab')
        if (lastTab) {
            this.gotoResultTab(lastTab, this.props.language)
        }
    }

    openSetting(e) {
        document.getElementById('settingnav').classList.toggle("open")
    }

    openProfile(e) {
        document.getElementById('profilenav').classList.toggle('open')
    }

    logout() {
        this.props.showDialog({
            data: {checkSessionID: this.props.checkSessionID},
            title: this.props.language.menu.savelayout,
            language: this.props.language,
            id: 'savelayout',
            authcard: false
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
        this.inputSearchValue.blur()
        this.onBlur({})
    }

    onKeyDown(e) {
        
        //e.preventDefault()
        let keyCode = e.keyCode
        let searchResultSize = this.state.searchResult.length - 1
        let previousItem = (this.state.currentlySelectedItemIndex - 1) < 0 ? searchResultSize : (this.state.currentlySelectedItemIndex - 1)
        let nextItem = (this.state.currentlySelectedItemIndex + 1) > searchResultSize ? 0 : (this.state.currentlySelectedItemIndex + 1)
        
        switch (keyCode) {
            case 38: // Up
                this.setState({
                    currentlySelectedItemIndex: (previousItem)
                })
                if(document.getElementById('widget-search-result'))
                    document.getElementById('widget-search-result').scrollTop = document.getElementById('item-' + previousItem).offsetTop - 120
                break;
            case 40: // Down
                this.setState({
                    currentlySelectedItemIndex: (nextItem)
                })
                if(document.getElementById('widget-search-result'))
                    document.getElementById('widget-search-result').scrollTop = document.getElementById('item-' + nextItem).offsetTop - 120
                break;
            case 13: // Enter
                let subMenuID = this.state.searchResult[this.state.currentlySelectedItemIndex].i
                this.gotoResultTab(subMenuID, this.props.language)
                break;
            case 27: // Esc
                this.setState({
                    showSearchBox: false,
                    searchResult: [],
                })
                break;
        }
    }

    onFocus() {
        if (this.state.searchInputVal !== '') {
            this.setState({
                showSearchBox: true,
            })
        } else {
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
        if(document.getElementById('widget-search-result'))
            document.getElementById('widget-search-result').scrollTop = document.getElementById('item-0').offsetTop
        this.setState({
            showSearchBox: false,
            currentlySelectedItemIndex: 0,
            searchInputVal: ''
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
        if(tmp.length > 0 && document.getElementById('widget-search-result')){
            document.getElementById('widget-search-result').scrollTop = document.getElementById('item-0').offsetTop
        }
        //Control text input
        this.setState({
            searchInputVal: value,
            searchResult: tmp,
            currentlySelectedItemIndex: 0
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
    onTabClick: (tabID, subTabID) => {
        dispatch(actions.onTabClick(tabID, subTabID));
    },
    reloadCustom: (load) => {
        dispatch(actions.reloadCustom(load))
    },
    showDialog: (param) => {
        dispatch(actions.showPopup(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)