import {ActionTypes} from '../core/constants';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MENU_SELECTED:
        console.log([action.menuid, action.newPage])
        return action.tabList;
    default:
      break;
     
  }
  return state;
}
