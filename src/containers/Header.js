import React from 'react';
import { Row, Col, Table, Panel,  } from 'react-bootstrap';

const title = (
  <h3>Welcome+AccountName+AccountID</h3>
);

export default class App extends React.Component {
  render() {
    return (
        <Row className="show-grid" style={{border: "1px solid black"}}>
          <Col xs={3} md={3}>
            <img src={require('../assets/images/logoMAS.png')} />
          </Col>
          <Col xs={5} md={5}>
            <Table striped bordered condensed hover>
            <thead>
             <tr>
             <th>HSX | </th>
             <th>HNX | </th>
             <th>UPCOM | </th>
             </tr>
             </thead>
             <tbody>
             <tr>
             <th>VN-INDEX 0 <img src={require('../assets/images/n.gif')}/> 0</th>
             <th>HNX-INDEX 0 <img src={require('../assets/images/n.gif')}/> 0</th>
             <th>UPCOM-INDEX 0 <img src={require('../assets/images/n.gif')}/> 0</th>
             </tr>
             <tr>
             <th>TĂNG/GIẢM 0 <img src={require('../assets/images/u.gif')} /> 0 <img src={require('../assets/images/d.gif')} /> 0 <img src={require('../assets/images/n.gif')} /></th>
             <th>TĂNG/GIẢM 0<img src={require('../assets/images/u.gif')} /> 0 <img src={require('../assets/images/d.gif')} /> 0 <img src={require('../assets/images/n.gif')} /></th>
             <th>TĂNG/GIẢM 0 <img src={require('../assets/images/u.gif')} /> 0 <img src={require('../assets/images/d.gif')} /> 0 <img src={require('../assets/images/n.gif')} /></th>
             </tr>
             <tr>
             <th>KLGD:0</th>
             <th>KLGD:0</th>
             <th>KLGD:0</th>
             </tr>
             </tbody>
             </Table>
          </Col>
          <Col xs={4} md={4}>
          <div>
          <Panel header={title}>
          Logout
          </Panel>
          </div>
          </Col>
        </Row>
    );
  }
}
