import React, { useEffect, useState } from 'react';
import FileUpload from 'src/components/FileUpload';
import { View } from 'src/components/Container';
import actionsWeb, { setTitle } from 'src/redux/actions/web';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';
import { postArticle, editArticle, FILE_PATH, getArticle } from 'src/utils/api';
import JoditEditor from 'jodit-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import bbobHTML from '@bbob/html'
import presetHtml from '@bbob/preset-html5'
import { joditConfig, uploadImages } from 'src/utils/state';

let winArticle = {}

const imgThumb = require('src/assets/images/article-thumb.png')
const PostArticle = ({ location: { state: urlEdit } = {} }) => {
	const Web = useSelector(state => state.Web)
	const history = useHistory()
	const dispatch = useDispatch()
	const [article, setState] = useState({})
	const [render, setRender] = useState(true)
	window.aa = winArticle
	window.bb = article
	const setArticle = v => setState({ ...winArticle, ...v })
	const onChange = ({ target: { id, value } }) => setArticle({ [id]: value })
	const post = async () => {
		let { foto, url = "", artikel = "" } = article
		artikel = await uploadImages(artikel)
		artikel = artikel.replacePath()
		if (!foto) {
			alert("Please upload image")
		} else if (url === "") {
			alert("Please change custom url")
		} else {
			const params = { ...article, artikel, url }
			if (urlEdit) {
				const { data, status } = await editArticle(params)
				alert(data)
				if (status) history.push('/article/list')
			} else {
				const { data, status } = await postArticle(params)
				alert(data)
				console.log(params)
				if (status) {
					setTimeout(() => setRender(true), 10)
					setRender(false)
					winArticle = { artikel: '' }
					setState({ artikel: '' })
				}
			}
		}
	}
	const getDataEdit = async () => {
		let { data: { artikel = "", ...data } } = await getArticle({ url: urlEdit })
		artikel = bbobHTML(artikel.replacePath(true), presetHtml())
		setArticle({ ...data, artikel })
	}
	const effect = () => {
		if (urlEdit) {
			getDataEdit()
			setTitle('Edit Artikel')
		} else {
			setState(Web.article)
			setTitle('Tambah Artikel')
			return () => {
				dispatch(actionsWeb({ article: winArticle }))
			}
		}
	}
	useEffect(effect, [urlEdit])
	winArticle = article
	return render && <>
		<View direction="row" className="mb-1">
			<FileUpload
				isImage
				toBase64
				className="flex b-1-dark mr-3"
				imgClass="h-30 w-auto"
				src={!article.foto ? imgThumb : article.foto.length > 50 ? article.foto : FILE_PATH + article.foto}
				accept="image/*"
				onChange={({ file: foto }) => setArticle({ foto })}
			/>
			<Input className="flex-1 mb-0 as-fe" placeholder="Judul Artikel" id="judul" onChange={onChange} value={article.judul} />
		</View>
		<View direction="row" className="mb-1">
			<Input placeholder="Kustom Url" onBlur={() => {
				if (article.url) {
					const url = article.url.replace(/\W/g, "-")
					setArticle({ url })
				}
			}} className="flex-1 mr-3" id="url" onChange={onChange} value={article.url} />
			<Input placeholder="Pembuat" id="pembuat" className="flex-1" onChange={onChange} value={article.pembuat} />
		</View>
		<Input className="mb-1" placeholder="Deskripsi" id="deskripsi" onChange={onChange} value={article.deskripsi} />
		<JoditEditor
			value={article.artikel || ""}
			config={joditConfig}
			tabIndex={1}
			onBlur={e => {
				setArticle({ artikel: e.target.innerHTML })
			}}
		/>
		<Button className="as-fe" onClick={post}>{!urlEdit ? 'Terbitkan Artikel' : 'Edit Artikel'}</Button>
	</>

}
export default PostArticle