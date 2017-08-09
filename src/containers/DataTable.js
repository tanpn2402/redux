import React from "react";
import {Checkbox, Pagination} from 'react-bootstrap'
import ReactTable from "react-table"
import "react-table/react-table.css"
import Footer from './DataTableFooter'
export default class App extends React.Component {
  constructor() {
    super();
    
    this.data = [
    {
        stockid:  'ABC',
        title: 'ABC bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VCB',
        title: 'VietcomBank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'SAM',
        title: 'SacomBank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },
    {
        stockid:  'VPB',
        title: 'VP Bank',
        ordertype: 'B',
        status: 'CAN',
        date: '01/01/2010',
        quantity: 200,
        price: 300,
        canQty: 120,
    },

    ]


    this.style = {
      height: '100%',
    }

    this.style1 = {
      fontSize: '12px',
    }
  }
  render() {
    
    return (
        <div style={this.style}>
          <ReactTable
            className={'datatable'}
            style={this.style1}
            data={this.data}
            columns={this.props.columns}
            showPagination= {false}
            defaultPageSize={15}
            /*className="-striped -highlight"*/
          />
          
          <Footer />
        </div>
    );
  }
}
