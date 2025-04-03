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
	yield fork(on_app_started);
}
