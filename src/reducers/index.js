import {combineReducers} from 'redux'
import dologin from './dologin'
import { sessionReducer } from 'redux-react-session'
import menuSelected from './menu_selected'
import config from './configurations'
import enterOrder from './enterorder'
import checkAuthen from './checkAuthenReducer'
import orderjournal from './orderjournal'
import pagination from './pagination'
import stock from './stockreducer'
import cashtranshistory from './cashtranshistory'
import orderconfirmation from './orderconfirmation'
import porfolio from './porfolio'
import orderhistory from './orderhistory'
import stockstatement from './stockstatement'
import cashstatement from './cashstatement'
import watchlist from './watchlist'
import profile from './profile'
import oddlottrading from './oddlottrading'
import loanrefund from './loanrefund'
import entitlement from './entitlement'
import cashtransfer from './cashtransfer'
import marginloan from './marginloan'
import avaiblemarginlist from './avaiblemarginlist'
import accountinfo from './accountinfo'
import notification from './notification'

export default combineReducers({
  dologin,
  session: sessionReducer,
  menuSelected,
  config,
  enterOrder,
  checkAuthen,
  orderjournal,
  pagination,
  stock,
  cashtranshistory,
  orderconfirmation,
  porfolio,
  oddlottrading,
  orderhistory,
  stockstatement,
  cashstatement,
  watchlist,
  profile,
  loanrefund,
  entitlement,
  cashtransfer,
  marginloan,
  avaiblemarginlist,
  accountinfo,
  notification,
  
});
