import React from "react"
import {FormControl} from 'react-bootstrap'

export default class Pagination extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			page: 1,
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			page: nextProps.pageIndex,
		});
	}

  	render() {
    	return (
        	<div className="form-inline form-group pagination-top">
	        	{
	        		this.props.onFirstPage === undefined ? '' : 
	        		(
	        			<button type="button" className="hks-btn btn-pagination-top" 
	                	onClick={this.props.onFirstPage.bind(this)}>«</button>
	        		)
	        	}
	        	
	        	<button type="button" className="hks-btn btn-pagination-top" 
                	onClick={this.props.onPrevPage.bind(this)}>‹</button>
        		<span>Page</span>
        		<input type="number" value={this.state.page} id="pageinput" className="hks-input page-input" 
        			onKeyDown={ e => this.onPageChange(e) } 
        			onChange={e => e.target.value > 0 ? this.setState({ page: e.target.value }) : 0}/>
				<span> of {this.props.totalRecord}  </span>
        		<button type="button" className="hks-btn btn-pagination-top" 
                	onClick={this.props.onNextPage.bind(this)}>›</button>

	        	{
	        		this.props.onLastPage === undefined ? '' : 
	        		(
	        			<button type="button" className="hks-btn btn-pagination-top" 
	                	onClick={this.props.onFirstPage.bind(this)}>»</button>
	        		)
	        	}

				{
					this.props.onReloadPage === undefined ? '' : 
	        		(
	        			<button type="button" className="hks-btn btn-pagination-top" 
		                	onClick={this.props.onReloadPage.bind(this)}>
		        			<span className="glyphicon glyphicon-refresh"></span>
		        		</button>
	        		)
				}

        		{
	        		this.props.onExportExcel === undefined ? '' : 
	        		(
	        			<button type="button" className="hks-btn btn-pagination-top btn-export" 
		                	onClick={this.props.onExportExcel.bind(this)}>
		        			Xuất báo cáo
		        		</button>
	        		)
	        	}

		        		
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