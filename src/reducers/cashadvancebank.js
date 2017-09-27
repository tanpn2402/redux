const {ActionTypes} = require('../core/constants');

const initialState = {
  queryAdvancePaymentInfo: {
    mvChildBeanList: [],
    mvErrorCode: null,
    mvErrorResult: 'fail',
    mvParentBean: null,
    success: true
  },
  CashAdvanceHistory: {
    list: [],
    totalCount: 0
  },
  queryBankInfo: {
    mvBankInfoList: [],
    mvErrorCode: '0',
    mvErrorResult: 'fail',
    success: true
  },
  calculateInterestAmt: {
    mvErrorCode : null,
    mvErrorResult : "fail",
    mvInterestAmt : "0",
    success : false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.QUERYADVANCEPAYMENTINFO:
        return Object.assign({},state,{
          queryAdvancePaymentInfo: action.queryAdvancePaymentInfo,
        });

    case ActionTypes.GETCASHADVANCEHISTORY:
        action.CashAdvanceHistory.list = action.CashAdvanceHistory.list === null ? [] : action.CashAdvanceHistory.list
        return Object.assign({},state,  {   
          CashAdvanceHistory: action.CashAdvanceHistory,
        });
    case ActionTypes.QUERYBANKINFO:
        return Object.assign({},state,{
          queryBankInfo: action.queryBankInfo,
        })
    case ActionTypes.CALCULATEINTERSETAMT:
    console.log(action.calculateInterestAmt)
        return Object.assign({},state,{
          calculateInterestAmt: action.calculateInterestAmt,
        })

    default:
      return state;
  }
};