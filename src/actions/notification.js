import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import moment from 'moment'
const {ActionTypes} = require('../core/constants')


export function showMessageBox(notifType, notifDetail, handleFunction = null){
	// return function(dispatch){
	// 	setTimeout(function(){
	// 		dispatch(b(notifType, notifDetail))
	// 	}, 1000)

	// 	setTimeout(function(){
	// 		dispatch(a(notifType, notifDetail))
	// 	}, 3000)
	// }
	return {
	  type: ActionTypes.MESSAGEBOX,
	  message: notifDetail,
	  notification_type: notifType,
		id: moment().valueOf(),
		handleFunction: handleFunction
	}
}

export function showFlashPopup(notifType, notifDetail){
	return {
	  type: ActionTypes.FLASHPOPUP,
	  message: notifDetail,
	  notification_type: notifType,
	  id: moment().valueOf(),
	}
}

function b(notifType, notifDetail){
	return {
	  type: ActionTypes.NOTIFICATION,
	  message: '111111111111',
	  notification_type: notifType,
	  id: moment().valueOf(),
	}
}

function a(notifType, notifDetail){
	return {
	  type: ActionTypes.NOTIFICATION,
	  message: 'asddddddddddddddddd',
	  notification_type: notifType,
	  id: moment().valueOf(),
	}
}