import * as WebApi from '../api/web_service_api';
import * as ACTION from '../api/action_name';
const { ActionTypes } = require('../core/constants');

export function getStockInfo(params) {
    return (dispatch)=>{
        WebApi.post(ACTION.STOCKINFO, params, dispatch, responseAccountInfo)
    }
}

function responseAccountInfo(response) {
    return {
      type: ActionTypes.ACCOUNTINFO,
      data: response
    }
}

export function getAccountBalance(params) {
    console.log("GET Account balance");
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

