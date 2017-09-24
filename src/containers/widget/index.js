import React from 'react'

import Entitlement from './Entitlement'
import AdvancePayment from './AdvancePayment'
import AdvancePaymentBank from './AdvancePaymentBank'

import PortfolioTab from '../view/PortfolioX'
import Trading from '../view/Trading'
import Management from '../view/Management'
import Customization from '../view/Customization'
import TransHistory from '../view/TransHistory'
import OrderJournalTab from '../view/OrderJournalX'

import ActionRightList from './ActionRightList'
import AdditionSharesInfo from './AdditionSharesInfo'
import EntitlementPanel from './EntitlementPanel'
import EntitlementHistory from './EntitlementHistory'
import OddLotOrder from './OddLotOrder'
import OddLotHistory from './OddLotHistory'
import AdvanceBankPanel from './AdvanceBankPanel'
import MatchOrderBankList from './MatchOrderBankList'
import AdvanceBankHistory from './AdvanceBankHistory'
import AdvancePanel from './AdvancePanel'
import MatchOrderList from './MatchOrderList'
import AdvanceHistory from './AdvanceHistory'
import CashTransHistory from './CashTransHistory'
import OrderHistory from './OrderHistory'
import EnterOrder from './EnterOrder'
import OrderJournal from './OrderJournal'
import StockMarketInfo from './StockMarketInfo'
import AccountInfo from './AccountInfo'

export default function (menuid, props){
	console.log(menuid)
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
		case 'entitlement':
			return (
				<Entitlement language={props.language} stockList={props.stockList}/>
			)

		case 'advancePayment':
			return (
				<AdvancePayment language={props.language} theme={props.theme}/>
            )
        case 'advancePaymentBank':
			return (
				<AdvancePaymentBank language={props.language} theme={props.theme}/>
			)


		case 'actionRightList':
			return (
				<ActionRightList language={props.language} stockList={props.stockList}/>
			)
		case 'additionSharesInfo':
			return (
				<AdditionSharesInfo language={props.language} theme={props.theme}/>
            )
        case 'entitlementPanel':
			return (
				<EntitlementPanel language={props.language} theme={props.theme}/>
			)
		case 'entitlementHistory':
			return (
				<EntitlementHistory language={props.language} theme={props.theme}/>
			)

		case 'oddLotOrder':
			return (
				<OddLotOrder language={props.language} theme={props.theme}/>
			)
		case 'oddlotHistory':
			return (
				<OddLotHistory language={props.language} theme={props.theme}/>
            )

		case 'matchOrderBankList':
			return (
				<MatchOrderBankList language={props.language} theme={props.theme}/>
			)
		case 'advanceBankHistory':
			return (
				<AdvanceBankHistory language={props.language} theme={props.theme}/>
			)
		case 'advanceBankPanel':
			return (
				<AdvanceBankPanel language={props.language} theme={props.theme}/>
            )

		case 'matchOrderList':
			return (
				<MatchOrderList language={props.language} theme={props.theme}/>
			)
		case 'advanceHistory':
			return (
				<AdvanceHistory language={props.language} theme={props.theme}/>
			)
		case 'advancePanel':
			return (
				<AdvancePanel language={props.language} theme={props.theme}/>
            )

		case 'cashTransHistory':
			return (
				<CashTransHistory language={props.language} theme={props.theme}/>
			)
		case 'orderHistory':
			return (
				<OrderHistory language={props.language} theme={props.theme}/>
			)

		case 'enterorder':
			return (
				<EnterOrder stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'orderjournal':
			return (
				<OrderJournal stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'accountinfo':
			return (
				<AccountInfo stockList={props.stockList} language={props.language} theme={props.theme}/>
			)
		case 'stockmarketinform':
			return (
				<StockMarketInfo stockList={props.stockList} language={props.language} theme={props.theme}/>
			)




    }
}
