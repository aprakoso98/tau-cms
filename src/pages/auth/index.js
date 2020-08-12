import React from 'react';
import SideMenu from './SideMenu';
import actionsWeb from 'src/redux/actions/web';
import { useDispatch, useSelector } from 'react-redux';
import { Container, View } from 'src/components/Container';
import { ButtonOpacity } from 'src/components/Button';

const Auth = ({ children }) => {
	const dispatch = useDispatch()
	const Web = useSelector(state => state.Web)
	return <Container direction="row" className="h-full">
		<SideMenu />
		<View flex>
			<View justify="sb" className="bc-blue ai-c" direction="row">
				<ButtonOpacity onClick={() => dispatch(actionsWeb({ minimizedDrawer: !Web.minimizedDrawer }))} flex={false} className="p-5">
					<i className="fa fa-bars c-light f-7" />
				</ButtonOpacity>
				<View className="c-light">{Web.title}</View>
				<ButtonOpacity onClick={() => dispatch(actionsWeb({ loggedIn: false }))} flex={false} className="c-light p-5">Keluar</ButtonOpacity>
			</View>
			<View flex className="bc-light p-5">{children}</View>
		</View>
	</Container>
}

export default Auth
