import React from 'react';
import Default from 'src/pages/auth/SetCms/Default';

const SetCms = props => {
	const { match: { params } } = props
	switch (params.path) {
		default:
			return <Default {...props} />
	}
}

export default SetCms