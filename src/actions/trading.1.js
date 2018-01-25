import * as itradeapi from '../api/web_service_api'
import * as mdsapi from '../api/mdsapi'
import * as ACTION from '../api/action_name'
import config from "../core/config"
import * as utils from '../utils'

const {ActionTypes} = require('../core/constants');

function getMarketIfNull(market) {
    if(market == undefined) {
        let tmp = config.cache.stockList.filter(e => e.stockCode == ins)
        if(tmp.length > 0) {
            market = tmp[0].mvMarketID
        }
    }
    return market
}

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
    market = getMarketIfNull(market)
    let cliendID = localStorage.getItem("clientID")
    let url = ACTION.WATCHLISTADD.replace("{clientID}", cliendID).replace("{stockCode}", ins).replace("{marketID}", market)
    return (dispatch) => {
        itradeapi.mdsGET(url, {} , dispatch,
            function (response) {
                console.log(response)
                return {
                    type: ActionTypes.ADDINSTRUMENTTOWATCH,
                    instrument: ins, // ex: AVC, VNM
                }
            },
            function (err) {
                console.log(err)
            }
        )
    }
}

export function removeInstrumentFromWatch(ins, market) {
    console.log("remove instrument from watch", ins)
    let cliendID = localStorage.getItem("clientID")

    let url = ACTION.WATCHLISTREMOVE.replace("{clientID}", cliendID).replace("{stockCode}", ins)
    return (dispatch) => {
        itradeapi.mdsGET(url, {} , dispatch,
            function (response) {
                console.log("res for -> remove instrument from watch", response)
                return {
                    type: ActionTypes.REMOVEINSTRUMENTFROMWATCH,
                    instrument: ins, // ex: AVC, VNM
                }
            },
            function (err) {
                console.log(err)
            }
        )
    }
}

/*
Add Stock to Watchlist (Add to DB)
*/
export function addInstrumentToWatchList(ins, market) {

    market = getMarketIfNull(market)
    
    let tmp = config.cache.listInstrumentToWatch.filter(e => e.mvStockCode == ins)
    if(tmp.length > 0) {
        // already in watch, not call api
        return {
            type: ActionTypes.ADDINSTRUMENTTOWATCHLIST,
            instrument: ins, // ex: AVC, VNM
        }
    } else {
        // not in watch -> call api
        let cliendID = localStorage.getItem("clientID")
        let url = ACTION.WATCHLISTADD.replace("{clientID}", cliendID).replace("{stockCode}", ins).replace("{marketID}", market)
        return (dispatch) => {
            itradeapi.mdsGET(url, {} , dispatch,
                function (response) {
                    console.log(response)
                    return {
                        type: ActionTypes.ADDINSTRUMENTTOWATCHLIST,
                        instrument: ins, // ex: AVC, VNM
                    }
                },
                function (err) {
                    console.log(err)
                }
            )
        }
    }
}

export function removeInstrumentFromWatchList(ins, market) {
    let cliendID = localStorage.getItem("clientID")
    let url = ACTION.WATCHLISTREMOVE.replace("{clientID}", cliendID).replace("{stockCode}", ins)
    return (dispatch) => {
        itradeapi.mdsGET(url, {} , dispatch,
            function (response) {
                console.log("res for -> remove instrument from watchlist", response)
                return {
                    type: ActionTypes.REMOVEINSTRUMENTFROMWATCHLIST,
                    instrument: ins, // ex: AVC, VNM
                }
            },
            function (err) {
                console.log(err)
            }
        )
    }

    
}



// UPDATE WATLIST DATA
export function updateWatchlistData(json) {
    let marIndex = utils.randomInt(config.cache.listInstrumentToWatch.length)
    let stockCode = config.cache.listInstrumentToWatch[marIndex]

    
        let data = {
            mvStockCode: stockCode,
            mvMarket: "AC",

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
        }

    // console.log("UPDATE", data)

    // console.log("REALTIME DATA = ", json)
    return {
        type: ActionTypes.UPDATEWATCHLISTDATA,
        data: data
    }
}

export function getListStockInWatchList() {
    let cliendID = localStorage.getItem("clientID")
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
                    console.log("res -> get list stock in watch",response)
                    let tmp = response.AAAAA
                    let list = tmp.split(",")
                    list.splice(-1,1)
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