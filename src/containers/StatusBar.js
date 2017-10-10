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
        this.allWidget = config.layoutdefault
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
        const searchResultBox = (
            <div tabIndex="0" className="widget-search-result" style={{ display: this.state.showSearchBox ? "block" : "none" }}>
                {
                    this.state.searchResult.map((mainTab, index) =>
                        (
                            mainTab.subitems.map((subRs, index) =>
                                <div key={index} onClick={e => this.gotoResultTab(subRs.data.id, this.props.language)}>{subRs.label}</div>)
                        )


                    )
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
                        onChange={e => this.onChange(e, this.props.language)} onBlur={e => this.onBlur(e)} onFocus={this.onFocus} />
                    {(this.state.searchResult.length > 0 && this.state.searchInputVal.length > 0) ? searchResultBox : null}
                </div>


                <div className="user-action">
                    <span className="glyphicon glyphicon-user" onClick={this.openProfile}></span>
                    <span className="glyphicon glyphicon-cog" onClick={this.openSetting}></span>
                    <span className="glyphicon glyphicon-log-out" onClick={this.logout} ></span>

                </div>
                <Popup title={this.props.language.menu.savelayout} show={this.state.lgShow} id={'savelayout'} onHide={lgClose} checkSessionID={this.props.checkSessionID} config={config.tabbar} language={this.props.language} />
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
        // this.props.onLogoutClick(this.props.checkSessionID)
        this.setState({
            lgShow: true
        })
    }

    gotoResultTab(subMenuID, language) {
        let isTabMenu = false;
        let tabItems = config.tabbar
        var widgetList = config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget

        tabItems.forEach(item => {
            // console.log("subitem:"+subMenuID)
            // console.log(item.widget)
            var tmp = item.widget.filter(subitem => {
                return subitem.i == subMenuID
            })
            // console.log("this")
            // console.log("result")
            // console.log(tmp)
            if (tmp.length > 0) {
                // console.log("FOUND" + item.id)
                this.props.onTabClick(item.id)
                isTabMenu = true
            }
        })

        if (!isTabMenu && widgetList.find(wg => wg == subMenuID) == null) {
            this.addWidget(subMenuID)
        }
    }

    onFocus() {
        this.setState({
            showSearchBox: true
        })
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
        // console.log(language.menu["enterorder"])
        let value = e.target.value
        var menuItems = config.menu_items



        //Control text input
        this.setState({
            searchInputVal: value
        })

        if (value === '') {
            this.setState({
                menuitem: config.menu_items,
            })
        }
        else {
            var list = []

            try {
                var matchesFilter = new RegExp(value, "i")
                menuItems.forEach(item => {
                    // console.log(item.subitems)
                    var tmp = item.subitems.filter(subitem => {
                        var text = language.menu[subitem.text]
                        // console.log(text)
                        if (matchesFilter.test(text))
                            return true
                    })
                    // console.log("this")
                    // console.log(tmp)
                    if (tmp.length > 0) {
                        var result = JSON.parse(JSON.stringify(item))
                        tmp = tmp.map(data => new Object({ label: language.menu[data.id], data: data }))
                        // console.log(result);
                        result['subitems'] = tmp
                        list.push(result)
                    }

                })
            }
            catch (e) { }
            // console.log(list)
            this.setState({
                searchResult: list,
            });
        }


    }

    // whichTab(widgetID){
    //     try{
    //         var matchesFilter = new RegExp(value, "i")
    //         menuItems.forEach(tab => {
    //             var result = tab.find(widget => {
    //                 return widgetID === widget.i
    //             })
    //             if (result!=null){
    //                 return tab.id
    //             }
    //         })
    //     }
    //     catch(e){}
    //     return null
    // }

    widgetIsExist(widgetID, widgetList) {

        if (widgetList == null) return null

        var result = widgetList.find(existWid => {
            return (existWid.i == widgetID)
        })
        return result
    }

    addWidget(widgetID) {
        console.log("WIDGET " + widgetID + " WILL BE INSERTED")
        var curWidgets = config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget
        var isWidgetExist = this.widgetIsExist(widgetID, config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget) != null
        if (isWidgetExist) {
            return
        }

        var newWidgetConfig = this.allWidget[widgetID]
        // console.log("************")
        // console.log(this.allWidget)
        if (newWidgetConfig != null) {
            config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget = [...curWidgets, newWidgetConfig]
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
    onTabClick: (tabID) => {
        dispatch(actions.onTabClick(tabID));
    },
    reloadCustom: (load) => {
        dispatch(actions.reloadCustom(load))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)