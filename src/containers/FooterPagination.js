import React from "react";
import ReactDOM from "react-dom";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";




export default class FooterPagination extends React.Component {
  constructor() {
    super();
  }

  

  render() {
    console.log(this.props.tabList);
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="right">
            <ButtonGroup >
              <Button active>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </ButtonGroup>
          </div>
          <ul id="tab-list" className="nav nav-pills" role="tablist">
            {this.props.tabList.map(id => {
              console.log(id);

              return ( 
                <li id={id}>
                  <a href="#tab" role="tab" data-toggle="tab" 
                   className="customtab" >
                    {id}
                    <button
                      id={id}
                      className="close"
                      type="button"
                      title="Remove this page"
                      onClick={this.props.onRemove}
                    >
                      ×
                    </button>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
