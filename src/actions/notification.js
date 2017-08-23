import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')


export function showNotif(notif){
  return {
      type: ActionTypes.NOTIFICATION,
      message: notif,
      notification_type: 0
  }
}

