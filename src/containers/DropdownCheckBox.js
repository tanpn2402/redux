import React from 'react';
import {Checkbox} from 'react-bootstrap'

class DropdownCheckBox extends React.Component {

  constructor () {
      super()
      this.state = {

          listVisible: false,
      };

      this.colours = [{
              name: "Porfolio",
            }, {
              name: "Sign Order",
            }, {
              name: "History",
            }, {
              name: "Odd Lot",
            }];
  }
  
  select(item) {
    this.props.onSeleted;
  }
        
  show() {
    this.setState(
      { 
        listVisible: true ,
      }
    );
  }
        
  hide() {
    this.setState({ listVisible: false, });
  }

  toggleDropdown(){
    this.setState( {listVisible: !this.state.listVisible });
  }

  onMouseOver(){
    this.setState({ listVisible: true, });
  }

  onMouseOut(){
    this.setState({ listVisible: false, });
  }

  onClick(){
    this.setState({ listVisible: true, });
  }
      
  render() {
    return (
      <div className="dropdown-container">
        <div className="dropdown-display" onClick={this.toggleDropdown.bind(this)}>s</div>
        <div className={"dropdown-list " + (this.state.listVisible ? "show": "hide")}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}>
            {this.renderListItems()}
        </div>
      </div>
    );
  }
        
  renderListItems() {
    var items = [];
    for (var i = 0; i < this.colours.length; i++) {
      var item = this.colours[i];
      items.push(
        <div className="dropdown-item">
          
          <Checkbox  defaultChecked='true' readOnly='false' inputRef={ref => { this.input = ref; }}>
            {item.name}
          </Checkbox>
       </div>);
    }
    return items;
  }
}


export default DropdownCheckBox;

