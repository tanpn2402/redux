const {ActionTypes} = require('../core/constants');

const initialState = {
  stockSearchList: [],
  mvIsEnableMultiMarket: true,
  mvResult: null,
  data: [],
};
const modifyResult={"mvResult":null,"mvReturnResult":"ModifyOrderFail","returnCode":0,"savedAuthen":"true","success":true}
export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STOCKSEARCH:
      console.log(action.stockList)
        return Object.assign({},state,{          
          stockSearchList: action.stockList.stockSearchList,
          mvIsEnableMultiMarket: action.stockList.mvIsEnableMultiMarket,
          mvResult: action.stockList.mvResult,
          language: action.language,
        });

      case ActionTypes.ENQUIRYORDER:
      //console.log('ENQUIRYORDER', action.data)
        return Object.assign({},state,{          
          data: action.data,
          stockSearchList: action.stockList.stockSearchList,
          mvIsEnableMultiMarket: action.stockList.mvIsEnableMultiMarket,
          mvResult: action.stockList.mvResult,
          language: action.language,
          reload: !action.reload,
        });

      case ActionTypes.CANCELSUBMIT:
        return Object.assign({},state,{          
          returnCode: '1',
          message: "ok"
        });
      case ActionTypes.MODIFYSUBMIT:
        return Object.assign({},state,{          
          result: modifyResult,
          respone: action.updateRow
        });

      case ActionTypes.GETMODIFYDATA:
          return Object.assign({},state,{    
            dataresult: action.modifyData,
          });

    default:
      return state;
  }
};
