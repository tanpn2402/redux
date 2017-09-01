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
    type: ActionTypes.CASHADVANCE,
    data: response,
  }
}
