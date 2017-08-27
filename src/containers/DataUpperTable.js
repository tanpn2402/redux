import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class DataUpperTable extends React.Component {
	constructor() {
	    super()

	    this.state = {
	    	data: [],
	    }
	}

	componentWillReceiveProps(nextProps){
		this.setState({
  			data: nextProps.data,
  		})
	}
	render() {
		let height = this.props.maxRows * 24 + 27 + 'px'
		return (
		    <div id={this.props.id} >
		      <ReactTable
		        className={'datatable'}
		        style={{height: height, fontSize: '12px'}}
		        data={this.state.data}
		        columns={this.props.columns}
		        showPagination= {false}
		        defaultPageSize= {this.props.defaultPageSize} />
		    </div>
		)
	}
}