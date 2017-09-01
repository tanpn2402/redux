const {ActionTypes} = require('../core/constants');

const initialState = {
  queryAdvancePaymentInfo: [],
  CashAdvanceHistory: [],
  queryBankInfo: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.QUERYADVANCEPAYMENTINFO:
        return Object.assign({},state,{
          queryAdvancePaymentInfo: action.queryAdvancePaymentInfo,
        });

    case ActionTypes.GETCASHADVANCEHISTORY:
        return Object.assign({},state,{   
          CashAdvanceHistory: action.CashAdvanceHistory,
        });
    case ActionTypes.QUERYBANKINFO:
        return Object.assign({},state,{
          queryBankInfo: action.queryBankInfo,
        })

    default:
      return state;
  }
};