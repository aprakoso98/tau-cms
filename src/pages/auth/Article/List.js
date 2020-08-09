import React from 'react';
import { useHistory } from 'react-router-dom';

const ListArticle = () => {
	const history = useHistory()
	return <div>
		<button onClick={() => history.push("/article/post")}>Post Artikel</button>
	</div>
}

export default ListArticle