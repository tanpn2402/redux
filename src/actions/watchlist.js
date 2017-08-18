const {ActionTypes} = require('../core/constants');
const watchlist = [{"mvStockId":"SHB","mvStockName":"null"},{"mvStockId":"ACB","mvStockName":"null"},{"mvStockId":"ACC","mvStockName":null}]

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
export function removeStock(param) {
  console.log("param la: "+param)
  for(var i=0; i<param.length;i++){
    for(var j=0; j<watchlist.length;j++)
      if(watchlist[j]['mvStockId']=== param[i]['mvStockId'])
        delete watchlist[j]
  }
  return {
    type: ActionTypes.REMOVESTOCK,
    watchListData: watchlist
  }
}