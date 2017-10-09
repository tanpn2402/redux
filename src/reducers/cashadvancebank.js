const {ActionTypes} = require('../core/constants');

const initialState = {
    queryAdvancePaymentInfo: {
        mvChildBeanList: [],
        mvErrorCode: null,
        mvErrorResult: 'fail',
        mvParentBean: null,
        success: true
    },
    // CashAdvanceHistory: {
    //     list: [],
    //     totalCount: 0
    // },
    queryBankInfo: {
        mvBankInfoList: [],
        mvErrorCode: '0',
        mvErrorResult: 'fail',
        success: true
    },
    calculateInterestAmt: {
        mvErrorCode: null,
        mvErrorResult: "fail",
        mvInterestAmt: "0",
        success: false
    },
    paymentSelected: [],
    key: 1
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.QUERYADVANCEPAYMENTINFO:
            return Object.assign({}, state, {
                queryAdvancePaymentInfo: action.queryAdvancePaymentInfo,
            });
        case ActionTypes.QUERYBANKINFO:
            return Object.assign({}, state, {
                queryBankInfo: action.queryBankInfo,
            })
        case ActionTypes.CALCULATEINTERSETAMT:
            return Object.assign({}, state, {
                calculateInterestAmt: action.calculateInterestAmt,
            })
        case ActionTypes.PAYMENTSELECTED:
            console.log(action)
            return Object.assign({}, state, {
                paymentSelected: action.data,
                key: (new Date()).getTime()
            })

        default:
            return state;
    }
};