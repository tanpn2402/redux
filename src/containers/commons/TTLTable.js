import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

export default class TTLTable extends Component {
    constructor(props) {
        super(props)

        this.tRowClick = this.tRowClick.bind(this)
    }


    render() {
        // console.log(this.props)
        return (
            <div className={"ttl-table " + this.props.className}>
                <div className="ttl-thead" ref={r => this.tHeader = r}>
                    <div className="ttl-tr">
                        {
                            this.props.header.map((d, i) => {
                                if(d.show == undefined || d.show) {
                                    return (
                                        <div className="ttl-cell" style={d.style} >
                                            {d.title}
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>

                <div className="ttl-tbody" ref={r => this.tBody = r}>
                    {
                        this.props.data.map((data, i) => {

                            let style = {}
                            if(this.props.getTRowProps != undefined) {
                                style = this.props.getTRowProps(data).style
                            }

                            return (
                                <div className="ttl-tr" onClick={e => this.tRowClick(e, data)} style={style}>
                                    {
                                        this.props.header.map((header) => {
                                            if(header.show == undefined || header.show) {
                                                if(header.cell != undefined) {
                                                    return (
                                                        <div className="ttl-cell" style={header.bodyStyle} >
                                                            {header.cell(data)}
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div className="ttl-cell" style={header.bodyStyle} >
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

    componentDidMount() {

        if(this.tHeader != undefined && this.tBody != undefined) {
            console.log( "calc(100% - " + this.tHeader.offsetHeight + "px)")

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
