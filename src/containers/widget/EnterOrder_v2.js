import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as Utils from '../../utils'
import moment from 'moment'
import config from '../../core/config'
// import 'react-power-select/dist/react-power-select.css'
import * as api from '../../api/web_service_api'
import * as ACTION from '../../api/action_name'
import CalendarPicker from '../commons/CalendarPicker'
import Select from "../commons/Select"
import Input from "../commons/Input"
const { Contants } = require('../../core/constants')

class EnterOrder extends React.Component {
    constructor(props) {
        super(props)
        this.lang = "vi_VN"
        this.id = "enterorder"
        this.state = {
            // enterorder params
            mvBS: "BUY",
            mvMarketID: config.marketid[0],
            mvOrderType: "",
            mvFeeRate: "",
            mvGrossAmt: 0,
            mvGoodTillDate: "",
            mvStockSelected: {
                stockCode: ''
            },
            mvStopOrderTypeSelected: {
                label: "No trigger",
                value: "N"
            },
            mvOrderTypeSelected: config.ordertype[config.marketid[0]][0],
            
            // other paras support for view
            stockList: this.props.stockList,
            mvOrderTypeList: config.ordertype[config.marketid[0]],
            mvBSList: ["BUY", "SELL"],
            mvTradeDateList: []

        }

        this.value = {
            mvStockCode: "",
            mvStockName: "",
            mvOrderType: "",
            mvBS: "BUY",
            mvMarketID: config.marketid[0],
            mvVol: 0,
            mvCommissionFees: "",
            mvNetAmt: "",
            mvBuyingPower: "",
            mvGrossAmt: 0,
            mvMaxQty: 0,
            mvAvailQty: 0,
            mvGoodTillDate: "",
            mvStopOrderType: "",
            mvStopOrderPrice: ""
        }

        this.mvStopOrderTypeList = [
            {
                label: "No trigger",
                value: "N"
            },
            {
                label: "For sell trigger",
                value: "U"
            },
            {
                label: "For buy trigger",
                value: "D"
            }
        ]
    }

    setValue(_val) {
        Object.assign(this.value, _val)
    }

    handleBSChange(options) {
        this.setState({ mvBS: options })
        this.setValue({ mvBS: options })

        this.props.setDefaultOrderParams(this.value)
    }

    handleMarketChange(options) {
        this.setState({ 
            mvMarketID: options,
            mvStockSelected: {},
            mvOrderTypeList: config.ordertype[options],
            mvOrderTypeSelected: config.ordertype[options][0]
        })
        this.setValue({
            mvMarketID: options,
            mvStockCode: "",
            mvStockName: "",
            mvGrossAmt: 0
        })

        this.getTradeDateInfo()
    }

    handleGoodTillChange(options) {

    }

    handleOrderTypeChange(options) {
        var orderTypeValue = options.value
        if(orderTypeValue == "T") {
            this.rTriggerForm.style.display = "table"
        }
        else {
            this.rTriggerForm.style.display = "none"
        }
        this.setState({
            mvOrderTypeSelected: options
        })
        this.setValue({
            mvOrderType: orderTypeValue
        })
    }

    onQtyChange(value) {
        this.setValue({mvVol: value})
        this.calculateGrossAmt()
        this.getFeesAndNetAmt()
    }
    
    onPriceChange(value) {
        this.setValue({mvPrice: value})
        this.calculateGrossAmt()
        this.getFeesAndNetAmt()
        
    }

    handleTriggerPriceChange(options) {
        this.setState({mvStopOrderTypeSelected: options})
    }

    onStockCodeBlur() {
        let code = this.refStockCode.getValue()
        this.getInstrumentInfo(code)
        this.getAvailQty()
    }
    
    onStockCodeChange() {
        // let code = this.refStockCode.getValue()
        // if(code.length > 2) {
        //     this.getInstrumentInfo(code)
        // }
    }

    render() {
        let header = this.props.language.enterorder.header
        this.stockList = config.cache.stockList.filter(e => e.mvMarketID == this.state.mvMarketID)
        return (
            <div style={{ height: "100%", position: "relative" }} id={this.id}>
                <Title language={this.props.language} theme={this.props.theme} widgetID={this.id}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                <div className={"enterorder-form " + this.state.mvBS.toLowerCase()}>

                    {/* BUY/SELL */}
                    <div style={{textAlign: "center"}}>
                        <FormGroup>
                            <Radio name="radioGroup" inline checked={this.state.mvBS === "BUY"} style={{margin: "0 20px"}}
                                onChange={() => this.handleBSChange("BUY") }>
                                Buy
                            </Radio>
                            
                            <Radio name="radioGroup" inline checked={this.state.mvBS === "SELL"} style={{margin: "0 20px"}}
                                onChange={() => this.handleBSChange("SELL") }>
                                Sell
                            </Radio>
                        </FormGroup>
                    </div>

                    {/* MARKET */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.market}
                        </Col>
                        <Col xs={7}>
                            <Select
                                ket="rMarketSelector"
                                ref={r => this.rMarketSelector = r}
                                options={config.marketid}
                                selected={this.state.mvMarketID}
                                handleChange={this.handleMarketChange.bind(this)}
                            />
                        </Col>
                    </div>

                    {/* STOCK CODE */}
                    <div style={{display: "table", width: "100%"}}>
                        
                        <Col xs={5}>
                            {header.stockCode}
                        </Col>
                        <Col xs={7}>
                            <Input key="refStockCode" type="text" ref={ref => this.refStockCode =  ref} 
                                defaultValue={""} style={{textAlign: "left"}} 
                                onChange={e => this.onStockCodeChange()}
                                onBlur={e => this.onStockCodeBlur()}/>
                        </Col>
                    </div>

                    {/* STOCK NAME */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.stockName}
                        </Col>
                        <Col xs={7}>
                            <Input key="refStockName" type="text" ref={ref => this.refStockName =  ref} 
                                className="readOnly" readOnly defaultValue={""} style={{textAlign: "left"}}/>
                        </Col>
                    </div>

                    {/* PRICE */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.price}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvPrice" type="number" ref={ref => this.mvPrice =  ref} step={100}
                                onChange={this.onPriceChange.bind(this)}/>
                        </Col>
                    </div>

                    {/* TRIGGER PRICE */}
                    <div style={{display: "none", width: "100%"}} ref={r => this.rTriggerForm = r}>
                        <Col xs={5}>
                            {header.triggerPrice}
                        </Col>
                        <Col xs={7}>
                            <Col xs={5}>
                                <Select
                                    ket="rStopOrderTypeSelector"
                                    ref={r => this.rStopOrderTypeSelector = r}
                                    options={this.mvStopOrderTypeList}
                                    selected={this.state.mvStopOrderTypeSelected}
                                    optionLabelPath={"label"}
                                    handleChange={this.handleTriggerPriceChange.bind(this)}
                                />
                            </Col>
                            <Col xs={7}>
                                <Input key="rStopOrderPrice" type="text" ref={ref => this.rStopOrderPrice =  ref} 
                                    defaultValue={""} style={{textAlign: "left"}}/>
                            </Col>
                        </Col>
                    </div>

                    {/* QUANTITY */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.quantity}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvVol" type="number" ref={ref => this.mvVol =  ref} step={100}
                                onChange={this.onQtyChange.bind(this)}/>
                        </Col>
                    </div>

                    {/* ORDER TYPE */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.type}
                        </Col>
                        <Col xs={7}>
                            <Select
                                ket="rOrderTypeSelector"
                                ref={r => this.rOrderTypeSelector = r}
                                options={this.state.mvOrderTypeList}
                                selected={this.state.mvOrderTypeSelected}
                                optionLabelPath={"label"}
                                handleChange={this.handleOrderTypeChange.bind(this)}
                            />
                        </Col>
                    </div>

                    {/* GOOD TILL */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.goodTill}
                        </Col>
                        <Col xs={7}>
                                <Select
                                    ket="rGoodTillSelector"
                                    ref={r => this.rStockSelector = r}
                                    options={this.state.mvTradeDateList}
                                    selected={this.state.mvGoodTillDate}
                                    handleChange={this.handleGoodTillChange.bind(this)}
                                />
                        </Col>
                    </div>

                    {/* BUYING POWER */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.buyingpower}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvBuyingPower" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvBuyingPower = ref} readOnly value={this.value.mvBuyingPower}/>
                        </Col>
                    </div>

                    {/* GROSS AMT */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.grossAmt}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvGrossAmt" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvGrossAmt = ref} readOnly value={this.value.mvGrossAmt}/>
                        </Col>
                    </div>

                    {/* COMMISSION FEE */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.commissionFees}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvCommissionFees" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvCommissionFees = ref} readOnly value={this.value.mvCommissionFees}/>
                        </Col>
                    </div>

                    {/* NET AMT */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.netAmt}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvNetAmt" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvNetAmt = ref} readOnly value={this.value.mvNetAmt}/>
                        </Col>
                    </div>

                    {/* AVAIL QUANTITY */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.availQty}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvAvailQty" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvAvailQty = ref} readOnly value={this.value.mvAvailQty}/>
                        </Col>
                    </div>

                    <div className="group-btn-action form-submit-action">
                        <span>
                            <button type="submit" className="hks-btn btn-submit"
                                onClick={this.handleSubmit.bind(this)}>
                                {this.state.mvBS}
                            </button>
                            <button type="reset" className="hks-btn btn-cancel"
                                onClick={this.handleResetForm.bind(this)}>
                                {this.props.language.button.reset}
                            </button>
                        </span>
                    </div>
                </div>
                </Body>
            </div>
        )
    }

    //--------------------------------------- REACT COMPONENT WILL RECEIVE PROPS
    componentWillReceiveProps(nextProps) {
        
        let orderDefault = nextProps.orderDefault
        if(orderDefault !== null) {
            this.state.mvBS = orderDefault.mvBS
            this.state.mvMarketID = orderDefault.mvMarketID
            this.state.mvStockName = orderDefault.mvStockName
            this.state.mvStockSelected = {
                stockCode: orderDefault.mvStockCode,
                stockName: orderDefault.mvStockName
            }

            this.setValue({
                mvBS: orderDefault.mvBS,
                mvStockCode: orderDefault.mvStockCode,
                mvStockName: orderDefault.mvStockName,
                mvMarketID: orderDefault.mvMarketID,
                mvOrderType: orderDefault.mvOrderType
            })
            this.refStockName.value(orderDefault.mvStockName)
            if(orderDefault.mvStockCode != "") {
                this.getInstrumentInfo(orderDefault.mvStockCode, orderDefault.mvMarketID)
            }
        }
    }

    //--------------------------------------- REACT COMPONENT DID MOUNT
    componentDidMount() {
        this.props.genEnterOrder()
        this.getBuyingPower()
    }


    //--------------------------------------- GET INSTRUMENT INFO
    getInstrumentInfo(stockCode, marketID) {
        marketID = marketID == undefined ? this.value.mvMarketID : marketID
        let me = this
        api.fetch(ACTION.QUERYINSTRUMENTINFO, {instrumentID: stockCode, marketID: marketID}, ACTION.POST, 
            function(response) {
                if(response) {
                    let shortName = response.shortName
                    let chineseShortName = response.chineseShortName
                    me.refStockName.value(shortName)
                    me.setValue({
                        mvLotSize: response.lotsize,
                        mvStockName: shortName,
                        mvChineseStockName: chineseShortName
                    })
                }
            },
            function(err) {
                me.props.showMessageBox(me.props.language.messagebox.title.error,
                    me.props.language.messagebox.message.invalidStockCode)
            }
        )
    }

    //--------------------------------------- GET BUYING POWER
    getBuyingPower() {
        let me = this
        let params = {
            channelID: config.cache.channelID,
            clientID: config.cache.clientID,
            tradingAccSeq: config.cache.clientID,
            // currencyID: "",
            language: config.cache.lang
            
        }
        api.fetch(ACTION.ACCOUNTBALANCEENQUIRY, params, ACTION.POST, 
            function(response) {
                if(response) {
                    me.setValue({
                        mvBuyingPower: response.buyingPower
                    })
                    me.mvBuyingPower.value(response.buyingPower)
                }
            }
        )
    }

    //--------------------------------------- GET COMMISSION FEES AND NET AMOUNT
    getFeesAndNetAmt() {
        let me = this
        let value = this.value
        if(value.mvStockCode == "") return

        let params = {
            marketID: value.mvMarketID,
            instrumentID: value.mvStockCode,
            BS: value.mvBS.slice(0,1),
            price: this.mvPrice.getValue(),
            qty: this.mvVol.getValue(),
            channelID: config.cache.channelID
        }
        api.fetch(ACTION.ORDERPLACEMENTPREVIEW, params, ACTION.POST, 
            function(response) {
                if(response) {
                    let totalFee = 0
                    response.feeList.map(fee => {
                        totalFee += fee.amount
                    })
                    me.setValue({
                        mvCommissionFees: totalFee,
                        mvNetAmt: response.netAmt
                    })
                    me.mvCommissionFees.value(totalFee)
                    me.mvNetAmt.value(response.netAmt)                    
                }
            }
        )
    }

    //--------------------------------------- GET TRADABLE QUANTITY (AVAIL QTY)
    getAvailQty() {
        let me = this
        let value = this.value
        if(value.mvStockCode == "") return

        let params = {
            MarketID: value.mvMarketID,
            ClientID: config.cache.clientID,
            TradingAccSeq: config.cache.tradingAccSeq,
            InstrumentID: value.mvStockCode,
            FetchCountLimit: 1,
            Language: config.cache.lang,
            SesssionID: config.cache.sessionID,
            
        }
        api.fetch(ACTION.PORTFOLIOENQUIRYBYINSTRUMENT, params, ACTION.POST, 
            function(response) {
                if(response && response.Instruments && response.Instruments.length > 0) {
                    let TradableQty = response.Instruments[0].TradableQty
                    me.setValue({
                        mvAvailQty: TradableQty
                    })
                    
                    me.mvAvailQty.value(TradableQty)                    
                }
            }
        )
    }


    //--------------------------------------- GET GOOD TILL TRADE DATE 
    getTradeDateInfo() {
        let me = this
        api.fetch(ACTION.GETTRADEDATEINFO, {dayNo: 1}, ACTION.POST, 
            function(response) {
                if(response && response.tradeDateInfoList && response.tradeDateInfoList.length > 0) {
                    let tradeDateInfoList = response.tradeDateInfoList.filter(e => e.marketID == me.value.mvMarketID)
                    if(tradeDateInfoList.length > 0) {
                        let tradeDateList = tradeDateInfoList[0].tradeDateList
                        
                        me.setState({
                            mvTradeDateList: tradeDateList
                        })
                    }                
                }
            }
        )
    }

    //--------------------------------------- HANDLE SUBMIT
    handleSubmit(e) {
        e.preventDefault()
        let state = this.state
        let value = this.value
        let language = this.props.language
    
        if (value.mvStockCode == "") {
            this.props.showMessageBox(language.messagebox.title.error,
                language.messagebox.message.enterStockCode)

            return
        }

        if (isNaN(value.mvVol) || parseInt(value.mvVol) == 0) {
            this.props.showMessageBox(language.messagebox.title.note,
                language.messagebox.message.enterQty)

            this.mvVol.focus()
            return
        } 
        // else {

        //     var lotSize = value.mvLot
        //     var orderType = value.mvOrderType
        //     var volume = value.mvVol
            
        //     var errorMsg = ''
        //     if (volume % lotSize > 0 && orderType !== language.enterorder.value.OTLOddLot) {
        //         errorMsg = language.messagebox.message.invalidLotSize;
        //         errorMsg = errorMsg.replace("{0}", lotSize);

        //         this.props.showMessageBox(language.messagebox.title.error, errorMsg)

        //         this.mvVol.focus()
        //         return
        //     }
        //     else if (volume % lotSize > 0 && orderType === language.enterorder.value.OTLOddLot && volume >= lotSize) {
        //         errorMsg = language.messagebox.message.invalidLotSizeOddLot;
        //         errorMsg = errorMsg.replace("{0}", lotSize);

        //         this.props.showMessageBox(language.messagebox.title.error, errorMsg)


        //         this.mvVol.focus()
        //         return
        //     }
        // }
        
        if (isNaN(value.mvPrice) || parseInt(value.mvPrice) == 0) {
            this.props.showMessageBox(language.messagebox.title.note,
                language.messagebox.message.enterPrice)

            this.mvPrice.focus()
            return
        } 

    }

    //--------------------------------------- HANDLE RESET FORM
    handleResetForm() {
        this.setState({
            mvStockSelected: "",
        })
        this.setValue({
            mvStockCode: "",
            mvStockName: "",
            mvVol: 0,
            mvCommissionFees: "",
            mvNetAmt: "",
            mvBuyingPower: "",
            mvGrossAmt: 0,
            mvMaxQty: 0,
            mvAvailQty: 0
        })
        this.refStockCode.value("")
        this.refStockName.value("")
        this.mvGrossAmt.value("---")
        this.mvBuyingPower.value("---")
        this.mvCommissionFees.value("---")
        this.mvNetAmt.value("---")
        this.mvAvailQty.value("---")
    }


    //--------------------------------------- CALCULATE GROSS AMOUNT
    calculateGrossAmt() {
        // get mvPrice from Form     
        let price = this.mvPrice.getValue()
        price = isNaN(price) ? 0 : price
        // get mvVol from Form
        let volume = this.mvVol.getValue()
        volume = isNaN(volume) ? 0 : volume
     
        this.setValue({mvGrossAmt: Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang) })
        this.mvGrossAmt.value(Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang))
    }


    //--------------------------------------- CHECK TIME ORDER
    checkTimeOrder(marketID, orderType, successHandler, failHandler) {
        let me = this
        this.getMarketStatus(marketID,
            function (response) {
                

            },
            function (err) {
                failHandler(err)
            }
        )
    }

    //--------------------------------------- GET MARKET STATUS
    getMarketStatus(marketID, successHandler, failHandler) {
        let param = {
            "mvMarketID": marketID,
            "key": new Date().getTime()
        }
        api.fetch(ACTION.QUERYMARKETSTATUSINFO, param, 'POST', successHandler, failHandler)
    }

    //--------------------------------------- SHOW CONFIRM
    showOrderConfirm() {
        let value = this.value
        let state = this.state
        let data = {
            mvStockCode: value.mvStockCode,
            mvStockName: value.mvStockName,
            mvPrice: value.mvPrice,
            mvVolume: value.mvVol,
            mvOrderType: value.mvOrderType,
            mvGrossAmt: value.mvGrossAmt,
            mvBS: value.mvBS.slice(0, 1),
            mvMarketID: value.mvMarketID,
            
            mvGoodTillDate: value.mvGoodTillDate,
            mvStopOrderType: value.mvStopOrderType,
            mvStopOrderPrice: this.rStopOrderPrice.getValue(),
            language: this.props.language
        }
        this.props.showOrderConfirm({
            data: data,
            title: this.props.language.enterorder.popup.title.replace('{0}', value.mvBS.slice(0, 1) === 'B' ?
                this.props.language.enterorder.header.buy :
                this.props.language.enterorder.header.sell),
            language: this.props.language,
            id: 'enterorderconfirm',
            authcard: true
        })
    }

}

const mapStateToProps = (state) => {
    return {
        genEnterOrderData: state.enterOrder.genEnterOrder,
        orderDefault: state.enterOrder.orderDefaultParams
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    genEnterOrder: () => {
        dispatch(actions.genEnterOrder())
    },
    showMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    showOrderConfirm: (param) => {
        dispatch(actions.showPopup(param))
    },
    setDefaultOrderParams: (params) => {
        dispatch(actions.setDefaultOrderParams(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrder)