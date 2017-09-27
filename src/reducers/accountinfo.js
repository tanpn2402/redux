const {ActionTypes} = require('../core/constants');

const initialState = {
  accountBalance: {
    mvList: [],
    mvResult: '',
    mvSuccess: true
  },
  accountBalanceBank: {
    mvList: [],
    mvResult: '',
    mvSuccess: true
  },
  overdueDebt: {
    overdueDebt: {},
    mvResult: ''
  },
  upcomingDebt: {
    upcomingDebt: {},
    mvResult: ''
  },
  stock: {
    mvErrorDescription: null,
    mvResult: null,
    mvStockBalanceInfo: [],
    mvStockInfoBean: {}

  }
};

export default function (state = initialState, action) {
  console.log(action.type, action.data);
  switch (action.type) {
    case ActionTypes.GETSTOCKINFO:
        return Object.assign({}, state,{
          stock: action.data,
        });
      case ActionTypes.ACCOUNTBALANCEINFO:
        return Object.assign({}, state,{
          accountBalance: action.data,
        });
      case ActionTypes.ACCOUNTBALANCEBANKINFO:
        return Object.assign({}, state,{
          accountBalanceBank: action.data,
        });
      case ActionTypes.OVERDUEDEBT:
        return Object.assign({}, state,{
          overdueDebt: action.data,
        });
      case ActionTypes.UPCOMINGDEBT:
        return Object.assign({}, state,{
          upcomingDebt: action.data,
        });
    default:
      return state;
  }
};
