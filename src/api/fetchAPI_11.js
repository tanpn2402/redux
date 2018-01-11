export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const LOGIN = 'LOGIN'
export const DELETE = 'DELETE'
export const WEBSOCKET = 'WEBSOCKET'
const SERVER = 'http://tts.tx-tech.com:'
const PORT = '3000/'

const HOST = 'mi-trade.masvn.com'
const USER_AGENT = 'Mozilla/5.0'
const ACCEPT_LANGUAGE = 'en-US,en;q=0.5'
const ACCEPT = 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
const CONTENT_TYPE = 'application/json'
const CONNECTION = 'keep-alive'

const HEADERS = {
    'Host': HOST,
    'User-Agent': USER_AGENT,
    'Accept': ACCEPT,
    'Accept-language': ACCEPT_LANGUAGE,
    'Connection': CONNECTION,
    'Content-Type': CONTENT_TYPE
}
const HEADERSCK = {
    'Host': HOST,
    'Accept': ACCEPT,
    'Accept-language': ACCEPT_LANGUAGE,
    'Content-Type': CONTENT_TYPE
}

export function getServerUrl() {
    return SERVER + PORT
}
export async function FetchAPI(id, JsonData, method) {
    var url = SERVER + PORT + "Actions/" + id + '';
    // var formData = '';
    // for (var k in JsonData) {
    //     formData += k + '=' + JsonData[k] + '&'
    // }
    //console.log(url,formData)
    // method GET
    var datajson = JSON.stringify(JsonData);
    //datajson.append("json",JSON.stringify(JsonData));
    console.log(datajson);
    if (method === GET) {
        //url += POST
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

        // url += GET;  
        // if (formData != null) {
            
        //     return new Promise((resolve, reject) => {
        //         var response = window.fetch(url, {
        //             method: GET,
        //             headers: HEADERSCK,
        //             credentials: 'include'
        //         })

        //         response.then(res => {
        //             if (res.ok) {
        //                 res.json().then(resolve).catch(reject)
        //             } else {
        //                 reject(res)
        //             }
        //         })
        //             .catch(reject)
        //     })
        // } else {
        //     return new Promise((resolve, reject) => {
        //         var response = window.fetch(url, {
        //             method: GET,
        //             headers: HEADERSCK
        //         })

        //         response.then(res => {
        //             if (res.ok) {
        //                 res.json().then(resolve).catch(reject)
        //             } else {
        //                 reject(res)
        //             }
        //         })
        //             .catch(reject)
        //     })
        // }
    }

    //method POST
    if (method === POST) {
        //url += POST
        console.log(datajson);
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

    //method LOGIN
    if (method === LOGIN) {
        //url += LOGIN
        return new Promise((resolve, reject) => {
            var response = window.fetch(url, {
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

    //method DELETE
    //method POST
    if (method === DELETE) {
        //url += DELETE
        return new Promise((resolve, reject) => {
            var response = window.fetch(url, {
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
    if (method === 'REPORT') {
        // url += '?' + formData
        // window.location.href = url

    }
    

}



// WEBPACK FOOTER //
// ./src/api/fetchAPI.js