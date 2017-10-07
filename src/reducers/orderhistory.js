const {ActionTypes} = require('../core/constants');

const initialState = {
    historyOrder: {
        mvOrderBeanList: [],
        mvTotalOrders: 0,
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ENQUIRYORDERHISTORY:
            action.data.mvOrderBeanList = action.data.mvOrderBeanList === null ? [] : action.data.mvOrderBeanList
            return Object.assign({}, state, {
                historyOrder: action.data,
            });

        default:
            return state;
    }
};