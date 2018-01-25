import {SERVER, PORT, POST, GET, DELETE, LOGIN, HEADERS, HEADERSCK, PUT} from "./serverconfig"

export function getServerUrl() {
    return SERVER + PORT
}
export async function FetchAPI(id, JsonData, method) {
    var url = SERVER + "Actions/" + id + '';

    var datajson = JSON.stringify(JsonData);
    
    if (method === GET) {
        return new Promise((resolve, reject) => {
            let response = fetch(url, {
                method: POST,
                headers: HEADERSCK,
                credentials: 'include',
                body: datajson
            })
            response.then(res => {
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            })
                .catch(reject)
        })
    }

    //method POST
    else if (method === POST || method === LOGIN || method === DELETE) {
        return new Promise((resolve, reject) => {
            let response = fetch(url, {
                method: POST,
                headers: HEADERSCK,
                credentials: 'include',
                body: datajson
            })
            response.then(res => {
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            })
                .catch(reject)
        })
    }
    else if (method === 'REPORT') {
        // url += '?' + formData
        // window.location.href = url

    } if(method === 'MDSGET') {
        console.log("MDS API IN FETCH API")
        return new Promise((resolve, reject) => {
            var response = window.fetch(id, {
                method: GET,
                headers: HEADERSCK
            })

            response.then(res => {
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            })
                .catch(reject)
        })
    }
        
        
}