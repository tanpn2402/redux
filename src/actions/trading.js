import * as itradeapi from '../api/web_service_api'
import * as mdsapi from '../api/mdsapi'
import * as ACTION from '../api/action_name'
import config from "../core/config"
import * as utils from '../utils'

const {ActionTypes} = require('../core/constants');

export function changeInstrument(ins, market) {
    if(market == undefined) {
        let tmp = config.cache.stockList.filter(e => e.stockCode == ins)
        if(tmp.length > 0) {
            market = tmp[0].mvMarketID
        }
    }
    return {
        type: ActionTypes.CHANGEINSTRUMENT,
        instrument: ins, // ex: AVC, VNM
        market: market
    }
}

/*
Add instrument to Watch (not add to DB, just add to this session)
*/
export function addInstrumentToWatch(ins, market) {

    if(market == undefined) {
        let tmp = config.cache.stockList.filter(e => e.stockCode == ins)
        if(tmp.length > 0) {
            market = tmp[0].mvMarketID
        }
    }

    let params = {
        mvTimelyUpdate: "Y",
        mvAddOrRemove: "View",
        mvCategory: 1,
        mvStockCode: ins,
        mvMarketID: market         
    }
    return {
        type: ActionTypes.ADDINSTRUMENTTOWATCH,
        instrument: ins, // ex: AVC, VNM
        market: market
    }
    // return (dispatch) => {
    //     api.get(ACTION.ADDORREMOVEACTION, params, dispatch, function(res) {
    //         console.log(res)
    //         return {
    //             type: ActionTypes.ADDINSTRUMENTTOWATCH,
    //             instrument: ins, // ex: AVC, VNM
    //         }
    //     })
    // }
}

export function removeInstrumentFromWatch(ins, market) {
    console.log(ins)
    return {
        type: ActionTypes.REMOVEINSTRUMENTFROMWATCH,
        instrument: ins, // ex: AVC, VNM
        market: market
    }
}

/*
Add Stock to Watchlist (Add to DB)
*/
export function addInstrumentToWatchList(ins, market) {

    if(market == undefined) {
        let tmp = config.cache.stockList.filter(e => e.stockCode == ins)
        if(tmp.length > 0) {
            market = tmp[0].mvMarketID
        }
    }

    let params = {
        mvTimelyUpdate: "Y",
        mvAddOrRemove: "Add",
        mvCategory: 1,
        mvStockCode: ins,
        mvMarketID: market         
    }

    return {
        type: ActionTypes.ADDINSTRUMENTTOWATCHLIST,
        instrument: ins, // ex: AVC, VNM
        market: market
    }
    
    // return (dispatch) => {
    //     api.get(ACTION.ADDORREMOVEACTION, params, dispatch, function(res) {
    //         console.log(res)
    //         return {
    //             type: ActionTypes.ADDINSTRUMENTTOWATCHLIST,
    //             instrument: ins, // ex: AVC, VNM
    //         }
    //     })
    // }
}

export function removeInstrumentFromWatchList(ins, market) {
    return {
        type: ActionTypes.REMOVEINSTRUMENTFROMWATCHLIST,
        instrument: ins, // ex: AVC, VNM
        market: market
    }
}



// UPDATE WATLIST DATA
export function updateWatchlistData(data) {
    /*let marIndex = utils.randomInt(config.cache.listInstrumentToWatch.length)
    let stockCode = config.cache.listInstrumentToWatch[marIndex]
    let tmp = config.cache.stockList.filter(e => e.stockCode == stockCode)
    let market = "HO"
    if(tmp.length > 0) {
        market = tmp[0].mvMarketID
    }

    data = {
        mvStockCode: stockCode,
        mvMarket: market,

        mvCeiling: 80.2,
        mvFloor: 70.3,
        mvReferences: 80.5,

        mvBidPrice1: utils.round(85 + parseFloat(Math.random().toFixed(2)), 1),
        mvBidPrice2: utils.round(75 + parseFloat(Math.random().toFixed(2)), 1),
        mvBidPrice3: utils.round(65 + parseFloat(Math.random().toFixed(2)), 1),

        mvBidVol1: utils.randomInt(1000),
        mvBidVol2: utils.randomInt(1000),
        mvBidVol3: utils.randomInt(1000),

        mvMatchPrice: utils.round(80+ parseFloat(Math.random().toFixed(2)), 1),
        mvMatchVol: utils.randomInt(1000),
        mvMatchUpDown: utils.round(1 + parseFloat(Math.random().toFixed(2)), 1),
        mvMatchVolTotal: utils.randomInt(1000),

        mvOfferPrice1: utils.round(65 + parseFloat(Math.random().toFixed(2)), 1),
        mvOfferPrice2: utils.round(87 + parseFloat(Math.random().toFixed(2)), 1),
        mvOfferPrice3: utils.round(97 + parseFloat(Math.random().toFixed(2)), 1),
        mvOfferVol1: utils.randomInt(1000),
        mvOfferVol2: utils.randomInt(1000),
        mvOfferVol3: utils.randomInt(1000),

        mvOpen: utils.round(80 + parseFloat(Math.random().toFixed(2)), 1),
        mvHigh: utils.round(70 + parseFloat(Math.random().toFixed(2)), 1),
        mvLow: utils.round(60 + parseFloat(Math.random().toFixed(2)), 1),
        mvNomial: utils.round(11 + parseFloat(Math.random().toFixed(2)), 1),

        mvForeignForBuy: utils.round(56 + parseFloat(Math.random().toFixed(2)), 1),
        mvForeignForSell: utils.round(69 + parseFloat(Math.random().toFixed(2)), 1),
        mvForeignForRoom: utils.round(11 + parseFloat(Math.random().toFixed(2)), 1)
    }*/

    // console.log("UPDATE", data)

    // console.log("REALTIME DATA = ", data)
    return {
        type: ActionTypes.UPDATEWATCHLISTDATA,
        data: data
    }
}

// export function getListStockInWatchList() {

//     let insList = "ACB,"
//     let marketList = "HA,"

//     let insArray = insList.split(",")
//     let marketArr = marketList.split(",")
//     insArray.splice(-1,1)
    
//     let list = insArray.map((e, i)=> {
//         return {
//             mvStockCode: e,
//             mvMarket: marketArr[i]
//         }
//     })

//     return {
//         type: ActionTypes.GETLISTSTOCKINWATCHLIST,
//         list: list
//     }

// }

export function getListStockInWatchList() {
    let cliendID = localStorage.getItem("clientID")
    cliendID = "C080001"
    if(cliendID == undefined) {
        console.log("Not find clientId in localstorage")
        return {
            type: 0
        }
    } else {
        let url = ACTION.GETLISTSTOCKINWATCHLIST.replace("{clientID}", cliendID)
        return (dispatch) => {
            
            itradeapi.mdsGET(url, {} , dispatch,
                function (response) {
                    console.log(response)

                    let insList = response.mvInstrumentList
                    let marketList = response.mvMarketList

                    let insArray = insList.split(",")
                    let marketArr = marketList.split(",")
                    insArray.splice(-1,1)
                    
                    let list = insArray.map((e, i)=> {
                        return {
                            mvStockCode: e,
                            mvMarket: marketArr[i]
                        }
                    })

                    return {
                        type: ActionTypes.GETLISTSTOCKINWATCHLIST,
                        list: list
                    }
                    
                },
                function (err) {
                    console.log(err)
                })
        }
    }
}