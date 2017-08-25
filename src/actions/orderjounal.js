import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const { ActionTypes } = require('../core/constants');

let count = 0;

export function getEnquiry(param, page) {
  console.log('Enquiry Action', param)
  return function (dispatch) {
    (api.post(ACTION.ENQUIRYORDER, param, dispatch, getEnquiryData))
  }
}
export function getEnquiryData(response) {
  console.log('Enquiry data', response)

  return {
    type: ActionTypes.ENQUIRYORDER,
    data: response
  }
}

export function getMsgCancelError(response) {
  console.log('Msg Enquiry data', response)
  if (response.mvReturnResult === "CancelOrderFail") {
    var json = {};
    var date = new Date()
    json.key = date.getTime();
    return function (dispatch) {
      (api.post(ACTION.HKSCANCELORDERFAIL, json, dispatch, getError))
    }
  }
  else {
    return {
      type: ActionTypes.NOTIFICATION,
      message: "Cancel success",
      notification_type: 0,
    }
  }
}

function getCancelError(response){
  
  return {
    type: ActionTypes.NOTIFICATION,
    message: response.cancelOrderFailBean.mvErrorMsg,
    notification_type: 1,
  }
}

export function onCancelSubmit(param) {
  var _selectedValue = [];
  for (var i = 0; i < param.length; i++) {
    var tmp = {};
    tmp.AfterServerVerification = "Y"
    tmp.BuySell = param[i].mvBSValue
    tmp.ORDERID = param[i].mvOrderID;
    tmp.ORDERGROUPID = param[i].mvOrderGroupID;
    tmp.StockCode = param[i].mvStockID;
    tmp.MarketID = param[i].mvMarketID;
    tmp.Price = param[i].mvPrice;
    tmp.Quantity = param[i].mvQtyValue;
    tmp.OSQty = param[i].mvOSQty.replace(/,/g, '');
    tmp.FILLEDQTY = param[i].mvFilledQty;
    tmp.OrderTypeValue = param[i].mvOrderTypeValue;
    tmp.GOODTILLDATE = param[i].mvGoodTillDate;
    tmp.StopTypeValue = param[i].mvStopTypeValue;
    tmp.StopPrice = param[i].mvStopPriceValue;
    tmp.mvAllorNothing = param[i].mvAllorNothing;
    tmp.SavePass = "N";
    tmp.PasswordConfirmation = "";
    tmp.mvOrderId = param[i].mvOrderID;
    tmp.mvMarketId = param[i].mvMarketID;
    tmp.mvStockId = param[i].mvStockID;
    tmp.mvInstrumentName = ""; //undefined
    tmp.mvPrice = param[i].mvPrice;
    tmp.mvQutityFormat = param[i].mvOSQty.replace(/,/g, '');
    tmp.mvFilledQty = param[i].mvFilledQty;
    tmp.mvOSQty = param[i].mvOSQty.replace(/,/g, '');
    tmp.mvOrderType = param[i].mvOrderTypeValue;
    tmp.mvGoodTillDate = param[i].mvGoodTillDate;
    tmp.password = "";
    tmp.mvSecurityCode = "";
    tmp.mvSeriNo = ""; //don't know
    tmp.mvAnswer = "";
    tmp.mvSaveAuthenticate = true; //hard code
    tmp.mvInputTime = param[i].mvModifiedTime;
    tmp.mvStatus = param[i].mvStatus;
    _selectedValue.push(tmp)
  }
  console.log(_selectedValue, "hello")
  
    return function (dispatch) {
      for (var i = 0; i < _selectedValue.length; i++) {
      (api.post(ACTION.HKSCANCELORDER, _selectedValue[i], dispatch, getMsgCancelError))
    }
  }
}
export function onModifySubmit(param, newPrice, newQty) {
  console.log("what you have", param, newPrice, newQty)
  var json = {};
  json.mvCurrencyId = param[0].mvCurrencyID;
  json.mvMaxLotPerOrder = "1"; //param.mvLotSize?
  json.mvOrigPrice = param[0].mvAvgPriceValue;
  json.mvOrigQty = param[0].mvOSQty.replace(/,/g, '');
  json.mvOrigStopPrice = "";
  json.mvStopPrice = ""; //param[0].mvStopPriceValue;
  json.mvOrigQtyValue = param[0].mvOSQtyValue;
  json.mvCancelQtyValue = param[0].mvOSQtyValue; //param[0].mvCancelQtyValue;
  json.mvAveragePrice = param[0].mvAvgPriceValue;
  json.mvAllOrNothing = param[0].mvAllorNothing;
  json.mvStopOrderType = param[0].mvStopTypeValue;
  json.mvValidityDate = ""; //(don't know)
  json.mvActivationDate = param[0].mvActivationDate;
  json.mvAllowOddLot = "N";
  json.mvRemark = param[0].mvRemark;
  json.mvContactPhone = param[0].mvContactPhone;
  json.mvGrossAmtValue = param[0].mvGrossAmt;
  json.mvNetAmtValue = param[0].mvNetAmtValue;
  json.mvSCRIP = param[0].mvSCRIP;
  json.mvIsPasswordSaved = "N";
  json.mvStopTypeValue = param[0].mvStopTypeValue;
  json.mvPasswordConfirmation = "N";
  json.mvOrderId = param[0].mvOrderID;
  json.mvGoodTillDate = param[0].mvGoodTillDate;
  json.mvBS = param[0].mvBSValue;
  json.mvOrderGroupId = param[0].mvOrderGroupID;
  json.mvOrderType = param[0].mvOrderTypeValue;
  json.mvFormIndexpage = "Y";
  json.mvStopValue = ""; //param[0].mvStopPriceValue
  json.mvFilledQty = param[0].mvFilledQty;
  json.mvLotSizeValue = param[0].mvLotSize;
  json.mvStopOrderExpiryDate = "";// param[0].mvStopOrderExpiryDate;
  json.OrderId = param[0].mvOrderID;
  json.mvMarketId = param[0].mvMarketID;
  json.mvStockId = param[0].mvStockID;
  json.mvStockName = param[0].mvStockName;
  json.mvPrice = param[0].mvCurrencyID;
  json.mvNewPrice = newPrice;
  json.mvQty = param[0].mvQtyValue;
  json.mvNewQty = newQty;
  json.OrderType = "Giới hạn"//param[0].mvOrderTypeValue;
  json.GoodTillDate = param[0].mvGoodTillDate;
  json.mvGrossAmt = param[0].mvCurrencyID + " $0.00";
  json.Password = ""
  json.mvSecurityCode = "";
  json.mvAnswer = "";
  json.mvStatus = param[0].mvStatus;
  json.mvSeriNo = "";
  json.mvSaveAuthenticate = false;
  console.log(json, "hello")
  return function (dispatch) {
    (api.post(ACTION.HKSMODIFYORDER, json, dispatch, getMsgModify))
  }
}

export function getMsgModify(response) {
  console.log('getModifyData', response)
  if (response.mvReturnResult === "ModifyOrderFail") {
    var json = {};
    var date = new Date()
    json.key = date.getTime();
    return function (dispatch) {
      (api.post(ACTION.HKSMODIFYORDERFAIL, json, dispatch, getError))
    }
  }
  else {
    return {
      type: ActionTypes.NOTIFICATION,
      message: "Modify success",
      notification_type: 0,
    }
  }
}

function getError(response) {
  console.log(response.modifyOrderFailBean.mvErrorMsg, "error")
  return {
    type: ActionTypes.NOTIFICATION,
    message: response.modifyOrderFailBean.mvErrorMsg,
    notification_type: 1,
  }
}

export function openPopup(menuid) {
  return {
    type: ActionTypes.OPENPOPUP,
    menuid,
  }
}