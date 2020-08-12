import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Gallery from 'src/components/Gallery';
import Modal from 'src/components/Modal';
import FileUpload from 'src/components/FileUpload';
import toBase64 from 'src/utils/toBase64';
import Button from 'src/components/Button';
import { Input } from 'src/components/Input';
import { getFacilities, insertFacilities, getManage, IMG_PATH } from 'src/utils/api';

const Fasilitas = () => {
	const [imgUpload, setImgUpload] = useState([])
	const [visible, setVisible] = useState(false)
	const [fasilitas, setFasilitas] = useState([])
	const [deskripsi, setDeskripsi] = useState()

	const getFasilitas = async () => {
		const { data, status } = await getFacilities()
		const { data: d, status: s } = await getManage({ part: 'fasilitas' })
		if (s) {
			setDeskripsi(d.content)
			console.log(d.content)
		}
		if (status) {
			setFasilitas(data)
		}
	}

	const uploadFasilitas = async () => {
		const { data: msg } = await insertFacilities({ data: imgUpload })
		alert(msg)
		setVisible(false)
		setImgUpload([])
		getFasilitas()
	}

	useEffect(() => {
		getFasilitas()
		setTitle('Fasilitas')
	}, [])


	return <>
		<Modal backDropClick={() => setVisible(false)} className="h-full pt-20 pb-20 mr-50 ml-50 p-5 jc-c" visible={visible}>
			<View flex className="brd-5 p-5 bc-light">
				<View justify="sb" direction="row">
					<FileUpload
						isImage
						imgClass="w-10 h-10"
						onChange={async e => {
							const { image: foto } = await toBase64(e.target.files)
							setImgUpload([...imgUpload, { foto }])
						}}><i className="fa fa-plus f-10" /></FileUpload>
					<Button onClick={uploadFasilitas}>Upload Fasilitas</Button>
				</View>
				<ScrollView className="pt-5">
					{
						imgUpload.rMap(({ foto, nama }, i) => <View className="ai-fe mb-5" direction="row">
							<div className="w-1/3">
								<img alt="" className="b-1 h-35 w-auto" src={foto} />
							</div>
							<View className="ml-3" flex>
								<Input className="flex-1" value={nama} onChange={e => {
									let imgs = imgUpload.slice()
									imgs[i].nama = e.target.value
									setImgUpload(imgs)
								}} placeholder="Nama fasilitas" />
							</View>
						</View>)
					}
				</ScrollView>
			</View>
		</Modal>
		<View flex>
			<Button onClick={() => {
				setImgUpload([])
				setVisible(true)
			}}>Tambah Fasilitas</Button>
			<View direction="row" className="mt-5 mb-5">
				<div className="mr-5">Deskripsi</div>
				<Input value={deskripsi} onChange={e => setDeskripsi(e.target.value)} />
			</View>
			<ScrollView>
				<Gallery
					numColumns={4}
					data={[...fasilitas, ...fasilitas, ...fasilitas, ...fasilitas]}
					renderItem={({ item: { nama, foto } }) => <View className="p-2">
						<img alt="" className="flex flex-1" src={IMG_PATH + foto} />
						{nama}
					</View>}
				/>
			</ScrollView>
		</View>
	</>
}

export default Fasilitas