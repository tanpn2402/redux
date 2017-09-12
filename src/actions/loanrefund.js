import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import {showMessageBox} from './notification'

const {ActionTypes} = require('../core/constants')

const LocalRefund= {"mvLoanBean":{"advAvailable":"4600.630","cashrsv":"0.0","loan":"0.000"}}
const LocalAdvance = {"mvAdvanceBean":{"advAvailable":"4600.630","advFee":"1.840252","advPending":"0","interestRate":"0.040","minInterestRate":"0.000","t0AdvAvailable":"0.000","t0Days":"4","t1AdvAvailable":"4600.630","t1Days":"1","t2AdvAvailable":"0.000","t2Days":"0"},"mvErrorCode":null,"mvErrorResult":"fail","success":true}
const LoanRefundHistory = {"loanrefundhistoryList":[{"lastupdate":"2013-09-20 00:00:00.000000","refundAmt":"1105.734","remark":"For Margin Call","status":"A","tradeDate":"2013-09-20","tranID":"10970438  ","type":"A"},{"lastupdate":"2013-08-30 00:00:00.000000","refundAmt":"2212.241","remark":"For Margin Call","status":"A","tradeDate":"2013-08-30","tranID":"10969106  ","type":"A"},{"lastupdate":"2013-07-01 10:01:58.484000","refundAmt":"100.000","remark":"trả nợ","status":"A","tradeDate":"2012-11-06","tranID":"10077293  ","type":"M"},{"lastupdate":"2013-07-01 10:01:58.390000","refundAmt":"100.000","remark":"","status":"A","tradeDate":"2012-11-06","tranID":"10077292  ","type":"M"},{"lastupdate":"2013-06-10 00:00:00.000000","refundAmt":"284267.537","remark":"For Margin Call","status":"A","tradeDate":"2013-06-10","tranID":"10957991  ","type":"A"},{"lastupdate":"2013-03-22 16:20:32.234000","refundAmt":"3000.000","remark":"TRA NO MARGIN","status":"A","tradeDate":"2012-10-19","tranID":"10077225  ","type":"M"},{"lastupdate":"2013-03-22 16:02:49.250000","refundAmt":"1100.000","remark":"TRA NO MARGIN ","status":"A","tradeDate":"2012-10-19","tranID":"10077224  ","type":"M"},{"lastupdate":"2013-03-22 15:47:20.968000","refundAmt":"1000.000","remark":"","status":"A","tradeDate":"2012-10-19","tranID":"10077223  ","type":"M"},{"lastupdate":"2013-02-05 10:25:58.843000","refundAmt":"50000.000","remark":"","status":"A","tradeDate":"2012-10-18","tranID":"10077221  ","type":"M"},{"lastupdate":"2013-02-04 17:27:08.968000","refundAmt":"400000.000","remark":"trả nợ","status":"A","tradeDate":"2012-10-18","tranID":"10077219  ","type":"M"},{"lastupdate":"2012-11-05 16:41:58.562000","refundAmt":"1000.000","remark":"TEST DUNG 123","status":"A","tradeDate":"2012-09-06","tranID":"10077082  ","type":"M"},{"lastupdate":"2012-11-05 16:28:32.421000","refundAmt":"10000.000","remark":"changing","status":"A","tradeDate":"2012-09-05","tranID":"10077081  ","type":"M"},{"lastupdate":"2012-10-19 14:40:43.421000","refundAmt":"5000.000","remark":"tra no thu","status":"A","tradeDate":"2012-08-30","tranID":"10077045  ","type":"M"},{"lastupdate":"2012-09-18 00:00:00.000000","refundAmt":"14967.014","remark":"For Margin Call","status":"A","tradeDate":"2012-09-18","tranID":"10946755  ","type":"A"},{"lastupdate":"2012-09-07 00:00:00.000000","refundAmt":"65727.188","remark":"For Margin Call","status":"A","tradeDate":"2012-09-07","tranID":"10946494  ","type":"A"}],"totalCount":"17"}

function responseLocalRefund(response) {
    return {
      type: ActionTypes.LOCALREFUND,
      LocalRefund: response,
    }
}

export function getLocalRefund(params) {
  return (dispatch)=>{
      api.get(ACTION.GETLOCALLOANREFUNDCREATION,params,dispatch,responseLocalRefund)
  }
}

function responseLocalAdvance(response) {
    return {
      type: ActionTypes.LOCALADVANCE,
      LocalAdvance: response,
    }
}

export function getLocalAdvance(params) {
  return (dispatch)=>{
      api.get(ACTION.GETLOCALADVANCECREATION,params,dispatch,responseLocalAdvance)
  }
}

function responseLoanRefundData(response) {
    return {
      type: ActionTypes.LOANREFUNDDATA,
      LoanRefundData: response,
    }
}

export function getLoanRefundData(params) {
  return (dispatch)=>{
      api.get(ACTION.GETLOANREFUNDDATA,params,dispatch,responseLoanRefundData)
  }
}

function responseLoanRefundHistory(response) {
    return {
      type: ActionTypes.LOANREFUNDHISTORY,
      LoanRefundHistory: response,
    }
}

export function getLoanRefundHistory(params) {
  return (dispatch)=>{
      api.get(ACTION.GETLOANREFUNDHISTORY,params,dispatch,responseLoanRefundHistory)
  }
}

function responseLoanRefundSubmit(response) {
    return {
      type: ActionTypes.LOANREFUNDSUBMIT,
      LoanRefundHistory: response,
    }
}

export function getLoanRefundSubmit(params) {
  return (dispatch)=>{
    api.post(ACTION.SUBMITLOANREFUNDCREATION,params, dispatch,responseLoanRefundSubmit )
  }
}

function responseAdvanceSubmit(response) {
    return {
      type: ActionTypes.ADVANCESUBMIT,
      LoanRefundHistory: response,
    }
}

export function getAdvanceSubmit(params) {
  return (dispatch)=>{
    api.post(ACTION.SUBMITADVANCEPAYMENTCREATION,params, dispatch,responseAdvanceSubmit )
  }
}
