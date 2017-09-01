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
        this.params = {
            mvLastAction: '',
            mvChildLastAction: '',
            start: '0',
            limit: '15',
            page: '',
            queryBank: '',

        }

        this.state = {
            formValues: {},
            isShow: false,
            columns1: [
                {
                    Header: this.props.language.cashadvance.header.id,
                    accessor: 'mvOrderID',
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.matchingdate,
                    accessor: 'tradeDate',
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.paymentdate,
                    accessor: 'cashSettleDay',
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.stock,
                    accessor: 'mvStockID',
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.volume,
                    accessor: 'mvQuantity',
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.value,
                    accessor: 'mvAmount',
                    id: 'value',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.fee,
                    accessor: 'tradingFee',
                    id: 'fee',
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvance.header.date,
                    accessor: 'creationTime',
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.advanceamount,
                    accessor: 'totalLendingAmt',
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: this.props.language.cashadvance.header.advancefee,
                    accessor: 'fee',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.processingstatus,
                    accessor: 'status',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.note,
                    accessor: 'remark',
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
                    accessor: 'mvOrderID',
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.matchingdate,
                    accessor: 'tradeDate',
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.paymentdate,
                    accessor: 'cashSettleDay',
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.stock,
                    accessor: 'mvStockID',
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.volume,
                    accessor: 'mvQuantity',
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.value,
                    accessor: 'mvAmount',
                    id: 'value',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: nextProps.language.cashadvance.header.fee,
                    accessor: 'tradingFee',
                    id: 'fee',
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
            columns2: [
                {
                    Header: nextProps.language.cashadvance.header.date,
                    accessor: 'creationTime',
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.advanceamount,
                    accessor: 'totalLendingAmt',
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: nextProps.language.cashadvance.header.advancefee,
                    accessor: 'fee',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.processingstatus,
                    accessor: 'status',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: nextProps.language.cashadvance.header.note,
                    accessor: 'remark',
                    id: 'note',
                    show: true,
                    skip: false,
                    width: 120,
                }
            ],

        });
    }

    render() {

        var SoldOrders = this.props.SoldOrders.mvChildBeanList === undefined ? [] : this.props.SoldOrders.mvChildBeanList
        var CashAdvanceHistory = this.props.CashAdvanceHistory.list
        var LocalAdvance = this.props.LocalAdvance.mvAdvanceBean
        console.log(this.props.SoldOrders)
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
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
            <div className="component-main cashadvance">
                <div className="cashadvance-history">
                    <div className="cashadvance-form" style={{paddingRight:"2px", paddingLeft: "2px",}}>
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
                    <div className="cashadvance-his-table" style={{paddingRight:"2px", paddingLeft: "2px",}}>
                        <div className="table-main">
                            <DataUpperTable
                                id={this.id + "-table2"}
                                columns={this.state.columns2}
                                maxRows={5}
                                defaultPageSize={15}/>
                        </div>
                        <div className="table-header">
                            <div className="title" style={this.props.theme.porfolio.titlestock}>
                                <span>{this.props.language.cashadvance.header.cashadvancetransaction}</span>
                            </div>
                        
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
                                param={['dropdown']}
                                data={CashAdvanceHistory} />
                        </div>
                        
                    </div>
                </div>

                <div className="cashadvance-order-matching">
                    <div className="table-main">
                        <DataUpperTable
                            id={this.id + "-table1"}
                            columns={this.state.columns1}
                            maxRows={10}
                            defaultPageSize={15}/>
                    </div>
                    <div className="table-header">
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
                            data={SoldOrders}
                            onChangeStateColumn={this.onOrderMatchListChangeStateColumn.bind(this)}
                            hideSearchButton={true}
                            param={['dropdown']} />
                    </div>

                </div>
            </div>
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

    componentDidMount(){
        this.props.getQuerySoldOrders(this.params, !this.props.reload);
        this.props.getCashAdvance(this.params, !this.props.reload);
        this.props.getLocalAdvanceCreation(this.params, !this.props.reload);
    }
}


const mapStateToProps = (state) => {
    return {
        SoldOrders: state.cashadvance.SoldOrders,
        CashAdvanceHistory: state.cashadvance.CashAdvanceHistory,
        LocalAdvance: state.cashadvance.LocalAdvance,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getQuerySoldOrders: (params) => {
        dispatch(actions.getQuerySoldOrders({mvLastAction: '', mvChildLastAction: '', start: '', limit: '', page: ''}))
    },
    getCashAdvance: (params) => {
        dispatch(actions.getCashAdvance({mvLastAction: '', mvChildLastAction: '', start: '', limit: '', page: '', queryBank: ''}))
    },
    getLocalAdvanceCreation: (params) => {
        dispatch(actions.getLocalAdvanceCreation({mvLastAction: '', mvChildLastAction: ''}))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(CashAdvance)
