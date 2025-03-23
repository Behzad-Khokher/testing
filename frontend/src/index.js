import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import StoreProvider from './store-provider';
import App from './app';
import PagePage from './pages/PagePage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

import reducer from './redux/reducer.js';
import mainSaga from './sagas/saga.js';
import myMiddleware from './redux/middleware.js';

import * as Components from './components/dittofi-components.js';

Object.entries(Components).forEach(([componentName, component]) => {
	// Check if the component is a function (React component)
	if (typeof component === 'function') {
		Components.registerComponent(componentName, component);
	}
});

class _AppRouter extends React.Component {
	render() {
		let {
			state
		} = this.props;

		return (
			<div style={{height:"100%", width:"100%"}}>
				<Router>
					<Switch>
							
							<Route  exact  path="/Page">
								<PagePage/>
							</Route>
							
							<Route  exact  path="/">
								<HomePage/>
							</Route>
							
							<Route  exact  path="/Page-1">
								<DashboardPage/>
							</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = function(state){
		return {
			state: state
		}
}

const AppRouter = connect(mapStateToProps, null)( _AppRouter );

ReactDOM.render(
	<StoreProvider>
		<Components.ErrorBoundary>
			<App>
				<AppRouter />
			</App>
		</Components.ErrorBoundary>
	</StoreProvider>, document.getElementById('root')
);
