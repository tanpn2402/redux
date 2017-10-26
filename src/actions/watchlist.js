import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants');

const watchlist = [{"mvStockId":"SHB","mvStockName":"1"},{"mvStockId":"ACB","mvStockName":"2"},
{"mvStockId":"ACC","mvStockName":"3"},{"mvStockId":"SHA","mvStockName":"4"},
{"mvStockId":"AAC","mvStockName":"5"},{"mvStockId":"AHC","mvStockName":"6"},
{"mvStockId":"ABB","mvStockName":"7"},{"mvStockId":"AHH","mvStockName":"8"},
{"mvStockId":"CCC","mvStockName":"9"},{"mvStockId":"HHH","mvStockName":"10"}]

export function loadWatchList(params) {
  return (dispatch)=>{
    api.get(ACTION.GETMARKETDATA,params,dispatch,responseGetMarketData)
  }
}
function responseGetMarketData(response){
  return {
      type: ActionTypes.LOADWATCHLIST,
      watchListData: response,
  }
}
 
export function addStock(params) {
  return (dispatch)=>{
    api.get(ACTION.ADDORREMOVEACTION,params,dispatch,responseAddStock)
  }
}

function responseAddStock(response){
  return {
      type: ActionTypes.ADDSTOCK,
      watchListData: response,
  }
}


export function removeStock(params) {
  return (dispatch)=>{
    api.get(ACTION.ADDORREMOVEACTION,params,dispatch,responseRemoveStock)
  }
}
function responseRemoveStock(response){
  return {
      type: ActionTypes.REMOVESTOCK,
      watchListData: response,
  }
}
