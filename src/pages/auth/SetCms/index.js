import React from 'react';
import Default from 'src/pages/auth/SetCms/Default';
import Kemahasiswaan from 'src/pages/auth/SetCms/Kemahasiswaan';

const SetCms = props => {
	const { match: { params } } = props
	switch (params.path) {
		case 'kemahasiswaan':
			return <Kemahasiswaan {...props} />
		default:
			return <Default {...props} />
	}
}

export default SetCms