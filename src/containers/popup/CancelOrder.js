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
                    Header: this.props.language.orderjournal.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.orderjournal.header.buysell,
                    accessor: 'mvBS',
                    width: 50,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.orderjournal.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.orderjournal.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                },
                {
                    id: 'mvPendingQty',
                    Header: this.props.language.orderjournal.header.pendingQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                },
                {
                    id: 'mvExecutedQty',
                    Header: this.props.language.orderjournal.header.executedQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                },
                {
                    id: 'mvAvgPrice',
                    Header: this.props.language.orderjournal.header.avgprice,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.orderjournal.header.status,
                    accessor: 'mvStatus',
                    width: 80,
                },
                {
                    id: 'mvOrderType',
                    Header: this.props.language.orderjournal.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 80,
                },
                {
                    id: 'mvFeeTax',
                    Header: this.props.language.orderjournal.header.feetax,
                    accessor: 'mvOrderType',
                    width: 80,
                },
                {
                    id: 'mvBankID',
                    Header: this.props.language.orderjournal.header.bankid,
                    accessor: 'mvBankID',
                    width: 80,
                },
                {
                    id: 'mvExpiryDate',
                    Header: this.props.language.orderjournal.header.expirydate,
                    accessor: 'mvDateTime',
                    width: 80,
                },
                {
                    id: 'mvRejectReason',
                    Header: this.props.language.orderjournal.header.rejectreason,
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
        console.log(this.props.returnCode)
        console.log(this.props.message)
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
    returnCode: state.orderjournal.returnCode,
    message: state.orderjournal.message,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    onCancelSubmit: (param) => {
        dispatch(actions.onCancelSubmit(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder)
