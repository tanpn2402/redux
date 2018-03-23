const { ActionTypes } = require('../core/constants');

const initialState = {
  enquiryorder: {
    mvOrderBeanList: [],
    mvTotalOrders: 0,
    mvTotalTaxFee: "0"
  },

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
      list = list.concat(state.enquiryorder.mvOrderBeanList)
      action.data.mvOrderBeanList = list
    console.log(list)
      return Object.assign({}, state, {
        enquiryorder: action.data
      });

    case ActionTypes.ORDERENQUIRYFS:
    console.log(action.data)
      let list1 = action.data.concat(state.enquiryorder.mvOrderBeanList)
      // state.enquiryorder.mvTotalOrders = list1.length
     console.log(list1)
      let a = state.enquiryorder
      a.mvOrderBeanList = list1


      return Object.assign({}, state, {
        enquiryorder: a
      })
    case ActionTypes.RESETENQUIRYORDERDATA:
      return Object.assign({}, state, {
        enquiryorder: {mvOrderBeanList: [], mvTotalOrders: 0}
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
