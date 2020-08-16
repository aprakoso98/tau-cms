import React, { useEffect, useRef } from 'react';
import toBase64 from 'src/utils/toBase64';
import FileUpload from 'src/components/FileUpload';
import { View } from 'src/components/Container';
import actionsWeb, { setTitle } from 'src/redux/actions/web';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';
import { postArticle } from 'src/utils/api';
import JoditEditor from 'jodit-react';
import { useSelector, useDispatch } from 'react-redux';

const PostArticle = () => {
	let article = {}
	article = useSelector(state => state.Web.article)
	const dispatch = useDispatch()
	const setArticle = v => dispatch(actionsWeb({ article: { ...article, ...v } }))

	const onChange = e => {
		let { id, value } = e.target
		setArticle({ [id]: value })
	}

	const post = async () => {
		const { data, status } = await postArticle(article)
		if (status) {
			dispatch(actionsWeb({ article: {} }))
		}
		alert(data)
	}

	useEffect(() => {
		setTitle('Buat Artikel')
		setArticle({ foto: article.foto || require('src/assets/images/article-thumb.png') })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const editor = useRef(null)
	return <>
		<View direction="row" className="mb-3">
			<FileUpload
				isImage
				className="flex b-1-dark mr-3"
				imgClass="h-30 w-auto"
				src={article.foto}
				accept="image/*"
				onChange={async e => {
					const { name, image: foto } = await toBase64(e.target.files)
					setArticle({ foto, name })
				}}
			/>
			<Input className="flex-1 mb-0 as-fe" placeholder="Judul Artikel" id="judul" onChange={onChange} value={article.judul} />
		</View>
		<View direction="row" className="mb-3">
			<Input placeholder="Kustom Url" className="flex-1 mr-3" id="url" onChange={onChange} value={article.url} />
			<Input placeholder="Pembuat" id="pembuat" className="flex-1" onChange={onChange} value={article.pembuat} />
		</View>
		<Input className="mb-3" placeholder="Deskripsi" id="deskripsi" onChange={onChange} value={article.deskripsi} />
		<JoditEditor
			value={article.artikel}
			config={{ spellcheck: true }}
			tabIndex={1}
			ref={editor}
			onBlur={e => setArticle({ artikel: e.target.innerHTML })}
		/>
		<Button className="as-fe" onClick={post}>Terbitkan Artikel</Button>
	</>
}

export default PostArticle