const {ActionTypes} = require('../core/constants');

const initialState = {
    data: {
        list: [],
        totalCount: 0
    },
};

export default function (state = initialState, action) {
  	switch (action.type) {
    	case ActionTypes.CASHSTATEMENT:
            action.data.list = action.data.list == null ? [] : action.data.list
            action.data.totalCount = action.data.totalCount == '' ? 0 : action.data.totalCount
        	return Object.assign({},state,{
          		data: action.data,
        	});

    	default:
      		return state;
  }
};
