import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const { ActionTypes } = require('../core/constants')

export function getqueryAdvancePaymentInfo (params) {
  return(dispatch) => {
    WebApi.get(ACTION.QUERYADVANCEPAYMENTINFO, params, dispatch, queryAdvancePaymentInfo)
  }
}

function queryAdvancePaymentInfo (response) {
  return {
    type: ActionTypes.QUERYADVANCEPAYMENTINFO,
    queryAdvancePaymentInfo: response,
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

export function getqueryBankInfo (params) {
  return(dispatch) => {
    WebApi.get(ACTION.QUERYBANKINFO, params, dispatch, queryBankInfo)
  }
}

function queryBankInfo (response) {
  return {
    type: ActionTypes.QUERYBANKINFO,
    queryBankInfo: response,
  }
}