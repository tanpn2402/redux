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
	                	onClick={this.onFirstPage.bind(this)}>«</button>
	        		)
	        	}
	        	
	        	<button type="button" className="hks-btn btn-pagination-top" 
                	onClick={this.onPrevPage.bind(this)}>‹</button>
        		<span>Page</span>
        		<input type="number" value={this.state.page} id="pageinput" className="hks-input page-input" 
        			onKeyDown={ e => this.onPageChange(e) } 
        			onChange={e => e.target.value > 0 ? this.setState({ page: e.target.value }) : 0}/>
				<span> of {this.props.totalRecord}  </span>
        		<button type="button" className="hks-btn btn-pagination-top" 
                	onClick={this.onNextPage.bind(this)}>›</button>

	        	{
	        		this.props.onLastPage === undefined ? '' : 
	        		(
	        			<button type="button" className="hks-btn btn-pagination-top" 
	                	onClick={this.onFirstPage.bind(this)}>»</button>
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
		        			Export Report
		        		</button>
	        		)
	        	}

        	</div>
    	)
	  }
	  
	onNextPage(){
		if(this.state.page < this.props.totalRecord){
			this.props.onNextPage()
		}
	}

	onPrevPage(){
		if(this.state.page > 1){
			this.props.onPrevPage()
		}
	}

	onFirstPage(){
		if(this.state.page > 1){
			this.props.onFirstPage()
		}
	}

	onLastPage(){
		if(this.state.page > 1){
			this.props.onLastPage()
		}
	}

  	onPageChange(e){
  		if(e.keyCode === 13){
			e.preventDefault()
			let pageSelected = e.target.value
			if(pageSelected > 0 && pageSelected <= this.props.totalRecord){
				this.props.onPageChange(e.target.value)
			}
  		}
  	}

}