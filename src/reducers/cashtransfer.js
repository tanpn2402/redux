const { ActionTypes } = require('../core/constants');

const initialState = {
  datafundtransfer: {

  },
  datahkscashtranhis: [],
  datagenfundtransfer: {
    chargeRate: null,
    mvAvailable: 0.000,
    mvBalance: 0,
    mvClientID: "",
    mvErrorCode: 0,
    mvErrorResult: "fail",
    mvFundTransferFrom: null,
    mvIsPasswordConfirm: false,
    mvIsSecurityCodeConfirm: false,
    mvReceiversList: [{
      receiverAccID: "",

    }],
    mvTargetAccountList: null
  },
  cancelfundtransfer: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FUNDTRANSFER:
      return Object.assign({}, state, {
        datafundtransfer: action.data,
      });
    case ActionTypes.HKSCASHTRANHIS:
      action.data.list = action.data.list === null ? [] : action.data.list
      return Object.assign({}, state, {
        datahkscashtranhis: action.data,
      });
    case ActionTypes.GENFUNDTRANSFER:
      console.log(action.data, initialState.datagenfundtransfer)
      return Object.assign({}, state, {
        datagenfundtransfer: action.data == null ? initialState.datagenfundtransfer : action.data,
      });
    case ActionTypes.CANCELFUNDTRANSFER:
      return Object.assign({}, state, {
        cancelfundtransfer: action.data,
      });
    default:
      return state;
  }
};
