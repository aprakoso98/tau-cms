import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'src/components/Input';
import actionsWeb from 'src/redux/actions/web';
import { login } from 'src/utils/api';

const Login = () => {
	const dispatch = useDispatch()
	const [username, setUname] = useState('')
	const [password, setPwd] = useState('')
	const doLogin = async () => {
		const { data } = await login({ username, password })
		if (data === true)
			dispatch(actionsWeb({ loggedIn: true }))
		else
			alert('Username atau Password tidak salah, silahkan cek kembali')
	}
	return <div className="flex flex-1 h-full justify-center items-center">
		<div className="bg-white w-1/4 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
			<div className="mb-4">
				<label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">Username</label>
				<Input autoFocus
					id="username"
					value={username}
					placeholder="Username"
					onChange={e => setUname(e.target.value)}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
				/>
			</div>
			<div className="mb-6">
				<label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password</label>
				<Input
					value={password}
					id="password"
					type="password"
					placeholder="******************"
					onChange={e => setPwd(e.target.value)}
					className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
				/>
			</div>
			<div className="flex items-center justify-between">
				<button onClick={doLogin} style={{
					border: 'solid 1px rgba(0,0,0,.5)'
				}} className="w-full hover:bg-blue-dark font-bold py-2 px-4 rounded" type="button">Sign In</button>
			</div>
		</div>
	</div>
}

export default Login