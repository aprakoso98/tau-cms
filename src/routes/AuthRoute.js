import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from 'src/pages/auth';
import Dashboard from 'src/pages/auth/Dashboard';
import Article from 'src/pages/auth/Article';

const AuthRoute = () => {
	return <Auth>
		<Switch>
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/article/:path" component={Article} />
		</Switch>
	</Auth>
}

export default AuthRoute