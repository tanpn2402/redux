import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import config from "../core/config"
import * as utils from '../utils'

const {ActionTypes} = require('../core/constants');

export function changeInstrument(ins) {
    
    return {
        type: ActionTypes.CHANGEINSTRUMENT,
        instrument: ins, // ex: AVC, VNM
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
    }
}



// UPDATE WATLIST DATA
export function updateWatchlistData(listStock) {
    let data = []
    console.log("AAAA")
    config.cache.listInstrumentToWatch.map(e => {
        // let tmp = config.cache.stockList.filter(el => el.stockCode == e)
        // let market = ""
        // if(tmp.length > 0) {
        //     market = tmp[0].mvMarketID
        // }

        data.push({
            mvStockCode: e,
            mvMarket: "AC",

            mvCeiling: 80.2,
            mvFloor: 70.3,
            mvReferences: 80.456,

            mvBidPrice1: utils.round(85 + parseFloat(Math.random().toFixed(2)), 2),
            mvBidPrice2: utils.round(75 + parseFloat(Math.random().toFixed(2)), 2),
            mvBidPrice3: utils.round(65 + parseFloat(Math.random().toFixed(2)), 2),

            mvBidVol1: utils.round(75 + parseFloat(Math.random().toFixed(2)), 2),
            mvBidVol2: utils.round(47 + parseFloat(Math.random().toFixed(2)), 2),
            mvBidVol3: utils.round(96 + parseFloat(Math.random().toFixed(2)), 2),

            mvMatchPrice: utils.round(80+ parseFloat(Math.random().toFixed(2)), 2),
            mvMatchVol: utils.round(569 + parseFloat(Math.random().toFixed(2)), 2),
            mvMatchUpDown: utils.round(1 + parseFloat(Math.random().toFixed(2)), 2),
            mvMatchVolTotal: utils.round(469 + parseFloat(Math.random().toFixed(2)), 2),

            mvOfferPrice1: utils.round(65 + parseFloat(Math.random().toFixed(2)), 2),
            mvOfferPrice2: utils.round(87 + parseFloat(Math.random().toFixed(2)), 2),
            mvOfferPrice3: utils.round(97 + parseFloat(Math.random().toFixed(2)), 2),
            mvOfferVol1: utils.round(65 + parseFloat(Math.random().toFixed(2)), 2),
            mvOfferVol2: utils.round(97 + parseFloat(Math.random().toFixed(2)), 2),
            mvOfferVol3: utils.round(65 + parseFloat(Math.random().toFixed(2)), 2),

            mvOpen: utils.round(80 + parseFloat(Math.random().toFixed(2)), 2),
            mvHigh: utils.round(70 + parseFloat(Math.random().toFixed(2)), 2),
            mvLow: utils.round(60 + parseFloat(Math.random().toFixed(2)), 2),
            mvNomial: utils.round(11 + parseFloat(Math.random().toFixed(2)), 2),

            mvForeignForBuy: utils.round(56 + parseFloat(Math.random().toFixed(2)), 2),
            mvForeignForSell: utils.round(69 + parseFloat(Math.random().toFixed(2)), 2),
            mvForeignForRoom: utils.round(11 + parseFloat(Math.random().toFixed(2)), 2)
        })
    })
    // console.log("UPDATE", data)

    return {
        type: ActionTypes.UPDATEWATCHLISTDATA,
        data: data
    }
}