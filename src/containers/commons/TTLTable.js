import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import {getLanguage, getTheme } from '../../utils'


export default class TTLTable extends Component {
    constructor(props) {
        super(props)

        this.tRowClick = this.tRowClick.bind(this)
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
                                            <div className="ttl-cell" style={d.style} >
                                                {d.title}
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
                        this.props.data.map((data, i) => {
                            let style = {}
                            if(this.props.getTRowProps != undefined) {
                                style = this.props.getTRowProps(data).style
                            }
                          
                            if(i % 2 === 0) {
                                style= Object.assign({}, rowEven, style)
                            } else {
                                style= Object.assign({}, rowOdd, style)
                            }
                            

                            // console.log(style)

                            return (
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
                            )
                        })
                    }
                </div>
            </div>
        )
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

    className: "",
}
