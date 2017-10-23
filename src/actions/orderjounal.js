import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import {showMessageBox, showFlashPopup} from './notification'

const { ActionTypes } = require('../core/constants');

let count = 0;

export function getEnquiry(param, page) {
    return function(dispatch) {
        (api.post(ACTION.ENQUIRYORDER, param, dispatch, function(response){
            return {
                type: ActionTypes.ENQUIRYORDER,
                data: response
            }
        }))
    }
}

export function genModifyOrder(param){
    return function(dispatch){
        api.post(ACTION.GENMODIFYORDER, param, dispatch, function(response){
            return {
                type: ActionTypes.GENMODIFYORDER,
                data: response
            }
        })
    }
}

export function onCancelSubmit(param, authParams, language) {
    var data = param.data
    var me = param.me
    var _params = []
    for (var i = 0; i < data.length; i++) {
        var agrs = {
            "AfterServerVerification" : 'Y',
            "BuySell" :  data[i].mvBSValue,
            "ORDERID" :  data[i].mvOrderID,
            "ORDERGROUPID" : data[i].mvOrderGroupID,
            "StockCode" : data[i].mvStockID,                                    
            "MarketID" : data[i].mvMarketID,
            "Price" : data[i].mvPrice,
            "Quantity" : data[i].mvQtyValue,
            "OSQty" : data[i].mvOSQty,
            "FILLEDQTY" : data[i].mvFilledQty,
            "OrderTypeValue" : data[i].mvOrderTypeValue,
            "GOODTILLDATE" : data[i].mvGoodTillDate,
            "StopTypeValue" : data[i].mvStopTypeValue,
            "StopPrice" : data[i].mvStopPriceValue,
            "mvAllorNothing" : data[i].mvAllorNothing,
            "SavePass" : "N",
            "PasswordConfirmation" : "", //Ext.getCmp('mvAnswer').getValue(),
            "mvOrderId" : data[i].mvOrderID,
            "mvMarketId" : data[i].mvMarketID,
            "mvStockId" : data[i].mvStockID,
            "mvInstrumentName" : '',
            "mvPrice" : data[i].mvPrice,
            "mvQutityFormat" : data[i].mvOSQty,
            "mvFilledQty" : data[i].mvFilledQty,
            "mvOSQty" : data[i].mvOSQty,
            "mvOrderType" : data[i].mvOrderTypeValue,                                   
            "mvGoodTillDate" : data[i].mvGoodTillDate,
            "password" : "",
            "mvSecurityCode" : "",

            'mvSeriNo': authParams.matrixKey01 + '|' + authParams.matrixKey02,
            'mvAnswer': authParams.matrixValue01 + '|' + authParams.matrixValue02,
            'mvSaveAuthenticate' : authParams.savedAuthen,

            "mvInputTime" : data[i].mvModifiedTime,
            "mvStatus" : data[i].mvStatus
        }

        _params.push(agrs)

    }



    var successHandler = function(response){
        if(response.returnCode != 0) { 
            // auth card matrix fail -> recreate card matrix serial number
        } else {                                        
            if(response.mvReturnResult == "success"){
                me.updateView()
                return function (dispatch) {
                    dispatch(showFlashPopup(language.messagebox.title.info, language.orderjournal.message.cancelSuccess))
                }

            }
            else if(response.mvReturnResult == "CancelOrderFail"){
                 return function(dispatch) {
                    api.post(ACTION.HKSCANCELORDERFAIL, {key: new Date().getTime()}, dispatch, 
                        function(response){
                            var msg = ''
                            if( response.mvCancelOrderFailBean.mvReasonMessage == "HKSERROR0006")
                            {
                                msg = language.messagebox.message.marketClose
                            }
                            else if(response.mvCancelOrderFailBean.mvReasonMessage == "HKSERROR0005"){
                                msg = language.messagebox.message.invalidTime_ATO      
                            }
                            
                            if( msg !== '') {
                                return function (dispatch) {
                                    dispatch(showFlashPopup(language.messagebox.title.info, msg))
                                }
                            } else {
                                return function (dispatch) {
                                    dispatch(showFlashPopup(language.messagebox.title.info, language.orderjournal.message.cancelFailed ))
                                }
                            }
                        }
                        , function(err){
                            // handle error while fetching
                        }
                    )
                } 


            }
        }
    }

    return function(dispatch) {
        for (var i = 0; i < _params.length; i++) {
            api.post(ACTION.HKSCANCELORDER, _params[i], dispatch, successHandler)
        }
    }
}
export function onModifySubmit(param, newPrice, newQty, authParams, language, me) {
    var agrs = {
        "mvCurrencyId": param.mvCurrencyId,
        "mvMaxLotPerOrder" : param.mvMaxLotPerOrder,
        "mvOrigPrice" : param.mvPrice,
        "mvOrigQty": param.mvOrigQtyValue,
        "mvOrigStopPrice": '',
        "mvStopPrice": '',
        "mvOrigPriceValue": param.mvOrigPriceValue,
        "mvOrigQtyValue" : param.mvOrigQtyValue,
        "mvCancelQtyValue": param.mvCancelQtyValue,
        "mvAveragePrice": param.mvAveragePrice,
        "mvAllOrNothing": param.mvAllOrNothing,
        "mvStopOrderType":  param.mvStopTypeValue,
        "mvValidityDate": param.mvValidityDate === 'null' ? "" : param.mvValidityDate,
        "mvActivationDate": param.mvActivationDate,
        "mvAllowOddLot": param.mvAllowOddLot,
        "mvRemark": param.mvRemark,
        "mvContactPhone": param.mvContactPhone,
        "mvGrossAmtValue": param.mvGrossAmtValue,
        "mvNetAmtValue": param.mvNetAmtValue,
        "mvSCRIP": param.mvSCRIP,
        "mvIsPasswordSaved": param.mvIsPasswordSaved,
        "mvStopTypeValue": 'N',
        "mvPasswordConfirmation": param.mvPasswordConfirmation,
        "mvOrderId": param.mvOrderIdValue,
        "mvGoodTillDate": param.mvGoodTillDateValue,
        "mvBS": param.mvBSValue,
        "mvOrderGroupId": param.mvOrderGroupId,
        "mvOrderType": param.mvOrderTypeValue,
        "mvFormIndexpage": 'Y',
        "mvStopValue": param.mvStopPriceValue === null ? "" : param.mvStopPriceValue,
        "mvFilledQty": param.mvFilledQty,
        "mvLotSizeValue": param.mvLotSizeValue,                            
        "mvStopOrderExpiryDate": '',
        "OrderId": param.mvOrderId,
        "mvMarketId": param.mvMarketId,
        "mvStockId": param.mvStockId,
        "mvStockName": param.mvInstrumentName,
        "mvPrice": param.mvCurrencyId,
        "mvNewPrice": newPrice,
        "mvQty": param.mvOrigQtyValue,
        "mvNewQty": newQty,
        "OrderType": 'Limit',
        "GoodTillDate": param.mvGoodTillDate,
        "mvGrossAmt": param.mvCurrencyId+" $0.00",
        "Password": '',
        "mvSecurityCode": '',
        "mvStatus": param.mvStatus,

        'mvSeriNo': authParams.matrixKey01 + '|' + authParams.matrixKey02,
        'mvAnswer': authParams.matrixValue01 + '|' + authParams.matrixValue02,
        'mvSaveAuthenticate' : authParams.savedAuthen
    }
    console.log(me)      
    var successHandler = function(response){
        if(response.returnCode != 0) {

            // auth card matrix fail -> recreate card matrix serial number

            // Ext.Msg.alert(OrsEntrustAuthenMsg.message.error, OrsEntrustAuthenMsg.message.returnError[mvJSON.returnCode]);
            // cmdOk.disabled = false;
            // serial1 = TTLUtils.createAuthenCardString();
            // serial2 = TTLUtils.createAuthenCardString();
                    
            // newModifySerialNo = serial1 + "|" + serial2;
                    
            // seriNo1.innerHTML = '<b>['+ serial1.split('|')[0] +']</b>';
            // seriNo2.innerHTML = '<b>['+ serial2.split('|')[0] +']</b>';
                    
            // answerNo1.setValue("");
            // answerNo2.setValue("");

            return (dispatch) => {
                dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.returnError[response.returnCode]))
            }
                    
        } else {       
            //console.log(language)                                 
            if(response.mvReturnResult == "success"){
                // modify success
                me.updateView()
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.info, language.orderjournal.message.modifySucces))
                }
                
            }else if(response.mvReturnResult == "ModifyOrderFail"){
                // modify fail
                return function(dispatch) {
                    dispatch(getModifyOrderFailInfo(language))
                }
                
            }
        }
    }

    var failHandler = function(err){
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, err))
        }
    }

    return function(dispatch) {
        api.post(ACTION.HKSMODIFYORDER, agrs, dispatch, successHandler, failHandler)
    }
}

function getModifyOrderFailInfo(language){ 
    return function(dispatch) {
        api.post(ACTION.HKSMODIFYORDERFAIL, {key: new Date().getTime()}, dispatch, 
            function(response){
                //console.log(response, language)
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, response.modifyOrderFailBean.mvErrorMsg))
                }
            }
        )
    }    
}
