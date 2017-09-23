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
import Management from '../main/Management'
import Trading from '../main/Trading'
import TransHistory from '../main/TransHistory'

export default function (menuid, props){
	console.log(menuid)
	switch(menuid){
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
}