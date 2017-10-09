import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as Utils from '../utils'
import {showMessageBox} from './notification'
import {showPopup} from './popup'

const {ActionTypes} = require('../core/constants')

export function paymentSelectionChange(list){
    console.log(list.length)
    return {
        type: ActionTypes.PAYMENTSELECTED,
        data: list
    }
}

export function getqueryAdvancePaymentInfo(params) {
    return (dispatch) => {
        WebApi.get(ACTION.QUERYADVANCEPAYMENTINFO, params, dispatch, queryAdvancePaymentInfo)
    }
}

function queryAdvancePaymentInfo(response) {
    return {
        type: ActionTypes.QUERYADVANCEPAYMENTINFO,
        queryAdvancePaymentInfo: response,
    }
}

export function getqueryBankInfo(params) {
    return (dispatch) => {
        WebApi.get(ACTION.QUERYBANKINFO, params, dispatch, queryBankInfo)
    }
}

function queryBankInfo(response) {
    // response.mvBankInfoList.unshift({
    //     'mvBankID': "",
    //     'mvBankACID': "",
    //     'mvSettlementAccountDisplayName': "MAS",
    //     'mvIsDefault': "N",
    //     'mvInterfaceSeq': "-1"
    // })
    return {
        type: ActionTypes.QUERYBANKINFO,
        queryBankInfo: response,
    }
}

export function calculateInterest(params) {
    var advPayment = params.advPayment
    var language = params.language
    if (advPayment <= 0) {
        // return (dispatch) => {
        //     dispatch(showMessageBox(language.messagebox.title.error, language.cashadvancebank.message.wrongAmount))
        // }

        return {
            type: null
        }

    } else {
        var soldT = params.cTPLUSXHF
        var stleDay = "3"; // default
        if (soldT == "T0") {
            stleDay = "3";
        } else if (soldT == "T1") {
            stleDay = "2";
        } else if (soldT == "T2") {
            stleDay = "1";
        }

        var _params = {
            "mvSettlement": stleDay,
            'mvAmount': advPayment
        }

        var callbackProcess = function(response) {
            if (response != null) {
                return {
                    type: ActionTypes.CALCULATEINTERSETAMT,
                    calculateInterestAmt: response
                }
            }
        }

        return (dispatch) => {
            WebApi.post(ACTION.CALCULATEINTERSETAMT, _params, dispatch, callbackProcess)
        }
    }
}

export function beforeSubmitCashAdvBank(params) {
    var advPayment = params.advPayment
    var language = params.language
    var data = params.data
    console.log(advPayment)
    if (advPayment <= 0 ) {
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.cashadvancebank.message.wrongAmount))
        }
    } else if(advPayment === ''){
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.cashadvancebank.message.noamount))
        }
    } else {
        var responseCheckAdvPaymentTime = function(response) {
            var msg = response.mvResult
            if (msg && msg.trim().length > 0) {
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, msg))
                }
            } else {
                return (dispatch) => {
                    dispatch(showPopup({
                        data: data,
                        title: language.cashadvancebank.popup.title,
                        language: language,
                        id: 'cashadvancebank',
                        authcard: true
                    }))
                }
            }
        }
        return (dispatch) => {
            WebApi.post(ACTION.CHECKADVANCEPAYMENTTIME, [], dispatch, responseCheckAdvPaymentTime)
        }
    }
}

export function submitCashAdvanceBank(params) {
    var language = params.language
    var authParams = params.authParams
    var data = params.data

    var callbackProcess = function(response) {
        if (response) {

            if (response.mvReturnCode != 0) {
                if (response.mvResult && response.mvResult.trim().length > 0) {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, response.mvResult))
                    }
                } else {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, '123'))
                    }
                }
            } else {
                if (response.mvResult == "SUCCESS") {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.info, language.cashadvance.message.advancePaymentSuccessful))
                    }
                } else {
                    return (dispatch) => {
                        dispatch(showMessageBox(language.messagebox.title.error, language.cashadvance.message.advancePaymentFailed))
                    }
                }

            }
        } else {
            return (dispatch) => {
                dispatch(showMessageBox(language.messagebox.title.error, language.cashadvance.message.advancePaymentFailed))
            }
        }
    }

    var mvOrderIDArray = data.cOrderIDArray.join("|");
    var mvContractIDArray = data.cContractIDArray.join("|");
    var advAmt = Utils.devideByCurrencyUnit(data.advAmt)

    var _params = {
        'mvOrderIDStrArray': mvOrderIDArray,
        'mvContractIDStrArray': mvContractIDArray,
        'mvBankID': data.cBankIDHF,
        'mvTPLUSX': data.cTPLUSXHF,
        'mvAmount': advAmt,
        'mvTotalAmt': data.cTovalValue,
        'key': (new Date()).getTime(),
        'mvSeriNo': authParams.matrixKey01 + '|' + authParams.matrixKey02,
        'mvAnswer': authParams.matrixValue01 + '|' + authParams.matrixValue02,
        'mvSaveAuthenticate': authParams.savedAuthen
    }
    console.log(data, _params)

    return (dispatch) => {
        WebApi.post(ACTION.SUBMITBANKADVANCEPAYMENT, _params, dispatch, callbackProcess)
    }
}