import { ActionTypes } from "../core/constants";
import {showMessageBox, showFlashPopup} from './notification';
import {showPopup} from './popup';
import * as api from '../api/fsapi';
import * as ACTION from '../api/action_name';

const URL = "localhost:3000/FSServer/"
// PHAI SINH

export function getFSSubAccount() {
    return (dispatch) => {
        api.post("getsubaccount", { clientID: localStorage.getItem("clientID") }, dispatch,
            function (response) {
                
                return {
                    type: ActionTypes.GETFSSUBACCOUNT,
                    listAccounts: response.listAccounts
                }
            },
            function (err) {
                console.log(err)
            })
    }
}

export function getFSSeries() {

    return (dispatch) => {
        api.post("getfsseries", { }, dispatch,
            function (response) {
                console.log(response)
                
                return {
                    type: ActionTypes.GETFSSERIES,
                    data: response
                }
            },
            function (err) {
                console.log(err)
            })
    }
}

export function enterFSOrder(params, authParams) {
    console.log(params)

    params = {
        clientID: localStorage.getItem("clientID"),
        tradingAccSeq: parseInt(params.tradingAccount.accountSeq),
        subAccountID: params.tradingAccount.subAccountID,
        version: "",
        language: "",
        seessionID: "",
        deviceID: "",
        osVersion: "",
        orderInfo: {
            bs: params.mvBS,
            marketId: params.mvMarketID,
            seriesId: params.mvStockCode,
            validity: "Day",
            orderType: params.mvOrderType,
            commodityName: ""
        },
        price: parseFloat(params.mvPrice),
        position: "O",   // O open, L liquidate, C close
        qty: parseInt(params.mvVolume),
        Inactive: false,
        StopOrder: false,
        AuctionOrder: false,
        TPlus1: false,
        minQty: 0,
        stopPrice: 0,
        stopType: "N",   // N, D, U, S, T, V, E
        confirmExceedTradingLimit: false,
        confirmExceedDerivation: false,
        confirmMaxVolume: false,
        confirmMarginCall: false,
        confirmExceedDerivationForStopPrice: false,
        confirmLowerDerivation: false,
        confirmLowerDerivationForStopPrice: false,
        confirmExceedPositionWarningLevel1: false,
        confirmExceedPositionWarningLevel2: false,
        confirmExceedOpenInterestWarningLevel1: false,
        confirmExceedOpenInterestWarningLevel2: false,
        validity: "Day",
        orderType: params.mvOrderType,      // L, M, A, C, K
        validitydate: "",
        checkLimitByPassWarning: false
    }

    console.log(params)

    return dispatch => {
        api.post("enterOrder", params, dispatch, 
        function(res) {
            // success
            let orderID = res.orderId
            if(orderID == null) {
                dispatch(showFlashPopup("Error", "Order sent fail!"))
            } else {
                dispatch(showFlashPopup("Success", "Order " + orderID + " updated: " + params.symbol))
            }
                
        },
        function(err) {
            // error
        })
    }
}

export function cancelFSOrder(params) {
    params = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        orderInfo : ""
    }
}

export function modifyFSOrder(params) {
    params = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        orderInfo : "",
        price : "",
        position : "",
        qty : "",
        Inactive : "",
        StopOrder : "",
        AuctionOrder : "",
        TPlus1 : "",
        minQty : "",
        stopPrice : "",
        stopType : "",
        confirmExceedTradingLimit : "",
        confirmExceedDerivation : "",
        confirmMaxVolume : "",
        confirmMarginCall : "",
        confirmExceedDerivationForStopPrice : "",
        confirmExceedPositionWarningLevel1 : "",
        confirmExceedPositionWarningLevel2 : "",
        confirmExceedOpenInterestWarningLevel1 : "",
        confirmExceedOpenInterestWarningLevel2 : "",
        validity : "",
        validitydate : "",
        checkLimitByPassWarning : "",
    }
}

export function getPortfolioFS(params) {

}

export function cpCashDWTS(params) {

    params = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        CounterPartyAC : "",
        bankid : "",
        accountCode : "",
        currencyid : "",
        cashDWChannel : "",
        DW : "",
        amount : "",
        remarks : "",
        otherType : "",
        isTransfer : "",
        toCounterPartyAC : "",
        toBankid : "",
        toAccountCode : "",
        chequeNumber : "",
    }
}

export function orderHistoryEnquiryFS(params) {
    params = {}
}

export function VNRP102ClosePositionEnquiry(params) {
    params = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        fromDate : "",
        toDate : ""
    }
}

export function orderEnquiryFS(params) {
    params = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        Status : "",
    }
}

export function queryClientInfoFS(params) {
    params = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        Status : "",
    }
}

export function clientPortfolioEnquiryFS(params) {
    params = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        QuerySummary : "",
    }
}