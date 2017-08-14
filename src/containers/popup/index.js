import React from 'react'
import CancelOrder from './CancelOrder'
import ModifyOrder from './ModifyOrder'
import EnterOrderPopup from './EnterOrder'
export default function  (props){
	
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
				return (<EnterOrderPopup json={props.json} mvStockBean={props.mvStockBean} onHide={props.onHide}/>)
			else
                    return(<h5 className="error">{props.error}</h5>)
			
	}
    
}