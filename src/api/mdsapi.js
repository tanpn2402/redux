import { POST, PUT, GET, LOGIN, DELETE, HEADERSCK } from './serverconfig'
import { FetchAPI} from './fetchAPI';
export function get(url, param, dispatch, successHandler, failHandler) {

    url = "http://192.168.150.251:9090/iTradeMAS/enquiryportfolio.action?mvLastAction=AccountInfo&mvChildLastAction=AccountInfo&key=1516681606658&"
    
    // return (FetchAPI(id, param, GET)).then(response => response).then(parseData => {
	// 	dispatch(successHandler(parseData))
	// 	return parseData
	// }).catch(error => {
	// 	if (failHandler)
	// 		failHandler(error)
	// 	return error
    // }) 
    return (FetchAPI(url, param, "MDS")).then(response => response).then(parseData => {
        console.log(parseData)
		dispatch(successHandler(parseData))
		return parseData
	}).catch(error => {
        console.log(error)
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
        console.log(url)
        return new Promise((resolve, reject) => {
            var response = window.fetch(url)
            console.log(response)
            response.then(res => {
                console.log(res)
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            }).catch(() => {
                console.log("aaaaaaaaa")
                return reject(response)
            })
        })
    }
}