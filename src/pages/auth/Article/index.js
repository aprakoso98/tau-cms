import React from 'react';
import PostArticle from './Post';
import ListArticle from './List';

const Article = props => {
	const { match: { params } } = props
	switch (params.path) {
		case 'post':
			return <PostArticle />
		case 'edit':
			return <PostArticle {...props} />
		default:
			return <ListArticle />
	}
}

export default Article