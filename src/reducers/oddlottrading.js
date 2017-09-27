import {ActionTypes} from '../core/constants';

const initialState = {
	oddlotenquiry : {
        mvResult: null,
        oddLotList: []
    },
	oddlothistory: {
        historyList: [],
        mvCurrentPage: 0,
        mvPage: null,
        mvResult: null,
        mvReturnCode: 0,
        totalCount: 0
    },
    bankinfo: {
        mvBankInfoList: [],
        mvErrorCode: "0",
        mvErrorResult: "fail",
        success: true
    }
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

case ActionTypes.BANKINFO:
		return Object.assign({},state,{
			bankinfo: action.bankinfo,
		}
);


    default:
      break;

  }
  return state;
}
