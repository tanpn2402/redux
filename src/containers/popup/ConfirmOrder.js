import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'

class ConfirmOrder extends Component{
    constructor(props) {
        super(props)
        this.columns = [
            {
                id: 'mvTradeTime',
                Header: this.props.language.orderconfirmation.header.tradetime,
                accessor: 'mvTradeTime',
                width: 100,
                skip: false,
                show: true,
              },
              {
                id: 'mvMarketID',
                Header: this.props.language.orderconfirmation.header.marketid,
                accessor: 'mvMarketID',
                width: 50,
                skip: false,
                show: true,
              },
              {
                id: 'mvStockID',
                Header: this.props.language.orderconfirmation.header.stockid,
                accessor: 'mvStockID',
                width: 60,
                skip: false,
                show: true,
              },
              {
                id: 'mvBS',
                Header: this.props.language.orderconfirmation.header.buysell,
                accessor: 'mvBS',
                width: 60,
                skip: false,
                show: true,
              },
              {
                id: 'mvOrderType',
                Header: this.props.language.orderconfirmation.header.ordertype,
                accessor: 'mvOrderType',
                width: 60,
                skip: false,
                show: true,
              },
              {
                id: 'mvQty',
                Header: this.props.language.orderconfirmation.header.quantity,
                accessor: 'mvQty',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvPrice',
                Header: this.props.language.orderconfirmation.header.price,
                accessor: 'mvPrice',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'mvStatus',
                Header: this.props.language.orderconfirmation.header.status,
                accessor: 'mvStatus',
                width: 100,
                skip: false,
                show: true,
              },
              {
                id: 'mvFilledQty',
                Header: this.props.language.orderconfirmation.header.filledquantity,
                accessor: 'mvFilledQty',
                width: 70,
                skip: false,
                show: true,
              },
              {
                id: 'mvFilledPrice',
                Header: this.props.language.orderconfirmation.header.filledprice,
                accessor: 'mvFilledPrice',
                width: 70,
                skip: false,
                show: true,
              },
              {
                id: 'mvCancelQty',
                Header: this.props.language.orderconfirmation.header.cancelquantity,
                accessor: 'mvCancelQty',
                width: 100,
                skip: false,
                show: true,
              },
        ],
        this.style = {
            height: '200px',
        }

        this.id = 'confirmorder-popup'
    }

    onConfirmSubmit() {
        this.props.onConfirmSubmit(this.props.rowSelected)
        this.props.onHide()
    }

    render(){
        return (
            <div className="modalbody">
                <Modal.Body>
                    <DataTable
                        id={this.id + "-table"} 
                        data={this.props.rowSelected}
                        columns={this.columns}
                        defaultPageSize={5}
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