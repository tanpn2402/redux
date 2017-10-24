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
                result: response
            }
        },
        function(err){
            return {
                type: ActionTypes.DOLOGINACTION,
                //status: "NETWORK_FAIL"
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
    // sessionService.deleteSession();
    // sessionService.deleteUser();

    return (dispatch) => {
        api.post(ACTION.LOGOUT, {force: 1,fromIndexPage: "Y", sessionID: "<s:property value='mvSessionID'/>"}, dispatch,
            function(response){
                window.location.assign('/login');
            },
            function(err){
                console.log(err)
            })
    }


    



}

export function checkAuth(){
    var params = {
        mvTimelyUpdate: "N",
        key: (new Date()).getTime()
    }
    return (dispatch) => {
        api.login(ACTION.CHECKSESSION, params, dispatch, 
            function(response){
                
                var lvResult = response.mvResult;

                if( response.mvResult_2 =="SESSION_EXPIRED" ||
                    response.mvResult_2 =="MULTI_USERS_LOGIN" ||
                    response.mvResult_2 =="SYSTEM_MAINTENANCE" ||
                    response.mvResult =="Time Out" || 
                    response.mvResult  == "Will time Out" )
                {
                    // not login
                    console.log("fail", response)
                    return {
                        type: ActionTypes.CHECKAUTH,
                        status: "FAIL",
                    }
                }
                else return {
                    type: ActionTypes.CHECKAUTH,
                    status: "SUCCESS",
                }
            },
            function(err){
                console.log("err", err)
                return {
                    type: ActionTypes.CHECKAUTH,
                    status: "ERROR",
                }
            })
    }
}
