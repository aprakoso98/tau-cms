import React, { useEffect, useState } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { getArticleSet, setArticleSet, getArticle } from 'src/utils/api';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';
import { Link } from 'react-router-dom';

const Default = ({ match, location }) => {
	const [url, setUrl] = useState('')
	const [urlTo, setUrlTo] = useState('')
	const [urlValid, setUrlValid] = useState(false)
	const isValidUrl = async url => {
		const { status, data } = await getArticle({ url })
		return new Promise(resolve => resolve(status && data))
	}
	const getData = async () => {
		const { data } = await getArticleSet({ part: match.params.path })
		const valid = await isValidUrl(data.url)
		setUrl(data.url)
		setUrlTo(data.url)
		if (valid) setUrlValid(true)
		else alert('URL yang terdaftar tidak valid, harap segera diubah agar konten berjalan dengan baik.')
	}
	const updateUrl = () => {
		setTimeout(async () => {
			const valid = await isValidUrl(url)
			if (valid) {
				const { data } = await setArticleSet({ part: match.params.path, url })
				alert(data)
			} else {
				alert('URL yang anda masukkan tidak ada di daftar artikel, harap ubah URL Anda atau tambahkan artikel dengan url tersebut.')
			}
		}, 550)
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
			<Link onClick={e => {
				if (!urlValid) {
					alert('URL yang anda masukkan tidak ada di daftar artikel, harap ubah URL Anda atau tambahkan artikel dengan url tersebut.')
					e.preventDefault()
				}
			}} className="as-c mt-3 mr-3" to={{ pathname: '/article/edit', state: urlTo }}>Edit data</Link>
			<Button className="as-c mt-3" onClick={updateUrl}>Update URL Target</Button>
		</div>
	</div>
}

export default Default