const {ActionTypes} = require('../core/constants');
const watchlist = [{"mvStockId":"SHB","mvStockName":"null"},{"mvStockId":"SHB","mvStockName":"null"},{"mvStockId":"SHB","mvStockName":null}]

export function loadWatchList() {
    return {
      type: ActionTypes.LOADWATCHLIST,
      watchListData: watchlist,
    }
}
 
export function addStock(value) {
  var newPair={}
  newPair.mvStockId=value,
  newPair.mvStockName="null"
  return {
    type: ActionTypes.ADDSTOCK,
    newStock: value,
    watchListData: watchlist.push(newPair)
  }
}