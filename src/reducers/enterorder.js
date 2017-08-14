const { ActionTypes } = require('../core/constants');

const initialState = {
    stockInfoList: {},
    stockInfoACB:{},
    account: null,
    isShow:false,
    isError:null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ACCOUNTBALANCE:
            
            return Object.assign({}, state, {
                account: action.clientInfo.mvList[0].mvBuyingPowerd
            });

        case ActionTypes.STOCKINFO:
            console.log('reducer', action.stockInfoB.mvStockInfoBean)
            return Object.assign({}, state, {
                stockInfoList: action.stockInfoS.mvStockBalanceInfo[8],
                stockInfoACB: action.stockInfoB.mvStockInfoBean
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
