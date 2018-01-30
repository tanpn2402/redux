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
import {Icon} from 'react-fa'

const posts = [
    {
        username: "UserName 123",
        userID: 1,
        date: "2018-01-02 11:11",
        content: "Modern versions of assistive technologies will announce CSS generated content, as well as specific Unicode characters. To avoid unintended and confusing output in screen readers (particularly when icons are used purely for decoration)"
    },
    {
        username: "UserName 123",
        userID: 1,
        date: "2018-01-02 11:11",
        content: "Modern versions of assistive technologies will announce CSS generated content, as well as specific Unicode characters. To avoid unintended and confusing output in screen readers (particularly when icons are used purely for decoration)",
        image: "invest.jpg"
    },
    {
        username: "UserName 123",
        userID: 1,
        date: "2018-01-02 11:11",
        content: "Modern versions of assistive technologies will announce CSS generated content, as well as specific Unicode characters. To avoid unintended and confusing output in screen readers (particularly when icons are used purely for decoration)"
    },
    {
        username: "UserName 123",
        userID: 1,
        date: "2018-01-02 11:11",
        content: "Modern versions of assistive technologies will announce CSS generated content, as well as specific Unicode characters. To avoid unintended and confusing output in screen readers (particularly when icons are used purely for decoration)"
    }
]

export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props)
    }
    

    render() {
        
        let header = this.props.language.social.header
        let socialHeader = this.props.theme.social.socialHeader
        let socialBody = this.props.theme.social.socialBody
        let socialBG = this.props.theme.social.socialBG

        return (
            <Component className="newsfeed" style={{}} >

                <div className="social-header" theme = {this.props.theme} style={socialHeader}>
                    <div className="-title">
                        <label>{header.feed}</label>
                    </div>
                    <div className="-ctl">
                        <Icon size='2x' name="commenting" />
                    </div>
                </div>

                <div className="social-wrapper" onMouseDown={ e => e.stopPropagation() }>
                    <div className="feed-list" theme = {this.props.theme} style={socialBG}>
                        <FeedBox language={this.props.language} theme={this.props.theme}/>
                        {
                            posts.map(e => {
                                return (
                                    <NewsPost username={e.username}
                                    theme={this.props.theme}
                                    style={socialBody}
                                    date={e.date}
                                    content={e.content}
                                    image={e.image}/>
                                )
                            })
                        }
                    </div>
                </div>

            </Component>
        )
    }
}

class FeedBox extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let socialBody = this.props.theme.social.socialBody
        let {language, theme} = this.props
        return (
            <div className="feedbox"
            theme={this.props.theme}
            style={socialBody}>
                <div className="avt">
                    <img src={require("../../../assets/images/user.jpeg")} className="avt-img"/>
                </div>
                <div className="box"
                theme={this.props.theme}
                style={socialBody}>
                    <textarea rows={3} placeholder={language.social.header.placeholder}/>
                </div>
            </div>
        )
    }
}