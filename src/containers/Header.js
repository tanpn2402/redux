import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap';
import ReactTable from 'react-table'

export default class App extends React.Component {
  constructor(){
    super()

    this.columns =  [
    {
          Header: 'HSX | Trạng thái: ',
          accessor: 'col1'
    },{
          Header: 'HNX | Trạng thái: ',
          accessor: 'col2'
    },{
          Header: 'UPCOM | Trạng thái: ',
          accessor: 'col3'
    },
        ]
  }
  render() {
    var currentThemeName=this.props.currentThemeName.substring(6,11)
    var currentLanguage=this.props.currentLanguage
    return (
        <Row className="header" id="pageheader" style={this.props.theme.pagebackground} >
          <Col xs={9} style={{paddingLeft: '0px',}}>
            
            <div className="logo">
              <img src={require('../assets/images/logo_MAS.png')}/>
            </div>
         
            <ReactTable
              style={{fontSize: '12px',}}
              data={this.data}
              columns={this.columns}
              showPagination= {false}
              defaultPageSize={4}
              sortable={false}
              resizable={false}
              className="-striped -highlight header-market"
            />

    
          </Col>
          <Col xs={3} style={{ fontSize: '12px', textAlign: 'right', paddingRight: '5px', paddingTop: '1px',}}>
           
            <span>
              {/*<select onChange={e => on}> 
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="brown">Brown</option>
                <option value="blue">Blue</option>
              </select>*/}
              <Button onClick={this.props.changeConfig.bind(this,currentLanguage,'blue')} bsStyle="default" bsSize="xsmall">Blue</Button> 
              <Button onClick={this.props.changeConfig.bind(this,currentLanguage,'dark')} bsStyle="default" bsSize="xsmall">Dark</Button> 
              <Button onClick={this.props.changeConfig.bind(this,currentLanguage,'brown')} bsStyle="default" bsSize="xsmall">Brown</Button> 
              <Button onClick={this.props.changeConfig.bind(this,currentLanguage,'light')} bsStyle="default" bsSize="xsmall">Light</Button> 
              <Button onClick={this.props.changeConfig.bind(this,'en',currentThemeName)} bsStyle="default" bsSize="xsmall" >Eng</Button>  
              <Button onClick={this.props.changeConfig.bind(this,'vi',currentThemeName)} bsStyle="default" bsSize="xsmall" >Viet</Button>  
              <Button bsStyle="primary" bsSize="xsmall">Logout</Button> </span>
   
            <div><strong>077C086378</strong></div>
            <div><strong>Nguyễn Văn Sự</strong></div>
            <div><strong>Giao dịch kí quỹ</strong></div>
            <div>Ngày GD 01/01/2017 14:26:22</div>
      
         
          </Col>
        </Row>
    );
  }
}
