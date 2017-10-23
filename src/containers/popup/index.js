import React from 'react'
import CancelOrder from './CancelOrder'
import ModifyOrder from './ModifyOrder'
import ConfirmOrder from './ConfirmOrder'
import OddLotTrading from './OddLotTrading'
import CashAdvancePopup from './CashAdvance'
import LoanRefund from './LoanRefund'
import Settings from './Settings'
import CancelCashtransfer from './CancelCashtransfer'
import CashTransfer from './CashTransfer'
import CashAdvanceBank from './CashAdvanceBank'
import SaveLayout from './SaveLayout'
import EnterOrderConfirm from './EnterOrderConfirm'

export default function (props, onClose) {
	switch (props.id) {
		case 'orderjournal':
			switch (props.popupType) {
				case 'CANCELORDER':
					return (<CancelOrder onHide={props.onHide} rowSelected={props.rowSelected} language={props.language} />)
				case 'MODIFYORDER':
					return (<ModifyOrder onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}
						modifyData={props.modifyData} />)
			}
			break;

		case 'orderconfirmation':
			return (<ConfirmOrder onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'oddlottrading':
			return (<OddLotTrading onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'cashadvance':
			return (<CashAdvancePopup onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'cashadvancebank':
			return (<CashAdvanceBank onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'loanrefund':
			return (<LoanRefund onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'setting':
			return (<Settings onHide={props.onHide} rowSelected={props.rowSelected} language={props.language} />)
			break;

		case 'cancelcashtransfer':
			return (<CancelCashtransfer data={props.data} onHide={onClose} rowSelected={props.rowSelected} language={props.language} />)
			break;

		case 'cashtransfer':
			return (<CashTransfer onHide={onClose} data={props.data} rowSelected={props.rowSelected} language={props.language} />)

		case 'savelayout':
			return (<SaveLayout language={props.language} checkSessionID={props.checkSessionID} config={props.config} />)
			break;

		case 'enterorderconfirm':
			return (<EnterOrderConfirm onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;
			break;

		case 'cancelorder':
			return (<CancelOrder theme={props.theme} onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'modifyorder':
			return (<ModifyOrder onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;
	}

}