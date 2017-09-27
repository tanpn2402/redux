import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import { sessionService } from 'redux-react-session';
import { browserHistory } from 'react-router';
import * as sessionApi from '../api/sessionApi';
import moment from 'moment'
const { ActionTypes } = require('../core/constants');

export function changeConfig(language, style) {
  console.log(language, style)
  return {
    type: ActionTypes.CONFIGUATIONS,
    language,
    style,
  }
}

export function checkSession() {
  return (dispatch) => {
    setInterval(function () {
      var params = {
        mvTimelyUpdate: "Y",
        key: moment().valueOf()
      }
      return api.login(ACTION.CHECKSESSION, params, dispatch, responseCheckSession)
    }, 5000);

  }
}

function responseCheckSession(response) {
  if (response.success) {
    var result = response.mvResult_2
    if (result === "SYSTEM_MAINTENANCE") {
      // send popup not login
    }
    else if (result === "MULTI_USERS_LOGIN") {
      // send popup multi_users
    }
    else if (result === "SESSION_EXPIRED" || response.mvResult === "Time Out") {
      // send popup session_expired
      sessionApi.logout().then(() => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        browserHistory.replace('/login');
      })
    }
    else if (response.mvResult === "Will time Out") {
      // send popup will session_expired on 50s
    }
  }
  return {
    type: ActionTypes.CHECKSESSION,
    session: 1
  }
}
