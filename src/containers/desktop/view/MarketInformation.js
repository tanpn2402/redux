import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import config from '../../../core/config'
import TradeHeader from '../../../containers/widget/TradeHeader'
import TradingChart from '../../../containers/widget/TradingChart'
import TradeHistory from '../../../containers/widget/TradeHistory'


class MarketTrading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mk-trading-tab">
                <div className="history-chart-container">

                </div>
                <div className="trade-log-container">
                    <TradeHistory {...this.props} />
                </div>
            </div>
        )
    }
}

class MarketNews extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

class MarketTechnical extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mk-technical-tab">
                <div className="chart-container">
                    <TradingChart {...this.props} />
                </div>
            </div>
        )
    }
}

class MarketReports extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

class MarketFundamental extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}


export default class MarketInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: "trading"
        }
    } 

    render(){
        let background = this.props.theme.page.background
        let {activeKey} = this.state

        let child = null
        switch(activeKey) {
            case "fundamental": 
                child = <MarketFundamental {...this.props} />
                break;
            case "trading": 
                child = <MarketTrading {...this.props} />
                break;
            case "finance": 
                child = <MarketTrading {...this.props} />
                break;
            case "news": 
                child = <MarketNews {...this.props} />
                break;
            case "reports": 
                child = <MarketNews {...this.props} />
                break;
            case "technical": 
                child = <MarketTechnical {...this.props} />
                break;

            default:
                child = <MarketTrading {...this.props} />
                break;
        }

        let tabStyle = this.props.theme.tabcontrol

        return(
            <div className="market-info-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row trade-header-container">
                    <TradeHeader {...this.props} />
                </div>
                <div className="row page-container" >
                    <div className="tab-side">
                        <ul className="tab-control">
                            {/* <li className={"tab-item " + (activeKey === "fundamental" ? "actived" : "")}
                                style={activeKey == "fundamental" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "fundamental"})}>
                                <span>Fundamental</span>
                            </li> */}
                            <li className={"tab-item " + (activeKey === "trading" ? "actived" : "")}
                                style={activeKey == "trading" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "trading"})}>
                                <span>Trading</span>
                            </li>
                            <li className={"tab-item " + (activeKey === "finance" ? "actived" : "")}
                                style={activeKey == "finance" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "finance"})}>
                                <span>Finance</span>
                            </li>
                            <li className={"tab-item " + (activeKey === "news" ? "actived" : "")}
                                style={activeKey == "news" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "news"})}>
                                <span>News</span>
                            </li>
                            <li className={"tab-item " + (activeKey === "reports" ? "actived" : "")}
                                style={activeKey == "reports" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "reports"})}>
                                <span>Reports</span>
                            </li>
                            <li className={"tab-item " + (activeKey === "technical" ? "actived" : "")}
                                style={activeKey == "technical" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "technical"})}>
                                <span>Technical</span>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-container" style={{backgroundColor: background.backgroundColor}}>
                        { child }
                    </div>
                </div>
            </div>
        )
    }
}