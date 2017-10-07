import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const { ActionTypes } = require('../core/constants')

export function getPorfolio (params) {
  return(dispatch) => {
    WebApi.get(ACTION.ENQUIRYPORTFOLIO, params, dispatch, Porfolio)
  }
}

function Porfolio (response) {
  return {
    type: ActionTypes.PORFOLIO,
    data: response,
  }
}
