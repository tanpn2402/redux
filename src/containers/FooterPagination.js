import React from "react"
import { ButtonGroup, Button } from "react-bootstrap"

export default class FooterPagination extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.tabList === undefined){
      this.tabList = []
    }
    else{
      this.tabList = this.props.tabList
      
    }

    return (
      <div className="row tabbar">
        <div className="col-md-12">
          <div className="right">
            <div className="btn-group btn-group-sm" role="group" aria-label="...">
              <button style={this.props.page === '1' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='1' onClick={this.props.onPageClicked}>1</button>
              <button style={this.props.page === '2' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='2' onClick={this.props.onPageClicked}>2</button>
              <button style={this.props.page === '3' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='3' onClick={this.props.onPageClicked}>3</button>
              <button style={this.props.page === '4' ? this.props.theme.buttonClicked : this.props.theme.button} type="button" className={"btn btn-default"} id='4' onClick={this.props.onPageClicked}>4</button>
            </div>
          </div>
          <ul className="nav nav-pills tab-list" role="tablist">
            {

              this.tabList.map(id => {

              return ( 
                <li id={id} key={id}>
                  <a href="javascript:void(0);" role="tab" data-toggle="tab" 
                   className="customtab" style={this.props.theme.buttonClicked}>
                    {this.props.title[id]}
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
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
