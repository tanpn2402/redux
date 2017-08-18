import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import ReactTable from 'react-table'

export default class App extends React.Component {
	constructor(){
		super()
		this.columns =  [
		    {
	          	Header: 'HSX | Trạng thái: ',
		        accessor: 'col1'
		    },{
		        Header: 'HNX | Trạng thái: ',
		        accessor: 'col2'
		    },{
		        Header: 'UPCOM | Trạng thái: ',
				accessor: 'col3'
		    },
       	]


       	this.minheight = 0
       	this.maxheight = 95
       	this.time = 100
       	this.timer = null
       	this.toggle = false
	}

	render() {
	    var currentThemeName=this.props.currentThemeName.substring(6,11)
	    var currentLanguage=this.props.currentLanguage
	    return (
	    	<div id="pageheader" style={this.props.theme.pagebackground} >
	    		<div className="row header-sm"  id="header-sm" style={{ display: 'none', }}>
		    		<div className='col-xs-3'>
		    			<span>MIRAE ASSET</span>
		    		</div>
		    		<div className='col-xs-5'>
		    			<span>
		    				<div className='col-xs-4'>
			    				<strong>HSX:</strong>
			    				{/*<span>
		    						123 <span className="glyphicon glyphicon-chevron-up"></span>
		    					</span>
			    					{'|'}
			    				<span>
			    					1.8 <span className="glyphicon glyphicon-chevron-down"></span>
		    					</span>*/}
		    				</div>
		    				<div className='col-xs-4'>
		    					<strong>HNX:</strong>
		    					{/*<span>
		    						123 <span className="glyphicon glyphicon-chevron-up"></span>
		    					</span>
			    					{'|'}
			    				<span>
			    					1.8 <span className="glyphicon glyphicon-chevron-down"></span>
		    					</span>*/}
		    				</div>
		    				<div className='col-xs-4'>
		    					<strong>HNX:</strong>
		    					{/*<span>
		    						123 <span className="glyphicon glyphicon-chevron-up"></span>
		    					</span>
			    					{'|'}
			    				<span>
			    					1.8 <span className="glyphicon glyphicon-chevron-down"></span>
		    					</span>*/}
		    				</div>
		    				
	    				</span>

		    		</div>
		    		
		    		<div className='col-xs-4 header-action'>
		    			<span>
		    				<strong>077C086378</strong>
		    				{'     '}
		    				<strong>Nguyễn Văn Sự</strong>
	    				</span>
		    			<span>
		    				<Button bsStyle="primary" bsSize="xsmall" onClick={this.onShowHeader.bind(this)}><span className="glyphicon glyphicon-chevron-down"></span></Button>
		    				<Button bsStyle="primary" bsSize="xsmall" onClick={this.onOpenSettingPanel.bind(this)}>
		    					<span className="glyphicon glyphicon-cog"></span>
		    				</Button>
			              	<Button bsStyle="primary" bsSize="xsmall"><span className="glyphicon glyphicon-log-out"></span></Button>
		    			</span>
		    		</div>
		    		
		    	</div>


		        <div className="row header-lg" id="header-lg">
		          	<div className="col-xs-9 header-left">
			            <div className="logo">
			              	<img src={require('../assets/images/logo_MAS.png')}/>
			            </div>
			         
			            <ReactTable
				            style={{fontSize: '12px',}}
				            data={this.data}
				            columns={this.columns}
				            showPagination= {false}
				            defaultPageSize={4}
				            sortable={false}
				            resizable={false}
				            className="-striped -highlight header-market"
			            />
		          	</div>
		          	<div className="col-xs-3 header-user" id="header-user">
			            <ul>
			            	<li>
			            		<span>
				            		<Button bsStyle="primary" bsSize="xsmall" onClick={this.onHideHeader.bind(this)}>
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
			            	<li>077C086378</li>
			            	<li>Nguyễn Văn Sự</li>
			            	<li>Giao dịch kí quỹ</li>
			            	<li>Ngày GD 01/01/2017 14:26:22</li>
			            </ul>
			        </div>
		        </div>
	        </div>
	    )
  	}

  	componentDidMount(){
  		this.maxHeight = document.getElementById('pageheader')
  	}

  	onHideHeader(e){

  		var slider = document.getElementById('header-lg')
  		clearInterval(this.timer)
        var timer = this.timer
        document.getElementById('header-sm').style.display = 'block'
        document.getElementById('header-lg').style.height = document.getElementById('header-lg').offsetHeight - 26 + 'px'
        timer = setInterval(function() {

            if(slider.offsetHeight > 0 ) {
                slider.style.height =  slider.offsetHeight - 1 + 'px'
                document.getElementById('pagecontent').style.minHeight = document.getElementById('pagecontent').offsetHeight + 1 + 'px'
                console.log(slider.offsetHeight)
            }else {
                clearInterval(timer)
                document.getElementById('header-user').style.display = 'none'
                
            }
        },1);

  	}

  	onShowHeader(){
  		document.getElementById('header-user').style.display = 'block'
  		document.getElementById('header-sm').style.display = 'none'
  		document.getElementById('header-lg').style.height = '26px'
  		var slider = document.getElementById('header-lg')
  		clearInterval(this.timer)
        var timer = this.timer
        timer = setInterval(function() {

            if(slider.offsetHeight < 95 ) {
                slider.style.height =  slider.offsetHeight + 1 + 'px'
                document.getElementById('pagecontent').style.minHeight = document.getElementById('pagecontent').offsetHeight - 1 + 'px'
            }else {
                clearInterval(timer)
            }
        },1);

  	}

  	onOpenSettingPanel(e){
  		document.getElementById("overlay").style.display = 'block';
    	document.getElementById("settingnav").style.width = "300px";
  	}
}


  {/*<span>
			              <select onChange={e => on}> 
			                <option value="light">Light</option>
			                <option value="dark">Dark</option>
			                <option value="brown">Brown</option>
			                <option value="blue">Blue</option>
			              </select>*/}
			              {/*<Button onClick={this.props.changeConfig.bind(this,currentLanguage,'blue')} bsStyle="default" bsSize="xsmall">Blue</Button> 
			              <Button onClick={this.props.changeConfig.bind(this,currentLanguage,'dark')} bsStyle="default" bsSize="xsmall">Dark</Button> 
			              <Button onClick={this.props.changeConfig.bind(this,currentLanguage,'brown')} bsStyle="default" bsSize="xsmall">Brown</Button> 
			              <Button onClick={this.props.changeConfig.bind(this,currentLanguage,'light')} bsStyle="default" bsSize="xsmall">Light</Button> 
			              <Button onClick={this.props.changeConfig.bind(this,'en',currentThemeName)} bsStyle="default" bsSize="xsmall" >Eng</Button>  
			              <Button onClick={this.props.changeConfig.bind(this,'vi',currentThemeName)} bsStyle="default" bsSize="xsmall" >Viet</Button>  
			              
				              	<Button bsStyle="primary" bsSize="xsmall" onClick={this.onHideHeader.bind(this)}>Ẩn</Button>
				              	<Button bsStyle="primary" bsSize="xsmall">Logout</Button> 
				            </span>*/}