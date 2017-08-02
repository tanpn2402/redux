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
            <ButtonGroup bsSize="small">
              <Button id='1' bsStyle={ this.props.page === '1' ? "primary" : 'default'}  bsSize='small' onClick={this.props.onPageClicked}>1</Button>
              <Button id='2' bsStyle={ this.props.page === '2' ? "primary" : 'default'}  bsSize='small' onClick={this.props.onPageClicked}>2</Button>
              <Button id='3' bsStyle={ this.props.page === '3' ? "primary" : 'default'}  bsSize='small' onClick={this.props.onPageClicked}>3</Button>
              <Button id='4' bsStyle={ this.props.page === '4' ? "primary" : 'default'}  bsSize='small' onClick={this.props.onPageClicked}>4</Button>
            </ButtonGroup>
          </div>
          <ul className="nav nav-pills tab-list" role="tablist">
            {

              this.tabList.map(id => {

              return ( 
                <li id={id} key={id}>
                  <a href="javascript:void(0);" role="tab" data-toggle="tab" 
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
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
