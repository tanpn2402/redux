const {ActionTypes} = require('../core/constants');

const initialState = {
  data: [],
};
const modifyResult={"mvResult":null,"mvReturnResult":"ModifyOrderFail","returnCode":0,"savedAuthen":"true","success":true}
export default function (state = initialState, action) {
  switch (action.type) {
      case ActionTypes.ENQUIRYORDER:
      //console.log('ENQUIRYORDER', action.data)
        return Object.assign({},state,{          
          data: action.data,
          language: action.language,
          reload: action.reload,
          menuid: action.menuid,
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

      case ActionTypes.OPENPOPUP:
          return Object.assign({},state,{    
            isPopupOpen: false,
            menuid: action.menuid
          });

    default:
      return state;
  }
};
