//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, FormControl, Alert } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Warning from './Warning'

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
            this.state = {
                mvPrice: this.props.rowSelected[0].mvPrice,
                mvQty: this.props.rowSelected[0].mvQty,
                alertVisible: false,
            };
    }
    onModifySubmit() {
        if(this.checkPrice(this.state.mvPrice) && this.checkQty(this.state.mvQty)){
            this.props.onModifySubmit(this.props.rowSelected)
            this.props.onHide()
        }
        else{
            this.setState({alertVisible: true});
        }
        
    }
    onInput(id, newValue){
        if(id==="price"){
            this.setState({
             mvPrice: newValue
            });
        }else if(id==="quantity"){
            this.setState({
             mvQty: newValue
            });
        }
    }
    checkQty(qtyValue){
        if(qtyValue%10 === 0 )
            return true
        else
            return false
    }
    checkPrice(price){
        if(Number(price) <= 24 && price >=22)
            return true
        else
            return false
    }
    handleAlertDismiss() {
        this.setState({alertVisible: false});
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
                                <td><input id='price' type='text' className='form-control' 
                                value={this.state.mvPrice} 
                                onChange={e => this.onInput(e.target.id, e.target.value)}/></td>
                            </tr>
                            <tr>
                                <th>{this.props.language.tableheader.quantity}</th>
                                <td><input id='quantity' type='number' className='form-control' 
                                value={this.state.mvQty} min='0' step='10'
                                onChange={e => this.onInput(e.target.id, e.target.value)}/></td>
                            </tr>
                            <tr>
                                <th>Floor/Ceil: </th>
                                <td><font color='green'><b> 22.000</b></font>
                                <font color='red'><b>/24.000</b></font></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button onClick={this.onModifySubmit.bind(this)}> Submit</Button>
                </Modal.Footer>
            <Warning alertVisible={this.state.alertVisible} handleAlertDismiss={this.handleAlertDismiss.bind(this)}/>
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
