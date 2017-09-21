import {ActionTypes} from '../core/constants';

const initialState = {

	localLoanRefundCreation: {
		mvLoanBean: []
	},
	localAdvanceCreation : {
		mvAdvanceBean: [],
		mvErrorCode: null,
		mvErrorResult: "fail",
		success: true
	},
	loanRefundData: {
		loanrefundList: [],
		totalCount: "0"
	},
	loanRefundHistory: {
		loanrefundhistoryList: [],
		totalCount: "0"
	}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOCALREFUND:
        return Object.assign({},state,{
        	localLoanRefundCreation: action.localLoanRefundCreation,
        });

	case ActionTypes.LOCALADVANCE:
		return Object.assign({},state,{
			localAdvanceCreation: action.localAdvanceCreation,
		});

	case ActionTypes.LOANREFUNDDATA:
		action.loanRefundData.loanrefundList = action.loanRefundData.loanrefundList === null ? [] : 
			action.loanRefundData.loanrefundList
		return Object.assign({},state,{
			loanRefundData: action.loanRefundData
		});

	case ActionTypes.LOANREFUNDHISTORY:
		action.loanRefundHistory.loanrefundhistoryList = action.loanRefundHistory.loanrefundhistoryList === null ? [] : 
			action.loanRefundHistory.loanrefundhistoryList
		return Object.assign({},state,{
			loanRefundHistory: action.loanRefundHistory
		});

    default:
      break;

  }
  return state;
}
