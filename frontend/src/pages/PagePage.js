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
			
				
	<div className="df-vh-100 d-flex df-d-flex df-bg-light df-overflow-auto"
	>
			
	<div className="df-bg-primary df-d-flex df-flex-column df-nav-sidebar df-overflow-auto"
	>
			
	<div
	>
			
	<a className="d-inline-block df-w-100 df-d-flex df-align-items-center df-text-white df-text-decoration-none" href="#" target="_self" type="external"
	>
			
	<div className="df-d-flex df-rounded df-w-25 df-p-4"
	>
			
	<img className="df-w-100 df-rounded" src="https://dittofipublicfiles.s3.us-west-2.amazonaws.com/1960/2511-logo_real_white_d_only.png"
	>
	</img>

	</div>

			
	<span className="df-fs-5"
	>
			Application Name
	</span>

	</a>

	</div>

			
	<div className="df-flex-grow-1"
	>
			
	<div
	>
			
	<h5 className="df-p-3 df-text-white"
	>
			CORE
	</h5>

			
	<ToggleWrapper className="d-dropdown df-w-100 d--closed"
	>
			
	<div className="d-dropdown-toggle df-w-100 df-text-white df-p-3" role="d-toggle-button"
	>
			
	<i className="fa-tachometer fa"
	>
	</i>

			
	<i className="fas fa-angle-down d-icon-dropdown-toggle"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Dashboards
	</span>

	</div>

			
	<div className="d-dropdown-list df-bg-transparent df-position-static" role="d-toggle-wrapper"
	>
			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/" type="spa"
	>
			
	<i className="fas fa-home"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Blank
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-align-items-center df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/dashboard" type="spa"
	>
			
	<i className="fa-tachometer fa"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Dashboard
	</span>

	</Link>

	</div>

	</ToggleWrapper>

	</div>

			
	<div id="i0gasl"
	>
			
	<h5 className="df-p-3 df-text-white"
	>
			APP VIEWS
	</h5>

			
	<ToggleWrapper className="d-dropdown df-w-100 d--closed"
	>
			
	<div className="d-dropdown-toggle df-w-100 df-text-white df-p-3" role="d-toggle-button"
	>
			
	<i className="fa fa-lock"
	>
	</i>

			
	<i className="fas fa-angle-down d-icon-dropdown-toggle"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Authentication
	</span>

	</div>

			
	<div className="d-dropdown-list df-bg-transparent df-position-static" role="d-toggle-wrapper"
	>
			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/login" type="spa"
	>
			
	<i className="fas fa-lock"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Login
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/register" type="spa"
	>
			
	<i className="fa fa-lock"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Register
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/forgot-password" type="spa"
	>
			
	<i className="fas fa-lock"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Forgot Password
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/reset-password" type="spa"
	>
			
	<i className="fas fa-lock"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Reset Password
	</span>

	</Link>

	</div>

	</ToggleWrapper>

			
	<ToggleWrapper className="d-dropdown df-w-100 d--closed"
	>
			
	<div className="d-dropdown-toggle df-w-100 df-text-white df-p-3" role="d-toggle-button"
	>
			
	<i className="fa-tachometer fa"
	>
	</i>

			
	<i className="fas fa-angle-down d-icon-dropdown-toggle"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Pricing
	</span>

	</div>

			
	<div className="d-dropdown-list df-bg-transparent df-position-static" role="d-toggle-wrapper"
	>
			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/pricing" type="spa"
	>
			
	<i className="fas fa-home"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Pricing
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/invoice" type="spa"
	>
			
	<i className="fa-tachometer fa"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Invoice
	</span>

	</Link>

	</div>

	</ToggleWrapper>

			
	<ToggleWrapper className="d-dropdown df-w-100 d--closed"
	>
			
	<div className="d-dropdown-toggle df-w-100 df-text-white df-p-3" role="d-toggle-button"
	>
			
	<i className="fa-tachometer fa"
	>
	</i>

			
	<i className="fas fa-angle-down d-icon-dropdown-toggle"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Knowledge Base
	</span>

	</div>

			
	<div className="d-dropdown-list df-bg-transparent df-position-static" role="d-toggle-wrapper"
	>
			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/knowledge-base" type="spa"
	>
			
	<i className="fas fa-home"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Home
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/knowledge-base-category" type="spa"
	>
			
	<i className="fa-tachometer fa"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Category
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-ps-5" target="_self" to="/knowledge-base-article" type="spa"
	>
			
	<i className="fa-tachometer fa"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Article
	</span>

	</Link>

	</div>

	</ToggleWrapper>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3" id="iui21m" target="_self" to="/profile" type="spa"
	>
			
	<i className="fas fa-home"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Profile
	</span>

	</Link>

	</div>

			
	<div
	>
			
	<h5 className="df-p-3 df-text-white"
	>
			UI TOOLKIT
	</h5>

	</div>

			
	<ToggleWrapper className="d-dropdown df-w-100 d--open"
	>
			
	<div className="d-dropdown-toggle df-w-100 df-text-white df-p-3" role="d-toggle-button"
	>
			
	<i className="fa fa-cog"
	>
	</i>

			
	<i className="fas fa-angle-down d-icon-dropdown-toggle"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Components
	</span>

	</div>

			
	<div className="d-dropdown-list df-bg-transparent df-position-static" role="d-toggle-wrapper"
	>
			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-align-items-center df-ps-5" target="_self" to="/tables" type="spa"
	>
			
	<i className="fas fa-table"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Tables
	</span>

	</Link>

			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-align-items-center df-ps-5" target="_self" to="/graphs" type="spa"
	>
			
	<i className="fa-bar-chart fa"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Graphs
	</span>

	</Link>

	</div>

	</ToggleWrapper>

	</div>

			
	<div
	>
			
	<Link className="d-inline-block df-w-100 df-d-flex df-text-white df-text-decoration-none df-p-3 df-align-items-center" target="_self" to="/chat" type="spa"
	>
			
	<i className="fas fa-question-circle"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Help Center
	</span>

	</Link>

			
	<div
	>
			
	<a className="d-inline-block df-w-100 df-d-flex df-align-items-center df-text-decoration-none df-text-white df-p-3" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-cog"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Settings
	</span>

	</a>

	</div>

	</div>

	</div>

			
	<div className="df-flex-grow-1 d-flex df-d-flex df-flex-column"
	>
			
	<div className="df-bg-white df-p-3 df-shadow"
	>
			
	<div className="df-d-flex df-align-items-center df-justify-content-between"
	>
			
	<div
	>
			
	<div className="df-d-flex"
	>
			
	<div className="df-d-flex"
	>
			
	<input className="d-input d-m-0 df-m-0 df-bg-light df-rounded-start" placeholder="Search for..." type=""
	>
	</input>

			
	<button className="d-button fa df-bg-primary df-rounded-end fa-search"
	>
	</button>

	</div>

	</div>

	</div>

			
	<div className="df-d-flex df-align-items-center"
	>
			
	<ToggleWrapper className="d-dropdown d--closed"
	>
			
	<div className="d-dropdown-toggle df-px-3" role="d-toggle-button"
	>
			
	<div className="df-position-relative"
	>
			
	<i className="fas fa-bell"
	>
	</i>

			
	<span className="df-position-absolute df-top-0 df-start-100 df-translate-middle df-text-white df-bg-danger df-rounded df-small df-p-1"
	>
			0
	</span>

	</div>

	</div>

			
	<div className="d-dropdown-list df-bg-white df-border df-rounded" role="d-toggle-wrapper"
	>
			
	<a className="d-inline-block df-w-100 df-d-flex df-align-items-center df-text-decoration-none df-p-3 df-text-dark" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-bell"
	>
	</i>

			
	<span className="df-ms-3"
	>
			New Notification
	</span>

	</a>

	</div>

	</ToggleWrapper>

			
	<ToggleWrapper className="d-dropdown d--closed"
	>
			
	<div className="d-dropdown-toggle df-px-3" role="d-toggle-button"
	>
			
	<div className="df-position-relative"
	>
			
	<i className="fas fa-envelope"
	>
	</i>

			
	<span className="df-position-absolute df-top-0 df-start-100 df-translate-middle df-text-white df-bg-danger df-rounded df-small df-p-1"
	>
			1
	</span>

	</div>

	</div>

			
	<div className="d-dropdown-list df-bg-white df-border df-rounded" role="d-toggle-wrapper"
	>
			
	<a className="d-inline-block df-w-100 df-d-flex df-align-items-center df-text-decoration-none df-p-3 df-text-dark" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-envelope"
	>
	</i>

			
	<span className="df-ms-3"
	>
			New Message
	</span>

	</a>

	</div>

	</ToggleWrapper>

			
	<ToggleWrapper className="d-dropdown d--open"
	>
			
	<div className="d-dropdown-toggle df-px-3" role="d-toggle-button"
	>
			
	<span className="df-me-2"
	>
			John Doe
	</span>

			
	<i className="fas fa-user"
	>
	</i>

	</div>

			
	<div className="d-dropdown-list df-bg-white df-border df-rounded" role="d-toggle-wrapper"
	>
			
	<a className="d-inline-block df-w-100 df-d-flex df-align-items-center df-text-decoration-none df-p-3 df-text-dark" href="#" target="_self" type="external"
	>
			
	<i className="fas fa-home"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Home
	</span>

	</a>

			
	<Link className="d-inline-block df-w-100 df-align-items-center df-d-flex df-text-dark df-p-3 df-text-decoration-none" target="_self" to="/profile" type="spa"
	>
			
	<i className="fas fa-user"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Profile
	</span>

	</Link>

			
	<a className="d-inline-block df-w-100 df-d-flex df-align-items-center df-text-decoration-none df-p-3 df-text-dark" href="#" target="_self" type="external" onClick={(e) => {
			var value = e.target.value;
		}}
	>
			
	<i className="fa fa-sign-out"
	>
	</i>

			
	<span className="df-ms-3"
	>
			Logout
	</span>

	</a>

	</div>

	</ToggleWrapper>

	</div>

	</div>

	</div>

			
	<div className="df-flex-grow-1 df-overflow-auto df-p-4" id="io06b"
	>
			
	<div className="df-h-100 df-d-flex" id="i8e9g"
	>
			
	<div className="df-me-3 df-p-3 df-rounded df-bg-white df-border" id="i2q9c"
	>
			
	<ul className="d-list-unstyled" id="i68ge"
	>
			
	<li id="ihctl"
	>
			
	<div className="df-d-flex df-align-items-center df-py-2" id="ibyqf"
	>
			
	<div className="df-bg-primary df-text-white df-p-2 df-rounded-circle df-me-2 df-small" id="i71jl"
	>
			
	<span id="ixvnt"
	>
			SV
	</span>

	</div>

			
	<div id="ibfsy"
	>
			
	<h4 className="df-mb-1" id="ihpvt"
	>
			Samuel Virgo
	</h4>

			
	<span className="df-small" id="iyf7i"
	>
			samuelvirgo5@gmail.com
	</span>

	</div>

	</div>

	</li>

			
	<li id="imhhvp"
	>
			
	<div className="df-d-flex df-align-items-center df-py-2" id="ig0833"
	>
			
	<div className="df-bg-primary df-text-white df-p-2 df-rounded-circle df-me-2" id="i819h"
	>
			
	<span id="iq164"
	>
			SV
	</span>

	</div>

			
	<div id="infro5"
	>
			
	<h4 className="df-mb-1" id="i9bpw"
	>
			Samuel Virgo
	</h4>

			
	<span id="ickii"
	>
			samuelvirgo5@gmail.com
	</span>

	</div>

	</div>

	</li>

			
	<li
	>
			
	<li id="i759nn"
	>
			
	<div className="df-d-flex df-align-items-center df-py-2" id="i34mmo"
	>
			
	<div className="df-bg-primary df-text-white df-p-2 df-rounded-circle df-me-2" id="iehwls"
	>
			
	<span id="iddn18"
	>
			SV
	</span>

	</div>

			
	<div id="ikjiw7"
	>
			
	<h4 className="df-mb-1" id="ibuz16"
	>
			Samuel Virgo
	</h4>

			
	<span id="ixwgqz"
	>
			samuelvirgo5@gmail.com
	</span>

	</div>

	</div>

	</li>

	</li>

	</ul>

	</div>

			
	<div className="df-flex-grow-1 df-rounded df-bg-white df-border df-d-flex df-flex-column df-overflow-hidden" id="ip25k"
	>
			
	<div className="df-bg-light df-p-3 df-d-flex" id="ip4dr3"
	>
			
	<div id="i7skx8"
	>
			
	<h4 className="df-mb-1" id="i6p47q"
	>
			Samuel Virgo
	</h4>

	</div>

	</div>

			
	<div className="df-flex-grow-1 df-p-3 df-overflow-auto" id="ij3kjj"
	>
			
	<div className="df-d-flex df-align-items-start df-mb-3" id="io8yo2"
	>
			
	<div className="df-p-2 df-rounded df-bg-primary df-me-2 df-text-white" id="ih6ldd"
	>
			
	<span id="i7wjnt"
	>
			SV
	</span>

	</div>

			
	<div className="df-p-3 df-rounded df-bg-warning df-flex-grow-1" id="ihly1m"
	>
			
	<span id="i56b4h"
	>
			See you later!
	</span>

	</div>

	</div>

			
	<div className="df-d-flex df-align-items-start df-flex-row-reverse df-mb-3" id="i6nc68"
	>
			
	<div className="df-p-2 df-rounded df-bg-primary df-text-white df-ms-2" id="innk2i"
	>
			
	<span id="im97eo"
	>
			SV
	</span>

	</div>

			
	<div className="df-p-3 df-rounded df-flex-grow-1 df-bg-danger df-text-white" id="iidqhk"
	>
			
	<span id="iwsxtn"
	>
			OK, understood!
	</span>

	</div>

	</div>

			
	<div className="df-d-flex df-align-items-start df-flex-row-reverse df-mb-3" id="ilal1d"
	>
			
	<div className="df-p-2 df-rounded df-bg-primary df-text-white df-ms-2" id="ivrckw"
	>
			
	<span id="ieanmh"
	>
			SV
	</span>

	</div>

			
	<div className="df-p-3 df-rounded df-flex-grow-1 df-bg-danger df-text-white" id="ib5f0c"
	>
			
	<span id="i6e5bk"
	>
			OK, understood!
	</span>

	</div>

	</div>

			
	<div className="df-d-flex df-align-items-start df-mb-3" id="infbxn"
	>
			
	<div className="df-p-2 df-rounded df-bg-primary df-me-2 df-text-white" id="irtuq6"
	>
			
	<span id="izdn06"
	>
			SV
	</span>

	</div>

			
	<div className="df-p-3 df-rounded df-bg-warning df-flex-grow-1" id="ih4aoc"
	>
			
	<span id="im0clf"
	>
			See you later!
	</span>

	</div>

	</div>

			
	<div className="df-d-flex df-align-items-start df-flex-row-reverse df-mb-3" id="ijpk16"
	>
			
	<div className="df-p-2 df-rounded df-bg-primary df-text-white df-ms-2" id="ifgd3r"
	>
			
	<span id="iqe31p"
	>
			SV
	</span>

	</div>

			
	<div className="df-p-3 df-rounded df-flex-grow-1 df-bg-danger df-text-white" id="i8hirg"
	>
			
	<span id="irtufh"
	>
			OK, understood!
	</span>

	</div>

	</div>

			
	<div className="df-d-flex df-align-items-start df-flex-row-reverse df-mb-3" id="io0ow4"
	>
			
	<div className="df-p-2 df-rounded df-bg-primary df-text-white df-ms-2" id="iejca9"
	>
			
	<span id="iotmhg"
	>
			SV
	</span>

	</div>

			
	<div className="df-p-3 df-rounded df-flex-grow-1 df-bg-danger df-text-white" id="if0dkj"
	>
			
	<span id="ik0brg"
	>
			OK, understood!
	</span>

	</div>

	</div>

	</div>

			
	<div className="df-d-flex df-p-3 df-align-items-center" id="ifafiu"
	>
			
	<input className="d-input df-m-0 df-me-2 df-rounded" id="iyl27w" placeholder="Enter message..." type=""
	>
	</input>

			
	<button className="d-button df-bg-primary df-rounded" id="ietw0k"
	>
			Send
	</button>

	</div>

	</div>

	</div>

	</div>

	</div>

	</div>

			
		</ErrorBoundary>
	);
}

const mapStateToProps = function(state){
    return state.reducer
}

export default connect(mapStateToProps, null) ( Container );
