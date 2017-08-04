import React from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';

export default class App extends React.Component {
  render() {
    return (
        <Row className="grid-header" style={{border: "1px solid black"}} style={{height: "100px"}}>
          <Col xs={3} md={2}>
            <img src={require('../assets/images/logoMAS.png')} />
          </Col>
          <Col xs={5} md={8}>
          <div style={{background: "#f9f9f9"}}>
            <Table striped bordered condensed hover>
            <thead>
             <tr>
             <th>HSX | Trạng thái: </th>
             <th>HNX | Trạng thái: </th>
             <th>UPCOM | Trạng thái: </th>
             </tr>
             </thead>
             <tbody>
             <tr>
             <th>VN-INDEX 0 <img src={require('../assets/images/n.gif')}/> 0</th>
             <th>HNX-INDEX 0 <img src={require('../assets/images/n.gif')}/> 0</th>
             <th>UPCOM-INDEX 0 <img src={require('../assets/images/n.gif')}/> 0</th>
             </tr>
             <tr>
             <th>TĂNG/GIẢM 0 <img src={require('../assets/images/u.gif')} /> 0 <img src={require('../assets/images/n.gif')} /> 0 <img src={require('../assets/images/d.gif')} /></th>
             <th>TĂNG/GIẢM 0<img src={require('../assets/images/u.gif')} /> 0 <img src={require('../assets/images/n.gif')} /> 0 <img src={require('../assets/images/d.gif')} /> </th>
             <th>TĂNG/GIẢM 0 <img src={require('../assets/images/u.gif')} /> 0 <img src={require('../assets/images/n.gif')} /> 0 <img src={require('../assets/images/d.gif')} /></th>
             </tr>
             <tr>
             <th>KLGD:0</th>
             <th>KLGD:0</th>
             <th>KLGD:0</th>
             </tr>
             </tbody>
             </Table>
             </div>
          </Col>
          <Col xs={4} md={2}>
          <Table>
          <tr><th><Button bsStyle="default" bsSize="xsmall">Eng</Button>  <Button bsStyle="default" bsSize="xsmall">Viet</Button>  <Button bsStyle="primary" bsSize="xsmall">Logout</Button> </th></tr>
          <tr><th>Welcome AccountName</th></tr>
          <tr><th> AccoundID </th></tr>
          <tr><th>Date Time</th></tr>
          </Table>
          </Col>
        </Row>
    );
  }
}
