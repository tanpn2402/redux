import {ActionTypes} from '../core/constants';

const initialState = {
	oddlotenquiry : [],
	oddlothistory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ODDLOTENQUIRY:
        return Object.assign({},state,{
        	oddlotenquiry: action.oddlotenquiry,
        }
    );

    case ActionTypes.ODDLOTHISTORY:
    		return Object.assign({},state,{
    			oddlothistory: action.oddlothistory,
    		}
    );

    default:
      break;

  }
  return state;
}
