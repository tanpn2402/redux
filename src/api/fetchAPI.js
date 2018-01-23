import * as CONFIG from "./serverconfig"

export async function FetchAPI(id, JsonData, method) {

    var url = CONFIG.SERVER + CONFIG.PORT + id + '';
    var formData = '';
    for (var k in JsonData) {
        formData += k + '=' + JsonData[k] + '&'
    }
    //console.log(url,formData)
    // method GET
    if (method === CONFIG.GET) {
        // url += GET;  
        if (formData != null) {
            url += '?' + formData
            return new Promise((resolve, reject) => {
                var response = window.fetch(url, {
                    method: CONFIG.GET,
                    headers: CONFIG.HEADERSCK,
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
                    method: CONFIG.GET,
                    headers: CONFIG.HEADERSCK
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
    if (method === CONFIG.POST) {
        //url += POST
        return new Promise((resolve, reject) => {
            let response = fetch(url, {
                method: CONFIG.POST,
                headers: CONFIG.HEADERSCK,
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

    //method LOGIN
    if (method === CONFIG.LOGIN) {
        //url += LOGIN
        return new Promise((resolve, reject) => {
            var response = window.fetch(url, {
                method: CONFIG.POST,
                headers: CONFIG.HEADERSCK,
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

    //method DELETE
    //method POST
    if (method === CONFIG.DELETE) {
        //url += DELETE
        return new Promise((resolve, reject) => {
            var response = window.fetch(url, {
                method: CONFIG.POST,
                headers: CONFIG.HEADERSCK,
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

    if(method === 'MDSGET') {
        console.log("MDS API IN FETCH API")
        return new Promise((resolve, reject) => {
            var response = window.fetch("http://localhost:8089/test", {
                method: CONFIG.GET,
                headers: CONFIG.HEADERSCK
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
