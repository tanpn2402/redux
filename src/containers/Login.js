import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Login extends Component {

  /*constructor(){
    super()
  }*/

  render() {
    console.log(this.props)
    return (
      <div>
        <input placeholder="username" ref={node => {
          this.username = node
        }} />

        <input placeholder="password" ref={node => {
          this.password = node
        }} />


        <a href=""
          onClick={(e) => {
            e.preventDefault()
            if (!this.username.value.trim() || !this.password.value.trim()) {
              return
            }
            this.props.onClick(this.username.value, this.password.value)
          }}
        >
          LOGIN
        </a>
        <br/>
        <p>{this.props.message[0]}</p>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  message : state.message
})

const mapDispatchToProps = (dispatch, props) => ({
  onClick: (username, password) => {
    dispatch(actions.doLogin(username, password))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);


