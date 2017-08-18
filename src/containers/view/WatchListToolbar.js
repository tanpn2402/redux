import React from 'react'
import DropdownCheckBox from '../DropdownCheckBox'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import config from '../../core/config'

import {FormControl, Form, ControlLabel, FormGroup, Button} from 'react-bootstrap'
export default class WatchListToolbar extends React.Component {

  constructor () {
      super()
        this.inputValue=""
       
  }
  onAddStock(value){
      this.props.onAddStock(value);
  }
  onChange(e){
      console.log(e.target.value)
      this.inputValue=e.target.value
  }
  render() {
    console.log("qazsw " +this.props.rowSelected)
    return (
      <Form className='form-inline search-bar' id='watchlisttoolbar'>
        <Button  bsStyle="default" type="button" ><span className="glyphicon glyphicon-refresh"></span></Button>
            <FormGroup controlId="mvStockId">
                <FormControl bsClass='form-control stockSearch' 
                componentClass="input" list="stockList" 
                placeholder="Mã CK"
                onChange={e => this.onChange(e)}
                />
                    <datalist id="stockList">
                    {
                        this.props.stockList.map(e => {
                            return( <option value={e.stockCode}>{e.stockName}</option> )
                        })
                    }
                    </datalist>
            </FormGroup>
        <Button  bsStyle="primary" type="button" onClick={e => this.onAddStock(this.inputValue)}>
            <span className="glyphicon glyphicon-plus" ></span> 
            {this.props.language.addstock}
        </Button>
        <Button  bsStyle="default" type="button" onClick={e => this.props.onRemoveStock(this.props.rowSelected)}>
            <span className="glyphicon glyphicon-remove"></span> 
            {this.props.language.removestock}
        </Button>
      </Form>
    );
  }
        
}
