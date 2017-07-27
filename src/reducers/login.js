import {ActionTypes} from '../core/constants';

const initialState = [];

export default function(state = initialState, action) {
  	


  switch (action.type) {
    	case ActionTypes.DO_LOGIN:
    		console.log([...state, action.message])
      	return [...state, action.message]

     case ActionTypes.ON_LOGIN:
    		console.log([...state, action.message])
      	return [...state, action.message]

     case ActionTypes.LOGIN_DONE:
    		console.log([action.message])
      	return [ action.message]

    default:
      break;
     
  }

  return state;
}
