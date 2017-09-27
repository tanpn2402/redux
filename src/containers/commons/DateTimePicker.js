import {InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class InputWithButton extends React.Component {
	render(){
		console.log(this.props)
		return(
		    <span className="input-group my-data-picker">
		      	<FormControl className="react-datepicker-ignore-onclickoutside" 
		      	type="text"
		      		value={this.props.value} 
		      		onChange={this.props.onChange} 
		      		disabled={this.props.disabled} />
		      	<InputGroup.Button>
		        	<Button className="react-datepicker-ignore-onclickoutside" 
		        		disabled={this.props.disabled} 
		        		onClick={this.props.onClick}><Glyphicon glyph="calendar" /></Button>
		      	</InputGroup.Button>
		    </span>
		)
	}
}

class DateTimePicker extends React.Component {
 		
 	constructor(){
 		super()

 		this.state = {
 			startDate: moment(),
 			isCheck: false,
 		}
 	}

  	render() {
  		console.log(this.props)
    	return (
        	<DatePicker 
        		id={this.props.id}
        		customInput={<InputWithButton />} 
	        	dateFormat="DD/MM/YYYY"
	            selected={this.props.selected}
	            onChange={this.props.onChange.bind(this)}
	            disabled={this.props.disabled}
	            />
    	)
  	}
}

export default DateTimePicker