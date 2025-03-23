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
			
				
	<h1 id="i9ae"
	>
			Hello world
	</h1>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
