import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import '../../css/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import Popup from '../Popup';
import { connect } from 'react-redux';
//import * as actions from '../../actions';

class EnterOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            startDate: moment(),
            isCheck: false,
            lgShow: false,
        };
        //this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        let lgClose = () => this.setState({ lgShow: false });
        return (
            <Form onSubmit={this.handleSubmit} id="form-enterorder">
                <FormGroup>
                    <Table responsive bordered>
                        <tbody className="enterorder">
                            <tr>
                                <th>Buy/Sell</th>
                                <td>
                                    <Radio name="radioGroup" inline value="buy" id="mvStatus" required>
                                        <div className="Radiobox">Buy</div>
                                    </Radio>
                                    <Radio name="radioGroup" inline value="sell" id="mvStatus">
                                        <div className="Radiobox">Sell</div>
                                    </Radio>
                                </td>
                            </tr>
                            <tr>
                                <th>Buy all/Sell all</th>
                                <td>
                                    <Radio name="radioGroup" inline value="buy all" id="mvStatus">
                                        <div className="Radiobox">Buy</div>
                                    </Radio>
                                    <Radio name="radioGroup" inline value="sell all" id="mvStatus">
                                        <div className="Radiobox">Sell</div>
                                    </Radio>
                                </td>
                            </tr>
                            <tr>
                                <th>Stock</th>
                                <td>
                                    <input list="Stock" name="stock" id="mvStock" required />
                                    <datalist id="Stock">
                                        <option value="ACB" />
                                        <option value="VNM" />
                                        <option value="HKS" />
                                        <option value="PGS" />
                                        <option value="HSG" />
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <th>Bank</th>
                                <td>
                                    <input list="Bank" name="bank" id="mvbank" required />
                                    <datalist id="Bank">
                                        <option value="ACB" />
                                        <option value="SHB" />
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <th>% Lending</th>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <th>Buying Power(Expected)</th>
                                <td>
                                    <input type="hidden" id="mvBuyPower" value="0"/>
                                    0
                                </td>
                            </tr>
                            <tr>
                                <th>Order Type</th>
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
                                <th>Volume</th>
                                <td>
                                    <FormGroup controlId="mvVolume">
                                        <input type="number" name="volume" onChange={this.onChange} required />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <th>Price (x1000VND)</th>
                                <td>
                                    <FormGroup controlId="mvPrice">
                                        <input type="number" name="price" onChange={this.onChange} required />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <th>Value (VND)</th>
                                <td>
                                    {this.calculate() || 0}
                                </td>
                            </tr>
                            <tr>
                                <th>Net fee</th>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <th>Expiry date</th>
                                <td className="date">
                                    <input name="isCheck" type="checkbox" checked={this.state.isCheck} onChange={this.handleInputChange} id="mvDate" value={this.state.startDate}/>
                                    
                                        <DatePicker
                                            
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            disabled={!this.state.isCheck}
                                        />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </FormGroup>
                <FormGroup>
                    <div className="button">
                        <Button className="btn btn-default" type="submit" >
                            Submit
                        </Button>
                    </div>
                    <div className="button">
                        <Button className="btn btn-default" type="reset">
                            Cancel
                        </Button>
                    </div>
                    <br className="clear" />

                </FormGroup>

                <Popup show={this.state.lgShow} onHide={lgClose} />

            </Form>
        );

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('onSearch')
        var x = document.getElementById("form-enterorder");
        var tmp = {};
        console.log(tmp + x.length);
        for (var i = 0; i < x.length; i++) {
            tmp[x.elements[i].id] = x.elements[i].value;
        }
        console.log(tmp);
        //this.props.onCheck(tmp);
        this.setState({ lgShow: true });
    }

    onChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = name === 'checkbox' ? e.target.checked : e.target.value;

        formValues[name] = value;
        this.setState({ formValues })
    }

    calculate() {
        this.state.value = this.state.formValues.volume * this.state.formValues.price * 1000.0;
        return this.state.value;
    }
}

// const mapDispatchToProps = (dispatch, props) => ({
//     onCheck: () => {
//         dispatch(actions.checkenterorder())
//     },
// })

export default EnterOrder;