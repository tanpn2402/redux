const { ActionTypes } = require('../core/constants')

const initialState = {
    data: {
        mvOrderBeanList: [],
        mvTotalOrders: 0
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ENQUIRYCONFIRMORDER:
            action.data.mvOrderBeanList = action.data.mvOrderBeanList == null ? [] : action.data.mvOrderBeanList
            return Object.assign({}, state, {
                data: action.data
            });

        default:
            return state;
    }
};