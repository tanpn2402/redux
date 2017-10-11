import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import {showMessageBox} from './notification'

const { ActionTypes } = require('../core/constants')

export function getOrderCofirm(param) {
    return function (dispatch) {
        api.post(ACTION.ENQUIRYSIGNORDER, param, dispatch, function(response){
            return {
                type: ActionTypes.ENQUIRYCONFIRMORDER,
                data: response
            }
        })
    }
}

export function onConfirmSubmit(param) {
    var language = param.language
    var data = param.data
    var me = param.me

    var list = []
    for (var i = 0; i < data.length; i++) {
        list[i] = [data[i].mvOrderID , data[i].mvTradeTime]
    }

    var args = {
        "mvSignOrderList" : [],
        "mvOrderList" : list
    }


    var successHandler = function(response){
        if (response.mvReturnCode != 0 || response.mvResult != "true") {

            if (response.mvResult == "false") {
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, language.orderconfirmation.message.confirmFail))
                }
            } else {
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.returnError[response.mvReturnCode]))
                }
            }

            if (response.mvReturnCode == 2) {
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.returnError[response.mvReturnCode]))
                }
            }

        } else {
            me.refreshComponent()
            return (dispatch) => {
                dispatch(showMessageBox(language.messagebox.title.info, language.orderconfirmation.message.confirmSuccess))
            }
        }
            

    }

    return function (dispatch) {
        api.post(ACTION.SUBMITSIGNORDER, args, dispatch, successHandler)
    }
}

export function exportOrderConfirm(params) {
    return (dispatch)=>{
        api.report(ACTION.EXPORTORDERCONFIRM, params, dispatch, function(response){
            return {
                type: ActionTypes.EXPORTORDERCONFIRM,
            }
        })
    }
}
