import React from "react";
import {Checkbox, Pagination} from 'react-bootstrap'
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class App extends React.Component {
  constructor() {
    super()

    this.style = {
      fontSize: '12px'
    }
  }
  render() {
    let height = this.props.maxRows * 24 + 27 + 'px'
    return (
        <div id={this.props.id} >
          <ReactTable
            className={'datatable'}
            style={{height: height}}
            data={this.props.data}
            columns={this.props.columns}
            showPagination= {false}
            defaultPageSize= {this.props.defaultPageSize} />
        </div>
    );
  }
}
