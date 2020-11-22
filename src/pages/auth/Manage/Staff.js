import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Gallery from 'src/components/Gallery';
import Modal from 'src/components/Modal';
import FileUpload from 'src/components/FileUpload';
import Button, { ButtonOpacity } from 'src/components/Button';
import { Input, Textarea } from 'src/components/Input';
import { getStaff, insertStaff, getManage, updateManage, FILE_PATH, removeData } from 'src/utils/api';
import Image from 'src/components/Image';

const Staff = () => {
	const [imgUpload, setImgUpload] = useState([])
	const [visible, setVisible] = useState(false)
	const [fasilitas, setFasilitas] = useState([])
	const [deskripsi, setDeskripsi] = useState()

	const updateDeskripsi = async () => {
		await updateManage({
			part: 'staff',
			image: null,
			content: deskripsi
		})
	}

	const deleteData = async id => {
		const con = window.confirm('Hapus staff?')
		if (con) {
			const { status } = await removeData({ table: 'tb_staff', id })
			if (status) getFasilitas()
		}
	}

	const getFasilitas = async () => {
		const { data, status } = await getStaff()
		const { data: d, status: s } = await getManage({ part: 'staff' })
		if (s) {
			setDeskripsi(d.content)
		}
		if (status) {
			setFasilitas(data)
		}
	}

	const uploadFasilitas = async () => {
		if (imgUpload.length > 0) {
			const { data: msg } = await insertStaff({ data: imgUpload })
			alert(msg)
			setVisible(false)
			setImgUpload([])
			getFasilitas()
		}
	}

	useEffect(() => {
		getFasilitas()
		setTitle('Staff & Pengajar')
	}, [])

	return <>
		<Modal backDropClick={() => {
			if (imgUpload.length > 0) {
				const q = window.confirm('Ingin membatalkan upload staff?')
				if (q) setVisible(false)
			} else setVisible(false)
		}} className="h-full pt-20 pb-20 mr-50 ml-50 p-5 jc-c" visible={visible}>
			<View flex className="brd-1 p-5 bc-light">
				<ScrollView>
					{
						imgUpload.rMap(({ foto, nama, jabatan }, i) => <View className="ai-fe mb-5" direction="row">
							<Image alt="" className="b-1 h-35 w-auto" src={foto} />
							<View className="ml-3" flex>
								<Input className="flex-1" value={nama} onChange={e => {
									let imgs = imgUpload.slice()
									imgs[i].nama = e.target.value
									setImgUpload(imgs)
								}} placeholder="Nama Staff" />
								<Input className="flex-1 mt-3" value={jabatan} onChange={e => {
									let imgs = imgUpload.slice()
									imgs[i].jabatan = e.target.value
									setImgUpload(imgs)
								}} placeholder="Jabatan" />
							</View>
						</View>)
					}
					<FileUpload
						className="b-1 p-5 brd-1 as-fs"
						isImage
						toBase64
						imgClass="w-10 h-10"
						onChange={({ file: foto }) => {
							setImgUpload([...imgUpload, { foto }])
						}}><i className="fa fa-plus f-10" /></FileUpload>
				</ScrollView>
				<Button className="as-fe" onClick={uploadFasilitas}>Upload Staff</Button>
			</View>
		</Modal>
		<View flex>
					<div className="mr-5">Deskripsi</div>
			<View direction="row" className="mt-5 mb-5">
				<View flex className="mr-3">
					<Textarea value={deskripsi} onBlur={updateDeskripsi} className="flex-1" onChange={e => setDeskripsi(e.target.value)} />
				</View>
				<Button className="as-fs ai-c" onClick={() => {
					setImgUpload([])
					setVisible(true)
				}}>Tambah Staff</Button>
			</View>
			<ScrollView>
				<Gallery
					numColumns={4}
					data={fasilitas}
					renderItem={({ item: { id, nama, jabatan, foto } }) => <View className="p-2 relative">
						<div style={{ zIndex: 1, top: 0, right: 0 }} className="bc-dark p-3 m-3 absolute">
							<ButtonOpacity onClick={() => deleteData(id)}><i className="c-light f-5 ion-trash-a" /></ButtonOpacity>
						</div>
						<Image canZoom alt="" className="h-auto w-full" src={FILE_PATH + foto} />
						{nama} - {jabatan}
					</View>}
				/>
			</ScrollView>
		</View>
	</>
}

export default Staff