import React from 'react';
import PostArticle from './Post';
import ListArticle from './List';

const Article = ({ match: { params } }) => {
	return params.path === 'post' ? <PostArticle /> : <ListArticle />
}

export default Article