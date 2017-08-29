import {ActionTypes} from '../core/constants';

const initialState = {
	LocalRefund : [],
	LocalAdvance: [],
	LoanRefundHistory:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOCALREFUND:
        console.log('reducers',action.tabList, 'page', action.page)
        return Object.assign({},state,{
        	LocalRefund: action.LocalRefund,
        }
);

case ActionTypes.LOCALADVANCE:
		console.log('reducers',action.tabList, 'page', action.page)
		return Object.assign({},state,{
			LocalAdvance: action.LocalAdvance,
		}
);

case ActionTypes.LOANREFUNDHISTORY:
		console.log('reducers',action.tabList, 'page', action.page)
		return Object.assign({},state,{
			LoanRefundHistory: action.LoanRefundHistory,
		}
);

    default:
      break;

  }
  return state;
}
