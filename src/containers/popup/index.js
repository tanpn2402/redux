import React from 'react'
import CancelOrder from './CancelOrder'
export default function  (props){
	// switch(popupid){
	// 	case 'cancelorder':
	// 		return (<CancelOrder/>)
	// 	default: return
    // }
    return(<CancelOrder onHide={props.onHide}/>)
}