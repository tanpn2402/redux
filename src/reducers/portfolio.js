const {ActionTypes} = require('../core/constants');

const initialState = {
    clientPortfolio: {
        closePositionSummaryList: [],
        counterPartyDWList: [],
        openPositionSummaryList: [],
        stockBalanceList: null,
        stockMovementList: null,
        closePositionList: null,
        openPositionList: null
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CLIENTPORTFOLIOENQUIRYFS:
            return Object.assign({}, state, {
                clientPortfolio: action.data,
            });
        default:
            return state;
    }
};
