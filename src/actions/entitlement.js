import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')

function responsedynamicdata (response) {
  return {
    type: ActionTypes.DYNAMICDATA,
    data: response,
  }
}

export function getDynamicdata(params) {
  console.log("hello", params);
  return(dispatch) => {
    WebApi.post(ACTION.GETDYNAMICUPDATEDATA, params, dispatch, responsedynamicdata)
    }
  }

function responseRightlist (response) {
  return {
    type: ActionTypes.ENTITLEMENTRIGHTLIST,
    data: response,
  }
}

export function getRightlist(params) {
  return(dispatch) => {
    WebApi.post(ACTION.GETALLRIGHTLIST, params, dispatch, responseRightlist)
    }
  }

function responseAdditionalshareinfo (response) {
  return {
    type: ActionTypes.ENTITLEMENTADDITIONALSHARELIST,
    data: response,
  }
}

export function getAdditionalshareinfo(params) {
    return(dispatch) => {
      WebApi.post(ACTION.GETADDITIONISSUESHAREINFO, params, dispatch, responseAdditionalshareinfo)
    }
}

function responseHistorylist(response) {
  return {
    type: ActionTypes.ENTITLEMENTHISTORYLIST,
    data: response,
  }
}

export function getHistorylist(params) {
  return(dispatch)=> {
    WebApi.post(ACTION.GETENTITLEMENTHISTORY, params, dispatch, responseHistorylist)
  }
}
