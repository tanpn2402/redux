import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')

export function queryOrderInfo(params){
	return (dispatch) => {
        api.post(ACTION.QUERYORDERINFO, params, dispatch, function(res) {
            if(res) {
                return {
                    type: ActionTypes.QUERYORDERINFO,
                    data: res
                }
            }
        })	
    }
}