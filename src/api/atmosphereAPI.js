import $ from 'jquery'
import atmosphere from 'atmosphere.js'

const SUBSCRIBE_URL = "ITradePushServer/StockInfo/"

var isSubsribed = false;
var logged = false;
var subSocket;
var socket = atmosphere;
var transport = 'websocket';
var callback;

var request = {
    url: window.location.href + "ITradePushServer/StockInfo/",
    contentType: "application/json",
    trackMessageLength: true,
    transport: transport,
    fallbackTransport: 'long-polling',
    reconnectInterval: 5000
}

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

export function sendMessage(msgObject) {
    if (subSocket == null) 
        return
    subSocket.push(JSON.stringify(msgObject))
    console.log("MsgObject sent")
}

export function subscribe(clientID, callback) {
    request.url = request.url + clientID

    request.onMessage = function (response) {
        var message = response.responseBody
        try {
            var json = JSON.parse(message);
            console.log("Message: ", json)
            callback(json.result)
        } catch (e) {
            console.log('This does not look like a valid JSON: ', message.data);
        }
    }

    subSocket = socket.subscribe(request)
    //New request to notify server sending data by WSprotocol
        window.fetch(document.location.href + 'ITradePushServer/StockInfo/' + clientID, {
            method: 'GET',
            headers: {
                'Host': 'HOST',
                'Accept': 'ACCEPT',
                'Accept-language': 'ACCEPT_LANGUAGE',
                'Content-Type': 'CONTENT_TYPE'
            },
            credentials: 'include',
        })
}

export function unsubscribe() {
    socket.unsubscribe()
}