import {ActionTypes} from '../core/constants';

const initialState = {
	tabList: [],
  page: '1',
  tabID: 'portfoliotab',
  widgetList: [],
  load: false,
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

    case ActionTypes.REMOVEWIDGET:
        return Object.assign({},state,{          
          load: action.load
        });
    case ActionTypes.ADDWIDGET:
        return Object.assign({},state,{
          load: action.load,
          widgetList: state.widgetList.concat(action.widgetList)
        })
    default:
      break;
     
  }
  return state;
}
