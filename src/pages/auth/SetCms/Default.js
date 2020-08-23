import React, { useEffect, useState } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { getArticleSet, setArticleSet } from '../../../utils/api';
import { Input } from 'src/components/Input';
import Button from '../../../components/Button';

const Default = ({ match, location }) => {
	const [url, setUrl] = useState('')
	const getData = async () => {
		const { data } = await getArticleSet({ part: match.params.path })
		setUrl(data.url)
	}
	useEffect(() => {
		getData()
		setTitle(location.state.name)
	}, [location])
	return <>
		URL <Input value={url} onChange={e => setUrl(e.target.value)} />
		<Button className="as-fe mt-3" onClick={async () => setArticleSet({ part: match.params.path, url })}>Update Data</Button>
	</>
}

export default Default