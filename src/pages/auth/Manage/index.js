import React from 'react';
import Fasilitas from 'src/pages/auth/Manage/Fasilitas';
import ManageContent from 'src/pages/auth/Manage/ManageContent';
import Staff from 'src/pages/auth/Manage/Staff';
import GaleriKegiatan from 'src/pages/auth/Manage/GaleriKegiatan';

const Manage = (props) => {
	const { match: { params } } = props
	switch (params.path) {
		case 'fasilitas':
			return <Fasilitas />
		case 'staff':
			return <Staff />
		case 'galeri-kegiatan':
			return <GaleriKegiatan />
		default:
			return <ManageContent {...props} />
	}
}

export default Manage