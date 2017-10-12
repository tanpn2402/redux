import {ActionTypes} from '../core/constants';
import * as api from '../api/web_service_api';
import * as ACTION from '../api/action_name';

export function menuSelected(menuid, pageid, tabList, reload) {
    console.log('menuSelected', tabList)
    pageid = pageid === undefined ? '1' : pageid
  
    if(tabList === undefined || tabList === []){
        tabList = {1:[], 2:[], 3:[], 4: []}
        
        tabList[1].push(menuid)
        return {
                type: ActionTypes.MENU_SELECTED,
                tabList: tabList,
                page: '1',
                reload: !reload

            }
    }
    else if(tabList[pageid] === undefined || tabList[pageid] === []){
        tabList[pageid] = []
        tabList[pageid].push(menuid)
        return {
                type: ActionTypes.MENU_SELECTED,
                tabList: tabList,
                page: pageid,
                reload: !reload

            }
        
    }
    else if( tabList[pageid].length >= 4 ){
        for(var i = parseInt(pageid) + 1; i <= 4; i++){
            if(tabList[i] !== undefined && tabList[i].length < 4 ){
            
                tabList[i].push(menuid)
                return {
                    type: ActionTypes.MENU_SELECTED,
                    tabList: tabList,
                    page: i.toString(),
                    reload: !reload

                }
            }
            else if(tabList[i] === undefined || tabList[i] === []){
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
    else{
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
    return {
        type: ActionTypes.TABCLICKEVENT,
        tabID: tabID,
        subTabID: subTabID,
    }
}


export function reloadCustom(load){
    return {
        type: ActionTypes.RELOADCUSTOM,
        load: !load,
    }
}


export function removeWidget(load){
    return {
        type: ActionTypes.REMOVEWIDGET,
        load: !load
    }
}

export function getSavedContentLayout(params){
    return (dispatch) => {
        api.get(ACTION.UICFGMANAGEMENT, params, dispatch, getSavedLayout)
    }
}

function getSavedLayout(savedcontent){
    return{
        type: ActionTypes.GETSAVEDCONTENTLAYOUT,
        savedcontent: savedcontent
    }
}



export function saveLayout(params){
    return (dispatch) => {
        api.post(ACTION.UICFGMANAGEMENT, params, dispatch, savedLayout)
    }
}

function savedLayout(){
    return{
        type: ActionTypes.SAVELAYOUT
    }
}
