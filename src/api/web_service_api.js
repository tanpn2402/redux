import { POST, PUT, GET, LOGIN, DELETE } from './serverconfig';
import { FetchAPI} from './fetchAPI';
import { showMessageBox } from '../actions/notification'

export function get(id, param, dispatch, successHandler, failHandler) {
	return (FetchAPI(id, param, GET)).then(response => response).then(parseData => {
		dispatch(successHandler(parseData))
		return parseData
	}).catch(error => {
		if (failHandler)
			failHandler(error)
		return error
	})
};

export function post(id, param, dispatch, successHandler, failHandler) {
	return (FetchAPI(id, param, POST)).then(response => response).then(parseData => {
		if (parseData.mvErrorCode && parseData.mvErrorCode != 0) {
			dispatch(showMessageBox("Error", parseData.mvErrorResult))
		} else {
			dispatch(successHandler(parseData))
			return parseData
		}

	}).catch(error => {
		if (failHandler && error.ok !== undefined && !error.ok)
			failHandler(error)
		return error
	})

};

export function test(id, param) {
	return (FetchAPI(id, param, POST)).then(response => response).then(parseData => {
		return parseData
	}).catch(error => {
		return error
	})

};

export function report(id, param, dispatch, callback) {
	console.log(id)
	return (FetchAPI(id, param, 'REPORT')).then(response => response).then(parseData => {
		dispatch(callback(parseData))
		return parseData
	}).catch(error => {
		return error
	})

};

export function login(id, param, dispatch, successHandler, failHandler) {
	return (FetchAPI(id, param, LOGIN)).then(response => response).then(parseData => {
		dispatch(successHandler(parseData));
	}).catch(error => { 
		if(failHandler)
			dispatch(failHandler(error));
	})

};

export function dedete(id, param, dispatch, callback) {
	return (FetchAPI(id, param, DELETE)).then(response => response).then(parseData => {
		dispatch(callback(parseData));
	}).catch(error => {
		return error
	})
}
export function authCardMatrix(id, paramOfAuthCard, dispatch, callback, paramOfCallback, failHandler) {
	return (FetchAPI(id, paramOfAuthCard, POST)).then(response => response).then(parseData => {
		dispatch(callback(paramOfCallback, parseData))
		return parseData
	}).catch(error => {
		failHandler(error)
		return error
	})

}

export function fetch(action, param, method, successHandler, failHandler) {
	return (FetchAPI(action, param, method)).then(response => response).then(parseData => {
		successHandler(parseData)
		return parseData
	}).catch(error => {
		if (failHandler)
			failHandler(error)
		return error
	})
}

export  function mdsGET(url, param, dispatch, successHandler, failHandler) {
	return (FetchAPI(url, param, "MDSGET")).then(response => response).then(parseData => {
		dispatch(successHandler(parseData))
		return parseData
	}).catch(error => {
		if (failHandler)
			failHandler(error)
		return error
	})
};