import React from "react"
import { connect } from "react-redux"
import * as actions from "../../../actions"
import Title from "../../commons/WidgetTitle"
import Body from "../../commons/WidgetBody"
import Table from "../../commons/DataTable"
import * as Utils from "../../../utils"
import GridLayout from "../../main/GridLayout"
import config from "../../../core/config"
import Component from "../../commons/Component"

class Trading extends React.Component {
    constructor(props) {
        super(props)
        
        this.baseTab = "marketinfo"
        let {tabID, layout} = this.props
        console.log(layout)
        this.layout = layout[0].component
    }


    render() {
        console.log(this.props)
        return (
            <GridLayout 
                language={this.props.language}
                layout={this.layout}
                stockList={this.props.stockList} 
                theme={this.props.theme}
                >
            </GridLayout>
        )

    }
}

export default Trading