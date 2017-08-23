import {ActionTypes} from '../core/constants';

const initialState = {
	message : '123',
  type: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.NOTIFICATION:
        
        return Object.assign({},state,{          
        	message: action.message,
          type: action.notification_type,
        });
        
    default:
      break;
     
  }
  return state;
}
