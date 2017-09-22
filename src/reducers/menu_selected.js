import {ActionTypes} from '../core/constants';

const initialState = {
	tabList : [],
  page: '1',
  tabID: 'customization'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MENU_SELECTED:
        return Object.assign({},state,{          
        	tabList: action.tabList,
        	page: action.page,
        	reload: action.reload,   
        });
    case ActionTypes.TABCLICKEVENT:
        return Object.assign({},state,{          
        	tabID: action.tabID
        });
        
    default:
      break;
     
  }
  return state;
}
