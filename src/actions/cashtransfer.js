<<<<<<< HEAD
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

export function beforeSubmitCashTransfer(paramsTransfer, mvTransferBean, language) {
  if (paramsTransfer.transferamount <= 0) {
    return (dispatch) => {
      dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.noAmount))
    }
  }

  if (paramsTransfer.transferamount < mvTransferBean.mvAvailable) {
    return (dispatch) => {
      dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.noAmount))
    }
  } else {
    var responseCheckFundTransTime = function (response) {

      var msg = response.mvResult
      if (msg && msg.trim().length > 0) {
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

  var fee = Utils.numUnFormat(data.paramsTransfer)
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
        'mvTranID': tranID,
        'mvStatus': status,
        'callback': callback
      },
      title: language.cashtransfer.popup.title,
      language: language,
      id: 'cancelcashtransfer',
      authcard: false
    }))
  }
}

export function cancelFundTransfer(data, language, callback) {

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
          callback()
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
    'tranID': data.tranID,
    'status': data.status,
  };

  return (dispatch) => {
    WebApi.post(ACTION.CANCELFUNDTRANSFER, params, dispatch, responseCancelCashTransfer)
  }
=======
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

export function beforeSubmitCashTransfer(paramsTransfer, mvTransferBean, language) {
  if (paramsTransfer.transferamount <= 0) {
    return (dispatch) => {
      dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.noAmount))
    }
  }

  if (paramsTransfer.transferamount < mvTransferBean.mvAvailable) {
    return (dispatch) => {
      dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.noAmount))
    }
  } else {
    var responseCheckFundTransTime = function (response) {

      var msg = response.mvResult
      if (msg && msg.trim().length > 0) {
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

  var fee = Utils.numUnFormat(data.paramsTransfer)
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
        'mvTranID': tranID,
        'mvStatus': status,
        'callback': callback
      },
      title: language.cashtransfer.popup.title,
      language: language,
      id: 'cancelcashtransfer',
      authcard: false
    }))
  }
}

export function cancelFundTransfer(data, language, callback) {

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
          callback()
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
    'tranID': data.tranID,
    'status': data.status,
  };

  return (dispatch) => {
    WebApi.post(ACTION.CANCELFUNDTRANSFER, params, dispatch, responseCancelCashTransfer)
  }
>>>>>>> d0bbce102fc1511a532d1c2eda7284c4f460cd14
}