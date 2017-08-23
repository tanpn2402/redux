//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, FormControl, Alert } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Warning from './Warning'
import loading from '../../assets/images/loading_apple.gif'

class ModifyOrder extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                id: 'mvStockID',
                Header: this.props.language.orderjournal.header.stockid,
                accessor: 'mvStockID',
            },
            {
                id: 'mvPrice',
                Header: this.props.language.orderjournal.header.price,
                accessor: 'mvPrice',
            },
            {
                id: 'mvQty',
                Header: this.props.language.orderjournal.header.quantity,
                accessor: 'mvQty',
            },
            {
                id: 'mvPendingQty',
                Header: this.props.language.orderjournal.header.pendingQty,
                accessor: 'mvPendingQty',
            },
        ],
            this.loading = true;
        this.style = {
            height: '200px',
        }
        this.state = {
            mvPrice: this.props.rowSelected[0].mvPrice,
            mvQty: this.props.rowSelected[0].mvQtyValue,
            alertVisible: false,
        };

    }

    onModifySubmit() {
        if (this.checkPrice(this.state.mvPrice) && this.checkQty(this.state.mvQty)) {
            this.props.rowSelected.mvPrice = this.state.mvPrice,
            this.props.rowSelected.mvQty = this.state.mvQty,
            this.props.onModifySubmit(this.props.rowSelected, this.state.mvPrice, this.state.mvQty)
           this.props.onHide()
        }
        else {
            this.setState({ alertVisible: true });
        }
    }
    onInput(id, newValue) {
        if (id === "price") {
            this.setState({
                mvPrice: newValue
            });
        } else if (id === "quantity") {
            this.setState({
                mvQty: newValue
            });
        }
    }
    checkQty(qtyValue) {
        if (qtyValue % 100 === 0)
            return true
        else
            return false
    }
    checkPrice(price) {
        if (Number(price) <= (parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvCeiling)) && price >= (parseFloat(this.props.mvStockInfo.mvStockInfoBean.mvFloor))) //check ceil, flor
            return true
        else
            return false
    }
    handleAlertDismiss() {
        this.setState({ alertVisible: false });
    }

    componentWillReceiveProps(nextProps) {
        nextProps.mvStockInfo;
        this.loading = false;
        //console.log(nextProps.isSuccess,this.props.isCount,nextProps.isCount, "error")
        // if (this.props.isCount === nextProps.isCount) {
        //     this.setState({ alertVisible: false })
        //     console.log(nextProps.isError,"error")
        // }
        // else {
        //     this.setState({ alertVisible: true })
        // }

    }

    render() {
        if (this.loading === true) {
            return (
                <div className="loading">
                    <img src={loading} alt="loading" />    Loading
                </div>
            )
        }
        else {
            return (
                <div >
                    <Modal.Body>
                        <table className="table table-bordered" >
                            <tbody >
                                <tr className="modalbody">
                                    <th>{this.props.language.orderjournal.header.stockid}</th>
                                    <td><input type='text' className='form-control'
                                        value={this.props.rowSelected[0].mvStockID} disabled /></td>
                                </tr>
                                <tr className="modalbody">
                                    <th>{this.props.language.orderjournal.header.price}</th>
                                    <td><input id='price' type='text' className='form-control'
                                        value={this.state.mvPrice}
                                        onChange={e => this.onInput(e.target.id, e.target.value)} /></td>
                                </tr>
                                <tr className="modalbody">
                                    <th>{this.props.language.orderjournal.header.quantity}</th>
                                    <td><input id='quantity' type='number' className='form-control'
                                        value={this.state.mvQty} min='0' step='100' required
                                        onChange={e => this.onInput(e.target.id, e.target.value)} /></td>
                                </tr>
                                <tr className="modalbody">
                                    <th>Floor/Ceil: </th>
                                    <td><font color='#3399CC'><b>
                                        {this.props.mvStockInfo.mvStockInfoBean.mvFloor}
                                    </b></font>
                                        <font color='#FF66CC'><b>/{this.props.mvStockInfo.mvStockInfoBean.mvCeiling}</b></font></td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Cancel</Button>
                        <Button onClick={this.onModifySubmit.bind(this)}> Submit</Button>
                    </Modal.Footer>
                    <Warning alertVisible={this.state.alertVisible} handleAlertDismiss={this.handleAlertDismiss.bind(this)}
                        modifyData={this.props.mvStockInfo.mvStockInfoBean} />
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        mvStockInfo: state.enterOrder.stockInfoList,
        // isError: state.orderjournal.isError,
        // isCount: state.orderjournal.isCount,
        // isSuccess: state.orderjournal.isSuccess,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onModifySubmit: (param, newPrice, newQty) => {
        dispatch(actions.onModifySubmit(param, newPrice, newQty))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOrder)
