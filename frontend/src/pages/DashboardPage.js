import React, { Children, cloneElement, Fragment, isValidElement, PureComponent, useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { get } from 'lodash';
import _ from 'lodash';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { 
	Chart, PieChart, RichTextEditor, RichText, 
	ToggleWrapper, Tabs, Slider, Form, MountHandler,
	Draggable, ErrorBoundary, toISOString, 
	toLocalString, ZoomablePannable, Progress, RangeSlider,
	getFileUrl, Select, MapBox, Marker, DynamicComponent,
	Link
} from "../components/dittofi-components";

function Container(props) {
	let {
		dispatch,
	} = props;

	const [tasks, setTasks] = useState({});

	let history = useHistory();

	var startPoll = (action) => {
	    console.log(`Starting poll for action ${action.name}`);

	    // Prevent polling the same action more than once.
	    if(tasks[action.name]) {
	        console.warn(`You're attempting to poll ${action.name} but it is already being polled.`);
	        return;
	    }
	    
	    // Handle stopping poll.
	    let canceled = false;
	    const cancel = () => canceled = true;

	    // Poll action.
	    const poll = () => {
	        console.log(`Polling action ${action.name}`);

	        if(canceled) {
	            return;
	        }

	        dispatch({ 
		        type: action.name, 
		        history: history, 
		        inputVariables: action.payload ? action.payload : {}
	        });
	        
	        setTimeout(() => poll(), action.pollingPeriod);
	    }

	    setTasks({...tasks, [action.name]: cancel});
	    poll();
	}

	var stopPoll = (actionName) => {	    
	    console.log(`Stopping poll for action ${actionName}`);

	    // Check task exists.
	    if(!tasks[actionName]) {
	        console.warn(`You're attempting to stop polling ${actionName} but this action is not running.`);
	        return;
	    }

	    tasks[actionName]();
	}

	var runAction = (action) => {
		if(action.pollingPeriod && action.pollingPeriod > 0) {
			startPoll(action);
		} else {
			dispatch({
				inputVariables: action.payload ? action.payload : {},
				params: { 
				},
				history: history,
				type: action.name,
				timeout: action.timeout && action.timeout > 0 ? action.timeout : null,
			});
		}
	}

	useEffect(() => {
		return () => {
			Object.keys(tasks).forEach((t) => stopPoll(t));
		}
	}, [tasks]);

	useEffect(() => {
		window.scrollTo(0, 0);
		/* TODO - run sagas on page mount (be sure not to rerun in page parameter change hook) */
	}, []);

	return (
		<ErrorBoundary>
			
				
	<div className="card shadow-sm"
	>
			
	<div className="card-body" id="i80m03"
	>
			
	<div className="d-flex" id="i5252z"
	>
			
	<div className="me-3"
	>
			
	<img id="i2qk2k" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11447-avatar.svg"
	>
	</img>

	</div>

			
	<div className="flex-grow-1"
	>
			
	<div className="d-flex mb-2 align-items-center flex-wrap"
	>
			
	<div
	>
			
	<div
	>
			
	<h5
	>
			James Virgo
	</h5>

	</div>

			
	<div className="d-flex flex-wrap text-muted"
	>
			
	<div className="d-flex align-items-center me-2"
	>
			
	<i className="bi me-1 bi-person"
	>
	</i>

			
	<span
	>
			CEO
	</span>

	</div>

			
	<div className="d-flex align-items-center me-2"
	>
			
	<i className="bi me-1 bi-map"
	>
	</i>

			
	<span
	>
			United Kingdom
	</span>

	</div>

			
	<div className="d-flex align-items-center"
	>
			
	<i className="bi me-1 bi-mailbox"
	>
	</i>

			
	<span
	>
			email@email.com
	</span>

	</div>

	</div>

	</div>

			
	<div className="ms-auto"
	>
			
	<div className="d-flex"
	>
			
	<h6 className="text-muted fw-bold"
	>
			Member since 2021
	</h6>

	</div>

			
	<div className="d-flex"
	>
			
	<a className="btn btn-primary me-2"
	>
			Button
	</a>

			
	<a className="btn border-primary"
	>
			Button
	</a>

	</div>

	</div>

	</div>

			
	<div className="d-flex" id="ir5kf3"
	>
			
	<div className="d-flex"
	>
			
	<div
	>
			
	<div
	>
			
	<span className="text-muted"
	>
			Last updated 3 minutes ago
	</span>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
				
	<span className="badge bg-success"
	>
			Success
	</span>

			
				
	<div className="alert alert-success d-flex align-items-center"
	>
			
	<i className="me-4 fas fa-check text-success"
	>
	</i>

			
	<div className="d-flex flex-column"
	>
			
	<h4 className="mb-1 text-success"
	>
			This is an alert
	</h4>

			
	<span
	>
			The alert component can be used to highlight certain parts of your page for higher content visibility.
	</span>

	</div>

	</div>

			
				
	<div className="card"
	>
			
	<img className="card-img-top" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/5621/11436-social-banner-placeholder.png"
	>
	</img>

			
	<div className="card-body"
	>
			
	<h5 className="card-title"
	>
			Card title
	</h5>

			
	<p className="card-text"
	>
			This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
	</p>

			
	<p className="card-text"
	>
			Some more text
	</p>

	</div>

	</div>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
