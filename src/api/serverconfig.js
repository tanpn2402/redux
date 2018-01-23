export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const LOGIN = 'LOGIN'
export const DELETE = 'DELETE'
export const SERVER = 'http://192.168.150.251:'
export const PORT = '9090/iTradeMAS/'

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
    return SERVER + PORT
}