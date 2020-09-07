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
			<View justify="sb" className="bc-grey-soft ai-c" direction="row">
				<ButtonOpacity onClick={() => dispatch(actionsWeb({ minimizedDrawer: !Web.minimizedDrawer }))} flex={false} className="p-3">
					<i className="fa fa-bars c-text f-7" />
				</ButtonOpacity>
				<View className="c-text">{Web.title}</View>
				<ButtonOpacity onClick={() => dispatch(actionsWeb({ loggedIn: false }))} flex={false} className="c-text p-3">Keluar</ButtonOpacity>
			</View>
			<View flex className="bc-grey-soft p-3" style={{ paddingTop: 0 }}>
				<div className="flex flex-col h-full bc-light brd-1 p-3">{children}</div>
			</View>
		</View>
	</Container>
}

export default Auth
