import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ReactHighcharts from 'react-highcharts';

const config = {
	chart: {
        width: 340,
        height: 150
    },
	series: [{
		showInLegend: false,
		data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
	},{
		showInLegend: false,
		data: [49.9, 177.5, 146.4, 229.2, 354.0, 76.0, 235.6, 148.5, 216.4, 224.1, 335.6, 44.4]
		
	}],
	title:{
		text: ""
	},
	yAxis: {
        title: {
            text: ''
		},
	},
	xAxis: {
        title: {
            text: ''
		},
	},
	
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
				"hsx": <ReactHighcharts config={config}/>,
				"hnx": <ReactHighcharts config={config}/>,
				"upcom": <ReactHighcharts config={config}/>,
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
				            sortable={false}
				            resizable={false}
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
	  	document.getElementById('header-lg').style.height = document.getElementById('header-lg').offsetHeight - 26 + 'px'
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