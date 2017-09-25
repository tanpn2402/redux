import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class OddLotOrder extends Component {
    constructor(props) {
        super(props)

        this.id = 'oddLotOrder'
        this.rowSelected = []
        this.state = {
            oddLotOrderPageIndex: 1,
            columns: [
                {
                    // Create a select-all checkbox
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                                onChange={() => { this.onRowSelected(props.original)}} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'stockID',
                    Header: this.props.language.oddlottrading.header.stockid,
                    accessor: 'stockCode',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'TradingQty',
                    Header: this.props.language.oddlottrading.header.tradingquantity,
                    accessor: 'settledBal',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'OddLotQty',
                    Header: this.props.language.oddlottrading.header.oddlotquantity,
                    accessor: 'oddLotQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'Curprice',
                    Header: this.props.language.oddlottrading.header.currentprice,
                    accessor: 'nominalPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'ExePrice',
                    Header: this.props.language.oddlottrading.header.exeprice,
                    accessor: 'collectionPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ]
        }
        this.defaultPageSize = 15
        this.paramsEnquiryOddLot = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ODDLOTENQUIRY'
        }
    }


    render() {
        let oddLotOrder = this.props.oddlotenquiry
        let buttonActionOddLotOrder = [
            <button style={this.props.theme.buttonClicked} className="hks-btn" type="button"
                onClick={this.registerOddLotOrder.bind(this)}>
                {this.props.language.oddlottrading.header.register}
            </button>
        ]
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeOddLotOrderStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main">
                        <Table
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            defaultPageSize={this.defaultPageSize}
                            data={oddLotOrder.oddLotList.slice( 
                                        (this.state.oddLotOrderPageIndex - 1)*this.defaultPageSize, 
                                        this.state.oddLotOrderPageIndex*this.defaultPageSize )}/>
                    </div>
                    <div className="table-header">
                        <SearchBar
                            key={this.id+ '-search'}
                            id={this.id+ '-search'}
                            buttonAction={buttonActionOddLotOrder}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{stockList: []}}
                            param={[ 'dropdown']}/>
                    </div>
                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.oddLotOrderPageIndex}
                            totalRecord={Math.ceil(oddLotOrder.oddLotList.length / this.defaultPageSize)}
                            onPageChange={this.onOddLotOrderPageChange.bind(this)}
                            onNextPage={this.onOddLotOrderNextPage.bind(this)}
                            onPrevPage={this.onOddLotOrderPrevPage.bind(this)}
                        />
                    </div>

                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.oddLotEnquiry(this.paramsEnquiryOddLot, !this.props.reload);
    }

    onOddLotOrderNextPage(){
        this.setState({oddLotOrderPageIndex: parseInt(this.state.oddLotOrderPageIndex) + 1})
    }

    onOddLotOrderPrevPage(){
        this.setState({ oddLotOrderPageIndex: parseInt(this.state.oddLotOrderPageIndex) - 1 })
    }

    onOddLotOrderPageChange(pageIndex) {
        this.setState({ oddLotOrderPageIndex: pageIndex })
    }



    onChangeOddLotOrderStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    registerOddLotOrder(e) {
        e.preventDefault();
        if(this.rowSelected.length > 0){
            this.props.beforeRegisterOddLot({
                language: this.props.language,
                data: {rowSelected: this.rowSelected, me: this}
            })
        }
        else {
            this.props.onShowMessageBox('asd', 'Vui long chon 1 ma CK')
        }
    }

    reloadData(){
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.props.onshowenquiry(this.paramsEnquiryOddLot)
        this.props.onshowhistory(this.paramsOddLotHisEnquiry)
    }

}
const mapStateToProps = (state) => {
    return {
        oddlotenquiry: state.oddlottrading.oddlotenquiry,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    oddLotEnquiry: (param) => {
        dispatch(actions.getOddlotEnquiry(param))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    beforeRegisterOddLot: (params) => {
        dispatch(actions.beforeRegisterOddLot(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotOrder)
