const { ActionTypes } = require('../core/constants');
const initialState = {
  watchListData: [],
  watchListLocalStockList: []
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOADWATCHLIST:
      return Object.assign({}, state, {
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
    case ActionTypes.ADDSTOCKTOLOCALSTORE:
      return {
        watchListLocalStockList: state.watchListLocalStockList.concat(action.stock)
      }
    case ActionTypes.REMOVESTOCKFROMLOCALSTORE:
      let newStockList = [...state.watchListLocalStockList]
      newStockList.splice(
        newStockList.indexOf(action.stock), 1)
      return {
        watchListLocalStockList: newStockList
      }
    case ActionTypes.GETSTOCKSFROMLOCALSTORE:
      return {
        watchListLocalStockList: state.watchListLocalStockList
      }
    default:
      return state;
  }
};
