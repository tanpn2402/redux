import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import { ActionTypes } from '../core/constants';

export function setAuthenFail(isAuthenFail) {
    return {
        type: ActionTypes.SET_AUTHEN_FAIL,
        isAuthenFail
    }
}

export function authMatrixCard(param) {
    console.log('MatrixCard Action call: ', param)
    return function (dispatch) {
        api.post(ACTION.AUTHCARD, param, dispatch, matrixCardResponse)
    }
}

export function getSuccess(response){
    return response.mvSuccess
}

function matrixCardResponse(response) {
    getSuccess(response);
    console.log('matrixCardResponse res', response)
    return {
        type: ActionTypes.MATRIXCARD,
        data: response
    }
}

