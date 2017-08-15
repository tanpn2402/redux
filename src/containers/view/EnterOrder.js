import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import '../../css/App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import Popup from '../Popup';
import { connect } from 'react-redux';
import * as actions from '../../actions'

class EnterOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            startDate: moment(),
            isCheck: false,
            json: {},
            isShow: false,
        };
        //this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.accountBalance();
        this.props.stockInfo();
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
        return (
            <div id={'orderjournal-body'} className="layout-body">
                <Form onSubmit={this.handleSubmit} id="form-enterorder">
                    <FormGroup>
                        <Table responsive >
                            <tbody >
                                <tr>
                                    <th className="enterorder">Buy/Sell</th>
                                    <td>
                                        <input type='hidden' id="mvStatus" ref={(ref) => this.inputStatus = ref} />
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "BUY" }} required>
                                            <div className="Radiobox">Buy</div>
                                        </Radio>
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "SELL" }}>
                                            <div className="Radiobox">Sell</div>
                                        </Radio>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Buy all/Sell all</th>
                                    <td>
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "BUYALL" }}>
                                            <div className="Radiobox">Buy</div>
                                        </Radio>
                                        <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "SELLALL" }}>
                                            <div className="Radiobox">Sell</div>
                                        </Radio>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Stock</th>
                                    <td>
                                        <input list="Stock" name="stock" id="mvStock" required />
                                        <datalist id="Stock">{
                                            this.props.stockList.map(e => {
                                                return (<option value={e.stockCode}>{e.stockName}</option>)
                                            })
                                        }

                                        </datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Bank</th>
                                    <td>
                                        <input id="mvBank" list="Bank" name="bank" id="mvBank" required />
                                        <datalist id="Bank">
                                            <option value="ACB-125137309" />
                                        </datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">% Lending</th>
                                    <td>0%</td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Buying Power(Expected)</th>
                                    <td>
                                        <input type="hidden" id="mvBuyPower" value={this.props.account} />
                                        {this.props.account}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Order Type</th>
                                    <td>
                                        <FormGroup controlId="mvOrderType">
                                            <input id="mvOrderType" list="ordertype" name="ordertype" required />
                                            <datalist id="ordertype">
                                                <option value="LO" />
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
                                    <th className="enterorder">Volume</th>
                                    <td>
                                        <FormGroup controlId="mvVolume">
                                            <input type="number" name="volume" min="0" onChange={this.onChange} id="mvVolume" required />

                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Price (x1000VND)</th>
                                    <td>
                                        <FormGroup controlId="mvPrice">
                                            <input type="number" min="0" name="price" onChange={this.onChange} id="mvPrice" required />
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Value (VND)</th>
                                    <td>
                                        <input type="hidden" id="mvTotalPrice" value={this.calculate()} />
                                        {this.calculate() || 0}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Net fee</th>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <th className="enterorder">Expiry date</th>
                                    <td className="date">
                                        <input name="isCheck" type="checkbox" checked={this.state.isCheck} onChange={this.handleInputChange} value={this.state.startDate} />
                                        <DatePicker
                                            id="mvDate"
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
                    <FormGroup>


                    </FormGroup>
                    <Popup
                        id='enterorder' 
                        show={this.state.isShow} 
                        onHide={lgClose} 
                        json={this.state.json} 
                        error={this.props.isError} 
                        mvStockBean={this.props.mvStockBean} />
                </Form>
            </div>
        );

    }

    handleSubmit(e) {
        e.preventDefault();
        var x = document.getElementById("form-enterorder");

        for (var i = 0; i < x.length; i++) {
            this.state.json[x.elements[i].id] = x.elements[i].value;
        }
        if (this.state.isCheck === false)
            this.state.json.mvDate = null
        this.props.checkPre(this.state.json, this.props.mvStockBalanceInfo, this.props.mvStockBean)
        this.setState({ isShow: true })
    }

    onChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;
        console.log(formValues);
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
        mvStockBalanceInfo: state.enterOrder.stockInfoList,
        mvStockBean: state.enterOrder.stockInfoACB,
        isError: state.enterOrder.isError,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    accountBalance: () => {
        dispatch(actions.accountBalance())
    },
    stockInfo: () => {
        dispatch(actions.stockInfo())
    },
    checkPre: (json, stockBalanceInfo, stockBeanInfo) => {
        dispatch(actions.checkPreEnterOrder(json, stockBalanceInfo, stockBeanInfo))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrder);
