const {ActionTypes} = require('../core/constants');

const initialState = {
    data: {
        accountBalanceLoopList: [],
        marketValueList: [],
        
    },
};

export default function (state = initialState, action) {
  	switch (action.type) {
    	case ActionTypes.ACCOUNTBALANCEENQUIRY:
            
        	return Object.assign({},state,{
          		data: action.data,
        	});

    	default:
      		return state;
  }
};
