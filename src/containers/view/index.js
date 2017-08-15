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
		case 'porfolio':
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
		default: return
	}
}