const {ActionTypes} = require('../core/constants');
const watchlist = [{"mvStockId":"SHB","mvStockName":"1"},{"mvStockId":"ACB","mvStockName":"2"},
{"mvStockId":"ACC","mvStockName":"3"},{"mvStockId":"SHA","mvStockName":"4"},
{"mvStockId":"AAC","mvStockName":"5"},{"mvStockId":"AHC","mvStockName":"6"},
{"mvStockId":"ABB","mvStockName":"7"},{"mvStockId":"AHH","mvStockName":"8"},
{"mvStockId":"CCC","mvStockName":"9"},{"mvStockId":"HHH","mvStockName":"10"}]

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
  console.log("param la: ",param)
  //param= param === undefined ? [] : param
  var newList=watchlist
  if(param === watchlist){
    newList=[]
  }else{
    param.map(deleteStock => {
      watchlist.map(stock => {
        if(stock.mvStockId=== deleteStock.mvStockId){
          newList.splice(watchlist.indexOf(stock),1)
        }
      })
    })
  }
  return {
    type: ActionTypes.REMOVESTOCK,
    watchListData: newList
  }
}