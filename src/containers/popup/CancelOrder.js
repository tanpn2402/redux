//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
class CancelOrder extends Component{
    constructor(props) {
        super(props)
        this.columns = [{
                    id: 'mvStockID',
                    Header: this.props.language.tableheader.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.tableheader.buysell,
                    accessor: 'mvBS',
                    width: 50,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.tableheader.price,
                    accessor: 'mvPrice',
                    width: 80,
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.tableheader.quantity,
                    accessor: 'mvQty',
                    width: 80,
                },
                {
                    id: 'mvPendingQty',
                    Header: this.props.language.tableheader.pendingQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                },
                {
                    id: 'mvExecutedQty',
                    Header: this.props.language.tableheader.executedQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                },
                {
                    id: 'mvAvgPrice',
                    Header: this.props.language.tableheader.avgprice,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.tableheader.status,
                    accessor: 'mvStatus',
                    width: 80,
                },
                {
                    id: 'mvOrderType',
                    Header: this.props.language.tableheader.ordertype,
                    accessor: 'mvOrderType',
                    width: 80,
                },
                {
                    id: 'mvFeeTax',
                    Header: this.props.language.tableheader.feetax,
                    accessor: 'mvOrderType',
                    width: 80,
                },
                {
                    id: 'mvBankID',
                    Header: this.props.language.tableheader.bankid,
                    accessor: 'mvBankID',
                    width: 80,
                },
                {
                    id: 'mvExpiryDate',
                    Header: this.props.language.tableheader.expirydate,
                    accessor: 'mvDateTime',
                    width: 80,
                },
                {
                    id: 'mvRejectReason',
                    Header: this.props.language.tableheader.rejectreason,
                    accessor: 'mvRejectReason',
                    width: 80,
                },

            ],
            this.style = {
                height: '200px',
            }
    }
    onCancelSubmit() {
        this.props.onCancelSubmit(this.props.rowSelected)
        this.props.onHide()
    }
    render(){
        return(
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
                    <Button onClick={this.onCancelSubmit.bind(this)}> Submit</Button>
                </Modal.Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    code: state.orderjounal.returnCode
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    onCancelSubmit: (param) => {
        dispatch(actions.onCancelSubmit(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder)
