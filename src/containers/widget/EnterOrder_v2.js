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

            
            mvStockSelected: {
                stockCode: ''
            },
            mvOrderTypeSelected: config.ordertype[config.marketid[0]][0],
            


            // other paras support for view
            stockList: this.props.stockList,
            mvOrderTypeList: config.ordertype[config.marketid[0]],
            mvBSList: ["BUY", "SELL"],

            // bank account
            mvSettlementAccSelected: null,
        }

        this.store = {
            stockInfoBean: null,
            stockBalanceInfo: null,
        }

        this.value = {
            mvStockCode: "",
            mvStockName: "",
            mvOrderType: "",
            mvBS: "BUY",
            mvMarketID: config.marketid[0],
            mvVol: 0,
            mvFeeRate: "",
            mvLending: "",
            mvBuyPower: "",
            mvGrossAmt: 0,
            mvMaxQty: 0,
            mvExpireChecked: false,
            mvExpireDate: null,
            mvBankACID: null,
            mvBankID: null
        }
    }

    setValue(_val) {
        Object.assign(this.value, _val)
    }

    handleBSChange(options) {
        this.setState({ mvBS: options })
        this.setValue({ mvBS: options })

        this.calBuySellAll()
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

        var marketID = options.mvMarketID
        var stockCode = options.stockCode
        var stockName = options.stockName
        
        var bsValue = this.value.mvBS.slice(0, 1)

        this.setState({
            mvStockSelected: options,
            mvMarketID: marketID
        })
        this.setValue({
            mvStockCode: stockCode,
            mvStockName: stockName,
            mvMarketID: marketID
        })
        this.refStockName.value(stockName)

        this.getStockInfo(stockCode, marketID, bsValue)
        this.props.setDefaultOrderParams(this.value)
    }

    handleOrderTypeChange(options) {
        var orderTypeValue = options.value
        if(orderTypeValue == "TRIGGER") {
            this.rTriggerForm.style.display = "table"
        }
        else {
            this.rTriggerForm.style.display = "none"
        }
        this.setState({
            mvOrderTypeSelected: options
        })
    }

    onQtyChange(value) {
        this.setValue({mvVol: value})
        this.calculateGrossAmt()
    }
    
    onPriceChange(value) {
        this.setValue({mvPrice: value})
        this.calculateGrossAmt()
        
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
                    </div>

                    {/* STOCK NAME */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.stockName}
                        </Col>
                        <Col xs={7}>
                            <Input key="refStockName" type="text" ref={ref => this.refStockName =  ref} 
                                className="readOnly" readOnly defaultValue={""}/>
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
                                    ket="rTriggerPriceSelector"
                                    ref={r => this.rStockSelector = r}
                                    options={this.stockList}
                                    selected={this.state.mvStockSelected}
                                    optionLabelPath={'stockCode'}
                                    handleChange={this.handleStockChange.bind(this)}
                                    searchEnabled={true}
                                />
                            </Col>
                            <Col xs={7}>
                                <Input key="rTriggerPriceName" type="text" ref={ref => this.refStockName =  ref} 
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
                                    options={this.stockList}
                                    selected={this.state.mvStockSelected}
                                    optionLabelPath={'stockCode'}
                                    handleChange={this.handleStockChange.bind(this)}
                                    searchEnabled={true}
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
                                ref={ref => this.mvBuyingPower = ref} readOnly value={this.value.mvMaxQty}/>
                        </Col>
                    </div>

                    {/* GROSS AMT */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.grossAmt}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvGrossAmt" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvGrossAmt = ref} readOnly value={this.value.mvMaxQty}/>
                        </Col>
                    </div>

                    {/* COMMISSION FEE */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.commissionFees}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvCommissionFees" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvCommissionFees = ref} readOnly value={this.value.mvMaxQty}/>
                        </Col>
                    </div>

                    {/* NET AMT */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.netAmt}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvNetAmt" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvNetAmt = ref} readOnly value={this.value.mvMaxQty}/>
                        </Col>
                    </div>

                    {/* AVAIL QUANTITY */}
                    <div style={{display: "table", width: "100%"}}>
                        <Col xs={5}>
                            {header.availQty}
                        </Col>
                        <Col xs={7}>
                            <Input key="mvAvailQty" className="showOnly"  defaultValue={"---"}
                                ref={ref => this.mvAvailQty = ref} readOnly value={this.value.mvMaxQty}/>
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

    handleSubmit(e) {
        e.preventDefault()
        var state = this.state
        var value = this.value
        var store = this.store
        var language = this.props.language
    
        if (value.mvStockCode == "") {
            this.props.onShowMessageBox(language.messagebox.title.error,
                language.messagebox.message.enterStockCode)

            return
        }

        if (isNaN(value.mvVol) || parseInt(value.mvVol) == 0) {
            this.props.onShowMessageBox(language.messagebox.title.note,
                language.messagebox.message.enterQty)

            this.mvVol.focus()
            return
        } else {

            var lotSize = state.mvStockSelected.lotSize
            var orderType = value.mvOrderType
            var volume = value.mvVol
            
            var errorMsg = ''
            if (volume % lotSize > 0 && orderType !== language.enterorder.value.OTLOddLot) {
                errorMsg = language.messagebox.message.invalidLotSize;
                errorMsg = errorMsg.replace("{0}", lotSize);

                this.props.onShowMessageBox(language.messagebox.title.error, errorMsg)

                this.mvVol.focus()
                return
            }
            else if (volume % lotSize > 0 && orderType === language.enterorder.value.OTLOddLot && volume >= lotSize) {
                errorMsg = language.messagebox.message.invalidLotSizeOddLot;
                errorMsg = errorMsg.replace("{0}", lotSize);

                this.props.onShowMessageBox(language.messagebox.title.error, errorMsg)


                this.mvVol.focus()
                return
            }
        }
        
        if (!this.mvPrice.readonly()) {
            var price = value.mvPrice
            if (isNaN(price) || parseInt(price) === 0) {
                this.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.enterPrice)
                this.mvPrice.focus()
                return
            } else if (price < 0) {
                this.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.priceNegative)
                this.mvPrice.focus()
                return
            } else {
                if(store.stockInfoBean == null) {
                    var errorMsg = language.messagebox.message.placeOrderFailed;
                    this.props.onShowMessageBox(language.messagebox.title.error, errorMsg)
                    return
                } else {
                    var floor = parseFloat(store.stockInfoBean.mvFloor);
                    var ceil = parseFloat(store.stockInfoBean.mvCeiling);
    
                    if (!value.mvExpireChecked) {
                        if (ceil != 0 && floor != 0) {
                            if (price > ceil || price < floor) {
                                var errorMsg = language.messagebox.message.invaliedPriceOutRange;
                                errorMsg = errorMsg.replace('from_value', floor).replace('to_value', ceil);
    
                                this.props.onShowMessageBox(language.messagebox.title.error, errorMsg)
    
                                this.mvPrice.focus()
                                return
                            }
                        }
                    }
                }
                

                // var result = Utils.checkStepPrice(price, me.marketIDHidden.getValue(), true, me.symbolInfo.spreadTableCode);
                // if(result != ""){
                //     Ext.MessageBox.alert(messageBox.title.error, result);
                //     return false;
                // }
            }
        }

        var me = this
        // check time order
        // console.log(value.mvMarketID, value.mvOrderType, value.mvExpireChecked)

        this.checkTimeOrder(value.mvMarketID, value.mvOrderType, value.mvExpireChecked,
            function () {
                var ceil = store.stockInfoBean.mvCeiling;
                var floor = store.stockInfoBean.mvFloor;

                var bs = value.mvBS.slice(0, 1)
                var priceValue = !me.mvPrice.readonly() ? value.mvPrice : ceil;
                var quantity = value.mvVol
                var netFee = 0;
                if (value.mvFeeRate !== '') {
                    netFee = Utils.numUnFormat(value.mvFeeRate, ',');
                }
                // console.log('SUCCESS FIRST', ceil, floor, priceValue, quantity, netFee, state.mvSettlementAccSelected)

                me.checkOrderBalanceStatus(state.mvSettlementAccSelected, bs, value.mvStockCode,
                    value.mvMarketID, priceValue, quantity, netFee,
                    function () {
                        var param = {
                            mvBS: value.mvBS.slice(0, 1),
                            mvStockCode: value.mvStockCode,
                            mvMarketID: value.mvMarketID,
                            mvPrice: value.mvPrice,
                            mvQuantity: value.mvVol,
                            mvOrderTypeValue: value.mvOrderType,
                            mvGoodTillDate: moment(value.mvExpireDate).format(Contants.dateFormat),
                            mvGrossAmt: value.mvGrossAmt,
                            mvBankID: value.mvBankID,
                            mvBankACID: value.mvBankACID,
                        }

                        // console.log('SUCCESS SECOND', param)
                        api.fetch(ACTION.VERIFYORDER, param, 'POST',
                            function (result) {//success

                                try {
                                    if (result.mvResult == "SESSION_EXPIRED") {
                                        //sessionExpired();
                                        return;
                                    }
                                    if (result.mvResult == "MULTI_USERS_LOGIN") {
                                        //multiUsersLogin();
                                        return;
                                    }

                                    if (result.mvResult == "SYSTEM_MAINTENANCE") {
                                        //systemMaintenance();
                                        return;
                                    }

                                    if (result.mvReturnCode == 30013) {
                                        //Ext.Msg.alert(error.FAILED_TITLE, messageBox.message.disablePlaceOrderMarket +  action.result.mvResult );
                                        return;
                                    }
                                    // console.log('SUCCESS THIRD', param)
                                    me.showOrderConfirm()   // end of way
                                }
                                catch (e) { }
                                finally { }

                            },
                            function (json) {//fail    
                                console.log('FAIL THIRD', param)
                                api.fetch(ACTION.ENTERORDERFAIL, { key: '' + (new Date()).getTime() }, 'POST', function (result) {
                                    if (result.mvResult == "SESSION_EXPIRED") {
                                        //sessionExpired();
                                        return;
                                    }
                                    if (result.mvResult == "MULTI_USERS_LOGIN") {
                                        //multiUsersLogin();
                                        return;
                                    }
                                    if (result.mvResult == "SYSTEM_MAINTENANCE") {
                                        //systemMaintenance();
                                        return;
                                    }
                                });
                            }
                        )

                    },
                    function () { // fail Handler
                        console.log('FAIL SECOND')

                    }
                )

            },
            function () { // fail Handler
                console.log('FAIL FIRST')
            }
        )

    }

    handleResetForm() {
        this.setState({
            mvStockSelected: "",
        })
        this.setValue({
            mvStockCode: "",
            mvStockName: "",
            mvVol: 0,
            mvFeeRate: "",
            mvLending: "",
            mvBuyPower: "",
            mvGrossAmt: 0,
            mvMaxQty: 0,
            mvExpireChecked: false,
            mvExpireDate: null,
            mvBankACID: null,
            mvBankID: null
        })
        this.refStockName.value("")
        this.mvGrossAmt.value("---")
        this.mvBuyingPower.value("---")
        this.mvCommissionFees.value("---")
        this.mvNetAmt.value("---")
        this.mvAvailQty.value("---")
    }


    //--------------------------------------

    getStockInfo(stockCode, marketID, bsValue) {
        var me = this
        var showBP = true;
        var mvEnableGetStockInfo = "N";
        var mvActionStockInfo = "OI";   //OI = Order Info
        if (showBP && bsValue === 'B') {
            mvActionStockInfo += ",BP";
        }
        if (this.value.mvFeeRate === '') {
            mvActionStockInfo += ",FE";
        }
        

        var params = {
            mvInstrument: stockCode,
            mvMarketId: marketID,
            mvBS: bsValue,
            mvEnableGetStockInfo: mvEnableGetStockInfo,
            mvAction: mvActionStockInfo,
            key: (new Date()).getTime()
        }

        api.fetch(ACTION.STOCKINFO, params, 'POST', function (response) {
            me.store.stockInfoBean = response.mvStockInfoBean;
            me.store.stockBalanceInfo = response.mvStockBalanceInfo;

            if (me.store.stockInfoBean.mvTemporaryFee) {
                me.value.mvFeeRate = me.store.stockInfoBean.mvTemporaryFee;
            } else {
                me.store.stockInfoBean.mvTemporaryFee = Utils.numUnFormat(me.value.mvFeeRate);
            }

            // me.updateMarginPower()

            me.calculateGrossAmt()
            me.calBuySellAll()

        })
    }

    calculateGrossAmt() {
        // get mvPrice from Form     
        var stockInfoBean = this.store.stockInfoBean
        if (!stockInfoBean)
            return;

        var price = this.mvPrice.getValue()
        var orderType = this.value.mvOrderType
        var bsValue = this.value.mvBS.slice(0, 1)
        //console.log(orderType, bsValue, this.mvVol.getValue(), price)
        if (orderType == "O" || orderType == "C" || orderType == "M" ||
            orderType == "B" || orderType == "Z" || orderType == "R") 
        {
            if (bsValue === 'B') {
                price = (stockInfoBean.mvCeiling && stockInfoBean.mvCeiling.trim().length > 0) ?
                    stockInfoBean.mvCeiling : "0";
            } else {
                price = (stockInfoBean.mvFloor && stockInfoBean.mvFloor.trim().length > 0) ?
                    stockInfoBean.mvFloor : "0";
            }
        }

        // get mvVol from Form
        var volume = this.mvVol.getValue()
        var netFee = 0;

        if (this.state.mvFeeRate != '') {
            netFee = Utils.numUnFormat(this.state.mvFeeRate, ',')
        }

        if (volume === 0 || price === 0) {
            return false;
        }
        this.setValue({mvGrossAmt: Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang) })
        this.mvGrossAmt.value(Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang))
    }


    //---------------------------
    getOrderTypeList(genEnterOrderData) {
        var mvOrderTypeArray = new Array();
        var marketID = this.value.mvMarketID
        // console.log(marketID, genEnterOrderData)
        var mvEnableOrderTypeArray = genEnterOrderData.mvEnableOrderType;
        
        var ruleList = {
            "HO" : ["OTLO","OTATO","OTATC","OTMP"],
            "HA" : ["OTLO","OTMOK","OTMAK","OTMTL","OTLOddLot","OTATC"],
            "OTC" : ["OTLO","OTLOddLot"],
            "UNKNOWN": ["OTLO","OTATC","OTATO"]
            
        }

        if(ruleList[marketID] === undefined) {
            marketID = "UNKNOWN"
        }

        for (var i = 0; i < mvEnableOrderTypeArray.length; i++) {
            if (ruleList[marketID].includes(mvEnableOrderTypeArray[i])) {
                mvOrderTypeArray.push(
                    {
                        'label': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                        'value': this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                    }
                );
            }
        }
        // console.log(mvOrderTypeArray)
        if (mvOrderTypeArray.length > 0) {
            // update order type
            // checkif have default ordertype value
            let defaultOrderTypeSelected = mvOrderTypeArray[0]
            let tmp = mvOrderTypeArray.filter(e => e.value == this.value.mvOrderType)
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

            if (defaultOrderTypeSelected.value == this.props.language.enterorder.value.OTLO || 
                defaultOrderTypeSelected.value == this.props.language.enterorder.value.OTLOddLot) 
            {
                this.mvPrice.value("0")
                this.mvPrice.readonly(false)
            }
            else {
                this.mvPrice.value("")
                this.mvPrice.readonly(true)
            }

            this.forceUpdate()
        }
    }

    //-------------
    calBuySellAll() {
        /*
            - calculate max quanty
        */
        var stockInfoBean = this.store.stockInfoBean
        if (!stockInfoBean)
            return;

        
        this.setValue({mvMaxQty: 0})
        this.mvMaxQty.value(0)


        var marketID = this.value.mvMarketID
        var price = this.mvPrice.getValue()
        var orderType = this.value.mvOrderType
        var buysell = this.value.mvBS.slice(0, 1)
        // console.log("CAL BS", marketID, price, orderType, buysell)
        if (orderType === "O" || orderType === "C" || orderType === "M" ||
            orderType === "B" || orderType === "Z" || orderType === "R") {
            if (buysell.slice(0, 1) === 'B') {
                price = (stockInfoBean.mvCeiling && stockInfoBean.mvCeiling.trim().length > 0) ? stockInfoBean.mvCeiling : "0";
            } else {
                price = (stockInfoBean.mvFloor && stockInfoBean.mvFloor.trim().length > 0) ? stockInfoBean.mvFloor : "0";
            }
        }

        // calculate max quantity
        // but not sure
        if(buysell.slice(0, 1) === "B") {
            if (price != 0) {
                var marginPercentage = stockInfoBean.mvMarginPercentage;
                if (!marginPercentage || marginPercentage === "null")
                    marginPercentage = 0;
                var tmpBP = Utils.numUnFormat(stockInfoBean.mvBuyingPowerd);
                if (tmpBP < 0)
                    tmpBP = 0;
                var tmpVol = tmpBP / (price * 1.005 * (1 - marginPercentage / 100));
    
                if (marketID == 'HO') {
                    tmpVol = tmpVol / 10;
                } else {
                    tmpVol = tmpVol / 100;
                }
                var vol = parseInt(tmpVol) * (marketID == 'HO' ? 10 : 100);
                
                this.mvMaxQty.value(vol)
                this.setValue({mvMaxQty: vol})
            }
        } else {
            this.getStockBalance()
        }
    }

    //----------------
    updateMarginPower() {
        // if (this.store.stockInfoBean !== null) {
        //     var marginPercentage = Utils.numUnFormat(this.store.stockInfoBean.mvMarginPercentage);
        //     var buyingPowerd = 0;

        //     if (this.state.value.mvSettlementAccSelected !== null) {
        //         marginPercentage = 0;
        //         buyingPowerd = this.state.value.mvSettlementAccSelected.mvBalance
        //     } 
        //     else {
        //         if (!marginPercentage || marginPercentage === "null") {
        //             marginPercentage = 0;
        //         }
        //         buyingPowerd = Utils.numUnFormat(this.store.stockInfoBean.mvBuyingPowerd);
        //     }
        //     if (buyingPowerd < 0) {
        //         buyingPowerd = 0;
        //     }
        //     var buyingPowerExpected = buyingPowerd / (1 - marginPercentage / 100);
        //     this.state.value.mvBuyPower = (Utils.currencyShowFormatter(buyingPowerExpected.toFixed(3), ",", this.lang));
        //     this.state.value.mvLending = (Utils.quantityShowFormatter(marginPercentage, ",", this.lang));

        //     this.mvLending.value = (Utils.quantityShowFormatter(marginPercentage, ",", this.lang) + "%");
        //     this.mvBuyPower.value = (Utils.currencyShowFormatter(buyingPowerExpected.toFixed(3), ",", this.lang));
        // }

    }

    //----------------
    getStockBalance() {
        // when user choose SELL
        // calculate max quantity user can SELL
        var stockCode = this.value.mvStockCode
        var marketID = this.value.mvMarketID
        if(!stockCode || !marketID)
            return

        var me = this

        var params = {
            "key": (new Date()).getTime(),
            "mvEnableGetStockInfo": "N",
            "mvAction": "SB"
        }

        api.fetch(ACTION.STOCKINFO, params, 'GET', function (response) {
            var data = response.mvStockBalanceInfo;
            var len = data.length;
            var vol = 0;
           
            var stockInfo = data.filter(el => el.mvStockCode === stockCode)
            if (stockInfo.length > 0) {
                vol = stockInfo[0].mvTradableQty;
                vol = marketID === 'HO' ? parseInt(vol / 10) * 10 : parseInt(vol / 100) * 100;
            }
            
            // update max quantity
            me.mvMaxQty.value(vol)
            me.setValue({mvMaxQty: vol})
           
        })
    }

    //----------------
    checkTimeOrder(marketID, orderType, expiryChecked, successHandler, failHandler) {
        if (expiryChecked) {
            successHandler()
            return
        }

        var me = this
        this.getMarketStatus(marketID,
            function (response) {
                var t = response.mvMarketStatus;
                var enableEnterTime = response.canEnterOrder
                var language = me.props.language
                var errorMsg = ''
                if (marketID == 'HO') {
                    if ((t != "T1" && t != "T2" && t != "T3") && (enableEnterTime != "true")) {
                        errorMsg = language.messagebox.message.marketClose_HO
                    } else {
                        if (orderType == "O" && (t == "T2" || t == "T3")) {
                            errorMsg = language.messagebox.message.invalidTime_ATO
                        }

                    }


                } else {
                    if (t == null || t == "13") {
                        if (marketID == 'HA') {
                            errorMsg = language.messagebox.message.marketClose_HNX
                        } else
                            if (marketID == 'OTC') {
                                errorMsg = language.messagebox.message.marketClose_UPCOM
                            }
                    }
                }
                if (errorMsg !== '') {
                    me.props.onShowMessageBox(language.messagebox.title.error, errorMsg)
                    failHandler()
                    return
                }

                successHandler()

            }, failHandler
        )
    }

    //-------------
    getMarketStatus(marketID, successHandler, failHandler) {
        var param = {
            "mvMarketID": marketID,
            "key": new Date().getTime()
        }
        api.fetch(ACTION.QUERYMARKETSTATUSINFO, param, 'POST', successHandler, failHandler)
    }

    //-------------
    getSymbolInfo(stockCode, marketID, bs, enableGetStockInfo, actionStockInfo, successHandler, failHandler) {

        var param = {
            "mvInstrument": stockCode,
            "mvMarketId": marketID,
            "mvBS": bs,
            "key": new Date().getTime(),
            "mvEnableGetStockInfo": enableGetStockInfo,
            "mvAction": actionStockInfo
        }
        api.fetch(ACTION.STOCKINFO, param, 'POST', successHandler, failHandler);
    }

    //-------------
    checkOrderBalanceStatus(settleAcc, bs, stockCode, mvMarketID, price, pQty, temporaryFee, successHandler, failHandler) {
        
        var p = parseFloat(price);
        var qty = parseFloat(pQty);
        var buyVol = qty * p;
        var language = this.props.language
        var me = this
        console.log('checkOrderBalanceStatus', settleAcc, p, qty, buyVol)
        // check buying power when user buy CK
        if (bs == 'B') {
            // If bank account
            if (settleAcc != null) {

                var buyingPowerd = parseFloat(settleAcc.mvBalance);
                var temporaryFeeAmount = buyVol * temporaryFee / 100;
                if (buyingPowerd + temporaryFeeAmount < buyVol) {

                    this.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.lakeCash)

                    failHandler();
                } else {
                    successHandler();
                }
            } else {
                // If has no bank
                var mvActionStockInfo = "BP";
                var mvEnableGetStockInfo = "N";
                this.getSymbolInfo(stockCode, mvMarketID, bs, mvEnableGetStockInfo, mvActionStockInfo,
                    function (json) { //success
                        var buyingPower1 = parseFloat(Utils.numUnFormat(json.mvStockInfoBean.mvBuyingPowerd));
                        var marPer = json.mvStockInfoBean.mvMarginPercentage;
                        var nominal = json.mvStockInfoBean.mvNomial;
                        if (marPer && marPer != "null") {
                            marPer = parseFloat(Utils.numUnFormat(marPer));
                        } else {
                            marPer = 0;
                        }
                        if (nominal && nominal != "null") {
                            nominal = parseFloat(Utils.numUnFormat(nominal));
                            if (nominal == 0) {
                                nominal = p;
                            }
                        } else {
                            nominal = p;
                        }

                        var temporaryFeeAmount = buyVol * temporaryFee / 100;
                        if (buyingPower1 + qty * nominal * marPer / 100 + temporaryFeeAmount < buyVol) {
                            me.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.lakeCash)
                            failHandler();
                        } else {
                            successHandler();
                        }
                    },
                    function (err) {
                        console.log(err)
                        failHandler()
                    }
                )
            }
        }
        else
            if (bs == 'S') {
                var mvActionStockInfo = "SI";
                var mvEnableGetStockInfo = "N";
                this.getSymbolInfo(stockCode, mvMarketID, bs, mvEnableGetStockInfo, mvActionStockInfo,
                    function (json) { // success

                        var usableStock1 = parseFloat(Utils.numUnFormat(json.mvStockInfoBean.mvUsable));
                        if (qty > usableStock1) {
                            me.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.lakeStock)
                            failHandler();
                        } else {
                            successHandler();
                        }
                    },
                    failHandler
                )
            }

    }

    //------------
    showOrderConfirm() {
        var value = this.value
        var state = this.state
        var data = {
            mvStockCode: value.mvStockCode,
            mvStockName: value.mvStockName,
            mvPrice: value.mvPrice,
            mvVolume: value.mvVol,
            mvOrderType: value.mvOrderType,
            mvGrossAmt: value.mvGrossAmt,
            mvExpireDate: moment(value.mvExpireDate).format(Contants.dateFormat),
            mvExpireChecked: value.mvExpireChecked,
            mvNetFee: value.mvNetFee,
            mvLending: value.mvLending,
            mvBuyPower: value.mvBuyPower,
            mvMarketID: value.mvMarketID,
            mvBankACID: value.mvBankACID,
            mvBankID: value.mvBankID,
            mvBS: value.mvBS.slice(0, 1),
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
    onShowMessageBox: (type, message) => {
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