import * as WebApi from '../api/web_service_api';
import * as ACTION from '../api/action_name';
const { ActionTypes } = require('../core/constants');

export function avaiblemarginlist(params) {
    console.log('avaible margin list', params)
    return (dispatch)=>{
        WebApi.post(ACTION.AVAIABLEMARGINLIST, params, dispatch, responseAvaibleMarginList)
    }
}

function responseAvaibleMarginList(response) {
    return {
      type: ActionTypes.AVAIBLEMARGINLIST,
      data: response
    }
}