import * as WebApi from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import * as Utils from '../utils'
import {showMessageBox} from './notification'
import {showPopup} from './popup'

const {ActionTypes} = require('../core/constants')

const OddlotEnquiry = {"mvResult":null,"oddLotList":[{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"798","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"1232132","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"VNM","stockName":"CTCP SUA VIET NAM"},{"collectionPrice":"","drawable":"4,306,694","holdQty":"1,128,841","location":"TDCN","marketId":"HO","nominalPrice":"131.000","oddLotQty":"4","settledBal":"5,435,535","stockCode":"123","stockName":"CTCP SUA VIET NAM"}]}

const OddlotHistory = {"historyList":[{"appliedQty":"6","confirmDate":"","createTime":"19\/05\/2016 11:47:10","fee":"0.000","instrumentId":"STB","lastApprovalTime":"19\/05\/2016 11:47:10","lastModifiedTime":"19\/05\/2016","locationId":"TDCN","marketId":"HO","price":"0E-9","settleAmt":"0.000","status":"H","valueDate":""},{"appliedQty":"2","confirmDate":"","createTime":"18\/05\/2016 16:51:11","fee":"0.000","instrumentId":"DPM","lastApprovalTime":"19\/05\/2016 11:47:10","lastModifiedTime":"19\/05\/2016","locationId":"TDCN","marketId":"HO","price":"0E-9","settleAmt":"0.000","status":"H","valueDate":""},{"appliedQty":"40","confirmDate":"","createTime":"18\/05\/2016 16:21:17","fee":"0.000","instrumentId":"ACB","lastApprovalTime":"19\/05\/2016 11:47:10","lastModifiedTime":"19\/05\/2016","locationId":"TDCN","marketId":"HA","price":"0E-9","settleAmt":"0.000","status":"H","valueDate":""},{"appliedQty":"4","confirmDate":"","createTime":"10\/08\/2015 16:48:35","fee":"0.000","instrumentId":"HAG","lastApprovalTime":"19\/05\/2016 11:47:10","lastModifiedTime":"19\/05\/2016","locationId":"TDCN","marketId":"HO","price":"0E-9","settleAmt":"0.000","status":"H","valueDate":""},{"appliedQty":"26","confirmDate":"","createTime":"26\/06\/2014 10:14:27","fee":"0.126","instrumentId":"KLS","lastApprovalTime":"26\/06\/2014 10:14:27","lastModifiedTime":"26\/06\/2014","locationId":"TDCN","marketId":"HA","price":"9.672000000","settleAmt":"251.346","status":"H","valueDate":""},{"appliedQty":"46","confirmDate":"","createTime":"26\/06\/2014 10:14:27","fee":"0.169","instrumentId":"XMC","lastApprovalTime":"26\/06\/2014 10:14:27","lastModifiedTime":"26\/06\/2014","locationId":"TDCN","marketId":"HA","price":"7.347000000","settleAmt":"337.793","status":"H","valueDate":""},{"appliedQty":"9","confirmDate":"","createTime":"26\/06\/2014 10:14:27","fee":"0.531","instrumentId":"VNM","lastApprovalTime":"26\/06\/2014 10:14:27","lastModifiedTime":"26\/06\/2014","locationId":"TDCN","marketId":"HO","price":"117.900000000","settleAmt":"1,060.569","status":"H","valueDate":""},{"appliedQty":"32","confirmDate":"04\/09\/2013","createTime":"11\/12\/2013 10:09:04","fee":"0.298","instrumentId":"ACB","lastApprovalTime":"11\/12\/2013 10:09:04","lastModifiedTime":"19\/12\/2013","locationId":"TDCN","marketId":"HA","price":"18.600000000","settleAmt":"594.902","status":"D","valueDate":"29\/08\/2013"},{"appliedQty":"35","confirmDate":"04\/09\/2013","createTime":"11\/12\/2013 10:09:04","fee":"0.169","instrumentId":"KLS","lastApprovalTime":"11\/12\/2013 10:09:04","lastModifiedTime":"19\/12\/2013","locationId":"TDCN","marketId":"HA","price":"9.670000000","settleAmt":"338.281","status":"D","valueDate":"29\/08\/2013"},{"appliedQty":"70","confirmDate":"04\/09\/2013","createTime":"11\/12\/2013 10:09:04","fee":"0.257","instrumentId":"XMC","lastApprovalTime":"11\/12\/2013 10:09:04","lastModifiedTime":"19\/12\/2013","locationId":"TDCN","marketId":"HA","price":"7.340000000","settleAmt":"513.543","status":"D","valueDate":"29\/08\/2013"},{"appliedQty":"90","confirmDate":"04\/09\/2013","createTime":"11\/12\/2013 10:09:04","fee":"0.213","instrumentId":"CHP","lastApprovalTime":"11\/12\/2013 10:09:04","lastModifiedTime":"19\/12\/2013","locationId":"TDCN","marketId":"OTC","price":"4.740000000","settleAmt":"426.387","status":"D","valueDate":"29\/08\/2013"},{"appliedQty":"20","confirmDate":"23\/10\/2012","createTime":"01\/04\/2013 16:57:01","fee":"0.238","instrumentId":"ACB","lastApprovalTime":"01\/04\/2013 16:57:01","lastModifiedTime":"01\/04\/2013","locationId":"TDCN","marketId":"HA","price":"23.800000000","settleAmt":"475.762","status":"D","valueDate":"23\/10\/2012"},{"appliedQty":"76","confirmDate":"23\/10\/2012","createTime":"01\/04\/2013 16:57:01","fee":"0.367","instrumentId":"KLS","lastApprovalTime":"01\/04\/2013 16:57:01","lastModifiedTime":"01\/04\/2013","locationId":"TDCN","marketId":"HA","price":"9.670000000","settleAmt":"734.553","status":"D","valueDate":"23\/10\/2012"},{"appliedQty":"10","confirmDate":"12\/10\/2012","createTime":"28\/01\/2013 14:33:19","fee":"0.119","instrumentId":"ACB","lastApprovalTime":"28\/01\/2013 14:33:19","lastModifiedTime":"28\/01\/2013","locationId":"TDCN","marketId":"HA","price":"23.800000000","settleAmt":"237.881","status":"D","valueDate":"12\/10\/2012"}],"mvCurrentPage":0,"mvPage":null,"mvResult":null,"mvReturnCode":0,"totalCount":"14"}
export function getOddlotEnquiry(params) {
    return (dispatch)=>{
      WebApi.post(ACTION.ENQUIRYODDLOT,params, dispatch,responseOddLotEnquiry )
    }
}
export function getOddlotHistory(params) {
  return (dispatch)=>{
    WebApi.post(ACTION.ODDLOTHISTORYENQUIRY,params, dispatch,responseOddlotHistory )
  }
}

export function submitOddLot(params) {
  var mvOddList;
  var oddLotData = params.oddLotData
  var annoucementId = params.annoucementId
  var authParams = params.authParams
  var mvInterfaceSeq = params.mvInterfaceSeq
  var language = params.language
  var me = params.me
  var popup = params.popup

  if (oddLotData && oddLotData.length > 0) {
    mvOddList = new Array()
    for (var i = 0; i < oddLotData.length; i++) {
        var data = oddLotData[i]
        mvOddList[i] = data.marketId + "|" + data.stockCode + "|" + data.location + "|" + data.oddLotQty;
    }
  }

  var _params = {
    "mvOddList": mvOddList,
    "annoucementId": annoucementId,
    'mvInterfaceSeq': mvInterfaceSeq,
    'mvSeriNo': authParams.matrixKey01 + '|' + authParams.matrixKey02,
    'mvAnswer': authParams.matrixValue01 + '|' + authParams.matrixValue02,
    'mvSaveAuthenticate' : authParams.savedAuthen
  }

  var responseOddLotSubmit = function(response){
    if (response.mvReturnCode != 0 || response.mvResult != "true") {
      
          if (response.mvResult == "false") {
            return (dispatch) => {
              dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.registerFail))
            }
          }
          else {
            return (dispatch) => {
              dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.returnError[response.mvReturnCode]))
            }
          }
         
          //oddLotConfirmWin.resetWindow();
      }
      else {
        popup.closePopup()
        me.reloadData()
        return (dispatch) => {
          dispatch(showMessageBox(language.messagebox.title.info, language.messagebox.message.registerSuccess))
        } 
      }
  }

  return (dispatch)=>{
    WebApi.post(ACTION.SUBMITODDLOT,_params, dispatch, responseOddLotSubmit )
  }
}

export function getBankInfo(params) {

  var callback = function(response){
    response.mvBankInfoList.unshift(      
      {'mvBankID': "", 'mvBankACID': "", 'mvSettlementAccountDisplayName': "MAS", 'mvIsDefault': "N", 'mvInterfaceSeq': "-1"}    
    )
    return {
      type: ActionTypes.BANKINFO,
      bankinfo: response,
    }
  }

  return(dispatch) => {
    WebApi.get(ACTION.QUERYBANKINFO, params, dispatch, callback)
  }
}



function responseOddLotEnquiry(response){
  return {
    type: ActionTypes.ODDLOTENQUIRY,
    oddlotenquiry: response,
  }
}

function responseOddlotHistory(response){
  return {
    type: ActionTypes.ODDLOTHISTORY,
    oddlothistory: response,
  }
}


export function beforeRegisterOddLot(params){
  var language = params.language
  var data = params.data

  var process = function(response){
    
    if (response.annoucementId && response.annoucementId.trim().length > 0) {

        data['annoucementId'] = response.annoucementId
        return (dispatch) => {
          dispatch(showPopup({
            data: data,
            title: language.oddlottrading.popup.title,
            language: language,
            id: 'oddlottrading',
            authcard: false
          }))
        }
    }
    else {
      return (dispatch) => {
        dispatch(showMessageBox(language.messagebox.title.error, language.messagebox.message.notAnnouncement))
      }
    }
  }

  return (dispatch) => {
    WebApi.post(ACTION.GETANNOUNCEMENT, [], dispatch, process)
  }
}
