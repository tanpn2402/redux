import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const { ActionTypes } = require('../core/constants');

export function enquiryMarginLoan(params, reload) {
    return (dispatch)=>{
        api.get(ACTION.MARGINLOAN, params, dispatch, responseMarginLoan)
    }
}

function responseMarginLoan(response){
    
    return {
        type: ActionTypes.ENQUIRYMARGINLOAN,
        data: response,
    }
}