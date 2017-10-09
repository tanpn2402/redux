import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class DataTable extends React.Component {
	constructor() {
	    super()
	}

	componentWillReceiveProps(nextProps){
	}

	render() {
		let height = this.props.maxRows * 24 + 27 + 'px'
		return (
		    <div className="hks-table" id={this.props.id} >
		      <ReactTable
		        className={'datatable'}
		        style={{height: this.props.maxRows === undefined ? '100%' : height, }}
		        data={this.props.data}
		        columns={this.props.columns}
		        showPagination= {false}
		        defaultPageSize= {this.props.defaultPageSize} />
		    </div>
		)
	}
}