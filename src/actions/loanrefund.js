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
    var me = params.me

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
            if(msg && msg.trim().length > 0){
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, msg))
                }
            }
            else{
                return (dispatch) => {
                    dispatch(showPopup({
                        data: {me: me},
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
    var lang = 'vi_VN'
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
    console.log(me)
    var refundAmt = Utils.devideByCurrencyUnit(me.txtRefundAmt.value)
    var loancurAmt = parseFloat(Utils.toTTLCurrencyFormat(me.txtBeginLoan.value))
    var loanremain = Utils.currencyShowFormatter(loancurAmt - refundAmt, ",", lang)
    var loancur = me.txtBeginLoan.value.trim()
    var loanpay = me.txtRefundAmt.value.trim()
    
    var remark  = me.txtRemark.value.trim()


    var _params = {
        'lvLoanRem' : loanremain,
        'lvLoanCur': loancur,
        'lvLoanPay': loanpay,
        'lvAmount' : refundAmt,
        'lvRemark' : remark,
        'mvSeriNo': authParams.matrixKey01 + '|' + authParams.matrixKey02,
        'mvAnswer': authParams.matrixValue01 + '|' + authParams.matrixValue02,
        'mvSaveAuthenticate': authParams.savedAuthen,
        'key': (new Date()).getTime()
    }

    return (dispatch) => {
        api.post(ACTION.SUBMITLOANREFUNDCREATION, _params, dispatch, callback)
    }
}
