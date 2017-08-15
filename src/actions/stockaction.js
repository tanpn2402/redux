import * as api from '../api/web_service_api'
const {ActionTypes} = require('../core/constants');

const stockList = {"mvIsEnableMultiMarket":true,"mvResult":null,"stockSearchList":[{"lotSize":"100","mvMarketID":"HA","stockCode":"ACB","stockName":"Ngân hàng Thương mại Cổ phần Á Châu"},{"lotSize":"100","mvMarketID":"HA","stockCode":"ADC","stockName":"CTCP Mỹ Thuật và Truyền Thông"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AGC","stockName":"Công ty cổ phần cà phê An Giang"},{"lotSize":"100","mvMarketID":"HA","stockCode":"ALT","stockName":"Công ty Cổ phần Văn hoá Tân Bình"},{"lotSize":"100","mvMarketID":"HA","stockCode":"ALV","stockName":"ALV - Cổ phiếu CTCP Khoáng sản Vinas A Lưới"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AMC","stockName":"Khoáng sản Á Châu"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AME","stockName":"AME - CTCP Alphanam Cơ Điện"},{"lotSize":"100","mvMarketID":"HA","stockCode":"AMV","stockName":"CTCP Sản xuất kinh doanh dược và Thiết bị y tế Việt Mỹ"},{"lotSize":"100","mvMarketID":"HA","stockCode":"APG","stockName":"CTCP Chứng khoán An Phát"},{"lotSize":"100","mvMarketID":"HA","stockCode":"APP","stockName":"APP - CTCP Phát triển Phụ gia và Sản phẩm Dầu mỏ"},{"lotSize":"100","mvMarketID":"HA","stockCode":"APS","stockName":"CTCP Chứng khoán Châu Á - Thái Bình Dương"}]}


export function stockSearch(param) {
  	console.log('stockSearch Action')
    return function (dispatch) {
    	dispatch( api.post('stockSearch.action', param, dispatch,stockListResponse) )
    }
}

export function stockListResponse(response){
	console.log('stockListResponse' ,response)
	return {
      type: ActionTypes.STOCKSEARCH,
      stockList: response
    }
}
