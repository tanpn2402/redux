import * as itradeapi from "../api/web_service_api"
import * as mdsapi from "../api/mdsapi"
import * as ACTION from "../api/action_name"
import config from "../core/config"
import * as utils from "../utils"
import moment from "moment"
import { ActionTypes } from "../core/constants";

export function updateTradeLog(data) {
    let a = config.defaultMarketData.slice(0)
    let b = config.cache.listInstrumentToWatch.slice(0)
    let c = a.concat(b)

    let marIndex = utils.randomInt(c.length)
    let stockCode = c[marIndex]

    let updown = utils.randomInt(2) % 2
    data = {
        time: moment().format("HH:mm"),
        mvStockCode: stockCode,
        mvMarket: "HA",
        mvTotalVol: utils.randomInt(50000, 52000),
        mvTotalValue: utils.randomInt(20000, 22000),
        mvIndex: utils.round(utils.randomInt(109, 110) + parseFloat(Math.random().toFixed(2)), 1),
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
        for(let i = 0; ; i++) {
            let lvTime = time.add(2, "minutes").format("HH:mm")
            if(lvTime == "15:02" || lvTime == moment().add(2, "minutes").format("HH:mm") ) break;
            let updown = utils.randomInt(2) % 2
            tmp.push( {
                time: lvTime,
                mvStockCode: stock,
                mvMarket: "HA",
                mvTotalVol: utils.randomInt(50000, 52000),
                mvTotalValue: utils.randomInt(20000, 22000),
                mvIndex: utils.round(utils.randomInt(109, 110) + parseFloat(Math.random().toFixed(2)), 1),
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
    for(let i = 0; ; i++) {
        let lvTime = time.add(2, "minutes").format("HH:mm")
        if(lvTime == "15:02" || lvTime == moment().add(2, "minutes").format("HH:mm") ) break;
        let updown = utils.randomInt(2) % 2
        tmp.push( {
            time: lvTime,
            mvStockCode: stockCode,
            mvMarket: market,
            mvTotalVol: utils.randomInt(50000, 52000),
            mvTotalValue: utils.randomInt(20000, 22000),
            mvIndex: utils.round(utils.randomInt(109, 110) + parseFloat(Math.random().toFixed(2)), 1),
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