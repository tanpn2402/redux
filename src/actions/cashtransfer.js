import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')

function responsefundtransfer (response) {
  return {
    type: ActionTypes.FUNDTRANSFER,
    data: response,
  }
}

export function getFundtransfer(params) {
  return(dispatch) => {
    WebApi.post(ACTION.DOFOUNDTRANSFER, params, dispatch, responsefundtransfer)
    }
  }

function responsegenfundtransfer (response) {
  return {
    type: ActionTypes.GENFUNDTRANSFER,
    data: response,
  }
}

export function getGenfundtransfer (params) {
  return(dispatch) => {
    WebApi.post(ACTION.GENFUNDTRANSFER, params, dispatch, responsegenfundtransfer)
    }
}

function responsehksCachTranHis (response) {
  return {
    type: ActionTypes.HKSCASHTRANHIS,
    data: response,
  }
}

export function gethksCachTranHis(params) {
  return(dispatch) => {
    WebApi.post(ACTION.HKSCASHTRANHIS, params, dispatch, responsehksCachTranHis)
    }
  }

  function responseCancelfundtransfer(response) {
    return {
      type: ActionTypes.CANCELFUNDTRANSFER,
      data: response,
    }
  }

  export function getCancelfundtransfer(params) {
    return (dispatch) => {
      WebApi.post(ACTION.CANCELFUNDTRANSFER, params, dispatch, responseCancelfundtransfer)
    }
  }
