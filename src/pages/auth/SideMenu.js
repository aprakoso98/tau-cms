import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionUi from 'src/redux/actions/ui';
import { Link } from 'react-router-dom';


const SideMenu = props => {
	const dispatch = useDispatch()
	const { Web, UI: { data: { sideMenu } } } = useSelector(state => state)
	const [subMenuOpen, setSubMenuOpen] = useState({})

	const openSubMenu = (id) => {
		let menu = { ...subMenuOpen }
		let parent = id.split('-').filter(a => a !== "").map(a => a + "-")
		parent.forEach((a, i) => {
			parent[i] = (parent[i - 1] || "") + parent[i]
			menu[parent[i]] = true
		})
		setSubMenuOpen({ ...menu, [id]: !subMenuOpen[id] })
	}

	const View = ({ name, viewPath, icon }) => <div className={`view-link flex ta-l ai-c jc-fs ${window.location.href.includes(viewPath) ? 'c-link' : 'c-dark'}`}>
		<i className={`ta-c w-13 ${icon || 'fa fa-home'} ${Web.minimizedDrawer ? 'f-10' : 'f-7'}`} />
		{!Web.minimizedDrawer && name}
	</div>

	const renderSideMenu = (arr, id = "", prevPath = "") => {
		return arr.rMap(
			({ name, path, icon, subMenu }, i) => {
				const viewId = (id + name + "-").replace(/\s/g, '')
				const viewPath = prevPath + path
				const props = { name, viewPath, icon }
				return subMenu ?
					<>
						<button key={i} className={`pb-5 ai-c flex ${Web.minimizedDrawer ? 'jc-c' : 'jc-sb'} bc-grey`} onClick={() => openSubMenu(viewId)}>
							<View {...props} />
							{!Web.minimizedDrawer && <i className={`pr-2 fa fa-chevron-${subMenuOpen[viewId] ? 'up' : 'right'}`} />}
						</button>
						<div onChange={a => console.log(a)} key={`${i}${i}`} className={`${!Web.minimizedDrawer && 'pl-5'} pt-0 flex flex-col bc-grey sub-menu`} style={{ height: subMenuOpen[viewId] ? 'auto' : 0 }}>
							{renderSideMenu(subMenu, viewId, viewPath)}
						</div>
					</> :
					<>
						<Link className={`pb-5 flex ${Web.minimizedDrawer ? 'jc-c' : 'jc-sb'} bc-grey`} key={i} to={viewPath}>
							<View {...props} />
						</Link>
					</>
			}
		)
	}

	useEffect(() => {
		dispatch(actionUi())
	}, [dispatch])

	return <div style={{ height: '100%', ...Web.minimizedDrawer && { width: 'auto' } }} id="side-menu" className="w-1/4 bc-grey flex flex-col">
		<div className="flex p-5 bc-dark">
			<div className="flex w-20 h-20 brd-10 bc-light as-c"></div>
			{!Web.minimizedDrawer && <div className="flex flex-1 pl-3 flex-col">
				<div className="c-light">Hi,</div>
				<div className="bb-2-light c-light">Administrator</div>
				<div className="c-light f-3">Ganti Kata sandi</div>
			</div>}
		</div>
		<div className="side-menu flex flex-1 flex-col p-3">
			{sideMenu && renderSideMenu(sideMenu)}
			<div className="flex flex-1 bc-grey" />
		</div>
	</div>
}

export default SideMenu