import {ActionTypes} from '../core/constants';

const initialState = {
	tabList : [],
	page: '1'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MENU_SELECTED:
        console.log('reducers',action.tabList, 'page', action.page)
        return Object.assign({},state,{          
        	tabList: action.tabList,
        	page: action.page,
        	reload: action.reload,   
        });
        
    default:
      break;
     
  }
  return state;
}
