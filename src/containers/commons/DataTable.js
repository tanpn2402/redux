import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import ReactDOM from 'react-dom'
import Config from '../../core/config'
import ListView from './ListView'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import {checkIfMobile} from "../../utils"

export default class Table extends React.Component {
	render() {
		if ( checkIfMobile() ) {
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
		// console.log(this.props)
		let tableSearch = this.props.theme.table.tableSearch
		let tableHeader = this.props.theme.table.tableHeader
		let tableFooter = this.props.theme.table.tableFooter
		let tableBody = this.props.theme.table.tableBody
		
		let language = this.props.language[this.props.idParent ? this.props.idParent : this.props.id]
		return (
			<div className="destop-table" style={{ width: "100%", height: "100%", position: "relative" }}>

				<div className={"table-main"} style={tableBody} ref={e => this.rTable = e}>
					<DataTable
						theme={this.props.theme}
						key={this.props.id}
						id={this.props.id}
						defaultPageSize={this.props.pageSize}
						columns={this.props.columns}
						filterable={this.props.filterable}
						pivot={this.props.pivot}
						getPivotRowProps={this.props.getPivotRowProps}
						data={this.props.tableData}
						language={language ? language.header : undefined}
						onRowSelected={this.onRowSelected.bind(this)}
						maxRows={this.props.maxRows}
						onCellClick={this.props.onCellClick}
					/>
				</div>

				{
					!this.props.searchEnable ? null :
						(
							<div className="table-header" style={tableSearch}>
								<SearchBar
									id={this.props.id}
									onSearch={this.props.onSearch ? this.onSearch.bind(this) : undefined}
									buttonAction={this.props.searchActions}
									language={this.props.language.searchbar}
									theme={this.props.theme}
									data={this.props.searchData}
									param={this.props.searchParams}
									defaultParams={this.props.searchDefaultValues} />
							</div>
						)
				}
				{
					!this.props.footerEnable ? null :
						(
							<div className="table-footer" style={tableFooter}>
								<Pagination
									theme={this.props.theme}
									pageIndex={this.props.pageIndex}
									totalPage={this.props.totalPage}
									onPageChange={this.onPageChange.bind(this)}
									onExportExcel={this.props.onExportExcel ? this.onExportExcel.bind(this) : undefined}
								/>
							</div>
						)
				}


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

	componentDidMount() {
		if (!this.props.searchEnable) {
			this.rTable.classList.add('no-header')
		}
		if (!this.props.footerEnable) {
			this.rTable.classList.add('no-footer')
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
	footerEnable: true,
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
			sorted: [],

			expandList: [1,2,3]
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
		// console.log(props)
	}

	// COMPONENT LIFE CYCLE
	componentWillMount() {
		this.loadHeaderLanguage(this.props)
	}

	componentDidMount() {
		this.curComp.style.overflow = "hidden"
	}

	componentWillUnmount() {
		// Make sure to remove the DOM listener when the component is unmounted.

	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			language: nextProps.language
		})
		this.loadHeaderLanguage(nextProps)

	}




	render() {
		let rowOdd = this.props.theme.table.rowOdd.backgroundColor
		let rowEven = this.props.theme.table.rowEven.backgroundColor
		let filterRow = this.props.theme.table.filterRow
		let font2 = this.props.theme.font.sub1.color
		let font3 = this.props.theme.font.sub2

		let font = this.props.theme.font.main.color
		let tableHeader = this.props.theme.table.tableHeader
		let noDataDisplay = this.props.theme.table.noDataDisplay
		let height = this.props.maxRows * 24 + 27 + 'px'
		let widgetHeader = this.props.theme.widget.widgetHeader.backgroundColor

		let newStateColumns = this.state.columns

		let notPopupTable = !this.props.id.includes('-table')
		let pivotRow = this.props.theme.table.pivotRow


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
							Header: this.headerRenderer(subColumn.id, subColumn.reorderable, subColumn.Header, subColumn.parent),
							headerStyle: { boxShadow: 'none' }
						})
					})
					return Object.assign({}, column, { "columns": newSubColumns })
				} else {
					//Render div header in columns header
					return Object.assign({}, column, {
						Header: this.headerRenderer(column.id, column.reorderable, column.Header),
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
					onSortedChange={(sorted) => {
						this.loadHeaderLanguage(this.props)
						this.setState({ sorted: sorted })
					}}
					
					getTheadFilterProps={(state, rowInfo, column, instance) => {
						return {
							style: {
								background: filterRow.backgroundColor,
								color: filterRow.color
							}
						}
					}}
					getTheadProps={(state, rowInfo, column, instance) => {
						let style = {...font3, ...tableHeader}
						// if(column.background != undefined) {
						// 	style = Object.assign(style, column.background)
						// }
						return {
							style: style
						}
					}}
					getTheadGroupProps={(state, rowInfo, column, instance) => {
						let style = {...font3, ...tableHeader}
						// if(column.background != undefined) {
						// 	style = Object.assign(style, column.background)
						// }
						// console.log(state, rowInfo, column, instance)
						return {
							style: style
						}
					}}
					getTheadThProps={(state, rowInfo, column, instance) => {
						let style = {}
						if(column.background != undefined) {
							style = Object.assign(style, column.background, {textAlign: "center"})
						}
						// console.log(state, rowInfo, column, instance)
						return {
							style: style
						}
					}}
					getTheadGroupThProps={(state, rowInfo, column, instance) => {
						let style = {}
						if(column.background != undefined) {
							style = Object.assign(style, column.background)
						}
						// console.log(state, rowInfo, column, instance)
						return {
							style: style
						}
					}}
					getTdProps={(state, rowInfo, column, instance) => {
						let style = {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}

						if(column.background != undefined) {
							style = Object.assign(style, column.background)
						}

						if (rowInfo != undefined && rowInfo.aggregated == undefined) {
							
							return {
								style: style,
								onClick: e => {
									
										return this.onCellClick(state, rowInfo, column, instance)
									
								}
							}
						} else if (rowInfo != undefined && rowInfo.aggregated != undefined) {
							let a = this.props.getPivotRowProps(rowInfo)
							
							if( a != undefined && a.style != undefined ) {
								style = Object.assign(style, a.style)
							}
							return {
								style: style,
								// onClick: e => {
								// 	return this.onCellClick(state, rowInfo, column, instance)
								// }	
							}
						} else {
							return {}
						}
							
					}}
					getTrProps={(state, rowInfo, column, instance) => {
						if (rowInfo != undefined && rowInfo.aggregated == undefined) {
							return {
								style: {
									background: rowInfo.index % 2 == 1 ? rowEven : rowOdd,
									color: font2,
								}
							}
						} else if (rowInfo != undefined && rowInfo.aggregated != undefined) {
							// aggregated (pivoted)
							let style = {...pivotRow}
							// console.log(this.props)
							let a = this.props.getPivotRowProps(rowInfo)
							
							if( a != undefined && a.style != undefined ) {
								style = Object.assign(style, a.style)
							}
							return {
								style: style
							}
						} else {
							return {}
						}
					}}
					getNoDataProps={(state, rowInfo, column, instance) => {
						return {
							style: noDataDisplay
						}
					}}
					expanded={this.state.expandList}
					onExpandedChange={(newExpanded, index, event) => this.handleExpand(newExpanded, index, event)}
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

	handleExpand(newExpanded, index, e) {
		let {expandList} = this.state
		// console.log(Object.keys(a[b[0]]).length)
		if (expandList[index[0]] == null) {
			expandList[index[0]] = true
			this.setState({
				expandList: expandList
			})

			// console.log(this.state.expandList)

		} else {
			// console.log("aa")
			expandList[index[0]] = !expandList[index[0]]
			this.setState({
				list: expandList
			})
		}
	}

	onCellClick(state, rowInfo, column, instance) {
		// console.log(state)
		if(this.props.onCellClick != undefined) {
			this.props.onCellClick(state, rowInfo, column, instance)
		}
	}
	


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

	loadHeaderOrder(nextProps) {
		this.isHeaderRendered = false

		//Get columns model
		var colsOrderInConfig = Config.tableColReorder.find(tbl => tbl.id == nextProps.id)
		var colsWidthInConfig = Config.tableColWidth.find(tbl => tbl.id == nextProps.id)

		if (colsOrderInConfig != undefined) {
			this.colsOrder = colsOrderInConfig.colsOrder
		} else {
			this.colsOrder = getColsOrder(nextProps.columns)
		}

		if (colsWidthInConfig != undefined) {
			this.setState({ resized: colsWidthInConfig.colsResized })
		}

		let newColumns

		if (this.colsOrder != null) {
			newColumns = this.colsOrder.map(curColInfo => {
				var curCol = nextProps.columns.find(col => col.id == curColInfo.id)
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

	loadHeaderLanguage(nextProps) {
		// console.log(nextProps)
		this.isHeaderRendered = false
		let language = nextProps.language
		let translatedHeaders = this.loadHeaderOrder(nextProps)
		for (var col of translatedHeaders) {

			if (col.columns != undefined) {
				col.columns = col.columns.map(subCol => {
					// console.log(language)
					if (language[subCol.id] != undefined) {
						subCol.Header = language[subCol.id]
					} else {
						subCol.Header = subCol.id
					}

					return subCol
				})
			}
			
			if (col.Header == undefined) {
				col = translatedHeaders.map(column => {
					if(column.id == col.id){
						if (language[column.id] != undefined) {
							column.Header = language[column.id]
						} else {
							column.Header = column.id
						}
						return column
					}
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

		let curCol = this.colsWidth[this.toColIndex]
		let startingCol = this.colsWidth[this.fromColIndex]

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

		if (!curCol.reorderable || !this.colsWidth[this.fromColIndex].reorderable
			|| (this.isDoubleHeaderTable && (curCol.parent == null || this.colsWidth[this.fromColIndex].parent == null))
			|| curCol.parent !== startingCol.parent
		) {
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
		}


		this.unmountColLabelCursor()

		window.removeEventListener('mousemove', this.handleMouseMove)
		window.removeEventListener('mouseup', this.handleOnMouseUp)
	}

	headerRenderer(id, reorderable, text, parent) {
		this.isHeaderRendered = true
		let sortedCol = this.state.sorted.find(sortedCol => sortedCol.id == id)
		switch (id) {
			case 'cb':
				return (
					<input
						id={this.props.id + '-cb-all' + (parent != undefined ? ' parent-' + parent : '')}
						type='checkbox'
						onChange={() => this.props.onRowSelected('ALL')}
						className={"row-checkbox customCol" + (reorderable == false ? "" : " reorderable")}
						style={{ position: 'relative', top: '0px' }}
					/>
				)
			default:
				return (
					<div>
						<span id={id} className={"customCol " + (reorderable == false ? "" : " reorderable") + (parent != undefined ? " parent-" + parent : "")}
							onMouseDown={e => this.handleOnMouseDown(e)}>{text}</span>
						{
							!sortedCol ? null
								: <span className={!sortedCol.desc ? 'glyphicon glyphicon-sort-by-attributes' :
									'glyphicon glyphicon-sort-by-attributes-alt'} style={{ marginLeft: '5px' }} />
						}
					</div>
				)
		}
	}
}

//UTILS FUNCTIONS
function expand(data) {
	let rows = []
	for (var i = 1; i <= data.length - 2; i++) {
		console.log(rows)
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
