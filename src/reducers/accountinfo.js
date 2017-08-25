const {ActionTypes} = require('../core/constants');

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ACCOUNTINFO:
        return Object.assign({}, state,{
          data: action.data,
        });
      case ActionTypes.ACCOUNTBALANCEINFO:
        console.log(action.type, action.data)
        return Object.assign({}, state,{
          accountbalance: action.data,
        });
    default:
      return state;
  }
};
