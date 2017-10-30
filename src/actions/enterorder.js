import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as matrix from './authmatrix.js'
import config from '../core/config'
import {showMessageBox, showFlashPopup} from './notification'

const { ActionTypes } = require('../core/constants');

let stockInfoSell = {}
let stockInfo = {}

export function getstockInfo(param) {
    return function (dispatch) {
        (api.post(ACTION.STOCKINFO, param, dispatch, getStockB))
    }
}

function getStockB(response) {

    if (response) {
        if (response.mvStockBalanceInfo !== null)
            stockInfoSell = response
        else
            stockInfo = response
        if (stockInfo.mvStockInfoBean.mvMarginPercentage==="null")
            stockInfo.mvStockInfoBean.mvMarginPercentage = "0"
    }
    return {
        type: ActionTypes.STOCKINFO,
        stockInfo: response
    }
}



/////////////////
export function genEnterOrder(){
    var callback = function(response){
        return {
        type: ActionTypes.GENENTERORDER,
        data: response
        }
    }

    return function (dispatch) {
        api.post(ACTION.GENENTERORDER, {}, dispatch, callback)
    }
}

export function enterOrderSubmit(language, params, authParams){

    var authCardSuccess = function(response){

        var successHandler = function(response){
            if(response.mvResult == "SESSION_EXPIRED"){
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, "SESSION_EXPIRED"))
                }
            }
            if(response.mvResult == "MULTI_USERS_LOGIN"){
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, "MULTI_USERS_LOGIN"))
                }
            }
            if(response.mvResult == "SYSTEM_MAINTENANCE"){
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, "SYSTEM_MAINTENANCE"))
                }
            }
            
            if(response.mvReturnCode != 0) {                                          
                // fail
                return (dispatch) => {
                    dispatch(showMessageBox(language.messagebox.title.error, "SYSTEM_MAINTENANCE"))
                }
            } else {
                // success
                return function (dispatch) {
                    dispatch(showFlashPopup(language.messagebox.title.info, 'Ordered successfully !'))
                }
            }
        }

        var failHandler = function(err){
            console.log(err)
            return (dispatch) => {
                dispatch(showMessageBox(language.messagebox.title.error, "SYSTEM_MAINTENANCE"))
            }
        }

        return function (dispatch) {
            api.post(ACTION.ENTERORDER, params, dispatch, successHandler, failHandler)
        }
    }

    var authCardFail = function(error){
        return (dispatch) => {
            dispatch(showMessageBox(language.messagebox.title.error, error.message))
        }
    }

    return function (dispatch) {
        dispatch(checkAuthentication(authParams, authCardSuccess, authCardFail))
    }

}

export function checkAuthentication(authParams, successEvent, failEvent){
    var errMes = '';
    var p_result = 0;
    var authCardSuccess = function(response){                           
                         
        if("SUCCESS" == response.mvSuccess){
            if(response.mvSaveAuthenticate == "true"){
                config.cache.authentication = true;
                p_result = 2; 
            }else{
                p_result = 1; 
            }                                                                           
        }else{      
            if(response.mvClientCardBean.mvErrorCode=="CARD001"){
                p_result = -2;    
                
            }else if(response.mvClientCardBean.mvErrorCode=="CARD002"){
                p_result = -1;        
                                                           
            }else{
                p_result = 0;                                             
                var r_limit = 0 + response.mvClientCardBean.attemptLimit - response.mvClientCardBean.attempt;
                if(r_limit < 1 ){
                    p_result = -1;        
                }      
            } 

            errMes = response.mvErrorResult;                                                                                               
        }
        if(errMes !== ''){
            return function (dispatch) {
                dispatch(failEvent({message: errMes, result: p_result}))
            }
        }
        else{
            return function (dispatch) {
                dispatch(successEvent())
            }
        }
                                

    }

    var authCardFail = function(error){
        return function (dispatch) {
            dispatch(failEvent({message: error, result: -1}))
        }
    }


    return function (dispatch) {
        api.post(ACTION.AUTHCARD, authParams, dispatch, authCardSuccess, authCardFail)
    }
}