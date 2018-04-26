import React from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, Checkbox } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as Utils from '../../utils'
import moment, { min } from 'moment'
import config from '../../core/config'
// import 'react-power-select/dist/react-power-select.css'
import * as api from '../../api/web_service_api'
import * as ACTION from '../../api/action_name'
import CalendarPicker from '../commons/CalendarPicker'
import Select from "../commons/InputSelect"
import Input from "../commons/Input"
import * as Log from "../../logger/TTLLog"
import Component from "../commons/Component"
import {handleNMOrder} from "../../actions/handleNMOrder"


import AccountSelector from "../commons/selector/AccountSelector"



const { Contants } = require('../../core/constants')

const TRADINGTYPE = {
    NORMAL: "NORMAL",
    DERIVATIVES: "DERIVATIVES"
}

class PlaceOrderFNO extends React.Component {
    constructor(props) {
        super(props)
        this.lang = "vi_VN"
        this.id = "enterorder"
        this.state = {
            // enterorder params
            mvBS: "BUY",
            mvMarketID: "",
            mvOrderType: "",
            mvFeeRate: "",
            mvGrossAmt: 0,

            mvTriggerSelected: "UP",
            mvStockSelected: {
                stockCode: ''
            },
            mvOrderTypeSelected: [],
            mvLending: 0,
            mvUsable: 0,
            mvExpireChecked: false,
            mvExpireDate: moment(),
            // other paras support for view
            stockList: this.props.stockList,
            mvOrderTypeList: [],
            mvBSList: ["BUY", "SELL"],

            // bank account
            mvSettlementAccSelected: null,

            //sub account
            mvListSubAcc: props.tradingAccounts,
            mvSubAccSelected: props.currentTrdAccount,

            tradingType: TRADINGTYPE.NORMAL,
        }

        this.store = {
            stockInfoBean: null,
            stockBalanceInfo: null,
            listOrderType: {}
        }

        this.value = {
            mvStockCode: "",
            mvStockName: "",
            mvOrderType: "",
            mvBS: "BUY",
            mvMarketID: "",
            mvVol: 0,
            mvFeeRate: "",
            mvLending: "",
            mvUsable: 0,
            mvBuyPower: "",
            mvGrossAmt: 0,
            mvMaxQty: 0,
            mvExpireChecked: false,
            mvExpireDate: moment(),
            mvBankACID: null,
            mvBankID: null,

            mvSettlementAccSelected: null,
            mvSubAccSelected: props.currentTrdAccount,

            tradingType: TRADINGTYPE.NORMAL,
        }
        
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
    }

    handleStockChange(options) {
        let {mvStockSelected} = this.state
        let {listInstrumentInWatchList, portfolioData} = this.props

        if( options.stockCode == mvStockSelected.stockCode && options.mvMarketID == mvStockSelected.mvMarketID ) {
            // selected same instrument
            return
        } else if(options.mvMarketID == "VNFE") {
            // selected fs series
            var marketID = options.mvMarketID
            var stockCode = options.stockCode
            var stockName = options.stockName

            
            this.setState({
                mvStockSelected: options,
                mvMarketID: marketID,
                tradingType: TRADINGTYPE.DERIVATIVES
            })
            this.setValue({
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: marketID,
                tradingType: TRADINGTYPE.DERIVATIVES
            })

            // update order type
            this.props.setDefaultOrderParams(this.value)
            this.getOrderTypeList(this.props.genEnterOrderData)

            // update account
            let subAccounts = this.state.mvListSubAcc.filter(e => e.investorType == "DERIVATIVES")

            if((subAccounts.length > 0 && this.state.mvSubAccSelected.investorType != "DERIVATIVES") ||
                (subAccounts.length > 0 && this.state.mvSubAccSelected.investorType == undefined) )
            {
                this.setState({
                    mvSubAccSelected: subAccounts[0]
                })
            }


            this.refStockName.value(stockName)
            this.refMarketID.value(marketID)
            
            this.mvBuyingPower.value("---")
        }

        
        this.props.changeInstrument(options.stockCode)
    }

    handleOrderTypeChange(option) {
        var orderTypeValue = option.value
        var type = option.value
        this.state.mvOrderType = type

        this.calculateGrossAmt();
        this.mvPrice.readonly(false)

        if (type === this.props.language.enterorder.value.OTLO || 
            type === this.props.language.enterorder.value.OTLOddLot) 
        {
            this.mvPrice.readonly(false)
            this.mvPrice.value(this.value.mvPrice)
        } else {
            this.mvPrice.value("")
            this.mvPrice.readonly(true)
        }

        this.setState({ value: Object.assign(this.state, { mvOrderTypeSelected: option }) })

    }

    onQtyChange(value) {
        this.setValue({mvVol: value})
        this.calculateGrossAmt()
    }
    
    onPriceChange(value) {
        this.setValue({mvPrice: value})
        this.calculateGrossAmt()

    }

    handleTriggerPriceChange(options) {
        this.setState({mvTriggerSelected: options})
    }

    handleDateChange(_date) {
        this.setState({
            mvExpireDate: _date
        });
        this.setValue({ mvExpireDate: _date })
    }

    handleDateExpireCheck(e) {
        this.setState({ mvExpireChecked: e.target.checked });
        this.setValue({ mvExpireChecked: e.target.checked });
    }

    handleBSTabChange(bs) {
        this.handleBSChange(bs)

        if(bs == "BUY") {
            document.getElementById("tabBuy").classList.add("active")
            document.getElementById("tabSell").classList.remove("active")
        } else {
            document.getElementById("tabBuy").classList.remove("active")
            document.getElementById("tabSell").classList.add("active")
        }
    }

    handleSubAccChange(option) {
        let type = TRADINGTYPE.NORMAL
        if(option.type == "DERIVATIVES") {
            type = TRADINGTYPE.DERIVATIVES
        } 
        this.setState({
            mvSubAccSelected: option,
            tradingType: type
        })

        this.setValue({
            mvSubAccSelected: option,
            tradingType: type
        })
    }

    render() {
        let {theme, language, tabID, showTitle} = this.props
        let header = language.enterorder.header
        this.stockList = config.cache.stockList

        let bg = "";
        let tColor= "";

        if(theme.title == "dark") {
            bg = "#474747"
            tColor = "#FFF"
        } else {
            bg = "#FFF"
            tColor = "#000"

        }

        let selectorStyles = {
            background: "#2159a0",
            color: "#FFF"
        } 
        if(theme.title == "virtual") {
            selectorStyles = {
                background: "#ee514c",
                color: "#FFF"
            } 
        }

        
        let BS = this.state.mvBS
        let placeOrderBg = theme.placeorder.background[BS.toLowerCase()]
        let tabActivedStyle = theme.placeorder.tabBS.active
        tabActivedStyle["backgroundColor"] = placeOrderBg.backgroundColor

        let showTi = false
        if(tabID == "customization") {
            showTi = true
            if(showTitle != undefined) {
                showTi = showTitle
            }
        }

        return (

            <Component style={{ height: "100%", position: "relative" }} id={this.id} theme={theme}>                 
                {
                    showTi ? 
                        <Title language={this.props.language} theme={theme} widgetID= 'placeorder'>
                            {this.props.language.menu['placeorder']}
                        </Title>
                        : null
                }
                <Body theme={theme} className={showTi ? 'title': 'no-title'}>

                    {/* PLACE ORDER CONTROL */}
                    <div className="pl-subacc-control">
                        <AccountSelector theme={theme}
                            style={selectorStyles}
                            selected={this.state.mvSubAccSelected}
                            language={language} ref={n => this.tradingAccount = n} 
                            handleChange={opt => this.handleSubAccChange(opt)}/>
                        <span style={theme.font.main} className="sep"></span>
                        <div className="pl-pin">
                            <span style={theme.font.main}>PIN</span>
                            <Input key="refPIN" type="password" ref={ref => this.refPIN =  ref} 
                                defaultValue={""} style={{textAlign: "center"}} tabIndex={-1}/>
                            <Checkbox inline>{header.savepin}</Checkbox>
                        </div>
                    </div>
                    <div className="pl-tab-control">
                        <span style={BS=="BUY"?tabActivedStyle:theme.placeorder.tabBS.normal} 
                            className={this.state.mvBS==="BUY"?"pl-tab active":"pl-tab" } id="tabBuy" 
                            onClick={e => this.handleBSTabChange("BUY")}>{header.buy}</span>
                        <span style={BS=="SELL"?tabActivedStyle:theme.placeorder.tabBS.normal} 
                            className={this.state.mvBS==="SELL"?"pl-tab active":"pl-tab" } id="tabSell" 
                            onClick={e => this.handleBSTabChange("SELL")}>{header.sell}</span>
                    </div>
                    <div className={"enterorder-form " + BS.toLowerCase()}
                        style={Object.assign({}, {height: "calc(100% - 54px)"}, placeOrderBg )}>
                        {/* Column Left */}
                        <div className="placeorder-col-left" style={{display: "table-cell"}}>
                            {/* MARKET */}
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.stockCode}
                                </Col>
                                <Col xs={7}>
                                    <Col xs={6}>
                                        <Select
                                            className="stock-selector"
                                            key="rStockSelector"
                                            ref={r => this.rStockSelector = r}
                                            options={this.stockList}
                                            selected={this.state.mvStockSelected}
                                            optionLabelPath={'stockCode'}
                                            handleChange={this.handleStockChange.bind(this)}
                                            searchEnabled={true}
                                            stockSelector={true}
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <Input key="refMarket" type="text" ref={ref => this.refMarketID =  ref} 
                                            className="readOnly" readOnly defaultValue={""} style={{textAlign: "left"}} tabIndex={-1}/>
                                    </Col>
                                
                                </Col>
                            </div>

                            {/* STOCK CODE */}
                            {/* <div style={{display: "table", width: "100%"}}>
                                
                                <Col xs={5} style={{color: tColor}}>
                                    {header.stockCode}
                                </Col>
                                <Col xs={7}>
                                    <Select
                                        ket="rStockSelector"
                                        ref={r => this.rStockSelector = r}
                                        options={this.stockList}
                                        selected={this.state.mvStockSelected}
                                        optionLabelPath={'stockCode'}
                                        handleChange={this.handleStockChange.bind(this)}
                                        searchEnabled={true}
                                    />
                                </Col>
                            </div> */}

                            {/* STOCK NAME */}
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {}
                                </Col>
                                <Col xs={7}>
                                    <Input key="refStockName" type="text" ref={ref => this.refStockName =  ref} 
                                        className="readOnly" readOnly defaultValue={""} style={{textAlign: "left"}} tabIndex={-1}/>
                                </Col>
                            </div>

                            {/* PRICE */}
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.price}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvPrice" type="currency" ref={ref => this.mvPrice =  ref} step={10}
                                        onChange={this.onPriceChange.bind(this)}
                                        onKeyPress={this.handleSubmit.bind(this)}
                                        />
                                </Col>
                            </div>

                            {/* TRIGGER PRICE */}
                            { /* <div style={{display: "none", width: "100%"}} ref={r => this.rTriggerForm = r}>
                                    <Col xs={5} style={{color: tColor}}>
                                        {header.triggerPrice}
                                    </Col>
                                    <Col xs={7}>
                                        <Col xs={5}>
                                            <Select
                                                ket="rTriggerPriceSelector"
                                                ref={r => this.rTriggerPriceSelector = r}
                                                options={["UP", "DOWN"]}
                                                selected={this.state.mvTriggerSelected}
                                                optionLabelPath={'stockCode'}
                                                handleChange={this.handleTriggerPriceChange.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={7}>
                                            <Input key="rTriggerPriceName" type="text" ref={ref => this.mvTriggerPriceValue =  ref} 
                                                defaultValue={""} style={{textAlign: "left"}}/>
                                        </Col>
                                    </Col>
                                </div>
                                */}
                            {/* QUANTITY */}
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} className="placeorder-title" style={{color: tColor}}>
                                    {header.quantity}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvVol" type="number" ref={ref => this.mvVol =  ref} step={1}
                                        onChange={this.onQtyChange.bind(this)}
                                        onKeyPress={this.handleSubmit.bind(this)}
                                    />
                                </Col>
                            </div>

                            {/* ORDER TYPE */}
                            <div  style={{display: "table", width: "100%"}}>
                                <Col xs={5}  style={{color: tColor}}>
                                    {header.ordertype}
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

                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5}></Col>
                                <Col xs={7}>
                                    <div className="group-btn-action form-submit-action" style={{}}>
                                        
                                            <button type="submit" className="hks-btn btn-submit"
                                                onClick={this.handleSubmit.bind(this)}>
                                                {this.props.language.button[this.state.mvBS.toLowerCase()]}
                                            </button>
                                            <button type="reset" className="hks-btn btn-cancel"
                                                onClick={this.handleResetForm.bind(this)}>
                                                {this.props.language.button.reset}
                                            </button>
                                        
                                    </div>
                                </Col>
                            </div>
                            
                        </div>
                        {/* End Left Column */}
                            
                        {/* Column Right */}
                        <div className="placeorder-col-right" style={{display: "table-cell"}}>
                            {/* GOOD TILL
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.goodTill}
                                </Col>
                                <Col xs={7}>
                                        <Select
                                            ket="rGoodTillSelector"
                                            ref={r => this.rStockSelector = r}
                                            options={this.stockList}
                                            selected={this.state.mvStockSelected}
                                            optionLabelPath={'stockCode'}
                                            handleChange={this.handleStockChange.bind(this)}
                                        />
                                </Col>
                            </div> */}

                            {/* Usable */}
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.usable}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvUsable" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvUsable = ref} readOnly value={this.getUsable(this.props)}  
                                        style={{color: tColor, textAlign: "right"}} tabIndex={-1}/>
                                </Col>
                            </div>
                            
                            {/* % Margin */}
                            {/* <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.lending}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvLending" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvLending = ref} readOnly value={this.value.mvLending}  
                                        style={{color: tColor, textAlign: "right"}} tabIndex={-1}/>
                                </Col>
                            </div> */}

                            {/* BUYING POWER */}
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.buyingpower}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvBuyingPower" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvBuyingPower = ref} readOnly value={this.getUsable(this.props)}  
                                        style={{color: tColor, textAlign: "right"}} tabIndex={-1}/>
                                </Col>
                            </div>

                            {/* Maximun */}
                            {/* <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.maximum}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvMaximum" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvMaximum = ref} readOnly value={0}  
                                        style={{color: tColor, textAlign: "right"}} tabIndex={-1}/>
                                </Col>
                            </div> */}


                            {/* GROSS AMT */}
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.grossAmt}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvGrossAmt" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvGrossAmt = ref} readOnly value={this.value.mvGrossAmt} 
                                        style={{color: tColor, textAlign: "right"}} tabIndex={-1}/>
                                </Col>
                            </div>

                            {/* PERCENTAGE */}
                            {/* <div  style={{display: "table", width: "100%"}}>
                                
                                <Col xs={12}>
                                    <ul  className="listPercentage">{listPercentage}</ul>  
                                </Col>
                            </div> */}

                            {/* NET FEE */}
                            {/* <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.netfee}
                                </Col>
                                <Col xs={7} style={{color: tColor}}>
                                    <Input key="mvNetFee" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvNetFee = ref} readOnly value={this.value.mvNetFee} 
                                        style={{color: tColor, textAlign: "right"}} tabIndex={-1}/>
                                </Col>
                            </div> */}

                            {/* Expire Date */}
                            {/* <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.expirydate}
                                </Col>
                                <Col xs={7} style={{}}>
                                    <div style={{float: "left"}}>
                                        <input name="isCheck" type="checkbox"
                                            checked={this.state.mvExpireChecked}
                                            onChange={this.handleDateExpireCheck.bind(this)}
                                            value={this.state.mvExpireChecked} />
                                    </div>
                                    <div style={{paddingLeft: "20px"}}>
                                        <CalendarPicker 
                                            disabled={!this.state.mvExpireChecked}
                                            selected={this.state.mvExpireDate} 
                                            onChange={this.handleDateChange.bind(this)} 
                                            id={"canlender-enterorder"}/>
                                    </div>
                                    
                                </Col>
                            </div> */}

                            {/* COMMISSION FEE
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.commissionFees}
                                </Col>
                                <Col xs={7} style={{color: tColor}}>
                                    <Input key="mvCommissionFees" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvCommissionFees = ref} readOnly value={this.value.mvCommissionFees} style={{color: tColor}}/>
                                </Col>
                            </div> */}

                            {/* NET AMT
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.netAmt}
                                </Col>
                                <Col xs={7}>
                                    <Input key="mvNetAmt" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvNetAmt = ref} readOnly value={this.value.mvNetAmt}  style={{color: tColor}}/>
                                </Col>
                            </div> */}

                            {/* AVAIL QUANTITY
                            <div style={{display: "table", width: "100%"}}>
                                <Col xs={5} style={{color: tColor}}>
                                    {header.availQty}
                                </Col>
                                <Col xs={7} style={{color: tColor}}>
                                    <Input key="mvAvailQty" className="showOnly"  defaultValue={"---"}
                                        ref={ref => this.mvAvailQty = ref} readOnly value={this.value.mvAvailQty} style={{color: tColor}}/>
                                </Col>
                            </div> */}
                        </div>
                        {/* End Right Column */}
                        
                    </div>
                </Body>
            </Component>
        )
    }
    componentDidMount() {
        this.props.genEnterOrder()
        this.props.getAccountBalance({key: (new Date()).getTime()})
        this.props.cashBalanceEnquiry({
            tradingAccSeq : parseInt(this.props.currentTrdAccount.accountSeq),
            subAccountID : this.props.currentTrdAccount.subAccountID
        })

        console.log("componentDidMount", this.props)
        let orderDefault = this.props.orderDefault
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
                // mvOrderType: orderDefault.mvOrderType
            })
            this.refStockName.value(orderDefault.mvStockName)
            this.refMarketID.value(orderDefault.mvMarketID)
            
            

            this.props.setStockInfo({
                "stockCode": orderDefault.mvStockCode,
                "stockName": orderDefault.mvStockName,
                "mvMarketID": orderDefault.mvMarketID
            })
            this.getOrderTypeList(this.props.genEnterOrderData)
        }
    }

    componentWillReceiveProps(nextProps) {
        
        let orderDefault = nextProps.orderDefault
        if(orderDefault !== null) {
            this.state.mvBS = orderDefault.mvBS
            this.state.mvStockName = orderDefault.mvStockName

            this.state.mvMarketID = orderDefault.mvMarketID
            this.state.mvStockSelected = {
                stockCode: orderDefault.mvStockCode,
                stockName: orderDefault.mvStockName,
                mvMarketID: orderDefault.mvMarketID
            }

            this.setValue({
                mvBS: orderDefault.mvBS,
                mvStockCode: orderDefault.mvStockCode,
                mvStockName: orderDefault.mvStockName,
                mvMarketID: orderDefault.mvMarketID,
                mvOrderType: orderDefault.mvOrderType
            })

            if(orderDefault.mvQty != undefined) {
                this.state.mvVol = orderDefault.mvQty
                this.setValue({ mvVol: Utils.numUnFormat(this.state.mvVol) })
                console.log(Utils.numUnFormat(this.state.mvVol))
                this.mvVol.value(Utils.numUnFormat(this.state.mvVol))
            }
            if(orderDefault.mvPrice != undefined) {
                this.state.mvPrice = orderDefault.mvPrice
                this.setValue({ mvPrice: this.state.mvPrice })
                this.mvPrice.value(this.state.mvPrice)
            }

            this.refStockName.value(orderDefault.mvStockName)
            this.refMarketID.value(orderDefault.mvMarketID)
            
            

            if(orderDefault.mvMarketID == "VNFE") {
                this.switchTradingAcc(true)
            } else {
                this.switchTradingAcc(false)
            }

            // focus to mvVol
            this.mvVol.focus()
            this.calculateGrossAmt()
        }
        this.getOrderTypeList(nextProps.genEnterOrderData)
    }

    switchTradingAcc(isDerivatives) {
        
        if(isDerivatives) {
            let tmp = this.state.mvListSubAcc.filter(e => e.type == "DERIVATIVES")
            console.log(isDerivatives)
            if(tmp.length > 0) {
                this.setState({
                    mvSubAccSelected: tmp[0],
                    tradingType: TRADINGTYPE.DERIVATIVES
                })
            }
        } else {
            let tmp = this.state.mvListSubAcc.filter(e => e.type != "DERIVATIVES")
            if(tmp.length > 0) {
                this.setState({
                    mvSubAccSelected: tmp[0],
                    tradingType: TRADINGTYPE.NORMAL
                })
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        var state = this.state
        var value = this.value
        var store = this.store
        var language = this.props.language

        let {listSeries} = this.props
        let list = listSeries.listSeries
        let tmp = list.filter(e => e.id == value.mvStockCode)
        console.log(tmp)

        this.props.handleFSOrder(
            {
                symbol: state.mvStockSelected.stockCode,
                symbolName: state.mvStockSelected.stockName,
                
                volume: this.mvVol.getValue(),
                lotSize: state.mvStockSelected.lotSize,
                orderType: state.mvOrderTypeSelected.value,

                ceil: tmp.length > 0 ? tmp[0].ceil : undefined,
                floor: tmp.length > 0 ? tmp[0].floor : undefined,

                price: this.mvPrice.readonly() ? undefined : this.mvPrice.getValue(),

                marketID: state.mvStockSelected.mvMarketID,

                bs: state.mvBS.slice(0,1),
                settleAcc: state.mvSettlementAccSelected,
                temporaryFee: value.mvTemporaryFee,

                grossAmt: value.mvGrossAmt,
                bankID: value.mvBankID,
                bankACID: value.mvBankACID,
                expiryDate: undefined,

                lending: value.mvLending,
                buyingPower: value.mvBuyPower,
                netFee: value.mvNetFee,

                pin: this.refPIN.value,
                tradingAccount: state.mvSubAccSelected,
                tradingType: state.tradingType,
            }, language, this.props.theme, this)
    }

    handleResetForm() {
        this.setState({
            mvStockSelected: "",
        })

        this.setValue({
            mvStockCode: "",
            mvStockName: "",
            mvMarketID: "",
            mvVol: 0,
            mvFeeRate: "",
            mvLending: "",
            mvBuyPower: "",
            mvGrossAmt: 0,
            mvMaxQty: 0,
            mvExpireChecked: false,
            mvExpireDate: moment(),
            mvBankACID: null,
            mvBankID: null,
            mvSettlementAccSelected: null,
            mvSubAccSelected: "C08000011"
        })
        this.refStockName.value("")
        this.mvGrossAmt.value("---")
        this.mvBuyingPower.value("---")
        this.mvVol.value(0)
        this.mvPrice.value(0)
        this.refMarketID.value("")
    }


    //--------------------------------------

    getUsable(props) {
        let data = props.accountBalanceInfoFS
        if(data == undefined || data.length < 1) {
            return Utils.currencyShowFormatter(0)
        }

        let EE_in = data[0]["internalAssets"]["ee"]
        let EE_ex = data[0]["exchangeAssets"]["ee"]
        let EE = EE_in > EE_ex ? EE_ex : EE_in
        
        return Utils.currencyShowFormatter(EE)
    }

    calculateGrossAmt() {
        
        var volume = this.mvVol.getValue()
        var price = this.mvPrice.getValue()
        if(this.mvPrice.readonly()) {
            price = 0
        }
        var netFee = 0.1;
        this.setValue({mvGrossAmt: Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang) })

        this.mvGrossAmt.value(Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang))
    }


    //---------------------------
    getOrderTypeList(genEnterOrderData) {
        var mvOrderTypeArray = new Array();
        var marketID = this.value.mvMarketID
        // console.log(marketID, genEnterOrderData)
        var mvEnableOrderTypeArray = genEnterOrderData.mvEnableOrderType;
        
        var ruleList = ["OTLO","OTATC","OTATO","OTMOK","OTMTL"]

        for (var i = 0; i < ruleList.length; i++) {
            mvOrderTypeArray.push(
                {
                    'label': this.props.language.enterorder.data[ruleList[i]],
                    'value': this.props.language.enterorder.value[ruleList[i]]
                }
            )
        }
        // console.log(mvOrderTypeArray)
        if (mvOrderTypeArray.length > 0) {
            // update order type
            // checkif have default ordertype value
            let defaultOrderTypeSelected = mvOrderTypeArray[0]
            let tmp = mvOrderTypeArray.filter(e => e.value == this.state.mvOrderTypeSelected.value)
            if(tmp.length > 0) {
                defaultOrderTypeSelected = tmp[0]
            }
            this.setState({
                mvOrderTypeList: mvOrderTypeArray,
                mvOrderType: defaultOrderTypeSelected.value,
                mvOrderTypeSelected: defaultOrderTypeSelected
            });
            this.setValue({
                mvOrderTypeList: mvOrderTypeArray,
                mvOrderType: defaultOrderTypeSelected.value,
                mvOrderTypeSelected: defaultOrderTypeSelected
            })

            console.log(defaultOrderTypeSelected.value, Log.LOG)
            if (defaultOrderTypeSelected.value == this.props.language.enterorder.value.OTLO || 
                defaultOrderTypeSelected.value == this.props.language.enterorder.value.OTLOddLot) 
            {
                this.mvPrice.readonly(false)
            } else {
                this.mvPrice.value("")
                this.mvPrice.readonly(true)
            }

            this.forceUpdate()
        }
    }

    //-------------
    //----------------

    //----------------
    
 
   
    //-------------------
    showAccBalance() {
        this.props.showAccBalance({
            data: {},
            title: this.props.language.menu.accountbalance ,
            language: this.props.language,
            theme: this.props.theme,
            id: 'accountbalance',
            authcard: false
        })
    }

}
/* For PErcentage Component*/
const percentages=[25,50,75,100];
const listPercentage=percentages.map((percentage)=>
   <li className="percentage">{percentage}%</li>
);
/*************************/
const mapStateToProps = (state) => {
    return {
        genEnterOrderData: state.enterOrder.genEnterOrder,
        orderDefault: state.enterOrder.orderDefaultParams,
        accountBalance: state.accountinfo.accountBalance,
        tabID: state.menuSelected.tabID,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
        portfolioData: state.trading.portfolioData.mvPortfolioBeanList,

        tradingAccounts: state.dologin.tradingAccounts,
        currentTrdAccount: state.dologin.currentTrdAccount,


        listSeries: state.stock.listSeries,
        accountBalanceInfoFS: state.portfolio.accountBalanceInfoFS
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    genEnterOrder: () => {
        dispatch(actions.genEnterOrder())
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    
    setDefaultOrderParams: (params) => {
        dispatch(actions.setDefaultOrderParams(params))
    },
    setStockInfo: (param) => {
        dispatch(actions.sendStockToStockMarketInfoWidget(param))
    },
	getAccountBalance: (cashbankparams) => {
		dispatch(actions.getAccountBalance(cashbankparams))
	},

    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },
    addInstrumentToWatch: (ins, market) => { dispatch(actions.addInstrumentToWatch(ins, market)) },
    removeInstrumentFromWatch: (ins, market) => { dispatch(actions.removeInstrumentFromWatch(ins, market)) },

    showAccBalance: (param) => {
        dispatch(actions.showPopup(param))
    },


    showMessageBox: (t, m) => {
        dispatch(actions.showMessageBox(t,m))
    },


    /////
    handleFSOrder: (value, language, theme, node) => { dispatch(actions.handleFSOrder(value, language, theme, node)) },

    cashBalanceEnquiry: (params) => {dispatch( actions.cashBalanceEnquiry(params) )},
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderFNO)