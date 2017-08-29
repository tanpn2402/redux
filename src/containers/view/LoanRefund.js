import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import DataTable2 from '../DataTable2'
import DataUpperTable from '../DataUpperTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
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
        formValues: {},
        Uppercolumns : [
            {
                id: 'tranID',
                Header: this.props.language.loanrefund.upperheader.tranID,
                width: 80,
            },
            {
                id: 'tradeDate',
                Header: this.props.language.loanrefund.upperheader.tradingdate,
                width: 80,
            },
            {
                id: 'refundAmt',
                Header: this.props.language.loanrefund.upperheader.loanrefundamount,
                width: 80,
            },
            {
                id: 'type',
                Header: this.props.language.loanrefund.upperheader.type,
                width: 80,
            },
            {
                id: 'status',
                Header: this.props.language.loanrefund.upperheader.processingstatus,
                width: 80,
            },
            {
                id: 'remark',
                Header: this.props.language.loanrefund.upperheader.remark,
                width: 80,
            },

          ],

          Lowercolumns : [
              {
                  id: 'tranID',
                  Header: this.props.language.loanrefund.lowerheader.tranID,
                  accessor: 'tranID',
                  width: 80,
              },
              {
                  id: 'tradeDate',
                  Header: this.props.language.loanrefund.lowerheader.tradingdate,
                  accessor: 'tradeDate',
                  width: 80,
              },
              {
                  id: 'refundAmt',
                  Header: this.props.language.loanrefund.lowerheader.loanrefundamount,
                  accessor: 'refundAmt',
                  width: 80,
              },
              {
                  id: 'type',
                  Header: this.props.language.loanrefund.lowerheader.type,
                  accessor: 'type',
                  width: 80,
              },
              {
                  id: 'status',
                  Header: this.props.language.loanrefund.lowerheader.processingstatus,
                  accessor: 'status',
                  width: 80,
              },
              {
                  id: 'remark',
                  Header: this.props.language.loanrefund.lowerheader.remark,
                  accessor: 'remark',
                  width: 80,
              },

            ]
          },

        this.popupType='none'
        this.id = 'loanrefund'
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({

          Uppercolumns : [
              {
                  id: 'tranID',
                  Header: this.props.language.loanrefund.upperheader.tranID,
                  width: 80,
              },
              {
                  id: 'tradeDate',
                  Header: this.props.language.loanrefund.upperheader.tradingdate,
                  width: 80,
              },
              {
                  id: 'refundAmt',
                  Header: this.props.language.loanrefund.upperheader.loanrefundamount,
                  width: 80,
              },
              {
                  id: 'type',
                  Header: this.props.language.loanrefund.upperheader.type,
                  width: 80,
              },
              {
                  id: 'status',
                  Header: this.props.language.loanrefund.upperheader.processingstatus,
                  width: 80,
              },
              {
                  id: 'remark',
                  Header: this.props.language.loanrefund.upperheader.remark,
                  width: 80,
              },

            ],

            Lowercolumns : [
                {
                    id: 'tranID',
                    Header: this.props.language.loanrefund.lowerheader.tranID,
                    accessor: 'tranID',
                    width: 80,
                },
                {
                    id: 'tradeDate',
                    Header: this.props.language.loanrefund.lowerheader.tradingdate,
                    accessor: 'tradeDate',
                    width: 80,
                },
                {
                    id: 'refundAmt',
                    Header: this.props.language.loanrefund.lowerheader.loanrefundamount,
                    accessor: 'refundAmt',
                    width: 80,
                },
                {
                    id: 'type',
                    Header: this.props.language.loanrefund.lowerheader.type,
                    accessor: 'type',
                    width: 80,
                },
                {
                    id: 'status',
                    Header: this.props.language.loanrefund.lowerheader.processingstatus,
                    accessor: 'status',
                    width: 80,
                },
                {
                    id: 'remark',
                    Header: this.props.language.loanrefund.lowerheader.remark,
                    accessor: 'remark',
                    width: 80,
                },

              ]


      })
    }


    render() {
        console.log(this.props)
        console.log('render in LocalRefund',this.props.LocalRefund,this.props.LocalAdvance)
        var localrefund = this.props.LocalRefund.mvLoanBean === undefined ? [] : this.props.LocalRefund.mvLoanBean
        var localadvance = this.props.LocalAdvance.mvAdvanceBean === undefined ? [] : this.props.LocalAdvance.mvAdvanceBean
        var loanrefundhistory = this.props.LoanRefundHistory.loanrefundhistoryList  === undefined ? [] : this.props.LoanRefundHistory.loanrefundhistoryList
        var page = 1
            console.log('cho',localadvance.advAvailable,localrefund.advAvailable,loanrefundhistory.lastupdate)
	  let lgClose = () => this.setState({ isShow: false });
    let lgClose2 = () => this.setState({ isShow2: false });

        return (
          <div id={'oddlottrading-body'} className="layout-body">

      <div style={{float:'left',width:'25%'}}>
          <div className="title" style={this.props.theme.loanrefund.titleloanrefundform}>
          <span>{this.props.language.loanrefund.title.titleloanrefundform}</span>
          </div>
            <div>
            <Form onSubmit={this.handleSubmit} id="form-enterorder">
                <FormGroup>
                    <Table responsive >
                        <tbody >
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.beginningloan}</th>
                                <td>
                                    {localrefund.loan}
                                </td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.availablecashforrefund}</th>
                                <td>{localrefund.cashrsv}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.cashadvanceable}</th>
                                <td>
                                    {localrefund.advAvailable}
                                </td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.loanrefundamount}</th>
                                <td>
                                    <input id="loanrefundamount" required />
                                </td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.remark}</th>
                                <td>
                                <input id="remark"/>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <div className="button">
                                        <Button className="btn btn-default" type="submit" className="submit">
                                            {this.props.language.loanrefund.form.submit}
                                        </Button>
                                    </div>
                                </th>
                                <td>
                                    <div className="button">
                                        <Button className="btn btn-default" type="reset" className="cancel">
                                          {this.props.language.loanrefund.form.cancel}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </FormGroup>
            </Form>
            <Form onSubmit={this.handleSubmit2} id="form-enterorder">
                <FormGroup>
                    <Table responsive >
                        <tbody >
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.cashadvanceavailable}</th>
                                <td>
                                    {localadvance.advAvailable}
                                </td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.advancefee}</th>
                                <td>  <input type="hidden" id="advamount" value={this.calculate()} />
                                  {this.state.defaultvalue ===true ?localadvance.advFee : this.calculate()}</td>
                            </tr>
                            <tr>
                                <th className="enterorder">{this.props.language.loanrefund.form.advanceamount}</th>
                                <td>
                                    <input type="number" min="0" step="any" name="advamount" onChange={this.onChange} id="advamount" required />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <div className="button">
                                        <Button className="btn btn-default" type="submit" className="submit">
                                            {this.props.language.loanrefund.form.submit}
                                        </Button>
                                    </div>
                                </th>
                                <td>
                                    <div className="button">
                                        <Button className="btn btn-default" type="reset" className="cancel">
                                          {this.props.language.loanrefund.form.cancel}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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
        </div>

            <div style={{width:'75%',float:'left'}}>

            <div className="title" style={this.props.theme.loanrefund.titleloanrefundstatus}>
            <span>{this.props.language.loanrefund.title.titleloanrefundstatus}</span>
            </div>
              <div>
                <DataTable2
                height="220px"
                columns={this.state.Uppercolumns}
                page={page}
                windowid="loanrefundhistory"/>
              </div>

              <div className="title" style={this.props.theme.loanrefund.titleloanrefundhistory}>
              <span>{this.props.language.loanrefund.title.titleloanrefundhistory}</span>
              </div>
              <div>
              <SearchBar
                  id={this.id}
                  onSearch={this.onSearch.bind(this)}
                  buttonAction={[]}
                  stockList={this.props.stockList}
                  language={this.props.language.searchbar}
                  theme={this.props.theme}
                  columns={this.state.Lowercolumns}
                  onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                  param={['mvStartDate', 'mvEndDate']}
              />
              <DataTable2
              height="180px"
              columns={this.state.Lowercolumns}
              data={loanrefundhistory}
              page={page}
              windowid="oddlothistory"/>
              </div>
  <Footer pageIndex={page} totalRecord={this.props.LoanRefundHistory.totalCount} onPageChange={this.onPageChange.bind(this)}/>
            </div>

              <div style={{clear:'both'}}>
                <div className="title" style={this.props.theme.loanrefund.titleloanrefundnotice}>
                <span>{this.props.language.loanrefund.title.titleloanrefundnotice}</span>
                </div>
                <div>
                <span>
                {this.props.language.loanrefund.title.titleloanrefundnoticeinfos}
                </span>
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

    onPageChange(pageIndex){
        console.log('cashstatement onPageChange', pageIndex)
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

    onChangeStateColumn(e){
        const id = e.target.id

        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });

      //console.log(this.state.columns)
  }
    onSearch(param){
        console.log(' shit', this.params)
        this.params['mvStartDate'] = param['mvStartDate']
        this.params['mvEndDate'] = param['mvEndDate']
        console.log(' fuck', this.params)
        this.props.onSearch(this.params, !this.props.reload)
    }


}
const mapStateToProps = (state) => {
    return {
      LocalRefund: state.loanrefund.LocalRefund,
      LocalAdvance: state.loanrefund.LocalAdvance,
      LoanRefundHistory:state.loanrefund.LoanRefundHistory,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onshowlocalrefund: () => {
      dispatch(actions.getLocalRefund({mvLastAction:'',mvChildLastAction:''}))
    },
    onshowlocaladvance: () => {
      dispatch(actions.getLocalAdvance({mvLastAction:'',mvChildLastAction:''}))
    },
    onSearch:(params) =>{
      dispatch(actions.getLoanRefundHistory(params))
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(LoanRefund)
