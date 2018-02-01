import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../commons/DataTable'
import { FormControl, Form, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as atmosphereAPI from '../../api/atmosphereAPI'
import Select from "../commons/Select"
import Config from '../../core/config'
import WatchListTable from "../commons/WatchListTable"

class WatchList extends Component {
    constructor(props) {
        super(props)
        this.id = "watchlist"
        this.state = {
            mvInstrument: {stockCode: ""}
        }
        this.rowSelected = []
       
    }

    onRefresh(newParams) {
        
    }
    onAddStock() {
        // console.log(this.state.mvInstrument)
        let instrument = this.state.mvInstrument
        let stockCode = instrument.stockCode
        let language = this.props.language

        if(stockCode == null || stockCode == "") {
            this.props.onShowMessageBox(language.messagebox.title.info, 
                language.messagebox.message.invalidStockCode)
        } else {
            let tmp = this.props.listInstrumentInWatchList.filter(e => e == stockCode)
            if(tmp.length > 0) {
                // already in list
                // message box here
                
                this.props.onShowMessageBox(language.messagebox.title.info, 
                    language.messagebox.message.stockExistInWatch)
            } else {
                this.props.addInstrumentToWatchList(stockCode, tmp.mvMarketID)
                this.props.changeInstrument(stockCode)
            }
        }
        
    }
    onRemoveStock() {
        // let rowSelected = this.watchListTable.rowSelected
        // console.log(this.rowSelected)
        this.rowSelected.map(stock => {
            this.props.removeInstrumentFromWatchList(stock.mvStockCode, stock.mvMarket)
        })
    }

    onRowSelected(row) {
        // console.log(row)
        this.rowSelected = row
    }

    handleStockChange(option) {
        let {mvInstrument} = this.state
        let {listInstrumentInWatchList, portfolioData} = this.props

        if(option.stockCode == mvInstrument.stockCode) {
            // selected same instrument
            return
        }
        else {
            // console.log(portfolioData)
            // remove previous instrument if it not in watchlist and not in portfolio list
            if(listInstrumentInWatchList.indexOf(mvInstrument.stockCode) < 0 && 
                portfolioData.filter(e => e.mvStockID == mvInstrument.stockCode).length < 1) 
            {
                this.props.removeInstrumentFromWatch(mvInstrument.stockCode, mvInstrument.mvMarketID)
            }

            this.setState({ 
                mvInstrument: option
            })
    
            // checkif instrument already in watchlist or portfolio list
            if(listInstrumentInWatchList.indexOf(option.stockCode) > -1 || 
                portfolioData.filter(e => e.mvStockID == option.stockCode).length > 0 )
            {
                // already in watchlist and portfolio list
            } else {
                // add new instrument is selected to watch  ( not watchlist )
                this.props.addInstrumentToWatch(option.stockCode, option.mvMarketID)
            }
        } 
    }

    render() {
        let button = this.props.theme.searchbar.default.button || undefined
    
        return (
            <div style={{ height: '100%' }}>
                <Title id={this.id} language={this.props.language} theme={this.props.theme} widgetID={'watchlist'}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="wl-control">
                        <Select
                            className="stock-selector"
                            key="rStockID"
                            options={Config.cache.stockList}
                            selected={this.state.mvInstrument}
                            optionLabelPath={'stockCode'}
                            handleChange={this.handleStockChange.bind(this)}
                            searchEnabled={true}
                            stockSelector={true}
                        />
                        <button type="button" className="hks-btn btn-add-stock" style={button}
                            onClick={this.onAddStock.bind(this)}>
                            <span className="glyphicon glyphicon-plus" ></span>
                            {this.props.language.watchlist.toolbar.addstock}
                        </button>
                        <button type="button" className="hks-btn btn-remove-stock"
                            onClick={this.onRemoveStock.bind(this)} disabled={this.state.disableRemove}>
                            <span className="glyphicon glyphicon-remove"></span>
                            {this.props.language.watchlist.toolbar.removestock}
                        </button>
                    </div>
                    <div className="wl-table">
                        <WatchListTable
                            onRowSelected={this.onRowSelected.bind(this)}
                            theme={this.props.theme} 
                            language={this.props.language} />
                    </div>
                </Body>
            </div>
        )
    }


}


const mapStateToProps = (state) => {
    return {
        listInstrumentInPortfolio: state.trading.listInstrumentInPortfolio,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
        portfolioData: state.trading.portfolioData.mvPortfolioBeanList
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    addInstrumentToWatchList: (ins, market) => { dispatch(actions.addInstrumentToWatchList(ins, market)) },
    removeInstrumentFromWatchList: (ins, market) => { dispatch(actions.removeInstrumentFromWatchList(ins, market, true)) },
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },
    
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    addInstrumentToWatch: (ins, market) => { dispatch(actions.addInstrumentToWatch(ins, market)) },
    removeInstrumentFromWatch: (ins, market) => { dispatch(actions.removeInstrumentFromWatch(ins, market)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)
