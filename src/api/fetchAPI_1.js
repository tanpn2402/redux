import {SERVER, PORT, POST, GET, DELETE, LOGIN, HEADERS, HEADERSCK, PUT} from "./serverconfig"

export function getServerUrl() {
    return SERVER + PORT
}
export async function FetchAPI(id, JsonData, method) {
    var url = SERVER + "iTradeMAS/" + id
    var formData = '';
    for (var k in JsonData) {
        formData += k + '=' + JsonData[k] + '&'
    }
    //console.log(url,formData)
    // method GET
    if (method === GET) {
        // url += GET;  
        if (formData != null) {
            url += '?' + formData
            return new Promise((resolve, reject) => {
                var response = window.fetch(url, {
                    method: GET,
                    headers: HEADERSCK,
                    credentials: 'include'
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
        } else {
            return new Promise((resolve, reject) => {
                var response = window.fetch(url, {
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

    //method POST
    if (method === POST || method === DELETE || method === LOGIN ) {
        //url += POST
        return new Promise((resolve, reject) => {
            let response = fetch(url, {
                method: POST,
                headers: HEADERSCK,
                credentials: 'include',
                body: formData
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


    if (method === 'REPORT') {
        url += '?' + formData
        window.location.href = url
    }
}