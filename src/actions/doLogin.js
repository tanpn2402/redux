import { ActionTypes } from '../core/constants';

export function doLogin(username, password) {

    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        authorize(username, password, error => {
            console.log(username);
            dispatch(setLoginPending(false));
            if (!error) {
                console.log('OK');
                dispatch(setLoginSuccess(true));
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}

export function setLoginPending(isLoginPending) {
    return {
        type: ActionTypes.SET_LOGIN_PENDING,
        isLoginPending
    };
}

export function setLoginSuccess(isLoginSuccess) {
    return {
        type: ActionTypes.SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

export function setLoginError(loginError) {
    return {
        type: ActionTypes.SET_LOGIN_ERROR,
        loginError
    }
}

function authorize(username, password, callback) {
    setTimeout(() => {
        if (username === 'linh' && password === '123') {
            return callback(null);
        } else {
            return callback(new Error('Invalid username and password'));
        }
    }, 10);
}

