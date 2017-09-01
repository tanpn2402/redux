import {ActionTypes} from '../core/constants';

const initialState = {
	//message : '123',
  //type: 0,
  showMsg: false,
  msgId: '0',
  listFlashPopup: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MESSAGEBOX:
        return Object.assign({},state,{          
        	message: action.message,
          type: action.notification_type,
          reloadMsg: action.reloadMsg,
          showMsg: action.showMsg,
        });
    case ActionTypes.FLASHPOPUP:
        var s={
          'id': action.msgId,
          'type': action.msgType,
          'message': action.msgContent
        }
        
        //state.listFlashPopup=[]
        return Object.assign({},state,{          
          listFlashPopup: [...state.listFlashPopup,s],
          msgId: action.msgId,
          showFlash: action.showFlash
        });
    default:
      break;
     
  }
  return state;
}
