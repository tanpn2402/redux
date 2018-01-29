import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import Header from './Header'
import MenuNav from './MenuNav'
import MainContent from './MainContent'
import config from '../../core/config'
import {getLanguage, getTheme } from '../../utils'
import * as atmosphereAPI from '../../api/atmosphereAPI'
import * as marketData from '../../api/marketdata'

class Home extends Component {
    /*
    This component only reRender when:
    - F5
    - change Theme, Language
    */
    constructor(props) {
        super(props)
        this.handleCheckSessionID = this.handleCheckSessionID.bind(this)


        this.interval = this.interval.bind(this)
    }

    render() {
        // we do not use state at here
        // we use state to reload this component
        let theme = getTheme(config.cache.theme)
        let lang = getLanguage(config.cache.lang)
        return (
            <div>
                <Header 
                    theme={theme}
                    language={lang}
                />
                <MenuNav 
                    language={lang} 
                    theme={theme} />
                <MainContent 
                    theme={theme} 
                    language={lang}
                    checkSessionID={this.checkSessionID} />


            </div>
        )
    }

    handleCheckSessionID(id) {
        this.checkSessionID = id
    }

    componentDidMount() {
        this.props.getTradeLogData()
        this.props.getMarketData()
        // this.props.addInstrumentToWatchList("ACB", "HO")
        // this.props.addInstrumentToWatchList("VNM", "HO")
        // this.props.getTradeLogDataOfStock("ACB", "HO")
        // this.props.getTradeLogDataOfStock("VNM", "HO")
        
        this.props.checkSession(this.handleCheckSessionID)
        this.onSubscribeToServer()
        this.props.getListStockInWatchList()
    }

    componentWillUnmount() {
        this.onUnSubcribe();
    }

    componentWillReceiveProps(nextProps) {
        // this.onUnSubcribe()
        // this.onSubscribeToServer()
    }

    onSubscribeToServer() {
        console.log("Prepare to subcribe")
        let socketID = localStorage.getItem("clientID")
        // socketID = "C080001"
        if (socketID == null) {
            console.log("No WebSocketID")
        } else {
            console.log("Start subcribe on clientId = " + socketID )

            atmosphereAPI.subscribe(socketID, ((stockJsonResponse) => {
                if (stockJsonResponse != null) {
                    
                    this.props.updateWatchlistData(stockJsonResponse)
                }
            }).bind(this))


            // marketData.subscribe(socketID, ((stockJsonResponse) => {
            //     if (stockJsonResponse != null) {
                    
            //         this.props.updateMarketData(stockJsonResponse)
            //     }
            // }).bind(this))


            setInterval(this.interval, 4000)
        }
    }

    onUnSubcribe() {
        console.log("Socket will be unsubscribed")
        atmosphereAPI.unsubscribe()
        // marketData.unsubscribe()
        
        clearInterval(this.interval)
    }

    interval() {
        // this.props.updateWatchlistData()
        this.props.updateTradeLog()
        this.props.updateMarketData()
    }
}

const mapStateToProps = (state) => ({
    language: state.config.language,
    theme: state.config.style,

    listInstrumentToWatch: state.trading.listInstrumentToWatch,
});

const mapDispatchToProps = (dispatch, props) => ({
    checkSession: (handleCheckSessionID) => { 
        dispatch(actions.checkSession(handleCheckSessionID)) 
    },

    //watchlist data
    updateWatchlistData: (json) => { dispatch(actions.updateWatchlistData(json)) },
    getListStockInWatchList: () => {dispatch(actions.getListStockInWatchList()) },
    updateTradeLog: (json) => { dispatch(actions.updateTradeLog(json)) },
    getTradeLogData: () => { dispatch(actions.getTradeLogData()) },
    
    // market data
    updateMarketData: (json) => { dispatch(actions.updateMarketData(json)) },
    getMarketData: () => { dispatch(actions.getMarketData()) },


    // test
    getTradeLogDataOfStock: (stockCode, market) => { dispatch(actions.getTradeLogDataOfStock(stockCode, market)) },
    addInstrumentToWatchList: (ins, market) => { dispatch(actions.addInstrumentToWatchList(ins, market)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
