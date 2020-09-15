import React, { useEffect, useState } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { getArticleSet, setArticleSet, getArticle } from 'src/utils/api';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';
import { Link } from 'react-router-dom';
import { ScrollView } from 'src/components/Container';
import bbobHTML from '@bbob/html'
import presetHtml from '@bbob/preset-html5'
import htmlParser from 'react-html-parser';

const Default = ({ match, location }) => {
	const disabledPath = ['international-australian', 'international-business']
	const disabled = {
		readOnly: disabledPath.includes(match.params.path),
		onClick: () => {
			const isDisabled = disabledPath.includes(match.params.path)
			if (isDisabled) {
				alert('URL Path ini tidak bisa diganti!')
			}
		}
	}
	const [url, setUrl] = useState('')
	const [urlTo, setUrlTo] = useState('')
	const [urlValid, setUrlValid] = useState(false)
	const [preview, setPreview] = useState(null)
	const isValidUrl = async url => {
		const { status, data } = await getArticle({ url })
		const isValid = status && data
		if (isValid) {
			const artikel = bbobHTML(data.artikel.replacePath(true), presetHtml())
			setPreview(htmlParser(artikel))
		} else setPreview(null)
		return new Promise(resolve => resolve(isValid))
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
	useEffect(effect, [location, match])
	return <>
		<div className="flex flex-col">
			<div className="flex jc-sb ai-c">
				<div>URL</div>
				<Input {...disabled} className="mr-3 ml-3 flex flex-1" value={url} onChange={e => setUrl(e.target.value)} />
				<Button onClick={updateUrl}>Update URL Target</Button>
			</div>
			<div className="mt-5 mb-3 flex ai-c jc-sb">
				<div>Preview</div>
				<Link onClick={e => {
					if (!urlValid) {
						alert('URL yang anda masukkan tidak ada di daftar artikel, harap ubah URL Anda atau tambahkan artikel dengan url tersebut.')
						e.preventDefault()
					}
				}} to={{ pathname: '/article/edit', state: urlTo }}>Edit artikel</Link>
			</div>
		</div>
		<ScrollView className="preview-article brd-1 b-1 p-3">{preview}</ScrollView>
	</>
}

export default Default