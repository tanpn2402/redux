import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import ReactDOM from 'react-dom'
import Config from '../../core/config'
import { log } from '../../ttl/utils/TTLUtils'

export default class DataTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mouseDownCol: null,
			columns: this.props.columns,
			resized: []
		}

		this.colA = {
			index: 0,
			object: {}
		}
		this.colB = {
			index: 0,
			object: {}
		}

		this.isDoubleHeaderTable = false
		this.scrollLeft = 0
		this.mousePos = {x: 0, y:0}
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
		log("===========will mount ",this.props.id, this.curComp)
		
	}

	// getCurColsOrder(columns) {	
	// 	log(this.isDoubleHeader)	
	// 	var result = []
	// 	for (let col of columns){
	// 		log(col)
	// 		if (this.isDoubleHeader){
	// 			result = result.concat(col.columns.map(subCol=>({
	// 				id: subCol.id,
	// 				parent: col.id,
	// 			})))
	// 		}else{
	// 			result.push({id: col.id})
	// 		}
	// 	}
	// 	return result
	// }


	// COMPONENT LIFE CYCLE
	componentWillMount() {
		log("===========will mount ",this.props.id, this.curComp)
	}

	componentDidMount() {
		log("===========did mount ",this.props.id, this.curComp)
	}
	
	componentWillUnmount() {
		// Make sure to remove the DOM listener when the component is unmounted.
		log("===========will unmount ",this.props.id)		
		
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.columns) {document.getElementsByClassName("customCol")
			//Get columns model
			var colsOrderInConfig = Config.tableColReorder.find(tbl=>tbl.id==this.props.id)
			var colsWidthInConfig = Config.tableColWidth.find(tbl=>tbl.id==this.props.id)

			if (colsOrderInConfig!=undefined){
				this.colsOrder = colsOrderInConfig.colsOrder
			}

			if (colsWidthInConfig!=undefined){
				this.setState({resized: colsWidthInConfig.colsWidth})
			}
			var newColumns = nextProps.columns
			if (this.colsOrder != null) {
				newColumns = this.colsOrder(curColInfo => {
					var curCol = nextProps.columns.find(col => col.id == curColInfo.id)
					if (curCol.columns != null) {
						var newSubCol = curColInfo.columns.map(subCol => (curCol.columns.find(col => 
																			col.id == subCol.id)))
						curCol.columns = newSubCol
					}
					return curCol
				})
			}
			// if (this.colsOrder!=null){
			// 	var curParent = null
			// 	var newIndex = 0				
			// 	this.colsOrder.map(colInConf=>{
			// 		if (colInConf.parent!=null){
			// 			if (curParent==null || colInConf.parent != curParent.id){
			// 				newIndex = 0
			// 				curParent = nextProps.columns.find(col=>(
			// 					col.id == colInConf.parent
			// 				))
			// 			}
			// 			var curColIndex = curParent.columns.findIndex(col=>col.id==colInConf.id)
			// 			var temp = curParent.columns[newIndex]
			// 			curParent.columns[newIndex] = curParent.columns[curColIndex]
			// 			curParent.columns[curColIndex] = temp
			// 			newIndex++
			// 		} else {
			// 			var curColIndex = nextProps.columns.findIndex(col=>col.id==colInConf.id)
			// 			var temp = nextProps.columns[newIndex]
			// 			nextProps.columns[newIndex] = nextProps.columns[curColIndex]
			// 			nextProps.columns[curColIndex] = temp
			// 			newIndex++
			// 		}
			// 	})
			// }
			this.setState({
				columns: newColumns
			})
			log("Will receive props ", newColumns, this.colsOrder)
		}
	}

	

	
	render() {
		log("Render",this.props.id)
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

		if (notPopupTable) { //Then render div in header
			newStateColumns = this.state.columns.map((column) => {
				let tableHasSubColumns = column.columns!=null
				
				if (tableHasSubColumns) {
					if (!this.isDoubleHeaderTable){
						this.isDoubleHeaderTable = true
					}
					//Render div header in subcolumns header
					var newSubColumns = column.columns.map(subColumn=>{
						//Render header
						return Object.assign({}, subColumn, {
							Header: headerRenderer(this, subColumn.id, subColumn.reorderable, subColumn.Header, subColumn.parent)
						})
					})
					return Object.assign({}, column, {"columns": newSubColumns})
				}else{
					//Render div header in columns header
					return Object.assign({}, column, {
						Header: headerRenderer(this, column.id, column.reorderable, column.Header)
					})
				}
			})

			this.state.columns = newStateColumns
		}
		log(Config.tableColReorder)
		return (
			<div ref={e=>{this.curComp = e}} className="hks-table" id={this.props.id} onScroll={e=>this.handleOnScroll(e)}>
				<ReactTable
					ref = {e=>this.mainTable = e}
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
								background: filterrow.backgroundColor,
								color: filterrow.color
							}
						}
					}}
					getTheadProps={(state, rowInfo, column, instance) => {
						console.log(state, rowInfo, column, instance)
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
					resized = {this.state.resized}
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
			"parent": ""
		}

		//Check double header
		let haveParentHeader = colNode.className.indexOf("parent-")!=-1
		var parentID = null

		if (haveParentHeader){
			parentID = colNode.className.substring(colNode.className.indexOf("parent-")+7,colNode.className.length)
		}
		
		//Check reorderable props
		let reorderable = (colNode.className.indexOf("reorderable")===-1?false:true)
		let width = this.getComponentExactWidth(colNode.parentNode) + BORDER_WIDTH
		let end = start + width

		return Object.assign( {}, DEF_COL_SIZE,
				{i: i, "id":colNode.id,"s":start,"e":end,"w":width,"reorderable":reorderable,"parent":parentID})
	}

	getColsSizeArray(targetComp) {
		if (targetComp == null) return
		
		var cols = [...targetComp.getElementsByClassName("customCol")]
		var sum = 0 - this.scrollLeft
		var i = 0
		this.colsWidth = cols.map(col=>{
			var colInfo = this.getColInfo(i++, sum, col)
			sum+= colInfo.w
			return colInfo
		})
	}

	onChangeHeaderWidth(resized){
		this.setState({resized})
		//save for next props update
		var curColsWidthInConf = Config.tableColWidth.find(tbl=>tbl.id==this.props.id)
		if (curColsWidthInConf == undefined){
			curColsWidthInConf = resized
			Config.tableColWidth = [...Config.tableColWidth, {id:this.props.id,colsWidth:curColsWidthInConf}]
		}
		curColsWidthInConf.colsWidth = resized
	}

	// DYNAMIC RENDERERS
	mountColLabelCursor (newLabel,newLabelID) {
		log("mount portal ",this.props.id, this.curComp)
		if (this.dragLabel!=null){
			this.unmountColLabelCursor()
		}
		//Add label on cursor
		this.dragLabel = document.createElement('div')
		this.dragLabel.id = "draglabel"
		this.dragLabel.innerHTML = newLabel
		
		if (this.curComp == null) return
		
		this.curComp.appendChild(this.dragLabel)

		this.getColsSizeArray()

		//which col is being selected
		this.toColIndex = this.colsWidth.findIndex(col=>(col.id==newLabelID))
		this.fromColIndex = this.toColIndex
		var curCol = this.colsWidth[this.toColIndex]
		//Add highlight
		this.dragHighlight = document.createElement('div')
		this.dragHighlight.id ="draghighlight"
		this.dragHighlight.style.left = curCol.s + "px"
		this.dragHighlight.style.width = curCol.w + "px"
		var parentTable = document.getElementsByClassName('datatable -striped')[0]
		this.dragHighlight.style.top = window.getComputedStyle(this.curComp.parentNode).getPropertyValue("padding-top")
		this.dragHighlight.style.height = this.getComponentExactHeight(parentTable) + "px"
		this.curComp.appendChild(this.dragHighlight)
		
	}

	unmountColLabelCursor() {
		log("unmount portal ",this.props.id)
		
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


	// EVENT HANDLERS
	handleOnScroll(e) {
		if (this.curComp == null) return
		
		var scrollComp = this.curComp.getElementsByClassName('rt-table')[0]
		this.scrollLeft = scrollComp.scrollLeft
	}

	handleMouseMove(e) {
		
		if (this.dragLabel==null || this.dragLabel==undefined) {
			return;
		}
		log("mouse move ",this.props.id)
		
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
		if (!curCol.reorderable || !this.colsWidth[this.fromColIndex].reorderable || (this.isDoubleHeaderTable && (curCol.parent==null || this.colsWidth[this.fromColIndex].parent == null))) {
			this.dragHighlight.style.border = "3px solid rgba(220, 220, 220, .5)"
		}else {
			this.dragHighlight.style.border = "3px solid rgba(236, 141, 141, .4)"
		}
		this.dragHighlight.style.left = curCol.s + "px"
		this.dragHighlight.style.width = curCol.w + "px"

	}
			

	handleOnMouseDown(e) { // begin dragging	
		log("mouse down ",this.props.id, this.curComp, this)

		this.colA.object = e.target
		if (this.colA.object.id == undefined) return
		let idA = this.colA.object.id
		let result = this.state.columns.findIndex((column) => {
			return column.id == idA
		})
		this.colA.index = result != -1 ? result : 0

		this.mountColLabelCursor(e.target.innerHTML, e.target.id)
		this.handleMouseMove(e)
		log("eventlistener will be added",this.curComp)
		window.addEventListener('mousemove', this.handleMouseMove)
		window.addEventListener('mouseup', this.handleOnMouseUp)
	}

	handleOnMouseUp(e) { // end dragging
		log("mouse up ",this.props.id)
		var toColumn = this.colsWidth[this.toColIndex]
		var fromColumn = this.colsWidth[this.fromColIndex]
		
		if (this.toColIndex != this.fromColIndex
		&& toColumn.reorderable
		&& fromColumn.reorderable){
			
			var curColsArray = this.state.columns
			var curColsOrderArray = this.colsOrder
			var colIndexInArray = 0


			const FROMCOLUMN_HAS_PARENT = this.colsWidth[this.toColIndex].parent==null
			const TOCOLUMN_HAS_PARENT = this.colsWidth[this.fromColIndex].parent==null
			const FROMCOLUMN_TOCOLUMN_SAMEPARENT = this.colsWidth[this.fromColIndex].parent!=this.colsWidth[this.toColIndex].parent
			
			if (this.isDoubleHeaderTable){
				if (FROMCOLUMN_HAS_PARENT || TOCOLUMN_HAS_PARENT || FROMCOLUMN_TOCOLUMN_SAMEPARENT){
						this.unmountColLabelCursor()
						return
				}
				curColsArray = curColsArray.find(el=>(el.id==this.colsWidth[this.toColIndex].parent)).columns				
				colIndexInArray = this.colsWidth.find(col=>col.id == curColsArray[0].id).i
			}
			log(curColsArray)
			
			// Swap two column in Columns State
			swap(curColsArray[this.fromColIndex-colIndexInArray], curColsArray[this.toColIndex - colIndexInArray])
			// Swap two column in Columns Order Array
			swap(curColsOrderArray[this.fromColIndex],curColsOrderArray[this.toColIndex])


			//save for next props update
			// this.colsOrder = this.getCurColsOrder([...this.state.columns])
			// log(this.colsOrder)
			var colsOrderInConfig = Config.tableColReorder.find(tbl=>tbl.id == this.props.id)
			if (colsOrderInConfig == undefined){
				colsOrderInConfig = { id: this.props.id, colsOrder: [] }
				Config.tableColReorder = [...Config.tableColReorder, colsOrderInConfig]
			}

			this.colsOrder = getColsOrder(this.state.columns)
			colsOrderInConfig = this.colsOrder

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
		log("eventlistener will be removed",this.curComp)
		
		window.removeEventListener('mousemove', this.handleMouseMove)
		window.removeEventListener('mouseup', this.handleOnMouseUp)
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

//UTILS FUNCTIONS
function expand(data) {
	let rows = []
	for (var i = 1; i <= data.length; i++) {
		rows = rows.concat(i)
	}
	return rows;
}

function headerRenderer(component, id, reorderable, text, parent) {
	log("header ran")
	switch (id) {
		case 'cb':
			return (
				<input id={component.props.id + "-cb-all" + (parent!=undefined?" parent-"+parent:"")} 
					onMouseDown={e => component.handleOnMouseDown(e)} 
					type='checkbox'
					className={"row-checkbox customCol" + (reorderable==false?"":" reorderable")}
					onChange={() => component.props.onRowSelected('ALL')} />
			)
		default:
			return (
				<div id={id} className={"customCol " + (reorderable==false?"":" reorderable") + (parent!=undefined?" parent-"+parent:"")}
					onMouseDown={e => component.handleOnMouseDown(e)}>{text}</div>
			)
	}
	

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

function swap (objA, objB) {
	let temp = objA
	objA = objB
	objB = temp
}

function getColsOrder(columnsObject) {
	return columnsObject.map(col => {
		if (col.columns != null) {
			return {
				id: col.id,
				columns: col.columns.map(subcol => (
					{id: subcol.id}
				))
			}
		}else {
			return {
				id: col.id
			}
		}
	})
}
