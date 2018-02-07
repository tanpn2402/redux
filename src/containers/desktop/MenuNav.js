import React, { Component } from 'react'
import config from '../../core/config'
import { connect } from "react-redux"
import * as actions from "../../actions"
import $ from 'jquery'

class MenuNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            widgetMenu: [],
            showWidgetBox: false,
            searchInputVal: '',
        }
        this.tabbar = config.tabbar
        this.allWidget = config.widget
        this.handleBaseBlur = this.handleBaseBlur.bind(this)
    }

    render() {
        var activeTab = this.props.tabID
        var language = this.props.language.page
        let pageMenuNav = this.props.theme.page.pageMenuNav
        let scrollBtnStyle = this.props.theme.scrolling.button
        let widgetBox = (
            <div className="widget-menu-container"
                style={{ display: this.state.showWidgetBox ? "block" : "none"}}>
                <div className="widget-menu-input">
                    <input type="text" 
                        value={this.state.searchInputVal} 
                        className="widget-input"
                        id="widget-input"
                        placeholder="Menu" 
                        onChange={e => this.onChange(e, this.props.language)}
                        onKeyDown={e => this.onKeyDown(e)}
                    />
                </div>
                <div className="widget-menu" id="widget-menu" >
                    {
                        this.state.widgetMenu.map((menu) => { 
                            return(
                                <div className="widget-block">
                                    <label data-toggle="collapse" data-target={'#cus-' + menu.id} className="widget-re-header">
                                        {this.props.language.page.menu[menu.id]}
                                    </label>
                                    <div id={"cus-" + menu.id} className="nav nav-list tree setting-item collapse in" aria-expanded="true">
                                    {
                                        menu.subitems.map(el => {
                                            return (
                                                <div
                                                    id={'item-' + el.id}
                                                    onClick={e => (this.addWidget(el.id))}
                                                    className="widget-item"
                                                    key={el.id} >
                                                        {this.props.language.page.menu[el.id]}
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
        return (
            <div className="scrolling-tabs-main tab-bar" id="pagemenu" style={pageMenuNav}>
              

                <div className="scroll">
                    <div className="scrolling-tabs" id="scrolling-menu-tabs">
                        <nav className='vertical-align-middle'>
                            {
                                this.tabbar.map(tab => {
                                    // console.log(tab)
                                    if(tab.enabled) {
                                        return (
                                            <span key={tab.id} className={'tabs-item ' + (tab.id === activeTab ? 'actived' : 'normal')}
                                                onClick={e => this.onTabClick(tab.id)} style={tab.id === activeTab ? this.props.theme.tab.active : this.props.theme.tab.normal}>

                                                {language.tab[tab.title]}

                                            </span>
                                        )
                                    }
                                    
                                })
                            }

                        </nav>
                    </div>
                </div>

                <div className="scrolling-tabs-right">
                    <div style={{float: 'right'}}>
                        <button className="hks-btn btn-save-layout" onClick={e => this.saveLayout()} style={scrollBtnStyle}>
                            <span className="glyphicon glyphicon-floppy-disk" ></span>
                            {language.button.saveLayout}
                        </button>
                    </div>
                    {
                        this.props.tabID == 'customization' ? 
                            (
                                <div style={{float: 'right'}}>
                                    <button className="hks-btn btn-add-widget" 
                                        onClick={e => this.onAddWidgetClick()} style={scrollBtnStyle}>
                                        <span className="glyphicon glyphicon-plus" ></span>
                                        {language.button.addWidget}
                                    </button>
                                    {widgetBox}
                                </div>
                            ) 
                            : null
                    }
                    

                </div>
              
            </div>
        )
    }

    onKeyDown(e) {
        //e.preventDefault()
        let keyCode = e.keyCode
        switch (keyCode) {
            case 27: // Esc
                this.setState({
                    showWidgetBox: false,
                    widgetMenu: [],
                })
                break;
        }
    }

    handleBaseBlur(e) {
        var target = e.target.className
        console.log(target, e.target)
        try {
            if ( target.includes('widget-item') || target.includes("widget-re-header") || target.includes('hks-btn btn-add-widget') ||
                target.includes("widget-block") || target.includes("widget-menu") || target.includes("widget-input")) {
        
            } else {
                window.removeEventListener("click", this.handleBaseBlur, false)
                this.setState({
                    showWidgetBox: false
                })
                
            }
        } catch(e) {
            // in case user click to chart
            window.removeEventListener("click", this.handleBaseBlur, false)
            this.setState({
                showWidgetBox: false
            })
        }
    }

    onAddWidgetClick(){
        if(!this.state.showWidgetBox){
            window.addEventListener("click", this.handleBaseBlur, false)
            this.setState({
                showWidgetBox: true,
                widgetMenu: config.menu_items,
            })
        } else {
            this.setState({
                showWidgetBox: false
            })
        }
        
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
            this.props.reloadCustom(this.props.load)
        }
    }

    widgetIsExist(widgetID, widgetList) {

        if (widgetList == null) return null

        var result = widgetList.find(existWid => {
            return (existWid.i == widgetID)
        })
        return result
    }

    onChange(e, language) {
        let value = e.target.value
        let menus = config.menu_items.slice(0)
        let list = []

        var matchesFilter = new RegExp(value, "i")
        menus.forEach(item => {
            var tmp = item.subitems.filter(subitem => {
                var text = language.page.menu[subitem.text]
                if(matchesFilter.test(text))
                    return true
            })
            if(tmp.length > 0)
            {
                let result = {
                    id: item.id,
                    text: language.page.menu[item.id],
                    type: "menu"
                }
                tmp = tmp.map(data=>new Object({label: language.page.menu[data.id], id: data.id, type: "sub"}))
                result['subitems'] = tmp
                list.push(result)
            }
            
        })
        
        //Control text input
        this.setState({
            searchInputVal: value,
            widgetMenu: list,
        })

    }

    componentDidMount() {
        // window.addEventListener("keydown", this.myEventHandler, false)
    }

    componentDidUpdate() {
        if(document.getElementById('widget-input') != undefined)
            document.getElementById('widget-input').focus()
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
        load: state.menuSelected.load,
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
    reloadCustom: (load) => {
        dispatch(actions.reloadCustom(load))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuNav);

