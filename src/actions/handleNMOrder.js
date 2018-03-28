import {showFlashPopup, showMessageBox} from "./notification"
import {showPopup} from "./popup"
import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as Utils from "../utils"
import moment from "moment"

export function handleNMOrder(value, language, theme, node) {
    let message = language.messagebox.message
    let header = language.messagebox.title

    if (value.symbol == "") {
        return (dispatch) => {
            dispatch(showMessageBox(header.error,
                message.enterStockCode))
        }
    }

    if (isNaN(value.volume) || parseInt(value.volume) == 0) {
        node.mvVol.focus()
        return (dispatch) => {
            dispatch(showMessageBox(header.error,
                message.enterQty))
        }
    } else {

        var lotSize = value.lotSize
        var orderType = value.orderType
        var volume = value.volume
        
        var errorMsg = ''
        if (volume % lotSize > 0 && orderType !== language.enterorder.value.OTLOddLot) {
            errorMsg = message.invalidLotSize;
            errorMsg = errorMsg.replace("{0}", lotSize);

            node.mvVol.focus()
            return (dispatch) => {
                dispatch(showMessageBox(header.error, errorMsg))
            }
        }
        else if (volume % lotSize > 0 && orderType === language.enterorder.value.OTLOddLot && volume >= lotSize) {
            errorMsg = message.invalidLotSizeOddLot;
            errorMsg = errorMsg.replace("{0}", lotSize);

            node.mvVol.focus()
            return (dispatch) => {
                dispatch(showMessageBox(header.error, errorMsg))
            }
        }
    }
    
    if (value.price != undefined) {
        var price = value.price
        if (isNaN(price) || parseInt(price) === 0) {
            node.mvPrice.focus()
            return (dispatch) => {
                dispatch(showMessageBox(header.error, message.enterPrice))
            }
        } else if (price < 0) {
            node.mvPrice.focus()
            return (dispatch) => {
                dispatch(showMessageBox(header.error, message.priceNegative))
            }
        } else {
            // check ceil and floor

            if(value.ceil == undefined || value.floor == undefined) {
                node.mvPrice.focus()
                return (dispatch) => {
                    dispatch(showMessageBox(header.error, message.placeOrderFailed))
                }
            } else if(value.expireDate == undefined) {
                if (value.ceil != 0 && value.floor != 0) {
                    if (price > value.ceil || price < value.floor) {
                        var errorMsg = message.invaliedPriceOutRange;
                        errorMsg = errorMsg
                            .replace('from_value', Utils.formatCurrency(value.floor))
                            .replace('to_value', Utils.formatCurrency(value.ceil))

                        node.mvPrice.focus()
                        return (dispatch) => {
                            dispatch(showMessageBox(header.error, errorMsg))
                        }
                    }
                }
            }
        }
    }

    return (dispatch) => {
        dispatch(checkTimeOrder(value.marketID, value.orderType, value.expireDate != undefined, language,
            function() {
                // checkTimeOrder success
                console.log("checkTimeOrder success, going to checkOrderBalanceStatus")
                let priveValue = value.price == undefined ? value.ceil : value.price
                
                    dispatch(checkOrderBalanceStatus(value.settleAcc, value.bs, value.symbol, value.marketID, priveValue, value.quantity, value.temporaryFee, language,
                        function() {
                            console.log("checkOrderBalanceStatus success")
                            var param = {
                                mvBS: value.bs,
                                mvStockCode: value.symbol,
                                mvMarketID: value.marketID,
                                mvPrice: value.price,
                                mvQuantity: value.quantity,
                                mvOrderTypeValue: value.orderType,
                                mvGoodTillDate: value.expireDate != undefined ? value.expireDate.format("ddd MMM DD YYYY HH:mm:ss ZZ") : null,
                                mvGrossAmt: value.grossAmt,
                                mvBankID: value.bankID,
                                mvBankACID: value.bankACID,
                            }

                            
                            api.post(ACTION.VERIFYORDER, param, dispatch, 
                                function(result) {
                                    // success
                                    if(result) {
                                        if (result.mvResult == "SESSION_EXPIRED") {
                                            //sessionExpired();
                                            // return;

                                            return dispatch => {
                                                dispatch(showOrderFail("SESSION_EXPIRED", language))
                                            }
                                        }
                                        if (result.mvResult == "MULTI_USERS_LOGIN") {
                                            return dispatch => {
                                                dispatch(showOrderFail("MULTI_USERS_LOGIN", language))
                                            }
                                        }
    
                                        if (result.mvResult == "SYSTEM_MAINTENANCE") {
                                            return dispatch => {
                                                dispatch(showOrderFail("SYSTEM_MAINTENANCE", language))
                                            }
                                        }
    
                                        if (result.mvReturnCode == 30013) {
                                            return dispatch => {
                                                dispatch(showOrderFail("30013", language))
                                            }
                                        }
                                        
                                        return dispatch => {
                                            dispatch(showOrderConfirm(value, language, theme))
                                        }
                                    }
                                },
                                function(err) {
                                    // error
                                    let params = {
                                        key: '' + (new Date()).getTime()
                                    }
                                    return dispatch => {
                                        api.post(ACTION.ENTERORDERFAIL, params, dispatch, 
                                            function(result) {
                                                // success
                                                if(result) {
                                                    return dispatch => {
                                                        dispatch(showOrderFail(result.mvResult, language))
                                                    }
                                                }
                                            },
                                            function(err) {
                                                return dispatch => {
                                                    dispatch(showOrderFail(err, language))
                                                }
                                            })
                                    }
                                })
                            
                        },
                        function() {

                        }))
                
            },
            function() {
                console.log("checkTimeOrder fail")
            }
        ))
    }

}


function checkTimeOrder(marketID, orderType, expiryChecked, language, successHandler, failHandler) {
    console.log("checkTimeOrder ", marketID, orderType, expiryChecked)
    if (expiryChecked) {
        return dispatch => {dispatch(successHandler)}
    } else {
        return dispatch => {
            dispatch(getMarketStatus(marketID, function(response) {
                // getMarketStatus success

                var t = response.mvMarketStatus;
                var enableEnterTime = response.canEnterOrder
               
                
                var errorMsg = ''
                if (marketID == 'HO') {
                    if ((t != "T1" && t != "T2" && t != "T3") && (enableEnterTime != "true")) {
                        errorMsg = language.messagebox.message.marketClose_HO
                    } else {
                        if (orderType == "O" && (t == "T2" || t == "T3")) {
                            errorMsg = language.messagebox.message.invalidTime_ATO
                        }

                    }


                } else {
                    if (t == null || t == "13") {
                        if (marketID == 'HA') {
                            errorMsg = language.messagebox.message.marketClose_HNX
                        } else
                            if (marketID == 'OTC') {
                                errorMsg = language.messagebox.message.marketClose_UPCOM
                            }
                    }
                }

                if (errorMsg != '') {
                    return dispatch => {
                        dispatch(showMessageBox(language.messagebox.title.error, errorMsg))
                        dispatch(failHandler)
                    }
                }
                
                dispatch(successHandler)

            }, failHandler))
        }
    }
}

function getMarketStatus(marketID, successHandler, failHandler) {
    console.log("getMarketStatus")
    var param = {
        "mvMarketID": marketID,
        "key": new Date().getTime()
    }
    return dispatch => {
        api.post(ACTION.QUERYMARKETSTATUSINFO, param, dispatch, successHandler, failHandler)
    }
}


function checkOrderBalanceStatus(settleAcc, bs, symbol, marketID, price, quantity, temporaryFee, language, successHandler, failHandler) {
   
    var buyVol = quantity * price;
    
    console.log('checkOrderBalanceStatus', settleAcc, bs, symbol, marketID, price, quantity, temporaryFee)
    // check buying power when user trade
    if (bs == 'B') {
        // If bank account
        if (settleAcc != null) {

            var buyingPowerd = parseFloat(settleAcc.mvBalance);
            var temporaryFeeAmount = buyVol * temporaryFee / 100;
            if (buyingPowerd + temporaryFeeAmount < buyVol) {

                return dispatch => {
                    dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.lakeCash)),
                    dispatch(failHandler)
                }
            } else {
                return dispatch => {
                    dispatch(successHandler)
                }
            }

        } else {
            // If has no bank
            var mvActionStockInfo = "BP";
            var mvEnableGetStockInfo = "N";

            return dispatch => {
                dispatch(getSymbolInfo(symbol, marketID, bs, mvEnableGetStockInfo, mvActionStockInfo,
                    function(json) {
                        var buyingPower1 = parseFloat(Utils.numUnFormat(json.mvStockInfoBean.mvBuyingPowerd));
                        var marPer = json.mvStockInfoBean.mvMarginPercentage;
                        var nominal = json.mvStockInfoBean.mvNomial;
                        if (marPer && marPer != "null") {
                            marPer = parseFloat(Utils.numUnFormat(marPer));
                        } else {
                            marPer = 0;
                        }
                        if (nominal && nominal != "null") {
                            nominal = parseFloat(Utils.numUnFormat(nominal));
                            if (nominal == 0) {
                                nominal = price;
                            }
                        } else {
                            nominal = price;
                        }

                        var temporaryFeeAmount = buyVol * temporaryFee / 100;
                        if (buyingPower1 + quantity * nominal * marPer / 100 + temporaryFeeAmount < buyVol) {
                            dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.lakeCash))
                            dispatch(failHandler)
                        } else {
                            dispatch(successHandler)
                        }
                    },
                    function(err) {
                        dispatch(failHandler)
                    }))
            }
        }
    }
    else if (bs == 'S') {
        var mvActionStockInfo = "SI";
        var mvEnableGetStockInfo = "N";

        return dispatch => {
            dispatch(getSymbolInfo(symbol, marketID, bs, mvEnableGetStockInfo, mvActionStockInfo,
                function(json) {
                    var usableStock1 = parseFloat(Utils.numUnFormat(json.mvStockInfoBean.mvUsable));
                    if (quantity > usableStock1) {
                        dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.lakeStock))
                        dispatch(failHandler)
                    } else {
                        dispatch(successHandler)
                    }
                },
                function(err) {
                    dispatch(failHandler)
                }
            ))}
    }
}

function getSymbolInfo(symbol, marketID, bs, enableGetStockInfo, actionStockInfo, successHandler, failHandler) {
    var param = {
        "mvInstrument": symbol,
        "mvMarketId": marketID,
        "mvBS": bs,
        "key": new Date().getTime(),
        "mvEnableGetStockInfo": enableGetStockInfo,
        "mvAction": actionStockInfo
    }
    
    return dispatch => {
        api.post(ACTION.STOCKINFO, param, dispatch, successHandler, failHandler)
    }
}

function showOrderFail(err, language) {
    return dispatch => {
        dispatch(showMessageBox(language.messagebox.title.error, "Error"))
    }
}

function showOrderConfirm(value, language, theme) {

    var data = {
        mvStockCode: value.symbol,
        mvStockName: value.symbolName,
        mvPrice: value.price,
        mvVolume: value.quantity,
        mvOrderType: value.orderType,
        mvGrossAmt: value.grossAmt,
        mvExpireDate: moment().format("dd/MM/yyyy"),
        mvExpireChecked: false,
        mvNetFee: value.netFee,
        mvLending: value.lending,
        mvBuyPower: value.buyingPower,
        mvMarketID: value.marketID,
        mvBankACID: value.bankACID,
        mvBankID: value.bankID,
        mvBS: value.bs,
        language: language,
        pin: value.pin,
        tradingAccount: value.tradingAccount,
        tradingType: "NORMAL"
    }
    console.log(data)
    
    return dispatch => {
        dispatch(showPopup({
            data: data,
            title: language.enterorder.popup.title.replace('{0}', value.bs === 'B' ?
                language.enterorder.header.buy :
                language.enterorder.header.sell),
            language: language,
            theme: theme,
            id: 'enterorderconfirm',
            authcard: false
        }))
    }
}