import { doLogin,logout } from './doLogin'
import {menuSelected, menuRemoved, onPageClicked, pinWindow} from './menu_selected'
import {changeConfig} from './configurations'
import { enquiryOrder, cancelOrder, onCancelSubmit, onModifySubmit, openPopup, getEnquiry, getEnquiryData, getMsgError, submitCancel, getError } from './orderjounal'
import {changePage} from './pagination'
import { accountBalance, stockInfo, stockInfoBuy, checkPreEnterOrder, setPopup, getstockInfo, getStockB, submitEnterOrder } from './enterorder'
import { setAuthenFail, checkAuthen, getMatrixCard, matrixCardResponse } from './authmatrix'
import {stockSearch} from './stockaction'
import { onConfirmSubmit, enquiryConfirmOrder, getOrderCofirm, getData, exportOrderConfirm } from './confirmorder'
import {getPorfolio} from './porfolio'
import { enquiryOrderHistory, exportOrderHistory } from './orderhistory'
import { enquiryCashTransaction, exportGetCashTransactionHistory } from './cashtranshistory'
import { enquiryStockStatement, exportTransactionHistory } from './stockstatement'
import { enquiryCashStatement, exportCashTransactionHistory } from './cashstatement'
import {loadWatchList,addStock, removeStock} from './watchlist'
import {getClientInfo, changePassword} from './profile'
import {getOddlotEnquiry,getOddlotHistory,getOddLotSubmit,getBankInfo} from './oddlottrading'
import {getFundtransfer, gethksCachTranHis, getGenfundtransfer, getCancelfundtransfer} from './cashtransfer'
import { enquiryMarginLoan } from './marginloan'
import {avaiblemarginlist} from './avaiblemarginlist'
import {getStockInfo, getAccountBalance, getOverdueDebt, getUpComingDebt} from './accountinfo'
import {showMessageBox, showFlashPopup} from './notification'
import {getRightlist, getAdditionalshareinfo, getHistorylist, getDynamicdata} from './entitlement'
import {getLocalRefund,getLocalAdvance,getLoanRefundHistory,getLoanRefundSubmit,getAdvanceSubmit,getLoanRefundData} from './loanrefund'
import {getCashAdvance, getQuerySoldOrders, getLocalAdvanceCreation, beforeSubmitCashAdvance, submitCashAdvance} from './cashadvance'
import {getqueryAdvancePaymentInfo, getqueryBankInfo} from './cashadvancebank'

export {
  doLogin,
  logout,
  menuSelected,
  menuRemoved,
  onPageClicked,
  changeConfig,
  stockSearch,
  enquiryOrder,
  accountBalance,
  stockInfo,
  stockInfoBuy,
  checkPreEnterOrder,
  setAuthenFail,
  checkAuthen,
  cancelOrder,
  changePage,
  onCancelSubmit,
  onModifySubmit,
  pinWindow,
  openPopup,
  onConfirmSubmit,
  enquiryConfirmOrder,
  getPorfolio,
  enquiryOrderHistory,
  enquiryCashTransaction,
  enquiryStockStatement,
  enquiryCashStatement,
  getClientInfo,
  getstockInfo,
  changePassword,
  getMatrixCard,
  matrixCardResponse,
  getStockB,
  getOrderCofirm,
  getData,
  getEnquiry,
  getEnquiryData,
  submitCancel,
  getMsgError,
  getError,
  submitEnterOrder,
  enquiryMarginLoan,
  avaiblemarginlist,
  getAccountBalance,
  getStockInfo,
  getUpComingDebt,
  getOverdueDebt,
  showMessageBox,
  showFlashPopup,
  loadWatchList,
  addStock, 
  removeStock,
  
  getOddlotEnquiry,
  getOddlotHistory,
  getOddLotSubmit,
  getBankInfo,
  getFundtransfer,
  gethksCachTranHis,
  getGenfundtransfer,
  getCancelfundtransfer,

  getLocalRefund,
  getLocalAdvance,
  getLoanRefundHistory,
  getLoanRefundSubmit,
  getAdvanceSubmit,
  getLoanRefundData,
  getRightlist,
  getAdditionalshareinfo,
  getHistorylist,
  getDynamicdata,

  getCashAdvance,
  
  exportGetCashTransactionHistory,
  exportOrderHistory,
  exportCashTransactionHistory,
  exportTransactionHistory,
  exportOrderConfirm,
  getQuerySoldOrders,
  getLocalAdvanceCreation,
  beforeSubmitCashAdvance,
  submitCashAdvance,
  getqueryAdvancePaymentInfo,
  getqueryBankInfo,

  
};