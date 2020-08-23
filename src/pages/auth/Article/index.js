import React from 'react';
import PostArticle from './Post';
import ListArticle from './List';

const Article = ({ match: { params } }) => {
	switch (params.path) {
		case 'post':
			return <PostArticle />
		default:
			return <ListArticle />
	}
}

export default Article