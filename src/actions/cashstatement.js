import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')

function responseCashStatement(response) {
    return {
      type: ActionTypes.CASHSTATEMENT,
      data: response
    }
}

export function enquiryCashStatement(params){
	return (dispatch)=>{
    api.get(ACTION.CASHSTATEMENT, params, dispatch, responseCashStatement)	}
}
function responseExportExcel() {
  return {
      type: ActionTypes.EXPORTCASHTRANSACTIONHISTORY,
  }
}

export function exportCashTransactionHistory(params) {
  return (dispatch)=>{
      api.report(ACTION.EXPORTCASHTRANSACTIONHISTORY, params, dispatch, responseExportExcel)
  }
}