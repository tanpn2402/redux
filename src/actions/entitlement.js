import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as Utils from '../utils'
import {showMessageBox} from './notification'
import {showPopup} from './popup'

const {TTLUtils} = require('../ttl/utils/TTLUtils')
const {ActionTypes} = require('../core/constants')

export function getEntitlementStockList(params) {
    var callback = function(response) {

    }
    return (dispatch) => {
        WebApi.post(ACTION.GETENTITLEMENTSTOCKLIST, params, dispatch, callback)
    }

}

export function entitlementGetAccountBalance(params) {
    var me = params.me
    var bankInfo = params.bankInfo
    var isBank = bankInfo["mvBankID"].length > 0 ? true : false
    var _params = {
        "bankId": bankInfo["mvBankID"],
        "bankAcId": bankInfo["mvBankACID"],
        "loadBank": isBank,
        "key": new Date().getTime()
    }

    var callback = function(response) {
        if (response.mvList.length > 0) {
            var mvAccountBalanceBean = response.mvList[0]
            var lang = 'vi_VN'
            console.log(mvAccountBalanceBean)
            if (isBank) {
                me.setCashBalanceValue(Utils.currencyShowFormatter(mvAccountBalanceBean.mvBuyingPowerd, ",", lang))
                me.setCashAvailableValue(Utils.currencyShowFormatter(mvAccountBalanceBean.mvBuyingPowerd, ",", lang))
                me.setBuyPowerValue(Utils.currencyShowFormatter(mvAccountBalanceBean.mvBuyingPowerd, ",", lang))
            } else {
                var balance = mvAccountBalanceBean.mvCSettled
                var advanceableAmount = mvAccountBalanceBean.mvAdvanceableAmount
                var withdrawable = mvAccountBalanceBean.mvWithdrawableAmount
                if (mvAccountBalanceBean.mvAccountType == "M") {
                    balance = mvAccountBalanceBean.mvManualReserve
                }
                var availableBal = Utils.numUnFormat(withdrawable) + Utils.numUnFormat(advanceableAmount)
                me.setCashBalanceValue(Utils.currencyShowFormatter(balance, ",", lang))
                me.setCashAvailableValue(Utils.currencyShowFormatter(availableBal, ",", lang))
                me.setBuyPowerValue(Utils.currencyShowFormatter(mvAccountBalanceBean.mvBuyingPowerd, ",", lang))
            }
        } else {
            me.setCashBalanceValue(0)
            me.setCashAvailableValue(0)
            me.setBuyPowerValue(0)
        }
    }

    return (dispatch) => {
        WebApi.post(ACTION.ACCOUNTBALANCE, _params, dispatch, callback)
    }
}

/// get data ////
function responsedynamicdata(response) {
    return {
        type: ActionTypes.DYNAMICDATA,
        data: response,
    }
}

export function getDynamicdata(params) {
    console.log("hello", params)
    return (dispatch) => {
        WebApi.post(ACTION.GETDYNAMICUPDATEDATA, params, dispatch, responsedynamicdata)
    }
}

function responseRightlist(response) {
    return {
        type: ActionTypes.ENTITLEMENTRIGHTLIST,
        data: response,
    }
}

export function getRightlist(params) {
    return (dispatch) => {
        WebApi.post(ACTION.GETALLRIGHTLIST, params, dispatch, responseRightlist)
    }
}

function responseAdditionalshareinfo(response) {
    return {
        type: ActionTypes.ENTITLEMENTADDITIONALSHARELIST,
        data: response,
    }
}

export function getAdditionalshareinfo(params) {
    return (dispatch) => {
        WebApi.post(ACTION.GETADDITIONISSUESHAREINFO, params, dispatch, responseAdditionalshareinfo)
    }
}

function responseHistorylist(response) {
    return {
        type: ActionTypes.ENTITLEMENTHISTORYLIST,
        data: response,
    }
}

export function getEntitlementHistorylist(params) {
    return (dispatch) => {
        WebApi.post(ACTION.GETENTITLEMENTHISTORY, params, dispatch, responseHistorylist)
    }
}
//// end get data////

function validateEntitlement(params) {
    var me = params.me
    var language = params.language

    //check id dest account is empty		
    if (me.cboStockCode === undefined || me.cboStockCode === "") {
        return {
            success: false,
            msg: language.messagebox.message.selectStock
        }
    }

    //check id dest account is empty		
    if (me.txtTradeQty.value.trim() === "") {
        return {
            success: false,
            msg: language.messagebox.message.enterQty
        }
    }

    // check stock existed qty
    if (me.txtStockExistQty.value && me.txtStockExistQty.value.trim().length > 0) {
        if (me.txtStockExistQty.value.trim() == "0") {
            return {
                success: false,
                msg: language.messagebox.message.notExistQty
            }
        }
    }

    //check id dest account is empty		
    if (me.txtTradeQty.value.trim() == "0") {
        return {
            success: false,
            msg: language.messagebox.message.invalidQty
        }
    }

    // check quantity
    var myQty = me.txtTradeQty;
    var excercisableQty = TTLUtils.numUnFormat(me.txtStockExistQty.value.trim());
    if (parseFloat(myQty) > parseFloat(excercisableQty)) {
        return {
            success: false,
            msg: language.messagebox.message.overQuantity
        }
    }

    var startDate = me.txtBeginTransferDate.value.trim()
    var endDate = me.txtEndTransferDate.value.trim()
    var dateStart = null
    var dateEnd = null
    if (startDate && startDate.length > 0 && endDate && endDate.length > 0) {
        dateStart = new Date();
        dateStart.setFullYear(startDate.substr(6, 4), startDate.substr(3, 2), startDate.substr(0, 2))
        // dateEnd
        dateEnd = new Date();
        dateEnd.setFullYear(endDate.substr(6, 4), endDate.substr(3, 2), endDate.substr(0, 2))

    } else {
        return {
            success: false,
            msg: language.messagebox.message.invalidStartEndDate
        }
    }

    // check trade date
    var tradeDate = me.tradingDate.value.trim()
    var dateTrade = new Date()
    if (tradeDate && tradeDate.length > 0) {
        dateTrade.setFullYear(tradeDate.substr(0, 4), tradeDate.substr(5, 2), tradeDate.substr(8, 2));
    }

    // compare trade date with start date and end date
    if (dateStart && dateEnd && dateTrade) {
        if (dateTrade < dateStart || dateTrade > dateEnd) {
            return {
                success: false,
                msg: language.messagebox.message.invalidTradeDate
            }
        }
    }

    return {
        success: true
    }

}

export function submitEntitlement(params) {
    var language = params.language
    var me = params.me

    var result = validateEntitlement({
        me: me,
        language: language
    })

    if (!result.success) {
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, result.msg))
        }
    } else {
        var data = {}
        return (dispatch) => {
            dispatch(showPopup({
                data: data,
                title: language.entitlement.popup.title,
                language: language,
                id: 'entitlement',
                authcard: true
            }))
        }
    }

}

export function getEntitlementData(params) {
    var me = params.me
    var record = params.record

    var callback = function(response) {
        me.entitlementData = response
        if (response && response.stockEntitlementInfo) {

            me.txtTradeStockCode.setValue(response.stockEntitlementInfo.tradeStockCode)
            me.txtTimePeriod.setValue(response.stockEntitlementInfo.startDate + ' - ' + response.stockEntitlementInfo.endDate)
            me.txtBeginTransferDate.setValue(response.stockEntitlementInfo.startDate)
            me.txtEndTransferDate.setValue(response.stockEntitlementInfo.endDate)
            me.txtPrice.setValue(response.stockEntitlementInfo.price)
            me.txtMaxQty.setValue(response.stockEntitlementInfo.maxQtyCanBuy)
            me.txtRequestedQty.setValue(response.stockEntitlementInfo.registerQty)
            me.txtBuyRate.setValue(Utils.numFormat(response.stockEntitlementInfo.perRightRate) + " : " + Utils.numFormat(response.stockEntitlementInfo.perStockRate))
            me.entitlementId.setValue(response.stockEntitlementInfo.entitlementId)
            me.marketId.setValue(response.stockEntitlementInfo.marketId)
            me.txtRightDate.setValue(response.stockEntitlementInfo.bookCloseDate)
            me.tradingDate.setValue(response.mvTradeDate)

            me.locationId.setValue(response.stockEntitlementInfo.locationId)

            // buyable stock quantity
            var perRight = response.stockEntitlementInfo.perRightRate
            var perShare = response.stockEntitlementInfo.perStockRate
            var rightCanBuy = Utils.numUnFormat(response.stockEntitlementInfo.maxQtyCanBuy, "")
            var buyableQty = 0
            if (perRight && perRight.trim().length > 0 && perRight.trim() != "0" &&
                perShare && perShare.trim().length > 0) {
                buyableQty = Math.floor(parseFloat(rightCanBuy) * parseFloat(perShare) / parseFloat(perRight))
            }
            me.txtStockExistQty.setValue(TTLUtils.numIntFormat(buyableQty.toString()))

            // set default quantity
            me.txtTradeQty.setValue("")

            // total right
            var registerQty = Utils.numUnFormat(response.stockEntitlementInfo.registerQty, "")
            var totalRight = parseFloat(registerQty) + parseFloat(rightCanBuy)
            me.txtTotalRights.setValue(TTLUtils.numIntFormat(totalRight.toString()))

            // total stock
            var totalStock = 0
            if (perRight && perRight.trim().length.length > 0 && perRight.trim() != "0" &&
                perShare && perShare.trim().length > 0) {
                totalStock = Math.floor(totalRight * parseFloat(perShare) / parseFloat(perRight))
            }
            me.txtTotalStock.setValue(TTLUtils.numIntFormat(totalStock.toString()))

            // stock requested
            var stockRequested = 0
            if (perRight && perRight.trim().length.length > 0 && perRight.trim() != "0" &&
                perShare && perShare.trim().length > 0) {
                stockRequested = Math.floor(registerQty * parseFloat(perShare) / parseFloat(perRight))
            }
            me.txtStockRequestedQty.setValue(TTLUtils.numIntFormat(stockRequested.toString()))

        } else {
            resetEntitlementData(me)
        }

        calculateTotal(me)
    }

    var params = {
        'mvStockId': record.stockId,
        'mvMarketId': record.marketId,
        'mvEntitlementId': record.entitlementId,
        'mvLocationId': record.locationId
    }

    return (dispatch) => {
        WebApi.post(ACTION.GETENTITLEMENTDATA, params, dispatch, callback)
    }

}

function resetEntitlementData(me) {
    me.txtTradeStockCode.setValue("");
    me.txtBeginTransferDate.setValue("");
    me.txtEndTransferDate.setValue("");
    me.txtPrice.setValue("");
    me.txtMaxQty.setValue("");
    me.txtRequestedQty.setValue("");
    me.txtBuyRate.setValue("");
    me.cboStockCode.setValue("");
    me.txtQuantity.setValue("");
    me.txtAmount.setValue("");
    me.txtTradeQty.setValue("");
    me.txtRightDate.setValue("");
    me.txtStockRequestedQty.setValue("");
    me.txtTotalRights.setValue("");
    me.txtTotalStock.setValue("");
    me.txtStockExistQty.setValue("");
    me.txtTimePeriod.setValue("");
}

function calculateTotal(me) {
    var me = this;

    var qty = 12 /*$("#txtTradeQty").asNumber();*/
    if (me.entitlementData && me.entitlementData.stockEntitlementInfo) {
        var price = me.entitlementData.stockEntitlementInfo.price;
        var perRight = me.entitlementData.stockEntitlementInfo.perRightRate;
        var perShare = me.entitlementData.stockEntitlementInfo.perStockRate;

        // count total amount
        if (qty && qty > 0) {

            // get value of trade qty
            var tradeQty = parseFloat(qty);

            if (perShare && perShare.trim().length > 0 && perShare.trim() != "0" &&
                perRight && perRight.trim().length > 0) {
                var rightQty = Math.floor(tradeQty * parseFloat(perRight) / parseFloat(perShare));
                me.txtQuantity.setValue(TTLUtils.numIntFormat(rightQty));

                if (price && price.trim().length > 0) {
                    var total = tradeQty * parseFloat(price);
                    me.txtAmount.setValue(TTLUtils.currencyFormatter(total, false, 3, ".", ",", " ", true));
                }
            }
        } else {
            me.txtAmount.setValue("");
        }

    }
}