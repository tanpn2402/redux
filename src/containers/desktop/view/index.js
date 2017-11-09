import React from 'react'


import PortfolioTab from './Portfolio'
import Trading from './Trading'
import Management from './Management'
import Customization from './Customization'
import TransHistory from './TransHistory'
import OrderJournalTab from './OrderJournal'


export default function (menuid, props){
	menuid = menuid == "mobile" ? "trading" : menuid
	switch(menuid){
		case 'management':
		return(
			<Management language={props.language} stockList={props.stockList} theme={props.theme}  
				tabID={props.tabID} subTab={props.subTabID}/>
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
			<TransHistory language={props.language} stockList={props.stockList} theme={props.theme} 
				tabID={props.tabID} subTab={props.subTabID}/>
		)
	case 'customization':
		return(
			<Customization language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
		
	default: return
	}
}