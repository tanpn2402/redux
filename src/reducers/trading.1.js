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
    listInstrument: {},  // {mvStockCode: "ACB", mvMarket: "HA"}

    flag: false
};


/* ham nay tra ve 1 danh sach data moi */
function mapToListData(action, state) {
    let listInstrumentData = state.listInstrumentData
    
    if(action.stockData != undefined) {
        let tmp = listInstrumentData.filter(e => e.mvStockCode == action.instrument && e.mvMarket == action.market)
        if(tmp.length > 0) {
            Object.assign(tmp, action.stockData)
        } else {
            listInstrumentData.push(action.stockData)
        }
    }
    
    return {
        listInstrumentData: listInstrumentData
    }
}

function addToListWatch(action, state) {
    let listInstrumentToWatch = state.listInstrumentToWatch
    let tmp = listInstrumentToWatch.filter(e => e == action.instrument)
    if(tmp.length < 1) {
        listInstrumentToWatch.push(action.instrument)
    }

    config.cache.listInstrumentToWatch = listInstrumentToWatch
    return {
        listInstrumentToWatch: listInstrumentToWatch
    }
}

function removeFromListWatch(action, state) {
    let listToWatch = state.listInstrumentToWatch
    let listWatch = state.listInstrumentInWatchList
    let listPortfolio = state.listInstrumentInPortfolio

    let tmp1 = listWatch.filter(e => e == action.instrument)
    let tmp2 = listPortfolio.filter(e => e == action.instrument)
    if(tmp1.length > 0 || tmp2.length > 0) {
        // k remove
    } else {
        // -> remove
        listToWatch = listToWatch.filter(e => e != action.instrument)
    }

    config.cache.listInstrumentToWatch = listToWatch
    return {
        listInstrumentToWatch: listToWatch
    }
}

function addToWatchList(action, state) {
    let listToWatch = addToListWatch(action, state)
    config.cache.listInstrumentToWatch = listToWatch

    let listInstrumentInWatchList = state.listInstrumentInWatchList
    let tmp = listInstrumentInWatchList.filter(e => e == action.instrument)
    if(tmp.length < 1) {
        listInstrumentInWatchList.push(action.instrument)
    }

    return {
        listInstrumentInWatchList: listInstrumentInWatchList,
        listInstrumentToWatch: listToWatch
    }
}
function removeFromWatchList(action, state) {
    let listToWatch = state.listInstrumentToWatch
    let listWatch = state.listInstrumentInWatchList
    
    let listPortfolio = state.listInstrumentInPortfolio
    let tmp2 = listPortfolio.filter(e => e == action.instrument)
    if(tmp2.length > 0) {
        // k remove
    } else {
        // -> remove
        listToWatch = listToWatch.filter(e => e != action.instrument)
        listWatch = state.listInstrumentInWatchList.filter(e => e != action.instrument)
        config.cache.listInstrumentToWatch = listToWatch
    }

    return {
        listInstrumentInWatchList: listWatch,
        listInstrumentToWatch: listToWatch
    }
}

export default function(state = initialState, action) {
    
    switch (action.type) {
        // change default instrument in trading page
        case ActionTypes.CHANGEINSTRUMENT: {
            let tmpx1 = addToListWatch(action, Object.assign({}, state))

            return Object.assign({}, state, {
                instrument: action.instrument,
                listInstrumentToWatch: tmpx1.listInstrumentToWatch,
                flag: !state.flag
            });
        }

        // add instrument to watch ( not to watchlist)
        case ActionTypes.ADDINSTRUMENTTOWATCH: {
            
            let tmpx2 = addToListWatch(action, Object.assign({}, state))
            let tmpx3 = mapToListData(action, Object.assign({}, state))

            return Object.assign({}, state, {
                listInstrumentToWatch: tmpx2.listInstrumentToWatch,
                listInstrumentData: tmpx3.listInstrumentData,
                flag: !state.flag
            });
        }
        
        // remove instrument from watch (not from watchlist)
        case ActionTypes.REMOVEINSTRUMENTFROMWATCH: {
            
            let tmpx4 = removeFromListWatch(action, Object.assign({}, state))
            
            return Object.assign({}, state, {
                listInstrumentToWatch: tmpx4.listInstrumentToWatch,
                flag: !state.flag
            });
        }

        // add instrument to watchlist ( to db also )
        case ActionTypes.ADDINSTRUMENTTOWATCHLIST: {
            
            let tmpx5 = addToWatchList(action, Object.assign({}, state))
            let tmpx6 = mapToListData(action, Object.assign({}, state))

            return Object.assign({}, state, {
                listInstrumentInWatchList: tmpx5.listInstrumentInWatchList,
                listInstrumentToWatch: tmpx5.listInstrumentToWatch,
                listInstrumentData: tmpx6.listInstrumentData,
                flag: !state.flag
            });
        }

        // remove instrument from watchlist (from db also )
        case ActionTypes.REMOVEINSTRUMENTFROMWATCHLIST: {
            
            let tmpx7 = removeFromWatchList(action, Object.assign({}, state))
            
            return Object.assign({}, state, {
                listInstrumentInWatchList: tmpx7.listInstrumentInWatchList,
                listInstrumentToWatch: tmpx7.listInstrumentToWatch,
                listInstrumentData: tmpx7.listInstrumentData,
                flag: !state.flag
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
                instrumentData: json,
                flag: !state.flag
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
            let tmpIns = listAAA.length > 0 ? listAAA[0] : ""
            let tmp12 = [...new Set([...state.listInstrumentInPortfolio, ...listAAA])]
            config.cache.listInstrumentToWatch = tmp12
            // console.log(state, config.cache.listInstrumentToWatch)
            return Object.assign({},state,{
                instrument: tmpIns,
                listInstrumentToWatch: tmp12,
                listInstrumentInWatchList: listAAA,
                listInstrumentData: action.stockData
            });
        }

        default:
            return state;
    }
};

function genDefaultData(listInstrumentData, listStock) {
    console.log(listInstrumentData, listStock)
    listStock.map(stock => {
        if(listInstrumentData.filter(e => e.mvStockCode == stock.mvStockCode && e.mvMarket == stock.mvMarket).length < 1) {
            let data = {
                mvStockCode: stock.mvStockCode,
                mvMarket: stock.mvMarket,

                mvCeiling: "---",
                mvFloor:"---",
                mvReferences: "---",

                mvBidPrice1: "---",
                mvBidPrice2: "---",
                mvBidPrice3: "---",

                mvBidVol1: "---",
                mvBidVol2: "---",
                mvBidVol3: "---",

                mvMatchPrice: "---",
                mvMatchVol: "---",
                mvMatchUpDown: "---",
                mvMatchVolTotal: "---",

                mvOfferPrice1: "---",
                mvOfferPrice2: "---",
                mvOfferPrice3: "---",
                mvOfferVol1: "---",
                mvOfferVol2: "---",
                mvOfferVol3: "---",

                mvOpen: "---",
                mvHigh: "---",
                mvLow: "---",
                mvNomial: "---",

                mvForeignForBuy: "---",
                mvForeignForSell: "---",
                mvForeignForRoom: "---"
            }
            listInstrumentData.push(data)
        }
    })

    return listInstrumentData
}