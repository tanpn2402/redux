const { ActionTypes } = require('../core/constants');

const initialState = {

    genEnterOrder: {
        genEnterOrderBean: {},
        mvDisplaySettlementAccInEnterOrder: '',
        mvEnableOrderType: '',
        mvNumberOfAvailableGoodTillDate: '',
        mvResult: null,
        mvSettlementAccList: []
    },
    orderDefaultParams: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GENENTERORDER:
            return Object.assign({}, state, {
                genEnterOrder: action.data
            });
            
        case ActionTypes.GOTOORDERPLACE:
            return Object.assign({}, state, {
                orderDefaultParams: action.params
            });
        default:
            return state;
    }
};
