import React from 'react';
import Fasilitas from 'src/pages/auth/Manage/Fasilitas';

const Manage = ({ match: { params } }) => {
	return <Fasilitas />
	// return params.path === 'post' ? <PostArticle /> : <ListArticle />
}

export default Manage