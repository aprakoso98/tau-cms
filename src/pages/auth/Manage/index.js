import React from 'react';
import Fasilitas from 'src/pages/auth/Manage/Fasilitas';
import ManageContent from 'src/pages/auth/Manage/ManageContent';
import Staff from 'src/pages/auth/Manage/Staff';
import GaleriKegiatan from 'src/pages/auth/Manage/GaleriKegiatan';
import S1 from 'src/pages/auth/Manage/S1';
import Banner from 'src/pages/auth/Manage/Banner';
import { Switch, Route } from 'react-router-dom';
import SetCms from 'src/pages/auth/SetCms';

const Manage = props => {
	const { match: { params } } = props
	switch (params.path) {
		case 'fasilitas':
			return <Fasilitas {...props} />
		case 'staff':
			return <Staff {...props} />
		case 's1':
			return <S1 {...props} />
		case 'international':
			return <Switch>
				<Route path="/manage/international/:path" component={SetCms} />
			</Switch>
		case 'galeri-kegiatan':
			return <GaleriKegiatan />
		case 'banner':
			return <Banner />
		default:
			return <ManageContent {...props} />
	}
}

export default Manage