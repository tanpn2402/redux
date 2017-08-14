const {ActionTypes} = require('../core/constants');

const data = {"mvCurrentPage":0,"mvEnableGridHeadMenu":false,"mvMessage":null,"mvOrderBeanList":[{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"125137309","mvBankID":"ACB","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INR","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"11:23:03","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:45:07","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":0,"mvOrderGroupID":"10016571","mvOrderID":"10019056","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"Y","mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"125137309","mvBankID":"ACB","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INR","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"10:54:35","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:46:59","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":1,"mvOrderGroupID":"10016570","mvOrderID":"10019055","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"Y","mvShowModifyIcon":"Y","mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"11:14:14","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:56:12","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":2,"mvOrderGroupID":"10016569","mvOrderID":"10019054","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"N","mvShowModifyIcon":"Y","mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"23.0000","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"50","mvCancelQtyValue":"50","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"17:47:32","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:57:04","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":3,"mvOrderGroupID":"10016567","mvOrderID":"10019052","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"23.000","mvPriceValue":"23.0000","mvQty":"50","mvQtyValue":"50","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":null,"mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"23.0000","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"50","mvCancelQtyValue":"50","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"17:36:11","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:57:16","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":4,"mvOrderGroupID":"10016566","mvOrderID":"10019051","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"23.000","mvPriceValue":"23.0000","mvQty":"50","mvQtyValue":"50","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":null,"mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null}],"mvOrderListSize":"5","mvOrderStatusList":[{"mvID":null,"mvOptionDisplay":"Chọn","mvOptionValue":"NONE"},{"mvID":null,"mvOptionDisplay":"ALL","mvOptionValue":"ALL"},{"mvID":null,"mvOptionDisplay":"Khớp toàn bộ","mvOptionValue":"FULLYFILLED"},{"mvID":null,"mvOptionDisplay":"Chờ khớp","mvOptionValue":"QUEUE"},{"mvID":null,"mvOptionDisplay":"Khớp một phần","mvOptionValue":"PARTIALLYFILL"},{"mvID":null,"mvOptionDisplay":"Không hợp lệ","mvOptionValue":"REJECTED"},{"mvID":null,"mvOptionDisplay":"Đã huỷ","mvOptionValue":"CANCELLED"},{"mvID":null,"mvOptionDisplay":"Chờ xử lý","mvOptionValue":"READYTOSEND"},{"mvID":null,"mvOptionDisplay":"Đang gửi","mvOptionValue":"SENDING"},{"mvID":null,"mvOptionDisplay":"Chờ xác nhận","mvOptionValue":"PENDINGAPPROVAL"},{"mvID":null,"mvOptionDisplay":"Lệnh điều kiện","mvOptionValue":"STOP"},{"mvID":null,"mvOptionDisplay":"Chờ huỷ","mvOptionValue":"WAITINGCANCEL"},{"mvID":null,"mvOptionDisplay":"Chờ sửa","mvOptionValue":"WAITINGMODIFY"},{"mvID":null,"mvOptionDisplay":"Không hiệu lực","mvOptionValue":"INACTIVE"},{"mvID":null,"mvOptionDisplay":"Hết hiệu lực","mvOptionValue":"EXPIRED"}],"mvPage":{"nextPage":1,"pageIndex":2,"pageNumbers":null,"pageRecords":null,"pageSize":20,"prePage":1,"totalPage":9,"totalRec":0},"mvResult":null,"mvTotalOrders":5,"mvTotalTaxFee":"0.0","svDefaultMarket":"HO","svEnableMultiMarket":true}

const modify = {"mvGenModifyOrderBean":{"ceiling":"9.300","floor":"7.700","mvActivationDate":"2015-12-10","mvAllOrNothing":"N","mvAllowOddLot":"N","mvAonDisable":"N","mvAtauctionOrder":"false","mvAveragePrice":"9.3000","mvBSValue":"B","mvBaseNetAmtValue":"1860.000","mvBuyOrSell":"Buy","mvCancelQtyValue":"200","mvContactPhone":"","mvCurrencyId":"VND","mvDisableModifyQty":"Y","mvDisableModifyQtyHiddenField":"N","mvFilledQty":"0","mvGoodTillDate":"-","mvGoodTillDateDisable":"N","mvGoodTillDateValue":"","mvGoodTillDescription":"Lot Size","mvGrossAmtValue":"1860.000","mvInstrumentName":"Ngân hàng TMCP Sài Gòn - Hà Nội","mvIsDisplayCurrencyWarning":"N","mvIsFromPreviousErrorPage":"Y","mvIsPasswordSaved":"N","mvLotSizeValue":"100","mvMarketId":"HA","mvMaxLotPerOrder":"1","mvModifyOrderFor":"VNS","mvMultiMarketDisable":"Y","mvNetAmtValue":"1862.790","mvNewPrice":"9.300","mvNewQty":"2001","mvOrderGroupId":"10016584","mvOrderId":"10016584","mvOrderIdValue":"10019082","mvOrderType":"Limit","mvOrderTypeDescription":"List of available Order Type","mvOrderTypeValue":"L","mvOrigPriceValue":"{price}","mvOrigQtyValue":"200","mvOriginalQuantity":"200","mvPasswordConfirmation":"N","mvPrice":"9.3","mvPriceValue":null,"mvQty":null,"mvQuantityDescription":"quantityDescription","mvRemark":"","mvSCRIP":"N","mvSCodeEnableForOrdersModify":"false","mvSecurityCodeEnable":"false","mvStatus":"NEW","mvStockId":"SHB","mvStockName":null,"mvStopOrderExpiryDate":"","mvStopPrice":"0.0000","mvStopPriceValue":null,"mvStopTypeValue":"N","mvTriggerDisable":"N","mvValidityDate":""},"mvResult":null,"mvReturnResult":"success"}



export function enquiryOrder(param, reload) {
  console.log('enquiryOrder Action, BS = ', param['mvBuysell'])
  const data = {"mvCurrentPage":0,"mvEnableGridHeadMenu":false,"mvMessage":null,"mvOrderBeanList":[{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"125137309","mvBankID":"ACB","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INR","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"11:23:03","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:45:07","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":0,"mvOrderGroupID":"10016571","mvOrderID":"10019056","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"Y","mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Bán","mvBSValue":"S","mvBankACID":"125137309","mvBankID":"ACB","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INR","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"10:54:35","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:46:59","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":1,"mvOrderGroupID":"10016570","mvOrderID":"10019055","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"Y","mvShowModifyIcon":"Y","mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"22.2500","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"10","mvCancelQtyValue":"10","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"11:14:14","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:56:12","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":2,"mvOrderGroupID":"10016569","mvOrderID":"10019054","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"22.250","mvPriceValue":"22.2500","mvQty":"10","mvQtyValue":"10","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":"N","mvShowModifyIcon":"Y","mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"23.0000","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"50","mvCancelQtyValue":"50","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"17:47:32","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:57:04","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":3,"mvOrderGroupID":"10016567","mvOrderID":"10019052","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"23.000","mvPriceValue":"23.0000","mvQty":"50","mvQtyValue":"50","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":null,"mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null},{"matchedDate":null,"mvAON":null,"mvAction":null,"mvActivationDate":"2015-12-10","mvAllorNothing":"N","mvApprovalReason":null,"mvApprovalRemark":null,"mvApprovalTime":null,"mvAvgPrice":"0.000","mvAvgPriceValue":"23.0000","mvBS":"Mua","mvBSValue":"B","mvBankACID":"","mvBankID":"","mvBranchID":null,"mvBrokerID":null,"mvCancelIcon":null,"mvCancelQty":"50","mvCancelQtyValue":"50","mvChannelID":"INT","mvClientID":"C086378","mvClientRemarks":null,"mvContactPhone":"","mvCreateTime":null,"mvCurrencyID":"VND","mvDNSeq":null,"mvDateTime":null,"mvEntityID":null,"mvExceededAmt":null,"mvFilledPrice":null,"mvFilledQty":"0","mvGoodTillDate":"","mvGrossAmt":"0.000","mvHedge":null,"mvHoldConfirmQty":null,"mvHostId":null,"mvInActive":null,"mvInputTime":"17:36:11","mvInstrumentId":null,"mvInstrumentShortName":null,"mvInvestorClassId":null,"mvInvestorGroupId":null,"mvIsManualTrade":null,"mvIsOddLot":null,"mvIsPostExecutedOrder":null,"mvIsPriceWarningResubmit":null,"mvIsReleased":null,"mvLastModifiedUserId":null,"mvLastTradeTime":null,"mvLotSize":10,"mvMarketID":"HO","mvModifiedDate":null,"mvModifiedDateTime":null,"mvModifiedTime":"14:57:16","mvModifyIcon":null,"mvModifyOrderID":null,"mvNetAmt":"0.000","mvNetAmtValue":"0.000","mvNotifiedFlag":null,"mvOSQty":"0","mvOSQtyValue":"0","mvOgackTime":null,"mvOrderBeanID":4,"mvOrderGroupID":"10016566","mvOrderID":"10019051","mvOrderType":"Thường","mvOrderTypeValue":"L","mvOrigin":null,"mvPendAction":null,"mvPendingPrice":"0.000","mvPendingQty":"0","mvPrevtradeConsideration":null,"mvPrice":"23.000","mvPriceValue":"23.0000","mvQty":"50","mvQtyValue":"50","mvRejectReason":"","mvRejectReasonDetail":null,"mvRemark":"","mvRepOrterGroupId":null,"mvReporTackTime":null,"mvReporTime":null,"mvSCRIP":"N","mvShortName":null,"mvShortsell":null,"mvShowCancelIcon":null,"mvShowModifyIcon":null,"mvStatus":"CAN","mvStatusInternal":null,"mvStatusTarget":"CAN","mvStatus_Internal":null,"mvStockID":"SSI","mvStockName":"CT CP CHUNG KHOAN SAI GON","mvStopOrderExpiryDate":null,"mvStopOrderType":"Không","mvStopPrice":"Không","mvStopPriceValue":"0.0000","mvStopTriggerTime":null,"mvStopType":"STN","mvStopTypeValue":"N","mvSupervisorId":null,"mvSupervisorrejected":null,"mvTradeConsideration":null,"mvTradeTime":null,"mvUserID":null,"mvValidityDate":null,"price":null,"stockCode":null,"stockName":null}],"mvOrderListSize":"5","mvOrderStatusList":[{"mvID":null,"mvOptionDisplay":"Chọn","mvOptionValue":"NONE"},{"mvID":null,"mvOptionDisplay":"ALL","mvOptionValue":"ALL"},{"mvID":null,"mvOptionDisplay":"Khớp toàn bộ","mvOptionValue":"FULLYFILLED"},{"mvID":null,"mvOptionDisplay":"Chờ khớp","mvOptionValue":"QUEUE"},{"mvID":null,"mvOptionDisplay":"Khớp một phần","mvOptionValue":"PARTIALLYFILL"},{"mvID":null,"mvOptionDisplay":"Không hợp lệ","mvOptionValue":"REJECTED"},{"mvID":null,"mvOptionDisplay":"Đã huỷ","mvOptionValue":"CANCELLED"},{"mvID":null,"mvOptionDisplay":"Chờ xử lý","mvOptionValue":"READYTOSEND"},{"mvID":null,"mvOptionDisplay":"Đang gửi","mvOptionValue":"SENDING"},{"mvID":null,"mvOptionDisplay":"Chờ xác nhận","mvOptionValue":"PENDINGAPPROVAL"},{"mvID":null,"mvOptionDisplay":"Lệnh điều kiện","mvOptionValue":"STOP"},{"mvID":null,"mvOptionDisplay":"Chờ huỷ","mvOptionValue":"WAITINGCANCEL"},{"mvID":null,"mvOptionDisplay":"Chờ sửa","mvOptionValue":"WAITINGMODIFY"},{"mvID":null,"mvOptionDisplay":"Không hiệu lực","mvOptionValue":"INACTIVE"},{"mvID":null,"mvOptionDisplay":"Hết hiệu lực","mvOptionValue":"EXPIRED"}],"mvPage":{"nextPage":1,"pageIndex":1,"pageNumbers":null,"pageRecords":null,"pageSize":20,"prePage":1,"totalPage":1,"totalRec":0},"mvResult":null,"mvTotalOrders":5,"mvTotalTaxFee":"0.0","svDefaultMarket":"HO","svEnableMultiMarket":true}

  var d = data;
  var k = data.mvOrderBeanList
  console.log(k)
  var x = k.filter(el => el['mvBSValue'] === param['mvBuysell'] || param['mvBuysell'] === 'ALL')
  console.log(x)
  d.mvOrderBeanList = x
    return {
      type: ActionTypes.ENQUIRYORDER,
      data: d,
      reload: reload
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
  var respone=modify
  respone.mvGenModifyOrderBean.mvNewPrice=param.mvPrice,
  respone.mvGenModifyOrderBean.mvNewQty=param.mvQty
    return {
      type: ActionTypes.MODIFYSUBMIT,
      updateRow: respone
    }
}
export function getModifyData() {
  return {
    type: ActionTypes.GETMODIFYDATA,
    modifyData: modify.mvGenModifyOrderBean
  }
}