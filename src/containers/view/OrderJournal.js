import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class OrderJournal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          hiddenColumns: {},
        };
        this.columns = [
            {
                id: 'cb',
                Header: props => <input type='checkbox' />,
                maxWidth: 50,
                Cell: props => <input type='checkbox' />,
                sortable: false,
                
            },
            {
                id: 'code',
                Header: 'Code',
                accessor: 'stockid',
                width: 80,
                show: this.state.hiddenColumns['code'] === undefined ? false : this.state.hiddenColumns['code'],
            },
            {
                id: 'name',
                Header: 'Name',
                accessor: 'title',
                width: 100,
                show: !this.state.hiddenColumns['name'],
            },
            {
                id: 'ordertype',
                Header: 'Order Type',
                accessor: 'ordertype',
                width: 100,
                show: !this.state.hiddenColumns['ordertype'],
            },
            {
                id: 'status',
                Header: 'Status',
                accessor: 'status',
                width: 80,
                show: !this.state.hiddenColumns["status"],
            },
            {
                id: 'price',
                Header: 'Price',
                accessor: 'price',
                width: 80,
                show: !this.state.hiddenColumns.price,
            },
            {
                id: 'quantity',
                Header: 'Quantity',
                accessor: 'quantity',
                width: 80,
                show: !this.state.hiddenColumns.quantity,
            },
            {
                id: 'canQty',
                Header: 'Can Quantity',
                accessor: 'canQty',
                width: 100,
                show: !this.state.hiddenColumns.canQty,
            },
            {
                id: 'date',
                Header: 'Datetime',
                accessor: 'date',
                width: 150,
                show: !this.state.hiddenColumns.date,
            },

        ]
    }

    componentWillMount(){
        this.props.onStockSearch('vi')
    }
    changeColumn(e) {
        const p = e.target.id;
        this.setState({
        hiddenColumns: Object.assign(this.state.hiddenColumns,
        {
            [p]: !this.state.hiddenColumns[p],
        }
        ) });
        console.log(this.state.hiddenColumns)
            
    }
  
    render() {
        
        return (

            <div>
                <SearchBar stockList={this.props.stockSearchList} language={this.props.language}
                columns={this.columns} hiddenColumns={this.state.hiddenColumns} changeColumn={this.changeColumn.bind(this)}/>
                <DataTable columns={this.columns}/>
            </div>
        )
        
    }

}
const mapStateToProps = (state) => {
  return {
    stockSearchList: state.stockSearchAction.stockSearchList,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onStockSearch: (language) => {
    dispatch(actions.stockSearch(language))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderJournal)
