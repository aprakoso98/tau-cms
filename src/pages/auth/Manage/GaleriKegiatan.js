import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Gallery from 'src/components/Gallery';
import Modal from 'src/components/Modal';
import FileUpload from 'src/components/FileUpload';
import toBase64 from 'src/utils/toBase64';
import Button from 'src/components/Button';
import { Input, Textarea } from 'src/components/Input';
import { getGaleri, insertGaleri, getManage, updateManage, IMG_PATH } from 'src/utils/api';

const GaleriKegiatan = () => {
	const [imgUpload, setImgUpload] = useState([])
	const [visible, setVisible] = useState(false)
	const [fasilitas, setFasilitas] = useState([])
	const [deskripsi, setDeskripsi] = useState()
	window.imgUpload = imgUpload
	const updateDeskripsi = async () => {
		await updateManage({
			part: 'galeri',
			image: null,
			content: deskripsi
		})
	}

	const getFasilitas = async () => {
		const { data, status } = await getGaleri()
		const { data: d, status: s } = await getManage({ part: 'galeri' })
		if (s) {
			setDeskripsi(d.content)
		}
		if (status) {
			setFasilitas(data)
		}
	}

	const uploadFasilitas = async () => {
		const { data: msg } = await insertGaleri({ data: imgUpload })
		alert(msg)
		setVisible(false)
		setImgUpload([])
		getFasilitas()
	}

	useEffect(() => {
		getFasilitas()
		setTitle('Galeri & Kegiatan')
	}, [])

	return <>
		<Modal backDropClick={() => setVisible(false)} className="h-full pt-20 pb-20 mr-50 ml-50 p-5 jc-c" visible={visible}>
			<View flex className="brd-5 p-5 bc-light">
				<View justify="sb" direction="row">
					<FileUpload
						accept="image/*, video/*"
						imgClass="w-10 h-10"
						onChange={async e => {
							const { image: media } = await toBase64(e.target.files)
							setImgUpload([...imgUpload, { media, nama: '', deskripsi: '', isVideo: media.includes('video') }])
						}}><i className="fa fa-plus f-10" /></FileUpload>
					<Button onClick={uploadFasilitas}>Upload Galeri</Button>
				</View>
				<ScrollView className="pt-5">
					{
						imgUpload.rMap(({ media, nama, deskripsi }, i) => <View className="ai-fe mb-5" direction="row">
							<div className="w-1/3">
								{media && media.includes('video') ?
									<video className="b-1 h-35 w-auto" controls>
										<source src={media} />
									</video> :
									<img alt="" className="b-1 h-35 w-auto" src={media} />
								}
							</div>
							<View className="ml-3" flex>
								<View direction="row">
									<Input className="flex-1" value={nama} onChange={e => {
										let imgs = imgUpload.slice()
										imgs[i].nama = e.target.value
										setImgUpload(imgs)
									}} placeholder="Nama Kegiatan" />
									{/* <Button onClick={() => {
										let imgs = imgUpload.slice()
										imgs[i].is_link = !imgs[i].is_link
										setImgUpload(imgs)
									}} direction={is_link ? 'row' : 'row-reverse'} className="w-1/4 ai-c">
										<View className={`brd-10 p-5 ${is_link ? 'bc-blue' : 'bc-link'}`} />
										{is_link ? 'Link' : 'Bukan link'}
									</Button> */}
								</View>
								<Textarea className="flex-1 mt-3" value={deskripsi} onChange={e => {
									let imgs = imgUpload.slice()
									imgs[i].deskripsi = e.target.value
									setImgUpload(imgs)
								}} placeholder="Deskripsi" />
							</View>
						</View>)
					}
				</ScrollView>
			</View>
		</Modal>
		<View flex>
			<View direction="row" className="mt-5 mb-5">
				<View flex className="mr-3">
					<div className="mr-5">Deskripsi</div>
					<Textarea value={deskripsi} onBlur={updateDeskripsi} className="flex-1" onChange={e => setDeskripsi(e.target.value)} />
				</View>
				<Button className="p-5 as-fe ai-c flex-wrap" onClick={() => {
					setImgUpload([])
					setVisible(true)
				}}>Tambah<br />Galeri</Button>
			</View>
			<ScrollView>
				<Gallery
					numColumns={4}
					data={fasilitas}
					renderItem={({ item: { nama, deskripsi, media, is_video } }) => <View className="p-2">
						{
							is_video === '1' ? <video className="b-1 h-auto w-full" controls>
								<source src={IMG_PATH + media} />
							</video> : <img alt="" className="h-auto w-full" src={IMG_PATH + media} />
						}
						{nama} - {deskripsi}
					</View>}
				/>
			</ScrollView>
		</View>
	</>
}

export default GaleriKegiatan