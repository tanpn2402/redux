import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import config from '../../../core/config'
import TradeHeader from '../../../containers/widget/TradeHeader'
import TradingChart from '../../../containers/widget/TradingChart'
import TradeHistory from '../../../containers/widget/TradeHistory'
import ComposedChart from '../../commons/ComposedChart'


class MarketTrading extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            toRender: false,
            chartWidth: 0
        }
    }

    render() {
        let background = this.props.theme.widget.widgetBackground
        let dataObject = {
            width: this.state.chartWidth,
            height: 250,
            theme: this.props.theme.chart.popoverChart,
        }
        // console.log(dataObject)
        let type = "MARKET"
        let stock = "VN-INDEX"
        let market = "VN-INDEX"
        return (
            <div className="mk-trading-tab" style={background}>
                <div className="tradeday-chart-container" ref={e => this.main = e} 
                    style={background}>
                    <label style={this.props.theme.font.main}>{this.props.language.marketinfo.header.intraday}</label>
                    {
                        this.state.toRender ? (
                            <ComposedChart dataObject={dataObject} stock={stock} market={market} type={type} key={new Date().getTime()}/>
                        ) :
                        null
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            toRender: !this.state.toRender,
            chartWidth: this.main.offsetWidth - 20
        })
    }
}

class MarketNews extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let background = this.props.theme.widget.widgetBackground
        let tableStyles = this.props.theme.table
        let language = this.props.language.marketinfo
        let widgetStyle = this.props.theme.widget

        let news = [
            {
                day: "27/01/2018",
                type: "Correlative Company",
                intro: "An Overview on Brokerage Firms in 9M2017"
            },
            {
                day: "22/01/2018",
                type: "Correlative Company",
                intro: "HCM: Quick Comments on 9M 2017 Earnings Results"
            },
            {
                day: "15/01/2018",
                type: "Correlative Company",
                intro: "HCM - 2017 AGM Updates"
            }
        ]
        return (
            <div className="mk-trading-tab" style={background}>
                <table className="mk-news-table">
                    <thead style={widgetStyle.widgetHeader}>
                        <th className="news-day" style={{width: "90px", textAlign: "center"}}>{language.header.day}</th>
                        <th className="news-intro">{language.header.intro}</th>
                    </thead>
                    <tbody>
                        {
                            news.map((e, i) => {
                                return (
                                    <tr style={i%2 ==0 ? tableStyles.rowOdd : tableStyles.rowEven}>
                                        <td className="news-day">{e.day}</td>
                                        <td className="news-intro">
                                            <span onClick={e => this.onNewsClick()}>{e.intro}</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    onNewsClick() {

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
                    <TradingChart {...this.props} height={420}/>
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
        let background = this.props.theme.widget.widgetBackground
        let tableStyles = this.props.theme.table
        let language = this.props.language.marketinfo
        let widgetStyle = this.props.theme.widget

        let news = [
            {
                day: "28/01/2018",
                type: "Correlative Company",
                intro: "An Overview on Brokerage Firms in 9M2017"
            },
            {
                day: "26/01/2018",
                type: "Correlative Company",
                intro: "HCM: Quick Comments on 9M 2017 Earnings Results"
            },
            {
                day: "23/01/2018",
                type: "Correlative Company",
                intro: "HCM - 2017 AGM Updates"
            }
        ]
        return (
            <div className="mk-trading-tab" style={background}>
                <table className="mk-news-table">
                    <thead style={widgetStyle.widgetHeader}>
                        <th className="news-day" style={{width: "90px", textAlign: "center"}}>{language.header.day}</th>
                        <th className="news-type">{language.header.type}</th>
                        <th className="news-intro">{language.header.intro}</th>
                    </thead>
                    <tbody>
                        {
                            news.map((e, i) => {
                                return (
                                    <tr style={i%2 ==0 ? tableStyles.rowOdd : tableStyles.rowEven}>
                                        <td className="news-day">{e.day}</td>
                                        <td className="news-type">{e.type}</td>
                                        <td className="news-intro">
                                            <span onClick={e => this.onNewsClick()}>{e.intro}</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    onNewsClick() {

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
            activeKey: "technical"
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
                child = <MarketReports {...this.props} />
                break;
            case "technical": 
                child = <MarketTechnical {...this.props} />
                break;

            default:
                child = <MarketTrading {...this.props} />
                break;
        }

        let tabStyle = this.props.theme.tabcontrol
        let language = this.props.language.marketinfo
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
                            {/* <li className={"tab-item " + (activeKey === "trading" ? "actived" : "")}
                                style={activeKey == "trading" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "trading"})}>
                                <span>{language.tab.markettrading}</span>
                            </li> */}
                            {/* <li className={"tab-item " + (activeKey === "finance" ? "actived" : "")}
                                style={activeKey == "finance" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "finance"})}>
                                <span>Finance</span>
                            </li> */}
                            <li className={"tab-item " + (activeKey === "technical" ? "actived" : "")}
                                style={activeKey == "technical" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "technical"})}>
                                <span>{language.tab.markettechnical}</span>
                            </li>
                            <li className={"tab-item " + (activeKey === "news" ? "actived" : "")}
                                style={activeKey == "news" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "news"})}>
                                <span>{language.tab.marketnews}</span>
                            </li>
                            <li className={"tab-item " + (activeKey === "reports" ? "actived" : "")}
                                style={activeKey == "reports" ? tabStyle.active : tabStyle.normal}
                                onClick={() => this.setState({activeKey: "reports"})}>
                                <span>{language.tab.marketreports}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-container" style={{backgroundColor: background.backgroundColor}}>
                        { child }
                    </div>

                    <div className="tradelog-container" style={{backgroundColor: background.backgroundColor}}>
                        <TradeHistory {...this.props} />
                    </div>
                </div>
            </div>
        )
    }
}