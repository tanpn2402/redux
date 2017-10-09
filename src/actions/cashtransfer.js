import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as Utils from '../utils'
import {
  showMessageBox
} from './notification'
import {
  showPopup
} from './popup'
const {
  ActionTypes
} = require('../core/constants')

function responsefundtransfer(response) {
  return {
    type: ActionTypes.FUNDTRANSFER,
    data: response
  }
}

export function getFundtransfer(params) {
  return (dispatch) => {
    WebApi.post(ACTION.DOFUNDTRANSFER, params, dispatch, responsefundtransfer)
  }
}

function responsegenfundtransfer(response) {
  return {
    type: ActionTypes.GENFUNDTRANSFER,
    data: response
  }
}

export function getGenfundtransfer(params) {
  return (dispatch) => {
    WebApi.post(ACTION.GENFUNDTRANSFER, params, dispatch, responsegenfundtransfer)
  }
}

function responsehksCachTranHis(response) {
  return {
    type: ActionTypes.HKSCASHTRANHIS,
    data: response
  }
}

export function gethksCachTranHis(params) {
  return (dispatch) => {
    WebApi.post(ACTION.HKSCASHTRANHIS, params, dispatch, responsehksCachTranHis)
  }
}

// function responseCancelfundtransfer(response) {
//   return {
//     type: ActionTypes.CANCELFUNDTRANSFER,
//     data: response
//   }
// }

// export function getCancelfundtransfer(params) {
//   return (dispatch) => {
//     WebApi.post(ACTION.CANCELFUNDTRANSFER, params, dispatch, responseCancelfundtransfer)
//   }
// }
function validateParamsTransfer(paramsTransfer, language, mvTransferBean) {
  //check if Available Balance is positive
  if (paramsTransfer.mvAvaiableAmt <= 0) {
    return (dispatch) => {
      dispatch(showMessageBox(language.messagebox.title.error, language.cashtransfer.message.notenoughmoney))
    }
  }

  //check if Transfer amount equal zero
  if (paramsTransfer.mvAmount <= 0) {
    return (dispatch) => {
      dispatch(showMessageBox(language.messagebox.title.error, language.cashtransfer.message.noamount))
    }
  }

  //check if transfer amount is over available amount
  if (paramsTransfer.mvAmount > mvTransferBean.mvAvailable) {
    return (dispatch) => {
      dispatch(showMessageBox(language.messagebox.title.error, language.cashtransfer.message.overtransfer))
    }
  }
  
  return true;
}

export function beforeSubmitCashTransfer(paramsTransfer, mvTransferBean, language) {
  let validateRes = validateParamsTransfer(paramsTransfer, language, mvTransferBean)
  if (validateRes==true){
    var responseCheckFundTransTime = function (response) {

      var msg = response.mvResult
      if (msg && msg.trim().length <= 0) {
        return (dispatch) => {
          dispatch(showMessageBox(language.messagebox.title.error, msg))
        }
      } else {
        return (dispatch) => {
          dispatch(showPopup({
            data: {
              paramsTransfer: paramsTransfer,
              mvTransferBean: mvTransferBean
            },
            title: language.cashtransfer.popup.title,
            language: language,
            id: 'cashtransfer',
            authcard: true
          }))
        }

      }
    }

    return (dispatch) => {
      WebApi.post(ACTION.CHECKFUNDTRANSFERTIME, [], dispatch, responseCheckFundTransTime)
    }
  }else{
    return validateRes
  }
}

export function submitCashTransfer(data, authParams, language) {
  var responseSubmitCashTransfer = function (response) {
    if (response) {

      if (response.mvReturnCode != 0) {
        if (response.mvResult && response.mvResult.trim().length > 0) {
          return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, response.mvResult))
          }
        } else {
          return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, response.mvFundTransferResult))
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

  var fee = Utils.numUnFormat(data.paramsTransfer.mvTransferFee)
  var desBankInfo = data.paramsTransfer.inputBankName
  desBankInfo = desBankInfo + "_+_" + data.paramsTransfer.inputBankBranch.trim()

  var params = {
    ...data.paramsTransfer,
    'mvTransferFee': fee,
  };

  return (dispatch) => {
    WebApi.post(ACTION.DOFUNDTRANSFER, params, dispatch, responseSubmitCashTransfer)
  }
}

export function beforeCancelFundTransfer(tranID, status, language, callback) {
  return (dispatch) => {
    dispatch(showPopup({
      data: {
        'tranID': tranID,
        'status': status,
        'callback': callback
      },
      title: language.cashtransfer.popup.title,
      language: language,
      id: 'cancelcashtransfer',
      authcard: false
    }))
  }
}

export function CancelCashtransfer(data, language) {

  var responseCancelCashTransfer = function (response) {
    if (response) {

      if (response.mvReturnCode != 0) {
        if (response.mvFundTransferResult && response.mvFundTransferResult.trim().length > 0) {
          return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, response.mvFundTransferResult))
          }
        } else {
          return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.mvFundTransferResult, '123'))
          }
        }
      } else {
        if (response.mvResult == "SUCCESS") {
          data.callback()
          return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.info, language.cashtransfer.message.cancelSuccess))
          }
        } else {
          return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, language.cashtransfer.message.cancelFailed))
          }
        }

      }
    } else {
      return (dispatch) => {
        dispatch(showMessageBox(language.messagebox.title.error, language.cashtransfer.message.advancePaymentFailed))
      }
    }
  }

  var params = {
    'mvTranID': data.tranID,
    'mvStatus': data.status,
  };

  return (dispatch) => {
    WebApi.post(ACTION.CANCELFUNDTRANSFER, params, dispatch, responseCancelCashTransfer)
  }
}