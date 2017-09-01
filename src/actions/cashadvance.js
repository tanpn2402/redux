import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const { ActionTypes } = require('../core/constants')

export function getCashAdvance (params) {
    console.log("Hello",params)
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

