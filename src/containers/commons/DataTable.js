import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import ReactDOM from 'react-dom'

export default class DataTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mouseDownCol: null,
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

		this.scrollLeft = 0
		this.mousePos = { x: 0, y: 0 }
		this.dragLabel = null
		this.dragHighlight = null
		this.prevColIndex = 0
		this.curColIndex = 0
		this.colsWidth = []
		this.hasCB = true
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.columns) {
			document.getElementsByClassName("customCol")
			this.setState({
				columns: nextProps.columns
			})
		}
	}

	getExactWidth(e) {
		let rect = e.getBoundingClientRect()
		if (rect.width) {
			// `width` is available for IE9+
			return rect.width;
		} else {
			// Calculate width for IE8 and below
			return rect.right - rect.left;
		}
	}

	getExactHeight(e) {
		let rect = e.getBoundingClientRect()
		if (rect.height) {
			// `width` is available for IE9+
			return rect.height;
		} else {
			// Calculate width for IE8 and below
			return rect.bottom - rect.top;
		}
	}

	createTableMask() {
		const border = 1
		var cols = [...document.getElementsByClassName("customCol")]

		var sum = 0 - this.scrollLeft
		this.colsWidth = cols.map(col => {
			//Check reorderable props
			let reorderable = (col.className.indexOf("reorderable") === -1 ? false : true)
			var width = this.getExactWidth(col.parentNode) + border
			let start = sum
			sum += width
			let end = sum
			return { "id": col.id, "s": start, "e": end, "w": width, "reorderable": reorderable }
		})
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
			<div className="hks-table" id={this.props.id} onScroll={e => this.handleOnScroll(e)}>
				<ReactTable
					filterable={this.props.filterable != undefined ? this.props.filterable : false}
					ref={e => this.mainTable = e}
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

	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove.bind(this))
		window.addEventListener('mouseup', this.handleOnMouseUp.bind(this))
	}

	mountPortal(newLabel, newLabelID) {
		if (this.dragLabel != null) {
			this.unmountPortal()
		}
		//Add label on cursor
		this.dragLabel = document.createElement('div')
		this.dragLabel.id = "draglabel"
		this.dragLabel.innerHTML = newLabel
		var curComp = ReactDOM.findDOMNode(this);
		curComp.appendChild(this.dragLabel)

		this.createTableMask()
		//which col is being selected
		this.curColIndex = this.colsWidth.findIndex(col => (col.id == newLabelID))
		this.prevColIndex = this.curColIndex
		var curCol = this.colsWidth[this.curColIndex]
		//Add highlight
		this.dragHighlight = document.createElement('div')
		this.dragHighlight.id = "draghighlight"
		this.dragHighlight.style.left = curCol.s + "px"
		this.dragHighlight.style.width = curCol.w + "px"
		var parentTable = document.getElementsByClassName('datatable -striped')[0]
		this.dragHighlight.style.top = window.getComputedStyle(curComp.parentNode).getPropertyValue("padding-top")
		this.dragHighlight.style.height = this.getExactHeight(parentTable) + "px"
		curComp.appendChild(this.dragHighlight)

	}

	unmountPortal() {
		if (this.dragLabel == null) {
			return
		}
		//Unmount draglabel
		var parentNode = this.dragLabel.parentNode
		parentNode.removeChild(this.dragLabel)
		this.dragLabel = null

		//Unmount draghighlight
		var parentNode = this.dragHighlight.parentNode
		parentNode.removeChild(this.dragHighlight)
		this.dragHighlight = null

		this.curColIndex = -1
		this.prevColIndex = -1
	}

	handleOnScroll(e) {
		var curComp = ReactDOM.findDOMNode(this)
		var scrollComp = curComp.getElementsByClassName('rt-table')[0]
		this.scrollLeft = scrollComp.scrollLeft
	}

	handleMouseMove(e) {
		if (this.dragLabel == null || this.dragLabel == undefined) {
			return;
		}
		var x = e.pageX
		var y = e.pageY

		this.dragLabel.style.left = x + "px"
		this.dragLabel.style.top = y + "px"

		var curCol = this.colsWidth[this.curColIndex]

		if (x > curCol.e && this.curColIndex < this.colsWidth.length - 1) {
			this.curColIndex += 1
			curCol = this.colsWidth[this.curColIndex]
		} else if (x < curCol.s && this.curColIndex > 0) {
			this.curColIndex -= 1
			curCol = this.colsWidth[this.curColIndex]
		} else {
			return;
		}
		if (!curCol.reorderable || !this.colsWidth[this.prevColIndex].reorderable) {
			this.dragHighlight.style.background = "rgba(220, 220, 220, .5)"
		} else {
			this.dragHighlight.style.background = "rgba(236, 141, 141, .4)"
		}
		this.dragHighlight.style.left = curCol.s + "px"
		this.dragHighlight.style.width = curCol.w + "px"

	}


	handleOnMouseDown(e) { // begin dragging	

		this.colA.object = e.target
		if (this.colA.object.id == undefined) return
		let idA = this.colA.object.id
		let result = this.state.columns.findIndex((column) => {
			return column.id == idA
		})
		this.colA.index = result != -1 ? result : 0

		this.mountPortal(e.target.innerHTML, e.target.id)
		this.handleMouseMove(e)
	}

	handleOnMouseUp(e) { // end dragging
		if (this.curColIndex != this.prevColIndex
			&& this.colsWidth[this.curColIndex].reorderable
			&& this.colsWidth[this.prevColIndex].reorderable) {
			var arr = [...this.state.columns]
			//swap two column

			var temp = arr[this.prevColIndex]
			arr[this.prevColIndex] = arr[this.curColIndex]
			arr[this.curColIndex] = temp


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

		this.unmountPortal()
	}

	// handleOnMouseEnter(e) {
	// 	if (e.target.id == this.colA.object.id || this.colA.object.id == undefined) return
	// 	e.target.style = 'color: white; background-color: black;'
	// }

	// handleOnMouseLeave(e) {
	// 	e.target.style = ''
	// }

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
				<input id={component.props.id + "-cb-all"}
					onMouseDown={e => component.handleOnMouseDown(e)}
					onMouseUp={(e) => component.handleOnMouseUp(e)}
					type='checkbox'
					className={"row-checkbox customCol" + (column.reorderable == false ? "" : " reorderable")}
					onChange={() => component.props.onRowSelected('ALL')} />
			)
		default:
			return (
				<div id={id} className={"customCol " + (column.reorderable == false ? "" : " reorderable")}
					onMouseDown={e => component.handleOnMouseDown(e)}
					onMouseUp={(e) => component.handleOnMouseUp(e)}>{text}</div>
			)
	}
}