import React from 'react'
import CancelOrder from './CancelOrder'
import ModifyOrder from './ModifyOrder'
export default function  (props){
	
	switch(props.popupType){
		case 'CANCELORDER':
			return(<CancelOrder onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}/>)
		case 'MODIFYORDER':
			return(<ModifyOrder onHide={props.onHide} rowSelected={props.rowSelected} language={props.language}/>)
	}
    
}