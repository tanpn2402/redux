import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import { sessionService } from 'redux-react-session';
import { browserHistory } from 'react-router';
import * as sessionApi from '../api/sessionApi';
import moment from 'moment'
import * as api_language from '../api/api_change_language'
const { ActionTypes } = require('../core/constants');

export function changeConfig(language, style) { // Obsoleted, should implement each config switch function instead of one? 
  let requestedLanguage = api_language.getContent(language)
  return {
    type: ActionTypes.CONFIGUATIONS,
    language: requestedLanguage,
    style: style
  }
}

export function switchLanguage(language) {
  //Save language into localstorage
  let requestedLanguage = api_language.getContent(language)
  localStorage.setItem('lastLang', language)
  return {
    type: ActionTypes.SWITCH_LANGUAGE,
    language: requestedLanguage
  }
}

export function switchTheme(style) {
  //Save language into localstorage  
  localStorage.setItem('lastTheme',"theme_" + style)
  return {
    type: ActionTypes.SWITCH_THEME,
    style: style
  }
}

export function checkSession(handleCheckSessionID) {
  return (dispatch) => {
    const id = setInterval(function () {
      var params = {
        mvTimelyUpdate: "N",
        key: moment().valueOf()
      }
      const responseCheckSessionAndClearInterval = (response) => { return responseCheckSession(response, id) }
      return api.login(ACTION.CHECKSESSION, params, dispatch, responseCheckSessionAndClearInterval)
    }, 5000);
    handleCheckSessionID(id)
  }
}

function responseCheckSession(response, id) {
  if (response.success) {
    clearInterval(id)
    //   // var result = response.mvResult_2
    //   // if (result === "SYSTEM_MAINTENANCE") {
    //   //   // send popup not login
    //   // }
    //   // else if (result === "MULTI_USERS_LOGIN") {
    //   //   // send popup multi_users
    //   // }
    //   // else if (result === "SESSION_EXPIRED" || response.mvResult === "Time Out") {
    //   //   // send popup session_expired

    //   // }
    //   // else if (response.mvResult === "Will time Out") {
    //   //   // send popup will session_expired on 50s
    //   // }
    //   sessionApi.logout().then(() => {
    //     sessionService.deleteSession();
    //     sessionService.deleteUser();
    //     clearInterval(id)
    //     browserHistory.replace('/login');
    //   })
  }
  return {
    type: ActionTypes.CHECKSESSION,
    sessionState: response.mvResult_2
  }
}
