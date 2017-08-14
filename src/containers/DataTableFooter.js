import React from "react";
import {FormGroup, ControlLabel, Pagination} from 'react-bootstrap'
import ReactTable from "react-table"
import "react-table/react-table.css"
import { connect } from 'react-redux'
import * as actions from '../actions'

export default class DataTableFooter extends React.Component {
  constructor() {
    super()
  }

  componentWillMount(){
    
  }

  render() {
    const windowid = this.props.windowid
    console.log(windowid)
    return (
        <div className="table-footer">
          <Pagination
              bsClass="pagination pagination-sm"
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={5}
              maxButtons={5}
              activePage={this.props.page.pageIndex}
              onSelect={(eventKey) => this.props.onPageChange(eventKey)}/>

          <p className="footer-page">
            1-5/5
          </p>

        </div>
    );
  }
}
