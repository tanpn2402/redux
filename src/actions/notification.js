import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
const {ActionTypes} = require('../core/constants')


export function showMessageBox(msgType, msgDetails, reloadMsg, showMsg){
  return {
      type: ActionTypes.MESSAGEBOX,
      message: msgDetails,
      notification_type: msgType,
      reloadMsg: reloadMsg,
      showMsg: showMsg,
  }
}
export function showFlashPopup(msgId, msgContent, showFlash ){
  return {
      type: ActionTypes.FLASHPOPUP,
      msgId: msgId,
      msgContent: msgContent, 
      showFlash: showFlash
  }
}
