import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'

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
        console.log('render in OrderHistory', this.props.language.ordershistory.header.stockid)
        var data = this.props.data.mvOrderBeanList === undefined ? [] : this.props.data.mvOrderBeanList
        var pageIndex = this.props.data.mvPage === undefined ? 1 : this.props.data.mvPage.pageIndex
        var totalRecord = this.props.data.mvTotalOrders === undefined ? 1 : this.props.data.mvTotalOrders
        console.log(totalRecord, pageIndex)
       
        return (
            <div id={this.id + '-body'} className="layout-body">
                <SearchBar
                    id={this.id}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={[]} 
                    stockList={this.props.stockList} 
                    language={this.props.language.searchbar} 
                    theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={['mvStockId', 'mvBuysell', 'mvStartDate', 'mvEndDate', ]}/>
                
                <DataTable
                    id={this.id + "-table" }
                    columns={this.state.columns}
                    data={data}/>

                <Footer pageIndex={pageIndex} totalRecord={totalRecord} onPageChange={this.onPageChange.bind(this)}/>

            </div>
        )

    }

    componentDidMount() {
        this.props.enquiryOrderHistory('null')
    }

    onSearch(param){
        this.props.enquiryOrderHistory(param)
    }

     onPageChange(pageIndex){
        console.log(this.id + ' onPageChange', pageIndex)
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
