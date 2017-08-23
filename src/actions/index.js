import { doLogin,logout } from './doLogin'
import {menuSelected, menuRemoved, onPageClicked, pinWindow} from './menu_selected'
import {changeConfig} from './configurations'
import {enquiryOrder, cancelOrder, onCancelSubmit, onModifySubmit, getModifyData, openPopup} from './orderjounal'
import {changePage} from './pagination'
import { accountBalance, stockInfo, stockInfoBuy, checkPreEnterOrder,setPopup} from './enterorder'
import { setAuthenFail, checkAuthen} from './authmatrix'
import {stockSearch} from './stockaction'
import { onConfirmSubmit, enquiryConfirmOrder } from './confirmorder'
import {getPorfolio} from './porfolio'
import {enquiryOrderHistory,} from './orderhistory'
import {enquiryCashTransaction} from './cashtranshistory'
import { enquiryStockStatement } from './stockstatement'
import { enquiryCashStatement} from './cashstatement'
import {loadWatchList,addStock, removeStock} from './watchlist'
import {getClientInfo, changePassword} from './profile'
import {getOddlotEnquiry,getOddlotHistory,onOddLotSubmit} from './oddlottrading'
import {getCashtransfer, getCashdatatable} from './cashtransfer'
import {getRightlist, getAdditionalshareinfo, getHistorylist} from './entitlement'

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
  getModifyData,
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
  addStock,
  removeStock,
  getClientInfo,
  changePassword,
  getOddlotEnquiry,
  getOddlotHistory,
  onOddLotSubmit,
  getCashtransfer,
  getCashdatatable,

  getRightlist, 
  getAdditionalshareinfo, 
  getHistorylist,
  
};