import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')



export function accountBalanceEnquiry(params) {
    return (dispatch)=> {
        api.get(ACTION.ACCOUNTBALANCEENQUIRY, params, dispatch, function(response) {
            return {
                type: ActionTypes.ACCOUNTBALANCEENQUIRY,
                data: response
            }
        })	
    }
}