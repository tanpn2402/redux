import { doLogin, doLogout, checkAuth, checkSession } from './dologin'
import { menuSelected, menuRemoved, onPageClicked, pinWindow, onTabClick, getSavedContentLayout, 
    saveLayout, reloadCustom, openSideMenu, openSearch, onMobileMenuSelect } from './menu_selected'
import { switchLanguage, switchTheme } from './configurations'
import { getEnquiry, genModifyOrder, onCancelSubmit, onModifySubmit } from './orderjounal'
import { accountBalance, stockInfo, genEnterOrder, enterOrderSubmit, checkAuthentication } from './enterorder'
import { setAuthenFail, checkAuthen, getMatrixCard, matrixCardResponse } from './authmatrix'
import { stockSearch, getStockWatchInfo } from './stockaction'
import { onConfirmSubmit, getOrderCofirm, exportOrderConfirm } from './confirmorder'
import { getPorfolio } from './porfolio'
import { enquiryOrderHistory, exportOrderHistory } from './orderhistory'
import { enquiryCashTransaction, exportGetCashTransactionHistory } from './cashtranshistory'
import { enquiryStockStatement, exportTransactionHistory } from './stockstatement'
import { enquiryCashStatement, exportCashTransactionHistory } from './cashstatement'
import { loadWatchList, addStock, removeStock } from './watchlist'
import { getClientInfo, changePassword } from './profile'
import { getOddlotEnquiry, getOddlotHistory, submitOddLot, getBankInfo, beforeRegisterOddLot } from './oddlottrading'
import { getFundtransfer, gethksCachTranHis, getGenfundtransfer, getCancelfundtransfer, beforeCancelFundTransfer, 
  beforeSubmitCashTransfer, submitCashTransfer, CancelCashtransfer } from './cashtransfer'
import { enquiryMarginLoan } from './marginloan'
import { avaiblemarginlist } from './avaiblemarginlist'
import { getStockInfo, getAccountBalance, getAccountBalanceBank, getOverdueDebt, getUpComingDebt } from './accountinfo'
import { showMessageBox, showFlashPopup } from './notification'
import {
  getRightlist, getAdditionalshareinfo, getEntitlementHistorylist, getEntitlementStockList,
  entitlementGetAccountBalance, getEntitlementData, submitEntitlement
} from './entitlement'
import { getLocalRefundCreation, getLocalAdvanceCreation, getLoanRefundHistory, 
    getLoanRefundData, beforeSubmitLoanRefund, doSubmitLoanRefund } from './loanrefund'
import { getCashAdvance, getQuerySoldOrders, beforeSubmitCashAdvance, submitCashAdvance } from './cashadvance'
import { getqueryAdvancePaymentInfo, getqueryBankInfo, calculateInterest, beforeSubmitCashAdvBank, 
    submitCashAdvanceBank, paymentSelectionChange } from './cashadvancebank'

import { showPopup } from './popup'

export {
  reloadCustom,
  getSavedContentLayout,
  saveLayout,

  // doLogin
  doLogin,
  doLogout,
  checkAuth,
  checkSession,

  // menu selected
  menuSelected,
  menuRemoved,
  onPageClicked,
  onTabClick,
  openSideMenu,
  openSearch,
  onMobileMenuSelect,
  
  // configuration
  switchLanguage,
  switchTheme,

  // stock action
  stockSearch,
  getStockWatchInfo,
  
  accountBalance,
  stockInfo,
  genEnterOrder,
  enterOrderSubmit,
  checkAuthentication,
  setAuthenFail,
  checkAuthen,
  pinWindow,

  // order confirmation
  onConfirmSubmit,
  getOrderCofirm,

  //porfolio
  getPorfolio,

  //orderhistory
  enquiryOrderHistory,

  //cashtranshistory
  enquiryCashTransaction,

  //stockStatement
  enquiryStockStatement,

  //cashstatement
  enquiryCashStatement,

  getClientInfo,
  changePassword,
  getMatrixCard,
  matrixCardResponse,

  // order journal
  getEnquiry,
  genModifyOrder,
  onCancelSubmit,
  onModifySubmit,

  // margin loan
  enquiryMarginLoan,
  avaiblemarginlist,

  // account info
  getAccountBalance,
  getAccountBalanceBank,
  getStockInfo,
  getUpComingDebt,
  getOverdueDebt,

  // watch list
  loadWatchList,
  addStock,
  removeStock,

  // odd lot tranding
  getOddlotEnquiry,
  getOddlotHistory,
  submitOddLot,
  getBankInfo,
  beforeRegisterOddLot,

  // fund transfer
  getFundtransfer,
  gethksCachTranHis,
  getGenfundtransfer,
  getCancelfundtransfer,
  beforeCancelFundTransfer,
  beforeSubmitCashTransfer,
  submitCashTransfer,
  CancelCashtransfer,

  // loan refund
  getLocalRefundCreation,
  getLocalAdvanceCreation,
  getLoanRefundHistory,
  getLoanRefundData,
  beforeSubmitLoanRefund,
  doSubmitLoanRefund,

  // entitlement
  getRightlist,
  getAdditionalshareinfo,
  getEntitlementHistorylist,
  getEntitlementStockList,
  getEntitlementData,
  submitEntitlement,
  entitlementGetAccountBalance,

  // advance payment
  getCashAdvance,
  getQuerySoldOrders,
  beforeSubmitCashAdvance,
  submitCashAdvance,

  // advance payment bank
  getqueryAdvancePaymentInfo,
  getqueryBankInfo,
  calculateInterest,
  beforeSubmitCashAdvBank,
  submitCashAdvanceBank,
  paymentSelectionChange,

  // export report
  exportGetCashTransactionHistory,
  exportOrderHistory,
  exportCashTransactionHistory,
  exportTransactionHistory,
  exportOrderConfirm,

  // popup + notifications
  showPopup,
  showMessageBox,
  showFlashPopup,
};