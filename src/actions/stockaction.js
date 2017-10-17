import * as api from '../api/web_service_api'
import config from '../core/config'

const {ActionTypes} = require('../core/constants');

export function stockSearch(param) {
    // return {
    //     type: ActionTypes.STOCKSEARCH,
    //     stockList: []
    //   }
    return function (dispatch) {
    	dispatch( api.post('stockSearch.action', param, dispatch,stockListResponse) )
    }
}

function stockListResponse(response){
	config.cache.stockList = response.stockSearchList
	return {
      type: ActionTypes.STOCKSEARCH,
      stockList: response
    }
}

export function getStockWatchInfo(stockInfo) {
    var response = (stockWatchData) => {
        return {
            type: ActionTypes.STOCKWATCHDATAUPDATE,
            data: stockWatchData
        }
    }

    var param = {
        mvInstrument: stockInfo.stockCode,
        mvMarketId:	stockInfo.mvMarketID,
        mvBS: 'B',
        mvEnableGetStockInfo: 'N',
        mvAction: 'OI,BP',
        key: new Date(),
    }

    return function(dispatch) {
    	api.post('stockInfo.action', param, dispatch, response)
    }
}
