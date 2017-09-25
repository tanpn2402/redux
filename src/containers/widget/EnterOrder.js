import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import InputSearch from '../commons/InputSearch'
import * as Utils from '../../utils'
import DateTimePicker from '../commons/DateTimePicker'
import moment from 'moment'
import config from '../../core/config'
import Popup from '../Popup'

class EnterOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formValues: {
                disabled: false,
                volume: 0,
                price: 0,
            },
            startDate: moment(),
            isCheck: false,
            json: {},
            data: {},
            isShow: false,
            value: 0,
            status: "",
            mvstatus:"",
        };
        //this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onStockChange = this.onStockChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onOrderType = this.onOrderType.bind(this);
        this.stockInfo ={};
        this.stockBalance=[];
        this.param = {
            buypower: 0.0,
            lending: 0,
            price: 0,
            value: 0,
            netfee: 0.00,
            stockId: null,
            orderType: 'L',
            tmpBP:0.0,
        }
        this.id = 'enterorder'
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            isCheck: value
        });
    }

    handleChange(date) {
        
        this.setState({
            startDate: date
        });
    }


    render() {

        let lgClose = () => this.setState({ isShow: false });
        this.stockInfo = this.props.mvStockInfo === undefined ? {} : this.props.mvStockInfo.mvStockInfoBean
        this.stockBalance = this.props.mvStockBalance.mvStockBalanceInfo === undefined ? [] : this.props.mvStockBalance.mvStockBalanceInfo
        if (this.props.mvStockInfo.mvStockInfoBean === undefined){
            this.stockInfo = {}
        }
        else{
            this.stockInfo = this.props.mvStockInfo.mvStockInfoBean
            this.param.lending = parseInt(this.stockInfo.mvMarginPercentage)
            this.param.tmpBP = parseFloat(this.stockInfo.mvBuyingPowerd.replace(/,/g, ''))
            this.param.buypower = (this.param.tmpBP)/(1-this.param.lending/100)*1000
            if(this.param.buypower<0)
                this.param.buypower = 0;

        }

        return (
            <div>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <Form id={"form-" + this.id} className="widget-form">
                        <FormGroup className="enterorder-buy">
                            <Table responsive>
                                <tbody >
                                    <tr>
                                        <th>{this.props.language.enterorder.header.buysell} </th>
                                        <td>
                                            <input type='hidden' id="mvStatus" value={this.state.mvstatus} />
                                            <Radio name="radioGroup" inline value="B" checked={this.state.status === "B"} onChange={this.onStatusChange} required>
                                                <div className="Radiobox">Buy</div>
                                            </Radio>
                                            <Radio name="radioGroup" inline value="S" checked={this.state.status === "S"} onChange={this.onStatusChange}>
                                                <div className="Radiobox">Sell</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.buysellall}</th>
                                        <td>
                                            <Radio name="radioGroup" inline value="B1" checked={this.state.status === "B1"} onChange={this.onStatusChange}>
                                                <div className="Radiobox">Buy</div>
                                            </Radio>
                                            <Radio name="radioGroup" inline value="S1" checked={this.state.status === "S1"} onChange={this.onStatusChange}>
                                                <div className="Radiobox">Sell</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.stock}</th>
                                        <td>
                                            <input type='hidden' id="mvMarketID" ref={(ref) => this.input = ref} />
                                            <input
                                                className="hks-input no-border" 
                                                list="Stock" name="stock" id="mvStock" 
                                                placeholder="ex: VNM" required onChange={this.onStockChange} maxLength="3"/>
                                            <datalist id="Stock">
                                            {
                                                this.props.stockList.map(e => {
                                                    return (<option value={e.stockCode}>{e.stockName}
                                                    </option>)
                                                })
                                            }

                                            </datalist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.bank}</th>
                                        <td>
                                            <input className="hks-input no-border" id="mvBank"
                                                list="Bank" name="bank" id="mvBank" placeholder="ex: ACB" />
                                            <datalist id="Bank">
                                                
                                            </datalist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.lending} </th>
                                        <td>{this.param.lending}% </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.buyingpower}</th>
                                        <td>
                                            <input type="hidden" id="mvBuyPower" value={this.param.buypower} />
                                            {this.param.buypower}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.ordertype}</th>
                                        <td>
                                            <FormGroup controlId="mvOrderType">
                                                <select className="hks-input no-border" style={{width: '100%', padding: '0'}}
                                                    onChange={this.onOrderType.bind(this)}>
                                                    {
                                                        this.state.data['mvMarketId'] === undefined ? <option value="L">{this.props.language.enterorder.ordertype.L}</option> :
                                                        config.ordertype[this.state.data.mvMarketId].map(e => {
                                                            return (
                                                                <option value={e}>{this.props.language.enterorder.ordertype[e]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.volume}</th>
                                        <td>
                                            <FormGroup controlId="mvVolume">
                                                <input 
                                                    className="hks-input no-border" 
                                                    type="number" name="volume" min="0" 
                                                    onChange={this.onChange.bind(this)} id="mvVolume" 
                                                    placeholder="ex: 100" required value={this.state.formValues.volume}/>
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.price}</th>
                                        <td>
                                            <FormGroup controlId="mvPrice">
                                                <input 
                                                    className="hks-input no-border" 
                                                    type="number" disabled={this.state.formValues.disabled} 
                                                    min="0" step="any" name="price" onChange={this.onChange.bind(this)} 
                                                    id="mvPrice" placeholder="ex: 10" required value={this.state.formValues.price}/>
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.value}</th>
                                        <td>
                                            <input type="hidden" id="mvTotalPrice" value={this.param.value} />
                                            {this.calculateValue()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.netfee}</th>
                                        <td>
                                            <input type="hidden" id="mvNetFee" value={this.isEmptyA(this.props.mvStockInfo) === true ? "0.00"
                                            : (this.param.value * parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvTemporaryFee)/100)} />
                                            {this.calculateNetfee()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.enterorder.header.expirydate}</th>
                                        <td>
                                            <Col xs={1}>
                                                <input name="isCheck" type="checkbox" 
                                                    checked={this.state.isCheck} 
                                                    onChange={this.handleInputChange} 
                                                    value={this.state.startDate} />
                                            </Col>
                                            <Col xs={11}>
                                                <DateTimePicker 
                                                    id='mvDate'
                                                    disabled={!this.state.isCheck} 
                                                    onChange={this.handleChange.bind(this)} 
                                                    selected={this.state.startDate}/>
                                            </Col>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit" onClick={this.handleSubmit.bind(this)}>
                                        Submit
                                    </button>
                                    <button className="btn btn-default" type="reset" className="hks-btn btn-cancel">
                                        Cancel
                                    </button>
                                </span>
                            </div>

                        </FormGroup>
                        <Popup
                            id='enterorder'
                            show={this.state.isShow}
                            onHide={lgClose}
                            json={this.state.json}
                            error={this.props.isError}
                            mvStockBean={this.props.mvStockInfo}
                            language={this.props.language}
                            title={this.props.language.enterorder.popup.title} />
                    </Form>
                </Body>
            </div>
        )

    }


    isEmptyA(obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    }
    onStatusChange(e){
        
        if(e.currentTarget.value === "B" || e.currentTarget.value ==="B1"){
            this.state.mvstatus = "B"
        }
        else{
            this.state.mvstatus = "S"
            
            if(e.currentTarget.value ==="S1" && this.param.stockId !== null)
                {
                    var tmp = this.stockBalance.filter(e => e.mvStockCode === this.param.stockId)
                    this.setState({formValues:{volume:tmp[0].mvTradableQty}})
                    this.onChange.bind(this)
                }
        }
        this.setState({status:e.target.value})
    }
    onStockChange(e) {
        if(e.target.value.length === 3){
            this.param.stockId = document.getElementById("mvStock").value;
            var tmp = this.props.stockList.filter(e => e.stockCode === this.param.stockId);
            if(tmp.length > 0){
                this.state.data['mvMarketId'] = tmp[0].mvMarketID
                this.state.data['mvLotSize'] = tmp[0].lotSize
            }
            // else show error stock code not exist
        
            this.state.data['mvInstrument'] = this.param.stockId
            this.state.data['mvEnableGetStockInfo'] = 'N'
            this.state.data['mvAction'] = 'OI,BP,FE'
            this.state.data['mvBS'] = 'B'
            this.props.getStockInfo(this.state.data)
            this.state.data.mvAction = 'SB'
            this.props.getStockInfo(this.state.data);
        }
    }
    onOrderType(e){
        this.param.orderType= e.target.value;
        var orderType = config.ordertype[this.state.data['mvMarketId']]
        if (orderType.includes(e.target.value) && e.target.value !== "L" && e.target.value !== "LO") {
            var tmp;
            this.onStatusChange.bind(this)
            console.log(this.state.status)
            if(this.state.status==='B' || this.state.status ==='B1')
                tmp = parseFloat(this.stockInfo.mvCeiling)
            else
                tmp = parseFloat(this.stockInfo.mvFloor)
            
            //cal buy all
            if (this.state.status === "B1" && this.param.stockId !== null) {
                var buypower = this.param.tmpBP
                var tmpVol = buypower / (tmp * 1.005 * (1 - parseFloat(this.stockInfo.mvMarginPercentage)/100))
                tmpVol = parseInt(tmpVol)
                this.state.formValues.volume = tmpVol;
                this.setState({formValues:{volume:this.state}});
                this.onChange.bind(this)
                console.log(tmpVol, "what is this", this.param.buypower,this.state.formValues.volume)
            }
            var priceinput = document.getElementById('mvPrice').style.display = 'none'
            this.setState({
                formValues: {
                    disabled: true,
                    price: tmp,
                }
            })
            this.onChange.bind(this)
        }
        else{
            var priceinput = document.getElementById('mvPrice').style.display = 'block'
            this.setState({
                formValues: {
                    disabled: false
                }
            })
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        var x = document.getElementById("form-enterorder");

        for (var i = 0; i < x.length; i++) {
            this.state.json[x.elements[i].id] = x.elements[i].value;
        }
        if (this.state.isCheck === false)
            this.state.json.mvDate = null
        this.state.json.mvMarketID = this.state.data.mvMarketId;
        this.state.json.mvLotSize = this.state.data.mvLotSize;
        console.log(this.state.json);
        this.props.verify(this.state.json, this.props.language.enterorder.error, this.props.stockList,this.stockInfo,this.stockBalance)
        this.setState({ isShow: true })
    }

    onChange(e) {
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;
        
        formValues[name] = value;
        
        this.setState({ formValues })
        console.log(this.state.formValues.volume,this.state.formValues.price)
        
    }
    calculateValue(){
        this.param.value = Math.round(this.state.formValues.volume * this.state.formValues.price * 1000.0);
        return this.param.value;
    }
    calculateNetfee(){
        this.param.netfee = Math.round(this.state.formValues.volume * this.state.formValues.price * parseFloat(this.stockInfo.mvTemporaryFee)) * 10;
        return this.param.netfee;
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.enterOrder.account,
        mvStockInfo: state.enterOrder.stockInfo,
        mvStockBalance: state.enterOrder.stockBalance,
        isError: state.enterOrder.isError,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    verify: (json, language, stockList, stockInfo, stockBalance) => {
        dispatch(actions.checkPreEnterOrder(json, language, stockList,stockInfo,stockBalance))
    },
    getStockInfo: (param) => {
        dispatch(actions.getstockInfo(param))
    },
    getStock: () => {
        dispatch(actions.getStockB())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrder)