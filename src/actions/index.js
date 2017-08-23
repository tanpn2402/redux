import { doLogin,logout } from './doLogin'
import {menuSelected, menuRemoved, onPageClicked, pinWindow} from './menu_selected'
import {changeConfig} from './configurations'
import { enquiryOrder, cancelOrder, onCancelSubmit, onModifySubmit, openPopup, getEnquiry, getEnquiryData, getMsgError, submitCancel, getError } from './orderjounal'
import {changePage} from './pagination'
import { accountBalance, stockInfo, stockInfoBuy, checkPreEnterOrder, setPopup, getstockInfo, getStockB, submitEnterOrder } from './enterorder'
import { setAuthenFail, checkAuthen, getMatrixCard, matrixCardResponse } from './authmatrix'
import {stockSearch} from './stockaction'
import { onConfirmSubmit, enquiryConfirmOrder, getOrderCofirm, getData } from './confirmorder'
import {getPorfolio} from './porfolio'
import {enquiryOrderHistory,} from './orderhistory'
import {enquiryCashTransaction} from './cashtranshistory'
import { enquiryStockStatement } from './stockstatement'
import { enquiryCashStatement} from './cashstatement'
import {loadWatchList} from './watchlist'
import {getProfile} from './profile'
import {getOddlotEnquiry,getOddlotHistory,onOddLotSubmit} from './oddlottrading'
import {getCashtransfer, getCashdatatable} from './cashtransfer'

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
  loadWatchList,
  getProfile,
  getOddlotEnquiry,
  getOddlotHistory,
  onOddLotSubmit,
  getCashtransfer,
  getCashdatatable,
  getstockInfo,
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
};