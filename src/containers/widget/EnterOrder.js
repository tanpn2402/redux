import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'
import moment from 'moment'
import config from '../../core/config'
import { PowerSelect } from 'react-power-select'
import 'react-power-select/dist/react-power-select.css'
import * as api from '../../api/web_service_api'
import * as ACTION from '../../api/action_name'
import CalendarPicker from '../commons/CalendarPicker'
import {TabControl, TabItem} from "../commons/TabControl"
import Select from "../commons/Select"
import Input from "../commons/Input"
const { Contants } = require('../../core/constants')
var DatePicker = require("react-bootstrap-date-picker")


const StockViewOption = ({ option }) =>
    <div style={{ maxWidth: '100%' }}>
        <span>{option.stockCode}</span>
        <small style={{ paddingLeft: '5px' }}> - {option.stockName}</small>
    </div>

class EnterOrderForm extends React.Component {
    constructor(props) {
        super(props)
        this.lang = "vi_VN"
        this.id = "enterorder-a"
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
            mvOrderTypeSelected: {
                label: ""
            },
            


            // other paras support for view
            stockList: this.props.stockList,
            mvOrderTypeList: [],
            mvBSList: ["BUY", "SELL"],
        }

        this.store = {
            stockInfoBean: null,
            stockBalanceInfo: null,
        }
    }

    handleBSChange(options) {
        this.setState({ mvBS: options })
    }

    handleMarketChange(options) {
        this.setState({ 
            mvMarketID: options,
        })
        
    }

    handleStockChange(options) {
        this.refStockName.value = options.stockName
        this.state.mvStockSelected = options

        var me = this
        var marketID = options.mvMarketID
        this.state.mvMarketID = marketID
        var stockCode = options.stockCode
        var bsValue = this.state.mvBS.slice(0, 1)

        var showBP = true;
        var mvEnableGetStockInfo = "N";
        var mvActionStockInfo = "OI";   //OI = Order Info
        if (showBP && bsValue === 'B') {
            mvActionStockInfo += ",BP";
        }
        if (this.state.mvFeeRate === '') {
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

        
        var callback = function (response) {
            me.store.stockInfoBean = response.mvStockInfoBean;
            me.store.stockBalanceInfo = response.mvStockBalanceInfo;

            if (me.store.stockInfoBean.mvTemporaryFee) {
                me.state.mvFeeRate = me.store.stockInfoBean.mvTemporaryFee;
            } else {
                me.store.stockInfoBean.mvTemporaryFee = Utils.numUnFormat(me.state.mvFeeRate);
            }

            // me.updateMarginPower()

        }

        api.fetch(ACTION.STOCKINFO, params, 'POST', callback)

        var mvOrderTypeArray = new Array();
        var mvEnableOrderTypeArray = this.props.genEnterOrderData.mvEnableOrderType;
        if (marketID == "HO") {
            for (var i = 0; i < mvEnableOrderTypeArray.length; i++) {
                if (mvEnableOrderTypeArray[i] == "OTLO"
                    || mvEnableOrderTypeArray[i] == "OTATO"
                    || mvEnableOrderTypeArray[i] == "OTATC"
                    || mvEnableOrderTypeArray[i] == "OTMP") {
                    mvOrderTypeArray.push(
                        {
                            'label': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value': this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );
                }
            }
        } else if (marketID == "HA") {
            for (var i = 0; i < mvEnableOrderTypeArray.length; i++) {
                if (mvEnableOrderTypeArray[i] == "OTLO"
                    || mvEnableOrderTypeArray[i] == "OTMOK"
                    || mvEnableOrderTypeArray[i] == "OTMAK"
                    || mvEnableOrderTypeArray[i] == "OTMTL"
                    || mvEnableOrderTypeArray[i] == "OTATC"
                    || mvEnableOrderTypeArray[i] == "OTLOddLot") {
                    mvOrderTypeArray.push(
                        {
                            'label': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value': this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );
                }
            }
        } else if (marketID == "OTC") {
            for (var i = 0; i < mvEnableOrderTypeArray.length; i++) {
                if (mvEnableOrderTypeArray[i] == "OTLO" || mvEnableOrderTypeArray[i] == "OTLOddLot") {
                    mvOrderTypeArray.push(
                        {
                            'label': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value': this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );
                }
            }
        } else {
            for (var i = 0; i < mvEnableOrderTypeArray.length; i++) {
                if (mvEnableOrderTypeArray[i] != "OTLO" &&
                    mvEnableOrderTypeArray[i] != "OTATO" &&
                    mvEnableOrderTypeArray[i] != "OTATC"
                ) {
                    mvOrderTypeArray.push(
                        {
                            'label': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value': this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );
                }
            }
        }

        if (mvOrderTypeArray.length > 0) {
            // update order type
            this.setState({
                mvOrderTypeList: mvOrderTypeArray,
                mvOrderType: mvOrderTypeArray[0].value,
                mvOrderTypeSelected: mvOrderTypeArray[0]
            });

            // calculate gross amount
            // this.calculateGrossAmt();
        }

    }

    handleMarketChangea(options) {
        console.log("asds")
    }

    handleOrderTypeChange(options) {
        this.setState({ 
            mvOrderTypeSelected: options,
            mvOrderType: options.value
        })
    }

    onQtyChange(value) {
        this.calculateGrossAmt()
    }
    
    onPriceChange(value) {
        this.calculateGrossAmt()
        
    }

    render() {
        this.stockList = config.cache.stockList.filter(e => e.mvMarketID == this.state.mvMarketID)
        console.log(this.state.mvOrderTypeList)
        return (
            <div style={{ width: "100%", height: "100%" }} id={this.id} className={"enterorder-a " + this.state.mvBS.toLowerCase()}>
                <div className="enterorder-form buy">
                    <div>
                        {/* MARKET */}
                        <Col xs={3}>
                            <Select
                                options={config.marketid}
                                selected={this.state.mvMarketID}
                                handleChange={this.handleMarketChange.bind(this)}
                            />
                        </Col>
                        {/* ORDER TYPE */}
                        <Col xs={6}> 
                            <Select
                                options={this.state.mvOrderTypeList}
                                selected={this.state.mvOrderTypeSelected}
                                optionLabelPath={"label"}
                                handleChange={this.handleOrderTypeChange.bind(this)}
                            />
                        </Col>
                        {/* B/S */}
                        <Col xs={3}>
                            <Select
                                options={this.state.mvBSList}
                                selected={this.state.mvBS}
                                handleChange={this.handleBSChange.bind(this)}
                            />

                        </Col>
                    </div>

                    <div>
                        <div className="-label col-xs-4" style={{ lineHeight: "2.2" }}>
                            Stock Code
                        </div>
                        <div className="col-xs-8">
                            <Col xs={5}>
                                <Select
                                options={this.stockList}
                                selected={this.state.mvStockSelected}
                                optionLabelPath={'stockCode'}
                                handleChange={this.handleStockChange.bind(this)}
                                searchEnabled={true}
                            />

                            </Col>
                            <Col xs={7}>
                                <Input type="text" setRef={ref => this.refStockName =  ref} readOnly/>
                            </Col>
                        </div>

                    </div>


                    <div>
                        <div className="-label col-xs-4" style={{ lineHeight: "2.2" }}>
                            Quantity
                        </div>
                        <div className="col-xs-8">
                            
                            <Input type="number" setRef={ref => this.mvVol =  ref} step={100}
                                onChange={this.onQtyChange.bind(this)}/>
                            
                        </div>
                    </div>

                    <div>
                        <div className="-label col-xs-4" style={{ lineHeight: "2.2" }}>
                            Price
                        </div>
                        <div className="col-xs-8">
                        
                            <Input type="number" setRef={ref => this.mvPrice =  ref} step={100}
                                onChange={this.onPriceChange.bind(this)}/>
                            
                        </div>
                    </div>
                </div>


                <div className="-total" >
                    <div style={{ display: "inline" }}>
                        Consult sum of money
                    </div>

                    <div style={{ float: "right", paddingRight: "3px" }}>
                        <input style={{border: "none", backgroundColor: "transparent", textAlign: "right", width: "100%" }} 
                            ref={ref => this.mvGrossAmt = ref} readOnly value={this.state.mvGrossAmt}/>
                    </div>
                </div>


                <div className="-other" >
                    <div style={{ display: "inline" }}>
                        Maximum quantity
                    </div>

                    <div style={{ color: "#ca3435", display: "inline", marginLeft: "5px", float: "right" }}>
                        <input style={{border: "none", backgroundColor: "transparent", textAlign: "left", width: "100%" }} 
                            ref={ref => this.abc = ref} readOnly value={0} />
                    </div>
                </div>

                <div className="group-btn-action form-submit-action">
                    <span>
                        <button type="reset" className="hks-btn btn-cancel"
                            onClick={this.handleResetForm.bind(this)}>
                            {this.props.language.button.reset}
                        </button>
                        <button type="submit" className="hks-btn btn-submit"
                            onClick={this.handleSubmit.bind(this)}>
                            {this.state.mvBS}
                        </button>
                    </span>
                </div>
            </div>


            
        )
    }

    handleSubmit() {
        this.props.onShowMessageBox(this.props.language.messagebox.title.info,
            "Maintainning!")
    }

    handleResetForm() {

    }


    //--------------------------------------
    calculateGrossAmt() {
        // get mvPrice from Form     
        var price = this.mvPrice.value;
        var orderType = this.state.mvOrderType
        var stockInfoBean = this.store.stockInfoBean
        var bsValue = this.state.mvBS.slice(0, 1)
        //console.log(orderType)
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

        // this.calBuySellAll()

        // get mvVol from Form
        var volume = this.mvVol.value;
        var netFee = 0;

        if (this.state.mvFeeRate != '') {
            netFee = Utils.numUnFormat(this.state.mvFeeRate, ',');
        }

        if (volume === 0 || price === 0) {
            return false;
        }
        this.state.mvGrossAmt = Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang)
        this.mvGrossAmt.value = Utils.currencyShowFormatter((price * volume).toFixed(4), ",", this.lang)
    }
}


class EnterOrder extends React.Component {
    constructor(props) {
        super(props)
        this.id = "enterorder"
        this.state = {
            activeKey: 1,
        }
    }
    render() {
        console.log(this.props)
        return (
            <div style={{ height: "100%", position: "relative" }} id={this.id}>
                <Title language={this.props.language} theme={this.props.theme} widgetID={this.id}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)}>
                        <TabItem eventKey={1} title="Normal" >
                            <EnterOrderForm {...this.props}/>
                        </TabItem>

                        <TabItem eventKey={2} title="Auction">
                            Developing...
                        </TabItem>
                        <TabItem eventKey={3} title="Special" disabled>
                            Developing...
                        </TabItem>
                    </TabControl>
                </Body>
            </div>


            
        )
    }

    onTabChange(key) {
        this.setState({activeKey: key})
    }

    componentDidMount() {
        this.props.genEnterOrder()
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.enterOrder.account,
        mvStockInfo: state.enterOrder.stockInfo,
        mvStockBalance: state.enterOrder.stockBalance,
        isError: state.enterOrder.isError,

        genEnterOrderData: state.enterOrder.genEnterOrder
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrder)