import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(100);

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,  // enable click to select
  bgColor: '#f5f5ef'
};

const options = {
  paginationSize: 5,
  sizePerPage: 10,
  sizePerPageList: [10],
  exportCSVText: 'Export',
  noDataText: 'This is custom text for empty data'
};


export default class BasicTable extends React.Component {
  render() {
    return (
      <BootstrapTable data={ products } /*exportCSV*/ condensed hover options={ options } pagination selectRow={ selectRowProp } scrollTop={ 'Bottom' }>
          <TableHeaderColumn width='100' dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn width='200' dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn width='200' dataField='price'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}