import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Table, Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table"
import "react-table/react-table.css"
import '../../css/App.css';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import Popup from '../Popup'

class CashAdvance extends Component {
    constructor(props) {
        super(props);
        this.state = {
           formValues: {},
            isShow: false,
            columns1: [
                {
                    Header: this.props.language.cashadvance.header.id,
                    accessor: 'ID',
                    id: 'id',
                },
                {
                    Header: this.props.language.cashadvance.header.matchingdate,
                    accessor: 'matchingdate',
                    id: 'matchingdate',
                },
                {
                    Header: this.props.language.cashadvance.header.paymentdate,
                    accessor: 'paymentdate',
                    id: 'paymentdate',
                },
                {
                    Header: this.props.language.cashadvance.header.stock,
                    accessor: 'stock',
                    id: 'stock',
                },
                {
                    Header: this.props.language.cashadvance.header.volume,
                    accessor: 'volume',
                    id: 'volume',
                },
                {
                    Header: this.props.language.cashadvance.header.value,
                    accessor: 'value',
                    id: 'value',
                },
                {
                    Header: this.props.language.cashadvance.header.fee,
                    accessor: 'fee',
                    id: 'fee',
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvance.header.date,
                    accessor: 'date',
                    id: 'date',
                },
                {
                    Header: this.props.language.cashadvance.header.advanceamount,
                    accessor: 'advanceamount',
                    id: 'advanceamount',

                },
                {
                    Header: this.props.language.cashadvance.header.advancefee,
                    accessor: 'advancefee',
                    id: 'advancefee',
                },
                {
                    Header: this.props.language.cashadvance.header.processingstatus,
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                },
                {
                    Header: this.props.language.cashadvance.header.lastupdate,
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                },
                {
                    Header: this.props.language.cashadvance.header.note,
                    accessor: 'note',
                    id: 'note,'
                }
            ],
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns1: [
                {
                    Header: nextProps.language.cashadvance.header.id,
                    accessor: 'ID',
                    id: 'id',
                },
                {
                    Header: nextProps.language.cashadvance.header.matchingdate,
                    accessor: 'matchingdate',
                    id: 'matchingdate',
                },
                {
                    Header: nextProps.language.cashadvance.header.paymentdate,
                    accessor: 'paymentdate',
                    id: 'paymentdate',
                },
                {
                    Header: nextProps.language.cashadvance.header.stock,
                    accessor: 'stock',
                    id: 'stock',
                },
                {
                    Header: nextProps.language.cashadvance.header.volume,
                    accessor: 'volume',
                    id: 'volume',
                },
                {
                    Header: nextProps.language.cashadvance.header.value,
                    accessor: 'value',
                    id: 'value',
                },
                {
                    Header: nextProps.language.cashadvance.header.fee,
                    accessor: 'fee',
                    id: 'fee',
                }
            ],
            columns2: [
                {
                    Header: nextProps.language.cashadvance.header.date,
                    accessor: 'date',
                    id: 'date',
                },
                {
                    Header: nextProps.language.cashadvance.header.advanceamount,
                    accessor: 'advanceamount',
                    id: 'advanceamount',

                },
                {
                    Header: nextProps.language.cashadvance.header.advancefee,
                    accessor: 'advancefee',
                    id: 'advancefee',
                },
                {
                    Header: nextProps.language.cashadvance.header.processingstatus,
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                },
                {
                    Header: nextProps.language.cashadvance.header.lastupdate,
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                },
                {
                    Header: nextProps.language.cashadvance.header.note,
                    accessor: 'note',
                    id: 'note,'
                }
            ],
        });
    }

    render() {
        let lgClose = () => this.setState({ isShow: false });
        return (
            <div id={'cashadvance-body'} className="layout-body" style={{paddingTop:"5px"}}>
            <div>
            <div className="col-md-4">
            <div className="title" style={this.props.theme.porfolio.titlestock}>
                        <span>{this.props.language.cashadvance.header.cashadvanceplace}</span>
                    </div>
                <Form onSubmit={this.handleSubmit} id="form-cashadvance">
                    <FormGroup>
                        <Table responsive>
                            <tbody >
                                <tr>
                                    <th className="enterorder">{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                    <td>4.600.630</td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.cashadvance.header.advancefee}</th>
                                    <td>
                                    <input type="hidden" id="mvTotalPrice" value={this.calculate()} />
                                        {this.calculate() || 0}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.cashadvance.header.advanceamount}</th>
                                    <td>
                                    <FormGroup controlID="volume">
                                        <input type="number" name="volume" min="0" onChange={this.onChange}  id="volume" required />
                                    </FormGroup>
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
                                                Clear
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                          </tbody>
                      </Table>
                    </FormGroup>
                    <Popup
                        id='cashadvance'
                        show={this.state.isShow}
                        onHide={lgClose}
                        advanceAmount={this.mvVolume}
                        language={this.props.language}
                        title = {this.props.language.cashadvance.popup.title}/>
                    {console.log("Lange??", this.props.language.enterorder.popup.title)}
                </Form>
                </div>
                <div className="col-md-8">
                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                        <span>{this.props.language.cashadvance.header.cashadvancetransaction}</span>
                    </div>
                    <div>

                        <ReactTable
                            className="cashtable"
                          language={this.props.language.portfolio.header}
                            columns={this.state.columns2}
                            style={{maxHeight:"250px", fontSize: "12px"}}/>

                    </div>
                 </div>
            </div>
                     
                        <ReactTable
                            className="matchingordertable"
                          language={this.props.language.portfolio.header}
                            columns={this.state.columns1}
                            style={{maxHeight:"250px", fontSize: "12px"}}/>

                    </div>
        );
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({ isShow: true })
    }

    onChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;
        this.setState({ formValues })
    }

    calculate() {
        this.state.value = this.state.formValues.volume / 2500;
        return this.state.value;
    }
}

export default CashAdvance;
