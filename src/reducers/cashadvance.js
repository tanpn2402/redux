const {ActionTypes} = require('../core/constants');

const initialState = {
  CashAdvanceHistory: [],
  SoldOrders: [],
  LocalAdvance: [],
};

export default function (state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case ActionTypes.GETCASHADVANCEHISTORY:  
        return Object.assign({},state,{
          CashAdvanceHistory: action.CashAdvanceHistory,
        });

    case ActionTypes.QUERYSOLDORDERS:
        return Object.assign({},state,{   
          SoldOrders: action.SoldOrders,
        });
    case ActionTypes.GETLOCALADVANCECREATION:
        return Object.assign({},state,{
          LocalAdvance: action.LocalAdvance,
        })

    default:
      return state;
  }
};
