import React from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
class SearchArea extends React.Component {

  constructor () {
      super()
      this.state = {
        startDate: moment()
      };
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
      
  render() {
    return (
      <div>
        <ul className="search-area">
          <li>
            Stock: 
            <select className="selectpicker">
              <option>ALL</option>
              <option>ACB</option>
              <option>ADC</option>
              <option>AGC</option>
              <option>ALT</option>
              <option>ALV</option>
            </select>
          </li>
          <li>
            Order Type: 
            <select className="selectpicker">
              <option>ALL</option>
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </li>
          <li>
            <DatePicker 
              dateFormat="DD/MM/YYYY"
              selected={this.state.startDate}
              onChange={this.handleChange}/>
          </li>
          <li>
            <DatePicker 
              dateFormat="DD/MM/YYYY"
              selected={this.state.startDate}
              onChange={this.handleChange}/>
          </li>
          <li>
            <button className="btn btn-primary btn-register">Search</button>
          </li>
        </ul>
      </div>
    );
  }
        
}


export default SearchArea;

