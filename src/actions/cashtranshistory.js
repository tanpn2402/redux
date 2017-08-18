import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const { ActionTypes } = require('../core/constants');

export function enquiryCashTransaction(params, reload) {
    return (dispatch)=>{
        api.get(ACTION.HKSCASHTRANSACTIONHISTORY,params,dispatch,responseCashTransaction)
    }
}

function responseCashTransaction(response){
    return {
        type: ActionTypes.ENQUIRYCASHTRANSACTION,
        data: response,
    }
}
