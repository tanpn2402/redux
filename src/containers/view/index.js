<<<<<<< HEAD
import React from 'react'
import CashTransactionHistory from './CashTransactionHistory'
import OrderJournal from './OrderJournal'
import EnterOrder from './EnterOrder'
import OrderConfirmation from './OrderConfirmation'
import Portfolio from './Portfolio'
import OrderHistory from './OrderHistory'
import StockStatement from './StockStatement'
import CashStatement from './CashStatement'
import WatchList from './WatchList'
import StockMarketInfo from './StockMarketInfo'
import Profile from './Profile'
import OddLotTrading from './OddLotTrading'
import CashTransfer from './CashTransfer'
import CashAdvance from './CashAdvance'
import MarginLoan from './MarginLoan'
import AvaibleMarginList from './AvaibleMarginList'
import AccountInfo from './AccountInfo'
import LoanRefund from './LoanRefund'
import Entitlement from './Entitlement'
import TechAnalysis from './Techanalysis'
import CashAdvanceBank from './CashAdvanceBank'
import PortfolioTab from './PortfolioX'
import Trading from './Trading'
import Management from './Management'
import Customization from './Customization'
import TransHistory from './TransHistory'
import OrderJournalTab from './OrderJournalX'
export default function (menuid, props){
	switch(menuid){
		case 'management':
		return(
			<Management language={props.language} stockList={props.stockList} theme={props.theme}  tabID={props.tabID}/>
		)
	case 'trading':
		return(
			<Trading language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'portfoliotab':
		return(
			<PortfolioTab language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'orderjournaltab':
		return(
			<OrderJournalTab language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'transhistory':
		return(
			<TransHistory language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'customization':
		return(
			<Customization language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'enterorder':
		return (
			<EnterOrder language={props.language} stockList={props.stockList}/>
		)
	case 'cashtransactionhistory':
		return (
			<CashTransactionHistory language={props.language} theme={props.theme}/>
		)
	case 'orderjournal':
		return (
			<OrderJournal language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'orderconfirmation':
		return(
			<OrderConfirmation language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'portfolio':
		return (
			<Portfolio language={props.language} theme={props.theme}/>
		)
	case 'ordershistory':
		return (
			<OrderHistory language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'stockstatement':
		return (
			<StockStatement language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashstatement':
		return (
			<CashStatement language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'watchlist':
		return(
			<WatchList language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'stockmarketinform':
		return (
			<StockMarketInfo language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'personalprofile' :
		return (
			<Profile language={props.language.personalprofile} theme={props.theme}/>
		)
	case 'oddlottrading':
		return(
			<OddLotTrading language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashtransfer':
		return(
			<CashTransfer language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashadvance':
		return (
			<CashAdvance language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'marginloan':
		return (
			<MarginLoan language={props.language} theme={props.theme}/>
		)
	case 'available':
		return (
			<AvaibleMarginList language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'accountinfo':
		return (
			<AccountInfo language={props.language} theme={props.theme}/>
		)
	case 'loanrefund':
		return(
			<LoanRefund language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'entitlement':
		return(
			<Entitlement language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'techanalysis':
		return(
			<TechAnalysis language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashadvancebank':
		return(
			<CashAdvanceBank language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'management':
		return(
			<Management language={props.language} stockList={props.stockList} theme={props.theme}  tabID={props.tabID}/>
		)
	case 'trading': case 'portfoliotab': case 'orderjournaltab':
		return(
			<Trading language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'transhistory':
		return(
			<TransHistory language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
			default: return
	}
=======
import React from 'react'
import CashTransactionHistory from './CashTransactionHistory'
import OrderJournal from './OrderJournal'
import EnterOrder from './EnterOrder'
import OrderConfirmation from './OrderConfirmation'
import Portfolio from './Portfolio'
import OrderHistory from './OrderHistory'
import StockStatement from './StockStatement'
import CashStatement from './CashStatement'
import WatchList from './WatchList'
import StockMarketInfo from './StockMarketInfo'
import Profile from './Profile'
import OddLotTrading from './OddLotTrading'
import CashTransfer from './CashTransfer'
import CashAdvance from './CashAdvance'
import MarginLoan from './MarginLoan'
import AvaibleMarginList from './AvaibleMarginList'
import AccountInfo from './AccountInfo'
import LoanRefund from './LoanRefund'
import Entitlement from './Entitlement'
import TechAnalysis from './Techanalysis'
import CashAdvanceBank from './CashAdvanceBank'
import PortfolioTab from './PortfolioX'
import Trading from './Trading'
import Management from './Management'
import Customization from './Customization'
import TransHistory from './TransHistory'
import OrderJournalTab from './OrderJournalX'
export default function (menuid, props){
	switch(menuid){
		case 'management':
		return(
			<Management language={props.language} stockList={props.stockList} theme={props.theme}  tabID={props.tabID}/>
		)
	case 'trading':
		return(
			<Trading language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'portfoliotab':
		return(
			<PortfolioTab language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'orderjournaltab':
		return(
			<OrderJournalTab language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'transhistory':
		return(
			<TransHistory language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'customization':
		return(
			<Customization language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'enterorder':
		return (
			<EnterOrder language={props.language} stockList={props.stockList}/>
		)
	case 'cashtransactionhistory':
		return (
			<CashTransactionHistory language={props.language} theme={props.theme}/>
		)
	case 'orderjournal':
		return (
			<OrderJournal language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'orderconfirmation':
		return(
			<OrderConfirmation language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'portfolio':
		return (
			<Portfolio language={props.language} theme={props.theme}/>
		)
	case 'ordershistory':
		return (
			<OrderHistory language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'stockstatement':
		return (
			<StockStatement language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashstatement':
		return (
			<CashStatement language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'watchlist':
		return(
			<WatchList language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'stockmarketinform':
		return (
			<StockMarketInfo language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'personalprofile' :
		return (
			<Profile language={props.language.personalprofile} theme={props.theme}/>
		)
	case 'oddlottrading':
		return(
			<OddLotTrading language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashtransfer':
		return(
			<CashTransfer language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashadvance':
		return (
			<CashAdvance language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'marginloan':
		return (
			<MarginLoan language={props.language} theme={props.theme}/>
		)
	case 'available':
		return (
			<AvaibleMarginList language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'accountinfo':
		return (
			<AccountInfo language={props.language} theme={props.theme}/>
		)
	case 'loanrefund':
		return(
			<LoanRefund language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'entitlement':
		return(
			<Entitlement language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'techanalysis':
		return(
			<TechAnalysis language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'cashadvancebank':
		return(
			<CashAdvanceBank language={props.language} stockList={props.stockList} theme={props.theme}/>
		)
	case 'management':
		return(
			<Management language={props.language} stockList={props.stockList} theme={props.theme}  tabID={props.tabID}/>
		)
	case 'trading': case 'portfoliotab': case 'orderjournaltab':
		return(
			<Trading language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	case 'transhistory':
		return(
			<TransHistory language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
			default: return
	}
>>>>>>> d0bbce102fc1511a532d1c2eda7284c4f460cd14
}