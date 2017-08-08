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
        <Button type="submit">Hủy GD</Button>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Trạng thái</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="select">ALL</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Chờ khớp</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formInlineName">
          <ControlLabel>Loại lệnh</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="select">ALL</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Chờ khớp</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
            <option value="other">Khớp toàn bộ</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formInlineName">
          <ControlLabel>Mua/Bán</ControlLabel>
          {'   '}
          <FormControl componentClass="select" placeholder="select">
            <option value="select">ALL</option>
            <option value="other">Mua</option>
            <option value="other">Bán</option>
          </FormControl>
        </FormGroup>
        {' | '}
        <FormGroup controlId="formInlineName">
          <FormControl componentClass="select" placeholder="select">
            <option value="select">VNM</option>
            <option value="other">ACB</option>
            <option value="other">SAM</option>
          </FormControl>
        </FormGroup>
          {'   '}
        <FormGroup controlId="formInlineEmail">
          <FormControl type="text" />
        </FormGroup>
       
       <FormGroup controlId="formInlineEmail">
          <ControlLabel>Tổng (Phí + thuế): <span>3.111.111 đ</span></ControlLabel>
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

