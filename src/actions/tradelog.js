import * as itradeapi from "../api/web_service_api"
import * as mdsapi from "../api/mdsapi"
import * as ACTION from "../api/action_name"
import config from "../core/config"
import * as utils from "../utils"
import moment from "moment"
import { ActionTypes } from "../core/constants";

const dataTemp = {
    "09:00": 110.1,
    "09:02": 110.2,
    "09:04": 110.3,
    "09:06": 110.4,
    "09:08": 110.4,
    "09:08": 110.4,
    "09:10": 110.3,
    "09:12": 110.4,
    "09:14": 110.3,
    "09:16": 110.2,
    "09:18": 110.5,
    "09:20": 110.2,
    "09:22": 110.1,
    "09:24": 110.3,
    "09:26": 110.0,
    "09:28": 110.1,
    "09:30": 110.3,
    "09:32": 110.2,
    "09:34": 110.1,
    "09:36": 110.2,
    "09:38": 110.3,
    "09:40": 110.4,
    "09:42": 110.5,
    "09:44": 110.3,
    "09:46": 110.2,
    "09:48": 110.3,
    "09:50": 110.4,
    "09:52": 110.2,
    "09:54": 110.1,
    "09:56": 110.2,
    "09:58": 110.3,
    "10:00": 110.5,
    "10:02": 110.4,
    "10:04": 110.5,
    "10:06": 110.6,
    "10:08": 110.7,
    "10:10": 110.6,
    "10:12": 110.7,
    "10:14": 110.4,
    "10:16": 110.5,
    "10:18": 110.6,
    "10:20": 110.7,
    "10:22": 110.8,
    "10:24": 110.6,
    "10:26": 110.5,
    "10:28": 110.6,
    "10:30": 110.3,
    "10:32": 110.4,
    "10:34": 110.2,
    "10:36": 110.1,
    "10:38": 110.0,
    "10:40": 111.1,
    "10:42": 109.9,
    "10:44": 109.8,
    "10:46": 110.1,
    "10:48": 110.2,
    "10:50": 110.3,
    "10:52": 110.5,
    "10:54": 110.6,
    "10:56": 110.7,
    "10:58": 110.8,
    "11:00": 110.6,
    "11:02": 110.5,
    "11:04": 110.3,
    "11:06": 110.2,
    "11:08": 110.1,
    "11:10": 110.0,
    "11:12": 110.2,
    "11:14": 110.1,
    "11:16": 110.2,
    "11:18": 110.3,
    "11:20": 110.1,
    "11:22": 110.2,
    "11:24": 110.3,
    "11:26": 110.4,
    "11:28": 110.3,
    "11:30": 110.4,
    "11:32": 110.4,
    "11:34": 110.4,
    "11:34": 110.4,
    "11:36": 110.4,
    "11:38": 110.4,
    "11:40": 110.4,
    "11:42": 110.4,
    "11:44": 110.4,
    "11:46": 110.4,
    "11:48": 110.4,
    "11:50": 110.4,
    "11:52": 110.4,
    "11:54": 110.4,
    "11:56": 110.4,
    "11:58": 110.4,
    "12:00": 110.4,
    "12:02": 110.4,
    "12:04": 110.4,
    "12:06": 110.4,
    "12:08": 110.4,
    "12:10": 110.4,
    "12:12": 110.4,
    "12:14": 110.4,
    "12:16": 110.4,
    "12:18": 110.4,
    "12:20": 110.4,
    "12:22": 110.4,
    "12:24": 110.4,
    "12:26": 110.4,
    "12:28": 110.4,
    "12:30": 110.4,
    "12:32": 110.4,
    "12:34": 110.4,
    "12:36": 110.4,
    "12:38": 110.4,
    "12:40": 110.4,
    "12:42": 110.4,
    "12:44": 110.4,
    "12:46": 110.4,
    "12:48": 110.4,
    "12:50": 110.4,
    "12:52": 110.4,
    "12:54": 110.4,
    "12:56": 110.4,
    "12:58": 110.4,
    "13:00": 110.4,
    "13:02": 110.5,
    "13:04": 110.5,
    "13:06": 110.4,
    "13:08": 110.6,
    "13:10": 110.5,
    "13:12": 110.7,
    "13:14": 110.4,
    "13:16": 110.3,
    "13:18": 110.2,
    "13:20": 110.3,
    "13:22": 110.1,
    "13:24": 110.3,
    "13:26": 110.2,
    "13:28": 110.2,
    "13:30": 110.4,
    "13:32": 110.5,
    "13:34": 110.6,
    "13:38": 110.7,
    "13:40": 110.6,
    "13:42": 110.7,
    "13:44": 110.8,
    "13:46": 110.6,
    "13:48": 110.4,
    "13:50": 110.3,
    "13:52": 110.2,
    "13:54": 110.0,
    "13:56": 110.1,
    "13:58": 109.9,
    "14:00": 110.2,
    "14:02": 110.2,
    "14:04": 110.3,
    "14:06": 110.3,
    "14:08": 110.2,
    "14:10": 110.4,
    "14:12": 110.4,
    "14:14": 110.5,
    "14:16": 110.5,
    "14:18": 110.4,
    "14:20": 110.3,
    "14:22": 110.3,
    "14:24": 110.1,
    "14:26": 110.1,
    "14:28": 110.0,
    "14:30": 110.0,
    "14:32": 110.7,
    "14:34": 110.7,
    "14:36": 110.5,
    "14:38": 110.5,
    "14:40": 110.4,
    "14:42": 110.4,
    "14:44": 110.0,
    "14:46": 110.1,
    "14:48": 110.5,
    "14:50": 110.4,
    "14:52": 110.2,
    "14:54": 110.1,
    "14:54": 110.0,
    "14:56": 109.9,
    "14:58": 109.7,
    "15:00": 110.3,

}


export function updateTradeLog(data) {
    let a = config.defaultMarketData.slice(0)
    let b = config.cache.listInstrumentToWatch.slice(0)
    let c = a.concat(b)

    let marIndex = utils.randomInt(c.length)
    let stockCode = c[marIndex]
    let now = moment().format("HH:mm")
    let updown = utils.randomInt(2) % 2
    let index = dataTemp[ now ] == undefined ?  utils.round(utils.randomInt(109, 110) + parseFloat(Math.random().toFixed(2)), 1)
    : dataTemp[ now ]

    data = {
        time: now,
        mvStockCode: stockCode,
        mvMarket: "HA",
        mvTotalVol: utils.randomInt(50000, 52000),
        mvTotalValue: utils.randomInt(20000, 22000),
        mvIndex: index,
        mvChangeValue: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2),
        mvChangePercent: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2)
    }

    return {
        type: ActionTypes.UPDATETRADELOG,
        data: data
    }
}

export function getTradeLogData() {
    
    let a = config.defaultMarketData.slice(0)
    let data = a.map(stock => {
        
        let tmp = []
        let time = moment("1990-01-01 09:00")
        let endTime = moment("1990-01-01 15:00")
        let now = moment("1990-01-01 " + moment().format("HH:mm"))
        for(let i = 0; ; i++) {
            let lvTime = time.add(2, "minutes")
            if( lvTime > now || lvTime > endTime) break;
            let updown = utils.randomInt(2) % 2

            let index = dataTemp[ lvTime.format("HH:mm")] == undefined ?  utils.round(utils.randomInt(109, 110) + parseFloat(Math.random().toFixed(2)), 1)
            : dataTemp[ lvTime.format("HH:mm")]

            tmp.push( {
                time: lvTime.format("HH:mm"),
                mvStockCode: stock,
                mvMarket: "HA",
                mvTotalVol: utils.randomInt(50000, 52000),
                mvTotalValue: utils.randomInt(20000, 22000),
                mvIndex: index,
                mvChangeValue: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2),
                mvChangePercent: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2)
            })
        }
     
        return {
            mvStockCode: stock,
            mvMarket: "HA",
            data: tmp
        }
    })
    console.log(data)
    return {
        type: ActionTypes.GETTRADELOGDATA,
        data: data
    }
}

export function getTradeLogDataOfStock(stockCode, market) {
    let tmp = []
    let time = moment("1990-01-01 09:00")
    let endTime = moment("1990-01-01 15:00")
    let now = moment("1990-01-01 " + moment().format("HH:mm"))
    for(let i = 0; ; i++) {
        let lvTime = time.add(2, "minutes")
        if( lvTime > now || lvTime > endTime ) break;
        let updown = utils.randomInt(2) % 2

        let index = dataTemp[ lvTime.format("HH:mm")] == undefined ?  utils.round(utils.randomInt(109, 110) + parseFloat(Math.random().toFixed(2)), 1)
        : dataTemp[ lvTime.format("HH:mm")]

        tmp.push( {
            time: lvTime.format("HH:mm"),
            mvStockCode: stockCode,
            mvMarket: market,
            mvTotalVol: utils.randomInt(50000, 52000),
            mvTotalValue: utils.randomInt(20000, 22000),
            mvIndex: index,
            mvChangeValue: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2),
            mvChangePercent: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2)
        })
    }

    let data = {
        mvStockCode: stockCode,
        mvMarket: market,
        data: tmp
    }

    return {
        type: ActionTypes.GETTRADELOGDATAFOREACH,
        data: data
    }
}