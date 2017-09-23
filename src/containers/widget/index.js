import React from 'react'
import ActionRightList from './ActionRightList'
import AdditionSharesInfo from './AdditionSharesInfo'
import EntitlementPanel from './EntitlementPanel'
import EntitlementHistory from './EntitlementHistory'


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
    }
}