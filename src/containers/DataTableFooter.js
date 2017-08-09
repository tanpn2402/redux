import React from "react";
import {Checkbox, Pagination} from 'react-bootstrap'
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class DataTableFooter extends React.Component {
  constructor() {
    super()
    this.style = {
      fontSize: '12px',
      height: '100%',
    }
  }
  render() {
    return (
        <div>
          <Pagination
              bsSize="small"
              items={5}
              /*activePage={this.state.activePage}
              onSelect={this.handleSelect}*/ />


        </div>
    );
  }
}
