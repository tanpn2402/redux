import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import moment from 'moment'
const {ActionTypes} = require('../core/constants')


export function showMessageBox(notifType, notifDetail){
	// return function(dispatch){
	// 	setTimeout(function(){
	// 		dispatch(b(notifType, notifDetail))
	// 	}, 1000)

	// 	setTimeout(function(){
	// 		dispatch(a(notifType, notifDetail))
	// 	}, 3000)
	// }
	let type = ''
	switch(notifType){
		case 0: type = 'ERROR'; break;
		case 1: type = 'WARNING'; break;
		case 2: type = 'FAILED'; break;
		case 3: type = 'INFO'; break;
		case 4: type = 'NOTE'; break;

	}
	return {
	  type: ActionTypes.MESSAGEBOX,
	  message: notifDetail,
	  notification_type: type,
	  id: moment().valueOf(),
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