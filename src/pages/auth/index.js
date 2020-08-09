import React from 'react';
import SideMenu from './SideMenu';
import actionsWeb from 'src/redux/actions/web';
import { useDispatch, useSelector } from 'react-redux';

const Auth = ({ children }) => {
	const dispatch = useDispatch()
	const Web = useSelector(state => state.Web)
	return <div className="flex h-full">
		<SideMenu />
		<div className="flex flex-1 flex-col">
			<div className="flex bc-blue jc-sb p-5">
				<button onClick={() => dispatch(actionsWeb({ minimizedDrawer: !Web.minimizedDrawer }))}>
					<i className="fa fa-bars c-light f-7" />
				</button>
				<button onClick={() => dispatch(actionsWeb({ loggedIn: false }))} className="c-light">Keluar</button>
			</div>
			<div id="container" className="flex flex-col p-5 flex-1">{children}</div>
		</div>
	</div>
}

export default Auth
