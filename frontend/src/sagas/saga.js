import * as actions from '../redux/actions.js';
import * as serverApi from '../api/api.js';
import { makePath } from '../api/restApi.js';
import _ from "lodash";
import { eventChannel, END } from 'redux-saga';
import * as Yup from 'yup';
import * as functions from '../utils/functions.js';
import { toLocalStorage, fromLocalStorage } from '../components/dittofi-components';
import { call, put, take, fork, select } from 'redux-saga/effects';

import { api } from '../api/rtkQuery';

const _sounds = {};
const _paginatedEndpoints = {};

async function _runPaginatedEndpoint({ id, idx, srcEndpoint, paginatedEndpoint, srcPayload, pathKey, pathIdx } ) {
	let response;
	if(_paginatedEndpoints[id]) {
		console.log("Found paginated id. Running paginated endpoint.");
		response = await paginatedEndpoint({path_variables: { [pathKey]: _paginatedEndpoints[id], [pathIdx]: idx }});
		if(response.status === 200) {
			console.log(response);
			return response;
		} else {
			console.log("Error running paginated id");
			delete _paginatedEndpoints[id];
		}
	}
	
	// No valid pagination id try running source endpoint & then running the paginated endpoint.
	console.log("No paginated id. Running src endpoint");
	response = await srcEndpoint(srcPayload);
	if(!response || response.status !== 200) {
		return response;
	}

	const paginatedId = response.data;

	response = await paginatedEndpoint({path_variables: { [pathKey]: response.data, [pathIdx]: idx }})
	if(response.status === 200 && response.data) {
		_paginatedEndpoints[id] = paginatedId;
	}
	
	return response;
}

async function _getValidationErrors(schema, obj) {
	let validationErrors = {};
	try {
		await schema.validate(obj);
	} catch(err) {
		validationErrors = err;
	}

	return validationErrors;
}

function* log_event() {
	while(true) {
		let payload = yield take(actions.log_event);
		try {
			console.log(payload)
		} catch(error) {
			console.warn(error);
		}
	}
}

let ws;
function* createEventChannel(path) {
	return eventChannel(emit => {
		function createWs() {
			let { hostname, port, protocol } = window.location;
			protocol = protocol === "https:" ? "wss:" : "ws:";
			ws = new WebSocket( `${protocol}//${hostname}:${port}/iapi${path}`);
			
			ws.onmessage = function(message) {
				let data;
				try {
					data = JSON.parse(message.data)
				} catch (e) {
					console.warn("Could not parse websocket data - expected json data.")
				}
				
				emit(data);
			};

			ws.onopen = function(evt) {
				console.log("websocket connected...");
			};

			ws.onerror = function() { 
				console.log("websocket errored...");
			};

			ws.onclose = function(e) {
				if(e.code === 1005) {
					console.log("websocket closed...");
					emit(END);
				} else {
					console.log("websocket closed unexpectedly. Attempting to reconnect in 4 seconds...");
					setTimeout(() =>  {
	                    createWs();
	                }, 4000);
				}
			}
		}

		createWs();

		return () => {
			console.log("websocket closed...");
			ws.close();
		};
	});
}

function* _initializeWebSocketsChannel() {
	while(true) {
		let { path, payload } = yield take(actions.init_websocket);
		path = makePath(path, payload);

		const channel = yield call(createEventChannel, path);
		while (true) {
			const { message, type } = yield take(channel);
			console.log(message);
			console.log(type);
		}
	}
}

const delay = ms => new Promise(resolve => setTimeout(() => resolve('timed out'), ms));

function* GetMe() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.GetMe);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var HttpSuccessCode3Variable = 200

			
			
			

const response1110371 = yield call(serverApi.GetMeEndpoint, null);
const GetMeEndpointResponseAsVariable = response1110371.data;
const GetMeEndpointResponseCodeAsVariable = response1110371.status;
if (HttpSuccessCode3Variable == GetMeEndpointResponseCodeAsVariable) {
yield put(actions.changeInput('BasicAuthLogin', GetMeEndpointResponseAsVariable));
}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* Logout() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.Logout);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var HttpSuccessCode0Variable = 200

			
			
			

const response1110365 = yield call(serverApi.LogoutEndpoint, null);

const LogoutEndpointResponseCodeAsVariable = response1110365.status;
if (HttpSuccessCode0Variable == LogoutEndpointResponseCodeAsVariable) {

}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* RequestPasswordReset() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.RequestPasswordReset);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var HttpSuccessCodeVariable = 200

			
			
			
payload = {};
payload['query_variables'] = {};
payload.query_variables['email'] = state.reducer?.['FormRequestPasswordResetEndpoint']?.['email'];

const response1110367 = yield call(serverApi.RequestPasswordResetEndpoint, payload);

const RequestPasswordResetEndpointResponseCodeAsVariable = response1110367.status;
if (HttpSuccessCodeVariable == RequestPasswordResetEndpointResponseCodeAsVariable) {

}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* SignUp() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.SignUp);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var HttpSuccessCode2Variable = 200

			
			
			
payload = {};

payload['body_variables'] = {};
payload.body_variables['Username'] = state.reducer?.['FormSignUpEndpoint']?.['Username'];
payload.body_variables['Password'] = state.reducer?.['FormSignUpEndpoint']?.['Password'];
const response1110374 = yield call(serverApi.SignUpEndpoint, payload);

const SignUpEndpointResponseCodeAsVariable = response1110374.status;
if (HttpSuccessCode2Variable == SignUpEndpointResponseCodeAsVariable) {

}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* Login() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.Login);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			
			
var HttpSuccessCode1Variable = 200

			
			
			
payload = {};

payload['body_variables'] = {};
payload.body_variables['Username'] = state.reducer?.['FormLoginEndpoint']?.['Username'];
payload.body_variables['Password'] = state.reducer?.['FormLoginEndpoint']?.['Password'];
const response1110369 = yield call(serverApi.LoginEndpoint, payload);

const LoginEndpointResponseCodeAsVariable = response1110369.status;
if (HttpSuccessCode1Variable == LoginEndpointResponseCodeAsVariable) {

}
		} catch(error) {
            console.warn(error)
		}
	}
}
function* on_app_started() {
	while(true) {
		let { inputVariables, params, history } = yield take(actions.on_app_started);
		
		// Write page parameters to temporary state for standard access.
		let state = yield select();
		params && Object.keys(params).forEach((k) => state.reducer[k] = params[k]);
		
		let payload;
		
		try {
			
			
			yield put(actions.changeInput("_app_initialized", true));
		} catch(error) {
            console.warn(error)
		}
	}
}

export default function* saga() {
	yield fork(log_event);
	yield fork(_initializeWebSocketsChannel);
	yield fork(GetMe);
	yield fork(Logout);
	yield fork(RequestPasswordReset);
	yield fork(SignUp);
	yield fork(Login);
	yield fork(on_app_started);
}
