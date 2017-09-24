import React from 'react'
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

export default function (menuid, props){
	console.log(menuid)
	switch(menuid){
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
    }
}
