import { POST, PUT, GET, LOGIN, DELETE, FSSERVER, SERVER, HEADERSCK } from './serverconfig';
import { showMessageBox } from '../actions/notification'


export function get(action, param, dispatch, successHandler, failHandler) {
	return (fetchAPI(action, param, GET)).then(response => response).then(parseData => {
		dispatch(successHandler(parseData))
		return parseData
	}).catch(error => {
		if (failHandler)
			failHandler(error)
		return error
	})
};

export function post(action, param, dispatch, successHandler, failHandler) {

    if(action == "getfsseries") {
        return (test(action, param, POST)).then(response => response).then(parseData => {	
            dispatch(successHandler(parseData))
            return parseData
        }).catch(error => {
            if (failHandler && error.ok !== undefined && !error.ok)
                failHandler(error)
            return error
        })
    } 
	return (fetchAPI(action, param, POST)).then(response => response).then(parseData => {	
        dispatch(successHandler(parseData))
        return parseData
	}).catch(error => {
		if (failHandler && error.ok !== undefined && !error.ok)
			failHandler(error)
		return error
	})
};

async function fetchAPI(action, jsonData, method) {
    let url = SERVER + FSSERVER + "/" + action
    if (method === GET || method === POST || method === LOGIN || method === DELETE) {
        let data = JSON.stringify(jsonData);
        return new Promise((resolve, reject) => {
            let response = fetch(url, {
                method: POST,
                headers: HEADERSCK,
                credentials: 'include',
                body: data
            }).then(res => {
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            }).catch(reject)
        })
    }
}


async function test(action, jsonData, method) {
    let url = "http://localhost:3000/" + FSSERVER + action
    if (method === GET || method === POST || method === LOGIN || method === DELETE) {
        let data = JSON.stringify(jsonData);
        return new Promise((resolve, reject) => {
            let response = fetch(url, {
                method: POST,
                headers: HEADERSCK,
                credentials: 'include',
                body: data
            })
            response.then(res => {
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            }).catch(reject)
        })
    }
}