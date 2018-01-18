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
            showSearchBox: false,
            lgShow: false,
            onHoverDiv: {
                backgroundColor: '#ccc',
                color: '#555',
                cursor: 'hand',
                cursor: 'pointer'
            },
            currentlySelectedItemIndex: 0,
            onFav: -1,
            favList: config.cache.favourite
        }
        this.allWidget = config.widget
        this.onFocus = this.onFocus.bind(this)
        this.openSetting = this.openSetting.bind(this)
        this.openProfile = this.openProfile.bind(this)
        this.logout = this.logout.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.handleBaseBlur = this.handleBaseBlur.bind(this)
    }

    componentWillMount() {
    	//f5 => restore config.cache.fav and state from localstorage
        if(localStorage.getItem("favs") != undefined )
            config.cache.favourite = this.state.favList = JSON.parse(localStorage.getItem("favs"))
        else    
            //first render, login
            localStorage.setItem("favs", JSON.stringify(this.state.favList))
            
        
    }

    handleBaseBlur(e) {
        var target = e.target.className
        console.log(e.target.className)
        if ( target.includes('search-trigger') ||
            target.includes('glyphicon-th-large') || target.includes("search-re-header") ||
            target.includes("search-block") || target.includes("widget-search-result")) {

        } else {
            this.setState({
                showSearchBox: false
            })
            window.removeEventListener("click", this.handleBaseBlur, false)
        }
    }
   
    componentWillUpdate() {
        if(this.state.showSearchBox) {
            
        }
    }
    
    render() {
        let lgClose = () => { this.setState({ lgShow: false }) }
        let index = -1
        let searchResultBox = (
            <div tabIndex="0" className="widget-search-result"
                id="widget-search-result"
                style={{ display: this.state.showSearchBox ? "block" : "none" }}>
                {
                    this.state.searchResult.map((menu) => {
                        
                        return (
                            <div className="search-block">
                                <label className="search-re-header">{this.props.language.menu[menu.id]}</label>
                                {
                                    
                                    menu.subitems.map(el => {
                                        index += 1
                                        // console.log(index, this.state.onFav)
                                        return (
                                            <div
                                                id={'item-' + el.id}
                                                className="search-item"
                                                key={el.id}
                                                onClick={e => this.gotoResultTab(el.id, this.props.language)}
                                                onMouseOver={e => this.setState({onFav: el.id})}
                                                onMouseOut={e => this.setState({onFav: -1})}>
                                                    {this.props.language.menu[el.id]}
                            
                                                    <span style={{visibility: (el.id == this.state.onFav || this.state.currentlySelectedItemIndex == index) ?"visible" : "hidden", 
                                                        color: this.isFav(el.id) >= 0 ? "yellow" : "white"}} 
                                                        onClick={e => this.onFavClick(e, el.id)}
                                                        tabIndex='0' 
                                                        className="glyphicon glyphicon-star">
                                                    </span>
                                            
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )

        return (
            <div id="status-bar" style={this.props.theme.statusbar}>
                <div className="start-menu" onClick={this.onFocus}>
                    <span className="glyphicon glyphicon-th-large"></span>
                </div>
                <div className="widget-search">
                    <input ref={input => this.inputSearchValue = input} type="text" 
                        value={this.state.searchInputVal} 
                        className="form-control search-trigger" 
                        placeholder="Menu" id="form-control-input"
                        onChange={e => this.onChange(e, this.props.language)}
                        onClick={this.onFocus}
                        onKeyDown={e => this.onKeyDown(e)}
                    />

                    {(this.state.searchResult.length > 0) ? searchResultBox : null}
                </div>
        
                {
                    this.state.favList.map((el, index) =>{
                        return(
                            <div id={'fav-tab-' + index} className="fav-tab" onClick={e => this.gotoResultTab(el, this.props.language)} >              {this.props.language.menu[el]}
                            </div>
                        )
                    })
                } 

                <div className="user-action">
                    <span className="glyphicon glyphicon-user" onClick={this.openProfile}></span>
                    <span className="glyphicon glyphicon-cog" onClick={this.openSetting}></span>
                    <span className="glyphicon glyphicon-log-out" onClick={this.logout} ></span>
                    <Clock/>
                </div>
            </div>

        )
    }

    onFavClick(e, id){
        e.stopPropagation()
        var index = this.isFav(id)
        if(index < 0){
            if(this.state.favList.length < config.maxFav){
                
                config.cache.favourite.push(id) 
                this.setState({favList: config.cache.favourite})
                localStorage.setItem("favs", JSON.stringify(config.cache.favourite))
            }
        } else{
            
                config.cache.favourite.splice(index, 1)
                this.setState({favList: config.cache.favourite})
                if(config.cache.favourite == 0)
                    localStorage.removeItem("favs")    
                else
                    localStorage.setItem("favs", JSON.stringify(config.cache.favourite))
            
        }
        document.getElementById("form-control-input").focus()
    }
    
    isFav(id){
        for(var i =0; i < this.state.favList.length; i++)
            if(id == this.state.favList[i])
                return i
        return -1
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
    }

    onKeyDown(e) {
        // return;
        //e.preventDefault()
        let keyCode = e.keyCode
        let searchResultSize = this.state.searchResult.length - 1
        let previousItem = (this.state.currentlySelectedItemIndex - 1) < 0 ? searchResultSize : (this.state.currentlySelectedItemIndex - 1)
        let nextItem = (this.state.currentlySelectedItemIndex + 1) > searchResultSize ? 0 : (this.state.currentlySelectedItemIndex + 1)
        
        switch (keyCode) {
            // case 38: // Up
            //     this.setState({
            //         currentlySelectedItemIndex: (previousItem)
            //     })
            //     if(document.getElementById('widget-search-result'))
            //         document.getElementById('widget-search-result').scrollTop = document.getElementById('item-' + previousItem).offsetTop - 120
            //     break;
            // case 40: // Down
            //     this.setState({
            //         currentlySelectedItemIndex: (nextItem)
            //     })
            //     if(document.getElementById('widget-search-result'))
            //         document.getElementById('widget-search-result').scrollTop = document.getElementById('item-' + nextItem).offsetTop - 120
            //     break;
            // case 13: // Enter
            //     let subMenuID = this.state.searchResult[this.state.currentlySelectedItemIndex].i
            //     this.gotoResultTab(subMenuID, this.props.language)
            //     break;
            case 27: // Esc
                this.setState({
                    showSearchBox: false,
                    searchResult: [],
                })
                break;
        }
    }

    onFocus() {
        if(this.state.showSearchBox) {
            this.setState({
                showSearchBox: false,
            })
            window.removeEventListener("click", this.handleBaseBlur, false)
        }
        else {
            if (this.state.searchInputVal !== '') {
                this.setState({
                    showSearchBox: true,
                })
            } else {
                this.setState({
                    showSearchBox: true,
                    searchResult: config.start_menu,
                })
            }
            document.getElementById("form-control-input").focus()
            window.addEventListener("click", this.handleBaseBlur, false)
        }
    }

    onChange(e, language) {
        let value = e.target.value
        let menus = config.start_menu.slice(0)
        let list = []

        var matchesFilter = new RegExp(value, "i")
        menus.forEach(item => {
            // console.log(item.subitems)
            var tmp = item.subitems.filter(subitem => {
                var text = language.menu[subitem.text]
                // console.log(text)
                if(matchesFilter.test(text))
                    return true
            })
            // console.log("this")
            // console.log(tmp)
            if(tmp.length > 0)
            {
                // var result = JSON.parse(JSON.stringify(item))
                let result = {
                    id: item.id,
                    text: language.menu[item.id],
                    type: "menu"
                }
                tmp = tmp.map(data=>new Object({label: language.menu[data.id], id: data.id, type: "sub"}))
                // console.log(result);
                result['subitems'] = tmp
                list.push(result)
            }
            
        })

        console.log(list)
        
        if(list.length > 0 && document.getElementById('widget-search-result')){
            // document.getElementById('widget-search-result').scrollTop = document.getElementById('item-0').offsetTop
        }
        //Control text input
        this.setState({
            searchInputVal: value,
            searchResult: list,
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