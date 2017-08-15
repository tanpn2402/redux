const {ActionTypes} = require('../core/constants');

const data = {
    "mvCurrentPage": 1,
    "mvDefaultMarket": "HO",
    "mvEnableGridHeadMenu": false,
    "mvMessage": null,
    "mvOrderBeanList": 
    [
        {
            "mvBS": "Buy",
            "mvCancelQty": "0",
            "mvClientID": null,
            "mvFilledPrice": "0.000",
            "mvFilledQty": "680",
            "mvMarketID": "HO        ",
            "mvOrderBeanID": 0,
            "mvOrderID": "10017450",
            "mvOrderType": "Limit",
            "mvPrice": "12.000",
            "mvQty": "680",
            "mvShortName": null,
            "mvStatus": "FLL",
            "mvStockID": "REE",
            "mvStockName": " - ",
            "mvTradeTime": "03\/08\/2015 00:00:00"
        },
        {
            "mvBS": "Buy",
            "mvCancelQty": "0",
            "mvClientID": null,
            "mvFilledPrice": "0.000",
            "mvFilledQty": "680",
            "mvMarketID": "HO        ",
            "mvOrderBeanID": 1,
            "mvOrderID": "10017450",
            "mvOrderType": "Limit",
            "mvPrice": "12.000",
            "mvQty": "680",
            "mvShortName": null,
            "mvStatus": "FLL",
            "mvStockID": "REE",
            "mvStockName": " - ",
            "mvTradeTime": "03\/08\/2015 00:00:00"
        },
        {
            "mvBS": "Buy",
            "mvCancelQty": "0",
            "mvClientID": null,
            "mvFilledPrice": "0.000",
            "mvFilledQty": "680",
            "mvMarketID": "HO        ",
            "mvOrderBeanID": 2,
            "mvOrderID": "10017450",
            "mvOrderType": "Limit",
            "mvPrice": "12.000",
            "mvQty": "680",
            "mvShortName": null,
            "mvStatus": "FLL",
            "mvStockID": "REE",
            "mvStockName": " - ",
            "mvTradeTime": "03\/08\/2015 00:00:00"
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
    "mvShowOrderGroupID": true,
    "mvTotalOrders": 10
  }

export function enquiryConfirmOrder(param, reload) {
    var d = data;
    var k = data.mvOrderBeanList
    console.log(k)
    var x = k.filter(el => el['mvBSValue'] === param['mvBuysell'] || param['mvBuysell'] === 'ALL')
    console.log(x)
    d.mvOrderBeanList = x
    return {
        type: ActionTypes.ENQUIRYCONFIRMORDER,
        data: d,
        reload: reload
    }
}

export function onConfirmSubmit(param) {
    var _selectedValue=[];
    for(var i=0;i<param.length;i++){
        var tmp={};
        tmp.mvBS=param[i].mvBS;
        tmp.mvOrderID=param[i].mvOrderID;
        _selectedValue.push(tmp)
    }
    console.log(_selectedValue)

    return {
        type: ActionTypes.CONFIRMORDERSUBMIT,
        selectedRows: _selectedValue
    }
}