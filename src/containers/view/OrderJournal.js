import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import Popup from '../Popup'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'

class OrderJournal extends Component {
    constructor(props) {
        super(props)


        this.state = {
            columns: [
                {
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y')
                            return (
                                <input type='checkbox' className={this.id + "-row-checkbox"}
                                    onChange={() => { this.onRowSelected(props.original) }} />
                            )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'can',
                    Header: this.props.language.orderjournal.header.cancelmodify,
                    maxWidth: 80,
                    Cell: props => {
                        var child = []
                        if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y')
                            child.push(<Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" type="button"
                                onClick={() => this.onCancelButton(props.original)}><span className="glyphicon glyphicon-remove"></span></Button>)
                        if (props.original.mvShowModifyIcon !== null && props.original.mvShowModifyIcon === 'Y')
                            child.push(<Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" type="button"
                                onClick={() => this.onModifyButton(props.original)}><span className="glyphicon glyphicon-edit"></span></Button>)
                        return (
                            <span>
                                {
                                    child
                                }
                            </span>)
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'mvStockID',
                    Header: this.props.language.orderjournal.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.orderjournal.header.buysell,
                    accessor: 'mvBS',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.orderjournal.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.orderjournal.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPendingQty',
                    Header: this.props.language.orderjournal.header.pendingQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvExecutedQty',
                    Header: this.props.language.orderjournal.header.executedQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAvgPrice',
                    Header: this.props.language.orderjournal.header.avgprice,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.orderjournal.header.status,
                    accessor: 'mvStatus',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderType',
                    Header: this.props.language.orderjournal.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFeeTax',
                    Header: this.props.language.orderjournal.header.feetax,
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBankID',
                    Header: this.props.language.orderjournal.header.bankid,
                    accessor: 'mvBankID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvExpiryDate',
                    Header: this.props.language.orderjournal.header.expirydate,
                    accessor: 'mvDateTime',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvRejectReason',
                    Header: this.props.language.orderjournal.header.rejectreason,
                    accessor: 'mvRejectReason',
                    width: 80,
                    skip: false,
                    show: true,
                },

            ],
            lgShow: false,
            pageIndex: 1,
        }

        //this.buttonAction = [<Button bsStyle="primary" type="button" onClick={() => this.showPopup()}>Hủy GD</Button>,]
        this.rowSelected = []
        this.popupType = 'none'
        this.id = 'orderjournal'

        this.param = {
            mvStatus: "ALL",
            mvOrderType: "ALL",
            mvOrderBS: "ALL",
            page: 1,
            start: 0,
            limit: 15,
        }
    }


    render() {
        console.log(this.props)
        this.buttonAction = [
            <Pagination
                    pageIndex={this.state.pageIndex} 
                    totalRecord={this.props.data.mvTotalOrders} 
                    onPageChange={this.onPageChange.bind(this)}
                    onNextPage={this.onNextPage.bind(this)}
                    onPrevPage={this.onPrevPage.bind(this)}
                    onReloadPage={this.onReloadPage.bind(this)}
                />,

            <Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button"
                onClick={() => this.showPopup()}>Hủy GD</Button>,
        ]
        console.log('render in OrderJournal', this.props.data)
        var data = this.props.data.mvOrderBeanList === undefined ? [] : this.props.data.mvOrderBeanList
        var page = this.props.data.mvPage === undefined ? [] : this.props.data.mvPage
        let lgClose = () => this.setState({ lgShow: false })

        console.log('RENDER IN OrderJournal')
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
                <div className="component-main">
                    <DataUpperTable
                        id="orderjournal-table"
                        onRowSelected={this.onRowSelected.bind(this)}
                        columns={this.state.columns}
                        data={data}
                        maxRows={5}
                        defaultPageSize={15} />
                </div>
                <div className="component-body">
                    <SearchBar
                        id={this.id}
                        onSearch={this.onSearch.bind(this)}
                        buttonAction={this.buttonAction}
                        stockList={this.props.stockList}
                        language={this.props.language.searchbar}
                        theme={this.props.theme}
                        columns={this.state.columns}
                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                        param={['mvStatus', 'mvOrderType', 'mvBuysell', 'dropdown']} />
                    <Popup
                        id={this.id}
                        show={this.state.lgShow} onHide={lgClose}
                        rowSelected={this.rowSelected} language={this.props.language}
                        popupType={this.popupType} modifyData={this.props.modifyData} title={this.title} />
                </div>
            </div>
        )

    }

    componentDidMount() {
        this.props.onSearch(this.param)

    }

    onCancelButton(param) {
        console.log(param)
        this.rowSelected = []
        this.rowSelected.push(param)
        console.log(this.rowSelected, 'ádads')
        this.showPopup();

    }

    onModifyButton(param) {
        this.rowSelected = []
        this.rowSelected.push(param)
        this.showPopup()
        this.popupType = 'MODIFYORDER'
        this.title = this.props.language.orderjournal.popup.title.modify
        var data = {};
        console.log(this.rowSelected[0])
        data['mvInstrument'] = this.rowSelected[0].mvStockID;
        data['mvMarketId'] = this.rowSelected[0].mvMarketID;
        data['mvEnableGetStockInfo'] = 'N'
        data['mvAction'] = 'OI,BP,FE'
        data['mvBS'] = 'B'
        this.props.getStockInfo(data)
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById('orderjournal-cb-all').checked
            var checkboxes = document.getElementsByClassName('orderjournal-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.data.mvOrderBeanList !== undefined ?
                    this.props.data.mvOrderBeanList.filter(el => el.mvShowCancelIcon !== null && el.mvShowCancelIcon === 'Y') : []
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

            if (document.getElementsByClassName("orderjournal-row-checkbox").length === this.rowSelected.length)
                document.getElementById("orderjournal-cb-all").checked = true
            else
                document.getElementById("orderjournal-cb-all").checked = false
        }
        console.log('onRowSelected', this.rowSelected)
    }

    showPopup() {
        // get all row selected
        this.setState({
            lgShow: true
        });
        this.title = this.props.language.orderjournal.popup.title.cancel
        this.popupType = 'CANCELORDER'
        console.log('onCancelOrder', this.rowSelected)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });

        //console.log(this.state.columns)
    }

    onPageChange(pageIndex) {
        if(pageIndex > 0){
            this.state.pageIndex = pageIndex
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }  
    }

    onNextPage(){
        if(this.state.pageIndex > 0){
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onPrevPage(){
        if(this.state.pageIndex > 1){
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onReloadPage(){
        this.props.onSearch(this.param, !this.props.reload)
    }

    onSearch(param) {
        this.param['mvStatus'] = param.mvStatus
        this.param['mvOrderType'] = param.mvOrderType
        this.param['mvOrderBS'] = param.mvBuysell
        console.log('orderjournal Page', this.state.pageIndex)
        this.param['page'] = this.state.pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']

        console.log('orderjournal onSearch', this.param)
        this.props.onSearch(this.param, !this.props.reload)
    }


}
const mapStateToProps = (state) => {
    return {
        data: state.orderjournal.data,
        reload: state.orderjournal.reload,
        modifyData: state.orderjournal.dataresult,
        menuid: state.orderjournal.menuid,

    }
}

const mapDispatchToProps = (dispatch, props) => ({

    onSearch: (param, reload) => {
        dispatch(actions.getEnquiry(param, reload))
    },
    getStockInfo: (param) => {
        dispatch(actions.getstockInfo(param))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(OrderJournal)
