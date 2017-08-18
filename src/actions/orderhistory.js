import * as webapi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants');

function responseOrderHistory(response) {
  	return {
    	type: ActionTypes.ENQUIRYORDERHISTORY,
    	data: response
	}
}

export function enquiryOrderHistory(params){
	return (dispatch)=>{
		webapi.post(ACTION.ENQUIRYORDER, params, dispatch, responseOrderHistory)
	}
}