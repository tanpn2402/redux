import {ActionTypes} from '../core/constants';

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
    console.log('menuRemoved', menuid)
    tabList[pageid] = tabList[pageid].filter(el => el !== menuid)
	return {
            type: ActionTypes.MENU_SELECTED,
            tabList: tabList,
            page: pageid,
            reload: !reload

        }
  
};

export function onPageClicked(pageid, tabList) {
    
        console.log(pageid)
        return {
            type: ActionTypes.MENU_SELECTED,
            tabList: tabList,
            page: pageid
        }
  
};

export function onTabClick(tabID){
    return {
        type: ActionTypes.TABCLICKEVENT,
        tabID
    }
}



export function removeWidget(load){
    return {
        type: ActionTypes.REMOVEWIDGET,
        load: !load
    }
}
