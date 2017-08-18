import React from "react";
import {Checkbox, Pagination} from 'react-bootstrap'
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class App extends React.Component {
  constructor() {
    super()
   
    this.style = {
      fontSize: '12px',
      height: '100%',
    }
   
  }
  render() {
    console.log("Annn ",this.props.data)
    const defaultPageSize = this.props.defaultPageSize === undefined ? 15 : this.props.defaultPageSize
    return (
        <div id={this.props.id} >
          <ReactTable
            className={'datatable'}
            style={this.style}
            data={this.props.data}
            columns={this.props.columns}
            showPagination= {false}
            defaultPageSize={defaultPageSize}
            /*className="-striped -highlight"*/
          />
        </div>
    );
  }
}
