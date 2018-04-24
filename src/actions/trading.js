import * as itradeapi from '../api/web_service_api'
import * as mdsapi from '../api/mdsapi'
import * as ACTION from '../api/action_name'
import config from "../core/config"
import * as utils from '../utils'
import {showMessageBox} from './notification'

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


    let cliendID = localStorage.getItem("clientID")
    // cliendID = "C080001"
    if(cliendID == undefined) {
        console.log("Not find clientId in localstorage")
        return {
            type: 0
        }
    } else {
        let url = ACTION.WATCHLISTADD.replace("{clientID}", cliendID).replace("{stockCode}", ins).replace("{marketID}", market)
        return (dispatch) => {
        
            itradeapi.mdsGET(url, {} , dispatch,
                function (response) {
                    console.log("addInstrumentToWatch", response)
                    let stockData = response.mvData.length > 0 ? response.mvData : (genDefaultData([ins], [market]))
                    stockData = convertFromItradeVarToMDS(stockData[0])
                    return {
                        type: ActionTypes.ADDINSTRUMENTTOWATCH,
                        instrument: ins, // ex: AVC, VNM
                        market: market,
                        stockData: stockData
                    }
                
                },
                function (err) {
                    console.log("addInstrumentToWatch", err)
                    let stockData = convertFromItradeVarToMDS(genDefaultData([ins], [market])[0])
                    return {
                        type: ActionTypes.ADDINSTRUMENTTOWATCH,
                        instrument: ins, // ex: AVC, VNM
                        market: market,
                        stockData: stockData
                    }
                })
        }
    }
}

export function removeInstrumentFromWatch(ins, market) {
    
    let cliendID = localStorage.getItem("clientID")
    // cliendID = "C080001"
    if(cliendID == undefined) {
        console.log("Not find clientId in localstorage")
        return {
            type: 0
        }
    } else {
        let url = ACTION.WATCHLISTREMOVE.replace("{clientID}", cliendID).replace("{stockCode}", ins)
        return (dispatch) => {
        
            itradeapi.mdsGET(url, {} , dispatch,
                function (response) {
                    console.log("removeInstrumentFromWatch", response)
                    return {
                        type: ActionTypes.REMOVEINSTRUMENTFROMWATCH,
                        instrument: ins, // ex: AVC, VNM
                        market: market
                    }
                
                },
                function (err) {
                    console.log("removeInstrumentFromWatch", err)
                    return {
                        type: ActionTypes.REMOVEINSTRUMENTFROMWATCH,
                        instrument: ins, // ex: AVC, VNM
                        market: market
                    }
                })
        }
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
        mvAddOrRemove: "ADD",
        mvCategory: 1,
        mvStockCode: ins,
        mvMarketID: market         
    }

    let cliendID = localStorage.getItem("clientID")
    // cliendID = "C080001"
    if(cliendID == undefined) {
        console.log("Not find clientId in localstorage")
        return {
            type: 0
        }
    } else {
        let url = ACTION.GETLISTSTOCKINWATCHLIST.replace("{clientID}", cliendID)
        return (dispatch) => {
            
            itradeapi.mdsPOST(url, params , dispatch,
                function (response) {
                    console.log("addInstrumentToWatchList", response)
                    // let stockData = response.mvData == undefined ? (genDefaultData(ins, market)) : response.mvData.length > 0 ? response.mvData : (genDefaultData(ins, market))
                    // stockData = convertFromItradeVarToMDS(stockData[0])
                    // return {
                    //     type: ActionTypes.ADDINSTRUMENTTOWATCHLIST,
                    //     instrument: ins, // ex: AVC, VNM
                    //     market: market,
                    //     // stockData: stockData
                    // }

                    return (dispatch) => {
                        
                        itradeapi.mdsPOST( ACTION.GETLISTSTOCKINWATCHLIST.replace("{clientID}", cliendID), {} , dispatch,
                            function (response) {
                                console.log("get ins in watchlis and it data ", response)
                                let stockData = response.mvStockData.filter(e => e.mvSymbol == ins && e.mvMarketID == market)
                                stockData = stockData.map(e => {
                                    return convertFromItradeVarToMDS(e)
                                })
                                
                                return {
                                    type: ActionTypes.ADDINSTRUMENTTOWATCHLIST,
                                    instrument: ins, // ex: AVC, VNM
                                    market: market, // ex: HO, HA
                                    stockData: stockData.length > 0 ? stockData[0] : null  // ex: {...}
                                }
                                
                                
                            },
                            function (err) {
                                return (dispatch) => {
                                    dispatch(showMessageBox("Error", 
                                        "Appear error while add symbol to Watchlist"
                                    ))
                                }
                            })
                    }
                },
                function(err) {
                    console.log("addInstrumentToWatchList", err)
                    // let stockData = convertFromItradeVarToMDS(genDefaultData(ins, market)[0])
                    return {
                        type: ActionTypes.ADDINSTRUMENTTOWATCHLIST,
                        instrument: ins, // ex: AVC, VNM
                        market: market,
                        // stockData: stockData
                    }
                }
            )
        }
    }

        
}

export function removeInstrumentFromWatchList(ins, market) {

    let params = {
        mvTimelyUpdate: "Y",
        mvAddOrRemove: "REMOVE",
        mvCategory: 1,
        mvStockCode: ins,
        mvMarketID: market         
    }

    let cliendID = localStorage.getItem("clientID")
    // cliendID = "C080001"
    if(cliendID == undefined) {
        console.log("Not find clientId in localstorage")
        return {
            type: 0
        }
    } else {
        let url = ACTION.GETLISTSTOCKINWATCHLIST.replace("{clientID}", cliendID)
        return (dispatch) => {
            
            itradeapi.mdsPOST(url, params , dispatch,
                function (response) {
                    console.log("removeInstrumentFromWatchList", response)
                    return {
                        type: ActionTypes.REMOVEINSTRUMENTFROMWATCHLIST,
                        instrument: ins, // ex: AVC, VNM
                        market: market
                    }
                },
                function(err) {
                    console.log("removeInstrumentFromWatchList", err)
                    return {
                        type: ActionTypes.REMOVEINSTRUMENTFROMWATCHLIST,
                        instrument: ins, // ex: AVC, VNM
                        market: market
                    }
                })
        }
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
    // data["mvMarket"] = data["mvMarket"] == "HN" ? "HA" : "HO"
    // console.log("REALTIME DATA = ", data)
    return {
        type: ActionTypes.UPDATEWATCHLISTDATA,
        data: data
    }
}

// this action for test
// export function getListStockInWatchList() {
//     let insList = "ACB,ALT,AVS,B82,CCM,EID,SHB,VNM,"
    
//     let marketList = "HA,HA,HA,HA,HA,HA,HA,HO,"
    
//     let insArray = insList.split(",")
//     let marketArr = marketList.split(",")
//     insArray.splice(-1,1)
//     // console.log("CCCCCC", insArray)
//     let tmp = genDefaultData(insArray, marketArr )
//     // console.log("CCCCCC", tmp)
//     let stockData  = tmp.map(e => {
//         return convertFromItradeVarToMDS(e)
//     })
//     // console.log("CCCCCC", stockData)
//     let list = insArray.map((e, i)=> {
//         return {
//             mvStockCode: e,
//             mvMarket: marketArr[i]
//         }
//     })

//     return {
//         type: ActionTypes.GETLISTSTOCKINWATCHLIST,
//         list: list,
//         stockData: stockData
//     }

// }


export function getListStockInWatchList() {
    let cliendID = localStorage.getItem("clientID")
    // cliendID = "C080001"
    if(cliendID == undefined) {
        console.log("Not find clientId in localstorage")
        return {
            type: 0
        }
    } else {
        let url = ACTION.GETLISTSTOCKINWATCHLIST.replace("{clientID}", cliendID)
        return (dispatch) => {
            
            itradeapi.mdsPOST(url, {} , dispatch,
                function (response) {
                    console.log(response)

                    let insList = response.mvInstrumentList
                    let marketList = response.mvMarketList
                    let stockData = response.mvStockData.map(e => {
                        return convertFromItradeVarToMDS(e)
                    })

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
                        list: list,
                        stockData: stockData
                    }
                    
                },
                function (err) {
                    console.log(err)
                })
        }
    }
}

const derivativeList = [
    "VN30F1803",
    "VN30F1804",
    "VN30F1806",
    "VN30F1809",
]

const dataDe = {
    "VN30F1803": {
        ceil: 1189.6,
        floor: 1034.1,
        ref: 1111.8
    },

    "VN30F1804": {
        ceil: 1195.5,
        floor: 1039.1,
        ref: 1117.3
    },

    "VN30F1806": {
        ceil: 1208.6,
        floor: 1050.6,
        ref: 1129.6
    },

    "VN30F1809": {
        ceil: 1229.4,
        floor: 1068.6,
        ref: 1149.1
    }
}
// UPDATE WATLIST DATA
export function updateDerivativeData(data) {
    // let marIndex = utils.randomInt(derivativeList.length)
    // let stockCode = derivativeList[marIndex]
    // let market = "VNFE"

    data = {
        mvStockCode: data.id,
        mvMarket: data.market,

        mvCeiling: data.ceil,
        mvFloor: data.floor,
        mvReferences: data.ref,

        mvBidPrice1: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvBidPrice2: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvBidPrice3: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),

        mvBidVol1: utils.randomInt(1, 10),
        mvBidVol2: utils.randomInt(1, 10),
        mvBidVol3: utils.randomInt(1, 10),

        mvMatchPrice: utils.round(utils.randomInt(1060, 1200)+ parseFloat(Math.random().toFixed(2)), 1),
        mvMatchVol: utils.randomInt(1, 10),
        mvMatchUpDown: utils.round(1 + parseFloat(Math.random().toFixed(2)), 1),
        mvMatchVolTotal: utils.randomInt(1, 100),

        mvOfferPrice1: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvOfferPrice2: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvOfferPrice3: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvOfferVol1: utils.randomInt(1, 10),
        mvOfferVol2: utils.randomInt(1, 10),
        mvOfferVol3: utils.randomInt(1, 10),

        mvOpen: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvHigh: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvLow: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
        mvNomial: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),

        mvForeignForBuy: utils.randomInt(1400, 1600) + 12,
        mvForeignForSell: utils.randomInt(1100, 1500) + 34,
        mvForeignForRoom: utils.randomInt(1000, 1600) + 14
    }

    // console.log("UPDATE", data)
    // data["mvMarket"] = data["mvMarket"] == "HN" ? "HA" : "HO"
    // console.log("REALTIME DATA = ", data)
    return {
        type: ActionTypes.UPDATEDERIVATIVEDATA,
        data: data,
        symbol: data.mvStockCode
    }
}
// Derivatives
export function getDerivativeList(list) {
    console.log(list)
    let data = list.map(e => {
        return {
            mvStockCode: e.id,
            mvMarket: e.market,
    
            mvCeiling: e.ceil,
            mvFloor: e.floor,
            mvReferences: e.ref,
    
            mvBidPrice1: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvBidPrice2: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvBidPrice3: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
    
            mvBidVol1: utils.randomInt(1, 10),
            mvBidVol2: utils.randomInt(1, 10),
            mvBidVol3: utils.randomInt(1, 10),
    
            mvMatchPrice: utils.round(utils.randomInt(1060, 1200)+ parseFloat(Math.random().toFixed(2)), 1),
            mvMatchVol: utils.randomInt(1, 10),
            mvMatchUpDown: utils.round(1 + parseFloat(Math.random().toFixed(2)), 1),
            mvMatchVolTotal: utils.randomInt(1, 100),
    
            mvOfferPrice1: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvOfferPrice2: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvOfferPrice3: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvOfferVol1: utils.randomInt(1, 10),
            mvOfferVol2: utils.randomInt(1, 10),
            mvOfferVol3: utils.randomInt(1, 10),
    
            mvOpen: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvHigh: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvLow: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
            mvNomial: utils.round(utils.randomInt(1060, 1200) + parseFloat(Math.random().toFixed(2)), 1),
    
            mvForeignForBuy: utils.randomInt(1400, 1600) + 12,
            mvForeignForSell: utils.randomInt(1100, 1500) + 34,
            mvForeignForRoom: utils.randomInt(1000, 1600) + 14
        }
    })
    
    return {
        type: ActionTypes.GETDERIVATIVELIST,
        list: list.map(e => e.id),
        data: data
    }
}
export function subcribeDerivativeInfo(list) {

}
export function unSubcribeDerivativeInfo() {

}

function genDefaultData(listStock, listMarket) {
    let list = []
    listStock.map((stock, index) => {
            // console.log(stock)
            let data = {
                mvSymbol: stock,
                mvMarketID: listMarket[index],

                mvCeilingPrice: "---",
                mvFloorPrice:"---",
                mvReferencePrice: "---",

                mvBestBid1Price: "---",
                mvBestBid2Price: "---",
                mvBestBid3Price: "---",

                mvBestBid1Volume: "---",
                mvBestBid2Volume: "---",
                mvBestBid3Volume: "---",

                mvMatchPrice: "---",
                mvMatchQty: "---",
                mvMatchUpDown: "---",
                mvTotalTradingQty: "---",

                mvBestOffer1Price: "---",
                mvBestOffer2Price: "---",
                mvBestOffer3Price: "---",
                mvBestOffer1Volume: "---",
                mvBestOffer2Volume: "---",
                mvBestOffer3Volume: "---",

                mvOpenPrice: "---",
                mvHighPrice: "---",
                mvLowPrice: "---",
                mvNominalPrice: "---",

                mvBuyForeignQty: "---",
                mvSellForeignQty: "---",
                mvCurrentRoom: "---"
            }
            list.push(data)
        
    })

    return list
}

function convertFromItradeVarToMDS(e) {
    return {
        mvStockCode: e.mvSymbol,
        mvMarket: e.mvMarketID,

        mvCeiling: e.mvCeilingPrice,
        mvFloor: e.mvFloorPrice,
        mvReferences: e.mvReferencePrice,

        mvBidPrice1: e.mvBestBid1Price,
        mvBidPrice2: e.mvBestBid2Price,
        mvBidPrice3: e.mvBestBid3Price,

        mvBidVol1: e.mvBestBid1Volume,
        mvBidVol2: e.mvBestBid2Volume,
        mvBidVol3: e.mvBestBid3Volume,

        mvMatchPrice: e.mvMatchPrice,
        mvMatchVol: e.mvMatchQty,
        mvMatchUpDown: 0,
        mvMatchVolTotal: e.mvTotalTradingQty,

        mvOfferPrice1: e.mvBestOffer1Price,
        mvOfferPrice2: e.mvBestOffer2Price,
        mvOfferPrice3: e.mvBestOffer3Price,

        mvOfferVol1: e.mvBestOffer1Volume,
        mvOfferVol2: e.mvBestOffer2Volume,
        mvOfferVol3: e.mvBestOffer3Volume,

        mvOpen: e.mvOpenPrice,
        mvHigh: e.mvHighPrice,
        mvLow: e.mvLowPrice,
        mvNomial: e.mvNominalPrice,

        mvForeignForBuy: e.mvBuyForeignQty,
        mvForeignForSell: e.mvSellForeignQty,
        mvForeignForRoom: e.mvCurrentRoom
    }
}


// WEBPACK FOOTER //
// ./src/actions/trading.js