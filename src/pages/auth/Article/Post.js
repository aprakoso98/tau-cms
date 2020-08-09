import React, { useState } from 'react';
import stateObject from 'src/utils/state';
import toBase64 from 'src/utils/toBase64';
import FileUpload from 'src/components/FileUpload';
import { Container, View } from 'src/components/Container';

const PostArticle = () => {
	const [state, s] = useState({ foto: require('src/assets/images/article-thumb.png') })
	const setState = stateObject(state, s)

	const onChange = e => {
		let { id, value } = e.target
		setState({ [id]: value })
	}

	return <Container>
		<View direction="row">
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
			<input className="mb-0 flex flex-1" placeholder="Judul Artikel" id="judul" onChange={onChange} value={state.judul} />
		</View>
		<div className="flex">
			<input placeholder="Kustom Url" className="flex flex-1 mr-3" id="url" onChange={onChange} value={state.url} />
			<input placeholder="Pembuat" className="flex flex-1" id="pembuat" onChange={onChange} value={state.pembuat} />
		</div>
		<textarea placeholder="Deskripsi" id="deskripsi" onChange={onChange} value={state.deskripsi} />
		<textarea placeholder="Isi Konten" id="artikel" onChange={onChange} value={state.artikel} />
		<button onClick={() => console.log(state)}>Submit</button>
	</Container>
}

export default PostArticle