const {ActionTypes} = require('../core/constants');

const initialState = {
  datacashtransfer: [],
  datacashtable: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CASHTRANSFER:
        return Object.assign({},state,{
          datacashtransfer: action.data,
        });
    case ActionTypes.CASHDATATABLE:
        return Object.assign({},state,{
          datacashtable: action.data,
        });
    default:
      return state;
  }
};
