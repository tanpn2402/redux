import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Popup from '../Popup'
import moment from 'moment'

class OrderConfirmation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns: [
                {
                    // Create a select-all checkbox
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'mvTradeTime',
                    Header: this.props.language.orderconfirmation.header.tradetime,
                    accessor: 'mvTradeTime',
                    width: 140,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: this.props.language.orderconfirmation.header.marketid,
                    accessor: 'mvMarketID',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockID',
                    Header: this.props.language.orderconfirmation.header.stockid,
                    accessor: 'mvStockID',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.orderconfirmation.header.buysell,
                    accessor: 'mvBS',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderType',
                    Header: this.props.language.orderconfirmation.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.orderconfirmation.header.quantity,
                    accessor: 'mvQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.orderconfirmation.header.price,
                    accessor: 'mvPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.orderconfirmation.header.status,
                    accessor: 'mvStatus',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledQty',
                    Header: this.props.language.orderconfirmation.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledPrice',
                    Header: this.props.language.orderconfirmation.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvCancelQty',
                    Header: this.props.language.orderconfirmation.header.cancelquantity,
                    accessor: 'mvCancelQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
        }
        this.pageIndex = 1

        this.rowSelected = []
        this.id = 'orderconfirmation'

        this.param = {
            start: 0,
            limit: 15,
            mvBS: 'A',
            page: 1,
            mvOrderType: 'ALL',
            mvMarket: 'ALL',
            mvInstrumentID: 'ALL',
            mvStatus: 'ALL',
            mvSorting: 'InputTime desc',
            mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        }
    }

    render() {
        console.log(this.props)
        var data = this.props.data.mvOrderBeanList === undefined ? [] : this.props.data.mvOrderBeanList
        var page = this.props.data.mvPage === undefined ? [] : this.props.data.mvPage
        let lgClose = () => this.setState({ lgShow: false })

        let buttonAction = [
            <Pagination
                    pageIndex={this.state.pageIndex} 
                    totalRecord={this.props.data.mvTotalOrders} 
                    onPageChange={this.onPageChange.bind(this)}
                    onNextPage={this.onNextPage.bind(this)}
                    onPrevPage={this.onPrevPage.bind(this)}
                    onReloadPage={this.onReloadPage.bind(this)}
		    onExportExcel={this.onExportExcel.bind(this)}
                />,

            <Button bsStyle="primary" type="button" onClick={() => this.showPopup()}>Thực hiện</Button>
        ]
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
                <div className="component-main">
                    <DataUpperTable
                        id={this.id + '-table'}
                        defaultPageSize={15}
                        onRowSelected={this.onRowSelected.bind(this)}
                        columns={this.state.columns}
                        data={data.slice((this.state.pageIndex - 1) * 15 + 1, this.state.pageIndex * 15 + 1)}
                    />
                </div>
                <div className="component-body">
                    <SearchBar
                        id={this.id}
                        onSearch={this.onSearch.bind(this)}
                        buttonAction={buttonAction}
                        stockList={this.props.stockList}
                        language={this.props.language.searchbar}
                        theme={this.props.theme}
                        columns={this.state.columns}
                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                        param={['mvMarket', 'mvStockId', 'mvOrderType', 'mvBuysell', 'mvStartDate', 'mvEndDate', 'dropdown']} />
                        
                    <Popup
                        id={this.id}
                        show={this.state.lgShow} onHide={lgClose}
                        rowSelected={this.rowSelected} language={this.props.language}
                        title={this.props.language.orderconfirmation.popup.title}
                    />
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.props.onSearch(this.param)
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all').checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.data.mvOrderBeanList !== undefined ? this.props.data.mvOrderBeanList : []
            else
                this.rowSelected = []
        }
        else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            }
            else {
                this.rowSelected.splice(index, 1)
            }

            if (document.getElementsByClassName(this.id + '-row-checkbox').length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all").checked = true
            else
                document.getElementById(this.id + "-cb-all").checked = false
        }
        console.log('onRowSelected', this.rowSelected)
    }

    showPopup() {
        this.setState({
            lgShow: true
        });
        // console.log('onConfirmOrder', this.rowSelected)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        if(pageIndex > 0){
            this.state.pageIndex = pageIndex
            
        }  
    }

    onNextPage(){
        if(this.state.pageIndex > 0){
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        
        }
    }

    onPrevPage(){
        if(this.state.pageIndex > 1){
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
           
        }
    }

    onReloadPage(){
        //this.props.onSearch(this.param, !this.props.reload)
    }
    onSearch(param) {
        if (param.mvStockId === "")
            param.mvStockId = "ALL"
        this.param['mvOrderType'] = param.mvOrderType;
        this.param['mvMarketID'] = param.mvMarket;
        this.param['mvStartTime'] = param.mvStartDate;
        this.param['mvEndTime'] = param.mvEndDate;
        this.param['mvBS'] = param.mvBuysell;
        this.param['mvInstrumentID'] = param.mvStockId;
        this.param['mvStatus'] = "ALL";
        this.param['mvSorting'] = "InputTime desc";
        this.param['page'] = this.pageIndex;
        this.param['start'] = (this.pageIndex - 1) * 15;
        this.param['limit'] = 15

        this.props.onSearch(this.param)
    }

    onExportExcel() {

        this.props.onExportExcel(this.exportParams)
    }

    onConfirmOrder(param) {
        console.log(param)
        this.rowSelected = []
        this.rowSelected.push(param)
        console.log(this.rowSelected, "row selected")
        this.showPopup();
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.orderconfirmation.data,
        //reload: state.orderconfirmation.reload,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param) => {
        dispatch(actions.getOrderCofirm(param))
    },
    onConfirmOrder: (param) => {
        dispatch(actions.onConfirmSubmit(param))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportOrderConfirm(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)