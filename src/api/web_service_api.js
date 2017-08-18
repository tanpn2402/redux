
import {FetchAPI, POST, PUT, GET, INSERT, DELETE} from './fetchAPI';

export function	get(id, param, dispatch, callback){
		return (FetchAPI(id,param, GET)).then(response => response).then( parseData => {
			dispatch(callback(parseData))
			return parseData
		}).catch(error => {
			return error
		})
	};

export function post(id,param, dispatch,callback){
		return (FetchAPI(id, param, POST)).then(response => response).then( parseData => {
			dispatch(callback(parseData))
			return parseData
		}).catch(error => {
			return error
		})
		
	};

export function insert(id,param, dispatch,callback){
		return(FetchAPI(id, param, INSERT)).then(response => response).then( parseData => {
			dispatch(callback(parseData));
		}).catch(error => {
			return error
		})

	};

export function dedete(id,param, dispatch, callback){
		return(FetchAPI(id, param, DELETE)).then(response => response).then( parseData => {
			dispatch(callback(parseData));
		}).catch(error => {
			return error
		})
	}

// }
