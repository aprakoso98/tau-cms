/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import Login from 'src/pages/unauth/Login';
import AuthRoute from './AuthRoute';

const Routes = () => {
	const { loggedIn } = useSelector(state => state?.Web)
	return loggedIn ? <AuthRoute /> : <Login />
}

export default Routes