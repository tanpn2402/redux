import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, 
    OverlayTrigger, Tooltip } from 'react-bootstrap'
import config from "../../core/config"
import Component from "../commons/Component"
import * as utils from "../../utils"

const MODE_CHANGE = "change"
const MODE_VOL = "volume"
const MODE_PERCENT = "percent"

class RecommentTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ],
            modeView: MODE_CHANGE,
            stockSelected: this.props.instrument,
            listStock: this.props.listInstrumentInWatchList.slice(0)
        }
    }

    showTooltip(props) {
        console.log(props)
        return (
            <Tooltip id="tooltip">
                {"MUA NHANH - BÁN NHANH"}
            </Tooltip>
        )
        
    }

    render() {
        let {listInstrumentData, listInstrumentInWatchList, listInstrumentInPortfolio} = this.props
        let data = listInstrumentData.filter(stock => {
            if(listInstrumentInWatchList.indexOf(stock.mvStockCode) > -1) {
                return stock
            }
        })
        let language = this.props.language.watchlist.header
        let header = [
            {
                title: language.stock,
                style: {width: "10%"},
                bodyStyle: {width: "10%"},
                accessor: "mvStockCode",
            },
            {
                title: language.price,
                style: {width: "16%", textAlign: "right"},
                bodyStyle: {width: "16%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvMatchPrice")
                }
            },
            {
                title: language.volume,
                style: {width: "22%", textAlign: "right"},
                bodyStyle: {width: "22%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvMatchVol", true)
                }
            },
            {
                title: language.totalvol,
                style: {width: "22%", textAlign: "right"},
                bodyStyle: {width: "22%", textAlign: "right"},
                cell: props => {
                    return this.fillColor(props, "mvMatchVolTotal", true)
                }
            },
            {
                // title:  this.state.modeView == MODE_CHANGE ? language.change : language.volume,
                style: {width: "15%", textAlign: "right", paddingRight: "4px"},
                bodyStyle: {width: "15%", textAlign: "right", paddingRight: "5px"},
                title: props => {
                    return (
                        <div>
                            <span className="glyphicon glyphicon-menu-left" onClick={e => this.changeModeView(MODE_CHANGE)} 
                                style={{cursor: "pointer"}}></span>
                            <span style={{width: "13px", display: "inline-block", textAlign: "center"}}>
                                {this.state.modeView == MODE_CHANGE ? language.change : language.percent}
                            </span>
                            <span className="glyphicon glyphicon-menu-right" onClick={e => this.changeModeView(MODE_PERCENT)} 
                                style={{cursor: "pointer"}}></span>
                        </div>
                    )

                },
                cell: props => {
                    return this.fillColor(props, this.state.modeView == MODE_CHANGE ? "mvMatchUpDown" : "mvMatchPercent")
                }
                
            },
            {
                title: language.signal,
                style: {width: "15%", textAlign: "center", paddingRight: "4px"},
                bodyStyle: {width: "15%", textAlign: "center"},
                cell: props => {
                    return (
                        <OverlayTrigger overlay={this.showTooltip(props)} >
                            <span className="glyphicon glyphicon-eur"></span>
                         </OverlayTrigger>
                    )
                }
            }
        ]
       
        let theme = this.props.theme

        return (
            <TTLTable className="watchlist-small" data={data} header={header} theme={theme}
                getTRowProps={(data) => {
                    if(data.mvStockCode == this.state.stockSelected) {
                        return {
                            style: {
                                backgroundColor: "rgba(244,186,17,0.4)",
                                fontWeight: "900"
                            }
                        }
                    } else {
                        return {
                            style: {}
                        }
                    }
                    
                }}
                onRowClick={(e, props) => this.onRowClick(e, props) }
            />
        )
    }

    onRowClick(e, prop) {
        // this.setState({stockSelected: prop.stockCode})
        this.props.changeInstrument(prop.mvStockCode)

        // console.log(this.props)
        
        let tmp = config.cache.stockList.filter(e => e.stockCode == prop.mvStockCode)
        if(tmp.length > 0) {
            let tp = tmp[0]
            this.props.setDefaultOrderParams({
                mvBS: this.props.portfolioData.filter(el => el.mvStockID == prop.mvStockCode).length > 0 ? "SELL" : "BUY",
                mvStockCode: tp.stockCode,
                mvStockName: tp.stockName,
                mvMarketID: tp.mvMarketID,
                mvQty: prop.mvMatchVol,
                mvPrice: prop.mvMatchPrice
                
            })
        }
    }

    onStockChange(listStock) {
    }

    changeModeView(mode) {
        this.setState({
            modeView: this.state.modeView == MODE_PERCENT ? MODE_CHANGE : MODE_PERCENT
        })
    }

    fillColor(props, accessor, isFormated) {

        let refPrice = props["mvReferences"]
        let matchPrice = props["mvMatchPrice"]
        let percent = Math.abs(utils.round( (refPrice - matchPrice) / refPrice * 100, 1))
        let change = Math.abs(utils.round(refPrice - matchPrice, 1))
        

        let theme = this.props.theme.bindingdata
        let child = <span style={theme.normal}>{props[accessor]}</span>
        if(refPrice > matchPrice) {
            if(accessor == "mvMatchUpDown")
                child = <span style={theme.down}>{"-" + change }</span>
            else if(accessor == "mvMatchPercent")
                child = <span style={theme.down}>{percent + "%"}</span>
            else if(isFormated != undefined && isFormated)
                child = <span style={theme.down}>{utils.currencyShowFormatter(props[accessor])}</span>
            else 
                child = <span style={theme.down}>{props[accessor]}</span>
        }
        else if(refPrice < matchPrice) {
            if(accessor == "mvMatchUpDown")
                child = <span style={theme.up}>{"+" + change }</span>
            else if(accessor == "mvMatchPercent")
                child = <span style={theme.up}>{percent + "%"}</span>
            else if(isFormated != undefined && isFormated)
                child = <span style={theme.up}>{utils.currencyShowFormatter(props[accessor])}</span>
            else 
                child = <span style={theme.up}>{props[accessor]}</span>
        }
        
        return child
    }
}

export default RecommentTable