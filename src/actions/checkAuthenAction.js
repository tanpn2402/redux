import { ActionTypes } from '../core/constants';
import matrixCard from '../components/MatrixCard';

export function setAuthenFail(isAuthenFail) {
    return {
        type: ActionTypes.SET_AUTHEN_FAIL,
        isAuthenFail
    }
}

export function checkAuthen(code1, code2, input1, input2) {
        alert(code1 + " " + matrixCard.getValue(code1) + "\n" 
        + code2 + " " + matrixCard.getValue(code2) + "\n" 
        + input1 + " " + input2);
    return dispatch => {
        authenticate(code1, code2, input1, input2, error => {
            if (!error) {
                alert("Dispatch next action");
            } else {
                alert(error);
                dispatch(setAuthenFail(true));
            }
        });
    }
}

function authenticate(code1, code2, input1, input2, error) {
    setTimeout(() => {
        if ((matrixCard.getValue(code1) === input1) 
            && (matrixCard.getValue(code2) === input2)) {
                return error(null);
            } else {
                return error("Authenticating numbers are not matched.");
            }
    }, 10);
}