import config from "../core/config";
import * as fetch from "../api/fetch";
const { ActionTypes } = require('../core/constants');


const initialState = {

  orderList: [],
  totalOrder: 0,

  genmodifyorder: {
    mvGenModifyOrderBean: {},
    mvReturnResult: "",
    mvResult: null
  },

  updateOrderJournal: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENQUIRYORDER:

      let list = action.data.mvOrderBeanList === null ? [] : action.data.mvOrderBeanList
      list = list.concat(state.orderList)
      action.data.mvOrderBeanList = list
      
      return Object.assign({}, state, {
        orderList: list,
        totalOrder: action.data.mvTotalOrders
      });

    case ActionTypes.ORDERENQUIRYFS:

      let list1 = action.data.concat(state.orderList)

      return Object.assign({}, state, {
        orderList: list1,
        totalOrder: action.data.length + state.totalOrder
      })
    case ActionTypes.RESETENQUIRYORDERDATA:
      return Object.assign({}, state, {
        orderList: [],
        totalOrder: 0
      })

    case ActionTypes.GENMODIFYORDER:
      return Object.assign({}, state, {
        genmodifyorder: action.data
      });

    case ActionTypes.UPDATEORDERJOURNAL:
      return Object.assign({}, state, updateOrderJournal(state, action))

    default:
      return state;
  }
};


function updateOrderJournal(state, action) {
  let {orderList, totalOrder, updateOrderJournal} = state
  let {data, list} = action

  let tmp = orderList.filter(e => e.mvOrderGroupID == data.orderGroupID)

  if(tmp.length > 0) {
    let a = tmp[0]

    Object.assign(a, {

      // matchedDate: data. ,
      // mvAON: data.aon ,
      // mvAccountSeq: data. ,
      // mvAction: data. ,
      // mvActivationDate: data.activationDate ,
      // mvAllorNothing: data.allorNothing ,
      // mvApprovalReason: data.approvalReason ,
      // mvApprovalRemark: data.approvalRemark ,
      // mvApprovalTime: data.approvalTime ,
      // mvAvgPrice: data.avgPrice ,
      // mvAvgPriceValue: data.avgPrice ,
      // mvBS: data.bs ,
      // mvBSValue: data.bs ,
      // mvBankACID: data.mvBankACID ,
      // mvBankID: data.mvBankID,
      // mvBranchID: data.branchID ,
      // mvBrokerID: data.brokerID ,
      // mvCancelIcon: data. ,
      // mvCancelQty: data.cancelQty ,
      // mvCancelQtyValue: data.cancelQty ,
      // mvChannelID: data.channelID ,
      // mvClientID: data.clientID ,
      // mvClientRemarks: data.clientRemarks ,
      // mvContactPhone: data.contactPhone ,
      // mvCreateTime: data.createTime ,
      // mvCurrencyID: data.currencyID ,
      // mvDNSeq: data.dnseq ,
      // mvDateTime: data.mvDateTime ,
      // mvEntityID: data.entityID ,
      // mvExceededAmt: data.exceededAmt ,
      // mvFilledPrice: data.price ,
      // mvFilledQty: data.filledQty ,
      // mvGoodTillDate: data.goodTillDate ,
      // mvGrossAmt: data.grossAmt ,
      // mvHedge: data.hedge ,
      // mvHoldConfirmQty: data.holdConfirmQty ,
      // mvHostId: data.hostId ,
      // mvInActive: data.inActive ,
      // mvInputTime: data.inputTime ,
      // mvInstrumentId: data.instrumentId ,
      // mvInstrumentShortName: data.instrumentShortName ,
      // mvInvestorClassId: data.investorClassId ,
      // mvInvestorGroupId: data.investorGroupId ,
      // mvIsManualTrade: data.isManualTrade ,
      // mvIsOddLot: data.isOddLot ,
      // mvIsPostExecutedOrder: data.isPostExecutedOrder ,
      // mvIsPriceWarningResubmit: data.isPriceWarningResubmit ,
      // mvIsReleased: data.isReleased ,
      // mvLastModifiedUserId: data.lastModifiedUserId ,
      // mvLastTradeTime: data.lastTradeTime ,
      // mvLotSize: data. ,
      // mvMarketID: data.marketID ,
      mvModifiedDate: data.modifiedDate ,
      mvModifiedDateTime: data.modifiedDateTime ,
      mvModifiedTime: data.modifiedTime ,
      // mvModifyIcon: data. ,
      mvModifyOrderID: data.mofifyOrderID ,
      // mvNetAmt: data.netAmt ,
      // mvNetAmtValue: data.netAmt ,
      // mvNotifiedFlag: data.notifiedFlag ,
      // mvOSQty: data.osqty ,
      // mvOSQtyValue: data.osqty ,
      // mvOgackTime: data.ogackTime ,
      // mvOrderBeanID: data. ,
      mvOrderGroupID: data.orderGroupID ,
      mvOrderID: data.orderID ,
      // mvOrderType: data.orderType ,
      // mvOrderTypeValue: data.orderType ,
      // mvOrigin: data.origin ,
      // mvPendAction: data.pendAction ,
      // mvPendingPrice: data.pendingPrice ,
      // mvPendingQty: data.pendingQty ,
      // mvPrevtradeConsideration: data.prevtradeConsideration ,
      mvPrice: data.price ,
      mvPriceValue: data.price ,
      mvQty: data.qty ,
      mvQtyValue: data.qty ,
      // mvRejectReason: data.rejectReason ,
      // mvRejectReasonDetail: data.rejectReason ,
      // mvRemark: data.remark ,
      // mvRepOrterGroupId: data.repOrterGroupId ,
      // mvReporTackTime: data.reporTackTime ,
      // mvReporTime: data.reporTime ,
      // mvSCRIP: data.scrip ,
      // mvShortName: data.shortName ,
      // mvShortsell: data.shortsell ,
      mvShowCancelIcon: data.status == "CAN" ? "N" : "Y" ,
      mvShowModifyIcon: data.status == "CAN" ? "N" : "Y" ,
      mvStatus: data.status ,
      // mvStockID: data.stockID ,
      // mvStockName: data.stockID ,
      // mvStopOrderExpiryDate: data.stopOrderExpDate ,
      // mvStopOrderType: data.stopOrderType ,
      // mvStopPrice: data.stopPrice ,
      // mvStopPriceValue: data.stopPrice ,
      // mvStopTriggerTime: data.stopTriggerTime ,
      // mvStopType: data.stopOrderType ,
      // mvStopTypeValue: data.stopOrderType ,
      // mvSubAccountID: data.clientID ,
      // mvSupervisorId: data.supervisorId ,
      // mvSupervisorrejected: data.supervisorrejected ,
      // mvTradeConsideration: data.tradeConsideration ,
      // mvTradeTime: data.tradeTime ,
      // mvUserID: data.userID ,
      // mvValidityDate: data.validityDate ,
      price: data.price ,
      // stockCode: data.stockID ,
      // stockName: data.stockID ,
    })

    return {
      updateOrderJournal: !updateOrderJournal,
      orderList: orderList
    }
  } else {
    

    let params = {
        clientID : localStorage.getItem("clientFSID") + "8",
        tradingAccSeq: parseInt(1),
        subAccountID: localStorage.getItem("clientFSID") + "8",
        version : "",
        language : "",
        sessionID : "",
        deviceID : "",
        osVersion : "",
        Status : "",   
    }


        if(list.length > 0) {
          let bla = list.map(e => {
            let orderGroupID = e.orderInfo.orderGroupId
            let tmp1 = orderList.filter(e => e.mvOrderGroupID == orderGroupID)
            if(tmp1.length > 0) {

            } else {
              return e
            }
          })

          bla = bla.filter(e => e != undefined)

          let data = bla.map(e => {
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
                "mvClientID": localStorage.getItem("clientFSID") + "8",
                "mvSubAccountID": localStorage.getItem("clientFSID") + "8",
                "mvAccountSeq": 1,
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

          let t = data.concat(orderList)
          console.log(t)
          return {
            updateOrderJournal: !updateOrderJournal,
            orderList: t
          }

        }
        // tmp.unshift({
        //   // matchedDate: data. ,
        //   mvAON: data.aon ,
        //   // mvAccountSeq: data. ,
        //   // mvAction: data. ,
        //   mvActivationDate: data.activationDate ,
        //   mvAllorNothing: data.allorNothing ,
        //   mvApprovalReason: data.approvalReason ,
        //   mvApprovalRemark: data.approvalRemark ,
        //   mvApprovalTime: data.approvalTime ,
        //   mvAvgPrice: data.avgPrice ,
        //   mvAvgPriceValue: data.avgPrice ,
        //   mvBS: data.bs ,
        //   mvBSValue: data.bs ,
        //   mvBankACID: data.mvBankACID ,
        //   mvBankID: data.mvBankID,
        //   mvBranchID: data.branchID ,
        //   mvBrokerID: data.brokerID ,
        //   // mvCancelIcon: data. ,
        //   mvCancelQty: data.cancelQty ,
        //   mvCancelQtyValue: data.cancelQty ,
        //   mvChannelID: data.channelID ,
        //   mvClientID: data.clientID ,
        //   mvClientRemarks: data.clientRemarks ,
        //   mvContactPhone: data.contactPhone ,
        //   mvCreateTime: data.createTime ,
        //   mvCurrencyID: data.currencyID ,
        //   mvDNSeq: data.dnseq ,
        //   mvDateTime: data.mvDateTime ,
        //   mvEntityID: data.entityID ,
        //   mvExceededAmt: data.exceededAmt ,
        //   mvFilledPrice: data.price ,
        //   mvFilledQty: data.filledQty ,
        //   mvGoodTillDate: data.goodTillDate ,
        //   mvGrossAmt: data.grossAmt ,
        //   mvHedge: data.hedge ,
        //   mvHoldConfirmQty: data.holdConfirmQty ,
        //   mvHostId: data.hostId ,
        //   mvInActive: data.inActive ,
        //   mvInputTime: data.inputTime ,
        //   mvInstrumentId: data.instrumentId ,
        //   mvInstrumentShortName: data.instrumentShortName ,
        //   mvInvestorClassId: data.investorClassId ,
        //   mvInvestorGroupId: data.investorGroupId ,
        //   mvIsManualTrade: data.isManualTrade ,
        //   mvIsOddLot: data.isOddLot ,
        //   mvIsPostExecutedOrder: data.isPostExecutedOrder ,
        //   mvIsPriceWarningResubmit: data.isPriceWarningResubmit ,
        //   mvIsReleased: data.isReleased ,
        //   mvLastModifiedUserId: data.lastModifiedUserId ,
        //   mvLastTradeTime: data.lastTradeTime ,
        //   // mvLotSize: data. ,
        //   mvMarketID: data.marketID ,
        //   mvModifiedDate: data.modifiedDate ,
        //   mvModifiedDateTime: data.modifiedDateTime ,
        //   mvModifiedTime: data.modifiedTime ,
        //   // mvModifyIcon: data. ,
        //   mvModifyOrderID: data.mofifyOrderID ,
        //   mvNetAmt: data.netAmt ,
        //   mvNetAmtValue: data.netAmt ,
        //   mvNotifiedFlag: data.notifiedFlag ,
        //   mvOSQty: data.osqty ,
        //   mvOSQtyValue: data.osqty ,
        //   mvOgackTime: data.ogackTime ,
        //   // mvOrderBeanID: data. ,
        //   mvOrderGroupID: data.orderGroupID ,
        //   mvOrderID: data.orderID ,
        //   mvOrderType: data.orderType ,
        //   mvOrderTypeValue: data.orderType ,
        //   mvOrigin: data.origin ,
        //   mvPendAction: data.pendAction ,
        //   mvPendingPrice: data.pendingPrice ,
        //   mvPendingQty: data.pendingQty ,
        //   mvPrevtradeConsideration: data.prevtradeConsideration ,
        //   mvPrice: data.price ,
        //   mvPriceValue: data.price ,
        //   mvQty: data.qty ,
        //   mvQtyValue: data.qty ,
        //   mvRejectReason: data.rejectReason ,
        //   mvRejectReasonDetail: data.rejectReason ,
        //   mvRemark: data.remark ,
        //   mvRepOrterGroupId: data.repOrterGroupId ,
        //   mvReporTackTime: data.reporTackTime ,
        //   mvReporTime: data.reporTime ,
        //   mvSCRIP: data.scrip ,
        //   mvShortName: data.shortName ,
        //   mvShortsell: data.shortsell ,
        //   mvShowCancelIcon: "Y" ,
        //   mvShowModifyIcon: "Y" ,
        //   mvStatus: data.status ,
        //   mvStockID: cache.symbol ,
        //   mvStockName:cache.symbol ,
        //   mvStopOrderExpiryDate: data.stopOrderExpDate ,
        //   mvStopOrderType: data.stopOrderType ,
        //   mvStopPrice: data.stopPrice ,
        //   mvStopPriceValue: data.stopPrice ,
        //   mvStopTriggerTime: data.stopTriggerTime ,
        //   mvStopType: data.stopOrderType ,
        //   mvStopTypeValue: data.stopOrderType ,
        //   mvSubAccountID: data.clientID ,
        //   mvSupervisorId: data.supervisorId ,
        //   mvSupervisorrejected: data.supervisorrejected ,
        //   mvTradeConsideration: data.tradeConsideration ,
        //   mvTradeTime: data.tradeTime ,
        //   mvUserID: data.userID ,
        //   mvValidityDate: data.validityDate ,
        //   price: data.price ,
        //   stockCode: cache.symbol ,
        //   stockName: cache.symbol ,
        // })    

        

      // delete cache
    
  }
}