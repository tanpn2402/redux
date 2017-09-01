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
        this.labelStyle={
          fontWeight:"normal", 
          fontSize: "12px",
        }
        this.formControlStyle={
          marginTop: "2px",
          marginBottom: "2px",
          paddingTop: "2px",
          paddingBottom: "2px",
          height: "24px",
        }
        this.showMsg=false
        this.flashId=1
        this.showFlash=false
    }
    
    
      

    render() {
        var clientDetails = this.props.clientDetails.mvPersonnalProfileBean === undefined ? [] : this.props.clientDetails.mvPersonnalProfileBean
        var result= this.props.changePassResult.changePasswordBean
        if(result !== undefined){
          if(result.PData === 'fail_to_change'){
            this.props.showMessageBox(this.props.language.message.error, 
                                 this.props.language.message.changefailed, 
                                !this.reloadMsg, this.showMsg)
            
          }else if(result.PData === 'success'){
            this.flashId++
            this.props.showFlashPopup('flash-id-profile'+this.flashId,this.props.language.message.changesuccess, 
                                      this.showFlash)
          }
          this.showMsg=false
          this.showFlash=false
        }
        return (
          <div className="profile-wrapper">
            <Row className="show-grid">
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                        {this.props.language.holdername}
                      </Col>
                      <Col xs={6}>
                        <FormControl value={clientDetails.mvName} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                        {this.props.language.accountno}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.mvAccountNumber} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.email}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.mvEmail} readonly style={this.formControlStyle}  disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.telephone}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.mvPhoneNumber} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup  bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.address}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.mvAddress} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.personalid}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.mvIDNumber} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
          </Row>
          <Row className="show-grid">
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.authorizedname}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.length !== 0 ? clientDetails.mvAgentList[0].agentName : ''} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.idno}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.length !== 0 ? clientDetails.mvAgentList[0].agentIDNumber : ''} style={this.formControlStyle} disabled />
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
              <Col xs={5} md={5}>
                <Form horizontal>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.telephone}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.length !== 0 ? clientDetails.mvAgentList[0].agentPhone : ''} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup bsSize="small">
                      <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                      {this.props.language.authorization}
                      </Col>
                      <Col xs={6}>
                      <FormControl value={clientDetails.length !== 0 ? clientDetails.mvAgentList[0].agentAttorney : ''} style={this.formControlStyle} disabled/>
                      </Col>
                  </FormGroup>
                </Form>
              </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={5} md={5}>
              <Form horizontal>
                  <FormGroup controlId="currentPass" bsSize="small" >
                        <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                        {this.props.language.currentpassword}
                        </Col>
                        <Col xs={6}>
                        <FormControl type="password" onChange={e => this.onChangeValue(e)} style={this.formControlStyle}/>
                        </Col>
                  </FormGroup>
                  <FormGroup controlId="newPass" bsSize="small">
                        <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                        {this.props.language.newpassword}
                        </Col>
                        <Col xs={6}>
                        <FormControl type="password" onChange={e => this.onChangeValue(e)} style={this.formControlStyle}/>
                        </Col>
                  </FormGroup>
                  <FormGroup controlId="retypeNewPass" bsSize="small" >
                        <Col componentClass={ControlLabel} xs={6} style={this.labelStyle}>
                        {this.props.language.retypepassword}
                        </Col>
                        <Col xs={6}>
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
            <Col xs={6} md={6} componentClass={ControlLabel} style={this.labelStyle}>
              <div><strong>{this.props.language.warning}</strong></div>
              <div><strong>{this.props.language.expiredate}</strong></div>
              <div>{this.props.language.warndetail1}</div>
              <div>{this.props.language.warndetail2}</div>
            </Col>
          </Row>
        </div>
        )

    }

    componentDidMount(){
        this.props.getClientInfo([])
    }
    onChangePassword(){
      if(this.params['oldPassword']=== ''){
        this.props.showMessageBox(this.props.language.message.error, this.props.language.message.emptypass, !this.reloadMsg, true)
      }
      else if(this.params['password'].length <6 || this.params['password'].length >30 ){
        this.props.showMessageBox(this.props.language.message.error, this.props.language.message.newpassunaccepted, !this.reloadMsg, true)
      }
      else if(this.retypePass !== this.params['password']){
        this.props.showMessageBox(this.props.language.message.error, this.props.language.message.notmatched, !this.reloadMsg, true)
      }
      else{  
        this.props.changePassword(this.params)
        this.showMsg=true
        this.showFlash=true
      }
    }
    onChangeValue(e){
      switch(e.target.id){
        case 'currentPass':
          this.params['oldPassword']= e.target.value
          break;
        case 'newPass':
          this.params['password']= e.target.value
          break;
        case 'retypeNewPass':
          this.retypePass= e.target.value
          break;
      }
  }
}
const mapStateToProps = (state, props) => ({
  clientDetails: state.profile.clientDetails,
  changePassResult: state.profile.changePassword
}) 

const mapDispatchToProps = (dispatch, props) => ({
  getClientInfo: (param) => {
    dispatch(actions.getClientInfo(param))
  },
  changePassword: (param) => {
    dispatch(actions.changePassword(param))
  },
  showMessageBox: (msgType, msgDetails, reloadMsg, showMsg) => {
    dispatch(actions.showMessageBox(msgType, msgDetails, reloadMsg, showMsg))
  },
  showFlashPopup: (msgId, msgContent, showFlash) => {
    dispatch(actions.showFlashPopup(msgId, msgContent, showFlash ))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
