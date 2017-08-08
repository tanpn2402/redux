import React from 'react';
import DropdownCheckBox from './DropdownCheckBox';
import '../css/style.css';

class SearchArea extends React.Component {

  constructor () {
      super()
      this.state = {

      };
  }
      
  render() {
    return (
      <div>
        <ul className="search-area">
          <li>
            <button className="btn btn-primary btn-register">Register</button>
          </li>
          <li>
            Order Type: 
            <select className="selectpicker">
              <option>Mustard</option>
              <option>Ketchup</option>
              <option>Relish</option>
            </select>

          </li>
          <li>
            Stock Code: 
            <select className="selectpicker">
              <option>Mustard</option>
              <option>Ketchup</option>
              <option>Relish</option>
            </select>
          </li>
          <li>
            Market: 
            <select className="selectpicker">
              <option>Mustard</option>
              <option>Ketchup</option>
              <option>Relish</option>
            </select>
          </li>
          <li>
            <button className="btn btn-primary btn-register">Search</button>
          </li>
          <div className="inline">
            <DropdownCheckBox />
          </div>
        </ul>
        
      </div>
    );
  }
        
}


export default SearchArea;

