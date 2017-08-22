import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')

export function getProfile(params) {
  return (dispatch)=>{
    api.get(ACTION.GETCLIENTDETAIL,params,dispatch,responseGetClientDetails)
  }
}
function responseGetClientDetails(response){
  console.log("responseGetClientDetails ",response)
  return {
      type: ActionTypes.PROFILE,
      clientDetails: response,
  }
}
