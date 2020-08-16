import React, { useState } from 'react';
import { View } from 'src/components/Container';
import FileUpload from 'src/components/FileUpload';
import Gallery from 'src/components/Gallery';
import { Input } from 'src/components/Input';
import Button from 'src/components/Button';

const Gambar = () => {
	const [images, _] = useState([])
	const pushImages = imgs => _([...images, ...imgs])
	const deleteImage = i => {
		let imgs = images.slice()
		imgs[i].image = null
		_(imgs)
	}
	const editImage = (i, img) => {
		let imgs = images.slice()
		imgs[i] = img
		_(imgs)
	}
	const onChange = imgs => {
		pushImages(Array.isArray(imgs) ? imgs : [imgs])
		console.log(images)
	}
	return <View flex>
		<View direction="row">
			<FileUpload
				isImage
				toBase64
				multiple
				src={require('src/assets/images/article-thumb.png')}
				imgClass="w-30 h-auto"
				accept="image/*"
				onChange={onChange}
			/>
			<Input className="as-c" placeholder="Cari Gambar..." />
		</View>
		<Gallery
			scrollable
			data={images}
			numColumns={4}
			renderItem={({ item, i }) => <View flex className="m-1">
				<img alt="" className="w-auto h-auto" src={item.image} />
				<View className="mt-2" direction="row">
					<Input className="w-full" placeholder="Nama gambar" value={item.name} onChange={e => editImage(i, { ...item, changed: true, name: e.target.value })} />
					{item.id && <Button className="mr-2 ml-2"><i className="ion-ios7-copy-outline" /></Button>}
					<Button><i className="ion-trash-a" /></Button>
				</View>
			</View>}
		/>
	</View>
}

export default Gambar