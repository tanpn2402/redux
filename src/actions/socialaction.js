import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')

export function showUserDetail(show) {
    return {
        type: ActionTypes.SHOWUSERDETAIL,
        user: 1,
        show: show
    }
}