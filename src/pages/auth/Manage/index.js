import React from 'react';
import Fasilitas from 'src/pages/auth/Manage/Fasilitas';
import Sambutan from 'src/pages/auth/Manage/Sambutan';
import Staff from 'src/pages/auth/Manage/Staff';
import GaleriKegiatan from 'src/pages/auth/Manage/GaleriKegiatan';

const Manage = ({ match: { params } }) => {
	switch (params.path) {
		case 'fasilitas':
			return <Fasilitas />
		case 'sambutan':
			return <Sambutan />
		case 'staff':
			return <Staff />
		case 'galeri-kegiatan':
			return <GaleriKegiatan />
		default:
			return <Fasilitas />
	}
}

export default Manage