import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import DataUpperTable from '../DataUpperTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import Popup from '../Popup'

class OddLotTrading extends Component {
    constructor(props) {
        super(props)

        this.params = {
            mvLastAction:'',
            mvChildLastAction:'',
            key:'',
            start:'0',
            limit:'15',
        }

        this.state = {
            isShow: false,

            enquirycolumns : [
              {
                  // Create a select-all checkbox
                  id: 'cb',
                  Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
                  maxWidth: 50,
                  width: 40,
                  Cell: props => {
                                      return (
                                          <input type='checkbox' className={this.id + "-row-checkbox"}
                                              onChange={() => { this.onRowSelected(props.original)}} />
                                      )
                                 },
                  sortable: false,
                  skip: true
                },
            {
                id: 'stockID',
                Header: this.props.language.oddlottrading.header.stockid,
                accessor: 'stockCode',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'TradingQty',
                Header: this.props.language.oddlottrading.header.tradingquantity,
                accessor: 'settledBal',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'OddLotQty',
                Header: this.props.language.oddlottrading.header.oddlotquantity,
                accessor: 'oddLotQty',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'Curprice',
                Header: this.props.language.oddlottrading.header.currentprice,
                accessor: 'nominalPrice',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'ExePrice',
                Header: this.props.language.oddlottrading.header.exeprice,
                accessor: 'collectionPrice',
                width: 120,
                skip: false,
                show: true,
            },
            ],
            historycolumns : [
              {
                  id: 'createTime',
                  Header: this.props.language.oddlottrading.header.transdate,
                  accessor: 'createTime',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'valueDate',
                  Header: this.props.language.oddlottrading.header.approvedate,
                  accessor: 'valueDate',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'instrumentId',
                  Header: this.props.language.oddlottrading.header.StockIDH,
                  accessor: 'instrumentId',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'appliedQty',
                  Header: this.props.language.oddlottrading.header.oddlotquantityH,
                  accessor: 'appliedQty',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'price',
                  Header: this.props.language.oddlottrading.header.exepriceH,
                  accessor: 'price',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'fee',
                  Header: this.props.language.oddlottrading.header.tax,
                  accessor: 'fee',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'aaa',
                  Header: this.props.language.oddlottrading.header.fee,
                  accessor: '',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'settleAmt',
                  Header: this.props.language.oddlottrading.header.value,
                  accessor: 'settleAmt',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'status',
                  Header: this.props.language.oddlottrading.header.status,
                  accessor: 'status',
                  width: 120,
                  skip: false,
                  show: true,
              },
            ],
            oddLotOrderPageIndex: 1,
            oddLotTransPageIndex: 1,
        }

        this.rowSelected = []
        this.popupType='none'
        this.id = 'oddlottrading'
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            enquirycolumns : [
              {
                  // Create a select-all checkbox
                  id: 'cb',
                  Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
                  maxWidth: 50,
                  width: 40,
                  Cell: props => {
                                      return (
                                          <input type='checkbox' className={this.id + "-row-checkbox"}
                                              onChange={() => { this.onRowSelected(props.original)}} />
                                      )
                                 },
                  sortable: false,
                  skip: true
                },
            {
                id: 'stockID',
                Header: this.props.language.oddlottrading.header.stockid,
                accessor: 'stockCode',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'TradingQty',
                Header: this.props.language.oddlottrading.header.tradingquantity,
                accessor: 'settledBal',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'OddLotQty',
                Header: this.props.language.oddlottrading.header.oddlotquantity,
                accessor: 'oddLotQty',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'Curprice',
                Header: this.props.language.oddlottrading.header.currentprice,
                accessor: 'nominalPrice',
                width: 120,
                skip: false,
                show: true,
            },
            {
                id: 'ExePrice',
                Header: this.props.language.oddlottrading.header.exeprice,
                accessor: 'collectionPrice',
                width: 120,
                skip: false,
                show: true,
            },
            ],

            historycolumns : [
              {
                  id: 'TransDate',
                  Header: this.props.language.oddlottrading.header.transdate,
                  accessor: 'createTime',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'valueDate',
                  Header: this.props.language.oddlottrading.header.approvedate,
                  accessor: 'valueDate',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'StockIDH',
                  Header: this.props.language.oddlottrading.header.StockIDH,
                  accessor: 'instrumentId',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'oddlotquantityH',
                  Header: this.props.language.oddlottrading.header.oddlotquantityH,
                  accessor: 'appliedQty',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'exepriceH',
                  Header: this.props.language.oddlottrading.header.exepriceH,
                  accessor: 'price',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'tax',
                  Header: this.props.language.oddlottrading.header.tax,
                  accessor: 'fee',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'fee',
                  Header: this.props.language.oddlottrading.header.fee,
                  //accessor: 'fee',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'value',
                  Header: this.props.language.oddlottrading.header.value,
                  accessor: 'settleAmt',
                  width: 120,
                  skip: false,
                  show: true,
              },
              {
                  id: 'status',
                  Header: this.props.language.oddlottrading.header.status,
                  accessor: 'status',
                  width: 120,
                  skip: false,
                  show: true,
              },
            ],

        })
    }


    render() {
        console.log(this.props.language)
        console.log('render in OddLotTrading',this.props.oddlothistory,this.props.oddlotenquiry)
        var oddlotenquiry = this.props.oddlotenquiry.oddLotList === undefined ? [] : this.props.oddlotenquiry.oddLotList
        var oddlothistory = this.props.oddlothistory.historyList === undefined ? [] : this.props.oddlothistory.historyList
        var page = this.props.oddlothistory.mvPage === undefined ? [] : this.props.oddlothistory.mvPage


        console.log( oddlotenquiry.length, this.state.oddLotOrderPageIndex, oddlotenquiry.slice( (this.state.oddLotOrderPageIndex - 1)*10, this.state.oddLotOrderPageIndex*10 ))
	      let lgClose = () => this.setState({ isShow: false });

        return (
          <div id={'oddlottrading-body'} className="layout-body">

            <div>
              <div>
                <form className="oddlottrading-form-action" onSubmit={this.handleSubmit}>
                    <Button type="submit" bsStyle="primary" >
                        {this.props.language.oddlottrading.header.register}
                    </Button>
                </form>
              </div>
              <div className="col-sm-9" style={{padding: "0px 1px", }}>
                <div className="title" style={this.props.theme.oddlottrading.titleoddlotorder}>
                <span>{this.props.language.oddlottrading.header.oddlotorder}</span>
                </div>
                <DataUpperTable
                  columns={this.state.enquirycolumns}
                  data={oddlotenquiry.slice( (this.state.oddLotOrderPageIndex - 1)*6, this.state.oddLotOrderPageIndex*6 )}
                  maxRows={6}
                  defaultPageSize={6}/>
                <Footer
                  pageSize={6} 
                  pageIndex={this.state.oddLotOrderPageIndex} 
                  totalRecord={oddlotenquiry.length} 
                  onPageChange={this.onOddLotOrderPageChange.bind(this)}/>
              </div>

              <div className="col-sm-3" style={{padding: "0px 1px", }}>
                <div className="title" style={this.props.theme.oddlottrading.titleoddlotorder}>
                  <span>{this.props.language.oddlottrading.header.notes}</span>
                </div>
                <div style={{ padding: "5px", fontSize: "12px", }}>
                  <span>{this.props.language.oddlottrading.header.notesinfo}</span>
                </div>
              </div>

            </div>

            <div style={{clear:'both'}}>
              <div className="title" style={this.props.theme.oddlottrading.titleoddlottransactionhistory}>
                <span>{this.props.language.oddlottrading.header.oddlotransactionhistory}</span>
              </div>
              <DataUpperTable
                columns={this.state.historycolumns}
                data={oddlothistory}
                maxRows={15}
                defaultPageSize={15}/>
              <Footer 
                pageSize={15} 
                pageIndex={this.state.oddLotTransPageIndex} 
                totalRecord={this.props.oddlothistory.totalCount} 
                onPageChange={this.onOddLotTransPageChange.bind(this)}/>
            </div>

            <Popup
                id='oddlottrading'
                show={this.state.isShow}
                onHide={lgClose}
                rowSelected={this.rowSelected}
                language={this.props.language}
                title = {this.props.language.oddlottrading.popup.title}/>

                

          </div>
        )
    }

    componentDidMount() {
        this.props.onshowenquiry('', !this.props.reload);
        this.props.onshowhistory('', !this.props.reload);
    }

    onRowSelected(param){
        if(param === 'ALL'){
            var current = document.getElementById(this.id + '-cb-all').checked
            var  checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for(var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked=current;
            }
            if(current)
                this.rowSelected = this.props.oddlotenquiry.oddLotList !== undefined ? this.props.oddlotenquiry.oddLotList : []
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

            if(document.getElementsByClassName(this.id + '-row-checkbox').length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all").checked = true
            else
                document.getElementById(this.id + "-cb-all").checked = false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isShow: true })
    }

    onOddLotTransPageChange(pageIndex){
        console.log('cashstatement onPageChange', pageIndex)
    }

    onOddLotOrderPageChange(pageIndex){
      this.setState({
          oddLotOrderPageIndex: pageIndex
      });
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }
    onSearch(param){
        console.log('cashstatement onSearch', param)
        this.props.onSearch(param, !this.props.reload)
    }


}
const mapStateToProps = (state) => {
    return {
      oddlotenquiry: state.oddlottrading.oddlotenquiry,
      oddlothistory: state.oddlottrading.oddlothistory,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onshowenquiry: () => {
      dispatch(actions.getOddlotEnquiry({mvLastAction:'',mvChildLastAction:''}))
    },
    onshowhistory: () => {
      dispatch(actions.getOddlotHistory({mvLastAction:'',mvChildLastAction:'',key:'',start:'0',limit:'15'}))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(OddLotTrading)
