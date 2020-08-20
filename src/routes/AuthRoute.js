import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from 'src/pages/auth';
import Article from 'src/pages/auth/Article';
import Manage from 'src/pages/auth/Manage';

const AuthRoute = () => {
	return <Auth>
		<Switch>
			<Route path="/article/:path" component={Article} />
			<Route path="/manage/:path" component={Manage} />
		</Switch>
	</Auth>
}

export default AuthRoute