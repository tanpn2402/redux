import React, { Component } from 'react'
import {InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'

export default class InputWithButton extends React.Component {

  	render () {
  		console.log(this.props)
    	return(
    		<button
        className="example-custom-input"
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
  		)
  	}
}