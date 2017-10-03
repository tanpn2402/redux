import { doLogin, logout } from './doLogin'
import { menuSelected, menuRemoved, onPageClicked, pinWindow, onTabClick, getSavedContentLayout, saveLayout, reloadCustom } from './menu_selected'
import { changeConfig, checkSession } from './configurations'
import { enquiryOrder, cancelOrder, onCancelSubmit, onModifySubmit, openPopup, getEnquiry, getEnquiryData, getMsgError, submitCancel, getError } from './orderjounal'
import { changePage } from './pagination'
import { accountBalance, stockInfo, stockInfoBuy, checkPreEnterOrder, setPopup, getstockInfo, getStockB, submitEnterOrder } from './enterorder'
import { setAuthenFail, checkAuthen, getMatrixCard, matrixCardResponse } from './authmatrix'
import { stockSearch } from './stockaction'
import { onConfirmSubmit, enquiryConfirmOrder, getOrderCofirm, getData, exportOrderConfirm } from './confirmorder'
import { getPorfolio } from './porfolio'
import { enquiryOrderHistory, exportOrderHistory } from './orderhistory'
import { enquiryCashTransaction, exportGetCashTransactionHistory } from './cashtranshistory'
import { enquiryStockStatement, exportTransactionHistory } from './stockstatement'
import { enquiryCashStatement, exportCashTransactionHistory } from './cashstatement'
import { loadWatchList,addStock, removeStock} from './watchlist'
import { getClientInfo, changePassword} from './profile'
import { getOddlotEnquiry,getOddlotHistory,submitOddLot,getBankInfo , beforeRegisterOddLot} from './oddlottrading'
import { getFundtransfer, gethksCachTranHis, getGenfundtransfer, getCancelfundtransfer,beforeCancelFundTransfer,beforeSubmitCashTransfer, submitCashTransfer, CancelCashtransfer} from './cashtransfer'
import { enquiryMarginLoan } from './marginloan'
import {avaiblemarginlist} from './avaiblemarginlist'
import { getStockInfo, getAccountBalance, getAccountBalanceBank, getOverdueDebt, getUpComingDebt} from './accountinfo'
import {showMessageBox, showFlashPopup} from './notification'
import {getRightlist, getAdditionalshareinfo, getEntitlementHistorylist, getDynamicdata, getEntitlementStockList, 
      entitlementGetAccountBalance, getEntitlementData, submitEntitlement} from './entitlement'
import {getLocalRefundCreation,getLocalAdvanceCreation,getLoanRefundHistory,getLoanRefundSubmit,getAdvanceSubmit,getLoanRefundData,    beforeSubmitLoanRefund, beforeSubmitAdvance} from './loanrefund'
import {getCashAdvance, getQuerySoldOrders/*, getLocalAdvanceCreation*/, beforeSubmitCashAdvance, submitCashAdvance} from './cashadvance'
import {getqueryAdvancePaymentInfo, getqueryBankInfo, calculateInterest, beforeSubmitCashAdvBank, submitCashAdvanceBank} from './cashadvancebank'

export {
  reloadCustom,
  getSavedContentLayout,
  saveLayout,
  doLogin,
  logout,
  menuSelected,
  menuRemoved,
  onPageClicked,
  onTabClick,
  changeConfig,
  checkSession,
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
  CancelCashtransfer,
  getMsgError,
  getError,
  submitEnterOrder,
  enquiryMarginLoan,
  avaiblemarginlist,
  getAccountBalance,
  getAccountBalanceBank,
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
  submitOddLot,
  getBankInfo,
  beforeRegisterOddLot,

  getFundtransfer,
  gethksCachTranHis,
  getGenfundtransfer,
  getCancelfundtransfer,
  beforeCancelFundTransfer,
  beforeSubmitCashTransfer,
  submitCashTransfer,

  getLocalRefundCreation,
  getLoanRefundHistory,
  getLoanRefundSubmit,
  getAdvanceSubmit,
  getLoanRefundData,
  beforeSubmitLoanRefund,
  beforeSubmitAdvance,
  getRightlist,
  getAdditionalshareinfo,
  getEntitlementHistorylist,
  getDynamicdata,
  getEntitlementStockList,
  getEntitlementData,
  submitEntitlement,
  
  entitlementGetAccountBalance,
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
  calculateInterest,
  beforeSubmitCashAdvBank,
  submitCashAdvanceBank,
  
};