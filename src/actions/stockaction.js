import * as api from '../api/web_service_api'
import config from '../core/config'

const { ActionTypes } = require('../core/constants');

const stockList = { "mvIsEnableMultiMarket": true, "mvResult": null, "stockSearchList": [{ "lotSize": "100", "mvMarketID": "HA", "stockCode": "ACB", "stockName": "Ngân hàng Thương mại Cổ phần Á Châu" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "ADC", "stockName": "CTCP Mỹ Thuật và Truyền Thông" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "AGC", "stockName": "Công ty cổ phần cà phê An Giang" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "ALT", "stockName": "Công ty Cổ phần Văn hoá Tân Bình" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "ALV", "stockName": "ALV - Cổ phiếu CTCP Khoáng sản Vinas A Lưới" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "AMC", "stockName": "Khoáng sản Á Châu" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "AME", "stockName": "AME - CTCP Alphanam Cơ Điện" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "AMV", "stockName": "CTCP Sản xuất kinh doanh dược và Thiết bị y tế Việt Mỹ" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "APG", "stockName": "CTCP Chứng khoán An Phát" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "APP", "stockName": "APP - CTCP Phát triển Phụ gia và Sản phẩm Dầu mỏ" }, { "lotSize": "100", "mvMarketID": "HA", "stockCode": "APS", "stockName": "CTCP Chứng khoán Châu Á - Thái Bình Dương" }] }


const derivativeList = [
    {stockCode: "VN30F1803", stockName: "VN30F1803", mvMarketID: "HO"},
    {stockCode: "VN30F1804", stockName: "VN30F1804", mvMarketID: "HO"},
    {stockCode: "VN30F1806", stockName: "VN30F1806", mvMarketID: "HO"},
    {stockCode: "VN30F1809", stockName: "VN30F1809", mvMarketID: "HO"},
]

export function stockSearch(param) {
    // console.log(param)
    return function (dispatch) {
        api.post('stockSearch.action', param, dispatch, 
        function(response) {
            // console.log("AAAAAAAAAAAAA", response)
            if(response == undefined || response.stockSearchList.length < 0) {
                return (dispath) => dispatch(stockSearch(param))
            } else {
                let tmp = response
                tmp.stockSearchList = tmp.stockSearchList.concat(derivativeList)
                config.cache.stockList = tmp.stockSearchList
                return {
                    type: ActionTypes.STOCKSEARCH,
                    stockList:tmp
                }   
            }
        },
        function(err) {
            // console.log("FAILLLLLLLLLL STOCK SEARCHHHHH")
            return (dispatch) => dispatch(stockSearch(param))
        })
    }
}

function stockListResponse(response) {
    
}

export function getStockWatchInfo(stockInfo) {
    var response = (stockWatchData) => {
        return {
            type: ActionTypes.STOCKWATCHDATAUPDATE,
            data: stockWatchData
        }
    }

    var param = {
        mvInstrument: stockInfo.stockCode,
        mvMarketId: stockInfo.mvMarketID,
        mvBS: 'B',
        mvEnableGetStockInfo: 'N',
        mvAction: 'OI,BP',
        key: new Date(),
    }

    return function (dispatch) {
        api.post('stockInfo.action', param, dispatch, response)
    }
}

export function sendStockToStockMarketInfoWidget(stockInfo) {

    var param = {
        mvInstrument: stockInfo.stockCode,
        mvMarketId: stockInfo.mvMarketID,
        mvBS: 'B',
        mvEnableGetStockInfo: 'N',
        mvAction: 'OI,BP',
        key: new Date(),
    }
    return function (dispatch) {
        api.post('stockInfo.action', param, dispatch, function(res) {
            return {
                type: ActionTypes.STOCKMARKET,
                stockInfo: stockInfo,
                data: res
            }
        })
    }
}
