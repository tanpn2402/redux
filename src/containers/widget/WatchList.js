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
            mvInstrument: null
        }
       
    }

    onRefresh(newParams) {
        
    }
    onAddStock() {
        let instrument = this.state.mvInstrument
        let stockCode = instrument.stockCode
        let tmp = this.props.listInstrumentInWatchList.filter(e => e == stockCode)
        if(tmp.length > 0) {
            // already in list
            // message box here
        } else {
            this.props.addInstrumentToWatchList(stockCode, tmp.mvMarketID)
            this.props.changeInstrument(stockCode)
        }
    }
    onRemoveStock() {
        // this.rowSelected.map(stock => {
        //     this.props.removeInstrumentFromWatchList(stock.stockCode)
        // })
    }

    handleStockChange(options) {
        this.setState({ 
            mvInstrument: options
        })
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
                        <button type="button" className="hks-btn btn-refresh" onClick={e => this.onRefresh()}>
                            <span className="glyphicon glyphicon-refresh"></span>
                        </button>
                        <Select
                            key="rStockID"
                            options={Config.cache.stockList}
                            selected={this.state.mvInstrument}
                            optionLabelPath={'stockCode'}
                            handleChange={this.handleStockChange.bind(this)}
                            searchEnabled={true}
                        />
                        <button type="button" className="hks-btn btn-add-stock" style={button}
                            onClick={this.onAddStock.bind(this)}>
                            <span className="glyphicon glyphicon-plus" ></span>
                            {this.props.language.watchlist.toolbar.addstock}
                        </button>
                        <button type="button" className="hks-btn btn-remove-stock"
                            onClick={e => this.onRemoveStock()} disabled={this.state.disableRemove}>
                            <span className="glyphicon glyphicon-remove"></span>
                            {this.props.language.watchlist.toolbar.removestock}
                        </button>
                    </div>
                    <div className="wl-table">
                        <WatchListTable theme={this.props.theme} language={this.props.language} />
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
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    addInstrumentToWatchList: (ins, market) => { dispatch(actions.addInstrumentToWatchList(ins, market)) },
    removeInstrumentFromWatchList: (ins, market) => { dispatch(actions.removeInstrumentFromWatchList(ins, market)) },
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)
