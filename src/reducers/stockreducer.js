const { ActionTypes } = require('../core/constants');

const initialState = {
  mvIsEnableMultiMarket: true,
  mvResult: null,
  stockList: [],
  stockWatchInfo: {
    mvStockInfoBean: {
      mvNomial: '-',
      mvReferencePrice: '-',
      mvFloor: '-',
      mvCeiling: '-',
      mvLow: '-',
      mvHigh: '-',
      mvDayOpen: '-',
      mvCurrentRoom: '-'
    }
  },
  
};

export default function (state = initialState, action) {
  switch (action.type) {

    case ActionTypes.STOCKSEARCH:
      return Object.assign({}, state, {
        mvIsEnableMultiMarket: action.stockList.mvIsEnableMultiMarket,
        mvResult: action.stockList.mvResult,
        stockList: action.stockList.stockSearchList,
        language: action.language,
      });

    case ActionTypes.STOCKWATCHDATAUPDATE:
      return Object.assign({}, state, {
        stockWatchInfo: Object.assign({}, ...state.stockWatchInfo, action.data == null ? {} : action.data),
      });

    case ActionTypes.STOCKMARKET:
      return Object.assign({}, state, {
          stockCode: action.stockCode,
      });

    default:
      return state;
  }
};
