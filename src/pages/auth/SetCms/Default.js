import React, { useEffect, useState } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { getArticleSet, setArticleSet } from 'src/utils/api';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';
import { Link } from 'react-router-dom';

const Default = ({ match, location }) => {
	const [url, setUrl] = useState('')
	const [urlTo, setUrlTo] = useState('')
	const getData = async () => {
		const { data } = await getArticleSet({ part: match.params.path })
		setUrl(data.url)
		setUrlTo(data.url)
	}
	const effect = () => {
		getData()
		setTitle(location.state.name)
	}
	useEffect(effect, [location])
	return <div className="flex flex-col">
		<div className="flex">
			<div className="as-c mr-3">URL</div>
			<Input className="as-c flex flex-1" value={url} onChange={e => setUrl(e.target.value)} />
		</div>
		<div className="flex as-fe">
			<Link className="as-c mt-3 mr-3" to={{ pathname: '/article/edit', state: urlTo }}>Edit data</Link>
			<Button className="as-c mt-3" onClick={async () => {
				const { data } = await setArticleSet({ part: match.params.path, url })
				alert(data)
			}}>Update URL Target</Button>
		</div>
	</div>
}

export default Default