const {ActionTypes} = require('../core/constants');

const list = {"mvIsEnableMultiMarket":true,"mvResult":null,"stockSearchList":[{"lotSize":"100","mvMarketID":"HA","stockCode":"ACB","stockName":"Ngân hàng Thương mại Cổ phần Á Châu"},{"lotSize":"100","mvMarketID":"HA","stockCode":"ADC","stockName":"CTCP Mỹ Thuật và Truyền Thông"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AGC","stockName":"Công ty cổ phần cà phê An Giang"},{"lotSize":"100","mvMarketID":"HA","stockCode":"ALT","stockName":"Công ty Cổ phần Văn hoá Tân Bình"},{"lotSize":"100","mvMarketID":"HA","stockCode":"ALV","stockName":"ALV - Cổ phiếu CTCP Khoáng sản Vinas A Lưới"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AMC","stockName":"Khoáng sản Á Châu"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AME","stockName":"AME - CTCP Alphanam Cơ Điện"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AMV","stockName":"CTCP Sản xuất kinh doanh dược và Thiết bị y tế Việt Mỹ"},{"lotSize":"100","mvMarketID":"HA","stockCode":"APG","stockName":"CTCP Chứng khoán An Phát"},{"lotSize":"100","mvMarketID":"HA","stockCode":"APP","stockName":"APP - CTCP Phát triển Phụ gia và Sản phẩm Dầu mỏ"},{"lotSize":"100","mvMarketID":"HA","stockCode":"APS","stockName":"CTCP Chứng khoán Châu Á - Thái Bình Dương"}]}
const data = {"mvCurrentPage":0,"mvEnableGridHeadMenu":false,"mvMessage":null,"mvOrderBeanList":[{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"125137309","mvBankID":"ACB","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INR","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"11:23:03","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:45:07","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":0,"mvOrderGroupID":"10016571","mvOrderID":"10019056","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"Y","mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"125137309","mvBankID":"ACB","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INR","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"10:54:35","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:46:59","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":1,"mvOrderGroupID":"10016570","mvOrderID":"10019055","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"Y","mvShowModifyIcon":"Y","mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"11:14:14","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:56:12","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":2,"mvOrderGroupID":"10016569","mvOrderID":"10019054","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"N","mvShowModifyIcon":"Y","mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"23.0000","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"50","mvCancelQtyValue":"50","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"17:47:32","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:57:04","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":3,"mvOrderGroupID":"10016567","mvOrderID":"10019052","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"23.000","mvPriceValue":"23.0000","mvQty":"50","mvQtyValue":"50","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":null,"mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"23.0000","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"50","mvCancelQtyValue":"50","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"17:36:11","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:57:16","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":4,"mvOrderGroupID":"10016566","mvOrderID":"10019051","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"23.000","mvPriceValue":"23.0000","mvQty":"50","mvQtyValue":"50","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":null,"mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null}],"mvOrderListSize":"5","mvOrderStatusList":[{"mvID":null,"mvOptionDisplay":"Chọn","mvOptionValue":"NONE"},{"mvID":null,"mvOptionDisplay":"ALL","mvOptionValue":"ALL"},{"mvID":null,"mvOptionDisplay":"Khớp toàn bộ","mvOptionValue":"FULLYFILLED"},{"mvID":null,"mvOptionDisplay":"Chờ khớp","mvOptionValue":"QUEUE"},{"mvID":null,"mvOptionDisplay":"Khớp một phần","mvOptionValue":"PARTIALLYFILL"},{"mvID":null,"mvOptionDisplay":"Không hợp lệ","mvOptionValue":"REJECTED"},{"mvID":null,"mvOptionDisplay":"Đã huỷ","mvOptionValue":"CANCELLED"},{"mvID":null,"mvOptionDisplay":"Chờ xử lý","mvOptionValue":"READYTOSEND"},{"mvID":null,"mvOptionDisplay":"Đang gửi","mvOptionValue":"SENDING"},{"mvID":null,"mvOptionDisplay":"Chờ xác nhận","mvOptionValue":"PENDINGAPPROVAL"},{"mvID":null,"mvOptionDisplay":"Lệnh điều kiện","mvOptionValue":"STOP"},{"mvID":null,"mvOptionDisplay":"Chờ huỷ","mvOptionValue":"WAITINGCANCEL"},{"mvID":null,"mvOptionDisplay":"Chờ sửa","mvOptionValue":"WAITINGMODIFY"},{"mvID":null,"mvOptionDisplay":"Không hiệu lực","mvOptionValue":"INACTIVE"},{"mvID":null,"mvOptionDisplay":"Hết hiệu lực","mvOptionValue":"EXPIRED"}],"mvPage":{"nextPage":1,"pageIndex":1,"pageNumbers":null,"pageRecords":null,"pageSize":20,"prePage":1,"totalPage":1,"totalRec":0},"mvResult":null,"mvTotalOrders":5,"mvTotalTaxFee":"0.0","svDefaultMarket":"HO","svEnableMultiMarket":true}
export function stockSearch(language) {
  console.log('stockSearch Action')
    return {
      type: ActionTypes.STOCKSEARCH,
      stockList: list,
      language,
    }
}

export function enquiryOrder(param) {
  console.log('enquiryOrder Action', param['mvBuysell'])
  var d = data;
  var x = d.mvOrderBeanList.filter(el => el['mvBSValue'] === param['mvBuysell'])
  console.log(x)
  d.mvOrderBeanList = x
    return {
      type: ActionTypes.ENQUIRYORDER,
      data: d,
      stockList: list,
      reload: true
    }
}

export function cancelOrder(param) {
  console.log('cancelOrder Action')
    return {
      type: ActionTypes.CANELORDER,
      data: data,
    }
}

export function onCancelSubmit(param) {
  var _selectedValue=[];
  for(var i=0;i<param.length;i++){
    var tmp={};
    tmp.mvBS=param[i].mvBS;
    tmp.mvOrderID=param[i].mvOrderID;
    tmp.mvOrderGroupID=param[i].mvOrderGroupID;
    // tmp.mvInstrumentId=param[i].mvInstrumentId;
    // tmp.mvMarketID=param[i].mvMarketID;
    // tmp.mvPrice=param[i].mvPrice;
    // tmp.mvQty=param[i].mvQty;
    // tmp.mvOrderType=param[i].mvOrderType;
    // tmp.mvGoodTillDate=param[i].mvGoodTillDate;
    // tmp.mvFilledQty=param[i].mvFilledQty;
    // tmp.mvOSQty=param[i].mvOSQty;
    _selectedValue.push(tmp)
  }
  console.log(_selectedValue)
    return {
      type: ActionTypes.CANCELSUBMIT,
      selectedRows: _selectedValue
    }
}
export function onModifySubmit(param) {
    var tmp={};
    tmp.mvStockID=param[0].mvStockID;
    tmp.mvPrice=param[0].mvPrice;
    tmp.mvQty=param[0].mvQty;
    tmp.mvPendingQty=param[0].mvPendingQty;
    return {
      type: ActionTypes.MODIFYSUBMIT,
      updateRow: tmp
    }
}