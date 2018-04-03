const { ActionTypes } = require('../core/constants');

const initialState = {

  orderList: [],
  totalOrder: 0,

  genmodifyorder: {
    mvGenModifyOrderBean: {},
    mvReturnResult: "",
    mvResult: null
  },

  updateOrderJournal: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENQUIRYORDER:

      let list = action.data.mvOrderBeanList === null ? [] : action.data.mvOrderBeanList
      list = list.concat(state.orderList)
      action.data.mvOrderBeanList = list
      
      return Object.assign({}, state, {
        orderList: list,
        totalOrder: action.data.mvTotalOrders
      });

    case ActionTypes.ORDERENQUIRYFS:

      let list1 = action.data.concat(state.orderList)

      return Object.assign({}, state, {
        orderList: list1,
        totalOrder: action.data.length + state.totalOrder
      })
    case ActionTypes.RESETENQUIRYORDERDATA:
      return Object.assign({}, state, {
        orderList: [],
        totalOrder: 0
      })

    case ActionTypes.GENMODIFYORDER:
      return Object.assign({}, state, {
        genmodifyorder: action.data
      });

    case ActionTypes.UPDATEORDERJOURNAL:
      return Object.assign({}, state, {
        updateOrderJournal: !state.updateOrderJournal
      });

    default:
      return state;
  }
};
