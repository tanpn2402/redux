const {ActionTypes} = require('../core/constants');

const initialState = {
  mvIsEnableMultiMarket: true,
  mvResult: null,
  stockList : [],
};

export default function (state = initialState, action) {
  switch (action.type) {
   
      case ActionTypes.STOCKSEARCH:
        return Object.assign({},state,{          
          mvIsEnableMultiMarket: action.stockList.mvIsEnableMultiMarket,
          mvResult: action.stockList.mvResult,
          stockList : action.stockList.stockSearchList,
          language: action.language,
        });

    default:
      return state;
  }
};
