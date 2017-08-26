import React from "react";
import {FormGroup, FormControl, Pagination as Pagi} from 'react-bootstrap'
import ReactTable from "react-table"
import "react-table/react-table.css"
import { connect } from 'react-redux'
import * as actions from '../../actions'

export default class Pagination extends React.Component {
	constructor() {
    	super()
  	}

  	componentWillMount(){
    
  	}

  	render() {
    	const windowid = this.props.windowid
    	console.log(windowid)
    	return (
        	<div className="form-inline form-group pagination-top">
        		<button type="button" className="hks-btn btn-pagination-top">«</button>
        		<button type="button" className="hks-btn btn-pagination-top">‹</button>
        		<span>Page</span>
        		<input type="number" placeholder="1" className="hks-input page-input" onKeyDown={ e => this.onPageChange(e) }/>
        		<button type="button" className="hks-btn btn-pagination-top">›</button>
        		<button type="button" className="hks-btn btn-pagination-top">»</button>
        		<button type="button" className="hks-btn btn-pagination-top">
        			<span className="glyphicon glyphicon-refresh"></span>
        		</button>
        		{'  |  '}
        	</div>
    	)
  	}

  	onPageChange(e){
  		if(e.keyCode === 13){
        e.preventDefault()
  			this.props.onPageChange(e.target.value)
  		}
  	}
}