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
import Select from "../../commons/InputSelect"
import {TabControl, TabItem} from "../../commons/TabControl"


export default class GameBoard extends React.Component {
    constructor(props) {
        super()



        this.state = {
            //sub account
            listGame: ["Game 1", "Game 2"],
            gameSelected: "Game 1",

            // active key tab
            activeKey: 1
        }



    }

    handleGameSelectorChange(options) {
        this.setState({
            gameSelected: options
        })
    }

    onTabChange(key) {
        this.setState({activeKey: key})
    }

    clone(obj) {
        var outpurArr = new Array();
        for (var i in obj) {
            outpurArr[i] = typeof (obj[i]) == 'object' ? this.clone(obj[i]) : obj[i];
        }
        return outpurArr;
    }

    render() {
        let header = this.props.language.social.header

        let data = [1,2,3,4,5,6,7,8,9]
        let theme = this.clone(this.props.theme)

        if(theme.title == "light") {
            theme.tabcontrol.normal = {
                backgroundColor: "rgb(33, 88, 160)",
                border: "none",
                color: "#FFF"
            }
        } else {
            theme.tabcontrol.normal = {
                backgroundColor: "rgb(255, 128, 0)",
                border: "none",
                color: "#FFF"
            }
        }
            

        let socialHeader = this.props.theme.social.socialHeader
        let socialBody = this.props.theme.social.socialBody
        let socialBG = this.props.theme.social.socialBG
        let socialRank = this.props.theme.social.socialRank
        return (
            <Component className={"gameboard " + theme.title} style={{}} >
                <div className="social-header"  theme = {this.props.theme} style={socialHeader}>
                    <div className="-title">
                        <label>{header.game}</label>
                    </div>
                    <div className="-ctl">
                        <Select
                            key="gameSelector"
                            options={this.state.listGame}
                            selected={this.state.gameSelected}
                            handleChange={this.handleGameSelectorChange.bind(this)}
                        />
                    </div>
                </div>

                <div className="social-wrapper" onMouseDown={ e => e.stopPropagation() } >
                    <TabControl key={"tab12"} activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)} theme={theme}>
                        <TabItem eventKey={1} title={header.top20} >
                            <div className="board" theme = {this.props.theme} style={socialBG}>
                                {
                                    data.map(e=> {
                                        return <GameBoardItem language={this.props.language} rank={e} theme={theme}/>
                                    })
                                }
                            </div>
                        </TabItem>
                        <TabItem eventKey={2} title={header.bottom20} >
                            <div className="board" theme = {this.props.theme} style={socialBG}>
                                {
                                    data.map(e=> {
                                        return <GameBoardItem language={this.props.language} rank={e} theme={theme}/>
                                    })
                                }
                            </div>
                        </TabItem>
                    </TabControl>
                </div>






            </Component>
        )
    }
}


class GameBoardItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let header = this.props.language.social.header
        let username = "UserName 1"
        let date = "Created 2018-01-01"
        let socialHeader = this.props.theme.social.socialHeader
        let socialBody = this.props.theme.social.socialBody
        let socialBG = this.props.theme.social.socialBG
        let bindingStyle = this.props.theme.bindingdata
        let socialRank = this.props.theme.social.socialRank
        let socialFol = this.props.theme.social.socialFol
        return (
            <Component className="gameboard-item" style={{}}
            theme={this.props.theme}
            style={socialBody}>
                <div className="rank">
                    <div className="rank-box" theme={this.props.theme} style={socialRank}>
                        <span>{this.props.rank}</span>
                    </div>
                </div>
                <div className="fol-control" >
                    <button className="btn btn-primary" onClick={e => this.onFollowClicked()}theme={this.props.theme} style={socialFol}>{header.follow}</button>
                </div>
                <div className="user">
                    <div className="avt">
                        <img src={require("../../../assets/images/user.jpeg")} className="avt-img"/>
                    </div>
                    <p className="usrname">{username}</p>
                    <p className="date">{date}</p>
                    <div className="acc-info">
                        <ul>
                            <li>
                                <h4>{header.grossprofit}</h4>
                                <span style={bindingStyle.up}>{1358.21}%</span>
                            </li>
                            <li>
                                <h4>{header.trades}</h4>
                                <span>16</span>
                            </li>
                            <li>
                                <h4>{header.followers}</h4>
                                <span>{23}</span>
                            </li>
                        </ul>
                    </div>
                    

                </div>
            </Component>
        )
    }

    onFollowClicked() {
        console.log("onFollowClicked")
    }
}