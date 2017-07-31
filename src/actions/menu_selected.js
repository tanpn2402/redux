import {ActionTypes} from '../core/constants';

export function menuSelected(menuid, tabList) {
    
    var _tablist = [menuid, ...tabList]
    console.log('action menuSelected', _tablist)
    

	if(_tablist.length <= 4){
        return {
            type: ActionTypes.MENU_SELECTED,
            menuid,
            newPage: false,
            tabList: _tablist,

        };
    }
    else{
        return {
            type: ActionTypes.MENU_SELECTED,
            menuid,
            newPage: true,
            tabList: _tablist,
            
        };
    }
  
};

export function menuRemoved(menuid, tabList) {
    
    var _tablist = tabList.filter(el => el != menuid);
    
    console.log('action menuRemoved', tabList)
    
	if(_tablist.length <= 4){
        return {
            type: ActionTypes.MENU_SELECTED,
            menuid,
            newPage: false,
            tabList: _tablist
        };
    }
    else{
        return {
            type: ActionTypes.MENU_SELECTED,
            menuid,
            newPage: true,
            tabList: _tablist
        };
    }
  
};
