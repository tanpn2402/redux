import config from '../core/config'
import moment from "moment"

const {ActionTypes} = require('../core/constants')


const initialState = {
    tradeLogData: [],
    flag: true,


    marketData: [],
    flagMarketDataUpdated: false
}

/*
tradeLogData: [
    {
        mvStockCode: ACB,
        mvMarket: HA,
        data: [
            {},
            {}
        ]
    }
}

marketData: [
    {
        mvStockCode: ---,
        mvMarket: HO,
        mvTotalVol: ,
        mvTotalValue: 
        mvIndex: 
        mvChangeValue: 
        mvChangePercent: 
    }
]


*/


export default function(state = initialState, action) {   
    switch (action.type) {
        case ActionTypes.UPDATETRADELOG: {
            
            let tradeLog = state.tradeLogData
            console.log(moment("1990-01-01 " + action.data.time) <= moment("1990-01-01 15:00"))
            if( moment("1990-01-01 " + action.data.time) <= moment("1990-01-01 15:00") ) {
                let tmp = tradeLog.filter(e=> e.mvStockCode == action.data.mvStockCode && e.mvMarket == action.data.mvMarket)
                if(tmp.length > 0) {
                    tmp[0].data.push(action.data)
                } else {
                    let a = {
                        mvStockCode: action.data.mvStockCode,
                        mvMarket: action.data.mvMarket,
                        data: []
                    }
                    a.data.push(action.data)
                    tradeLog.push(a)
                }
            }
        
            // console.log(tradeLog)
            return Object.assign({}, state, {
                tradeLogData: tradeLog,
                flag: !state.flag
            }); 
        }

        case ActionTypes.GETTRADELOGDATA: {
            return Object.assign({}, state, {
                tradeLogData: action.data
            });  
        }

        case ActionTypes.GETTRADELOGDATAFOREACH: {
            let tradeLogTmp1 = state.tradeLogData
            let tmp1 = tradeLogTmp1.filter(e=> e.mvStockCode == action.data.mvStockCode && e.mvMarket == action.data.mvMarket)
            if(tmp1.length > 0) {
                Object.assign(tmp1[0], action.data)
            } else {
                tradeLogTmp1.push(action.data)
            }
            return Object.assign({}, state, {
                tradeLogData: tradeLogTmp1
            });  
        }



        //-----------MARKET DATA
        case ActionTypes.UPDATEMARKETDATA: {
            let marketData = state.marketData
            if( moment("1990-01-01 " + action.data.time) <= moment("1990-01-01 15:00") ) {
                let tmp = marketData.filter(e=> e.mvStockCode == action.data.mvStockCode && e.mvMarket == action.data.mvMarket)
                if(tmp.length > 0) {
                    Object.assign(tmp[0], action.data)
                } else {
                    marketData.push(action.data)
                }
            }
        
            // console.log(tradeLog)
            return Object.assign({}, state, {
                marketData: marketData,
                flagMarketDataUpdated: !state.flagMarketDataUpdated
            }); 
        }
        case ActionTypes.GETMARKETDATA: {
            return Object.assign({}, state, {
                marketData: action.data,
                flagMarketDataUpdated: !state.flagMarketDataUpdated
            }); 
        }

        default:
            return state;
        
    }
}

function updateTradeLog(state, action) {
    let tradeLog = state.tradeLogData
    let data = action.data
    // console.log(tradeLog)
    let tmp = tradeLog.filter(e=> e.mvStockCode == data.mvStockCode && e.mvMarket == data.mvMarket)
    if(tmp.length > 0) {
        tmp[0].data.push(data)
    } else {
        let a = {
            mvStockCode: data.mvStockCode,
            mvMarket: data.mvMarket,
            data: []
        }
        a.data.push(data)
        tradeLog.push(a)
    }

    return {
        tradeLog
    }
}