import config from '../core/config';

const {ActionTypes} = require('../core/constants');

const initialState = {
    instrument: "ACB",     // current stock user is watching in tranding page, it affect to WatchlistSmall, PlaceOrder,
    // TradeHistory(TradeLog), BidAskTable
    listInstrumentToWatch: ["ACB", "VNM"],  // list stock includes: list stock in watchlist and stock user choosed
    listInstrumentData: [], // list stock and its data
    listInstrumentInWatchList: ["ACB", "VNM"],  // list stock in watchlist table

    listInstrumentInPortfolio: [],
    portfolioData: {        // portfolio data bean, it affect to Portfolio Widget
        mvAccountType: '',
        mvEnableGridHeadMenu: false,
        mvMessage: '',
        mvPortfolioAccSummaryBean: {},
        mvPortfolioBeanList: [],
        mvResult: '',
        totalMarketValue: '',
        totalPL: '',
        totalPLPercent: '',
        totalWACValue: ''
    }
};

export default function(state = initialState, action) {
    
    switch (action.type) {
        // change default instrument in trading page
        case ActionTypes.CHANGEINSTRUMENT:
            let listInstrumentToWatchTMPX = state.listInstrumentToWatch

            if(listInstrumentToWatchTMPX.indexOf(action.instrument) < 0) {
                listInstrumentToWatchTMPX = [...listInstrumentToWatchTMPX, action.instrument]
                config.cache.listInstrumentToWatch = listInstrumentToWatchTMPX
            }
            return Object.assign({}, state, {
                instrument: action.instrument,
                listInstrumentToWatch: listInstrumentToWatchTMPX
            });

        // add instrument to watch ( not to watchlist)
        case ActionTypes.ADDINSTRUMENTTOWATCH:
            let tmp = state.listInstrumentToWatch
            if(action.instrument != null && state.listInstrumentInWatchList.indexOf(action.instrument) < 0) {
                tmp = [...state.listInstrumentToWatch, action.instrument]
            }

            config.cache.listInstrumentToWatch = tmp

            return Object.assign({}, state, {
                listInstrumentToWatch: tmp
            });

        // remove instrument from watch (not from watchlist)
        case ActionTypes.REMOVEINSTRUMENTFROMWATCH:
            let tmp0 = state.listInstrumentToWatch.filter(e => e != action.instrument)
            config.cache.listInstrumentToWatch = tmp0
            return Object.assign({}, state, {
                listInstrumentToWatch: tmp0
            });

        // add instrument to watchlist ( to db also )
        case ActionTypes.ADDINSTRUMENTTOWATCHLIST:
            let tmp1 = state.listInstrumentInWatchList
            let listInstrumentToWatchTMP1 = state.listInstrumentToWatch
            if(action.instrument != null) {
                tmp1 = [...state.listInstrumentInWatchList, action.instrument]

                if(listInstrumentToWatchTMP1.indexOf(action.instrument) < 0) {
                    listInstrumentToWatchTMP1 = [...listInstrumentToWatchTMP1, action.instrument]
                }
            }

            config.cache.listInstrumentToWatch = listInstrumentToWatchTMP1

            return Object.assign({}, state, {
                listInstrumentInWatchList: tmp1,
                listInstrumentToWatch: listInstrumentToWatchTMP1
            });
        
        // remove instrument from watchlist (from db also )
        case ActionTypes.REMOVEINSTRUMENTFROMWATCHLIST:
            let listInstrumentToWatchTMP2 = state.listInstrumentToWatch
            if(listInstrumentToWatchTMP2.indexOf(action.instrument) > -1 && state.instrument != action.instrument) {
                listInstrumentToWatchTMP2 = listInstrumentToWatchTMP2.filter(e => e != action.instrument)
            }

            config.cache.listInstrumentToWatch = listInstrumentToWatchTMP2

            return Object.assign({}, state, {
                listInstrumentInWatchList: state.listInstrumentInWatchList.filter(e => e != action.instrument),
                listInstrumentToWatch: listInstrumentToWatchTMP2
            });
        
        
        // update watchlist data (includes all instrument watched in watchlist small widget)
        case ActionTypes.UPDATEWATCHLISTDATA: 
        
            return Object.assign({}, state, {
                listInstrumentData: action.data
            });


        // portfolio data
        case ActionTypes.PORFOLIO:
            let portfolioDataList = action.data.mvPortfolioBeanList
            portfolioDataList = portfolioDataList === null ? [] : portfolioDataList
            let tmp9 = portfolioDataList.map(e => e.mvStockID)
            let tmp10 = state.instrument == "" ? [] : [state.instrument]
            let tmp11 = [...new Set([...state.listInstrumentInWatchList, ...tmp9, ...tmp10 ])]
            config.cache.listInstrumentToWatch = tmp11
            action.data.mvPortfolioBeanList = portfolioDataList
            return Object.assign({},state,{
                portfolioData: action.data,
                listInstrumentToWatch: tmp11,
                listInstrumentInPortfolio: tmp9
            });

        default:
            return state;
    }
};