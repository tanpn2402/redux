import { ActionTypes } from '../core/constants';
import * as api from '../api/web_service_api'
import * as ACTION from '../api/action_name'
import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';
// import { browserHistory } from 'react-router';
// import { sessionService } from 'redux-react-session';
// import * as sessionApi from '../api/sessionApi';

// const user = [
//     {
//         email: 'linh@yahoo.com',
//         name: 'Jordan Walke',
//         clientID: 'linh',
//         password: '123'
//     },
//     {
//         email: 'aaa@yahoo.com',
//         name: 'Dan Abramov, Andrew Clark',
//         clientID: 'norahshy',
//         password: '123'
//     }
// ];

// export function doLogin(username, password) {

//     return dispatch => {
//         authorize(username, password, error => {
//             if (!error) {
//                 sessionApi.login(user[0]).then(response => {
//                     const { token, data } = response;
//                     sessionService.saveSession({ token })
//                         .then(() => {
//                             sessionService.saveUser(data)
//                                 .then(() => {
//                                     browserHistory.replace('/');
//                                 });
//                         });
//                 });
//             } else {
//                 console.log('Everything is not okay');
//                 dispatch(setLoginError(true));
//             }
//         });
//     }
// }

// export function setLoginError(isLoginError) {
//     return {
//         type: ActionTypes.SET_LOGIN_ERROR,
//         isLoginError
//     }
// }

// function authorize(username, password, callback) {
//     setTimeout(() => {
//         if (username === user[0].clientID && password === user[0].password) {
//             return callback(null);
//         } else {
//             return callback('Something Wrong');
//         }
//     }, 10);
// }

// export const logout = () =>
//     () =>
//         sessionApi.logout().then(() => {
//             sessionService.deleteSession();
//             sessionService.deleteUser();
//             browserHistory.replace('/login');
//         }).catch(err => {
//             throw (err);
//         });


export function doLogin(params) {
    return (dispatch) => {
        return api.login(ACTION.DOLOGIN, params, dispatch, isLogin)
    }
}

export function isLogin(response) {
    let isLoginError = !response.success
    return {
        type: ActionTypes.SET_LOGIN_ERROR,
        isLoginError: isLoginError
    }
}

export function logout(id) {
    clearInterval(id)
    return (dispatch) => {
        api.post(ACTION.LOGOUT, {}, dispatch, responseLogout)
    }
}

function responseLogout(response) {
    console.log(response)
    sessionApi.logout().then(() => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        window.location.assign('/login');
    })
}
