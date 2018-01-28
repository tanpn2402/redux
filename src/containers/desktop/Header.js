import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../../actions'
// import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import StockChart from '../commons/StockChart.js'
import Popup from '../popup/Popup'
import HeadSlider from './HeadSlider'

class Header extends React.Component {
	constructor() {
		super()
		this.id = 'pageHeader'
	}

	onLogoClick() {
		console.log("WatchList data", {
			instrument: this.props.instrument,
			listInstrumentData: this.props.listInstrumentData,
			listInstrumentInWatchList: this.props.listInstrumentInWatchList,
			listInstrumentToWatch: this.props.listInstrumentToWatch,
			portfolioData: this.props.portfolioData
		})
		console.log("TRADE LOG DATA", {
			tradeLog: this.props.tradeLogData
		})
	}

	render() {
		let pageHeader = this.props.theme.page.pageHeader
		return (
			<div id="pageheader" style={pageHeader} >
				<div className='rows'>
					<div className="logo" onClick = {(e) => this.onLogoClick()}>
						<img src={require('../../assets/images/logo_main_ttl.png')} />
					</div>
					<div className="headSlider">
						<HeadSlider/>
					</div>
				</div>
			</div>
		)
	}


}


const mapStateToProps = (state) => {
	 return {
        instrument: state.trading.instrument,
        listInstrumentToWatch: state.trading.listInstrumentToWatch,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
		portfolioData: state.trading.portfolioData.mvPortfolioBeanList,
		listInstrumentData: state.trading.listInstrumentData,
		tradeLogData: state.tradelog.tradeLogData
    }
}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)