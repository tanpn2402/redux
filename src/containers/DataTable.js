import React from "react";
import {Checkbox, Pagination} from 'react-bootstrap'
import ReactTable from "react-table"
import "react-table/react-table.css"
import Footer from './DataTableFooter'
export default class App extends React.Component {
  constructor() {
    super();
    
    



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
            data={this.props.data}
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
