const {ActionTypes} = require('../core/constants');
const initialState = {
    watchListData: [],
    
  };
export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOADWATCHLIST:
          return Object.assign({},state,{          
            watchListData: action.watchListData,
          });
        case ActionTypes.ADDSTOCK:
          return Object.assign({}, state, {
            watchListData: action.watchListData,
          });
        case ActionTypes.REMOVESTOCK:
          return Object.assign({}, state, {
            watchListData: action.watchListData,
          });
      default:
        return state;
    }
  };