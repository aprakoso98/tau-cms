import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Login from 'src/pages/unauth/Login';

const Routes = () => {
	return <Switch>
		<Route path="/login" component={Login} />
		<RouteConfig path="/:path" authed={localStorage.getItem('loggedIn') === 'true'} component={AuthRoute} />
	</Switch>
}

const RouteConfig = ({ component: Component, authed, ...rest }) => {
	return <Route
		{...rest}
		render={props => authed === true
			? <Component {...props} />
			: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
	/>
}

export default Routes