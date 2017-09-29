import React from 'react'
import CancelOrder from './CancelOrder'
import ModifyOrder from './ModifyOrder'
import EnterOrderPopup from './EnterOrder'
import ConfirmOrder from './ConfirmOrder'
import OddLotTrading from './OddLotTrading'
import CashAdvancePopup from './CashAdvance'
import LoanRefund from './LoanRefund'
import AdvancePayment from './AdvancePayment'
import Settings from './Settings'
import CancelCashtransfer from './CancelCashtransfer'
import CashAdvanceBank from './CashAdvanceBank'

export default function(props, onClose){
	
	switch(props.id){
		case 'orderjournal':
			switch(props.popupType){
				case 'CANCELORDER':
					return(<CancelOrder onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}/>)
				case 'MODIFYORDER':
					return(<ModifyOrder onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}
					modifyData={props.modifyData}/>)
			}
		break;	
		case 'enterorder':
			if(props.error === 'Success all' )
				return (<EnterOrderPopup json={props.json} mvStockBean={props.mvStockBean} onHide={props.onHide} language={props.language}/>)
			else
                    return(<h5 className="error">{props.error}</h5>)
		break;
		
		case 'orderconfirmation':
			return (<ConfirmOrder onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}/>)
			break;

		case 'oddlottrading':
			return (<OddLotTrading onHide={onClose} authcard={props.authcard} data={props.data} language={props.language}/>)
			break;
		
		case 'cashadvance':
			return (<CashAdvancePopup onHide={onClose} authcard={props.authcard}  data={props.data} language={props.language}/>)
			break;

		case 'cashadvancebank':
			return (<CashAdvanceBank onHide={onClose} authcard={props.authcard} data={props.data} language={props.language}/>)
			break;

		case 'loanrefund':
			return (<LoanRefund onHide={onClose} authcard={props.authcard} data={props.data} language={props.language}/>)
			break;

		case 'advancepayment':
			return (<AdvancePayment onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}/>)
			break;

		case 'setting':
			return (<Settings onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}/>)
			break;

		case 'canceltransfer':
			return (<CancelCashtransfer onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}/>)
			break;
		break;
	}
    
}