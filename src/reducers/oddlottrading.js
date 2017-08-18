import {ActionTypes} from '../core/constants';

const initialState = {
	oddlotenquiry : [],
	oddlothistory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ODDLOTENQUIRY:
        console.log('reducers',action.tabList, 'page', action.page)
        return Object.assign({},state,{
        	oddlotenquiry: action.oddlotenquiry,
        }
);

case ActionTypes.ODDLOTHISTORY:
		console.log('reducers',action.tabList, 'page', action.page)
		return Object.assign({},state,{
			oddlothistory: action.oddlothistory,
		}
);

    default:
      break;

  }
  return state;
}
