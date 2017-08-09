import React from 'react'
import DropdownCheckBox from './DropdownCheckBox'
import '../css/style.css'
import { connect } from 'react-redux'
import * as actions from '../actions'

import {FormControl, Form, ControlLabel, FormGroup, Button} from 'react-bootstrap'
class SearchBar extends React.Component {

  constructor () {
      super()
      this.state = {

      };
  }
  
  onSearch(){
    var x = document.getElementById("form-oderjournal")
    var tmp = {}
    for (var i = 0; i < x.length; i++) {
        tmp[x.elements[i].id] = x.elements[i].value
    }
    console.log(tmp)
    this.props.onEnquiryOrder(tmp)
  }

  render() {
    console.log(this.props.language)
    return (
      <Form className='form-inline search-bar' id="form-oderjournal">
        <Button type="button" onClick={this.onSearch.bind(this)}>Hủy GD</Button>
        <FormGroup controlId="mvStatus">
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

        <FormGroup controlId="mvOrderType">
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

        <FormGroup controlId="mvBuysell">
          <ControlLabel>Mua/Bán</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
             <option value="ALL">{this.props.language.all}</option>
            <option value="BUY">{this.props.language.buy}</option>
            <option value="SELL">{this.props.language.sell}</option>
          </FormControl>
        </FormGroup>
        {' | '}
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
          {'   '}
        <FormGroup controlId="mvInput">
          <FormControl type="text" />
        </FormGroup>
       
       <FormGroup>
          <ControlLabel>Tổng (Phí + thuế): <span>3.111.111 đ</span></ControlLabel>
        </FormGroup>


        
        <FormGroup style={{float: 'right', marginTop: '2px',}}>
          <DropdownCheckBox />
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
  onEnquiryOrder: (param) => {
    dispatch(actions.enquiryOrder(param))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

