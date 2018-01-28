import * as itradeapi from "../api/web_service_api"
import * as mdsapi from "../api/mdsapi"
import * as ACTION from "../api/action_name"
import config from "../core/config"
import * as utils from "../utils"
import moment from "moment"
import { ActionTypes } from "../core/constants";

export function updateMarketData(data) {
    let a = config.defaultMarketData.slice(0)

    let marIndex = utils.randomInt(a.length)
    let market = a[marIndex]

    let updown = utils.randomInt(2) % 2
    data = {
        time: moment().format("HH:mm"),
        mvStockCode: "---",
        mvMarket: market,
        mvTotalVol: utils.randomInt(50000, 52000),
        mvTotalValue: utils.randomInt(20000, 22000),
        mvIndex: utils.round(utils.randomInt(100, 110) + parseFloat(Math.random().toFixed(2)), 1),
        mvChangeValue: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2),
        mvChangePercent: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2)
    }

    return {
        type: ActionTypes.UPDATEMARKETDATA,
        data: data
    }
}

export function getMarketData() {
    let a = config.defaultMarketData.slice(0)
    let data = a.map(market => {
        let updown = utils.randomInt(2) % 2
        return {
            mvStockCode: "---",
            mvMarket: market,
            mvTotalVol: utils.randomInt(50000, 52000),
            mvTotalValue: utils.randomInt(20000, 22000),
            mvIndex: utils.round(utils.randomInt(100, 110) + parseFloat(Math.random().toFixed(2)), 1),
            mvChangeValue: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2),
            mvChangePercent: updown % 2 == 1 ? 1 * Math.random().toFixed(2) : (-1)*Math.random().toFixed(2)
        }
    })

    return {
        type: ActionTypes.GETMARKETDATA,
        data: data
    }
}