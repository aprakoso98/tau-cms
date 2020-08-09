import React, { useState, useEffect } from 'react';
import stateObject from 'src/utils/state';
import toBase64 from 'src/utils/toBase64';
import FileUpload from 'src/components/FileUpload';
import { View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import { Input, Textarea } from 'src/components/Input';
import Button from 'src/components/Button';
import { postArticle } from 'src/utils/api';

const PostArticle = () => {
	const [state, s] = useState({ foto: require('src/assets/images/article-thumb.png') })
	const setState = stateObject(state, s)

	const onChange = e => {
		let { id, value } = e.target
		setState({ [id]: value })
	}

	const post = async () => {
		const { data, status } = await postArticle(state)
		console.log(data, status)
	}

	useEffect(() => {
		setTitle('Buat Artikel')
	}, [])

	return <>
		<View direction="row" className="mb-3">
			<FileUpload
				isImage
				className="flex b-1-dark mr-3"
				labelClass="p-2"
				imgClass="h-30 w-auto"
				src={state.foto}
				accept="image/*"
				onChange={async e => {
					const { name, image: foto } = await toBase64(e.target.files)
					setState({ foto, name })
				}}
			/>
			<Input className="mb-0 as-fe" placeholder="Judul Artikel" id="judul" onChange={onChange} value={state.judul} />
		</View>
		<View direction="row">
			<Input placeholder="Kustom Url" className="mr-3" id="url" onChange={onChange} value={state.url} />
			<Input placeholder="Pembuat" id="pembuat" onChange={onChange} value={state.pembuat} />
		</View>
		<Textarea placeholder="Deskripsi" id="deskripsi" onChange={onChange} value={state.deskripsi} />
		<Textarea placeholder="Isi Konten" id="artikel" onChange={onChange} value={state.artikel} />
		<Button className="as-fe" onClick={post}>Submit</Button>
	</>
}

export default PostArticle