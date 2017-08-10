//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
class ModifyOrder extends Component{
    constructor(props) {
        super(props)
        this.columns = [
                {
                    id: 'mvStockID',
                    Header: this.props.language.tableheader.stockid,
                    accessor: 'mvStockID',
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.tableheader.price,
                    accessor: 'mvPrice',
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.tableheader.quantity,
                    accessor: 'mvQty',
                },
                {
                    id: 'mvPendingQty',
                    Header: this.props.language.tableheader.pendingQty,
                    accessor: 'mvPendingQty',
                },
            ],
            this.style = {
                height: '200px',
            }
    }
    onModifySubmit() {
        this.props.onModifySubmit(this.props.rowSelected)
        this.props.onHide()
    }
    render(){
        console.log(this.props.returnCode)
        console.log(this.props.returnMessage)
        return(
            <div>
                <Modal.Body>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>{this.props.language.tableheader.stockid}</th>
                                <td><input type='text' className='form-control' 
                                value={this.props.rowSelected[0].mvStockID} disabled/></td>
                            </tr>
                            <tr>
                                <th>{this.props.language.tableheader.price}</th>
                                <td><input type='text' className='form-control' 
                                value={this.props.rowSelected[0].mvPrice} /></td>
                            </tr>
                            <tr>
                                <th>{this.props.language.tableheader.quantity}</th>
                                <td><input type='number' className='form-control' 
                                value={this.props.rowSelected[0].mvQty} min='0' step='1'/></td>
                            </tr>
                            <tr>
                                <th>{this.props.language.tableheader.pendingQty}</th>
                                <td><input type='text' className='form-control' 
                                value="yes"/></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button onClick={this.onModifySubmit.bind(this)}> Submit</Button>
                </Modal.Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      returnCode: state.orderjounal.returnCode,
      returnMessage: state.orderjounal.message,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    onModifySubmit: (param) => {
        dispatch(actions.onModifySubmit(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOrder)
