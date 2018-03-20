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
      action.data.mvOrderBeanList = action.data.mvOrderBeanList === null ? [] : action.data.mvOrderBeanList
      return Object.assign({}, state, {
        enquiryorder: action.data
      });

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
