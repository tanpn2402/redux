import { ActionTypes } from '../core/constants';
import * as api from '../api/web_service_api';
import * as ACTION from '../api/action_name';
import config from '../core/config';
import { showMessageBox } from '../actions/notification'

export function menuSelected(menuid, pageid, tabList, reload) {
    pageid = pageid === undefined ? '1' : pageid

    if (tabList === undefined || tabList === []) {
        tabList = { 1: [], 2: [], 3: [], 4: [] }

        tabList[1].push(menuid)
        return {
            type: ActionTypes.MENU_SELECTED,
            tabList: tabList,
            page: '1',
            reload: !reload

        }
    }
    else if (tabList[pageid] === undefined || tabList[pageid] === []) {
        tabList[pageid] = []
        tabList[pageid].push(menuid)
        return {
            type: ActionTypes.MENU_SELECTED,
            tabList: tabList,
            page: pageid,
            reload: !reload

        }

    }
    else if (tabList[pageid].length >= 4) {
        for (var i = parseInt(pageid) + 1; i <= 4; i++) {
            if (tabList[i] !== undefined && tabList[i].length < 4) {

                tabList[i].push(menuid)
                return {
                    type: ActionTypes.MENU_SELECTED,
                    tabList: tabList,
                    page: i.toString(),
                    reload: !reload

                }
            }
            else if (tabList[i] === undefined || tabList[i] === []) {
                tabList[i] = []
                tabList[i].push(menuid)

                return {
                    type: ActionTypes.MENU_SELECTED,
                    tabList: tabList,
                    page: i.toString(),
                    reload: !reload

                }
            }
        }
    }
    else {
        tabList[pageid].push(menuid)

        return {
            type: ActionTypes.MENU_SELECTED,
            tabList: tabList,
            page: pageid,
            reload: !reload

        }
    }
};

export function menuRemoved(menuid, pageid, tabList, reload) {
    tabList[pageid] = tabList[pageid].filter(el => el !== menuid)
    return {
        type: ActionTypes.MENU_SELECTED,
        tabList: tabList,
        page: pageid,
        reload: !reload

    }

};

export function onPageClicked(pageid, tabList) {
    return {
        type: ActionTypes.MENU_SELECTED,
        tabList: tabList,
        page: pageid
    }

};

export function onTabClick(tabID, subTabID){
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
