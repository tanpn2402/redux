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
    const language = this.props.language
    this.component = {
        'mvStatus': this.genStatusComponent(language),
        'mvBuysell': this.genBSComponent(language),
        'mvTrade': this.genTradeComponent(language),
        'mvMarket': this.genMarketComponent(language),
        'mvOrderType': this.genOrderTypeComponent(language),
        'mvStockId': this.genStockListComponent(language),
        'mvStartDate': this.genStartDateComponent(language),
        'mvEndDate': this.genEndDateComponent(language),
        'dropdown': this.genDropdownCheckbox(this.props.columns, this.props.onChangeStateColumn),
      }
  }

  componentWillReceiveProps(nextProps){
    const language = nextProps.language
    this.component = {
        'mvStatus': this.genStatusComponent(language),
        'mvBuysell': this.genBSComponent(language),
        'mvTrade': this.genTradeComponent(language),
        'mvMarket': this.genMarketComponent(language),
        'mvOrderType': this.genOrderTypeComponent(language),
        'mvStockId': this.genStockListComponent(language),
        'mvStartDate': this.genStartDateComponent(language),
        'mvEndDate': this.genEndDateComponent(language),
        'dropdown': this.genDropdownCheckbox(nextProps.columns, nextProps.onChangeStateColumn),
      }
  }

  genStatusComponent(language){
    return (
        <FormGroup controlId="mvStatus" >
          <ControlLabel>{language.status}</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            {
              config.orderstatus.map(e => {
                return (
                  <option value={e}>{language[e.toLowerCase()]}</option>
                )
              })
            }
          </FormControl>
        </FormGroup>
    )
  }

  genOrderTypeComponent(language){
     return (
      <FormGroup controlId="mvOrderType" >
        <ControlLabel>{language.ordertype}</ControlLabel>
        {'   '}
        <FormControl componentClass="select" placeholder="select">
           <option value="ALL">{this.props.language.all}</option>
           <option value="L">{this.props.language.normal}</option>
           <option value="O">{this.props.language.ato}</option>
           <option value="C">{this.props.language.atc}</option>
           <option value="P">{this.props.language.putthrough}</option>
           <option value="M">{this.props.language.mp}</option>
           <option value="B">{this.props.language.mok}</option>
           <option value="Z">{this.props.language.mak}</option>
           <option value="R">{this.props.language.mtl}</option>
        </FormControl>
      </FormGroup>
    )
  }

  genBSComponent(language){
    return (
      <FormGroup controlId="mvBuysell" >
        <ControlLabel>{language.buysell}</ControlLabel>
        {'   '}
        <FormControl componentClass="select" placeholder="select">
          <option value="ALL">{language.all}</option>
          <option value="B">{language.buy}</option>
          <option value="S">{language.sell}</option>
        </FormControl>
      </FormGroup>
    )
  }

  genMarketComponent(language){
    return (
      <FormGroup controlId="mvMarket" >
        <ControlLabel>{language.market}</ControlLabel>
        {'   '}
        <FormControl componentClass="select" placeholder="select">
          <option value="ALL">{this.props.language.all}</option>
          <option value="HA">HN</option>
          <option value="HO">HO</option>
          <option value="UPCOM">UPCOM</option>
        </FormControl>
      </FormGroup>
    )
  }

  genTradeComponent(language){
    return (
      <FormGroup controlId="mvTrade" >
        <ControlLabel>{language.transtype}</ControlLabel>
        {'   '}
        <FormControl componentClass="select" placeholder="select">
          {
              config.transtype.map(e => {
                return (
                  <option value={e}>{language[e]}</option>
                )
              })
          }
        </FormControl>
      </FormGroup>
    )
  }

  genStockListComponent(language){
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

  genStartDateComponent(language){
    return (
      <FormGroup bsClass="form-group datepicker" >
        <ControlLabel>{language.startdate}</ControlLabel>
        {'   '}
        <DatePicker   
            id="mvStartDate"
            dateFormat="DD/MM/YYYY"
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart.bind(this)}
        />
      </FormGroup>
    )
  }

  genEndDateComponent(language){
    return (
      <FormGroup bsClass="form-group datepicker" >
        <ControlLabel>{language.enddate}</ControlLabel>
        {'   '}
        <DatePicker
            id="mvEndDate"
            dateFormat="DD/MM/YYYY"
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd.bind(this)}
        />
      </FormGroup>
    )
  }

  genInputComponent(language){
    return (
      <FormGroup controlId="mvInput">
        <FormControl type="text" />
      </FormGroup>
    )
  }

  genDropdownCheckbox(columns, onChangeStateColumn){
    return(
      <FormGroup bsClass="form-group dropdowncheckbox">
            <DropdownCheckBox columns={columns} onChangeStateColumn={onChangeStateColumn}/>
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
       
        
        <Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button"  onClick={this.onSearch.bind(this)}>{this.props.language.search}</Button>

        

        

        

        {/*<FormGroup style={{float: 'right', marginTop: '2px',}}>
          <ControlLabel>Tổng (Phí + thuế): <span>3.111.111 đ</span></ControlLabel>
        </FormGroup>*/}

        {/*<FormGroup controlId="formInlineEmail" style={{float: 'right', marginTop: '2px',}}>
          <ControlLabel>1-5/5</ControlLabel>
        </FormGroup>*/}
        
      </Form>

    );
  }
        
}
