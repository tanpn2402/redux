import React, { Component } from 'react';
import { Grid, Row, Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, ControlLabel, HelpBlock, Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Profile extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        var data = this.props.data.mvPersonnalProfileBean === undefined ? [] : this.props.data.mvPersonnalProfileBean
        console.log('render in PersonalProfile', data)
        return (
          <Grid style={{paddingTop:"30px"}}>
            <Row className="show-grid">
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalName" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}} accessor='a1'>
                      Holder Name
                      </Col>
                      <Col sm={8}>
                      <FormControl type="holdername" value={data.mvName}/>
                      </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalNum" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Account No.
                      </Col>
                      <Col sm={8}>
                      <FormControl type="accountnum" value={data.mvIDNumber}/>
                      </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalEmail" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Email
                      </Col>
                      <Col sm={8}>
                      <FormControl type="email" value={data.mvEmail} readonly/>
                      </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalPassword" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Password
                      </Col>
                      <Col sm={8}>
                      <FormControl type="password"/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalAddress" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Address
                      </Col>
                      <Col sm={8}>
                      <FormControl type="address" value="ADDRESS 1 ADDRESS 2 ADDRESS 3"/>
                      </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalID" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Personal ID
                      </Col>
                      <Col sm={8}>
                      <FormControl type="id" value="12345678"/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
          </Row>
          <Row className="show-grid">
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalAuName" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Authorized Name
                      </Col>
                      <Col sm={8}>
                      <FormControl type="auname" value="Su"/>
                      </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalauid" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      ID No.
                      </Col>
                      <Col sm={8}>
                      <FormControl type="auid" value="22334455"/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalTelephone" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Telephone
                      </Col>
                      <Col sm={8}>
                      <FormControl type="telephone"/>
                      </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalAu" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Authorization
                      </Col>
                      <Col sm={8}>
                      <FormControl type="au" value="Place Order"/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={5} md={5}>
              <Form horizontal>
                <FormGroup controlId="formHorizontalAuName" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Current Password
                      </Col>
                      <Col sm={8}>
                      <FormControl type="auname"/>
                      </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalauid" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      New Password
                      </Col>
                      <Col sm={8}>
                      <FormControl type="auid"/>
                      </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalTelephone" bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={{fontWeight:"normal", fontSize: "12px"}}>
                      Retype New Password
                      </Col>
                      <Col sm={8}>
                      <FormControl type="telephone"/>
                      </Col>
                </FormGroup>
                <FormGroup>
                      <Col smOffset={3} sm={9}>
                      <Button type="save" bsSize="xsmall" style={{float:"left"}}>
                      Save
                      </Button>
                      </Col>
                </FormGroup>
              </Form>
            </Col>
            <Col xs={5} md={5} style={{fontSize: "12px", textAlign: "left"}}>
              <div><strong>WARNING</strong></div>
              <div><strong>- Expiry date of password: 28/06/2290 15:39:50</strong></div>
              <div>- Your password will be efficient in 90 days after the last time you change it</div>
              <div>- After 90 days, you will receive a notice for changing password</div>
            </Col>
          </Row>
        </Grid>
        )

    }

    componentDidMount(){
        var param = []
        this.props.getdata(param)
    }

}
const mapStateToProps = (state) => {
  return {
    data: state.profile.data,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  getdata: (param) => {
    dispatch(actions.getProfile(param))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
