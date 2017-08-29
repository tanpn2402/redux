import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'

class OrderHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns : [
              {
                  id: 'mvOrderGroupID',
                  Header: this.props.language.ordershistory.header.ordergroupid,
                  accessor: 'mvOrderGroupID',
                  width: 80,
                  skip: false,
                  show: true,
              },
              {
                  id: 'mvmatchedDate',
                  Header: this.props.language.ordershistory.header.matcheddate,
                  accessor: 'matchedDate',
                  width: 80,
                  skip: false,
                  show: true,
              },
            {
                id: 'mvStockID',
                Header: this.props.language.ordershistory.header.stockid,
                accessor: 'mvStockID',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvMarketID',
                Header: this.props.language.ordershistory.header.marketid,
                accessor: 'mvMarketID',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvBS',
                Header: this.props.language.ordershistory.header.buysell,
                accessor: 'mvBS',
                width: 50,
                skip: false,
                show: true,
            },
            {
                id: 'mvPrice',
                Header: this.props.language.ordershistory.header.price,
                accessor: 'mvPrice',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvdQty',
                Header: this.props.language.ordershistory.header.quantity,
                accessor: 'mvQty',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvFilledPrice',
                Header: this.props.language.ordershistory.header.filledprice,
                accessor: 'mvFilledPrice',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvFilledQty',
                Header: this.props.language.ordershistory.header.filledquantity,
                accessor: 'mvFilledQty',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvAvgPriceValue',
                Header: this.props.language.ordershistory.header.matchedvalue,
                accessor: 'mvAvgPriceValue',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvOrderTypeValue',
                Header: this.props.language.ordershistory.header.tradingtype,
                accessor: 'mvOrderTypeValue',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvStatus',
                Header: this.props.language.ordershistory.header.matchedorderstatus,
                accessor: 'mvStatus',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvInputTime',
                Header: this.props.language.ordershistory.header.matcheddate,
                accessor: 'mvInputTime',
                width: 80,
                skip: false,
                show: true,
            },


            ]
        }

        this.id = 'ordershistory'
        this.pageIndex = 1

        this.params = {
            start: 1,
            limit: 15,
            mvBS: 'ALL',
            mvStartTime: '',
            mvEndTime: '',
        }

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns : 
            [
                {
                    id: 'mvOrderGroupID',
                    Header: nextProps.language.ordershistory.header.ordergroupid,
                    accessor: 'mvOrderGroupID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvmatchedDate',
                    Header: nextProps.language.ordershistory.header.matcheddate,
                    accessor: 'matchedDate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockID',
                    Header: nextProps.language.ordershistory.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: nextProps.language.ordershistory.header.marketid,
                    accessor: 'mvMarketID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: nextProps.language.ordershistory.header.buysell,
                    accessor: 'mvBS',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: nextProps.language.ordershistory.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvdQty',
                    Header: nextProps.language.ordershistory.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledPrice',
                    Header: nextProps.language.ordershistory.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledQty',
                    Header: nextProps.language.ordershistory.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAvgPriceValue',
                    Header: nextProps.language.ordershistory.header.matchedvalue,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderTypeValue',
                    Header: nextProps.language.ordershistory.header.tradingtype,
                    accessor: 'mvOrderTypeValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: nextProps.language.ordershistory.header.matchedorderstatus,
                    accessor: 'mvStatus',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvInputTime',
                    Header: nextProps.language.ordershistory.header.matcheddate,
                    accessor: 'mvInputTime',
                    width: 80,
                    skip: false,
                    show: true,
                },


            ]
        });
    }

    render() {
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
        console.log('render in OrderHistory', this.props.language.ordershistory.header.stockid)
        var data = this.props.data.mvOrderBeanList === undefined ? [] : this.props.data.mvOrderBeanList
        var pageIndex = this.props.data.mvPage === undefined ? 1 : this.props.data.mvPage.pageIndex
        var totalRecord = this.props.data.mvTotalOrders === undefined ? 1 : this.props.data.mvTotalOrders
        console.log(totalRecord, pageIndex)
       
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
                <div className="component-main">
                    <DataUpperTable
                        id="orderjournal-table"
                        
                        columns={this.state.columns}
                        data={data}
                        defaultPageSize={15} />
                </div>
                <div className="component-body">
                <SearchBar
                    id={this.id}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={[]} 
                    stockList={this.props.stockList} 
                    language={this.props.language.searchbar} 
                    theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={['mvStockId', 'mvBuysell', 'mvStartDate', 'mvEndDate', 'dropdown']}/>
                
                {/* <DataTable
                    id={this.id + "-table" }
                    columns={this.state.columns}
                    data={data}/> */}

                

            </div>
            </div>
        )

    }

    componentDidMount() {
        var d = new Date()
        var today = d.getDate()+ '/' + (d.getMonth()+1) +'/'+ d.getFullYear()
        this.params['mvStartTime'] = today
        this.params['mvEndTime'] = today
        this.props.enquiryOrderHistory(this.param)
    }

    onPageChange(pageIndex) {
        if (pageIndex > 0) {
            this.state.pageIndex = pageIndex
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onNextPage() {
        if (this.state.pageIndex > 0) {
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onPrevPage() {
        if (this.state.pageIndex > 1) {
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            this.param['page'] = this.state.pageIndex
            this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
            this.props.onSearch(this.param, !this.props.reload)
        }
    }

    onReloadPage() {
        this.props.onSearch(this.param, !this.props.reload)
    }

    onSearch(param){
        
        this.params['start'] = ( this.pageIndex - 1 ) * 15
        this.params['limit'] = 15
        this.params['mvStartTime'] = param['mvStartDate']
        this.params['mvEndTime'] = param['mvStartDate']
        console.log(this.params)
        this.props.enquiryOrderHistory(param)
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }


}
const mapStateToProps = (state) => {
  return {
    data: state.orderhistory.data,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  enquiryOrderHistory: (param) => {
    dispatch(actions.enquiryOrderHistory(param))
  },
})



export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
