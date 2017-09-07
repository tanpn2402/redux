import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from './../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Popup from '../Popup'

class LoanRefund extends Component {
    constructor(props) {
        super(props)

        this.params = {
            mvLastAction:'',
            mvChildLastAction:'',
            key:'',
            start:'0',
            limit:'15',
            mvStartDate:'',
            mvEndDate:'',
        }


        this.state = {
        defaultvalue: true,
        isShow: false,
        isShow2:false,
        pageIndex1:1,
        pageIndex2:1,
        formValues: {},
        Uppercolumns : [
            {
                id: 'tranID',
                Header: this.props.language.loanrefund.upperheader.tranID,
                width: 80,
                show: true,
                skip: false,
            },
            {
                id: 'tradeDate',
                Header: this.props.language.loanrefund.upperheader.tradingdate,
                width: 80,
                show: true,
                skip: false,
            },
            {
                id: 'refundAmt',
                Header: this.props.language.loanrefund.upperheader.loanrefundamount,
                width: 80,
                show: true,
                skip: false,
            },
            {
                id: 'type',
                Header: this.props.language.loanrefund.upperheader.type,
                width: 80,
                show: true,
                skip: false,
            },
            {
                id: 'status',
                Header: this.props.language.loanrefund.upperheader.processingstatus,
                width: 80,
                show: true,
                skip: false,
            },
            {
                id: 'remark',
                Header: this.props.language.loanrefund.upperheader.remark,
                width: 80,
                show: true,
                skip: false,
            },

          ],

          Lowercolumns : [
              {
                  id: 'tranID',
                  Header: this.props.language.loanrefund.lowerheader.tranID,
                  accessor: 'tranID',
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'tradeDate',
                  Header: this.props.language.loanrefund.lowerheader.tradingdate,
                  accessor: 'tradeDate',
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'refundAmt',
                  Header: this.props.language.loanrefund.lowerheader.loanrefundamount,
                  accessor: 'refundAmt',
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'type',
                  Header: this.props.language.loanrefund.lowerheader.type,
                  accessor: 'type',
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'status',
                  Header: this.props.language.loanrefund.lowerheader.processingstatus,
                  accessor: 'status',
                  width: 80,
                  Cell: props => {
                    if(props.original.status === 'A')
                        return this.props.language.loanrefund.type.autorepayment;
                    if(props.original.status === 'M')
                        return this.props.language.loanrefund.type.repaymentbyrequest;
                    if(props.original.status == 'A')
                        return this.props.language.loanrefund.status.approved;
                  },
                  show: true,
                  skip: false,
              },
              {
                  id: 'remark',
                  Header: this.props.language.loanrefund.lowerheader.remark,
                  accessor: 'remark',
                  width: 300,
                  Cell: props => {
                    if(props.original.remark === 'For Margin Call')
                        return this.props.language.loanrefund.remark.formargincall;
                  },
                  show: true,
                  skip: false,
              },
              {
                id: 'lastupdate',
                Header: this.props.language.loanrefund.lowerheader.lastupdate,
                accessor: 'lastupdate',
                width: 80,
                show: true,
                skip: false,
              },

            ]
          },

        this.popupType='none'
        this.id = 'loanrefund'
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.onChange = this.onChange.bind(this)

        this.defaultPageSize = 15
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({

          Uppercolumns : [
              {
                  id: 'tranID',
                  Header: nextProps.language.loanrefund.upperheader.tranID,
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'tradeDate',
                  Header: nextProps.language.loanrefund.upperheader.tradingdate,
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'refundAmt',
                  Header: nextProps.language.loanrefund.upperheader.loanrefundamount,
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'type',
                  Header: nextProps.language.loanrefund.upperheader.type,
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'status',
                  Header: nextProps.language.loanrefund.upperheader.processingstatus,
                  width: 80,
                  show: true,
                  skip: false,
              },
              {
                  id: 'remark',
                  Header: nextProps.language.loanrefund.upperheader.remark,
                  width: 80,
                  show: true,
                  skip: false,
              },

            ],

            Lowercolumns : [
                {
                    id: 'tranID',
                    Header: nextProps.language.loanrefund.lowerheader.tranID,
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                },
                {
                    id: 'tradeDate',
                    Header: nextProps.language.loanrefund.lowerheader.tradingdate,
                    accessor: 'tradeDate',
                    width: 80,
                    show: true,
                    skip: false,
                },
                {
                    id: 'refundAmt',
                    Header: nextProps.language.loanrefund.lowerheader.loanrefundamount,
                    accessor: 'refundAmt',
                    width: 80,
                    show: true,
                    skip: false,
                },
                {
                    id: 'type',
                    Header: nextProps.language.loanrefund.lowerheader.type,
                    accessor: 'type',
                    width: 80,
                    show: true,
                    skip: false,
                },
                {
                    id: 'status',
                    Header: this.props.language.loanrefund.lowerheader.processingstatus,
                    accessor: 'status',
                    width: 80,
                    Cell: props => {
                      if(props.original.status === 'A')
                          return this.props.language.loanrefund.type.autorepayment;
                      if(props.original.status === 'M')
                          return this.props.language.loanrefund.type.repaymentbyrequest;
                      if(props.original.status == 'A')
                          return this.props.language.loanrefund.status.approved;
                    },
                    show: true,
                    skip: false,
                },
                {
                    id: 'remark',
                    Header: this.props.language.loanrefund.lowerheader.remark,
                    accessor: 'remark',
                    width: 300,
                    show: true,
                    skip: false,
                },
                {
                    id: 'lastupdate',
                    Header: nextProps.language.loanrefund.lowerheader.lastupdate,
                    accessor: 'lastupdate',
                    width: 80,
                    show: true,
                    skip: false,
                },
              ]


      })
    }


    render() {
        //console.log('render in LocalRefund',this.props.LoanRefundData)
        console.log(this.props)
        var localrefund = this.props.LocalRefund.mvLoanBean === undefined ? [] : this.props.LocalRefund.mvLoanBean
        var localadvance = this.props.LocalAdvance.mvAdvanceBean === undefined ? [] : this.props.LocalAdvance.mvAdvanceBean
        var loanrefundhistory = this.props.LoanRefundHistory
        var loanrefunddata = this.props.LoanRefundData

        let lgClose = () => this.setState({ isShow: false });
        let lgClose2 = () => this.setState({ isShow2: false });
        let buttonAction1 = [
            <Pagination
                    pageIndex={this.state.pageIndex1}
                    totalRecord={Math.ceil(this.props.LoanRefundDataTotalRecord / this.defaultPageSize)}
                    onPageChange={this.onPageChange1.bind(this)}
                    onNextPage={this.onNextPage1.bind(this)}
                    onPrevPage={this.onPrevPage1.bind(this)}
                    onReloadPage={this.onReloadPage1.bind(this)}
                />,
        ]
        let buttonAction2 = [
            <Pagination
                    pageIndex={this.state.pageIndex2}
                    totalRecord={Math.ceil(this.props.LoanRefundHistoryTotalRecord / this.defaultPageSize)}
                    onPageChange={this.onPageChange2.bind(this)}
                    onNextPage={this.onNextPage2.bind(this)}
                    onPrevPage={this.onPrevPage2.bind(this)}
                    onReloadPage={this.onReloadPage2.bind(this)}
                />,
        ]
        return (
          <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
          <div className="component-main loanrefund">

            <div className="loanrefund-form">

                <div className="loanrefund-form-group">
                <div className="title" style={this.props.theme.loanrefund.titleloanrefundform}>
                  <span>{this.props.language.loanrefund.title.titleloanrefundform}</span>
                </div>
                <Form onSubmit={this.handleSubmit} id="form-enterorder1">
                    <FormGroup>
                        <Table responsive >
                            <tbody >
                                <tr>
                                    <th>{this.props.language.loanrefund.form.beginningloan}</th>
                                    <td>
                                        {localrefund.loan}
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.props.language.loanrefund.form.availablecashforrefund}</th>
                                    <td>{localrefund.cashrsv > 0 ? localrefund.cashrsv : 0}</td>
                                </tr>
                                <tr>
                                    <th>{this.props.language.loanrefund.form.cashadvanceable}</th>
                                    <td>
                                        {localrefund.advAvailable}
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.props.language.loanrefund.form.loanrefundamount}</th>
                                    <td>
                                        <input id="loanrefundamount" required />
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.props.language.loanrefund.form.remark}</th>
                                    <td>
                                    <input id="remark"/>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="group-btn-action loanrefund-action">
                            <span>
                              <Button className="btn btn-default" type="submit" className="submit">
                                {this.props.language.loanrefund.form.submit}
                              </Button>
                              <Button className="btn btn-default" type="reset" className="cancel">
                                {this.props.language.loanrefund.form.cancel}
                              </Button>
                            </span>
                        </div>
                    </FormGroup>
                </Form>
                <Form onSubmit={this.handleSubmit2} id="form-enterorder2">
                    <FormGroup>
                        <Table responsive >
                            <tbody >
                                <tr>
                                    <th>{this.props.language.loanrefund.form.cashadvanceavailable}</th>
                                    <td>
                                        {localadvance.advAvailable}
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.props.language.loanrefund.form.advancefee}</th>
                                    <td>  <input type="hidden" id="advamount" value={this.calculate()} />
                                      {this.state.defaultvalue ===true ?localadvance.advFee : this.calculate()}</td>
                                </tr>
                                <tr>
                                    <th>{this.props.language.loanrefund.form.advanceamount}</th>
                                    <td>
                                        <input type="number" min="0" step="any" name="advamount" onChange={this.onChange} id="advamount" required />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="group-btn-action loanrefund-action">
                            <span>
                              <Button className="btn btn-default" type="submit" className="submit">
                                {this.props.language.loanrefund.form.submit}
                              </Button>
                              <Button className="btn btn-default" type="reset" className="cancel">
                                {this.props.language.loanrefund.form.cancel}
                              </Button>
                            </span>
                        </div>
                    </FormGroup>
                    <Popup
                        id='loanrefund'
                        show={this.state.isShow}
                        onHide={lgClose}
                        language={this.props.language}
                        title = {this.props.language.loanrefund.popup.title}/>
                        <Popup
                            id='advancepayment'
                            show={this.state.isShow2}
                            onHide={lgClose2}
                            language={this.props.language}
                            title = {this.props.language.loanrefund.popup.title}/>
                </Form>
                </div>
                <div className="loanrefund-note">
                  <div className="title" style={this.props.theme.loanrefund.titleloanrefundnotice}>
                    <span>{this.props.language.loanrefund.title.titleloanrefundnotice}</span>
                  </div>
                  <div className="note-content">
                    <span>
                      {this.props.language.loanrefund.title.titleloanrefundnoticeinfos}
                    </span>
                  </div>

                </div>
            </div>

            <div className="loanrefund-table">
              <div id={this.id + "-xtable1"}>
                <div className="table-main">
                  <DataUpperTable
                    key={this.id + "-table1"}
                    id={this.id + "-table1"}
                    data={loanrefunddata}
                    columns={this.state.Uppercolumns}
                    defaultPageSize={this.defaultPageSize}/>
                </div>
                <div className="table-header">
                  <div className="title" style={this.props.theme.loanrefund.titleloanrefundstatus}>
                    <span>{this.props.language.loanrefund.title.titleloanrefundstatus}</span>
                  </div>
                  <SearchBar
                    key={this.id+ '-search1'}
                    id={this.id+ '-search1'}
                    onSearch={[]}
                    hideSearchButton={true}
                    buttonAction={buttonAction1}
                    stockList={this.props.stockList}
                    language={this.props.language.searchbar}
                    theme={this.props.theme}
                    columns={this.state.Uppercolumns}
                    onChangeStateColumn={this.onChangeStateColumn1.bind(this)}
                    param={['dropdown']}/>
                </div>
              </div>

              <div id={this.id + "-xtable2"}>
                <div className="table-main">
                  <DataUpperTable
                    columns={this.state.Lowercolumns}
                    data={loanrefundhistory}
                    defaultPageSize={this.defaultPageSize}/>
                </div>
                <div className="table-header">
                  <div className="title" style={this.props.theme.loanrefund.titleloanrefundhistory}>
                    <span>{this.props.language.loanrefund.title.titleloanrefundhistory}</span>
                  </div>
                  <SearchBar
                    id={this.id + "-search2"}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={buttonAction2}
                    stockList={this.props.stockList}
                    language={this.props.language.searchbar}
                    theme={this.props.theme}
                    columns={this.state.Lowercolumns}
                    onChangeStateColumn={this.onChangeStateColumn2.bind(this)}
                    param={['mvStartDate', 'mvEndDate', 'dropdown']}/>
                </div>
              </div>
            </div>


          </div>
          </div>
        )
    }

    componentDidMount() {
      var d = new Date()
      var today = d.getDate()+ '/' + (d.getMonth()+1) +'/'+ d.getFullYear()
      this.params['mvStartDate'] = today
      this.params['mvEndDate'] = today
      this.props.onshowlocalrefund('', !this.props.reload);
      this.props.onshowlocaladvance('', !this.props.reload);
      this.props.onshowloanrefunddata('',!this.props.reload);
      this.props.onSearch(this.params);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isShow: true })
    }

    handleSubmit2(e) {
        e.preventDefault();
        this.setState({ isShow2: true })
    }


    /// 1//
    onChangeStateColumn1(e) {
        const id = e.target.id
        this.setState({
            Uppercolumns: this.state.Uppercolumns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage1(){
        if(this.state.pageIndex1 > 0 && this.state.pageIndex1 < Math.ceil(this.props.LoanRefundHistoryTotalRecord / this.defaultPageSize)){
             this.state.pageIndex1 = parseInt(this.state.pageIndex1) + 1
             this.params['start'] = (this.state.pageIndex1 - 1) * this.params['limit']
             this.props.onshowloanrefunddata(this.params, !this.props.reload)
             console.log(this.state.pageIndex1)
        }
    }

    onPrevPage1(){
        if(this.state.pageIndex1 > 1){
          this.state.pageIndex1 = parseInt(this.state.pageIndex1) - 1
          this.params['start'] = (this.state.pageIndex1 - 1) * this.params['limit']
          this.props.onshowloanrefunddata(this.params, !this.props.reload)
          console.log(this.state.pageIndex1)
        }
    }

    onReloadPage1(){
          this.props.onshowloanrefunddata(this.params, !this.props.reload)
    }

    onPageChange1(pageIndex) {
        if(pageIndex > 0 && pageIndex <= Math.ceil(this.props.LoanRefundHistoryTotalRecord / this.defaultPageSize)){
            this.state.pageIndex1 = pageIndex
            this.params['start'] = (this.state.pageIndex1 - 1) * this.params['limit']
            this.props.onshowloanrefunddata(this.params, !this.props.reload)
        }
    }

    onChangeStateColumn2(e) {
        const id = e.target.id
        this.setState({
            Lowercolumns: this.state.Lowercolumns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage2(){
        if(this.state.pageIndex2 > 0 && 
            this.state.pageIndex2 < Math.ceil(this.props.LoanRefundHistoryTotalRecord / this.defaultPageSize))
        {
             this.state.pageIndex2 = parseInt(this.state.pageIndex2) + 1
             this.params['start'] = (this.state.pageIndex2 - 1) * this.params['limit']
             this.props.onSearch(this.params, !this.props.reload)
             console.log(this.state.pageIndex2)
        }
    }

    onPrevPage2(){
        if(this.state.pageIndex2 > 1){
          this.state.pageIndex2 = parseInt(this.state.pageIndex2) - 1
          this.params['start'] = (this.state.pageIndex2 - 1) * this.params['limit']
          this.props.onSearch(this.params, !this.props.reload)
          console.log(this.state.pageIndex2)
        }
    }

    onReloadPage2(){
        this.props.onSearch(this.params, !this.props.reload)
    }

    onPageChange2(pageIndex) {
        if(pageIndex > 0 && 
            pageIndex <= Math.ceil(this.props.LoanRefundHistoryTotalRecord / this.defaultPageSize))
        {
             this.state.pageIndex2 = pageIndex
             this.params['start'] = (this.state.pageIndex2 - 1) * this.params['limit']
             this.props.onSearch(this.params, !this.props.reload)
             console.log(this.state.pageIndex2)
        }
    }


    onChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;


        formValues[name] = value;
        console.log(formValues);
        this.setState({ formValues, defaultvalue:false })
    }

    calculate() {
        this.state.value = (this.state.formValues.advamount / 2500) | 0;
        return this.state.value;
    }

    onSearch(param){
        this.params['mvStartDate'] = param['mvStartDate']
        this.params['mvEndDate'] = param['mvEndDate']
        this.props.onSearch(this.params, !this.props.reload)
    }


}
const mapStateToProps = (state) => {
    return {
      LocalRefund: state.loanrefund.LocalRefund,
      LocalAdvance: state.loanrefund.LocalAdvance,
      LoanRefundData: state.loanrefund.LoanRefundData,
      LoanRefundHistory:state.loanrefund.LoanRefundHistory,
      LoanRefundHistoryTotalRecord: state.loanrefund.LoanRefundHistoryTotalRecord,
      LoanRefundDataTotalRecord: state.loanrefund.LoanRefundDataTotalRecord
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onshowlocalrefund: () => {
      dispatch(actions.getLocalRefund({mvLastAction:'',mvChildLastAction:''}))
    },
    onshowlocaladvance: () => {
      dispatch(actions.getLocalAdvance({mvLastAction:'',mvChildLastAction:''}))
    },
    onshowloanrefunddata: () => {
      dispatch(actions.getLoanRefundData({mvLastAction:'',mvChildLastAction:'',key:'',start:'0',limit:'0'}))
    },
    onSearch:(params) =>{
      dispatch(actions.getLoanRefundHistory(params))
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(LoanRefund)
