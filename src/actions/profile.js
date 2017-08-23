import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')

export function getClientInfo(params) {
  return (dispatch)=>{
    api.get(ACTION.GETCLIENTDETAIL,params,dispatch,responseGetClientDetails)
  }
}
function responseGetClientDetails(response){
  return {
      type: ActionTypes.PROFILE,
      clientDetails: response,
  }
}

export function changePassword(params) {
  return (dispatch)=>{
    api.get(ACTION.CHANGEPASSWORD,params,dispatch,responseChangePassword)
    
  }
}
function responseChangePassword(response){
  return {
      type: ActionTypes.CHANGEPASSWORD, 
      changePassword: response,
  }
}