import React from 'react'
import CancelOrder from './CancelOrder'
import ModifyOrder from './ModifyOrder'
import ConfirmOrder from './ConfirmOrder'
import DetailOrder from './DetailOrder'
import OddLotTrading from './OddLotTrading'
import CashAdvancePopup from './CashAdvance'
import LoanRefund from './LoanRefund'
import CancelCashtransfer from './CancelCashtransfer'
import CashTransfer from './CashTransfer'
import CashAdvanceBank from './CashAdvanceBank'
import SaveLayout from './SaveLayout'
import EnterOrderConfirm from './EnterOrderConfirm'
// mobile
import EnterOrderConfirmMobile from './mobile/EnterOrderConfirm'
import EnterOrderSuccessMobile from './mobile/EnterOrderSuccess'
import ModifyOrderMobile from './mobile/ModifyOrder'
import CancelOrderMobile from './mobile/CancelOrder'
import Setting from './mobile/Setting'

export default function (verion, props, onClose) {
	if (verion === "mobile") {
		return genPopupMobile(props, onClose)
	} else {
		return genPopupDesktop(props, onClose)
	}
}

function genPopupDesktop(props, onClose) {
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
			return (<OddLotTrading theme={props.theme} onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
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

		case 'cancelcashtransfer':
			return (<CancelCashtransfer data={props.data} onHide={onClose} rowSelected={props.rowSelected} language={props.language} />)
			break;

		case 'cashtransfer':
			return (<CashTransfer onHide={onClose} data={props.data} rowSelected={props.rowSelected} language={props.language} />)

		case 'savelayout':
			return (<SaveLayout language={props.language} theme={props.theme} checkSessionID={props.checkSessionID} config={props.config} />)
			break;

		case 'enterorderconfirm':
			return (<EnterOrderConfirm onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'cancelorder':
			return (<CancelOrder theme={props.theme} onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'modifyorder':
			return (<ModifyOrder onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;
		case 'detailorder':
			return (<DetailOrder onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'enterordersuccess':
			return (<EnterOrderSuccessMobile onHide={onClose} authcard={props.authcard} language={props.language} data={props.data} />)
			break;
	}

}

function genPopupMobile(props, onClose) {
	switch (props.id) {
		case 'enterorderconfirm':
			return (<EnterOrderConfirmMobile onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;


		case 'modifyorder':
			return (<ModifyOrderMobile onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'cancelorder':
			return (<CancelOrderMobile theme={props.theme} onHide={onClose} authcard={props.authcard} data={props.data} language={props.language} />)
			break;

		case 'savelayout':
			return (<SaveLayout language={props.language} theme={props.theme} checkSessionID={props.checkSessionID} config={props.config} />)
			break;

		case 'setting':
			return (<Setting onHide={onClose} authcard={props.authcard} language={props.language} data={props.data} />)
			break;

		case 'enterordersuccess':
			return (<EnterOrderSuccessMobile onHide={onClose} authcard={props.authcard} language={props.language} data={props.data} />)
			break;
	}
}