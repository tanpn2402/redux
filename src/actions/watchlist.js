const {ActionTypes} = require('../core/constants');
const watchlist = [{"mvStockId":"SHB","mvStockName":"null"},{"mvStockId":"SHB","mvStockName":"null"},{"mvStockId":"SHB","mvStockName":null}]

export function loadWatchList() {
    
    return {
      type: ActionTypes.LOADWATCHLIST,
      watchListData: watchlist,
    }
  }
  