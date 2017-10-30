import {ActionTypes} from '../core/constants';

const initialState = {
	message : '',
  type: -1,
  id: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FLASHPOPUP:
        return Object.assign({},state,{          
        	message: action.message,
          type: action.notification_type,
          id: action.id,
        });
    default:
      break;
     
  }
  return state;
}
