import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as Utils from '../utils'
import {showMessageBox} from './notification'
import {showPopup} from './popup'

const {ActionTypes} = require('../core/constants')

// get data
export function getLocalRefundCreation(params) {
    var callback = function(response){
        return {
            type: ActionTypes.LOCALREFUND,
            localLoanRefundCreation: response,
        }
    }
    return (dispatch) => {
        api.get(ACTION.GETLOCALLOANREFUNDCREATION, params, dispatch, callback)
    }
}


// duplicate at cashadvance, action getLocalAdvanceCreation
export function getLocalAdvanceCreation(params) {
    var callback = function(response){
        return {
            type: ActionTypes.LOCALADVANCE,
            localAdvanceCreation: response,
        }
    }
    return (dispatch) => {
        api.get(ACTION.GETLOCALADVANCECREATION, params, dispatch, callback)
    }
}

export function getLoanRefundData(params) {
    var callback = function(response){
        return {
            type: ActionTypes.LOANREFUNDDATA,
            loanRefundData: response,
        }
    }
    return (dispatch) => {
        api.get(ACTION.GETLOANREFUNDDATA, params, dispatch, callback)
    }
}

export function getLoanRefundHistory(params) {
    var callback = function(response){
        return {
            type: ActionTypes.LOANREFUNDHISTORY,
            loanRefundHistory: response,
        }
    }
    return (dispatch) => {
        api.get(ACTION.GETLOANREFUNDHISTORY, params, dispatch, callback)
    }
}


// submit
export function beforeSubmitLoanRefund(params){
    var language = params.language
    var refundAmt = params.refundAmt
    var cashAvailable = params.cashAvailable

    if (refundAmt <= 0) {
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.noAmount))
        }
    }

    cashAvailable = parseFloat(cashAvailable)
    if (cashAvailable < Utils.devideByCurrencyUnit(refundAmt)) {
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.loanrefund.message.insufficientFund))
        }
    }
    else{
        var responseCheckAdvPaymentTime = function(response){
            var msg = response.mvResult
            /*if(msg && msg.trim().length > 0){
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, msg))
                }
            }
            else*/{
                return (dispatch) => {
                    dispatch(showPopup({
                        data: {},
                        title: language.loanrefund.popup.title.submitLoanRefund,
                        language: language,
                        id: 'loanrefund',
                        authcard: true
                    }))
                }
            }
        }
        return (dispatch) => {
            api.post(ACTION.CHECKADVANCEPAYMENTTIME, [], dispatch, responseCheckAdvPaymentTime)
        }
    }
}

export function doSubmitLoanRefund(params){
    var me = params.me
    var authParams = params.authParams
    var language = params.language
    var lang = 'vi-VN'
    var callback = function(response){
        if(response){
            
            if(response.mvReturnCode != 0) {											
                if(response.message && response.message.trim().length > 0){
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, eval(response.message)))
                    }
                } else {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.returnError[response.mvReturnCode]))
                    }
                }
            }else {
                if (response.mvResult == "SUCCESS") {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.info, language.loanrefund.message.loanRefundSuccessful))
                    }
                    
                    // reset data
                    // if(ComponentList.refundPanel){
                    //     ComponentList.refundPanel.getLoanData();
                    // }
                    
                    // if(ComponentList.LoanRefundStatus){
                    //     ComponentList.LoanRefundStatus.reloadData();
                    // }
                
                    me.txtRefundAmt.value = 0
                    me.txtRemark.value = 0
                    
                }
                else {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, language.loanrefund.message.loanRefundFailed))
                    }
                }
                
            }
        } 
    }

    var refundAmt = Utils.devideByCurrencyUnit(me.txtRefundAmt.value)
    var loancurAmt = parseFloat(Utils.toTTLCurrencyFormat(me.txtBeginLoan.value))
    var loanremain = Utils.currencyShowFormatter(loancurAmt - refundAmt, ",", lang)
    var loancur = me.txtBeginLoan.value.trim()
    var loanpay = me.txtRefundAmt.trim()
    
    var remark  = me.txtRemark.value.trim()


    var params = {
        'lvLoanRem' : loanremain,
        'lvLoanCur': loancur,
        'lvLoanPay': loanpay,
        'lvAmount' : refundAmt,
        'lvRemark' : remark,
        'mvSeriNo': authParams.mvSeriNo,
        'mvAnswer': authParams.mvAnswer,
        'mvSaveAuthenticate' : authParams.mvSaveAuthenticate,
        'key': (new Date()).getTime()
    }
}

export function beforeSubmitAdvance(params){
    let advPayment = params.advPayment
    let advAvailable = params.advAvailable
    advAvailable = parseFloat(Utils.toTTLCurrencyFormat(advAvailable))
    var language = params.language

   if(advPayment <= 0){
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.noAmount))
        }
    }
    //console.log(advAvailable, Utils.devideByCurrencyUnit(advPayment) )
    if(advAvailable < Utils.devideByCurrencyUnit(advPayment)){
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.cashadvance.message.insufficientfund))
        }
    }
    else{
        var responseCheckAdvPaymentTime = function(response){
            var msg = response.mvResult
            /*if(msg && msg.trim().length > 0){
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, msg))
                }
            }
            else*/{
                return (dispatch) => {
                    dispatch(showPopup({
                        data: {advancePayment: advPayment, advanceAvailable: advAvailable},
                        title: language.loanrefund.popup.title.submitAdvance,
                        language: language,
                        id: 'loanrefund',
                        authcard: true
                    }))
                }
            }
        }
        return (dispatch) => {
            api.post(ACTION.CHECKADVANCEPAYMENTTIME, [], dispatch, responseCheckAdvPaymentTime)
        }
    }
}

export function doSubmitAdvancePayment(params){
    var me = params.me
    var authParams = params.authParams
    var language = params.language
    var lang = 'vi-VN'

    var callback = function(response){
        if(response){
            
            if(response.mvReturnCode != 0) {											
                if(response.message && response.message.trim().length > 0){
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, eval(response.message)))
                    }
                } else {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.returnError[response.mvReturnCode]))
                    }
                }
            }else {
                
                if (response.mvResult == "SUCCESS") {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.info, language.advance.message.advancePaymentSuccessful))
                    }

                    // reset data
                    // if(ComponentList.AdvancePanelr){
                    //     ComponentList.AdvancePanelr.getAdvanceData();
                    //     ComponentList.refundPanel.getLoanData();
                    // }
                    
                    // if(ComponentList.AdvanceHistory){
                    //     ComponentList.AdvanceHistory.reloadData();
                    // }
                
                    me.txtAdvanceFeer.value = '0'
                    me.txtAdvancePaymentr.value = 0
                    
                }
                else {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, language.advance.message.advancePaymentFailed))
                    }
                }
                
            }
        } 
    }

    var advAmt = Utils.devideByCurrencyUnit(me.txtAdvancePaymentr.value)
    var advAvaible = me.txtAdvanceAvailabler.value
    var advRequest = me.txtAdvancePaymentr.value

    var params = {
        'lvAdvAvaiable' : advAvaible,
        'lvAdvRequest' : advRequest,
        'lvAmount' : advAmt,
        'mvSeriNo': authParams.mvSeriNo,
        'mvAnswer': authParams.mvAnswer,
        'mvSaveAuthenticate' : authParams.mvSaveAuthenticate,
        'key': (new Date()).getTime()
    };
}

// get data ///
function responseLoanRefundSubmit(response) {
    return {
        type: ActionTypes.LOANREFUNDSUBMIT,
        LoanRefundHistory: response,
    }
}

export function getLoanRefundSubmit(params) {
    return (dispatch) => {
        api.post(ACTION.SUBMITLOANREFUNDCREATION, params, dispatch, responseLoanRefundSubmit)
    }
}

function responseAdvanceSubmit(response) {
    return {
        type: ActionTypes.ADVANCESUBMIT,
        LoanRefundHistory: response,
    }
}

export function getAdvanceSubmit(params) {
    return (dispatch) => {
        api.post(ACTION.SUBMITADVANCEPAYMENTCREATION, params, dispatch, responseAdvanceSubmit)
    }
}
