import {ActionTypes} from '../core/constants';

const initialState = {
	LocalRefund : [],
	LocalAdvance: [],
	LoanRefundHistory:[],
	LoanRefundData:[],
	LoanRefundHistoryTotalRecord:0,
	LoanRefundDataTotalRecord:0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOCALREFUND:
        return Object.assign({},state,{
        	LocalRefund: action.LocalRefund,
        }
);

case ActionTypes.LOCALADVANCE:
		return Object.assign({},state,{
			LocalAdvance: action.LocalAdvance,
		}
);

case ActionTypes.LOANREFUNDDATA:
		return Object.assign({},state,{
			LoanRefundData: action.LoanRefundData.loanrefundList  === null ? [] : 
				action.LoanRefundData.loanrefundList,
			LoanRefundDataTotalRecord: action.LoanRefundData.totalCount,
		}
);

case ActionTypes.LOANREFUNDHISTORY:
		return Object.assign({},state,{
			LoanRefundHistory: action.LoanRefundHistory.loanrefundhistoryList  === null ? [] : 
				action.LoanRefundHistory.loanrefundhistoryList,
			LoanRefundHistoryTotalRecord: action.LoanRefundHistory.totalCount,
		}
);

    default:
      break;

  }
  return state;
}
