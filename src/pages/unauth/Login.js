import React from 'react'
import { useDispatch } from 'react-redux'
import actionsWeb from 'src/redux/actions/web'

const Login = ({ history }) => {
	const dispatch = useDispatch()
	return <button onClick={() => {
		localStorage.setItem('loggedIn', 'true')
		dispatch(actionsWeb({ loggedIn: true }))
		history.push('/article/list')
	}}>Login</button>
}

export default Login