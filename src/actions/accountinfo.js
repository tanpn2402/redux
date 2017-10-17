import * as WebApi from '../api/web_service_api';
import * as ACTION from '../api/action_name';
const { ActionTypes } = require('../core/constants');

export function getStockInfo(params) {
    return (dispatch)=>{
        WebApi.post(ACTION.STOCKINFO, params, dispatch, responseStockInfo)
    }
}

function responseStockInfo(response) {
    return {
      type: ActionTypes.GETSTOCKINFO,
      data: response
    }
}

export function getAccountBalance(params) {
    return (dispatch)=>{
        WebApi.post(ACTION.ACCOUNTBALANCE, params, dispatch, responseAccountBalance)
    }
}

function responseAccountBalance(response) {
    return {
      type: ActionTypes.ACCOUNTBALANCEINFO,
      data: response
    }
}

export function getAccountBalanceBank(params) {
    return (dispatch)=>{
        WebApi.post(ACTION.ACCOUNTBALANCE, params, dispatch, responseAccountBalanceBank)
    }
}

function responseAccountBalanceBank(response) {
    return {
      type: ActionTypes.ACCOUNTBALANCEBANKINFO,
      data: response
    }
}

export function getOverdueDebt(params) {
    //console.log("GET Over Due Debt");
    return (dispatch)=>{
        WebApi.get(ACTION.OVERDUEDEBT, params, dispatch, responseOverDueDebt)
    }
}

function responseOverDueDebt(response) {

    return {
      type: ActionTypes.OVERDUEDEBT,
      data: response
    }
}

export function getUpComingDebt(params) {
    //console.log("GET UpComingDebt");
    return (dispatch)=>{
        WebApi.get(ACTION.UPCOMINGDEBT, params, dispatch, responseUpComingDebt)
    }
}

function responseUpComingDebt(response) {
    return {
      type: ActionTypes.UPCOMINGDEBT,
      data: response.upcomingDebt
    }
}
