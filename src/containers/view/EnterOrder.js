/*import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import '../css/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';

const MyLargeModal = React.createClass({
    render() {
        return (
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Wrapped Text</h4>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

class EnterOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            startDate: moment(),
            isCheck: false,
            lgShow: false,
            isOkay: false,
        };
        //this.onSubmit = this.onSubmit.bind(this);
        this.onChange =  this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
            <Form>
                <FormGroup>
                    <Table responsive bordered>
                        <tbody className="enterorder">
                            <tr>
                                <th>Buy/Sell</th>
                                <td>
                                    <Radio name="radioGroup" inline required>
                                        <div className="Radiobox">Buy</div>
                                    </Radio>
                                    <Radio name="radioGroup" inline >
                                        <div className="Radiobox">Sell</div>
                                    </Radio>
                                </td>
                            </tr>
                            <tr>
                                <th>Buy all/Sell all</th>
                                <td>
                                    <Radio name="radioGroup" inline >
                                        <div className="Radiobox">Buy</div>
                                    </Radio>
                                    <Radio name="radioGroup" inline >
                                        <div className="Radiobox">Sell</div>
                                    </Radio>
                                </td>
                            </tr>
                            <tr>
                                <th>Stock</th>
                                <td>
                                    <input list="Stock" name="stock" required/>
                                        <datalist id="Stock">
                                            <option value="ACB"/>
                                            <option value="VNM"/>
                                            <option value="HKS"/>
                                            <option value="PGS"/>
                                            <option value="HSG"/>
                                        </datalist>
                                </td>
                            </tr>
                            <tr>
                                <th>% Lending</th>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <th>Buying Power(Expected)</th>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>Order Type</th>
                                <td>
                                    <input list="ordertype" name="ordertype" required/>
                                    <datalist id="ordertype">
                                        <option value="LO" />
                                        <option value="ATC" />
                                        <option value="MAK" />
                                        <option value="MOK" />
                                        <option value="MTL" />
                                        <option value="LO(Odd Lot)" />
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <th>Volume</th>
                                <td>
                                    <input type="number" name="volume" onChange={this.onChange} required/>
                                </td>
                            </tr>
                            <tr>
                                <th>Price (x1000VND)</th>
                                <td>
                                    <input type="number" name="price" onChange={this.onChange} required/>
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
                                <td className = "date">
                                    <input name="isCheck" type="checkbox" checked={this.state.isCheck} onChange={this.handleInputChange}/>
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
                        <Button className="btn btn-default" type="submit" onClick={() => this.setState({ lgShow: true })}>
                            Submit
                        </Button>
                    </div>
                    <div className="button">
                        <Button className="btn btn-default" type="reset">
                            Cancel
                        </Button>
                    </div>
                    <br className="clear"/>
                    
                </FormGroup>
                
                {this.state.lgShow && <MyLargeModal show={this.state.lgShow} onHide={lgClose} />}
                
            </Form>
        );
        
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

export default EnterOrder;*/