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
        // console.log(id)
        document.getElementById(id + "-icon").innerHTML = this.toggleIconExpand(document.getElementById(id + "-icon").innerHTML)
    }

    createColumns(columns) {
        let remainWid = this.state.compoWid - 45
        let i = 0
        let col = []
        while (remainWid > 0) {
            if (columns[i].width && remainWid > columns[i].width * 0.7) {
                if (remainWid > columns[i].width) {
                    col.push({
                        id: columns[i].id,
                        accessor: columns[i].accessor,
                        width: columns[i].width,
                        style: columns[i].style
                    })
                }
                else {
                    col.push({
                        id: columns[i].id,
                        accessor: columns[i].accessor,
                        width: remainWid,
                        style: columns[i].style
                    })
                }

                remainWid -= columns[i].width
                i += 1
            } else {
                col[i - 1].width += remainWid
                remainWid = -1
            }
        }

        return col
    }

    getMaxWid(columns, col) {
        let max = 0
        let addCol = []
        for (let i = 0; i < columns.length; i++) {
            let t = col.filter(f => f.id === columns[i].id)
            if (t.length > 0) {
                continue
            } else {
                addCol.push(columns[i])
                if (columns[i].width > max) {
                    max = columns[i].width
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
        //console.log(this.state)
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
        return (
            <div className="listview-control" ref={node => this.lv = node}>
                {console.log(this.state.toRender)}
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
                                                return (

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