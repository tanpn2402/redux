import React from 'react'
import CashTransactionHistory from './CashTransactionHistory'
import OrderJournal from './OrderJournal'
import EnterOrder from './EnterOrder'

export default function (menuid, props){
	console.log(menuid)
	switch(menuid){
		case 'enterorder':
			return (
				<EnterOrder />
			)
		case 'cashtransactionhistory':
			return (
				<CashTransactionHistory />
			)
		case 'orderjournal':
			return (
				<OrderJournal language={props.language} stockList={props.stockList} theme={props.theme}/>
			)
		default: return
	}
}