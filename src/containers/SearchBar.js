import React from 'react'
import DropdownCheckBox from './DropdownCheckBox'
import { connect } from 'react-redux'
import * as actions from '../actions'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import config from '../core/config'

import {FormControl, Form, ControlLabel, FormGroup, Button} from 'react-bootstrap'
export default class SearchBar extends React.Component {

  constructor () {
      super()
      this.state = {
          startDate: moment(),
          endDate: moment(),
      };

      this.parameter = {'mvStatus': false, 'mvBuysell': false, 'mvMarket': false, 'mvTrade': false, 'mvOrderType': false,
                        'mvStockId': false, 'mvStartDate': false, 'mvEndDate' : false }

      

  }
  
  onSearch(pageIndex){
    var x = document.getElementById(this.props.id + "form-search")
    var tmp = {}
    for (var i = 0; i < x.length; i++) {
      if(x.elements[i].value == 'on' || x.elements[i].id === '') 
        continue

      tmp[x.elements[i].id] = x.elements[i].value
    }
    
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

  componentWillMount(){
    for(var i = 0; i < this.props.param.length; i++){
      this.parameter[this.props.param[i]] = true
    }

    console.log('SearchBar componentWillMount',  this.props.stockList)
    this.component = {
        'mvStatus': this.genStatusComponent(),
        'mvBuysell': this.genBSComponent(),
        'mvTrade': this.genTradeComponent(),
        'mvMarket': this.genMarketComponent(),
        'mvOrderType': this.genOrderTypeComponent(),
        'mvStockId': this.genStockListComponent(),
        'mvStartDate': this.genStartDateComponent(),
        'mvEndDate': this.genEndDateComponent(),
      }
  }

  componentWillUpdate(){
    console.log('SearchBar componentWillUpdate',  this.props.stockList)
    
  }

  genStatusComponent(){
    return (
        <FormGroup controlId="mvStatus" >
          <ControlLabel>Trạng thái</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            {
              config.orderstatus.map(e => {
                return (
                  <option value={e}>{this.props.language[e.toLowerCase()]}</option>
                )
              })
            }
          </FormControl>
        </FormGroup>
    )
  }

  genOrderTypeComponent(){
     return (
      <FormGroup controlId="mvOrderType" >
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
    )
  }

  genBSComponent(){
    return (
      <FormGroup controlId="mvBuysell" >
        <ControlLabel>Mua/Bán</ControlLabel>
        {'   '}
        <FormControl componentClass="select" placeholder="select">
          <option value="ALL">{this.props.language.all}</option>
          <option value="B">{this.props.language.buy}</option>
          <option value="S">{this.props.language.sell}</option>
        </FormControl>
      </FormGroup>
    )
  }

  genMarketComponent(){
    return (
      <FormGroup controlId="mvMarket" >
        <ControlLabel>Sàn</ControlLabel>
        {'   '}
        <FormControl componentClass="select" placeholder="select">
          <option value="HA">HN</option>
          <option value="HO">HO</option>
          <option value="UPCOM">UPCOM</option>
        </FormControl>
      </FormGroup>
    )
  }

  genTradeComponent(){
    return (
      <FormGroup controlId="mvTrade" >
        <ControlLabel>Loại giao dịch</ControlLabel>
        {'   '}
        <FormControl componentClass="select" placeholder="select">
          {
              config.transtype.map(e => {
                return (
                  <option value={e}>{this.props.language[e]}</option>
                )
              })
          }
        </FormControl>
      </FormGroup>
    )
  }

  genStockListComponent(){
    console.log('asdadasd',  this.props.stockList)
    return (
      <FormGroup controlId="mvStockId">
        <FormControl bsClass='form-control stockSearch' componentClass="input" list="stockList" placeholder="Mã CK"/>
        <datalist id="stockList">
          {
            this.props.stockList.map(e => {
                return( <option value={e.stockCode}>{e.stockName}</option> )
            })
          }
        </datalist>
      </FormGroup>
    )
  }

  genStartDateComponent(){
    return (
      <FormGroup bsClass="form-group datepicker" >
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
    )
  }

  genEndDateComponent(){
    return (
      <FormGroup bsClass="form-group datepicker" >
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
    )
  }

  genInputComponent(){
    return (
      <FormGroup controlId="mvInput">
        <FormControl type="text" />
      </FormGroup>
    )
  }

  render() {
    return (
      <Form className='form-inline search-bar' id={this.props.id + "form-search"}>
        {
          this.props.buttonAction.map(e => {
                  return( e )
              })
        }
        
        {
          this.props.param.map(e => {
              this.parameter[e] = true
              return this.component[e]
          })
        }
       
        
        <Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button"  onClick={this.onSearch.bind(this)}>Tìm kiếm</Button>

        <FormGroup bsClass="form-group dropdowncheckbox">
          <DropdownCheckBox columns={this.props.columns} onChangeStateColumn={this.props.onChangeStateColumn}/>
        </FormGroup>
      </Form>

    );
  }
        
}
