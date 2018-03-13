import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import {getLanguage, getTheme, numUnFormat} from '../../utils'


export default class TTLTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSort : false,
            sortOrder: "asc",
            dataArr: [],
            
        }
        this.tRowClick = this.tRowClick.bind(this)
        this.sortKey= ""
    }

    componentWillMount(){
        this.state.dataArr = this.props.data
    }
    
    componentWillReceiveProps(nextProps){
        this.state.dataArr = nextProps.data
        if(this.state.onSort){
            this.sortDataArray()
            if(this.state.sortOrder == "dsc")
                this.state.dataArr.reverse()
        }
        this.getGroupedArray(nextProps)
    }

    render() {
        // console.log("TTL TABLE", this.props.theme)
        let theme = this.props.theme
        if(this.props.theme == undefined){
            theme = getTheme("light")
        }
        
        let tableBody = theme.table.tableBody
        let tableHeader = theme.table.tableHeader
        let rowOdd = theme.table.rowOdd
        let rowEven = theme.table.rowEven
        
        return (

            <div className={"ttl-table " + this.props.className}>
                <div className="ttl-thead" style={tableHeader} ref={r => this.tHeader = r}>
                    <div className="ttl-tr" style={tableHeader}>
                        {
                            this.props.header.map((d, i) => {
                                if(d.show == undefined || d.show) {
                                    if(typeof d.title === "function" ) {
                                        return (
                                            <div className="ttl-cell" style={d.style} >
                                                {d.title(d)}
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="ttl-cell" style={d.style} onClick={()=> this.handleCellClick(d.accessor)} >
                                                {d.title}
                                                {
                                                    this.state.onSort && d.accessor == this.sortKey && d.accessor != undefined ? 
                                                        this.state.sortOrder == "asc" ? 
                                                            <span className="glyphicon glyphicon-triangle-top" id="order-icon"></span> 
                                                            : <span className="glyphicon glyphicon-triangle-bottom" id="order-icon"></span> 
                                                        : null
                                                }
                                            </div>
                                        )
                                    }
                                
                                }
                            })
                        }
                    </div>
                </div>

                <div className="ttl-tbody" style = {tableBody} ref={r => this.tBody = r} >
                    {
                        this.state.dataArr.map((data, i) => {
                            let style = {}
                            if(this.props.getTRowProps != undefined) {
                                style = this.props.getTRowProps(data).style
                            }
                          
                            if(i % 2 === 0) {
                                style= Object.assign({}, rowEven, style)
                            } else {
                                style= Object.assign({}, rowOdd, style)
                            }

                            let groupHeaderStyle = {}
                            let groupHeaderRender = null
                            if(this.props.getGroupHeaderProps != undefined) {
                                groupHeaderStyle = this.props.getGroupHeaderProps(data).style
                                groupHeaderRender = this.props.getGroupHeaderProps(data).render
                            }
                            let groupHeader = null
                            //Code for rendering group header
                            if(this.props.pivot != undefined && i == 0){
                                groupHeader = 
                                    <div className="ttl-tr-group-header" style={groupHeaderStyle}>
                                        {groupHeaderRender == null ? data[this.props.pivot] : groupHeaderRender(data)}
                                    </div>
                            }
                            else{
                                if(this.props.pivot != undefined && data[this.props.pivot] != this.state.dataArr[i - 1][this.props.pivot]){
                                    groupHeader = 
                                        <div className="ttl-tr-group-header" style={groupHeaderStyle}>
                                            {groupHeaderRender == null ? data[this.props.pivot] : groupHeaderRender(data)}
                                        </div>
                                }
                            }

                            // console.log(style)

                            return (
                                <div>
                                    {groupHeader}
                                    <div className="ttl-tr" style={style} onClick={e => this.tRowClick(e, data)}>
                                        {
                                            this.props.header.map((header) => {
                                                if(header.show == undefined || header.show) {
                                                    if(header.cell != undefined) {
                                                        return (
                                                            <div className="ttl-cell" style={header.bodyStyle} 
                                                                 onClick={e => this.tCellClick(e, data, header)}>
                                                                {header.cell(data)}
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <div className="ttl-cell" style={header.bodyStyle} 
                                                                 onClick={e => this.tCellClick(e, data, header)}>
                                                                {data[header.accessor]}
                                                            </div>
                                                        )
                                                    }
                                                } 
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    getGroupedArray(prop){
        if(prop.pivot != undefined){
            let obj = {}
            let pivot = prop.pivot
            let tmpArr = []
            this.state.dataArr.map(d => {
                if(obj[d[pivot]] == undefined){
                    obj[d[pivot]] = []
                    tmpArr.push(d[pivot])
                }
            })
            tmpArr.sort()
            obj = {}
            tmpArr.map(e => {
                obj[e] = []
            })
            this.state.dataArr.map(d => {
                obj[d[pivot]].push(d)
            })
            tmpArr = []
            for(let key in obj){
                
                obj[key].map((el, i) => {
                    tmpArr.push(el)
                })
            }
            this.state.dataArr = tmpArr
        }
    }
    
    handleCellClick(key){
        if(!this.props.sortable || key == undefined)
            return
        if(this.sortKey != key && this.state.onSort){
            this.sortKey = key
            this.sortDataArray()
            this.getGroupedArray(this.props)
            this.setState({
                sortOrder: "asc",
                dataArr: this.state.dataArr
            })
        }else{
            this.sortKey = key
            this.sortDataArray()
            if(this.state.onSort){
                this.state.dataArr = this.state.sortOrder == "asc" ? this.state.dataArr.reverse() : this.state.dataArr
                this.getGroupedArray(this.props)
                this.setState({
                    sortOrder: this.state.sortOrder == "asc" ? "dsc" : "asc",
                    dataArr: this.state.dataArr
                })
            }else{
                this.getGroupedArray(this.props)
                this.setState({
                    onSort: true,
                    dataArr: this.state.dataArr
                })
            }
        }
    } 

    sortDataArray(){
        this.state.dataArr.sort((a, b) => {
            if(a[this.sortKey] == undefined || a[this.sortKey] == null) {
                return -1
            } else if(b[this.sortKey] == undefined || b[this.sortKey] == null) {
                return 1
            }
            else if(Number.isNaN(Number.parseFloat(a[this.sortKey])) || Number.isNaN(Number.parseFloat(b[this.sortKey]))){
                return a[this.sortKey].toString().localeCompare(b[this.sortKey].toString())
            }
            else{
                return numUnFormat(a[this.sortKey]) - numUnFormat(b[this.sortKey])
            }
        })
    }
    
    tRowClick(e, data) {
        
        if(this.props.onRowClick != undefined) {
            this.props.onRowClick(e, data)
        }
    }

    tCellClick(event, rowData, cellData) {
        if(this.props.onCellClick != undefined) {
            this.props.onCellClick(event, rowData, cellData)
        }
    }

    componentDidMount() {

        if(this.tHeader != undefined && this.tBody != undefined) {
            // console.log( "calc(100% - " + this.tHeader.offsetHeight + "px)")

            this.tBody.style.height = "calc(100% - " + this.tHeader.offsetHeight + "px)"
        }


        if(this.props.getTHeaderProps != undefined) {
            this.props.getTHeaderProps(this.tHeader)
        }
        if(this.props.getTBodyProps != undefined) {
            this.props.getTBodyProps(this.tBody)
        }
    }

}

TTLTable.defaultProps = {
    header: [
        {
            title: "AAA",
            style: {width: "50%"},
            bodyStyle: {},
            accessor: "value1",
        },
        {
            title: "AAA",
            style: {width: "25%"},
            bodyStyle: {},
            accessor: "value2"
        },
        {
            title: "AAA",
            style: {width: "25%"},
            bodyStyle: {},
            accessor: "value3"
        }
    ],
    data: [
        {
            "value1": 1,
            "value2": 2,
            "value3": 3
        },
        {
            "value1": 1,
            "value2": 2,
            "value3": 3
        },
        {
            "value1": 1,
            "value2": 2,
            "value3": 3
        }
    ],
    sortable: true,
    className: "",
}
