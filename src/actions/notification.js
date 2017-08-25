import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')


export function showNotif(notifType, notifDetail, reloadPopup){
  return {
      type: ActionTypes.NOTIFICATION,
      message: notifDetail,
      notification_type: notifType,
      reloadPopup: reloadPopup
  }
}

