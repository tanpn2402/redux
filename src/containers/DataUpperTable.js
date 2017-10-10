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

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data,
		})
	}
	render() {
		let rowodd = this.props.theme.rowodd == undefined ? '#F0F0F0' : this.props.theme.rowodd.background
		let roweven = this.props.theme.roweven == undefined ? 'white' : this.props.theme.roweven.background
		let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
		let height = this.props.maxRows * 24 + 27 + 'px'
		return (
			<div className="hks-table" id={this.props.id} >
				<ReactTable
					getTrProps={(state, rowInfo, column, instance) => {
						if (rowInfo != undefined) {
							return {
								style: {
									background: rowInfo.index % 2 == 0 ? roweven : rowodd,
									color: font2
								}
							}
						} else {
							return {}
						}
					}}
					getTheadProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								color: font2
							}
						}
					}}
					getTheadGroupProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								color: font2
							}
						}
					}}
					className={'datatable'}
					style={{ height: this.props.maxRows === undefined ? '100%' : height, }}
					data={this.state.data}
					columns={this.props.columns}
					showPagination={false}
					defaultPageSize={this.props.defaultPageSize} />
			</div>
		)
	}
}