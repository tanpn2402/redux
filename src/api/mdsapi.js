import { POST, PUT, GET, LOGIN, DELETE, HEADERSCK, SERVER } from './serverconfig'

export function get(url, param, dispatch, successHandler, failHandler) {

    url = SERVER + url
	return (fetch(url, param, GET)).then(response => response).then(parseData => {
        // console.log(parseData)
		dispatch(successHandler(parseData))
		return parseData
	}).catch(error => {
        // console.log(error)
		if (failHandler)
			failHandler(error)
		return error
    })    
}

function fetch(url, JsonData, method) {
    let formData = '';
    for (let k in JsonData) {
        formData += k + '=' + JsonData[k] + '&'
    }
    
    if (formData != '') {
        url += '?' + formData
        return new Promise((resolve, reject) => {
            var response = window.fetch(url)

            response.then(res => {
                console.log(res)
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            })
                .catch(reject)
        })
    } else {
        // console.log(url)
        return new Promise((resolve, reject) => {
            var response = window.fetch(url)
            // console.log(response)
            response.then(res => {
                console.log("MDS FETCH SUCCESS", res)
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            }).catch(() => {
                console.log("MDS FETCH FAIL")
                return reject(response)
            })
        })
    }
}