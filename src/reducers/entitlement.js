const {ActionTypes} = require('../core/constants');

const initialState = {
  allRightList: {
    mvResult: null,
    mvReturnCode: 0,
    rightList: [],
    totalCount: "0"
  },
  entitlementHistory: {
    historyList: [],
    mvResult: null,
    mvReturnCode: 0,
    totalCount: "0"
  },
  entitlementStockList: {
    mvResult: null,
    mvReturnCode: 0,
    stockCmbList: []
  },
  additionIssueShareInfo: {
    additionList: [],
    mvResult: null,
    mvReturnCode: 0,
    totalCount: "0"
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENTITLEMENTRIGHTLIST:
        action.data.rightList = action.data.rightList === null ? [] : action.data.rightList
        return Object.assign({},state,{
          allRightList: action.data,
        });
    case ActionTypes.ENTITLEMENTADDITIONALSHARELIST:
        action.data.additionList = action.data.additionList === null ? [] : action.data.additionList
        return Object.assign({},state,{
          additionIssueShareInfo: action.data,
        });
    case ActionTypes.ENTITLEMENTHISTORYLIST:
        action.data.historyList = action.data.historyList === null ? [] : action.data.historyList
        return Object.assign({},state,{
          entitlementHistory: action.data,
        });
    case ActionTypes.ENTITLEMENTSTOCKLIST:
        return Object.assign({},state,{
          entitlementStockList: action.data,
        });
    case ActionTypes.DYNAMICDATA:
        return Object.assign({},state,{
          dynamicdata: action.data,
        });
    default:
      return state;
  }
};
