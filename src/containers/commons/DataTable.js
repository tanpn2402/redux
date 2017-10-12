import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class DataTable extends React.Component {
	constructor() {
		super()
	}

	componentWillReceiveProps(nextProps) {
	}

	render() {
		let rowodd = this.props.theme.table == undefined? '#F0F0F0':this.props.theme.table.rowodd.backgroundColor
		let roweven = this.props.theme.table == undefined? 'white':this.props.theme.table.roweven.backgroundColor
		let font2 = this.props.theme.font2 == undefined? 'black':this.props.theme.font2.color
		let font = this.props.theme.font == undefined? 'black':this.props.theme.font.color
		let tableheaderbackground = this.props.theme.table == undefined? undefined:this.props.theme.table.tableheader.backgroundColor
		let nodatadisplay = this.props.theme.table == undefined? undefined:this.props.theme.table.nodatadisplay
		let height = this.props.maxRows * 24 + 27 + 'px'
		return (
			<div className="hks-table" id={this.props.id}>
				<ReactTable
					getTrProps={(state, rowInfo, column, instance) => {
						if (rowInfo != undefined) {
							return {
								style: {
									background: rowInfo.index%2==0? roweven:rowodd,
									color: font2
								}
							}
						}else{
							return{}
						}
					}}
					getTheadProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								color: font,
								background: tableheaderbackground
							}
						}
					}}
					getTheadGroupProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								color: font,
								background: tableheaderbackground
							}
						}
					}}
					getNoDataProps={(state,rowInfo, column, instance) => {
						return {
							style: nodatadisplay
						}
					}}
					className={'datatable -striped'}
					style={{ height: this.props.maxRows === undefined ? '100%' : height, }}
					data={this.props.data}
					columns={this.props.columns}
					showPagination={false}
					defaultPageSize={this.props.defaultPageSize} />
			</div>
		)
	}
}