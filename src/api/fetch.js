import { POST, PUT, GET, LOGIN, DELETE, SERVER, HEADERSCK } from './serverconfig'

/*
- prefix: itradeMAS,..
- action: enquiry.action
- param
- dispatch
- successHandler, failHandler: function handler
*/


export function get(prefix, action, param, dispatch, successHandler, failHandler) {
	return (fetchAPI(prefix, action, param, GET)).then(response => response).then(parseData => {
		dispatch(successHandler(parseData))
		return parseData
	}).catch(error => {
		if (failHandler)
			failHandler(error)
		return error
	})
};

export function post(prefix, action, param, dispatch, successHandler, failHandler) {
	return (fetchAPI(prefix, action, param, POST)).then(response => response).then(parseData => {	
        dispatch(successHandler(parseData))
        return parseData
	}).catch(error => {
		if (failHandler && error.ok !== undefined && !error.ok)
			failHandler(error)
		return error
	})
}

export function call(prefix, action, param, method, successHandler, failHandler) {
	return (fetchAPI(prefix, action, param, method)).then(response => response).then(parseData => {	
        successHandler(parseData)
        return parseData
	}).catch(error => {
		if (failHandler && error.ok !== undefined && !error.ok)
			failHandler(error)
		return error
	})
}

async function fetchAPI(prefix, action, jsonData, method) {
    let url = SERVER + prefix + "/" + action
    if(prefix != "Actions") {
        // if (method === GET || method === POST || method === LOGIN || method === DELETE) {
            let data = JSON.stringify(jsonData)
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
        // }
    }
    else {
        // for itrade MAS
        url = "http://192.168.150.251:9090/" + "iTradeMAS" + "/" + action
        let header = {
            method: method,
            headers: HEADERSCK,
            credentials: 'include'
        }
        let formData = ''
        for (let k in jsonData) {
            formData += k + '=' + jsonData[k] + '&'
        }

        if (method == GET) {
            url += '?' + formData
        } else {
            header.body = formData
        }

        return new Promise((resolve, reject) => {
            let response = fetch(url, header)
                .then(res => {
                    if (res.ok) {
                        res.json().then(resolve).catch(reject)
                    } else {
                        reject(res)
                    }
                }).catch(reject)
        })
    }  
}