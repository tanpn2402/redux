import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import StockChart from './commons/StockChart.js'
import $ from 'jquery'
class Header extends React.Component {
	constructor() {
		super()
	}

	componentWillMount() {
		this.props.getHeaderChart(this.params)
	}

	render() {
		var currentThemeName = this.props.currentThemeName.substring(6, 11)
		var currentLanguage = this.props.currentLanguage
		var clientDetails = this.props.clientDetails.mvPersonnalProfileBean === undefined ? [] : this.props.clientDetails.mvPersonnalProfileBean
		return (
			<div id="pageheader" style={this.props.theme.pagebackground} >
				<div className="row header-sm" id="header-sm" >
					<div className='col-xs-3'>
						<span>MIRAE ASSET</span>
					</div>
					<div className='col-xs-5'>
						<span>
							<div className='col-xs-4'>
								<strong>HSX:</strong>
								<span>
									123 <span className="glyphicon glyphicon-chevron-up"></span>
								</span>
								{'|'}
								<span>
									1.8 <span className="glyphicon glyphicon-chevron-down"></span>
								</span>
							</div>
							<div className='col-xs-4'>
								<strong>HNX:</strong>
								<span>
									123 <span className="glyphicon glyphicon-chevron-up"></span>
								</span>
								{'|'}
								<span>
									1.8 <span className="glyphicon glyphicon-chevron-down"></span>
								</span>
							</div>
							<div className='col-xs-4'>
								<strong>HNX:</strong>
								<span>
									123 <span className="glyphicon glyphicon-chevron-up"></span>
								</span>
								{'|'}
								<span>
									1.8 <span className="glyphicon glyphicon-chevron-down"></span>
								</span>
							</div>

						</span>

					</div>


					<div className='col-xs-4 header-action'>
						<span>
							<strong>{clientDetails.mvAccountNumber}</strong>
							{'     '}
							<strong>{clientDetails.mvName}</strong>
						</span>
						<span>
							<Button className="header-expand" bsStyle="primary" bsSize="xsmall" onClick={this.onHideHeader.bind(this)}>
								<span className="glyphicon glyphicon-chevron-down"></span>
							</Button>
							<Button bsStyle="primary" bsSize="xsmall" onClick={this.onOpenSettingPanel.bind(this)}>
								<span className="glyphicon glyphicon-cog"></span>
							</Button>
							<Button bsStyle="primary" bsSize="xsmall"><span className="glyphicon glyphicon-log-out"></span></Button>
						</span>
					</div>

				</div>
				
				<div className="row header-lg" id="header-lg">
					<div className="col-xs-10 header-left">
						<div className="logo">
							<img src={require('../assets/images/logo_MAS.png')} />
						</div>

						<div className='col-xs-8'>
							
								<div className='col-xs-4'>

									<div id="abc" style={{ width: "100%", height: "100%", position: "absolute", }}>
										<StockChart id="stockchart1"/>
									</div>
									<strong style={{ position: "absolute", }}>HSX:</strong>
								</div>
								<div className='col-xs-4'>
									<strong style={{ position: "absolute", }}>HNX:</strong>
									<div id="stockchart2" style={{ width: "100%", height: "100%", position: "absolute", }}>
										<StockChart />
									</div>
									<strong style={{ position: "absolute", }}>HNX:</strong>
								</div>
								<div className='col-xs-4' id="graph">
									<strong style={{ position: "absolute", }}>HNX:</strong>
									<div id="stockchart3" style={{ width: "100%", height: "100%", position: "absolute", }}>
										<StockChart />
									</div>
									<strong style={{ position: "absolute", }}>UPCOM:</strong>
								</div>

							

						</div>

					</div>
					<div className="col-xs-2 header-user" id="header-user">
						<ul>
							<li>
								<span>
									<Button className="header-expand" bsStyle="primary" bsSize="xsmall" onClick={this.onHideHeader.bind(this)}>
										<span className="glyphicon glyphicon-chevron-up"></span>
									</Button>
									<Button bsStyle="primary" bsSize="xsmall" onClick={this.onOpenSettingPanel.bind(this)}>
										<span className="glyphicon glyphicon-cog"></span>
									</Button>
									<Button bsStyle="primary" bsSize="xsmall">
										<span className="glyphicon glyphicon-log-out"></span>
									</Button>
								</span>
							</li>
							<li>{clientDetails.mvAccountNumber}</li>
							<li>{clientDetails.mvName}</li>
							<li>Giao dịch kí quỹ</li>
							<li>Ngày GD</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {

		if (window.innerWidth <= 600) {
			document.getElementById('header-sm').style.display = 'block'
			document.getElementById('header-lg').style.display = 'none'

			var child = document.getElementsByClassName('header-expand')
			for (var i = child.length - 1; i >= 0; i--) {
				child[i].style.display = 'none'
			}
		}
		this.props.getClientInfo([])
		

	}


	onHideHeader(e) {
		document.getElementById('pageheader').classList.toggle('openheader');
		var h1 = document.getElementById('pageheader').offsetHeight
		var h2 = document.getElementById('pagemenu').offsetHeight
		var h3 = window.innerHeight
		document.getElementById('pagecontent').style.height = h3 - h1 - h2 + 'px'
		document.getElementById('sidebar').style.height = h3 - h1 - h2 + 'px'
		document.getElementById('slidenav').style.height = h3 - h1 - h2 + 'px'
		// $('#header-lg').slideUp(200, function(){
		// 	$('#header-sm').slideDown(200)
		// })
		
		// var slider = document.getElementById('header-lg')
		// clearInterval(this.timer)
		// var timer = this.timer
		// document.getElementById('header-sm').style.display = 'block'
		// document.getElementById('header-lg').style.height = document.getElementById('header-lg').offsetHeight - 140 + 'px'
		
		// timer = setInterval(function () {

		// 	if (slider.offsetHeight > 0) {
		// 		slider.style.height = slider.offsetHeight - 1 + 'px'
				
		// 		$("#stockchart1").children().height(document.getElementById('stockchart1').offsetHeight - 1 + 'px') 
				
		// 		document.getElementById('pagecontent').style.minHeight = document.getElementById('pagecontent').offsetHeight + 1 + 'px'
		// 	} else {
		// 		clearInterval(timer)
		// 		document.getElementById('header-user').style.display = 'none'

		// 	}
		// }, 1);

	}

	onShowHeader() {
	
		document.getElementById('header-user').style.display = 'block'
		document.getElementById('header-sm').style.display = 'none'
		document.getElementById('header-lg').style.height = '26px'
		var slider = document.getElementById('header-lg')
		clearInterval(this.timer)
		var timer = this.timer
		timer = setInterval(function () {

			if (slider.offsetHeight < 95) {
				slider.style.height = slider.offsetHeight + 1 + 'px'
				$("#stockchart1").children().height(document.getElementById('stockchart1').offsetHeight + 1 + 'px') 
				document.getElementById('pagecontent').style.minHeight = document.getElementById('pagecontent').offsetHeight - 1 + 'px'
			} else {
				clearInterval(timer)
			}
		}, 1);

	}

	onOpenSettingPanel(e) {
		document.getElementById("overlay").style.display = 'block';
		document.getElementById("settingnav").style.width = "300px";
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