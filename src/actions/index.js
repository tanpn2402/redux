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
import {getOddlotEnquiry,getOddlotHistory,getOddLotSubmit} from './oddlottrading'
import {getFundtransfer, gethksCachTranHis, getGenfundtransfer, getCancelfundtransfer} from './cashtransfer'
import { enquiryMarginLoan } from './marginloan'
import {avaiblemarginlist} from './avaiblemarginlist'
import {getStockInfo, getAccountBalance} from './accountinfo'
import {showNotif} from './notification'
import {getRightlist, getAdditionalshareinfo, getHistorylist, getDynamicdata} from './entitlement'
import {getLocalRefund,getLocalAdvance,getLoanRefundHistory,getLoanRefundSubmit,getAdvanceSubmit} from './loanrefund'
import {getCashAdvance} from './cashadvance'

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
  showNotif,
  loadWatchList,
  addStock, 
  removeStock,
  
  getOddlotEnquiry,
  getOddlotHistory,
  getOddLotSubmit,

  getFundtransfer,
  gethksCachTranHis,
  getGenfundtransfer,
  getCancelfundtransfer,

  getLocalRefund,
  getLocalAdvance,
  getLoanRefundHistory,
  getLoanRefundSubmit,
  getAdvanceSubmit,

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
  
};