import React from 'react';
import DropdownCheckBox from './DropdownCheckBox';
import '../css/style.css';
import {FormControl, Form, ControlLabel, FormGroup, Button} from 'react-bootstrap'
class SearchBar extends React.Component {

  constructor () {
      super()
      this.state = {

      };
  }
      
  render() {
    return (
      <Form className='form-inline search-bar'>
        <Button type="submit">{this.props.language.cancel}</Button>
        <FormGroup controlId="formInlineName">
          <ControlLabel>{this.props.language.status}</ControlLabel>
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

        <FormGroup controlId="formInlineName">
          <ControlLabel>{this.props.language.type}</ControlLabel>
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

        <FormGroup controlId="formInlineName">
          <ControlLabel>{this.props.language.buysell}</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="ALL">{this.props.language.all}</option>
            <option value="BUY">{this.props.language.buy}</option>
            <option value="SELL">{this.props.language.sell}</option>
          </FormControl>
        </FormGroup>
        {' | '}
        <FormGroup controlId="formInlineName">
          <FormControl componentClass="select" placeholder="select">
            <option value="VNM">VNM</option>
            <option value="ACB">ACB</option>
            <option value="SAM">SAM</option>
          </FormControl>
        </FormGroup>
          {'   '}
        <FormGroup controlId="formInlineEmail">
          <FormControl type="text" />
        </FormGroup>
       
       <FormGroup controlId="formInlineEmail">
          <ControlLabel>{this.props.language.totalfeetax}<span>3.111.111 đ</span></ControlLabel>
        </FormGroup>


        
        <FormGroup controlId="formInlineEmail" style={{float: 'right', marginTop: '2px',}}>
          <DropdownCheckBox />
        </FormGroup>

        {/*<FormGroup controlId="formInlineEmail" style={{float: 'right', marginTop: '2px',}}>
          <ControlLabel>1-5/5</ControlLabel>
        </FormGroup>*/}
        
      </Form>

    );
  }
        
}


export default SearchBar;

