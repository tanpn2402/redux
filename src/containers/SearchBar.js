import React from 'react'
import DropdownCheckBox from './DropdownCheckBox'
import { connect } from 'react-redux'
import * as actions from '../actions'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import {FormControl, Form, ControlLabel, FormGroup, Button} from 'react-bootstrap'
class SearchBar extends React.Component {

  constructor () {
      super()
      this.state = {
          startDate: moment(),
          endDate: moment(),
      };

      this.parameter = {'mvStatus': false, 'mvBuysell': false, 'mvMarket': false, 'mvTrade': false, 'mvOrderType': false,
                        'mvStockId': false, 'mvStartDate': false, 'mvEndDate' : false }

  }
  
  onSearch(){
    var x = document.getElementById("form-search")
    var tmp = {}
    for (var i = 0; i < x.length; i++) {
      if(x.elements[i].value == 'on') 
        continue

      tmp[x.elements[i].id] = x.elements[i].value
    }
    console.log(tmp)
    this.props.onSearch(tmp)
  }

  handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }
  handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

  componentDidMount(){
    this.props.onSearch({'mvBuysell': 'B'})
  }

  componentWillMount(){
    for(var i = 0; i < this.props.param.length; i++){
      this.parameter[this.props.param[i]] = true
    }
  }

  render() {
    //console.log(this.props.columns)
    return (
      <Form className='form-inline search-bar' id="form-search">
        {
          this.props.buttonAction.map(e => {
                  return( e )
              })
        }
        <FormGroup controlId="mvStatus" style={ this.parameter['mvStatus'] ? {} : {display: 'none',} }>
          <ControlLabel>Trạng thái</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="ALL">{this.props.language.all}</option>
            <option value="FULLYFILLED">{this.props.language.fullyfilled}</option>
            <option value="QUEUE">{this.props.language.queue}</option>
            <option value="PARTIALLYFILL">{this.props.language.partiallyfill}</option>
            <option value="REJECTED">{this.props.language.rejected}</option>
            <option value="CANCELLED">{this.props.language.cancelled}</option>
            <option value="READYTOSEND">{this.props.language.readytosend}</option>
            <option value="SENDING">{this.props.language.sending}</option>
            <option value="PENDINGAPPROVAL">{this.props.language.pendingapproval}</option>
            <option value="STOP">{this.props.language.stop}</option>
            <option value="WAITINGCANCEL">{this.props.language.waitingcancel}</option>
            <option value="WAITINGMODIFY">{this.props.language.waitingmodify}</option>
            <option value="INACTIVE">{this.props.language.inactive}</option>
            <option value="EXPIRED">{this.props.language.expired}</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="mvOrderType"  style={ this.parameter['mvOrderType'] ? {} : {display: 'none',} }>
          <ControlLabel>Loại lệnh</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="ALL">{this.props.language.all}</option>
            <option value="NORMAL">{this.props.language.normal}</option>
            <option value="ATO">{this.props.language.ato}</option>
            <option value="ATC">{this.props.language.atc}</option>
            <option value="PUTTHROUGH">{this.props.language.putthrough}</option>
            <option value="MP">{this.props.language.mp}</option>
            <option value="MOK">{this.props.language.mok}</option>
            <option value="MAK">{this.props.language.mak}</option>
            <option value="MTL">{this.props.language.mtl}</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="mvBuysell" style={ this.parameter['mvBuysell'] ? {} : {display: 'none',} }>
          <ControlLabel>Mua/Bán</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="ALL">{this.props.language.all}</option>
            <option value="B">{this.props.language.buy}</option>
            <option value="S">{this.props.language.sell}</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="mvMarket" style={ this.parameter['mvMarket'] ? {} : {display: 'none',} }>
          <ControlLabel>Sàn</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="HA">HN</option>
            <option value="HO">HO</option>
            <option value="UPCOM">UPCOM</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="mvTrade" style={ this.parameter['mvTrade'] ? {} : {display: 'none',} }>
          <ControlLabel>Loại giao dịch</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="HA">Rút tiền</option>
            <option value="HO">Nộp tiền</option>
            <option value="UPCOM">....</option>
          </FormControl>
        </FormGroup>

        {' | '}
        <FormGroup controlId="mvStockId" style={ this.parameter['mvStockId'] ? {} : {display: 'none',} }>
          <FormControl bsClass='form-control stockSearch' componentClass="input" list="stockList" placeholder="Mã CK"/>
          <datalist id="stockList">
            {
              this.props.stockList.map(e => {
                  return( <option value={e.stockCode}>{e.stockName}</option> )
              })
            }
          </datalist>
         
        </FormGroup>
          {'   '}
        <FormGroup controlId="mvInput">
          <FormControl type="text" />
        </FormGroup>
        
        <Button bsStyle="primary" type="button"  onClick={this.onSearch.bind(this)}>Tìm kiếm</Button>

        <FormGroup bsClass="form-group dropdowncheckbox">
          <DropdownCheckBox columns={this.props.columns} onChangeStateColumn={this.props.onChangeStateColumn}/>
        </FormGroup>

        <FormGroup bsClass="form-group datepicker" style={ this.parameter['mvStartDate'] ? {} : {display: 'none',} }>
          <ControlLabel>Từ ngày</ControlLabel>
          {'   '}
          <DatePicker   
              id="mvStartDate"
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart.bind(this)}
          />
        </FormGroup>

        <FormGroup bsClass="form-group datepicker" style={ this.parameter['mvEndDate'] ? {} : {display: 'none',} }>
          <ControlLabel>Đến ngày</ControlLabel>
          {'   '}
          <DatePicker
              id="mvEndDate"
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd.bind(this)}
          />
        </FormGroup>

        <FormGroup style={{float: 'right', marginTop: '2px',}}>
          <ControlLabel>Tổng (Phí + thuế): <span>3.111.111 đ</span></ControlLabel>
        </FormGroup>

        {/*<FormGroup controlId="formInlineEmail" style={{float: 'right', marginTop: '2px',}}>
          <ControlLabel>1-5/5</ControlLabel>
        </FormGroup>*/}
        
      </Form>

    );
  }
        
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onSearch: (param) => {
    dispatch(actions.enquiryOrder(param))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

