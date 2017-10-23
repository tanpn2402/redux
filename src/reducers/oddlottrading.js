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
        action.oddlotenquiry.oddLotList = action.oddlotenquiry.oddLotList == null ? [] : 
            action.oddlotenquiry.oddLotList
        return Object.assign({},state,{
        	oddlotenquiry: action.oddlotenquiry,
        }
    );

case ActionTypes.ODDLOTHISTORY:
        action.oddlothistory.historyList = action.oddlothistory.historyList == null ? [] : 
            action.oddlothistory.historyList
		return Object.assign({},state,{
			oddlothistory: action.oddlothistory,
		}
);

case ActionTypes.BANKINFO:
        action.bankinfo.mvBankInfoList = action.bankinfo.mvBankInfoList == null ? [] : 
            action.bankinfo.mvBankInfoList
		return Object.assign({},state,{
			bankinfo: action.bankinfo,
		}
);


    default:
      break;

  }
  return state;
}
