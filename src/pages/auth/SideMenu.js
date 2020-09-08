import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionUi from 'src/redux/actions/ui';
import { Link } from 'react-router-dom';
import { Container, View, ScrollView } from 'src/components/Container';
import HtmlParser from 'react-html-parser';


const SideMenu = () => {
	const dispatch = useDispatch()
	const { Web, UI: { data: { sideMenu } } } = useSelector(state => state)
	const [stateMenu, __] = useState({})
	const setStateMenu = v => __({ ...stateMenu, ...v })
	let ioio = 0
	const renderSideMenu = (arr = [], prevPath = "") => {
		ioio += 5
		const { minimizedDrawer } = Web
		return arr.rMap(obj => {
			const { name, path, icon, subMenu } = obj
			const key = name + path + icon
			const pathname = prevPath + path
			let view = `<i class="ta-c w-10 ${icon || 'fa fa-home'} ${minimizedDrawer ? 'f-7' : 'f-5'}"></i>${!minimizedDrawer ? `<div>${name}</div>` : ''}`
			view = HtmlParser(view)
			return <div style={{ cursor: 'pointer' }}>
				{subMenu ?
					<div className={`flex p-2 ${minimizedDrawer ? 'jc-c' : 'jc-sb'} ai-c`} onClick={() => setStateMenu({ [key]: !stateMenu[key] })}>
						<div title={name} className={`flex ai-c ${minimizedDrawer && 'as-c'}`}>{view}</div>
						{!minimizedDrawer && <i className={`pr-2 ion-ios-arrow-${stateMenu[key] ? 'up' : 'right'}`} />}
					</div> :
					<Link to={{ pathname, state: obj }} title={name} className={`${window.location.href.includes(pathname) ? 'c-link' : 'c-dark'} p-2 flex ai-c ${minimizedDrawer && 'jc-c'}`}>{view}</Link>
				}
				{stateMenu[key] && subMenu && <div style={{ marginLeft: minimizedDrawer ? 0 : ioio + 10 }}>{renderSideMenu(subMenu, pathname)}</div>}
			</div>
		})
	}
	useEffect(() => {
		dispatch(actionUi())
	}, [dispatch])

	return <Container style={{ ...Web.minimizedDrawer && { width: 'auto' } }} className='bc-light w-1/4'>
		<View direction="row" className="p-5">
			<img className="h-full w-auto" alt="" src={Web.minimizedDrawer ? require('src/assets/images/favicon.png') : require('src/assets/images/logo-tau.png')} />
		</View>
		{!Web.minimizedDrawer && <div className="p-5 pt-1">
			<img className="h-auto w-15" alt="" src={require('src/assets/images/Laki-laki.svg')} />
			<div className="pt-3">Superadmin</div>
		</div>}
		<ScrollView className="side-menu p-3">
			{sideMenu && renderSideMenu(sideMenu)}
		</ScrollView>
	</Container >
}

export default SideMenu