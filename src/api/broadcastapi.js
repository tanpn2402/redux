import $ from 'jquery'
import atmosphere from 'atmosphere.js'
import {SERVER} from '../api/serverconfig';
// const SERVER = "http://192.168.150.199:3000/"

export function broadcast(url, callback) {
    console.log(url)
    var socket = atmosphere;
    var subSocket;
    var transport = 'websocket';

    // We are now ready to cut the request
    var request = { 
	    url: url,
        contentType : "application/json",
        logLevel : 'debug',
        transport : transport ,
        trackMessageLength : true,
        reconnectInterval : 50000 
    };
    
    request.onOpen = function (res) {
        console.log('Atmosphere connected using ' + res.transport)
        transport = res.transport;
    
        if (res.transport == "local") {
            subSocket.pushLocal("Lost connection")
        }
    }
    
    request.onTransportFailure = function (errorMsg, request) {
        console.log("ERROR: " + errorMsg)
        if (window.EventSource) {
            request.falrequestlbackTransport = "sse";
            transport = "see";
        }
    
    };

    request.onMessage = function (response) {
        var message = response.responseBody
        try {
            var json = JSON.parse(message);
            // console.log("Message: ", json)
            callback(json.result)
        } catch (e) {
            // console.log('This does not look like a valid JSON: ', message.data);
        }
    }
    console.log("Broadcast at URL: " + request.url)
    subSocket = socket.subscribe(request)
    //New request to notify server sending data by WSprotocol
    // window.fetch(SERVER + SUBSCRIBE_URL + clientID)
    // window.fetch(request.url)

    return socket
}

export function unsubscribe() {
    // socket.unsubscribe()
}
