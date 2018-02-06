import React from 'react'


import PortfolioTab from './Portfolio'
import Trading from './Trading'
import Management from './Management'
import Customization from './Customization'
import TransHistory from './TransHistory'
import OrderJournalTab from './OrderJournal'
import TradePage from './TradePage'
import Social from './Social'
import MarketInformation from './MarketInformation'


import TradingPage from './TradingPage'


export default function (menuid, props){
	menuid = menuid == "mobile" ? "trading" : menuid
	console.log(menuid)
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
	case 'tradepage':
		return(
			<TradingPage language={props.language} stockList={props.stockList} theme={props.theme} tabID={props.tabID}/>
		)
	
	case 'social':
		return(
			<Social language={props.language} stockList={props.stockList} theme={props.theme} tabID={menuid}/>
		)
	
	case 'marketinfo':
		return(
			<MarketInformation language={props.language} stockList={props.stockList} theme={props.theme} 
				tabID={menuid} subTab={props.subTabID}/>
		)
		
	default: return
	}
}
