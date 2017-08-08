const {ActionTypes} = require('../core/constants');

const initialState = {
  stockSearchList: [],
  mvIsEnableMultiMarket: true,
  mvResult: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STOCKSEARCH:
      console.log(action.stockList)
        return Object.assign({},state,{          
          stockSearchList: action.stockList.stockSearchList,
          mvIsEnableMultiMarket: action.stockList.mvIsEnableMultiMarket,
          mvResult: action.stockList.mvResult,
          language: action.language,
        });

      case ActionTypes.ENQUIRYORDER:
      console.log('ENQUIRYORDER', action.data)
        return Object.assign({},state,{          
          
        });

    default:
      return state;
  }
};
