import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants');

const watchlist = []

export function loadWatchList(params) {
  return (dispatch) => {
    api.get(ACTION.GETMARKETDATA, params, dispatch, responseGetMarketData)
  }
}
function responseGetMarketData(response) {
  return {type: ActionTypes.LOADWATCHLIST, watchListData: response}
}

export function addStock(params) {
  console.log(" ADD STOCK ", params)
  return (dispatch) => {
    api.get(ACTION.ADDORREMOVEACTION, params, dispatch, responseAddStock)
  }
}

function responseAddStock(response) {
  return {type: ActionTypes.ADDSTOCK, watchListData: response}
}

export function removeStock(params) {
  console.log(" REMOVE STOCK ", params)
  return (dispatch) => {
    api.get(ACTION.ADDORREMOVEACTION, params, dispatch, responseRemoveStock)
  }
}
function responseRemoveStock(response) {
  return {type: ActionTypes.REMOVESTOCK, watchListData: response}
}

export function addStockToLocalStore(stock) {
  return {type: ActionTypes.ADDSTOCKTOLOCALSTORE, stock: stock}
}

export function removeStockFromLocalStore(stock) {
  return {type: ActionTypes.REMOVESTOCKFROMLOCALSTORE, stock: stock}
}

export function getStocksFromLocalStore() {
  return {type: ActionTypes.GETSTOCKSFROMLOCALSTORE}
}

export function updateStockInfo(stockJson) {
  // console.log(stockJson)
  return {type: ActionTypes.UPDATESTOCKINFO, stockJson: stockJson}
}
