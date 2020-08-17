import React, { useState, useEffect } from 'react';
import { View } from 'src/components/Container';
import FileUpload from 'src/components/FileUpload';
import Gallery from 'src/components/Gallery';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';
import { updateGambar, getGambar, IMG_ARTICLE } from 'src/utils/api';

const Gambar = () => {
	const [search, setSearch] = useState('')
	const [images, _] = useState([])
	const [deletedImages, __] = useState([])
	const pushImages = imgs => _([...images, ...imgs])
	const deleteImage = i => {
		let imgs = images.slice()
		__([...deletedImages, { id: imgs[i].id, deleted: true }])
		imgs.splice(i, 1)
		_(imgs)
	}
	const editImage = (i, img) => {
		let imgs = images.slice()
		imgs[i] = img
		_(imgs)
	}
	const updateData = async () => {
		let data = images.filter(a => a.changed || !a.id)
		data = [...data, ...deletedImages]
		const { data: resp } = await updateGambar({ data })
		console.log(resp)
	}
	const getData = async () => {
		const { data, status } = await getGambar()
		if (status) _(data)
	}
	useEffect(() => {
		getData()
	}, [])
	return <View flex>
		<View direction="row">
			<FileUpload
				isImage
				toBase64
				multiple
				src={require('src/assets/images/article-thumb.png')}
				imgClass="w-30 h-auto"
				accept="image/*"
				onChange={imgs => {
					pushImages(Array.isArray(imgs) ? imgs : [imgs])
				}}
			/>
			<Input onChange={e => setSearch(e.target.value)} value={search} className="mr-3 ml-3 as-c flex-1" placeholder="Cari Gambar..." />
			<Button className="as-c" onClick={updateData}>Update Data</Button>
		</View>
		<Gallery
			className="mt-5"
			scrollable
			data={images.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))}
			numColumns={4}
			renderItem={({ item, i }) => <View flex className="m-1">
				<img
					alt=""
					className="w-auto h-auto"
					src={item.image && item.image.length > 50 ? item.image : IMG_ARTICLE + item.image}
				/>
				<View className="mt-2" direction="row">
					<Input className="w-full mr-2" placeholder="Nama gambar" value={item.name} onChange={e => editImage(i, { ...item, changed: true, name: e.target.value })} />
					{item.id && <Button onClick={() => (IMG_ARTICLE + item.image).copyToClipboard()} className="mr-2"><i className="ion-ios7-copy-outline" /></Button>}
					<Button onClick={() => deleteImage(i)}><i className="ion-trash-a" /></Button>
				</View>
			</View>}
		/>
	</View>
}

export default Gambar