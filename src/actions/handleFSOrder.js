import {showMessageBox} from './notification'
import {enterFSOrder} from "./derivatives"
import * as Utils from "../utils"
import moment from "moment"
import {showPopup} from "./popup"

export function handleFSOrder(value, language, theme) {

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
        tradingType: value.tradingType
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