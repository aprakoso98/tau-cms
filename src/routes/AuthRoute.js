import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from 'src/pages/auth';
import Article from 'src/pages/auth/Article';
import Manage from 'src/pages/auth/Manage';
import Files from 'src/pages/auth/Files';
import SetCms from 'src/pages/auth/SetCms';

const AuthRoute = () => {
	return <Auth>
		<Switch>
			<Route path="/files" exact component={Files} />
			<Route path="/article/:path" component={Article} />
			<Route path="/manage/:path" component={Manage} />
			<Route path="/set/:path" component={SetCms} />
		</Switch>
	</Auth>
}

export default AuthRoute
