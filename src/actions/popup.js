import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import { ActionTypes } from '../core/constants';
import moment from 'moment'

export function showPopup(params) {
    console.log(params)
    return {
        type: ActionTypes.POPUP,
        data: params.data,
        language: params.language,
        title: params.title,
        id: params.id,
        authcard: params.authcard,
        timestamp: moment().valueOf()
    }
}
