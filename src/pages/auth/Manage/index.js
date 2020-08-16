import React from 'react';
import Fasilitas from 'src/pages/auth/Manage/Fasilitas';
import ManageContent from 'src/pages/auth/Manage/ManageContent';
import Staff from 'src/pages/auth/Manage/Staff';
import GaleriKegiatan from 'src/pages/auth/Manage/GaleriKegiatan';
import S1 from 'src/pages/auth/Manage/AkademikPrograms/S1';
import International from 'src/pages/auth/Manage/AkademikPrograms/International';

const Manage = (props) => {
	const { match: { params } } = props
	switch (params.path) {
		case 'fasilitas':
			return <Fasilitas />
		case 'staff':
			return <Staff />
		case 's1':
			return <S1 {...props} />
		case 'international':
			return <International {...props} />
		case 'galeri-kegiatan':
			return <GaleriKegiatan />
		default:
			return <ManageContent {...props} />
	}
}

export default Manage