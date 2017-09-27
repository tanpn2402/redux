const { ActionTypes } = require('../core/constants');

const initialState = {
    stockBalance: {},
    stockInfo: {},
    account: null,
    isShow: false,
    isError: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ACCOUNTBALANCE:

            return Object.assign({}, state, {
                account: action.clientInfo.mvList[0].mvBuyingPowerd
            });

        case ActionTypes.STOCKINFO:
            return Object.assign({}, state, {
                stockInfo: action.stockInfo
            });
        case ActionTypes.STOCKBALANCE:
            console.log('reducer stockinfo', action.stockBalance)
            return Object.assign({}, state, {
                stockBalance: action.stockBalance
            });
        case ActionTypes.SET_POPUP:
            return Object.assign({}, state, {
                isShow: action.isShow
            });
        case ActionTypes.SET_ERROR:
            return Object.assign({}, state, {
                isError: action.isError
            });
        default:
            return state;
    }
};
