const { ActionTypes } = require('../core/constants');

const accountbalance = { "mvList": [{ "mvAccountType": null, "mvAdvanceableAmount": null, "mvAvailableBalance": null, "mvAvailableBalanceDisableEnd": null, "mvAvailableBalanceDisableStart": null, "mvBankAcId": "125137309", "mvBankId": "ACB", "mvBuyHoldAmount": "100000000.0", "mvBuyingPowerd": "100000000.000", "mvCSettled": null, "mvCashMaintenance": null, "mvClientId": null, "mvCreditLimit": null, "mvCurrencyId": null, "mvDPWD": null, "mvDThreshold": null, "mvDate": null, "mvDueBalance": null, "mvDueSell": "0.0", "mvExtraCreditd": null, "mvForMarginClientEnd": null, "mvForMarginClientStart": null, "mvHoldingAmt": null, "mvInterest": null, "mvLedgerBalace": null, "mvManualReserve": null, "mvMarginCall": null, "mvMarginPercentage": null, "mvMarginValue": null, "mvMarginableValue": null, "mvMarketValue": null, "mvOutstandingLoan": null, "mvPendingBalance": null, "mvPendingBuy": null, "mvPendingSettled": "0.0", "mvPendingWithdraw": null, "mvReceivableAmount": null, "mvReceivableAmt": null, "mvRemaining": null, "mvSettledBalance": null, "mvSupplementCash": null, "mvTemporaryHoldCash": null, "mvTodayBS": null, "mvTodaySettlement": null, "mvTotalAccountValue": null, "mvTotalHoldAmount": null, "mvTotalOutAdvance": null, "mvUsable": null, "mvWithdrawableAmount": null }], "mvResult": null, "mvSuccess": true }

const stockInfoSell = { "mvErrorDescription": null, "mvResult": null, "mvStockBalanceInfo": [{ "mvStockCode": "SMA", "mvTradableQty": 700.0, "mvTTodayBuy": 0.0, "mvTotalValue": 700.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "AGR", "mvTradableQty": 1400.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1400.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "PVD", "mvTradableQty": 150.0, "mvTTodayBuy": 0.0, "mvTotalValue": 150.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "PVS", "mvTradableQty": 500.0, "mvTTodayBuy": 0.0, "mvTotalValue": 500.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "CP061123", "mvTradableQty": 200.0, "mvTTodayBuy": 0.0, "mvTotalValue": 200.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "SD6", "mvTradableQty": 7600.0, "mvTTodayBuy": 0.0, "mvTotalValue": 7600.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "SSI", "mvTradableQty": 1340.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1340.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "KLS", "mvTradableQty": 35326.0, "mvTTodayBuy": 0.0, "mvTotalValue": 35326.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "ACB", "mvTradableQty": 5090.0, "mvTTodayBuy": 0.0, "mvTotalValue": 5090.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "XMC", "mvTradableQty": 10200.0, "mvTTodayBuy": 0.0, "mvTotalValue": 10200.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "STB", "mvTradableQty": 14570.0, "mvTTodayBuy": 0.0, "mvTotalValue": 14570.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "VNM", "mvTradableQty": 1033.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1033.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "DPM", "mvTradableQty": 4040.0, "mvTTodayBuy": 0.0, "mvTotalValue": 4040.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "BID10904", "mvTradableQty": 999210.0, "mvTTodayBuy": 0.0, "mvTotalValue": 999210.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "KSS", "mvTradableQty": 2000.0, "mvTTodayBuy": 0.0, "mvTotalValue": 2000.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "CP061112", "mvTradableQty": 5000.0, "mvTTodayBuy": 0.0, "mvTotalValue": 5000.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "VNE", "mvTradableQty": 500.0, "mvTTodayBuy": 0.0, "mvTotalValue": 500.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "SD6RTS", "mvTradableQty": 1200.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1200.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "ACE", "mvTradableQty": 18700.0, "mvTTodayBuy": 0.0, "mvTotalValue": 18700.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "CHP", "mvTradableQty": 25100.0, "mvTTodayBuy": 0.0, "mvTotalValue": 25100.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "ALT", "mvTradableQty": 100.0, "mvTTodayBuy": 0.0, "mvTotalValue": 100.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "HOA", "mvTradableQty": 1000.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1000.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "DVP", "mvTradableQty": 5000.0, "mvTTodayBuy": 0.0, "mvTotalValue": 5000.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "DVD", "mvTradableQty": 1000.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1000.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "CP061601", "mvTradableQty": 1001.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1001.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "CCI", "mvTradableQty": 1000.0, "mvTTodayBuy": 0.0, "mvTotalValue": 1000.0, "mvTTodaySell": 0.0 }, { "mvStockCode": "HAG", "mvTradableQty": 90.0, "mvTTodayBuy": 0.0, "mvTotalValue": 90.0, "mvTTodaySell": 0.0 }], "mvStockInfoBean": { "mvBidPrice1": "0.000", "mvBidPrice2": "0.000", "mvBidPrice3": "0.000", "mvBidVol1": "0", "mvBidVol2": "0", "mvBidVol3": "0", "mvBuyingPowerd": "0.000", "mvCSettledCashBal": "0.000", "mvCeiling": "0.000", "mvCurrentRoom": "0", "mvDayClose": "0.000", "mvDayOpen": "0.000", "mvFloor": "0.000", "mvHigh": "0.000", "mvLedgerCashBal": "0.000", "mvLow": "0.000", "mvManualReserve": "0.000", "mvMarginPercentage": null, "mvNomial": "0.000", "mvOfferPrice1": "0.000", "mvOfferPrice2": "0.000", "mvOfferPrice3": "0.000", "mvOfferVol1": "0", "mvOfferVol2": "0", "mvOfferVol3": "0", "mvReferencePrice": "0.000", "mvStatusDscription": null, "mvStockName": null, "mvTemporaryFee": null, "mvTodayConfirmBuy": "0", "mvTodayConfirmSell": "0", "mvUsable": "0", "mvUsableBalance": "0.000", "mvdLedgerBalance": "0", "spreadTableCode": null, "update": false } }

const stockInfoACB = { "mvErrorDescription": null, "mvResult": null, "mvStockBalanceInfo": null, "mvStockInfoBean": { "mvBidPrice1": null, "mvBidPrice2": null, "mvBidPrice3": null, "mvBidVol1": null, "mvBidVol2": null, "mvBidVol3": null, "mvBuyingPowerd": "10,797,150.148", "mvCSettledCashBal": null, "mvCeiling": "18.300", "mvCurrentRoom": null, "mvDayClose": null, "mvDayOpen": null, "mvFloor": "15.100", "mvHigh": null, "mvLedgerCashBal": null, "mvLow": null, "mvManualReserve": null, "mvMarginPercentage": "50.000000", "mvNomial": "0.000", "mvOfferPrice1": null, "mvOfferPrice2": null, "mvOfferPrice3": null, "mvOfferVol1": null, "mvOfferVol2": null, "mvOfferVol3": null, "mvReferencePrice": null, "mvStatusDscription": null, "mvStockName": "Ngân hàng Thương mại Cổ phần Á Châu", "mvTemporaryFee": null, "mvTodayConfirmBuy": null, "mvTodayConfirmSell": null, "mvUsable": null, "mvUsableBalance": null, "mvdLedgerBalance": null, "spreadTableCode": "HA", "update": false } }

export function accountBalance() {
    return {
        type: ActionTypes.ACCOUNTBALANCE,
        clientInfo: accountbalance,
    }
}

export function stockInfo() {
    return {
        type: ActionTypes.STOCKINFO,
        stockInfoS: stockInfoSell,
        stockInfoB: stockInfoACB,
    }
}

export function setPopup(isShow) {
    return {
        type: ActionTypes.SET_POPUP,
        isShow
    }
}

export function setError(isError) {
    return {
        type: ActionTypes.SET_ERROR,
        isError
    }
}

export function checkPreEnterOrder(json, stockBalanceInfo, stockBeanInfo, language) {
    return dispatch => {
        if (checkmvOrderType(json.mvOrderType, json.mvVolume, language) !== "SUCCESS")
            return dispatch(setError(checkmvOrderType(json.mvOrderType, json.mvVolume, language)))
        if (checkmvRange(json.mvStatus, stockBalanceInfo, stockBeanInfo, json.mvPrice, json.mvStock, json.mvVolume, language) !== "SUCCESS")
            return dispatch(setError(checkmvRange(json.mvStatus, stockBalanceInfo, stockBeanInfo, json.mvPrice, json.mvStock, json.mvVolume, language)))
        if (checkMoney(json.mvTotalPrice, json.mvBuyPower, json.mvStatus,json.mvBank, language) !== "SUCCESS")
            return dispatch(setError(checkMoney(json.mvTotalPrice, json.mvBuyPower, json.mvStatus, json.mvBank, language)))
        return dispatch(setError('Success all'))
    }
}

function checkmvOrderType(mvOrderType, mvVolume, language) {
    var orderType = ["LO", "ATC", "MAK", "MOK", "MTL", "LO(Odd Lot)"];
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
    if (mvStock === "ACB") {
        if ((parseInt(mvPrice, 10) >= parseInt(stockBeanInfo.mvFloor, 10)) && (parseInt(mvPrice, 10) <= parseInt(stockBeanInfo.mvCeiling, 10))) {
            if (mvStatus === "BUY" || mvStatus === "BUYALL") {
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
        if (mvStatus === "SELL" || mvStatus === "SELLALL") {
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
