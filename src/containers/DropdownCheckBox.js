import React from 'react';
import {Checkbox} from 'react-bootstrap'

class DropdownCheckBox extends React.Component {

  constructor () {
      super()
      this.state = {
          listVisible: false,
      };
  }

  toggleDropdown(){
    this.setState( {listVisible: !this.state.listVisible });
  }
  
  render() {
    return (
      <div className="dropdown-container">
        <div className="dropdown-display" onFocus={()=>this.toggleDropdown()} onBlur={()=>this.toggleDropdown()} tabIndex="-1" >s
        <div style={{color: "black"}} className={"dropdown-list " + (this.state.listVisible ? "show": "hide")}>
            {this.renderListItems()}
        </div>
      </div>
    </div>
    );
  }
        
  renderListItems() {
    var items = [];
    for (var i = 0; i < this.props.columns.length; i++) {
      var item = this.props.columns[i];
      items.push(
        <div className="dropdown-item">
          <Checkbox  id={item.id} onChange={this.props.changeColumn} inputRef={ref => { this.input = ref; }}>
            {item.Header}
          </Checkbox>
       </div>);
    }
    return items;
  }
}


export default DropdownCheckBox;

