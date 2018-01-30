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
import {Icon} from 'react-fa'
import PieChart from '../../commons/PieChart'

class UserDetail extends React.Component {
    constructor(props) {
        super()

        this.state = {
            activeKey: 1
        }



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

    hideUserDetail() {
        this.props.showUserDetail(false)
    }

    onFollowClicked() {
        
    }

    render() {
        let header = this.props.language.social.header

        let theme = this.clone(this.props.theme)

        let username = "UserName 1"
        let date = "2018-01-01 10:10"
        
        let bindingStyle = this.props.theme.bindingdata

        let data = [
            {
                name: "",
                value: 84.95
            },
            {
                name: "",
                value: 5.82
            },
            {
                name: "",
                value: 56.03
            }
        ]

        theme.tabcontrol.normal = {
            backgroundColor: "rgb(33, 88, 160)",
            border: "none",
            color: "#FFF"
        }

        return (
            <Component className="userdetail" style={{}} >
                <div className="social-header">
                    <div className="-title">
                        <label>{header.userdetail}</label>
                    </div>
                    <div className="-ctl" onClick={e => this.hideUserDetail()}>
                        <Icon size='2x' name="times" />
                    </div>
                </div>

                <div className="social-wrapper"  onMouseDown={ e => e.stopPropagation() } ref={r => this.wrapper = r}>
                    <div className="user-info" ref={r => this.userInfo = r}>
                        <div className="fol-control">
                            <button className="btn btn-primary" onClick={e => this.onFollowClicked()}>{header.following}</button>
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
                        <div className="qoutes">
                            Modern versions of assistive technologies will announce CSS generated content, as well as specific Unicode characters. To avoid unintended and confusing output in screen readers (particularly when icons are used purely for decoration
                        </div>
                    </div>

                    <div className="user-stat" ref={r => this.userStat = r}>
                        <table>
                            <tbody>
                                <tr>
                                    <th><h4>{header.daily}</h4></th>
                                    <th><h4>{header.monthly}</h4></th> 
                                    <th><h4>{header.netequity}</h4></th> 
                                    <th><h4>{header.grossprofitranking}</h4></th>
                                </tr>
                                <tr>
                                    <td><span style={bindingStyle.down}>-1.38%</span></td>
                                    <td><span style={bindingStyle.up}>16</span></td> 
                                    <td><span style={bindingStyle.normal}>1.21M</span></td> 
                                    <td><span style={bindingStyle.up}>Outperform 88%</span></td>
                                </tr>
                            </tbody>
                        </table>
                       
                    </div>
                    
                    <div className="user-trade" ref={r => this.userTrade = r}>
                        <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)} theme={theme}>
                            <TabItem eventKey={1} title={header.portfolio} >
                                <div className="intro">
                                    <h4 className="main-intro">Most Profitable Stock EVERGRANDE</h4>
                                    <h4 className="sub-intro">Powered by Bartech (international)</h4>
                                    <h4 className="sub-intro">Qoute is delayed for at least 15 mins</h4>
                                </div>
                                <div className="chart">
                                    <PieChart theme={this.props.theme} colors={[]} data={data}/>
                                </div>
                            </TabItem>
                            <TabItem eventKey={2} title={header.positions} >
                                
                            </TabItem>
                            <TabItem eventKey={3} title={header.history} >
                                
                            </TabItem>
                        </TabControl>
                    </div>

                </div>

                
            </Component>
        )
    }

    componentDidMount() {
        if(this.userInfo && this.userStat && this.userTrade && this.wrapper) {
            this.userTrade.style.height = this.wrapper.offsetHeight - (this.userInfo.offsetHeight + this.userStat.offsetHeight + 4) + 36 + "px"
        }
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.stockstatement.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    showUserDetail: (show) => {
        dispatch(actions.showUserDetail(show))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
