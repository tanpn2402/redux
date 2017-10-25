import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class DataTable extends React.Component {
	constructor() {
		super()
		this.state = {
			columns: []
		}

		this.colA = {
			index: 0,
			object: {}
		}
		this.colB = {
			index: 0,
			object: {}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.columns) {
			this.setState({
				columns: nextProps.columns
			})
		}
	}

	render() {
		let rowodd = this.props.theme.table == undefined ? '#F0F0F0' : this.props.theme.table.rowodd.backgroundColor
		let roweven = this.props.theme.table == undefined ? 'white' : this.props.theme.table.roweven.backgroundColor
		let filterrow = this.props.theme.table.filterrow.backgroundColor
		let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
		let font3 = this.props.theme.font3 == undefined ? 'black' : this.props.theme.font3.color
		let font = this.props.theme.font == undefined ? 'black' : this.props.theme.font.color
		let tableheaderbackground = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader.backgroundColor
		let nodatadisplay = this.props.theme.table == undefined ? undefined : this.props.theme.table.nodatadisplay
		let height = this.props.maxRows * 24 + 27 + 'px'
		let widgetheader = this.props.theme.widget == undefined ? undefined : this.props.theme.widget.widgetheader.backgroundColor
		let newColumns = this.props.columns
		if (!this.props.id.includes('-table')) {
			newColumns = this.state.columns.map((column) => {
				return Object.assign({}, column, {
					Header: headerRenderer(this, column.id, column, column.Header)
				})
			})
		}
		return (
			<div className="hks-table" id={this.props.id}>
				<ReactTable
					filterable={this.props.filterable != undefined ? this.props.filterable : false}
					getTrProps={(state, rowInfo, column, instance) => {
						if (rowInfo != undefined && rowInfo.aggregated == undefined) {
							return {
								style: {
									background: rowInfo.index % 2 == 0 ? roweven : rowodd,
									color: font2
								}
							}
						} else if (rowInfo != undefined && rowInfo.aggregated != undefined) {
							return {
								style: {
									background: widgetheader,
									color: font
								}
							}
						} else {
							return {}
						}
					}}
					getTheadFilterProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								background: filterrow
							}
						}
					}}
					getTheadProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								color: font3,
								background: tableheaderbackground
							}
						}
					}}
					getTheadGroupProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								color: font3,
								background: tableheaderbackground
							}
						}
					}}
					getNoDataProps={(state, rowInfo, column, instance) => {
						return {
							style: nodatadisplay
						}
					}}
					expanded={expand(this.props.data)}
					pivotBy={this.props.pivot}
					className={'datatable -striped'}
					style={{ height: this.props.maxRows === undefined ? '100%' : height, }}
					data={this.props.data}
					columns={this.props.id == 'portfolio' ? this.props.columns : newColumns}
					showPagination={false}
					defaultPageSize={this.props.defaultPageSize} />
			</div>
		)
	}

	handleOnMouseDown(e) { // begin dragging
		this.colA.object = e.target
		if (this.colA.object.id == undefined) return
		let idA = this.colA.object.id
		let result = this.state.columns.findIndex((column) => {
			return column.id == idA
		})
		this.colA.index = result != -1 ? result : 0
	}

	handleOnMouseUp(e) { // end dragging
		this.colB.object = e.target
		if (this.colA.object.id == undefined) return
		let idB = this.colB.object.id
		let result = this.state.columns.findIndex((column) => {
			return column.id == idB
		})
		this.colB.index = result != -1 ? result : 0
		let arr = this.state.columns.slice()
		let a = arr[this.colA.index]
		arr[this.colA.index] = arr[this.colB.index]
		arr[this.colB.index] = a
		this.setState({
			columns: arr
		})
		this.colA = {
			index: 0,
			object: {}
		}
		this.colB = {
			index: 0,
			object: {}
		}
	}

	handleOnMouseEnter(e) {
		if (e.target.id == this.colA.object.id || this.colA.object.id == undefined) return
		e.target.style = 'color: white; background-color: black;'
	}

	handleOnMouseLeave(e) {
		e.target.style = ''
	}

	onRowSelected(param) {
		let rowSelected = []
		if (param === 'ALL') {
			var current = document.getElementById(this.props.id + '-cb-all').checked
			var checkboxes = document.getElementsByClassName(this.props.id + '-row-checkbox')
			for (var i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = current;
			}
			if (current) {
				switch (this.props.id) {
					case 'orderjournal':
						rowSelected = this.props.data !== undefined ?
							this.props.data.filter(el => el.mvShowCancelIcon !== null && el.mvShowCancelIcon === 'Y') : []
						break;
					default:
						rowSelected = this.props.data
				}
			} else {
				rowSelected = []
			}
		} else {
			switch (this.props.id) {
				case 'matchOrderBankList':
					var tmp = rowSelected.filter(el => el.mvOrderID === param.mvOrderID)

					if (tmp.length > 0) {
						// exist in row selected
						rowSelected = rowSelected.filter(el => el.mvOrderID !== param.mvOrderID)
					} else {
						rowSelected.push(param)
					}
					break;
				default:
					var index = this.rowSelected.indexOf(param)
					if (index === -1) {
						this.rowSelected.push(param)
					}
					else {
						this.rowSelected.splice(index, 1)
					}
			}

			if (document.getElementsByClassName(this.props.id + '-row-checkbox').length === rowSelected.length)
				document.getElementById(this.props.id + "-cb-all").checked = true
			else
				document.getElementById(this.props.id + "-cb-all").checked = false
		}
		this.props.handleOnRowSelected({ rowSelected: rowSelected })
	}
}
function expand(data) {
	let rows = []
	for (var i = 1; i <= data.length; i++) {
		rows = rows.concat(i)
	}
	return rows;
}

function headerRenderer(component, id, column, text) {
	switch (id) {
		case 'cb':
			return (
				<input id={component.props.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => component.props.onRowSelected('ALL')} />
			)
		default:
			return (
				<div id={id} reorderable={column.reorderable}
					onMouseLeave={e => component.handleOnMouseLeave(e)}
					onMouseEnter={e => component.handleOnMouseEnter(e)}
					onMouseDown={e => component.handleOnMouseDown(e)}
					onMouseUp={(e) => component.handleOnMouseUp(e)}
				>{text}</div>
			)
	}
}