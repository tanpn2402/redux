import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const { ActionTypes } = require('../core/constants');

export function getOrderCofirm(param) {
    console.log('OrderCofirm Action', param)

    return function (dispatch) {
        (api.post(ACTION.ENQUIRYSIGNORDER, param, dispatch, getData))
    }
}
export function getData(response) {
    console.log('Orderconfirm data', response)

    return {
        type: ActionTypes.ENQUIRYCONFIRMORDER,
        data: response
    }
}

export function onConfirmSubmit(param) {
    var json = {}
    var list = []
    for (var i = 0; i < param.length; i++) {
        list[i] = param[i].mvOrderID + "," + param[i].mvTradeTime;
    }
    json.mvOrderList = list;
    console.log(json, json.mvOrderList)

    return function (dispatch) {
        (api.post(ACTION.SUBMITSIGNORDER, json, dispatch, getMsgConfirmSubmit))
    }
}

export function getMsgConfirmSubmit(response) {
    console.log('Orderconfirm data', response)

    return {
        type: ActionTypes.CONFIRMORDERSUBMIT,
        data: response
    }
}
function responseExportExcel() {
    return {
        type: ActionTypes.EXPORTORDERCONFIRM,
    }
}

export function exportOrderConfirm(params) {
    return (dispatch)=>{
        api.report(ACTION.EXPORTORDERCONFIRM, params, dispatch, responseExportExcel)
    }
}
