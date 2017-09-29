const {ActionTypes} = require('../core/constants');

const initialState = {
  datafundtransfer: [],
  datahkscashtranhis: [],
  datagenfundtransfer: [],
  cancelfundtransfer: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FUNDTRANSFER:
        return Object.assign({},state,{
          datafundtransfer: action.data,
        });
    case ActionTypes.HKSCASHTRANHIS:
        return Object.assign({},state,{
          datahkscashtranhis: action.data,
        });
    case ActionTypes.GENFUNDTRANSFER:
        return Object.assign({},state,{
          datagenfundtransfer: action.data,
        });
    case ActionTypes.CANCELFUNDTRANSFER:
        return Object.assign({},state,{
          cancelfundtransfer: action.data,
        });
    default:
      return state;
  }
};
