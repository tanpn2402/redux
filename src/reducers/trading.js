import config from '../core/config';

const {ActionTypes} = require('../core/constants');

const initialState = {
    instrument: "",     // current stock user is watching in tranding page, it affect to WatchlistSmall, PlaceOrder,
    // TradeHistory(TradeLog), BidAskTable
    listInstrumentToWatch: [],  // list stock includes: list stock in watchlist and stock user choosed
    listInstrumentData: [], // list stock and its data
    listInstrumentInWatchList: [],  // list stock in watchlist table

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
    },


    instrumentData: {},
    flag: true
};

export default function(state = initialState, action) {
    
    switch (action.type) {
        // change default instrument in trading page
        case ActionTypes.CHANGEINSTRUMENT: {
            let listInstrumentToWatchTMPX = state.listInstrumentToWatch

            if(listInstrumentToWatchTMPX.indexOf(action.instrument) < 0) {
                listInstrumentToWatchTMPX = [...listInstrumentToWatchTMPX, action.instrument]
                config.cache.listInstrumentToWatch = listInstrumentToWatchTMPX
            }

            // check if previous instrument in listInstrumentToWatch
            // if(listInstrumentToWatchTMPX.indexOf(action))

  
            return Object.assign({}, state, {
                instrument: action.instrument,
                listInstrumentToWatch: listInstrumentToWatchTMPX
            });
        }

        // add instrument to watch ( not to watchlist)
        case ActionTypes.ADDINSTRUMENTTOWATCH: {
            // console.log("ADDINSTRUMENTTOWATCH  REDUCERS", action)
            let listDataTmp1 = genDefaultData(state.listInstrumentData, action)
            let tmp = state.listInstrumentToWatch
            if(action.instrument != null && state.listInstrumentInWatchList.indexOf(action.instrument) < 0
                && tmp.indexOf(action.instrument) < 0)
            {
                tmp = [...state.listInstrumentToWatch, action.instrument]
            }

            config.cache.listInstrumentToWatch = tmp

            return Object.assign({}, state, {
                listInstrumentToWatch: tmp,
                listInstrumentData: listDataTmp1,
                flag: !state.flag
            });
        }
        
        // remove instrument from watch (not from watchlist)
        case ActionTypes.REMOVEINSTRUMENTFROMWATCH: {
            // console.log("REMOVEINSTRUMENTFROMWATCH  REDUCERS", action)
            let tmp0 = state.listInstrumentToWatch.filter(e => e != action.instrument)
            config.cache.listInstrumentToWatch = tmp0
            return Object.assign({}, state, {
                listInstrumentToWatch: tmp0
            });
        }

        // add instrument to watchlist ( to db also )
        case ActionTypes.ADDINSTRUMENTTOWATCHLIST: {
            let listDataTmp2 = genDefaultData(state.listInstrumentData, action)
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
                listInstrumentToWatch: listInstrumentToWatchTMP1,
                listInstrumentData: listDataTmp2
            });
        }

        // remove instrument from watchlist (from db also )
        case ActionTypes.REMOVEINSTRUMENTFROMWATCHLIST: {
            let listInstrumentToWatchTMP2 = state.listInstrumentToWatch
            let listInstrumentDataTMPX10 = state.listInstrumentData
            // neu trong ds watch co ins nay && ins nay khac voi ins truoc do && trong ds portfolio khong co ins nay
            if(listInstrumentToWatchTMP2.indexOf(action.instrument) > -1 && state.instrument != action.instrument &&
                state.portfolioData.mvPortfolioBeanList.filter(e => e.mvStockID == action.instrument).length < 1) {

                listInstrumentToWatchTMP2 = listInstrumentToWatchTMP2.filter(e => e != action.instrument)
                listInstrumentDataTMPX10 = state.listInstrumentData.filter(e => e.mvStockCode != action.instrument)
                config.cache.listInstrumentToWatch = listInstrumentToWatchTMP2
            }

            return Object.assign({}, state, {
                listInstrumentInWatchList: state.listInstrumentInWatchList.filter(e => e != action.instrument),
                listInstrumentToWatch: listInstrumentToWatchTMP2,
                listInstrumentData: listInstrumentDataTMPX10
            });
        }
        
        // update watchlist data (includes all instrument watched in watchlist small widget)
        case ActionTypes.UPDATEWATCHLISTDATA: {
            let json = action.data
            for(let key in json) {
                if(json[key] == null || json[key] == "-" || json[key] == "0" || json[key] == 0) {
                    delete json[key]
                }
            }
            // console.log("UPDATEWATCHLISTDATA   aaaaaaaaaaa", json)

           
            let dataTemp = state.listInstrumentData.slice(0)
            let dataTmp2 = dataTemp

            dataTmp2 = dataTmp2.filter(e=> {
                if(e.mvStockCode == json.mvStockCode && e.mvMarket == json.mvMarket) return true
                else return false
            })
            
            if(dataTmp2.length > 0) {
                Object.assign(dataTmp2[0], json)
            } else {
                dataTemp.push(json)
            }
            
            return Object.assign({}, state, {
                listInstrumentData: dataTemp,
                instrumentData: json
            });
        }

        // portfolio data
        case ActionTypes.PORFOLIO: {
            let portfolioDataList = action.data.mvPortfolioBeanList
            portfolioDataList = portfolioDataList === null ? [] : portfolioDataList
            let tmp9 = portfolioDataList.map(e => e.mvStockID)
            let tmp10 = state.instrument == "" ? [] : [state.instrument]
            let tmp11 = [...new Set([...state.listInstrumentInWatchList, ...tmp9, ...tmp10 ])]
            config.cache.listInstrumentToWatch = tmp11

            // console.log(state, config.cache.listInstrumentToWatch)
            action.data.mvPortfolioBeanList = portfolioDataList
            return Object.assign({},state,{
                portfolioData: action.data,
                listInstrumentToWatch: tmp11,
                listInstrumentInPortfolio: tmp9
            });
        }

        case ActionTypes.GETLISTSTOCKINWATCHLIST: {
            let list = action.list
            let listAAA = list.map(e => { return e.mvStockCode })
            // list = [{mvStockCode: XXX, mvMarket: YYY}, {....}, ....]
            let listDataTmp3 = action.stockData
            let tmpIns = listAAA.length > 0 ? listAAA[0] : ""
            let tmp12 = [...new Set([...state.listInstrumentInPortfolio, ...listAAA])]
            config.cache.listInstrumentToWatch = tmp12
            // console.log(state, config.cache.listInstrumentToWatch)
            return Object.assign({},state,{
                instrument: tmpIns,
                listInstrumentToWatch: tmp12,
                listInstrumentInWatchList: listAAA,
                listInstrumentData: listDataTmp3
            });
        }

        default:
            return state;
    }
};

function genDefaultData(listInstrumentData, action) {
    if(action.stockData != undefined) {
        let tmp = listInstrumentData.filter(e => e.mvStockCode == action.instrument && e.mvMarket == action.market)
        if(tmp.length > 0) {
            Object.assign(tmp, action.stockData)
        } else {
            listInstrumentData.push(action.stockData)
        }
    }
    
    return listInstrumentData
}