const {
    ActionTypes
} = require('../core/constants');

const initialState = {
    cashAdvanceHistory: {
        list: [],
        totalCount: 0
    },

    soldOrders: {
        mvChildBeanList: [],
        totalCount: 0
    },

    localAdCreation: {
        mvAdvanceBean:{}
    }
};

export default function(state = initialState, action) {

    switch (action.type) {
        case ActionTypes.GETCASHADVANCEHISTORY:
            return Object.assign({}, state, {
                cashAdvanceHistory: action.CashAdvanceHistory,
            });

        case ActionTypes.QUERYSOLDORDERS:
            return Object.assign({}, state, {
                soldOrders: action.SoldOrders,
            });
        // case ActionTypes.GETLOCALADVANCECREATION:
        //     return Object.assign({}, state, {
        //         localAdCreation: action.data,
        //     })

        default:
            return state;
    }
};