import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import StockChart from './commons/StockChart.js'
import $ from 'jquery'
import Popup from './Popup'

class Header extends React.Component {
	constructor() {
		super()
		this.id='header'
	}

	componentWillMount() {
		//this.props.getHeaderChart(this.params)
	}

	render() {
		var currentThemeName = this.props.currentThemeName.substring(6, 11)
		var currentLanguage = this.props.currentLanguage
		var clientDetails = this.props.clientDetails.mvPersonnalProfileBean === undefined ? [] : this.props.clientDetails.mvPersonnalProfileBean
		let lgClose = () => this.setState({ lgShow: false })
		return (
			<div id="pageheader" style={this.props.theme.pageheader} >
				<div className="logo">
					<img src={require('../assets/images/logo_main_ttl.png')} />
				</div>
			</div>
		)
	}

	componentDidMount() {
		//this.props.getClientInfo([])
	}
}


const mapStateToProps = (state) => {
	return {
		clientDetails: state.profile.clientDetails,
		chart: state.profile.headerChart
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	getClientInfo: (param) => {
		dispatch(actions.getClientInfo(param))
	},
	getHeaderChart: (param) => {
		dispatch(actions.getClientInfo(param))
	},

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)