import React from "react"
import { connect } from "react-redux"
import * as actions from "../../../actions"
import Title from "../../commons/WidgetTitle"
import Body from "../../commons/WidgetBody"
import Table from "../../commons/DataTable"
import * as Utils from "../../../utils"
import moment from "moment"
import config from "../../../core/config"
import Component from "../../commons/Component"
import NewsPost from "../../../components/social/NewsPost"


export default class MyFiles extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {theme, language} = this.props
        let bindingStyle = theme.bindingdata
        return (
            <Component className="myfiles" theme={theme}>
                <div>
                    <img src={require("../../../assets/images/user.jpeg")} className="user-avt"/>
                </div>
                <div className="myfiles-info">
                    <ul>
                        <li>
                            <h4 style={theme.font.main}>{language.social.header.totalprofit}</h4>
                            <span style={bindingStyle.up}>24.24%</span>
                        </li>
                        <li>
                            <h4 style={theme.font.main}>{language.social.header.rank}</h4>
                            <span style={bindingStyle.up}>23</span>
                        </li>
                    </ul>
                </div>
            </Component>
        )
    }
}