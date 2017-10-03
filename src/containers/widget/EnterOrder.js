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

import * as api from '../../api/web_service_api'
import * as ACTION from '../../api/action_name'

const {Contants} = require('../../core/constants')
var DatePicker = require("react-bootstrap-date-picker")
class EnterOrder extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.state = {
            value: {
                mvBS: 'BO',
                mvOrderType: '',
                mvStockName: '',
                mvPrice: '0',
                mvVol: '0',
                mvFeeRate: '',
                mvOrderTypeList: [],
                mvBankID: '',
                mvBankACID: '',
                mvNetFee: '0',
                mvLending: '0',
                mvBuyPower: '0',
                mvSettleAccList: [],
                mvSettlementAccSelected: null,
                mvStockSelected : null,
                mvExpireChecked: false,
                mvExpireDate: new Date().toISOString()
            }
        }

        this.store = {
            stockInfoBean: null,
            stockBalanceInfo: null,
        }


        this.id = 'enterorder'
    }

    onBuySellChange(e){
        this.setState({ value : Object.assign(this.state.value, { mvBS: e.target.value }) })
        this.onChangeBackground();
        this.calBuySellAll()
        
    }

    calBuySellAll(){
        var stockInfoBean = this.store.stockInfoBean
        if (!stockInfoBean) 
            return;


        var marketID = this.state.value.mvStockSelected.mvMarketID;
        var price = this.mvPrice.value;
        var orderType = this.state.value.mvOrderType;
        var buysell = this.state.value.mvBS

        if (orderType === "O" || orderType === "C" || orderType === "M" || 
            orderType === "B" || orderType === "Z" || orderType === "R") 
        {
            if(buysell.slice(0,1) === 'B' ){
                price  = (stockInfoBean.mvCeiling && stockInfoBean.mvCeiling.trim().length > 0) ? stockInfoBean.mvCeiling : "0";
            } else {
                price = (stockInfoBean.mvFloor && stockInfoBean.mvFloor.trim().length > 0) ? stockInfoBean.mvFloor : "0";
            }
        }
        
        if(buysell === 'BA'){
            if (price != 0){

                var marginPercentage = stockInfoBean.mvMarginPercentage;
                if (!marginPercentage || marginPercentage === "null")
                    marginPercentage = 0;
                var tmpBP = Utils.numUnFormat(stockInfoBean.mvBuyingPowerd);
                if (tmpBP < 0) 
                    tmpBP = 0;
                var tmpVol = tmpBP / (price * 1.005 * (1 - marginPercentage/100));
                if (marketID == 'HO'){
                    tmpVol = tmpVol/10;
                } else {
                    tmpVol = tmpVol/100;
                }
                var vol = parseInt(tmpVol)*(marketID == 'HO' ? 10 : 100);
                this.state.value.mvVol = vol;

                // update vol input value
                console.log(vol)
                this.mvVol.value = vol;
                //this.calculateGrossAmt()

            }
        }else if(buysell === 'SA'){
            if(this.state.value.mvStockSelected !== null){
                this.getStockBalance()
            }
        }
    }

    getStockBalance(){
        var stockSelected = this.state.value.mvStockSelected
        var volComponent = this.mvVol
        var value = this.state.value
        var me = this

        var callback = function(response){
            var data = response.mvStockBalanceInfo;
            var len = data.length;
            var vol = 0;
            var stockCode = stockSelected.stockCode
            var marketID = stockSelected.mvMarketID
            
            var stockInfo = data.filter(el => el.mvStockCode === stockCode)
            if(stockInfo.length > 0){
                vol = stockInfo[0].mvTradableQty;
                vol = marketID === 'HO' ? parseInt(vol/10)*10 : parseInt(vol/100)*100;
            }
            //console.log(data)
            volComponent.value = vol;
            value.mvVol = vol;
            //me.calculateGrossAmt()
        }
        var params = {
            "key" : (new Date()).getTime(),
            "mvEnableGetStockInfo": "N",
            "mvAction": "SB"
        }

        api.fetch(ACTION.STOCKINFO, params, 'GET', callback)
    }

    calculateGrossAmt(){
        // get mvPrice from Form     
        var price = this.mvPrice.value;
        var orderType = this.state.value.mvOrderType
        var stockInfoBean = this.store.stockInfoBean
        //console.log(orderType)
        if (orderType == "O" || orderType == "C" || orderType == "M" || 
            orderType == "B" || orderType == "Z" || orderType == "R") 
        {
            if(this.state.value.mvBS.slice(0,1) === 'B'){
                price  = (stockInfoBean.mvCeiling && stockInfoBean.mvCeiling.trim().length > 0) ? 
                    stockInfoBean.mvCeiling : "0";
            } else {
                price = (stockInfoBean.mvFloor && stockInfoBean.mvFloor.trim().length > 0) ? 
                    stockInfoBean.mvFloor : "0";
            }
        }

        this.calBuySellAll()

        // get mvVol from Form
        var volume = this.mvVol.value;
        var netFee = 0;

        if (this.state.value.mvFeeRate != ''){
            netFee = Utils.numUnFormat(this.state.value.mvFeeRate, ',');
        }
        
        if(volume === 0 || price === 0 ){
            return false;
        }
        this.state.value.mvGrossAmt = Utils.currencyShowFormatter((price*volume).toFixed(4), ",", this.lang)
        this.state.value.mvNetFee = Utils.currencyShowFormatter((price*volume*netFee/100).toFixed(2), ",", this.lang);

        this.mvGrossAmt.value = Utils.currencyShowFormatter((price*volume).toFixed(4), ",", this.lang);
        this.mvNetFee.value = Utils.currencyShowFormatter((price*volume*netFee/100).toFixed(2), ",", this.lang);
    }

    onChangeBackground(){
        var dom = document.getElementById('form-group-enterorder')
        if(this.state.value.mvBS.slice(0,1) === 'S'){
            if(dom.classList.contains('sell')){
                dom.classList.remove('sell')
            }
        }else{
            if(!dom.classList.contains('sell')){
                dom.classList.add('sell')
            }
        }
        document.getElementById('form-group-enterorder').classList.toggle('sell')
    }

    updateMarginPower(){

        if(this.store.stockInfoBean !== null){
            var marginPercentage = Utils.numUnFormat(this.store.stockInfoBean.mvMarginPercentage);
            var buyingPowerd = 0;

            if (this.state.value.mvSettlementAccSelected !== null) {
                marginPercentage = 0;       
                buyingPowerd = this.state.value.mvSettlementAccSelected.mvBalance
            } else {
                if (!marginPercentage || marginPercentage === "null") {
                    marginPercentage = 0;
                }
                buyingPowerd = Utils.numUnFormat(this.store.stockInfoBean.mvBuyingPowerd);
            }
            if (buyingPowerd < 0) {
                buyingPowerd = 0;
            }
            var buyingPowerExpected = buyingPowerd / (1 - marginPercentage / 100);
            this.state.value.mvBuyPower = (Utils.currencyShowFormatter(buyingPowerExpected.toFixed(3), ",", this.lang));
            this.state.value.mvLending = (Utils.quantityShowFormatter(marginPercentage, ",", this.lang));

            this.mvLending.value = (Utils.quantityShowFormatter(marginPercentage, ",", this.lang)+ "%");
            this.mvBuyPower.value = (Utils.currencyShowFormatter(buyingPowerExpected.toFixed(3), ",", this.lang));
        }

    }

    handleStockChange(pvStockInfo){

        this.state.value.mvStockSelected = pvStockInfo
        var marketID = pvStockInfo.mvMarketID
        var stockCode = pvStockInfo.stockCode

        var showBP = true;
        var mvEnableGetStockInfo="N";
        var mvActionStockInfo = "OI";   //OI = Order Info
        if (showBP && this.state.value.mvBS.slice(0,1) === 'B'){
            mvActionStockInfo += ",BP";
        }
        if (this.state.value.mvFeeRate === ''){
            mvActionStockInfo += ",FE";
        }
        
        var params = {
            mvInstrument: stockCode,
            mvMarketId: marketID,
            mvBS: this.state.value.mvBS.slice(0,1),
            mvEnableGetStockInfo: mvEnableGetStockInfo,
            mvAction: mvActionStockInfo,
            key: (new Date()).getTime()
        }

        var me = this
        var callback = function(response){
            
            me.store.stockInfoBean = response.mvStockInfoBean;
            me.store.stockBalanceInfo = response.mvStockBalanceInfo;

            if (me.store.stockInfoBean.mvTemporaryFee){
                me.state.value.mvFeeRate = me.store.stockInfoBean.mvTemporaryFee;
            } else {
                me.store.stockInfoBean.mvTemporaryFee = Utils.numUnFormat(me.state.value.mvFeeRate);
            }

            me.updateMarginPower()
            
        }

        api.fetch(ACTION.STOCKINFO, params, 'POST', callback)
        
        var mvOrderTypeArray = new Array();
        var mvEnableOrderTypeArray = this.props.genEnterOrderData.mvEnableOrderType;
        if(marketID == "HO"){
            for(var i=0; i<mvEnableOrderTypeArray.length; i++){
                if(mvEnableOrderTypeArray[i]=="OTLO" 
                    || mvEnableOrderTypeArray[i]=="OTATO" 
                    || mvEnableOrderTypeArray[i]=="OTATC" 
                    || mvEnableOrderTypeArray[i]=="OTMP"){             
                    mvOrderTypeArray.push(
                        {
                            'name': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value':  this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );                      
                }
            }
        }else if(marketID == "HA" ){
            for(var i=0; i<mvEnableOrderTypeArray.length; i++){
                if(mvEnableOrderTypeArray[i]=="OTLO" 
                    || mvEnableOrderTypeArray[i]=="OTMOK" 
                    || mvEnableOrderTypeArray[i]=="OTMAK" 
                    || mvEnableOrderTypeArray[i]=="OTMTL"
                    || mvEnableOrderTypeArray[i]=="OTATC"
                    || mvEnableOrderTypeArray[i]=="OTLOddLot"){             
                    mvOrderTypeArray.push(
                        {
                            'name': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value':  this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );
                }
            }
        }else if(marketID == "OTC"){
            for(var i=0; i<mvEnableOrderTypeArray.length; i++){
                if(mvEnableOrderTypeArray[i]=="OTLO" || mvEnableOrderTypeArray[i]=="OTLOddLot"){                
                    mvOrderTypeArray.push(
                        {
                            'name': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value':  this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );
                }
            }
        }else{
            for(var i=0; i<mvEnableOrderTypeArray.length; i++){
                if(mvEnableOrderTypeArray[i] !="OTLO" &&
                    mvEnableOrderTypeArray[i]!="OTATO" && 
                    mvEnableOrderTypeArray[i]!="OTATC"
                ){              
                    mvOrderTypeArray.push(
                        {
                            'name': this.props.language.enterorder.data[mvEnableOrderTypeArray[i]],
                            'value':  this.props.language.enterorder.value[mvEnableOrderTypeArray[i]]
                        }
                    );
                }
            }
        }
        
        var defaultValue = mvOrderTypeArray[0]['value'];

        this.state.value.mvOrderType = defaultValue
        // update order type
        this.setState({value: Object.assign(this.state.value, {mvOrderTypeList: mvOrderTypeArray} )});

        // calculate gross amount
        this.calculateGrossAmt(); 
    }

    handleStockOnBlur(stockInfo){
        if(stockInfo.stockCode === undefined){
            this.state.value.mvStockSelected = null
            if(stockInfo !== '')
                this.props.onShowMessageBox(this.props.language.messagebox.title.error, 
                    stockInfo + this.props.language.messagebox.message.stockNotExist)
        }
        else{

        }
    }

    handleBankAccChange(e){
        var bankID = e.target.id
        var tmp = this.state.value.mvSettleAccList.filter(el => el.settleAccValue === bankID);
        if(tmp.length > 0){
            this.state.value.mvSettlementAccSelected = tmp[0]
            this.state.value.mvBankID = tmp[0].mvBankID;
            this.state.value.mvBankACID = tmp[0].mvBankACID;

            this.updateMarginPower();
        }
    }

    initBankAccountCombo(mvSettlementAccList){
        var mvSettleAccArray = new Array();
        var defaultBankValue = "";
        for (var i = 0; i < mvSettlementAccList.length; i++) {
            if (mvSettlementAccList[i].mvBankACID !== "") {
                mvSettleAccArray.push(
                    {
                        'settleAccName': mvSettlementAccList[i].mvSettlementAccountDisplayName,
                        'settleAccValue': mvSettlementAccList[i].mvSettlementAccountValue,
                        'mvBankID': mvSettlementAccList[i].mvBankID,
                        'mvBankACID': mvSettlementAccList[i].mvBankACID,
                        'mvBalance': mvSettlementAccList[i].mvBalance
                    }
                );
            }
            if(defaultBankValue === "" && mvSettlementAccList[i].mvBankACID !== ""){
                defaultBankValue = mvSettlementAccList[i].mvSettlementAccountValue;
            }
        }
        if (defaultBankValue !== ""){
            
            // update bank account combo box
            this.setState({value: Object.assign(this.state.value, {mvSettleAccList: mvSettleAccArray} )});

            // default value
            this.state.value.mvBankID = mvSettleAccArray[0].mvBankID;
            this.state.value.mvBankACID = mvSettleAccArray[0].mvBankACID;
            this.state.value.mvSettlementAccSelected = mvSettleAccArray[0];
        } else { 
            // hide if no bank     
            this.bankRow.style.display = 'none'

        }
    }

    handleOrderType(e){
        var type = e.target.value
        this.state.value.mvOrderType = type

        this.calculateGrossAmt();
        this.mvPrice.readOnly = false

        ////console.log(type)

        if(type === this.props.language.enterorder.value.OTLO || type === this.props.language.enterorder.value.OTLOddLot){
            this.mvPrice.readOnly = false
        }else{
            this.mvPrice.value = ''
            this.mvPrice.readOnly = true
        }
    }

    handleVolChange(e){
        this.calculateGrossAmt();
    }   

    handlePriceChange(e){
        this.calculateGrossAmt();
    }

    handleDateExpireCheck(e){
        this.setState({value: Object.assign(this.state.value, {mvExpireChecked: e.target.checked} )});
    }

    handleDateExpireChange(value){
        //var date = moment(value).format("DD/MM/YYYY")
        //console.log(date)
        this.setState({value: Object.assign(this.state.value, {mvExpireDate: value} )})
    }

    showOrderConfirm(){
        console.log(this.state.value.mvStockSelected)
        var data = {
            mvStockCode: this.state.value.mvStockSelected.stockCode,
            mvStockName: this.state.value.mvStockSelected.stockName,
            mvPrice: this.mvPrice.value,
            mvVolume: this.mvVol.value,
            mvOrderType: this.mvOrderType.value,
            mvGrossAmt: this.mvGrossAmt.value,
            mvExpireDate: moment(this.state.value.mvExpireDate).format(Contants.dateFormat),
            mvExpireChecked: this.state.value.mvExpireChecked,
            mvNetFee: this.mvNetFee.value,
            mvLending: this.mvLending.value,
            mvBuyPower: this.mvBuyPower.value,
            mvMarketID: this.state.value.mvStockSelected.mvMarketID,
            mvBankACID: this.state.value.mvBankACID,
            mvBankID: this.state.value.mvBankID,
            mvBS: this.state.value.mvBS.slice(0,1),
            language: this.props.language
        }
        this.props.showOrderConfirm({
            data: data,
            title: this.props.language.enterorder.popup.title.replace('{0}', this.state.value.mvBS.slice(0,1) === 'B' ? 
                    this.props.language.enterorder.header.buy : 
                    this.props.language.enterorder.header.sell),
            language: this.props.language,
            id: 'enterorderconfirm',
            authcard: true
        })
    }

    handleResetForm(e){
        this.setState({ value: Object.assign(this.state.value, {
                mvBS: 'BO',
                mvStockName: '',
                mvPrice: '0',
                mvVol: '0',
                mvFeeRate: '',
                mvNetFee: '0',
                mvLending: '0',
                mvBuyPower: '0',
                mvStockSelected : null,
                mvExpireChecked: false,
                mvExpireDate: new Date().toISOString()
            }) 
        })
        
        this.onChangeBackground()
    }

    componentWillReceiveProps(nextProps){
        this.initBankAccountCombo(nextProps.genEnterOrderData.mvSettlementAccList)
    }


    render() {
        var language = this.props.language.enterorder
        console.log(this.state.value)
        return (
            <div>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <Form id={"form-" + this.id} className="widget-form">
                        <div className="form-group " id="form-group-enterorder">
                            <Table responsive>
                                <tbody >
                                    <tr>
                                        <th>{language.header.buysell} </th>
                                        <td>
                                            <Radio name="radioGroup" inline defaultValue="BO" 
                                                checked={this.state.value.mvBS === "BO"} 
                                                onChange={this.onBuySellChange.bind(this)} required>
                                                    <div className="Radiobox">{language.header.buy}</div>
                                            </Radio>
                                            <Radio name="radioGroup" inline defaultValue="SO" 
                                                checked={this.state.value.mvBS === "SO"} 
                                                onChange={this.onBuySellChange.bind(this)}>
                                                    <div className="Radiobox">{language.header.sell}</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.buysellall}</th>
                                        <td>
                                            <Radio name="radioGroup" inline defaultValue="BA" 
                                                checked={this.state.value.mvBS === "BA"} 
                                                onChange={this.onBuySellChange.bind(this)}>
                                                    <div className="Radiobox">{language.header.buyAll}</div>
                                            </Radio>
                                            <Radio name="radioGroup" inline defaultValue="SA" 
                                                checked={this.state.value.mvBS === "SA"} 
                                                onChange={this.onBuySellChange.bind(this)}>
                                                    <div className="Radiobox">{language.header.sellAll}</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr style={{height: '23px'}}>
                                        <th>{language.header.stock}</th>
                                        <td style={{position: 'absolute', height: '23px', border: 'none', borderBottom: '1px solid #dcdcdc'}}>
                                            <InputSearch data={this.stockList} onChange={this.handleStockChange.bind(this)}
                                                onBlur={this.handleStockOnBlur.bind(this)}
                                                style={{padding: '0 4px', height: '20px'}}/>
                                        </td>
                                    </tr>
                                    <tr ref={e => this.bankRow = e}>
                                        <th>{language.header.bank}</th>
                                        <td>
                                            <select id="mvBank" className="hks-input no-border" ref={e => this.mvBankID = e} 
                                                onChange={this.handleBankAccChange.bind(this)}>
                                                {
                                                    this.state.value.mvSettleAccList.map(bank => {
                                                        return(
                                                            <option value={bank.settleAccValue}>{bank.settleAccName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.lending} </th>
                                        <td><input id="mvLending" className="hks-input no-border" readOnly
                                            value={this.state.value.mvLending + '%'} ref={e => this.mvLending = e}/> </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.buyingpower}</th>
                                        <td>
                                            <input id="mvBuyPower" className="hks-input no-border" readOnly 
                                                value={this.state.value.mvBuyPower} ref={e => this.mvBuyPower = e}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.ordertype}</th>
                                        <td>
                                            <select id="mvOrderType" className="hks-input no-border" style={{width: '100%', padding: '0'}}
                                                ref={e => this.mvOrderType = e}
                                                onChange={this.handleOrderType.bind(this)}>
                                                {
                                                    this.state.value.mvOrderTypeList.map(e => {
                                                        return (
                                                            <option value={e.value}>{e.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.volume}</th>
                                        <td>
                                            <input 
                                                id="mvVol"
                                                ref={e => this.mvVol = e}
                                                className="hks-input no-border" 
                                                type="number" name="volume" min="0" 
                                                onChange={this.handleVolChange.bind(this)} id="mvVolume" 
                                                placeholder="ex: 100" required 
                                                defaultValue={Utils.quantityShowFormatter(this.state.value.mvVol)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.price}</th>
                                        <td>
                                            
                                                <input 
                                                    id="mvPrice" ref={e => this.mvPrice = e}
                                                    className="hks-input no-border" type="number"
                                                    min="0" step="any" onChange={this.handlePriceChange.bind(this)} 
                                                    placeholder="ex: 10" required 
                                                    defaultValue={this.state.value.mvPrice}/>
                                     
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.value}</th>
                                        <td>
                                            <input id="mvGrossAmt"  className="hks-input no-border" readOnly
                                                ref={e => this.mvGrossAmt = e} value={this.state.value.mvGrossAmt} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.netfee}</th>
                                        <td>
                                            <input id="mvNetFee"  className="hks-input no-border" readOnly
                                                ref={e => this.mvNetFee = e} value={this.state.value.mvNetFee} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{language.header.expirydate}</th>
                                        <td>
                                            <Col xs={1}>
                                                <input name="isCheck" type="checkbox" 
                                                    checked={this.state.value.mvExpireChecked} 
                                                    onChange={this.handleDateExpireCheck.bind(this)} 
                                                    value={this.state.value.mvExpireChecked} />
                                            </Col>
                                            <Col xs={11}>
                                                <DatePicker id="mvStartDate" value={this.state.value.mvExpireDate} 
                                                    cellPadding={'1px'} 
                                                    dateFormat={Contants.dateFormat}
                                                    style={{width: '100px', height: '20px', marginLeft: '5px', border: '1px solid #dcdcdc'}}
                                                    disabled={!this.state.value.mvExpireChecked} 
                                                    showClearButton={false}
                                                    calendarPlacement ={'top'}
                                                    onChange={this.handleDateExpireChange.bind(this)} />
                                            </Col>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="reset" className="hks-btn btn-cancel"
                                        onClick={this.handleResetForm.bind(this)}>
                                        {this.props.language.button.cancel}
                                    </button>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit" 
                                        onClick={this.handleSubmit.bind(this)}>
                                        {this.props.language.button.submit}
                                    </button>
                                </span>
                            </div>

                        </div>
                        
                    </Form>
                </Body>
            </div>
        )

    }

    componentDidMount(){
        this.props.genEnterOrder()
    }

    handleDateChange(e){

    }

    handleSubmit(e){
        e.preventDefault()
        var value = this.state.value
        var store = this.store
        var language = this.props.language

        if(value.mvStockSelected === null){
            this.props.onShowMessageBox(language.messagebox.title.error, 
                language.messagebox.message.enterStockCode)

            return
        }

        if(!this.mvVol.value || this.mvVol.value === '' || parseInt(this.mvVol.value) === 0){
            this.props.onShowMessageBox(language.messagebox.title.note, 
                language.messagebox.message.enterQty)

            this.mvVol.focus()
            return
        }else{

            var lotSize = value.mvStockSelected.lotSize
            var orderType = this.mvOrderType.value
            var volume = this.mvVol.value
            console.log(orderType, volume)
            var errorMsg = ''
            if (volume % lotSize > 0 && orderType !== language.enterorder.value.OTLOddLot) {                                
                errorMsg = language.messagebox.message.invalidLotSize;
                errorMsg = errorMsg.replace("{0}", lotSize);
                
                this.props.onShowMessageBox(language.messagebox.title.error, errorMsg)

                this.mvVol.focus()
                return                                
            }
            else if (volume % lotSize > 0 && orderType === language.enterorder.value.OTLOddLot && volume >= lotSize)
            {
                errorMsg = language.messagebox.message.invalidLotSizeOddLot;
                errorMsg = errorMsg.replace("{0}", lotSize);

                this.props.onShowMessageBox(language.messagebox.title.error, errorMsg)


                this.mvVol.focus()
                return    
            }
        }

        if(!this.mvPrice.readOnly){
            var price = this.mvPrice.value
            if(!price || parseInt(price) === 0){
                this.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.enterPrice)
                this.mvPrice.focus()
                return
            }else if (price < 0) {
                this.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.priceNegative)
                this.mvPrice.focus()
                return
            }else{                             
                console.log(this.store.stockInfoBean, value)     
                var floor = parseFloat(this.store.stockInfoBean.mvFloor);
                var ceil = parseFloat(this.store.stockInfoBean.mvCeiling);
                if(!value.mvExpireChecked){
                    if( ceil != 0 && floor != 0 ){
                         if (price > ceil || price < floor) {
                            var errorMsg = language.messagebox.message.invaliedPriceOutRange;
                            errorMsg = errorMsg.replace('from_value', floor).replace('to_value', ceil);

                            this.props.onShowMessageBox(language.messagebox.title.error, errorMsg)

                            this.mvPrice.focus()
                            return
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
        console.log(value.mvStockSelected.mvMarketID, this.mvOrderType.value, value.mvExpireChecked)
                                
        this.checkTimeOrder( value.mvStockSelected.mvMarketID, this.mvOrderType.value, value.mvExpireChecked , 
            function(){
                var ceil =  store.stockInfoBean.mvCeiling;
                var floor = store.stockInfoBean.mvFloor;

                var bs = value.mvBS.slice(0,1)
                var priceValue = !me.mvPrice.readOnly ? me.mvPrice.value : ceil;
                var quantity = me.mvVol.value
                var netFee = 0;
                if (value.mvFeeRate !== ''){
                    netFee = Utils.numUnFormat(value.mvFeeRate, ',');
                }


                console.log('SUCCESS FIRST', ceil, floor, priceValue, quantity, netFee, value.mvSettlementAccSelected)


                me.checkOrderBalanceStatus( value.mvSettlementAccSelected, bs, value.mvStockSelected.stockCode, 
                    value.mvStockSelected.mvMarketID, priceValue, quantity, netFee, 
                    function(){
                            var param = {                                            
                                    mvBS: value.mvBS.slice(0,1),
                                    mvStockCode: value.mvStockSelected.stockCode,
                                    mvMarketID: value.mvStockSelected.mvMarketID,
                                    mvPrice: me.mvPrice.value,
                                    mvQuantity: me.mvVol.value,
                                    mvOrderTypeValue: me.mvOrderType.value,                                            
                                    mvGoodTillDate: moment(value.mvExpireDate).format(Contants.dateFormat),
                                    mvGrossAmt: value.mvGrossAmt,
                                    mvBankID: value.mvBankID,
                                    mvBankACID: value.mvBankACID,
                                }

                            console.log('SUCCESS SECOND', param)
                            api.fetch(ACTION.VERIFYORDER, param, 'POST',
                                function(result){//success

                                    try {
                                        if(result.mvResult=="SESSION_EXPIRED"){
                                            //sessionExpired();
                                            return ;
                                        }
                                        if(result.mvResult=="MULTI_USERS_LOGIN"){
                                            //multiUsersLogin();
                                            return ;
                                        }
                                        
                                        if(result.mvResult=="SYSTEM_MAINTENANCE"){
                                            //systemMaintenance();
                                            return ;
                                        }
                                        
                                        if(result.mvReturnCode == 30013 ){
                                            //Ext.Msg.alert(error.FAILED_TITLE, messageBox.message.disablePlaceOrderMarket +  action.result.mvResult );
                                            return;
                                        }
                                        
                                        me.showOrderConfirm()
                                    } 
                                    catch (e) {} 
                                    finally {}
                                    
                                },
                                function(json){//fail    
                                    api.fetch(ACTION.ENTERORDERFAIL,{key: ''+(new Date()).getTime()}, 'POST', function(result){
                                        if(result.mvResult=="SESSION_EXPIRED"){
                                            //sessionExpired();
                                            return ;
                                        }
                                        if(result.mvResult=="MULTI_USERS_LOGIN"){
                                            //multiUsersLogin();
                                            return ;
                                        }
                                        if(result.mvResult=="SYSTEM_MAINTENANCE"){
                                            //systemMaintenance();
                                            return ;
                                        }
                                    });
                                }
                            )                             
                                
                    },
                    function(){ // fail Handler
                        console.log('FAIL SECOND')

                    }
                )

            },
            function(){ // fail Handler
                console.log('FAIL FIRST')
            }
        )

    }

    checkTimeOrder(marketID, orderType, expiryChecked, successHandler, failHandler){
        if (expiryChecked){
            successHandler()
            return
        }

        var me = this
        this.getMarketStatus(marketID, 
            function(response){
                var t = response.mvMarketStatus;
                var enableEnterTime = response.canEnterOrder
                var language = me.props.language
                var errorMsg = ''
                if (marketID == 'HO') {
                    if ((t != "T1" && t != "T2" && t != "T3")  && (enableEnterTime != "true")) {
                            errorMsg = language.messagebox.message.marketClose_HO
                    }else {
                        if (orderType == "O" && (t == "T2" || t == "T3")) {
                            errorMsg = language.messagebox.message.invalidTime_ATO
                        }

                    }
                            
                            
                }else {
                    if (t == null || t =="13") {
                        if (marketID == 'HA') {
                            errorMsg = language.messagebox.message.marketClose_HNX
                        }else 
                            if (marketID == 'OTC') {
                                errorMsg = language.messagebox.message.marketClose_UPCOM
                            }                                                   
                    }
                }
                if(errorMsg !== ''){
                    me.props.onShowMessageBox(language.messagebox.title.error, errorMsg)
                    failHandler()
                    return
                }

                successHandler()

            }, failHandler
        )


    }


    getMarketStatus(marketID, successHandler, failHandler){
        var param = {
            "mvMarketID" : marketID,
            "key" : new Date().getTime()
        }
        api.fetch(ACTION.QUERYMARKETSTATUSINFO, param, 'POST', successHandler, failHandler )
    }

    getSymbolInfo(stockCode, marketID, bs, enableGetStockInfo, actionStockInfo, successHandler, failHandler){

        var param = {
            "mvInstrument" : stockCode,
            "mvMarketId" : marketID,
            "mvBS" : bs,
            "key" : new Date().getTime(),
            "mvEnableGetStockInfo": enableGetStockInfo,
            "mvAction": actionStockInfo
        }
        api.fetch(ACTION.STOCKINFO, param, 'POST',successHandler, failHandler);
    }

    checkOrderBalanceStatus(settleAcc, bs, stockCode, mvMarketID, price, pQty ,temporaryFee, callback, failHandler){

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
                }else{
                    callback();
                }
            } else {
                // If has no bank
                var mvActionStockInfo = "BP";
                var mvEnableGetStockInfo="N";                                   
                this.getSymbolInfo(stockCode, mvMarketID, bs, mvEnableGetStockInfo, mvActionStockInfo, 
                    function(json){ //success
                        var buyingPower1 = parseFloat(Utils.numUnFormat(json.mvStockInfoBean.mvBuyingPowerd));
                        var marPer = json.mvStockInfoBean.mvMarginPercentage;
                        var nominal = json.mvStockInfoBean.mvNomial;
                        if (marPer && marPer != "null"){
                            marPer = parseFloat(Utils.numUnFormat(marPer));
                        } else {
                            marPer = 0;
                        }
                        if (nominal && nominal != "null"){
                            nominal = parseFloat(Utils.numUnFormat(nominal));
                            if (nominal == 0){
                                nominal = p;
                            }
                        } else {
                            nominal = p;
                        }
                        
                        var temporaryFeeAmount = buyVol * temporaryFee / 100;
                        if (buyingPower1 + qty*nominal*marPer/100 + temporaryFeeAmount < buyVol) {
                            me.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.lakeCash)
                            failHandler();
                        }else{
                            callback();
                        }
                    },
                    function(err){
                        console.log(err)
                        failHandler()
                    }
                )
            }                           
        }
        else 
            if (bs == 'S') {
                var mvActionStockInfo = "SI";       
                var mvEnableGetStockInfo="N";                                   
                this.getSymbolInfo(stockCode, mvMarketID, bs, mvEnableGetStockInfo, mvActionStockInfo, 
                    function(json){ // success
                        var usableStock1 = parseFloat(Utils.numUnFormat(json.mvStockInfoBean.mvUsable));
                        if (qty > usableStock1) {                                                       
                            me.props.onShowMessageBox(language.messagebox.title.error, language.messagebox.message.lakeStock)
                            failHandler();
                            return;
                        }else{
                            callback();
                        }
                    },
                    failHandler
                )
            }
                        
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