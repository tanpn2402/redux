import * as webapi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants');

function responseOrderHistory(response) {
  	return {
    	type: ActionTypes.ENQUIRYORDERHISTORY,
    	data: response
	}
}

export function enquiryOrderHistory(params, page) {
	if (params.mvBS === "ALL") {
		params.mvBS = 'A'
	}
	return (dispatch) => {
		webapi.post(ACTION.ENQUIRYHISTORYORDER, params, dispatch, responseOrderHistory)
	}
}