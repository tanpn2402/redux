import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ReactHighcharts from 'react-highcharts';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

var data = [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29], [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04], [1229299200000, 13.54]];

const config = {
 chart: {
  style: {
   height: '150px',
   width: '150px'
  }
 },
 navigator: {
  enabled: false
 },
 rangeSelector: {
  enabled: false
 },
 yAxis: {
  plotLines: [{
   value: 17,
   color: 'yellow',
   dashStyle: 'shortdash',
   width: 2
  }]
 },
 series: [{
  name: 'Test',
  data: data,
  tooltip: {
   valueDecimals: 4
  }}
  ,{
  type: 'column',
  name: 'John',
  data: data
  }
 ],
 navigation: {
  buttonOptions: {
   enabled: false
  }
 }

};
class Header extends React.Component {
	constructor(){
		super()
		this.columns =  [
		    {
	          	Header: 'HSX | Trạng thái: ',
		        accessor: 'hsx'
		    },{
		        Header: 'HNX | Trạng thái: ',
		        accessor: 'hnx'
		    },{
		        Header: 'UPCOM | Trạng thái: ',
				accessor: 'upcom'
		    },
       	]
		
       	this.minheight = 0
       	this.maxheight = 95
       	this.time = 100
       	this.timer = null
		this.toggle = false
		this.data=[
			{
				"hsx": "VN-INDEX: ",
				"hnx": "HNX-INDEX: ",
				"upcom": "UPCOM-INDEX: ",
			},
			{
				"hsx": "Up/Down: ",
				"hnx": "Up/Down: ",
				"upcom": "Up/Down: ",
			},
			{
				"hsx": "Total Vol: ",
				"hnx": "Total Vol: ",
				"upcom": "Total Vol: ",
			},
			{
				"hsx": "Total Val: ",
				"hnx": "Total Val: ",
				"upcom": "Total Val: ",
			},
			{
				"hsx": <ReactHighstock config={config}></ReactHighstock>,
				"hnx": <ReactHighstock config={config}></ReactHighstock>,
				"upcom": <ReactHighstock config={config}></ReactHighstock>,
			},
			
		]
		this.params={
			_dc: new Date().getTime(),
			action: "update",
			component: ''
		}
		
	}

	componentWillMount(){
		this.props.getHeaderChart(this.params)
	}

	render() {
	    var currentThemeName=this.props.currentThemeName.substring(6,11)
		var currentLanguage=this.props.currentLanguage
		var clientDetails = this.props.clientDetails.mvPersonnalProfileBean === undefined ? [] : this.props.clientDetails.mvPersonnalProfileBean
	    return (
	    	<div id="pageheader" style={this.props.theme.pagebackground} >
	    		<div className="row header-sm"  id="header-sm" style={{ display: 'none'}}>
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
		    				<Button className="header-expand" bsStyle="primary" bsSize="xsmall" onClick={this.onShowHeader.bind(this)}>
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
			              	<img src={require('../assets/images/logo_MAS.png')}/>
			            </div>
			            <ReactTable
				            style={{fontSize: '12px'}}
				            data={this.data}
				            columns={this.columns}
				            showPagination= {false}
				            defaultPageSize={5}
				            className="-striped -highlight header-market"
			            />
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

  	componentDidMount(){
  		if(window.innerWidth <= 600)
  		{
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

	  	var slider = document.getElementById('header-lg')
	  	clearInterval(this.timer)
	  	var timer = this.timer
		document.getElementById('header-sm').style.display = 'block'
	  	document.getElementById('header-lg').style.height = document.getElementById('header-lg').offsetHeight - 140 + 'px'
	  	timer = setInterval(function () {

	  		if (slider.offsetHeight > 0) {
	  			slider.style.height = slider.offsetHeight - 1 + 'px'
	  			document.getElementById('pagecontent').style.minHeight = document.getElementById('pagecontent').offsetHeight + 1 + 'px'
	  			console.log(slider.offsetHeight)
	  		} else {
	  			clearInterval(timer)
	  			document.getElementById('header-user').style.display = 'none'
	  		}
	  	}, 1);

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
		dispatch(actions.getHeaderChart(param))
	},
	  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)