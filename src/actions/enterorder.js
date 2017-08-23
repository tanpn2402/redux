import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as matrix from './authmatrix.js'
const { ActionTypes } = require('../core/constants');

let stockInfoSell = {}
let stockInfo = {}

export function getstockInfo(param) {
    console.log('stockInfo Action', param)
    return function (dispatch) {
        (api.post(ACTION.STOCKINFO, param, dispatch, getStockB))
    }
}

function isEmpty(obj) {
    for (var prop in obj) {
        return false;
    }
    return true;
}

export function getStockB(response) {

    if (isEmpty(response) !== true) {
        if (response.mvStockBalanceInfo !== null)
            stockInfoSell = response
        else
            stockInfo = response
        if (stockInfo.mvStockInfoBean.mvMarginPercentage==="null")
            stockInfo.mvStockInfoBean.mvMarginPercentage = "0"
        console.log('stockInfo data', stockInfoSell, stockInfo)
    }
    return {
        type: ActionTypes.STOCKINFO,
        stockInfo: response
    }
}

export function setError(isError) {
    console.log("error", isError)
    return {
        type: ActionTypes.SET_ERROR,
        isError
    }
}

export function checkPreEnterOrder(json, language) {
    return dispatch => {
        if (checkmvOrderType(json.mvOrderType, json.mvVolume, language) !== "SUCCESS")
            return dispatch(setError(checkmvOrderType(json.mvOrderType, json.mvVolume, language)))
        console.log("action", stockInfoSell);
        if (checkmvRange(json.mvStatus, stockInfoSell.mvStockBalanceInfo[1], stockInfo.mvStockInfoBean, json.mvPrice, json.mvStock, json.mvVolume, language) !== "SUCCESS")
            return dispatch(setError(checkmvRange(json.mvStatus, stockInfoSell.mvStockBalanceInfo, stockInfo.mvStockInfoBean, json.mvPrice, json.mvStock, json.mvVolume, language)))
        if (checkMoney(json.mvTotalPrice, json.mvBuyPower, json.mvStatus, json.mvBank, language) !== "SUCCESS")
            return dispatch(setError(checkMoney(json.mvTotalPrice, json.mvBuyPower, json.mvStatus, json.mvBank, language)))
        return dispatch(setError('Success all'))
    }
}

function checkmvOrderType(mvOrderType, mvVolume, language) {
    var orderType = ["L", "ATC", "MAK", "MOK", "MTL", "LO(Odd Lot)"];
    if (orderType.includes(mvOrderType)) {
        if (mvOrderType === "LO(Odd Lot)") {
            if ((parseInt(mvVolume, 10) > 0) && (parseInt(mvVolume, 10) < 100)) {
                return "SUCCESS";
            }
            else {
                return language.oddlotrange;
            }

        }
        else {
            if ((parseInt(mvVolume, 10) > 99) && ((parseInt(mvVolume, 10) % 100) === 0)) {
                return "SUCCESS";
            }
            else {
                return language.otherrange;
            }
        }
    }
    else
        return language.ordertypeavailable;

}

function checkmvRange(mvStatus, stockBalanceInfo, stockBeanInfo, mvPrice, mvStock, mvVolume, language) {
    if (mvStock === "VNM") {
        if ((parseInt(mvPrice, 10) >= parseInt(stockBeanInfo.mvFloor, 10)) && (parseInt(mvPrice, 10) <= parseInt(stockBeanInfo.mvCeiling, 10))) {
            if (mvStatus === "B") {
                return "SUCCESS";
            }
            else {
                if ((parseInt(mvVolume, 10)) <= (parseInt(stockBalanceInfo.mvTradableQty, 10))) {
                    return "SUCCESS";
                }
                else {
                    return language.sellvolume;
                }
            }
        }
        else {
            var error = language.pricerange + "[" + stockBeanInfo.mvFloor + "," + stockBeanInfo.mvCeiling + "]"
            return error;
        }
    }
    else {
        return language.stockavailable;
    }
}

function checkMoney(mvPrice, mvBuyPower, mvStatus, mvBank, language) {
    if (mvBank === "ACB-125137309") {
        if (mvStatus === "S") {
            return "SUCCESS";
        }
        else {
            if (parseInt(mvPrice, 10) <= parseInt(mvBuyPower, 10)) {
                return "SUCCESS";
            }
            else {
                return language.money;
            }
        }
    }
    else
        return language.bank;
}

export function submitEnterOrder(param){
    console.log(param,"action")
    return function (dispatch) {
        (api.post(ACTION.ENTERORDER, param, dispatch, getEnterOrderMsg))
    }
}

export function getEnterOrderMsg(response) {
    console.log("Enterorder", response)
    return {
        type: ActionTypes.ENTERORDER,
        data: response
    }
}