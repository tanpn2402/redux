import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../../actions'
// import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import StockChart from '../commons/StockChart.js'
import Popup from '../popup/Popup'

class Header extends React.Component {
	constructor() {
		super()
		this.id = 'pageHeader'
	}

	render() {
		let pageHeader = this.props.theme.page.pageHeader
		return (
			<div id="pageheader" style={pageHeader} >
				<div className="logo">
					<img src={require('../../assets/images/logo_main_ttl.png')} />
				</div>
			</div>
		)
	}

}


const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)