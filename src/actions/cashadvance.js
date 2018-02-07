import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as Utils from '../utils'
import {showMessageBox} from './notification'
import {showPopup} from './popup'

const { ActionTypes } = require('../core/constants')

export function beforeSubmitCashAdvance(advPayment, mvAdvanceBean, language, theme, callback) {
    
    let advAvailable = Utils.numUnFormat(mvAdvanceBean.advAvailable) - Utils.numUnFormat(mvAdvanceBean.advPending)
    
    if(advPayment <= 0){
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.cashadvance.message.noamount))
        }
    }

    if(advAvailable < Utils.devideByCurrencyUnit(advPayment)){
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.cashadvance.message.insufficientfund))
        }
    }
    else{ 
        // var responseCheckAdvPaymentTime = function (response) {
          // var msg = response.mvResult
          var data={
            advancePayment: advPayment, 
            advanceAvailable: advAvailable,
            callback: callback
          }
          // if (msg.trim() == "") {
              return (dispatch) => {
              dispatch(showPopup({
                data: data,
                title: language.cashadvance.popup.title,
                language: language,
                theme: theme,
                id: 'cashadvance',
                authcard: false
              }))
            }
          // } else {
          //   return (dispatch) => {
          //     dispatch(showMessageBox(language.messagebox.title.error, msg.trim()))
          //   }
          // }
        // }
        // return (dispatch) => {
        //     WebApi.post(ACTION.CHECKADVANCEPAYMENTTIME, {}, dispatch, responseCheckAdvPaymentTime)
        // }
    }
}

export function submitCashAdvance(data, authParams, language){

  var responseSubmitCashAdvance = function(response){
    if(response){
        
        if(response.mvReturnCode != 0) {                     
          if(response.mvResult && response.mvResult.trim().length > 0){
            return(dispatch)=>{
              dispatch(showMessageBox(language.messagebox.title.error, response.mvResult))
            }
          } 
          else {
            return(dispatch)=>{
              dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.returnError[response.mvReturnCode]))
            }
          }
        }
        else {
          if (response.mvResult == "SUCCESS") {
            return(dispatch)=>{
              dispatch(showMessageBox(language.messagebox.title.info, language.cashadvance.message.advancePaymentSuccessful))
            }
          }
          else {
            return(dispatch)=>{
              dispatch(showMessageBox(language.messagebox.title.error, language.cashadvance.message.advancePaymentFailed))
            }
          }
          
        }
    }
    else{
        return(dispatch)=>{
          dispatch(showMessageBox(language.messagebox.title.error, language.cashadvance.message.advancePaymentFailed))
        }
    }
  }


  var advAmt = Utils.devideByCurrencyUnit(data.advancePayment)
  var advAvaible = Utils.currencyShowFormatter(data.advanceAvailable, ",", "vi-VN")
  var advRequest = data.advancePayment

  var params = {
    'lvAdvAvaiable' : advAvaible,
    'lvAdvRequest' : advRequest,
    'lvAmount' : advAmt,
    'mvSeriNo': /*authParams.mvSeriNo*/'[5,A]|[4,F]',
    'mvAnswer': /*authParams.mvAnswer*/'7|4',
    'mvSaveAuthenticate' : /*authParams.mvSaveAuthenticate*/'true',
    'key': (new Date()).getTime()
  }

  return(dispatch) => {
    WebApi.post(ACTION.SUBMITADVANCEPAYMENTCREATION, params, dispatch, responseSubmitCashAdvance)
  }
}

export function getCashAdvance (params) {
  return(dispatch) => {
    WebApi.get(ACTION.GETCASHADVANCEHISTORY, params, dispatch, CashAdvance)
  }
}

function CashAdvance (response) {
  return {
    type: ActionTypes.GETCASHADVANCEHISTORY,
    CashAdvanceHistory: response,
  }
}

export function getQuerySoldOrders (params) {
  return(dispatch) => {
    WebApi.get(ACTION.QUERYSOLDORDERS, params, dispatch, QuerySoldOrders)
  }
}

function QuerySoldOrders (response) {
  return {
    type: ActionTypes.QUERYSOLDORDERS,
    SoldOrders: response,
  }
}

export function getLocalAdvanceCreation (params) {
  return(dispatch) => {
    WebApi.get(ACTION.GETLOCALADVANCECREATION, params, dispatch, LocalAdvanceCreation)
  }
}

function LocalAdvanceCreation (response) {
  return {
    type: ActionTypes.GETLOCALADVANCECREATION,
    LocalAdvance: response,
  }
}



