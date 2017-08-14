import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import Popup from '../Popup'

class OrderJournal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns : [
            {
              id: 'cb',
              Header: props => <input id="orderjournal-cb-all" type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
              maxWidth: 50,
              width: 40,
              Cell: props => { 
                                if(props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') 
                                    return (
                                        <input type='checkbox' className="orderjournal-row-checkbox"
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
                                    child.push(<Button style={this.props.theme.buttonClicked} bsClass="btn btn-xs btn-primary btn-orderjournal" bsSize="xsmall" type="button" 
				                        onClick={()=>this.onCancelButton(props.original)}>Hủy</Button>)
                                if(props.original.mvShowModifyIcon !== null && props.original.mvShowModifyIcon === 'Y') 
                                    child.push(<Button style={this.props.theme.buttonClicked} bsClass="btn btn-xs btn-primary btn-orderjournal" bsSize="xsmall" type="button"
				                        onClick={()=>this.onModifyButton(props.original)}>Sửa</Button>)     
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

        this.buttonAction = [<Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button" onClick={() => this.showPopup()}>Hủy GD</Button>,]
        this.rowSelected = []
	    this.popupType='none'
    }

  
    render() {
        console.log('render in OrderJournal', this.props.data)
        var data = this.props.data.mvOrderBeanList === undefined ? [] : this.props.data.mvOrderBeanList
        var page = this.props.data.mvPage === undefined ? [] : this.props.data.mvPage
	    let lgClose = () => this.setState({ lgShow: false })
        console.log('modify Data', this.props.modifyData)
        return (
            <div id={'orderjournal-body'} className="layout-body">
                <SearchBar
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={this.buttonAction} 
                    stockList={this.props.stockList} 
                    language={this.props.language.searchbar} 
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={['mvStatus', 'mvStockId', 'mvOrderType', 'mvBuysell', ]}
                    theme={this.props.theme}
                    />
                <DataTable
                    id="orderjournal-table" 
                    onRowSelected={this.onRowSelected.bind(this)} 
                    columns={this.state.columns} 
                    data={data}/>

                <Footer page={page} onPageChange={this.onPageChange.bind(this)}/>
		        <Popup 
                    show={this.state.lgShow} onHide={lgClose} 
                    rowSelected={this.rowSelected} language={this.props.language}
                    popupType={this.popupType} modifyData={this.props.modifyData}/>
            </div>
        )
        
    }

    onCancelButton(param){
        console.log(param)
        this.rowSelected=[]
        this.rowSelected.push(param)
        console.log(this.rowSelected, 'ádads')
        this.showPopup();
        
    }

    onModifyButton(param){
        this.rowSelected=[]
        this.rowSelected.push(param)
        this.showPopup();
        this.popupType= 'MODIFYORDER'
        this.props.onModifyButton(param)
    }

    onRowSelected(param){
        if(param === 'ALL'){
            var current = document.getElementById('orderjournal-cb-all').checked
            var  checkboxes = document.getElementsByClassName('orderjournal-row-checkbox')
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

            if(document.getElementsByClassName("orderjournal-row-checkbox").length === this.rowSelected.length)
                document.getElementById("orderjournal-cb-all").checked = true
            else
                document.getElementById("orderjournal-cb-all").checked = false
        }
        console.log('onRowSelected', this.rowSelected)
    }
    
    showPopup(){
        // get all row selected
        this.setState({
            lgShow: true
        });
        this.popupType= 'CANCELORDER'
        console.log('onCancelOrder', this.rowSelected)
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });

        //console.log(this.state.columns)
    }

    onPageChange(pageIndex){
        console.log('orderjournal onPageChange', pageIndex)
    }

    onSearch(param){
        console.log('orderjournal onSearch', param)
        this.props.onSearch(param, !this.props.reload)
    }


}
const mapStateToProps = (state) => {
  return {
    data: state.orderjournal.data,
    reload: state.orderjournal.reload,
    modifyData: state.orderjournal.dataresult,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onCancelOrder: (param) => {
    dispatch(actions.cancelOrder(param))
  },

  onSearch: (param, reload) => {
    dispatch(actions.enquiryOrder(param, reload))
  },
  onModifyButton: (param) => {
    dispatch(actions.getModifyData(param))
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(OrderJournal)
