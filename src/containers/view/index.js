import React from 'react'
import CashTransactionHistory from './CashTransactionHistory'
import OrderJournal from './OrderJournal'

export default function (menuid, props){
	console.log(menuid)
	switch(menuid){
		case 'enterorder':
			return 
		case 'cashtransactionhistory':
			return (
				<CashTransactionHistory />
			)
		case 'oderjournal':
			return (
				<OrderJournal language={props.language.searchbar}/>
			)
		default: return
	}
}