import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import ReactDOM from 'react-dom'
import Config from '../../core/config'

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

		this.isDoubleHeader = false
		this.scrollLeft = 0
		this.mousePos = {x: 0, y:0}
		this.dragLabel = null
		this.dragHighlight = null
		this.prevColIndex = 0
		this.curColIndex = 0
		this.hasCB = true
		this.colsOrder = null
	}

	// getCurColsOrder(columns) {	
	// 	console.log(this.isDoubleHeader)	
	// 	var result = []
	// 	for (let col of columns){
	// 		console.log(col)
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



	componentWillReceiveProps(nextProps) {
		console.log(Config.colsOrder)
		if (nextProps.columns) {document.getElementsByClassName("customCol")
			//Get columns model
			var colsOrderInConf = Config.tableColReorder.find(tbl=>tbl.id==this.props.id)
			var colsWidthInConf = Config.tableColWidth.find(tbl=>tbl.id==this.props.id)
			if (colsOrderInConf!=undefined){
				console.log(colsOrderInConf,nextProps.columns)
				nextProps.columns = colsOrderInConf.colsOrder
			}
			if (colsWidthInConf!=undefined){
				this.setState({resized: colsWidthInConf.colsWidth})
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
			// console.log(nextProps.columns,this.colsOrder)			
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

	extractColInfoForTableMask(i, start,col) {
		//Check double header
		var parent = null
		if (col.className.indexOf("parent-")!=-1){
			parent = col.className.substring(col.className.indexOf("parent-")+7,col.className.length)
		}
		const border = 1
		//Check reorderable props
		let reorderable = (col.className.indexOf("reorderable")===-1?false:true)
		var width = this.getExactWidth(col.parentNode) + border
		let end = start + width
		return {i: i, "id":col.id,"s":start,"e":end,"w":width,"reorderable":reorderable,"parent":parent}
	}

	createTableMask() {
		
		var cols = [...document.getElementsByClassName("customCol")]
		var sum = 0 - this.scrollLeft
		var i = 0
		this.colsWidth = cols.map(col=>{
			var colInfo = this.extractColInfoForTableMask(i++, sum,col)
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

	
	render() {
		let rowodd = this.props.theme.table == undefined ? '#F0F0F0' : this.props.theme.table.rowodd.backgroundColor
		let roweven = this.props.theme.table == undefined ? 'white' : this.props.theme.table.roweven.backgroundColor
		let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
		let font3 = this.props.theme.font3 == undefined ? 'black' : this.props.theme.font3.color
		let font = this.props.theme.font == undefined ? 'black' : this.props.theme.font.color
		let tableheaderbackground = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader.backgroundColor
		let nodatadisplay = this.props.theme.table == undefined ? undefined : this.props.theme.table.nodatadisplay
		let height = this.props.maxRows * 24 + 27 + 'px'
		let widgetheader = this.props.theme.widget == undefined ? undefined : this.props.theme.widget.widgetheader.backgroundColor
		let newColumns = this.state.columns
		if (!this.props.id.includes('-table') && this.state.columns===this.props.columns) {
			newColumns = this.state.columns.map((column) => {
				if (column.columns!=null) {
					if (!this.isDoubleHeader){
						this.isDoubleHeader = true
					}
					var newSubColumns = column.columns.map(subColumn=>{
						return Object.assign({}, subColumn, {
							Header: headerRenderer(this, subColumn.id, subColumn.reorderable, subColumn.Header, subColumn.parent)
						})
					})
					return Object.assign({}, column, {"columns": newSubColumns})
				}else{
					return Object.assign({}, column, {
						Header: headerRenderer(this, column.id, column.reorderable, column.Header)
					})
				}
			})
		}
		
		return (
			<div className="hks-table" id={this.props.id} onScroll={e=>this.handleOnScroll(e)}>
				<ReactTable
					ref = {e=>this.mainTable = e}
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
					columns={newColumns}
					showPagination={false}
					defaultPageSize={this.props.defaultPageSize}
					onResizedChange={resized => this.onChangeHeaderWidth(resized)}
					resized = {this.state.resized}
					/>
			</div>
		)
		
	}

	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove.bind(this))
		window.addEventListener('mouseup', this.handleOnMouseUp.bind(this))
    }

	mountPortal(newLabel,newLabelID) {
		if (this.dragLabel!=null){
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
		this.curColIndex = this.colsWidth.findIndex(col=>(col.id==newLabelID))
		this.prevColIndex = this.curColIndex
		var curCol = this.colsWidth[this.curColIndex]
		//Add highlight
		this.dragHighlight = document.createElement('div')
		this.dragHighlight.id ="draghighlight"
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
		if (this.dragLabel==null || this.dragLabel==undefined) {
			return;
		}
		var curComp = ReactDOM.findDOMNode(this)
		var curCompRect = curComp.getBoundingClientRect()
		var x = e.pageX - curCompRect.left
		var y = e.pageY - curCompRect.top

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
			this.dragHighlight.style.border = "3px solid rgba(220, 220, 220, .5)"
		}else {
			this.dragHighlight.style.border = "3px solid rgba(236, 141, 141, .4)"
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
		&& this.colsWidth[this.prevColIndex].reorderable){
			
			var arr = this.state.columns
			var startFromIdx = 0
			console.log("IsDouble  ", this.isDoubleHeader)
			if (this.isDoubleHeader){
				if (this.colsWidth[this.curColIndex].parent==null
					|| this.colsWidth[this.prevColIndex].parent==null
					|| this.colsWidth[this.prevColIndex].parent!=this.colsWidth[this.curColIndex].parent){
						this.unmountPortal()
						return
					}
				arr = arr.find(el=>(el.id==this.colsWidth[this.curColIndex].parent)).columns				
				startFromIdx = this.colsWidth.find(col=>col.id == arr[0].id).i
			}
			//swap two column
			
			var temp = arr[this.prevColIndex-startFromIdx]
			arr[this.prevColIndex - startFromIdx] = arr[this.curColIndex - startFromIdx]
			arr[this.curColIndex - startFromIdx] = temp

			
			//save for next props update
			// this.colsOrder = this.getCurColsOrder([...this.state.columns])
			// console.log(this.colsOrder)
			var curColsOrderInConf = Config.tableColReorder.find(tbl=>tbl.id==this.props.id)
			if (curColsOrderInConf==undefined){
				curColsOrderInConf = {id:this.props.id, colsOrder:[]}
				Config.tableColReorder = [...Config.tableColReorder, curColsOrderInConf]
			}
			
			curColsOrderInConf.colsOrder = this.state.columns
			this.setState({
				columns: [...this.state.columns]
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
	// 	e.target.style = ''this.props.id == 'portfolio' ? this.props.columns : 
	// }
}
function expand(data) {
	let rows = []
	for (var i = 1; i <= data.length; i++) {
		rows = rows.concat(i)
	}
	return rows;
}

function headerRenderer(component, id, reorderable, text, parent) {
	switch (id) {
		case 'cb':
			return (
				<input id={component.props.id + "-cb-all" + (parent!=undefined?" parent-"+parent:"")} 
					onMouseDown={e => component.handleOnMouseDown(e)}
					onMouseUp={(e) => component.handleOnMouseUp(e)} 
					type='checkbox'
					className={"row-checkbox customCol" + (reorderable==false?"":" reorderable")}
					onChange={() => component.props.onRowSelected('ALL')} />
			)
		default:
			return (
				<div id={id} className={"customCol " + (reorderable==false?"":" reorderable") + (parent!=undefined?" parent-"+parent:"")}
					onMouseDown={e => component.handleOnMouseDown(e)}
					onMouseUp={(e) => component.handleOnMouseUp(e)}>{text}</div>
			)
	}

}