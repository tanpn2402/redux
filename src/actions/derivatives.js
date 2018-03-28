import { ActionTypes } from "../core/constants";
import {showMessageBox, showFlashPopup} from './notification';
import {showPopup} from './popup';
import * as api from '../api/fsapi';
import * as ACTION from '../api/action_name';
import * as utils from "../utils"
import {updateDerivativeData, getDerivativeList} from "./trading"
const URL = "localhost:3000/FSServer/"
// PHAI SINH

const derivativeList = {
    id: "",
    listSeries: [
        {id: "VN30F1804", name: "VN30F1804", market: "VNFE", ceil: 1227.1, ref: 1146.9, floor: 1066.7},
        {id: "VN30F1805", name: "VN30F1805", market: "VNFE", ceil: 1234.8, ref: 1154.1, floor: 1073.4},
        {id: "VN30F1806", name: "VN30F1806", market: "VNFE", ceil: 1241.3, ref: 1160.1, floor: 1078.9},
        {id: "VN30F1809", name: "VN30F1809", market: "VNFE", ceil: 1263.6, ref: 1181.0, floor: 1098.4},
    ]
}

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

    // return (dispatch) => {
    //     api.post("getfsseries", { }, dispatch,
    //         function (response) {
    //             console.log(response)
                
    //             return {
    //                 type: ActionTypes.GETFSSERIES,
    //                 data: response
    //             }
    //         },
    //         function (err) {
    //             console.log(err)
    //         })
    // }

    let a = function() {
        return {
            type: ActionTypes.GETFSSERIES,
            data: derivativeList
        }
    }

    let b = function(dispatch) {
        return dispatch => {
            dispatch(getDerivativeList(derivativeList.listSeries))
            dispatch(broadcastFSRealtimeData(derivativeList, dispatch))
        }
    }

    return dispatch => {
        dispatch( a()  )
        dispatch( b() )
    }
}

function broadcastFSRealtimeData(list, dispatch) {

    // let a = function() {
        let listSeries = list.listSeries
        let marIndex = utils.randomInt(listSeries.length)
        console.log(listSeries[marIndex])

        return  dispatch(updateDerivativeData(listSeries[marIndex]))
        
    // }

    // setInterval(a, 4000)
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

export function orderHistoryEnquiryFS(data) {

    data.tradingAccount = {}
    data.tradingAccount.accountSeq = 1
    data.tradingAccount.subAccountID = "100002"

    let params = {
        clientID : "100002",
        tradingAccSeq: parseInt(data.tradingAccount.accountSeq),
        subAccountID: data.tradingAccount.subAccountID,
        version: "",
        language: "",
        sessionID: "",
        sessionID: "",
        osVersion: "",
        Status : "", 
        orderdate: "",
    }

    console.log(params)

    return dispatch => {
        api.post("orderHistoryEnquiry", params, dispatch, 
        function(res) {
            // success
            console.log(res)

            if(!res) {
                return {
                    type: 0
                }
            }

            let list = res.orderEnquireInfoList
            if(list.length > 0) {
                let data = list.map(e => {
                    return {
                        "matchedDate": "08-12-2015",
                        "mvAON": null,
                        "mvAction": null,
                        "mvActivationDate": null,
                        "mvAllorNothing": "N",
                        "mvApprovalReason": null,
                        "mvApprovalRemark": null,
                        "mvApprovalTime": null,
                        "mvAvgPrice": "0.000",
                        "mvAvgPriceValue": "0.000",
                        "mvBS": "Buy",
                        "mvBSValue": null,
                        "mvBankACID": null,
                        "mvBankID": null,
                        "mvBranchID": null,
                        "mvBrokerID": null,
                        "mvCancelIcon": null,
                        "mvCancelQty": null,
                        "mvCancelQtyValue": null,
                        "mvChannelID": "INT       ",
                        "mvClientID": null,
                        "mvClientRemarks": null,
                        "mvContactPhone": null,
                        "mvCreateTime": null,
                        "mvCurrencyID": null,
                        "mvDNSeq": null,
                        "mvDateTime": null,
                        "mvEntityID": null,
                        "mvExceededAmt": null,
                        "mvFilledPrice": "0.000",
                        "mvFilledQty": "100",
                        "mvGoodTillDate": null,
                        "mvGrossAmt": null,
                        "mvHedge": null,
                        "mvHoldConfirmQty": null,
                        "mvHostId": null,
                        "mvInActive": null,
                        "mvInputTime": "29/08/2016 15:54:53",
                        "mvInstrumentId": null,
                        "mvInstrumentShortName": null,
                        "mvInvestorClassId": null,
                        "mvInvestorGroupId": null,
                        "mvIsManualTrade": null,
                        "mvIsOddLot": null,
                        "mvIsPostExecutedOrder": null,
                        "mvIsPriceWarningResubmit": null,
                        "mvIsReleased": null,
                        "mvLastModifiedUserId": null,
                        "mvLastTradeTime": null,
                        "mvLotSize": 0,
                        "mvMarketID": "HOSE",
                        "mvModifiedDate": null,
                        "mvModifiedDateTime": null,
                        "mvModifiedTime": null,
                        "mvModifyIcon": null,
                        "mvModifyOrderID": null,
                        "mvNetAmt": null,
                        "mvNetAmtValue": null,
                        "mvNotifiedFlag": null,
                        "mvOSQty": null,
                        "mvOSQtyValue": null,
                        "mvOgackTime": null,
                        "mvOrderBeanID": 0,
                        "mvOrderGroupID": "10016561  ",
                        "mvOrderID": "10019044  ",
                        "mvOrderType": "Limit",
                        "mvOrderTypeValue": "L",
                        "mvOrigin": null,
                        "mvPendAction": null,
                        "mvPendingPrice": null,
                        "mvPendingQty": null,
                        "mvPrevtradeConsideration": null,
                        "mvPrice": "46.150",
                        "mvPriceValue": null,
                        "mvQty": "100",
                        "mvQtyValue": null,
                        "mvRejectReason": "",
                        "mvRejectReasonDetail": null,
                        "mvRemark": null,
                        "mvRepOrterGroupId": null,
                        "mvReporTackTime": null,
                        "mvReporTime": null,
                        "mvSCRIP": null,
                        "mvShortName": null,
                        "mvShortsell": null,
                        "mvShowCancelIcon": null,
                        "mvShowModifyIcon": null,
                        "mvStatus": "CAN       ",
                        "mvStatusInternal": null,
                        "mvStatusTarget": "CAN       _TARGET",
                        "mvStatus_Internal": null,
                        "mvStockID": "SSI                 ",
                        "mvStockName": " - ",
                        "mvStopOrderExpiryDate": null,
                        "mvStopOrderType": null,
                        "mvStopPrice": "No",
                        "mvStopPriceValue": null,
                        "mvStopTriggerTime": null,
                        "mvStopType": null,
                        "mvStopTypeValue": null,
                        "mvSupervisorId": null,
                        "mvSupervisorrejected": null,
                        "mvTradeConsideration": null,
                        "mvTradeTime": null,
                        "mvUserID": null,
                        "mvValidityDate": null,
                        "price": null,
                        "stockCode": null,
                        "stockName": null
                    }
                })
            }


        },
        function(err) {

        }
    )}



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

export function orderEnquiryFS(p) {
   
    let params = {
        clientID : p.subAccountID,
        tradingAccSeq: parseInt(p.accountSeq),
        subAccountID: p.subAccountID,
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        Status : "",   
    }

    /*
    
    Pending_Approval
    Ready_To_Send
    Outstanding
    Sending
    Notified
    Rejected
    Filled
    Cancelled
    Inactive
    Killed
    Fill_And_Kill
    Queue
    Stop_Ready
    Stop_Sent
    Stop_Failed
    Stop_Inactive
    AOC_Cancelled

    */
    console.log(params)

    return dispatch => {
        api.post("orderEnquiry", params, dispatch, 
        function(res) {
            // success
            console.log(res)

            if(!res) {
                return {
                    type: 0
                }
            }

            console.log("orderEnquireInfoList FS", res.orderEnquireInfoList)
            let orderEnquireInfoList = res.orderEnquireInfoList
            if(orderEnquireInfoList.length > 0) {
                let data = orderEnquireInfoList.map(e => {
                    return {
                        "matchedDate": "",
                        "mvAON": "",
                        "mvAction": "",
                        "mvActivationDate": "2015-12-10",
                        "mvAllorNothing": "N",
                        "mvApprovalReason": "",
                        "mvApprovalRemark": "",
                        "mvApprovalTime": "",
                        "mvAvgPrice": "",
                        "mvAvgPriceValue": "",
                        "mvBS": e.orderInfo.bs.value,
                        "mvBSValue": e.orderInfo.bs.value,
                        "mvBankACID": "",
                        "mvBankID": "",
                        "mvBranchID": "",
                        "mvBrokerID": "",
                        "mvCancelIcon": "",
                        "mvCancelQty": "100",
                        "mvCancelQtyValue": "100",
                        "mvChannelID": "INT",
                        "mvClientID": "C080001",
                        "mvClientRemarks": "",
                        "mvContactPhone": "",
                        "mvCreateTime": "",
                        "mvCurrencyID": "VND",
                        "mvDNSeq": "",
                        "mvDateTime": "",
                        "mvEntityID": "",
                        "mvExceededAmt": "",
                        "mvFilledPrice": "",
                        "mvFilledQty": e.filled,
                        "mvGoodTillDate": "",
                        "mvGrossAmt": "0.000",
                        "mvHedge": "",
                        "mvHoldConfirmQty": "",
                        "mvHostId": "",
                        "mvInActive": "",
                        "mvInputTime": "08:59:33",
                        "mvInstrumentId": "",
                        "mvInstrumentShortName": "",
                        "mvInvestorClassId": "",
                        "mvInvestorGroupId": "",
                        "mvIsManualTrade": "",
                        "mvIsOddLot": "",
                        "mvIsPostExecutedOrder": "",
                        "mvIsPriceWarningResubmit": "",
                        "mvIsReleased": "",
                        "mvLastModifiedUserId": "",
                        "mvLastTradeTime": "",
                        "mvLotSize": 100,
                        "mvMarketID": e.orderInfo.marketId,
                        "mvModifiedDate": "",
                        "mvModifiedDateTime": "",
                        "mvModifiedTime": "08:59:38",
                        "mvModifyIcon": "",
                        "mvModifyOrderID": "",
                        "mvNetAmt": "0.000",
                        "mvNetAmtValue": "0.000",
                        "mvNotifiedFlag": "",
                        "mvOSQty": e.osqty,
                        "mvOSQtyValue": e.osqty,
                        "mvOgackTime": "",
                        "mvOrderBeanID": 0,
                        "mvOrderGroupID": e.orderInfo.orderGroupId,
                        "mvOrderID": e.orderInfo.orderId,
                        "mvOrderType": e.orderInfo.orderType.value,
                        "mvOrderTypeValue": e.orderInfo.orderType.value,
                        "mvOrigin": "",
                        "mvPendAction": "",
                        "mvPendingPrice": "0.000",
                        "mvPendingQty": "0",
                        "mvPrevtradeConsideration": "",
                        "mvPrice": e.price,
                        "mvPriceValue": e.price,
                        "mvQty": e.qty,
                        "mvQtyValue": e.qty,
                        "mvRejectReason":"REJECTREASONDETAILS",
                        "mvRejectReasonDetail":  e.rejectreason ,
                        "mvRemark": "",
                        "mvRepOrterGroupId": "",
                        "mvReporTackTime": "",
                        "mvReporTime": "",
                        "mvSCRIP": "N",
                        "mvShortName": "",
                        "mvShortsell": "",
                        "mvShowCancelIcon": e.isCancellable? "Y" : "N",
                        "mvShowModifyIcon": e.isModifiable? "Y" : "N",
                        "mvStatus": e.status,
                        "mvStatusInternal": "",
                        "mvStatusTarget": "CAN",
                        "mvStatus_Internal": "",
                        "mvStockID": e.orderInfo.seriesId,
                        "mvStockName": e.orderInfo.seriesId,
                        "mvStopOrderExpiryDate": "",
                        "mvStopOrderType": "No",
                        "mvStopPrice": e.stopPrice,
                        "mvStopPriceValue": e.stopPrice,
                        "mvStopTriggerTime": "",
                        "mvStopType": e.stopType,
                        "mvStopTypeValue": "N",
                        "mvSupervisorId": "",
                        "mvSupervisorrejected": "",
                        "mvTradeConsideration": "",
                        "mvTradeTime": null,
                        "mvUserID": "",
                        "mvValidityDate": e.orderInfo.validityDate,
                        "price": e.price,
                        "stockCode": e.orderInfo.seriesId,
                        "stockName": e.orderInfo.seriesId
                    }
                })

                console.log("orderEnquireInfoList FS", data)
                return {
                    type: ActionTypes.ORDERENQUIRYFS,
                    data
                }
            }
                
        },
        function(err) {
            // error
            console.log(err)
            return {
                type: 1
            }
        })
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
    let p = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        QuerySummary : true,
    }
    p = Object.assign(p, params)

    return dispatch => {
        api.post("clientPortfolioEnquiry", p, dispatch, 
            function(res) {
                // success
                // console.log(res)
                return {
                    type: ActionTypes.CLIENTPORTFOLIOENQUIRYFS,
                    data: res
                }
            },
            function(err) {
                // error
            }
        )
    }
}

export function cashBalanceEnquiry(params) {
    let p = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        QuerySummary : true,
    }

    p = Object.assign(p, params)
    // console.log(p)
    
    return dispatch => {
        api.post("cashBalanceEnquiry", p, dispatch, 
            function(res) {
                // success
               
                if(!res) {
                    return {
                        type: 0
                    }
                }
                // console.log(res)
                return {
                    type: ActionTypes.CASHBALANCEENQUIRYFS,
                    data: res.accountBalanceInfo
                }
            },
            function(err) {
                // error
            }
        )
    }
}

export function submitCPCashDWFS(params) { // DW to VSD
    let p = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        CounterPartyAC : "",  //Y
        bankid : "",  //Y
        accountCode : "",  //Y
        currencyid : "",  //Y
        cashDWChannel : "",  //Y
        DW : "",  //Y -> D/W
        amount : "",  //Y
        remarks : "",
        otherType : "",
        isTransfer : "",
        toCounterPartyAC : "",
        toBankid : "",  
        toAccountCode : "",
        chequeNumber : ""
    }

    p = Object.assign(p, params)
    console.log(p)
    return dispatch => {
        api.post("CPCashDW", p, dispatch, 
            function(res) {
                // success
               
                if(!res) {
                    return {
                        type: 0
                    }
                }
                console.log(res)
                return {
                    type: ActionTypes.SUBMITCPCASHDWFS,
                    
                }
            },
            function(err) {
                // error
            }
        )
    }
}

export function submitCashDWFS(params) { // DW internal
    let p = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        InputChannelID : "",
        Agent : "",
        TranType : "",
        currencyid : "",
        Amount : "",
        CashDWChannel : "",
        BankID : "",
        AccountCode : "",
        ClientBankID : "",
        ClientBankACCode : "",
        Remark : "",
        Reference : "",
        SettleCashBy : ""
    }

    p = Object.assign(p, params)
    console.log(p)
    return dispatch => {
        api.post("CashDW", p, dispatch, 
            function(res) {
                // success
               
                if(!res) {
                    return {
                        type: 0
                    }
                }
                console.log(res)
                return {
                    type: ActionTypes.SUBMITCASHDWFS,
                    
                }
            },
            function(err) {
                // error
            }
        )
    }
}

export function deleteCashDWFS(params) {
    let p = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        TranID : "",

    }

    p = Object.assign(p, params)
    console.log(p)
    return dispatch => {
        api.post("DeleteCashDW", p, dispatch, 
            function(res) {
                // success
               
                if(!res) {
                    return {
                        type: 0
                    }
                }
                console.log(res)
                return {
                    type: ActionTypes.DELETECASHDWFS,
                    
                }
            },
            function(err) {
                // error
            }
        )
    }
}

export function cashTransferEnquiryFS(params) {
    let p = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        valuedate : "",
        creatorDepartmentID : ""
    }

    p = Object.assign(p, params)
    console.log(p)
    return dispatch => {
        api.post("cashTransferEnquiry", p, dispatch, 
            function(res) {
                // success
               
                if(!res) {
                    return {
                        type: 0
                    }
                }
                console.log(res)
                return {
                    type: ActionTypes.CASHTRANSFERENQUIRYFS,
                    
                }
            },
            function(err) {
                // error
            }
        )
    }
}

export function cpCashDWenquiryFS(params) {
    let p = {
        clientID : "",
        tradingAccSeq : "",
        subAccountID : "",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        counterPartyAC : "005C0055558", // string
        tranDate : "",  // date  --> dd/MM/yyyy
        transactionID : "",
        status : ""
    }

    p = Object.assign(p, params)
    console.log(p)
    return dispatch => {
        api.post("cpCashDWenquiry", p, dispatch, 
            function(res) {
                // success
               
                if(!res) {
                    return {
                        type: 0
                    }
                }
                console.log(res)
                return {
                    type: ActionTypes.CPCASHDWENQUIRYFS,
                    
                }
            },
            function(err) {
                // error
            }
        )
    }
}