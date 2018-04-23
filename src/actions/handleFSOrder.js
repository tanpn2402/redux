import {showMessageBox} from './notification'
import {enterFSOrder} from "./derivatives"
import * as Utils from "../utils"
import moment from "moment"
import {showPopup} from "./popup"

export function handleFSOrder(value, language, theme, node) {
    let title = language.messagebox.title
    let message = language.messagebox.message

    if (value.symbol == "") {
        return dispatch => {dispatch(showMessageBox(title.error, message.enterStockCode))}
    }

    if (isNaN(value.volume) || parseInt(value.volume) == 0) {
        node.mvVol.focus()
        return dispatch => {dispatch(showMessageBox(title.error, message.enterQty))}
    }

    if (isNaN(value.price) || parseInt(value.price) === 0) {
        node.mvPrice.focus()
        return dispatch => {dispatch(showMessageBox(title.error, message.enterPrice))}
    } else if (value.price < 0) {
        node.mvPrice.focus()
        return dispatch => {dispatch(showMessageBox(title.error, message.priceNegative))}
    }


 
    if(parseFloat(value.ceil) < parseFloat(value.price) || parseFloat(value.floor) > parseFloat(value.price) ) {
        var errorMsg = message.invaliedPriceOutRange;
        errorMsg = errorMsg
            .replace('from_value', Utils.formatCurrency(value.floor))
            .replace('to_value', Utils.formatCurrency(value.ceil))

        node.mvPrice.focus()
        return dispatch => {dispatch(showMessageBox(title.error, errorMsg))}
    }
    

    return dispatch => {dispatch(showConfirm(value, language, theme))}
}



function showConfirm(value, language, theme) {
    var data = {
        mvStockCode: value.symbol,
        mvStockName: value.symbolName,
        mvPrice: value.price,
        mvVolume: value.volume,
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
        tradingType: "DERIVATIVES"
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