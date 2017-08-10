import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Popup from '../Popup';

class OrderJournal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns : [
            {
              id: 'cb',
              Header: props => <input id="orderjounal-cb-all" type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
              maxWidth: 50,
              width: 40,
              Cell: props => { 
                                if(props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') 
                                    return (
                                        <input type='checkbox' className="orderjounal-row-checkbox"
                                            onChange={() => { this.onRowSelected(props.original)}} />
                                    ) 
                             },
              sortable: false,
              skip: true
            },
            {
              id: 'can',
              Header: this.props.language.tableheader.cancelmodify,
              maxWidth: 80,
              Cell: props =>{ 
                                var child = []
                                if(props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') 
                                    child.push(<Button bsStyle="primary" bsSize="xsmall" type="button">Hủy</Button>)
                                if(props.original.mvShowModifyIcon !== null && props.original.mvShowModifyIcon === 'Y') 
                                    child.push(<Button bsStyle="primary" bsSize="xsmall" type="button">Sửa</Button>)     
                                    return (
                                        <span>
                                            {
                                                child
                                            }
                                        </span>) 
                            },
              sortable: false,
              skip: true
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
                width: 50,
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
                id: 'mvQty',
                Header: this.props.language.tableheader.quantity,
                accessor: 'mvQty',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvPendingQty',
                Header: this.props.language.tableheader.pendingQty,
                accessor: 'mvPendingQty',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvExecutedQty',
                Header: this.props.language.tableheader.executedQty,
                accessor: 'mvPendingQty',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvAvgPrice',
                Header: this.props.language.tableheader.avgprice,
                accessor: 'mvAvgPriceValue',
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
                id: 'mvOrderType',
                Header: this.props.language.tableheader.ordertype,
                accessor: 'mvOrderType',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvFeeTax',
                Header: this.props.language.tableheader.feetax,
                accessor: 'mvOrderType',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvBankID',
                Header: this.props.language.tableheader.bankid,
                accessor: 'mvBankID',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvExpiryDate',
                Header: this.props.language.tableheader.expirydate,
                accessor: 'mvDateTime',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'mvRejectReason',
                Header: this.props.language.tableheader.rejectreason,
                accessor: 'mvRejectReason',
                width: 80,
                skip: false,
                show: true,
            },

            ],
        lgShow: false
        }

        this.buttonAction = [<Button bsStyle="primary" type="button" onClick={() => this.onCancelOrder()}>Hủy GD</Button>,]
        this.rowSelected = []

            
    }

  
    render() {
        console.log('render in OrderJournal', this.props.language.tableheader.stockid)
        var data = this.props.data.mvOrderBeanList === undefined ? [] : this.props.data.mvOrderBeanList
        let lgClose = () => this.setState({ lgShow: false });
        return (
            <div>
                <SearchBar  buttonAction={this.buttonAction} 
                            stockList={this.props.stockSearchList} 
                            language={this.props.language.searchbar} 
                            columns={this.state.columns}
                            onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                            param={['mvStatus', 'mvStockId', 'mvOrderType', 'mvBuysell', ]}/>
                <DataTable onRowSelected={this.onRowSelected.bind(this)} columns={this.state.columns} data={data}/>
                <Popup show={this.state.lgShow} onHide={lgClose} rowSelected={this.rowSelected} language={this.props.language}/>
            </div>
        )
        
    }

    onRowSelected(param){
        if(param === 'ALL'){
            var current = document.getElementById('orderjounal-cb-all').checked
            var  checkboxes = document.getElementsByClassName('orderjounal-row-checkbox')
            for(var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked=current;
            }
            if(current)
                this.rowSelected = this.props.data.mvOrderBeanList !== undefined ? 
                    this.props.data.mvOrderBeanList.filter(el => el.mvShowCancelIcon !== null && el.mvShowCancelIcon === 'Y') : []
            else
                this.rowSelected = []
        }
        else{
            var index = this.rowSelected.indexOf(param)
            if(index === -1){
                this.rowSelected.push(param)
            }
            else{
                this.rowSelected.splice(index, 1)
            }

            if(document.getElementsByClassName("orderjounal-row-checkbox").length === this.rowSelected.length)
                document.getElementById("orderjounal-cb-all").checked = true
            else
                document.getElementById("orderjounal-cb-all").checked = false
        }
        console.log('onRowSelected', this.rowSelected)
    }
    
    onCancelOrder(){
        // get all row selected
        this.setState({
            lgShow: true
        });
        //console.log('onCancelOrder', this.rowSelected)
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
        //console.log(this.state.columns)
    }


}
const mapStateToProps = (state) => {
  return {
    stockSearchList: state.orderjounal.stockSearchList,
    data: state.orderjounal.data,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onCancelOrder: (param) => {
    dispatch(actions.cancelOrder(param))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderJournal)
