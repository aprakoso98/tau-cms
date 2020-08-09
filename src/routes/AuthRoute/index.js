import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import actionsWeb from 'src/redux/actions/web';
import Auth from 'src/pages/auth';
import Dashboard from 'src/pages/auth/Dashboard';
import ManageRoute from './Manage';

const AuthRoute = ({ match }) => {
	const dispatch = useDispatch()
	const { url, params } = match
	return <Auth>
		<Switch>
			<Route path="/dashboard" component={Dashboard} />
			<Route path={url + '/:part'} render={props => {
				if (params.path === 'manage')
					return <ManageRoute {...props} />
				return <ManageRoute />
			}} />
		</Switch>
	</Auth>
}

export default AuthRoute