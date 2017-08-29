import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Table, Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table"
import "react-table/react-table.css"
import '../../css/App.css';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import Popup from '../Popup'
import DataUpperTable from '../DataUpperTable'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'

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
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.matchingdate,
                    accessor: 'matchingdate',
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.paymentdate,
                    accessor: 'paymentdate',
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.stock,
                    accessor: 'stock',
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.volume,
                    accessor: 'volume',
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.value,
                    accessor: 'value',
                    id: 'value',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.fee,
                    accessor: 'fee',
                    id: 'fee',
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvance.header.date,
                    accessor: 'date',
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.advanceamount,
                    accessor: 'advanceamount',
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: this.props.language.cashadvance.header.advancefee,
                    accessor: 'advancefee',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.processingstatus,
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.lastupdate,
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.note,
                    accessor: 'note',
                    id: 'note',
                    show: true,
                    skip: false,
                    width: 120,
                }
            ],
            cashAdTransPageIndex: 1,
            orderMatchListPageIndex: 1,

        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.id = 'cashadvance';
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns1: [
                {
                    Header: nextProps.language.cashadvance.header.id,
                    accessor: 'ID',
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.matchingdate,
                    accessor: 'matchingdate',
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.paymentdate,
                    accessor: 'paymentdate',
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.stock,
                    accessor: 'stock',
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.volume,
                    accessor: 'volume',
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.value,
                    accessor: 'value',
                    id: 'value',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.fee,
                    accessor: 'fee',
                    id: 'fee',
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
            columns2: [
                {
                    Header: nextProps.language.cashadvance.header.date,
                    accessor: 'date',
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.advanceamount,
                    accessor: 'advanceamount',
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: nextProps.language.cashadvance.header.advancefee,
                    accessor: 'advancefee',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.processingstatus,
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.lastupdate,
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.note,
                    accessor: 'note',
                    id: 'note',
                    show: true,
                    skip: false,
                    width: 120,
                }
            ],
        });
    }

    render() {
        let lgClose = () => this.setState({ isShow: false })

        let buttonActionCashAdTrans = [
            <Pagination
                    pageIndex={this.state.cashAdTransPageIndex} 
                    totalRecord={10} 
                    onPageChange={this.onCashAdTransPageChange.bind(this)}
                    onNextPage={this.onCashAdTransNextPage.bind(this)}
                    onPrevPage={this.onCashAdTransPrevPage.bind(this)}
                    onReloadPage={this.onCashAdTransReloadPage.bind(this)}
                />,
        ]
        let buttonActionOrderMatchList = [
            <Pagination
                    pageIndex={this.state.orderMatchListPageIndex} 
                    totalRecord={10} 
                    onPageChange={this.onOrderMatchListPageChange.bind(this)}
                    onNextPage={this.onOrderMatchListNextPage.bind(this)}
                    onPrevPage={this.onOrderMatchListPrevPage.bind(this)}
                    onReloadPage={this.onOrderMatchListReloadPage.bind(this)}
                />,
        ]
        return (
            <div id={this.id + '-body'} className="layout-body" style={{}}>
                <div>
                    <div className="col-xs-12 col-sm-6 col-md-4" style={{paddingRight:"2px", paddingLeft: "2px",}}>
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.cashadvance.header.cashadvanceplace}</span>
                        </div>
                        <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className={"form-" + this.id}>
                            <FormGroup>
                                <Table responsive>
                                    <tbody >
                                        <tr>
                                            <th>{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                            <td>4.600.630</td>
                                        </tr>
                                        <tr>
                                            <th>{this.props.language.cashadvance.header.advancefee}</th>
                                            <td>
                                                <input type="hidden" id="mvTotalPrice" value={this.calculate()} />
                                                {this.calculate() || 0}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>{this.props.language.cashadvance.header.advanceamount}</th>
                                            <td>
                                                <FormGroup>
                                                    <input type="number" name="volume" min="0" onChange={this.onChange}  id="volume" required />
                                                </FormGroup>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </Table>
                                <div className="group-btn-action cashadvance-action">
                                    <span>
                                        <Button className="btn btn-default" type="submit" className="submit">
                                            Submit
                                        </Button>
                                        <Button className="btn btn-default" type="reset" className="cancel">
                                            Clear
                                        </Button>
                                    </span>
                                </div>
                            </FormGroup>
                            <Popup
                                id='cashadvance'
                                show={this.state.isShow}
                                onHide={lgClose}
                                advanceAmount={this.mvVolume}
                                language={this.props.language}
                                title = {this.props.language.cashadvance.popup.title}/>
                        </Form>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-8" style={{paddingRight:"2px", paddingLeft: "2px",}}>
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.cashadvance.header.cashadvancetransaction}</span>
                        </div>
                        <div>
                            <SearchBar
                                id={this.id+"-searchbar2"}
                                onSearch={[]}
                                buttonAction={buttonActionCashAdTrans}
                                stockList={[]}
                                language={this.props.language.searchbar}
                                theme={this.props.theme}
                                columns={this.state.columns2}
                                onChangeStateColumn={this.onCashAdTransChangeStateColumn.bind(this)}
                                hideSearchButton={true}
                                param={['dropdown']} />
                            <DataUpperTable
                                id={this.id + "-table2"}
                                columns={this.state.columns2}
                                maxRows={5}
                                defaultPageSize={15}/>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
                    <span>{this.props.language.cashadvance.header.ordermatchinglist}</span>
                </div>
                <SearchBar
                    id={this.id+"-searchbar1"}
                    onSearch={[]}
                    buttonAction={buttonActionOrderMatchList}
                    stockList={[]}
                    language={this.props.language.searchbar}
                    theme={this.props.theme}
                    columns={this.state.columns1}
                    onChangeStateColumn={this.onOrderMatchListChangeStateColumn.bind(this)}
                    hideSearchButton={true}
                    param={['dropdown']} />
                <DataUpperTable
                    id={this.id + "-table1"}
                    columns={this.state.columns1}
                    maxRows={10}
                    defaultPageSize={15}/>
            </div>
        );
    }

    // page change of cash advance transaction (table 1)
    onCashAdTransChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns2: this.state.columns2.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onCashAdTransNextPage(){
        if(this.state.cashAdTransPageIndex > 0){
            this.state.cashAdTransPageIndex = parseInt(this.state.cashAdTransPageIndex) + 1
            //this.paramshkscashtranhis['start'] = (this.state.cashAdTransPageIndex - 1) * this.paramshkscashtranhis['limit']
            //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onCashAdTransPrevPage(){
        if(this.state.cashAdTransPageIndex > 1){
            this.state.cashAdTransPageIndex = parseInt(this.state.cashAdTransPageIndex) - 1
            //this.paramshkscashtranhis['start'] = (this.state.cashAdTransPageIndex - 1) * this.paramshkscashtranhis['limit']
            //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onCashAdTransReloadPage(){
        //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }
    onCashAdTransPageChange(pageIndex) {
        if(pageIndex > 0){
            this.state.cashAdTransPageIndex = pageIndex
            //this.paramshkscashtranhis['start'] = (this.state.cashAdTransPageIndex - 1) * this.paramshkscashtranhis['limit']
            //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    // page change of order matching list (table 2)
    onOrderMatchListChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns1: this.state.columns1.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onOrderMatchListNextPage(){
        if(this.state.orderMatchListPageIndex > 0){
            this.state.orderMatchListPageIndex = parseInt(this.state.orderMatchListPageIndex) + 1
            //this.paramshkscashtranhis['start'] = (this.state.orderMatchListPageIndex - 1) * this.paramshkscashtranhis['limit']
            //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onOrderMatchListPrevPage(){
        if(this.state.orderMatchListPageIndex > 1){
            this.state.orderMatchListPageIndex = parseInt(this.state.orderMatchListPageIndex) - 1
            //this.paramshkscashtranhis['start'] = (this.state.orderMatchListPageIndex - 1) * this.paramshkscashtranhis['limit']
            //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onOrderMatchListReloadPage(){
        //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }
    onOrderMatchListPageChange(pageIndex) {
        if(pageIndex > 0){
            this.state.orderMatchListPageIndex = pageIndex
            //this.paramshkscashtranhis['start'] = (this.state.orderMatchListPageIndex - 1) * this.paramshkscashtranhis['limit']
            //this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }
    ////
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
