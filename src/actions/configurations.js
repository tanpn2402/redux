import * as api from '../api/web_service_api';
import * as ACTION from '../api/action_name';
import {sessionService} from 'redux-react-session';
import {browserHistory} from 'react-router';
import * as sessionApi from '../api/sessionApi';
import config from '../core/config'
const {ActionTypes} = require('../core/constants');

export function switchLanguage(lang) {
    let params = {
        mvCurrentLanguage: lang,
        request_locale: lang,
        key: (new Date()).getTime()
    }
    api.fetch(ACTION.CHANGELANGUAGE, params, "GET", function(response) {})
    config.cache.lang = lang
    localStorage.setItem('lastLang', lang)
    return {
        type: ActionTypes.SWITCH_LANGUAGE,
        language: lang
    }
}

export function switchTheme(style) {
    config.cache.theme = style
    localStorage.setItem('lastTheme', style)
    return {
        type: ActionTypes.SWITCH_THEME,
        style: style
    }
}
