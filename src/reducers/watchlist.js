import * as Utils from '../ttl/utils/TTLUtils'

const { ActionTypes } = require('../core/constants');
const initialState = {
  watchListData: [],
  watchListLocalStockList: []
};


export default function (state = initialState, action) {
  switch (action.type) {

    case ActionTypes.LOADWATCHLIST:
      if (action.watchListData == null) return;      
      return Object.assign({}, state, {
        watchListData: action.watchListData,
      });
    case ActionTypes.ADDSTOCK:
      if (action.watchListData == null) return;
      return Object.assign({}, state, {
        watchListData: action.watchListData,
      });

    case ActionTypes.REMOVESTOCK:
      if (action.watchListData == null) return;      
      return Object.assign({}, state, {
        watchListData: action.watchListData,
      });

    case ActionTypes.ADDSTOCKTOLOCALSTORE:
      if (action.stock != null) {
        var curStock = state.watchListLocalStockList.find(stock => (action.stock.mvStockCode == stock.mvStockCode))
        if (curStock != null) {
          curStock = Object.assign(curStock, action.stock)
        }
        return {
          watchListLocalStockList: state.watchListLocalStockList.concat(action.stock)
        }
    }
      
    case ActionTypes.REMOVESTOCKFROMLOCALSTORE:      
      let newStockList = [...state.watchListLocalStockList]
      newStockList.splice(
        newStockList.findIndex(stock => {
          return stock.mvStockCode == action.stock.mvStockCode && stock.mvMarketID == action.stock.mvMarketID
        }), 1)
      return {
        watchListLocalStockList: newStockList
      }
      
    case ActionTypes.GETSTOCKSFROMLOCALSTORE:
      return {
        watchListLocalStockList: state.watchListLocalStockList
      }

    case ActionTypes.UPDATESTOCKINFO:
      if (state.watchListData == undefined) {
        state.watchListData = new Array();
      }
      var newStockList = [...state.watchListData]
      // console.log("REDUCER",action.stockJson, newStockList)      
      let willBeUpdatedStock = newStockList.find(stock => action.stockJson.mvStockCode == stock.mvStockCode)
      // console.log("WIllbeupdated: ",willBeUpdatedStock)
      if (willBeUpdatedStock != null) {
        // console.log("||| ",willBeUpdatedStock)        
        willBeUpdatedStock = Utils.mergeObjectOmitNull(willBeUpdatedStock, action.stockJson)
        // console.log("||| ",willBeUpdatedStock)
      } else {
        willBeUpdatedStock = action.stockJson
        newStockList = state.watchListData.concat(willBeUpdatedStock)
      }
      // console.log("New stock", newStockList)
      return {
        watchListData: newStockList
      }
      
    default:
      return state;
  }
};
