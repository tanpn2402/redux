import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import '../../css/App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import Popup from '../Popup';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import loading from '../../assets/images/loading_apple.gif'

class EnterOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
            },
            startDate: moment(),
            isCheck: false,
            json: {},
            data: {},
            isShow: false,
            value: 0,
        };
        //this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onStockChange = this.onStockChange.bind(this);
    }

    componentWillMount() {
        this.props.getStock();
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

    componentWillReceiveProps(nextProps) {
        nextProps.mvStockInfo;
        
    }

    render() {
        let lgClose = () => this.setState({ isShow: false });
        return (
            <div id={'orderjournal-body'} className="layout-body">
                <Form onSubmit={this.handleSubmit} id="form-enterorder">
                    <FormGroup>
                        <Table responsive >
                            <tbody >
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.buysell}</th>
                                    <td>
                                        <input type='hidden' id="mvStatus" ref={(ref) => this.inputStatus = ref} />
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "B" }} required>
                                            <div className="Radiobox">Buy</div>
                                        </Radio>
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "S" }}>
                                            <div className="Radiobox">Sell</div>
                                        </Radio>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.buysellall}</th>
                                    <td>
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "B" }}>
                                            <div className="Radiobox">Buy</div>
                                        </Radio>
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "S" }}>
                                            <div className="Radiobox">Sell</div>
                                        </Radio>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.stock}</th>
                                    <td>
                                        <input type='hidden' id="mvMarketID" ref={(ref) => this.input = ref} />
                                        <input list="Stock" name="stock" id="mvStock" required onChange={this.onStockChange} />
                                        <datalist id="Stock">{
                                            this.props.stockList.map(e => {
                                                return (<option value={e.stockCode}>{e.stockName}
                                                </option>)
                                            })
                                        }

                                        </datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.bank}</th>
                                    <td>
                                        <input id="mvBank" list="Bank" name="bank" id="mvBank" required />
                                        <datalist id="Bank">
                                            <option value="ACB-125137309" />
                                        </datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.lending}</th>
                                    <td>{this.isEmptyA(this.props.mvStockInfo) === true ? "0" : parseInt(this.props.mvStockInfo.mvStockInfoBean.mvMarginPercentage)}%</td>
                                </tr>
                                <tr>

                                    <th className="enterorder">{this.props.language.enterorder.header.buyingpower})</th>
                                    <td>
                                        <input type="hidden" id="mvBuyPower" value={this.isEmptyA(this.props.mvStockInfo) === true ? "0" :
                                            ((parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvBuyingPowerd.replace(/,/g, '')) * 1000) /
                                                (1 - (parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvMarginPercentage) / 100))
                                            )} />
                                        {this.isEmptyA(this.props.mvStockInfo) === true ? "0" :
                                            ((parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvBuyingPowerd.replace(/,/g, '')) * 1000) /
                                                (1 - (parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvMarginPercentage) / 100))
                                            )}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.ordertype}</th>
                                    <td>
                                        <FormGroup controlId="mvOrderType">
                                            <input id="mvOrderType" list="ordertype" name="ordertype" required />
                                            <datalist id="ordertype">
                                                <option value="L" />
                                                <option value="ATC" />
                                                <option value="MAK" />
                                                <option value="MOK" />
                                                <option value="MTL" />
                                                <option value="LO(Odd Lot)" />
                                            </datalist>
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.volume}</th>
                                    <td>
                                        <FormGroup controlId="mvVolume">
                                            <input type="number" name="volume" min="0" onChange={this.onChange} id="mvVolume" required />

                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.price}</th>
                                    <td>
                                        <FormGroup controlId="mvPrice">
                                            <input type="number" min="0" step="any" name="price" onChange={this.onChange} id="mvPrice" required />
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.value}</th>
                                    <td>
                                        <input type="hidden" id="mvTotalPrice" value={this.calculate()} />
                                        {this.calculate() || 0}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.netfee}</th>
                                    <td><input type="hidden" id="mvNetFee" value={this.isEmptyA(this.props.mvStockInfo) === true ? "0.00"
                                        : (this.state.value * parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvTemporaryFee))} />
                                        {this.isEmptyA(this.props.mvStockInfo) === true ? "0.00"
                                            : (this.state.value * parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvTemporaryFee))}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.enterorder.header.expirydate}</th>
                                    <td className="date">
                                        <input name="isCheck" type="checkbox" checked={this.state.isCheck} onChange={this.handleInputChange} value={this.state.startDate} />
                                        <DatePicker
                                            id="mvDate"
                                            dateFormat="DD/MM/YYYY"
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            disabled={!this.state.isCheck}
                                        />

                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <div className="button">
                                            <Button className="btn btn-default" type="submit" className="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </th>
                                    <td>
                                        <div className="button">
                                            <Button className="btn btn-default" type="reset" className="cancel">
                                                Cancel
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
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
            </div>
        );

    }


    isEmptyA(obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    }

    onStockChange(e) {
        var stockID = document.getElementById("mvStock").value;
        var marketid = document.getElementById("mvMarketID").value;
        //console.log(marketid,"HO or HA");
        this.state.data['mvInstrument'] = stockID
        this.state.data['mvMarketId'] = "HO"
        this.state.data['mvEnableGetStockInfo'] = 'N'
        this.state.data['mvAction'] = 'OI,BP,FE'
        this.state.data['mvBS'] = 'B'
        this.props.getStockInfo(this.state.data)
        this.state.data.mvAction = 'SB'
        this.props.getStockInfo(this.state.data);
    }

    handleSubmit(e) {
        e.preventDefault();
        var x = document.getElementById("form-enterorder");

        for (var i = 0; i < x.length; i++) {
            this.state.json[x.elements[i].id] = x.elements[i].value;
        }
        if (this.state.isCheck === false)
            this.state.json.mvDate = null
        this.state.json.mvMarketID = "HO";
        console.log(this.state.json);
        this.props.checkPre(this.state.json, this.props.language.enterorder.error)
        this.setState({ isShow: true })
    }

    onChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;
        console.log('dasd', formValues);
        this.setState({ formValues })
    }

    calculate() {
        this.state.value = this.state.formValues.volume * this.state.formValues.price * 1000.0;
        return this.state.value;
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.enterOrder.account,
        mvStockInfo: state.enterOrder.stockInfoList,
        isError: state.enterOrder.isError,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    checkPre: (json, language) => {
        dispatch(actions.checkPreEnterOrder(json, language))
    },
    getStockInfo: (param) => {
        dispatch(actions.getstockInfo(param))
    },
    getStock: () => {
        dispatch(actions.getStockB())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrder);