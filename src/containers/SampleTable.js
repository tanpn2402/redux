import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Table, Column, Cell} from 'fixed-data-table-2';


class SampleTable extends Component {

  constructor(){
    super()

    this.state = {
      columnWidths: {
        firstname: 240,
        latname: 150,
        key1: 140,
        key2: 140,
        key3: 140,
        key4: 140,
        key5: 140,
      },
    };

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

// IAM TAN BEST CODER VIET NAM
// IAM TAN BEST BOY VIET NAM
// IAM TAN BEST STUDENT ON AROUND THE WORLD
// SMOAZZZ <3 

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  render() {
    return (
      <Table
        rowHeight={35}
        headerHeight={35}
        rowsCount={10}
        width={1000}
        height={500}
        isColumnResizing={false}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        >
        <Column
          columnKey='firstname'
          header={<Cell>First Name</Cell>}
          cell={<Cell>Column 1 static content</Cell>}
          fixed={true}
          width={this.state.columnWidths.firstname}
           isResizable={true}
        />
        <Column
          columnKey='latname'
          header={<Cell>Last Name</Cell>}
          cell={<Cell>Column </Cell>}
          fixed={false}
          width={this.state.columnWidths.latname}
           isResizable={true}
        />
        <Column
          columnKey='key1'
          header={<Cell>City</Cell>}
          cell={<Cell>Column </Cell>}
          width={200}
          fixed={false}
           isResizable={true}
        />
        <Column
          columnKey='key2'
          header={<Cell>City</Cell>}
          cell={<Cell>Column </Cell>}
          width={200}
           isResizable={true}
        />
        <Column
          columnKey='key3'
          header={<Cell>City</Cell>}
          cell={<Cell>Column </Cell>}
          width={200}
           isResizable={true}
        />
        <Column
          columnKey='key4'
          header={<Cell>City</Cell>}
          cell={<Cell>Column </Cell>}
          width={200}
           isResizable={true}
        />
        <Column
          columnKey='key5'
          header={<Cell>City</Cell>}
          cell={<Cell>Column </Cell>}
          width={200}
           isResizable={true}
        />
      </Table>
    )
  }
}

const mapStateToProps = (state, props) => ({
 
})

const mapDispatchToProps = (dispatch, props) => ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleTable);


