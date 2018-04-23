export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const LOGIN = 'LOGIN'
export const DELETE = 'DELETE'
export const PROTOCOL = 'http:'
export const HOSTNAME = 'tts.tx-tech.com'
export const PORT = '3000'
// export const PROTOCOL = window.location.protocol //"http:"
// export const HOSTNAME = window.location.hostname // "localhost"
// export const PORT = window.location.port // "3000"
export const SERVER = PROTOCOL + "//" + HOSTNAME + ":" + PORT + "/"

export const FSSERVER = "FSServer"
export const iTradeSERVER = "Actions"
export const DEFAULT = "Actions"

const HOST = 'mi-trade.masvn.com'
const USER_AGENT = 'Mozilla/5.0'
const ACCEPT_LANGUAGE = 'en-US,en;q=0.5'
const ACCEPT = 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
const CONTENT_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8'
const CONNECTION = 'keep-alive'

export const HEADERS = {
    'Host': HOST,
    'User-Agent': USER_AGENT,
    'Accept': ACCEPT,
    'Accept-language': ACCEPT_LANGUAGE,
    'Connection': CONNECTION,
    'Content-Type': CONTENT_TYPE
}
export const HEADERSCK = {
    'Host': HOST,
    'Accept': ACCEPT,
    'Accept-language': ACCEPT_LANGUAGE,
    'Content-Type': CONTENT_TYPE
}

export function getServerUrl() {
    return SERVER
}