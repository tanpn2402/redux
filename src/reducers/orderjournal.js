const { ActionTypes } = require('../core/constants');

const initialState = {
  data: [],
  isError: "nothing",
  isCount: 0,
  isSuccess: false,
};
const modifyResult = { "mvResult": null, "mvReturnResult": "ModifyOrderFail", "returnCode": 0, "savedAuthen": "true", "success": true }
export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENQUIRYORDER:
      //console.log('ENQUIRYORDER', action.data)
      return Object.assign({}, state, {
        data: action.data,
        language: action.language,
        reload: action.reload,
        menuid: action.menuid,
      });

    case ActionTypes.CANCELSUBMIT:
      return Object.assign({}, state, {
        returnCode: '1',
        message: "ok"
      });
    case ActionTypes.MODIFYSUBMIT:
      return Object.assign({}, state, {
        result: modifyResult,
        respone: action.updateRow
      });

    case ActionTypes.MODIFYERROR:
      console.log(action.count, action.data, "count reducer");
      return Object.assign({}, state, {
        isError: action.data,
        isCount: action.count,
      });

    case ActionTypes.MODIFYSUCCESS:
      console.log(action.data,"Success")
      return Object.assign({}, state, {
        isSuccess: action.data,
      });
      
    case ActionTypes.OPENPOPUP:
      return Object.assign({}, state, {
        isPopupOpen: false,
        menuid: action.menuid
      });

    default:
      return state;
  }
};
