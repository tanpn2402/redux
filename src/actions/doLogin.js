import { ActionTypes } from '../core/constants';
import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';

export function doLogin(params) {
    return (dispatch) => {
        return api.login(ACTION.DOLOGIN, params, dispatch, function(response){
            let isLoginError = !response.success
            console.log(response)
            return {
                type: ActionTypes.DOLOGINACTION,
                result: response,
                mvClientID: params.mvClientID
            }
        })
    }
}

export function logout(id) {
    //Clear localstorage
    localStorage.removeItem('lastTab')
    localStorage.removeItem('lastTheme')
    localStorage.removeItem('lastLang')
    localStorage.removeItem('lastTabID')
    localStorage.removeItem('lastSubTabID')
    clearInterval(id)
    sessionService.deleteSession();
    sessionService.deleteUser();
    window.location.assign('/login');
}
