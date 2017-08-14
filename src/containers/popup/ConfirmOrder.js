import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'

class ConfirmOrder extends Component{
    constructor(props) {
        super(props)
        this.columns = [
            {
                id: 'mvTradeTime',
                Header: this.props.language.tableheader.tradetime,
                accessor: 'mvTradeTime',
                width: 140,
                skip: false,
                show: true,
              },
              {
                id: 'mvMarketID',
                Header: this.props.language.tableheader.marketid,
                accessor: 'mvMarketID',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvStockID',
                Header: this.props.language.tableheader.stockid,
                accessor: 'mvStockID',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvBS',
                Header: this.props.language.tableheader.buysell,
                accessor: 'mvBS',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvOrderType',
                Header: this.props.language.tableheader.ordertype,
                accessor: 'mvOrderType',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvQty',
                Header: this.props.language.tableheader.quantity,
                accessor: 'mvQty',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvPrice',
                Header: this.props.language.tableheader.price,
                accessor: 'mvPrice',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvStatus',
                Header: this.props.language.tableheader.status,
                accessor: 'mvStatus',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvFilledQty',
                Header: this.props.language.tableheader.filledquantity,
                accessor: 'mvFilledQty',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvFilledPrice',
                Header: this.props.language.tableheader.filledprice,
                accessor: 'mvFilledPrice',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvCancelQty',
                Header: this.props.language.tableheader.cancelquantity,
                accessor: 'mvCancelQty',
                width: 80,
                skip: false,
                show: true,
              },
        ],
        this.style = {
            height: '200px',
        }
    }

    onConfirmSubmit() {
        this.props.onConfirmSubmit(this.props.rowSelected)
        this.props.onHide()
    }

    render(){
        return (
            <div>
                <Modal.Body>
                    <ReactTable
                        className={'datatable'}
                        data={this.props.rowSelected}
                        columns={this.columns}
                        style={this.style}
                        showPagination= {false}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button onClick={this.onConfirmSubmit.bind(this)}>Submit</Button>
                </Modal.Footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      returnCode: state.orderconfirmation.returnCode,
      message: state.orderconfirmation.message,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onConfirmSubmit: (param) => {
        dispatch(actions.onConfirmSubmit(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps) (ConfirmOrder)