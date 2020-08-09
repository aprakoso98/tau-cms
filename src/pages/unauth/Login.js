import React from 'react'
import { useDispatch } from 'react-redux'
import actionsWeb from 'src/redux/actions/web'

const Login = ({ history }) => {
	const dispatch = useDispatch()
	return <button onClick={() => {
		dispatch(actionsWeb({ loggedIn: true }))
		history.push('/dashboard')
	}}>Login</button>
}

export default Login