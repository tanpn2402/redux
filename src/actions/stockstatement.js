const {ActionTypes} = require('../core/constants');

const data = {
    "mvCurrentPage": 1,
    "mvEnableGridHeadMenu": false,
    "mvMessage": null,
    "mvStockStatementList": 
    [
        {
            "mvOrder": 1,
            "mvTransactionDate": "03\/08\/2015 00:00:00",
            "mvStockCode": "ACB",
            "mvAction": "LO",
            "mvCreditQty": 10000,
            "mvCreditAvgPrice": 750,
            "mvCreditAmt": 1500,
            "mvDebitQty": 5000,
            "mvDebitAvgPrice": 500,
            "mvDebitAmt": 1000,
            "mvValue": 100,
            "mvPercentage": 15,
            "mvDescription": "Successful"
        },
        {
            "mvOrder": 2,
            "mvTransactionDate": "03\/08\/2015 00:00:00",
            "mvStockCode": "REE",
            "mvAction": "LO",
            "mvCreditQty": 10000,
            "mvCreditAvgPrice": 750,
            "mvCreditAmt": 1500,
            "mvDebitQty": 5000,
            "mvDebitAvgPrice": 500,
            "mvDebitAmt": 1000,
            "mvValue": 100,
            "mvPercentage": 10,
            "mvDescription": "Successful"
        },
        {
            "mvOrder": 3,
            "mvTransactionDate": "03\/08\/2015 00:00:00",
            "mvStockCode": "SSI",
            "mvAction": "LO",
            "mvCreditQty": 10000,
            "mvCreditAvgPrice": 750,
            "mvCreditAmt": 1500,
            "mvDebitQty": 5000,
            "mvDebitAvgPrice": 500,
            "mvDebitAmt": 1000,
            "mvValue": 100,
            "mvPercentage": 20,
            "mvDescription": "Fail"
        },
    ],
    "mvPage": 
    {
      "nextPage": 1,
      "pageIndex": 1,
      "pageNumbers": null,
      "pageRecords": null,
      "pageSize": 15,
      "prePage": 1,
      "totalPage": 1,
      "totalRec": 0
    },
    "mvResult": null,
}

export function enquiryStockStatement(param, reload) {
    return {
        type: ActionTypes.ENQUIRYSTOCKSTATEMENT,
        data: data,
        reload: reload
    }
}