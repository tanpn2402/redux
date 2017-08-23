import React, { Component } from 'react';
import { Grid, Row, Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, ControlLabel, HelpBlock, Checkbox, Alert, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.params={
          oldPassword: '',
          password: '',
          mvSeriNo: '',
          mvAnswer: '',
          mvSaveAuthenticate: true
        }
        this.retypePass=''
        this.labelStyle={
          fontWeight:"normal", 
          fontSize: "12px",
        }
        this.formControlStyle={
          marginTop: "2px",
          marginBottom: "2px"
        }
    }
    
      
      

    render() {
        var clientDetails = this.props.clientDetails.mvPersonnalProfileBean === undefined ? [] : this.props.clientDetails.mvPersonnalProfileBean
        console.log('render in PersonalProfile', clientDetails)
        return (
          <Grid style={{paddingTop:"30px"}}>
            <Row className="show-grid">
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle} accessor='a1'>
                      {this.props.language.holdername}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvName} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.accountno}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvAccountNumber} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.email}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvEmail} readonly style={this.formControlStyle} />
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.telephone}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvPhoneNumber} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup  bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.address}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvAddress} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.personalid}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvIDNumber} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
          </Row>
          <Row className="show-grid">
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.authorizedname}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvAgentList[0].agentName} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.idno}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvAgentList[0].agentIDNumber} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.telephone}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvAgentList[0].agentPhone} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                      {this.props.language.authorization}
                      </Col>
                      <Col sm={8}>
                      <FormControl value={clientDetails.mvAgentList[0].agentAttorney} style={this.formControlStyle}/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={5} md={5}>
              <Form horizontal>
                  <FormGroup controlId="currentPass" bsSize="small" >
                        <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                        {this.props.language.currentpassword}
                        </Col>
                        <Col sm={8}>
                        <FormControl type="password" onChange={e => this.onChangeValue(e)} style={this.formControlStyle}/>
                        </Col>
                  </FormGroup>
                  <FormGroup controlId="newPass" bsSize="small">
                        <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                        {this.props.language.newpassword}
                        </Col>
                        <Col sm={8}>
                        <FormControl type="password" onChange={e => this.onChangeValue(e)} style={this.formControlStyle}/>
                        </Col>
                  </FormGroup>
                  <FormGroup controlId="retypeNewPass" bsSize="small" >
                        <Col componentClass={ControlLabel} sm={4} style={this.labelStyle}>
                        {this.props.language.retypepassword}
                        </Col>
                        <Col sm={8}>
                        <FormControl type="password" onChange={e => this.onChangeValue(e)} style={this.formControlStyle}/>
                        </Col>
                  </FormGroup>
                
                <FormGroup>
                      <Col smOffset={3} sm={9}>
                      <Button  bsSize="xsmall" style={{float:"right", marginTop: "4px"}} onClick={e => this.onChangePassword()}>
                      {this.props.language.save}
                      </Button>
                      </Col>
                </FormGroup>
              </Form>
            </Col>
            <Col xs={6} md={6} style={{fontSize: "12px", textAlign: "left"}}>
              <div><strong>{this.props.language.warning}</strong></div>
              <div><strong>{this.props.language.expiredate}</strong></div>
              <div>{this.props.language.warndetail1}</div>
              <div>{this.props.language.warndetail2}</div>
            </Col>
          </Row>
        </Grid>
        )

    }

    componentDidMount(){
        this.props.getClientInfo([])
    }
    onChangePassword(){
      if(this.retypePass === this.params['password']){
        this.props.changePassword(this.params)
        console.log("changePassthis.params ",this.params)
        console.log("changePassResult ",this.props.changePassResult)
      }else{
        
      }
    }
    onChangeValue(e){
      switch(e.target.id){
        case 'currentPass':
          this.params['oldPassword']= e.target.value
        case 'newPass':
          this.params['password']= e.target.value
        case 'retypeNewPass':
          this.retypePass= e.target.value
      }
  }
}
const mapStateToProps = (state) => {
  return {
    clientDetails: state.profile.clientDetails,
    changePassResult: state.profile.changePassword
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  getClientInfo: (param) => {
    dispatch(actions.getClientInfo(param))
  },
  changePassword: (param) => {
    dispatch(actions.changePassword(param))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
