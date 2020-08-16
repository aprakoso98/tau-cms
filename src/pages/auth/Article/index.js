import React from 'react';
import PostArticle from './Post';
import ListArticle from './List';
import Gambar from 'src/pages/auth/Article/Gambar';

const Article = ({ match: { params } }) => {
	switch (params.path) {
		case 'post':
			return <PostArticle />
		case 'gambar':
			return <Gambar />
		default:
			return <ListArticle />
	}
}

export default Article