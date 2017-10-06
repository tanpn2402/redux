const {ActionTypes} = require('../core/constants');

const initialState = {
  mvIsEnableMultiMarket: true,
  mvResult: null,
  stockList : [],
  stockWatchInfo: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
   
      case ActionTypes.STOCKSEARCH:
        console.log('TANNN', action)
        return Object.assign({},state,{          
          mvIsEnableMultiMarket: action.stockList.mvIsEnableMultiMarket,
          mvResult: action.stockList.mvResult,
          stockList : action.stockList.stockSearchList,
          language: action.language,
        });

      case ActionTypes.STOCKWATCHDATAUPDATE:
        return Object.assign({}, state, {
          stockWatchInfo: action.data,
        });

    default:
      return state;
  }
};
