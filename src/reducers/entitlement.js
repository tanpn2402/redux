const {ActionTypes} = require('../core/constants');

const initialState = {
  datarightlist: [],
  datahistorylist: [],
  dataadditionalsharelist: [],
  dynamicdata: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENTITLEMENTRIGHTLIST:
        return Object.assign({},state,{
          datarightlist: action.data,
        });
    case ActionTypes.ENTITLEMENTADDITIONALSHARELIST:
        return Object.assign({},state,{
          dataadditionalsharelist: action.data,
        });
    case ActionTypes.ENTITLEMENTHISTORYLIST:
        return Object.assign({},state,{
          datahistorylist: action.data,
        });
    case ActionTypes.DYNAMICDATA:
        return Object.assign({},state,{
          dynamicdata: action.data,
        });
    default:
      return state;
  }
};
