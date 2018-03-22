import config from '../core/config';
const { ActionTypes } = require('../core/constants');

const initialState = {
    mvIsEnableMultiMarket: true,
    mvResult: null,
    stockList: [],
    stockWatchInfo: {
        mvStockInfoBean: {
            mvNomial: '-',
            mvReferencePrice: '-',
            mvFloor: '-',
            mvCeiling: '-',
            mvLow: '-',
            mvHigh: '-',
            mvDayOpen: '-',
            mvCurrentRoom: '-'
        }
    },

    listSeries: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case ActionTypes.STOCKSEARCH:
            let l = action.stockList.stockSearchList.concat(state.stockList)
            config.cache.stockList = l
            return Object.assign({}, state, {
                mvIsEnableMultiMarket: action.stockList.mvIsEnableMultiMarket,
                mvResult: action.stockList.mvResult,
                stockList: l,
                language: action.language,
            });

        case ActionTypes.STOCKWATCHDATAUPDATE:
            return Object.assign({}, state, {
                stockWatchInfo: Object.assign({}, ...state.stockWatchInfo, action.data == null ? {} : action.data),
            });

        case ActionTypes.STOCKMARKET:
            return Object.assign({}, state, {
                stockInfo: action.stockInfo,
                stockWatchInfo: Object.assign({}, ...state.stockWatchInfo, action.data == null ? {} : action.data),
            });

        case ActionTypes.GETFSSERIES:
            let s = action.data.listSeries
            let a = state.stockList
            s.map(e => {
                a.push({
                stockCode: e.id,
                stockName: e.id,
                mvMarketID: e.market
                })
            })
            config.cache.stockList = a
            return Object.assign({}, state, {
                stockList: a,
                listSeries: action.data
            });


        default:
            return state;
    }
};
