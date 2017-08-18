import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants');

function responseStockStatement(jsondata){
    return {
        type: ActionTypes.ENQUIRYSTOCKSTATEMENT,
        data: jsondata,
        reload: true
    }
}


export function enquiryStockStatement(params, reload) {
    return (dispatch) => {
        return api.get(ACTION.HKSSTOCKTRANSACTIONHISTORY,params, dispatch, responseStockStatement)
    }
}
