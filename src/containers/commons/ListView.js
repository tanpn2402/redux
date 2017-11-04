import React from 'react'
import { ReactDOM } from 'react-dom'
export default class ListView extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.state = {
            toRender: false,
            compoWid: 0
        }
    }

    toggleIconExpand(icon) {
        if (icon == "+") {
            return "-"
        } else return "+"
    }

    onClick(id) {
        document.getElementById(id + "-icon").innerHTML = this.toggleIconExpand(document.getElementById(id + "-icon").innerHTML)
    }

    createColumns(columns) {
        let remainWid = this.state.compoWid - 45
        let i = 0
        let col = []
        
        while (remainWid > 0) {
            let column = columns[i]
            if( column.mobile !== false ) {
                if(column.columns === undefined) {
                    if (column.width && remainWid > column.width * 0.7) {
                        if (remainWid > column.width) {
                            col.push({
                                id: column.id,
                                accessor: column.accessor,
                                width: column.width,
                                style: column.style
                            })
                        }
                        else {
                            col.push({
                                id: column.id,
                                accessor: column.accessor,
                                width: remainWid,
                                style: column.style
                            })
                        }
        
                        remainWid -= column.width
                        i += 1
                    } else {
                        col[col.length - 1].width += remainWid
                        remainWid = -1
                    }

                } else {
                    let tmp = this.whenHasChildCol(column.columns, remainWid, col)
                    remainWid =  tmp.remainWid
                    col = (tmp.columns)
                    i++;
                }
            } else i++
        }

        return col
    }

    whenHasChildCol(columns, remainWid, col) {
        let i = 0
        
        while (remainWid > 0 && i < columns.length) {
            let column = columns[i]
            if( column.mobile !== false ) {
                if (column.width && remainWid > column.width * 0.7) {
                    if (remainWid > column.width) {
                        col.push({
                            id: column.id,
                            accessor: column.accessor,
                            width: column.width,
                            style: column.style
                        })
                    }
                    else {
                        col.push({
                            id: column.id,
                            accessor: column.accessor,
                            width: remainWid,
                            style: column.style
                        })
                    }
    
                    remainWid -= column.width
                    i += 1
                } else {
                    col[col.length - 1].width += remainWid
                    remainWid = -1
                }
            } else i++
        }

        return {
            columns: col,
            remainWid: remainWid
        }
    }

    getMaxWid(columns, col) {
        let max = 0
        let addCol = []
        for (let i = 0; i < columns.length; i++) {
            if(columns[i].columns !== undefined) {
                let subCol = columns[i].columns
                for(let j = 0; j < subCol.length; j++) {
                    let t = col.filter(f => f.id === subCol[j].id)
                    if (t.length > 0) {
                        continue
                    } else if(subCol[j].mobile !== false) {
                        addCol.push(subCol[j])
                        if (subCol[j].width > max) {
                            max = subCol[j].width
                        }
                    }
                }
            }
            else {
                let t = col.filter(f => f.id === columns[i].id)
                if (t.length > 0) {
                    continue
                } else if(columns[i].mobile !== false) {
                    addCol.push(columns[i])
                    if (columns[i].width > max) {
                        max = columns[i].width
                    }
                }
            }
        }
        return {
            maxWid: max,
            addCol: addCol
        }
    }

    render() {
       
        console.log(this.props)
        let language = this.props.language[this.props.id]
        let data = this.props.tableData
        let columns = this.props.columns

        // console.log(this.props.columns)
        let width = window.innerWidth



        let col = this.createColumns(columns)
        let maxWid = this.getMaxWid(columns, col).maxWid
        let addCol = this.getMaxWid(columns, col).addCol

        // console.log(col)
        let rowStamp = (new Date()).getTime()
        let row = 1

        // actions
        let actions = columns.filter(e => e.id === "mobileaction")
        let action = null
        if(actions.length > 0) {
            action = actions[0]
        } else action = null


        // pivot
        let pivotEnabled = false
        let pivotLabel = ""
        let pivotContrainst = ""
        let pivotFlag = true

        if(this.props.pivot !== undefined && this.props.pivot.length > 0 ) {
            let pivot = this.props.pivot
            pivotEnabled = true
            data.sort((a, b) => {
                var nameA = a[pivot[0]].toUpperCase()
                var nameB = b[pivot[0]].toUpperCase()
                if (nameA < nameB) {
                    return -1
                  }
                  if (nameA > nameB) {
                    return 1
                  }
                  return 0
            })
            pivotContrainst = pivot[0]
            // console.log(data)
        }
        
        return (
            <div className="listview-control" ref={node => this.lv = node}>

                {
                    !this.state.toRender ? "" :
                        (
                            <div className="rt-lv" style={{ height: "100%" }}>
                                <div className="lv-thead" ref={ref => this.refTHead = ref}>
                                    <div className="lv-tr">
                                        <div className="lv-th" style={{ width: "30px" }}></div>
                                        {
                                            col.map(hd => {
                                                return (
                                                    <div className="lv-th" style={Object.assign({ width: hd.width }, hd.style)}>
                                                        {language.header[hd.id]}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="lv-tbody" ref={ref => this.refTBody = ref}>
                                    <div className="lv-tbody-b">
                                        {
                                            data.map(d => {
                                                let rowId = "r-" + rowStamp + "-" + (row++)
                                                if(pivotEnabled && d[pivotContrainst] != pivotLabel) {
                                                    pivotLabel = d[pivotContrainst]
                                                    pivotFlag = false
                                                } else {
                                                    pivotFlag = true
                                                }   
                                                    
                                                
                                                return (
                                                <div>
                                                    {
                                                        !pivotEnabled ? null : pivotFlag ? null :
                                                        (
                                                            <div className="lv-pivot-group">
                                                                { pivotLabel }
                                                            </div>
                                                        )
                                                    }
                                                    <div className="lv-tr-group">
                                                        <div data-toggle="collapse" data-target={"#" + rowId} className="lv-tr odd" onClick={e => this.onClick(rowId)}>
                                                            <div className="lv-td icon" style={{ width: "30px" }}>
                                                                <span className="lv-expand-icon" id={rowId + "-icon"}>+</span>
                                                            </div>

                                                            {
                                                                col.map(hd => {
                                                                    return (
                                                                        <div className="lv-td" style={Object.assign({ width: hd.width }, hd.style)}>
                                                                            {d[hd.accessor]}
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>

                                                        <div id={rowId} className="collapse">
                                                            <div className="lv-tr-add">
                                                                {
                                                                    addCol.map(col => {
                                                                        return (
                                                                            <div className="lv-group">
                                                                                <div className="lv-hd" style={{ width: maxWid }}>
                                                                                    {language.header[col.id]}
                                                                                </div>
                                                                                <div className="lv-vl" style={{ width: maxWid }}>
                                                                                    {d[col.accessor]}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                            {/* List view actions */}
                                                            <div className="lv-action">
                                                                {action !== null ? action.Cell(d) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>               

                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="lv-tfooter">
                                    <div onClick={() => this.onPageChange(-1)} style={{ position: 'relative', zIndex: 1, float: "left", paddingLeft: '10px' }}>
                                        <button style={{backgroundColor: "transparent", border: "none", outline: "none"}}>
                                            {"< Prev"}
                                        </button>
                                    </div>
                                    <div style={{ textAlign: "center", position: "absolute", width: '100%' }}>
                                        {"Page " + this.props.pageIndex +  " of " + (this.props.totalPage)}
                                    </div>
                                    <div onClick={() => this.onPageChange(1)} style={{ position: 'relative', zIndex: 1, float: "right", paddingRight: '10px' }}>
                                        <button style={{backgroundColor: "transparent", border: "none", outline: "none"}}>
                                            {" Next >"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                }

            </div>
        )
    }

    onPageChange(n) {
        if(this.props.pageIndex + n > 0 && this.props.pageIndex + n <= this.props.totalPage 
            && this.props.onPageChange) {
            this.props.onPageChange(this.props.pageIndex + n)
        }
        
    }

    componentDidMount() {
        this.setState({
            compoWid: this.lv.offsetWidth,
            toRender: true
        })

        // if(this.refTBody && this.refTHead) {
        //     this.refTBody.style.paddingTop = this.refTHead.offsetHeight + "px"
        // }
    }

    componentDidUpdate() {
        if(this.refTBody && this.refTHead) {
            this.refTBody.style.paddingTop = this.refTHead.offsetHeight + "px"
        }
    }
}