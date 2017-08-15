import { ActionTypes } from '../core/constants';
const matrixCard = { "mvClientCardBean": { "attempt": 0, "attemptLimit": 0, "isLock": "0", "mvErrorCode": "CARD001", "mvErrorMsg": "NONEXISTING DATA", "mvSerialnumber": "22333", "mvWordMatrixKey01": "4,F", "mvWordMatrixKey02": "3,G" }, "mvErrorResult": "fail", "mvSaveAuthenticate": "true", "mvSuccess": "SUCCESS" };

export function setAuthenFail(isAuthenFail) {
    return {
        type: ActionTypes.SET_AUTHEN_FAIL,
        isAuthenFail
    }
}

export function checkAuthen(code1, code2, input1, input2,language) {
    return dispatch => {
        // send cho server
        // xu ly du lieu server tra ve
        var lvAttemptLimit = parseInt(matrixCard.mvClientCardBean.attemptLimit);
        var lvAttempt = parseInt(matrixCard.mvClientCardBean.attempt);
        var lvAuthErrorCode = matrixCard.mvClientCardBean.mvErrorCode;
        if (matrixCard.mvClientCardBean.isLock === "1") {
            return dispatch(setAuthenFail(language.error.isLock));
        }
        else if (lvAuthErrorCode === "CARD001") {
            return dispatch(setAuthenFail(language.error.cardnoneexist));
        }
        else if (lvAuthErrorCode === "CARD005") {
            return "SUCCESS"
        }
        else {
            var retryLimit = 0 + lvAttemptLimit - lvAttempt;
            console.log(retryLimit, lvAttemptLimit, lvAttempt);
            if (retryLimit < 0) {
                return dispatch(setAuthenFail(language.error.attemptlimit));
            }
            else {
                var error = language.error.attempt + retryLimit;
                return dispatch(setAuthenFail(error));
            }
        }
    }
}
