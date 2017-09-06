const {ActionTypes} = require('../core/constants');

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  console.log(action.type, action.data);
  switch (action.type) {
    case ActionTypes.ACCOUNTINFO:
        return Object.assign({}, state,{
          data: action.data,
        });
      case ActionTypes.ACCOUNTBALANCEINFO:
        return Object.assign({}, state,{
          accountbalance: action.data,
        });
      case ActionTypes.OVERDUEDEBT:
        return Object.assign({}, state,{
          overdueDebt: action.data.overdueDebt,
        });
      case ActionTypes.UPCOMINGDEBT:
        return Object.assign({}, state,{
          upcomingdebt: action.data,
        });
    default:
      return state;
  }
};
