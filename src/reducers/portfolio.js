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
    },

    accountBalanceInfoFS: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CLIENTPORTFOLIOENQUIRYFS:
            return Object.assign({}, state, {
                clientPortfolio: action.data,
            });

        case ActionTypes.CASHBALANCEENQUIRYFS:
        // console.log(action.data)
            return Object.assign({}, state, {
                accountBalanceInfoFS: action.data,
            });

        default:
            return state;
    }
};
