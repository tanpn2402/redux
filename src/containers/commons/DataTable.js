import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import ReactDOM from 'react-dom'
import Config from '../../core/config'
import ListView from './ListView'
import Pagination from './Pagination'
import SearchBar from './SearchBar'

export default class Table extends React.Component {
	render() {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			// mobile render to ListView
			return (
				<ListView  {...this.props} />
			)
		}
		else {
			// desktop render to DataTable
			return (
				<DesktopTable {...this.props} />
			)
		}
	}
}

class DesktopTable extends React.Component {
	// language dung o muc page
	constructor(props) {
		super(props)
	}

	render() {
		let tableheader = this.props.theme.table.tableheader
		let tablefooter = this.props.theme.table.tablefooter
		return (
			<div className="destop-table" style={{ width: "100%", height: "100%", position: "relative" }}>

				<div className={"table-main " + (this.props.searchEnable ? "" : "no-header")} style={tableheader}>
					<DataTable
						theme={this.props.theme}
						key={this.props.id}
						id={this.props.id}
						defaultPageSize={this.props.pageSize}
						columns={this.props.columns}
						filterable={this.props.filterable}
						pivot={this.props.pivot}
						data={this.props.tableData}
						language={this.props.language[this.props.idParent ? this.props.idParent : this.props.id].header}
						onRowSelected={this.onRowSelected.bind(this)}
					/>
				</div>

				{
					!this.props.searchEnable ? null :
						(
							<div className="table-header">
								<SearchBar
									id={this.props.id}
									onSearch={this.props.onSearch ? this.onSearch.bind(this): undefined}
									buttonAction={this.props.searchActions}
									language={this.props.language.searchbar}
									theme={this.props.theme}
									data={this.props.searchData}
									param={this.props.searchParams} />
							</div>
						)
				}

				<div className="table-footer" style={tablefooter}>
					<Pagination
						theme={this.props.theme}
						pageIndex={this.props.pageIndex}
						totalPage={this.props.totalPage}
						onPageChange={this.onPageChange.bind(this)}
						onExportExcel={this.props.onExportExcel ? this.onExportExcel.bind(this) : undefined}
					/>
				</div>
			</div>
		)
	}


	onPageChange(page) {
		if (this.props.onPageChange) {
			this.props.onPageChange(page)
		}
	}

	onExportExcel() {
		if (this.props.onExportExcel) {
			this.props.onExportExcel()
		}
	}

	onSearch(params) {
		if (this.props.onSearch) {
			this.props.onSearch(params)
		}
	}

	onRowSelected(rows) {
		if (this.props.onRowSelected) {
			this.props.onRowSelected(rows)
		}
	}
}

DesktopTable.defaultProps = {
	// search bar props
	searchParams: [],
	searchActions: [],
	searchData: [],  // { stockList: this.stockList }
	// onSearch: -> fn

	// pagination props
	pageIndex: 1,
	totalPage: 1,
	// onPageChange: -> fn
	// onExportExcel: -> fn

	// table props
	pageSize: 15,
	columns: [],
	filterable: false,
	tableData: [],
	searchEnable: true,
	pivot: "",
	// onRowSelected: -> fn

	// mobile
	searchMobileParams: [],
	searchDefaultValues: [],

	// mutual props
	id: "",
	theme: [],
	language: [],

}

class DataTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mouseDownCol: null,
			resized: [],
			language: this.props.language,
		}

		this.colA = {
			index: 0,
			object: {}
		}
		this.colB = {
			index: 0,
			object: {}
		}

		this.isHeaderRendered = false
		this.isDoubleHeaderTable = false
		this.scrollLeft = 0
		this.mousePos = { x: 0, y: 0 }
		this.dragLabel = null
		this.dragHighlight = null
		this.fromColIndex = 0
		this.toColIndex = 0
		this.hasCB = true
		this.colsOrder = null
		this.colsWidth = null

		this.handleOnMouseUp = this.handleOnMouseUp.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
		this.handleOnMouseDown = this.handleOnMouseDown.bind(this)

	}

	// COMPONENT LIFE CYCLE
	componentWillMount() {
		this.loadHeaderLanguage(this.props.language)
	}

	componentDidMount() {
		this.curComp.style.overflow = "hidden"
	}

	componentWillUnmount() {
		// Make sure to remove the DOM listener when the component is unmounted.

	}

	componentWillReceiveProps(nextProps) {

		if (this.state.language != nextProps.language) {
			this.setState({
				language: nextProps.language
			})
			this.loadHeaderLanguage(nextProps.language)
		}

	}




	render() {

		let rowodd = this.props.theme.table == undefined ? '#F0F0F0' : this.props.theme.table.rowodd.backgroundColor
		let roweven = this.props.theme.table == undefined ? 'white' : this.props.theme.table.roweven.backgroundColor
		let filterrow = this.props.theme.table.filterrow
		let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
		let font3 = this.props.theme.font3 == undefined ? 'black' : this.props.theme.font3.color
		let font = this.props.theme.font == undefined ? 'black' : this.props.theme.font.color
		let tableheaderbackground = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader.backgroundColor
		let nodatadisplay = this.props.theme.table == undefined ? undefined : this.props.theme.table.nodatadisplay
		let height = this.props.maxRows * 24 + 27 + 'px'
		let widgetheader = this.props.theme.widget == undefined ? undefined : this.props.theme.widget.widgetheader.backgroundColor

		let newStateColumns = this.state.columns

		let notPopupTable = !this.props.id.includes('-table')



		if (notPopupTable && !this.isHeaderRendered) { //Then render div in header
			newStateColumns = this.state.columns.map((column) => {
				let tableHasSubColumns = column.columns != null
				if (tableHasSubColumns) {
					if (!this.isDoubleHeaderTable) {
						this.isDoubleHeaderTable = true
					}
					//Render div header in subcolumns header
					var newSubColumns = column.columns.map(subColumn => {
						//Render header
						return Object.assign({}, subColumn, {
							Header: this.headerRenderer(this, subColumn.id, subColumn.reorderable, subColumn.Header, subColumn.parent),
							headerStyle: { boxShadow: 'none' }
						})
					})
					return Object.assign({}, column, { "columns": newSubColumns })
				} else {
					//Render div header in columns header
					return Object.assign({}, column, {
						Header: this.headerRenderer(this, column.id, column.reorderable, column.Header),
						headerStyle: { boxShadow: 'none' }
					})
				}
			})

			this.state.columns = newStateColumns
		}
		return (
			<div ref={e => { this.curComp = e }} className="hks-table" id={this.props.id} onScroll={e => this.handleOnScroll(e)}>
				<ReactTable
					ref={e => this.mainTable = e}
					filterable={this.props.filterable != undefined ? this.props.filterable : false}
					onSortedChange={(sorted) => this.setState({ sorted: sorted })}
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
								background: filterrow.backgroundColor,
								color: filterrow.color
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
					columns={newStateColumns}
					showPagination={false}
					defaultPageSize={this.props.defaultPageSize}
					onResizedChange={resized => this.onChangeHeaderWidth(resized)}
					resized={this.state.resized}
				/>
			</div>
		)

	}


	// handleOnMouseEnter(e) {
	// 	if (e.target.id == this.colA.object.id || this.colA.object.id == undefined) return
	// 	e.target.style = 'color: white; background-color: black;'
	// }
	// handleOnMouseLeave(e) {
	// 	e.target.style = ''this.props.id == 'portfolio' ? this.props.columns : 
	// }


	// COLUMN INFO EXTRACTOR
	getColInfo(i, start, colNode) {
		const BORDER_WIDTH = 1
		const DEF_COL_SIZE = {
			"i": "",
			"id": "",
			"s": "",
			"e": "",
			"w": "",
			"reorderable": "",
			"parent": null
		}

		//Check double header
		let haveParentHeader = colNode.className.indexOf("parent-") != -1
		var parentID = null

		if (haveParentHeader) {
			parentID = colNode.className.substring(colNode.className.indexOf("parent-") + 7, colNode.className.length)
		}

		//Check reorderable props
		let reorderable = (colNode.className.indexOf("reorderable") === -1 ? false : true)
		let width = getComponentExactWidth(colNode.parentNode) + BORDER_WIDTH
		let end = start + width

		return Object.assign({}, DEF_COL_SIZE,
			{ i: i, "id": colNode.id, "s": start, "e": end, "w": width, "reorderable": reorderable, "parent": parentID })
	}

	getColsSizeArray(targetComp) {
		if (targetComp == null) return

		var cols = [...targetComp.getElementsByClassName("customCol")]
		var sum = 0 - this.scrollLeft
		var i = 0
		this.colsWidth = cols.map(col => {
			var colInfo = this.getColInfo(i++, sum, col)
			sum += colInfo.w
			return colInfo
		})
	}

	onChangeHeaderWidth(resized) {
		this.setState({ resized })
		//save for next props update
		var curColsWidthInConf = Config.tableColWidth.find(tbl => tbl.id == this.props.id)
		if (curColsWidthInConf == undefined) {
			curColsWidthInConf = resized
			Config.tableColWidth = [...Config.tableColWidth, { id: this.props.id, colsResized: curColsWidthInConf }]
		}
		curColsWidthInConf.colsResized = resized
	}

	// DYNAMIC RENDERERS
	mountColLabelCursor(newLabel, newLabelID) {
		if (this.dragLabel != null) {
			this.unmountColLabelCursor()
		}
		//Add label on cursor
		this.dragLabel = document.createElement('div')
		this.dragLabel.id = "draglabel"
		this.dragLabel.innerHTML = newLabel

		if (this.curComp == null) return

		this.curComp.appendChild(this.dragLabel)

		this.getColsSizeArray(this.curComp)

		//which col is being selected
		this.toColIndex = this.colsWidth.findIndex(col => (col.id == newLabelID))
		this.fromColIndex = this.toColIndex
		var curCol = this.colsWidth[this.toColIndex]
		//Add highlight
		this.dragHighlight = document.createElement('div')
		this.dragHighlight.id = "draghighlight"
		this.dragHighlight.style.left = curCol.s + "px"
		this.dragHighlight.style.width = curCol.w + "px"
		var parentTable = document.getElementsByClassName('datatable -striped')[0]
		this.dragHighlight.style.top = window.getComputedStyle(this.curComp.parentNode).getPropertyValue("padding-top")
		this.dragHighlight.style.height = getComponentExactHeight(parentTable) + "px"
		this.curComp.appendChild(this.dragHighlight)

	}

	unmountColLabelCursor() {

		if (this.dragLabel == null) {
			return
		}
		//Unmount draglabel
		var parentNode = this.dragLabel.parentNode
		if (parentNode == null) return
		parentNode.removeChild(this.dragLabel)
		this.dragLabel = null

		//Unmount draghighlight
		var parentNode = this.dragHighlight.parentNode
		parentNode.removeChild(this.dragHighlight)
		this.dragHighlight = null

		this.toColIndex = -1
		this.fromColIndex = -1
	}

	loadHeaderOrder(config) {
		this.isHeaderRendered = false

		//Get columns model
		var colsOrderInConfig = config.tableColReorder.find(tbl => tbl.id == this.props.id)
		var colsWidthInConfig = config.tableColWidth.find(tbl => tbl.id == this.props.id)

		if (colsOrderInConfig != undefined) {
			this.colsOrder = colsOrderInConfig.colsOrder
		} else {
			this.colsOrder = getColsOrder(JSON.parse(JSON.stringify(this.props.columns)))
		}

		if (colsWidthInConfig != undefined) {
			this.setState({ resized: colsWidthInConfig.colsResized })
		}

		var newColumns = JSON.parse(JSON.stringify(this.props.columns))

		if (this.colsOrder != null) {
			newColumns = this.colsOrder.map(curColInfo => {
				var curCol = this.props.columns.find(col => col.id == curColInfo.id)
				if (curCol.columns != null) {
					var newSubCol = curColInfo.columns.map(subCol => (curCol.columns.find(col =>
						col.id == subCol.id)))
					curCol.columns = newSubCol
				}
				return Object.assign({}, curCol)
			})
		}
		return newColumns

	}

	loadHeaderLanguage(language) {
		this.isHeaderRendered = false

		var translatedHeaders = this.loadHeaderOrder(Config)
		for (var col of translatedHeaders) {
			if (col.Header == undefined) {
				if (language[col.id] != undefined) {
					col.Header = language[col.id]
				} else {
					col.Header = col.id
				}
			}

			if (col.columns != undefined) {
				col.columns = col.columns.map(subCol => {
					if (language[subCol.id] != undefined) {
						subCol.Header = language[subCol.id]
					} else {
						subCol.Header = subCol.id
					}

					return subCol
				})
			}

		}
		this.setState({
			columns: translatedHeaders
		})
	}

	// EVENT HANDLERS
	handleOnScroll(e) {
		if (this.curComp == null) return

		var scrollComp = this.curComp.getElementsByClassName('rt-table')[0]
		this.scrollLeft = scrollComp.scrollLeft
	}

	handleMouseMove(e) {
		if (this.dragLabel == null || this.dragLabel == undefined) {
			return;
		}

		if (this.curComp == null) return

		var curCompRect = this.curComp.getBoundingClientRect()
		var x = e.pageX - curCompRect.left
		var y = e.pageY - curCompRect.top



		this.dragLabel.style.left = x + "px"
		this.dragLabel.style.top = y + "px"

		var curCol = this.colsWidth[this.toColIndex]

		if (x > curCol.e && this.toColIndex < this.colsWidth.length - 1) {
			this.toColIndex += 1
			curCol = this.colsWidth[this.toColIndex]
		} else if (x < curCol.s && this.toColIndex > 0) {
			this.toColIndex -= 1
			curCol = this.colsWidth[this.toColIndex]
		} else {
			return;
		}

		this.dragHighlight.style.height = curCompRect.height + "px"

		if (!curCol.reorderable || !this.colsWidth[this.fromColIndex].reorderable || (this.isDoubleHeaderTable && (curCol.parent == null || this.colsWidth[this.fromColIndex].parent == null))) {
			this.dragHighlight.style.border = "3px solid rgba(220, 220, 220, .5)"
		} else {
			this.dragHighlight.style.border = "3px solid rgba(236, 141, 141, .4)"
		}
		this.dragHighlight.style.left = curCol.s + "px"
		this.dragHighlight.style.width = curCol.w + "px"


	}


	handleOnMouseDown(e) { // begin dragging	

		// this.colA.object = e.target
		// if (this.colA.object.id == undefined) return
		// let idA = this.colA.object.id
		// let result = this.state.columns.findIndex((column) => {
		// 	return column.id == idA
		// })
		// this.colA.index = result != -1 ? result : 0

		this.mountColLabelCursor(e.target.innerHTML, e.target.id)
		this.handleMouseMove(e)
		window.addEventListener('mousemove', this.handleMouseMove)
		window.addEventListener('mouseup', this.handleOnMouseUp)
	}

	handleOnMouseUp(e) { // end dragging
		var toColumn = this.colsWidth[this.toColIndex]
		var fromColumn = this.colsWidth[this.fromColIndex]
		if (this.toColIndex != this.fromColIndex
			&& toColumn.reorderable
			&& fromColumn.reorderable) {

			var curColsArray = this.state.columns
			var curColsOrderArray = this.colsOrder
			var colIndexInArray = 0


			const FROMCOLUMN_HAS_PARENT = this.colsWidth[this.toColIndex].parent != null
			const TOCOLUMN_HAS_PARENT = this.colsWidth[this.fromColIndex].parent != null
			const FROMCOLUMN_TOCOLUMN_SAMEPARENT = this.colsWidth[this.fromColIndex].parent != this.colsWidth[this.toColIndex].parent

			if (this.isDoubleHeaderTable) {
				if (!FROMCOLUMN_HAS_PARENT || !TOCOLUMN_HAS_PARENT || FROMCOLUMN_TOCOLUMN_SAMEPARENT) {
					this.unmountColLabelCursor()
					return
				}
				curColsArray = curColsArray.find(el => (el.id == this.colsWidth[this.toColIndex].parent)).columns
				colIndexInArray = this.colsWidth.find(col => col.id == curColsArray[0].id).i
				curColsArray = swap(curColsArray, this.fromColIndex - colIndexInArray, this.toColIndex - colIndexInArray)

			} else {
				curColsArray = swap(curColsArray, this.fromColIndex - colIndexInArray, this.toColIndex - colIndexInArray)

			}


			//save for next props update
			// this.colsOrder = this.getCurColsOrder([...this.state.columns])
			var colsOrderInConfig = Config.tableColReorder.find(tbl => tbl.id == this.props.id)
			if (colsOrderInConfig == undefined) {
				colsOrderInConfig = { id: this.props.id, colsOrder: [] }
				Config.tableColReorder = [...Config.tableColReorder, colsOrderInConfig]
			}

			this.colsOrder = getColsOrder(this.state.columns)
			colsOrderInConfig.colsOrder = this.colsOrder


			this.setState({
				columns: [...this.state.columns]
			})

			// this.colA = {
			// 	index: 0,
			// 	object: {}
			// }
			// this.colB = {
			// 	index: 0,
			// 	object: {}
			// }
		}


		this.unmountColLabelCursor()

		window.removeEventListener('mousemove', this.handleMouseMove)
		window.removeEventListener('mouseup', this.handleOnMouseUp)
	}

	headerRenderer(component, id, reorderable, text, parent) {
		this.isHeaderRendered = true
		switch (id) {
			case 'cb':
				return (
					<input id={component.props.id + "-cb-all" + (parent != undefined ? " parent-" + parent : "")}
						onMouseDown={e => component.handleOnMouseDown(e)}
						type='checkbox'
						className={"row-checkbox customCol" + (reorderable == false ? "" : " reorderable")}
						onChange={() => component.props.onRowSelected('ALL')} />
				)
			default:
				return (
					<div id={id} className={"customCol " + (reorderable == false ? "" : " reorderable") + (parent != undefined ? " parent-" + parent : "")}
						onMouseDown={e => component.handleOnMouseDown(e)}>{text}</div>
				)
		}


	}
}

//UTILS FUNCTIONS
function expand(data) {
	let rows = []
	for (var i = 1; i <= data.length; i++) {
		rows = rows.concat(i)
	}
	return rows;
}


function getComponentExactWidth(e) {
	let rect = e.getBoundingClientRect()
	if (rect.width) {
		// `width` is available for IE9+
		return rect.width;
	} else {
		// Calculate width for IE8 and below
		return rect.right - rect.left;
	}
}

function getComponentExactHeight(e) {
	let rect = e.getBoundingClientRect()
	if (rect.height) {
		// `width` is available for IE9+
		return rect.height;
	} else {
		// Calculate width for IE8 and below
		return rect.bottom - rect.top;
	}
}

function swap(arr, a, b) {
	let temp = arr[a]
	arr[a] = arr[b]
	arr[b] = temp
	return arr
}

function getColsOrder(columnsObject) {
	return columnsObject.map(col => {
		if (col.columns != null) {
			return {
				id: col.id,
				columns: col.columns.map(subcol => (
					{ id: subcol.id }
				))
			}
		} else {
			return {
				id: col.id
			}
		}
	})
}
