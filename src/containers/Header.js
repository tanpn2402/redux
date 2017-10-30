import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import * as actions from '../actions'
// import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import StockChart from './commons/StockChart.js'
import $ from 'jquery'
import Popup from './Popup'

class Header extends React.Component {
	constructor() {
		super()
		this.id = 'pageheader'
	}

	render() {
		let pageheader = this.props.theme.page == undefined ? undefined : this.props.theme.page.pageheader
		return (
			<div id="pageheader" style={pageheader} >
				<div className="logo">
					<img src={require('../assets/images/logo_main_ttl.png')} />
				</div>
			</div>
		)
	}

}


const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)