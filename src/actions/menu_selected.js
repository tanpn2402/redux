import { ActionTypes } from '../core/constants';
import * as api from '../api/web_service_api';
import * as ACTION from '../api/action_name';
import config from '../core/config';
import { showMessageBox } from '../actions/notification'

export function onTabClick(tabID, subTabID){
    // console.log(tabID, subTabID)
    //Save tabID into localstorage
    if (tabID != null) {
        localStorage.setItem('lastTabID',tabID)
    }
    //Save subTabID into localstorage (Default widget[0])
    if (subTabID==null) {
        var curTab = config.tabbar.find((tab) => tab.id === tabID)
        if (curTab != undefined && curTab.widget.length > 0) {
            subTabID = curTab.widget[0].i
        }
    }

    if (subTabID!=null) {
        localStorage.setItem('lastSubTabID',subTabID)
    } else {
        localStorage.removeItem('lastSubTabID')
    }

    return {
        type: ActionTypes.TABCLICKEVENT,
        tabID: tabID,
        subTabID: subTabID,
    }
}

export function onMobileTabClick(tabID, subTabID){
    // console.log(tabID, subTabID)
    
    if (subTabID==null) {
        var curTab = config.tabbar.find((tab) => tab.id === tabID)
        if (curTab != undefined && curTab.widget.length > 0) {
            subTabID = curTab.widget[0].i
        }
    }

    return {
        type: ActionTypes.TABCLICKEVENT,
        tabID: tabID,
        subTabID: subTabID,
    }
}

export function onReloadPageContent() {
    return {
        type: ActionTypes.RELOADPAGECONTENT
    }
}


export function reloadCustom(load) {
    return {
        type: ActionTypes.RELOADCUSTOM,
        load: !load,
    }
}


export function removeWidget(load) {
    return {
        type: ActionTypes.REMOVEWIDGET,
        load: !load
    }
}

export function getSavedContentLayout(params) {
    return (dispatch) => {
        api.get(ACTION.UICFGMANAGEMENT, params, dispatch, getSavedLayout)
    }
}

function getSavedLayout(savedcontent) {
    return {
        type: ActionTypes.GETSAVEDCONTENTLAYOUT,
        savedcontent: savedcontent
    }
}



export function saveLayout(groupId, language) {
    let savedContent = {
        lang: config.cache.lang,
        theme: config.cache.theme,
        layout:config.tabbar
    }
    let params = Array()
    params['mvGroupName'] = 'User1'
    params['mvIsDefault'] = 'Y'
    params['mvGroupType'] = 'U'
    params['mvGroupID'] = groupId
    params['mvSavedContent'] =  JSON.stringify(savedContent)
    params['mvAction'] = 'MODIFY'

    return (dispatch) => {
        const savedLayoutWithLanguage = (data) => { savedLayout(data, language, dispatch) }
        api.post(ACTION.UICFGMANAGEMENT, params, dispatch, savedLayoutWithLanguage , 
            function(err){
                let title = language.messagebox.title.failed
                let message = language.messagebox.message.saveLayoutFail
                dispatch(showMessageBox(title, message))

        })
    }
}

function savedLayout(data, language, dispatch) {
    if (data && data.success && data.mvCfgList.length == 0) {
        let title = data.success ?
            language.messagebox.title.success : language.messagebox.title.failed
        let message = data.success ?
            language.messagebox.message.saveLayoutSuccess :
            language.messagebox.message.saveLayoutFail
        dispatch(showMessageBox(title, message))
    }
    return {
        type: ActionTypes.SAVELAYOUT,
    }
}

export function openSideMenu(open) {
    return {
        type: ActionTypes.OPENSIDEMENU,
        open: open
    }
}

export function openSearch(open) {
    return {
        type: ActionTypes.OPENSEARCH,
        open: open
    }
}

export function onMobileMenuSelect(id) {
    var tabID = ""
    var mobileTabs = config.mobileTab
    for(let i = 0; i < mobileTabs.length; i++) {
        let tab = mobileTabs[i]
        let t = tab.widget.filter(wid => wid.i == id)
        if(t.length > 0) {
            tabID = tab.id
            break;
        }
    }
    if(tabID != "") {
        return (dispatch) => {
            dispatch(onMobileTabClick(tabID, id))
        }
    } else {
        return {
            type: 0
        }
    }
}