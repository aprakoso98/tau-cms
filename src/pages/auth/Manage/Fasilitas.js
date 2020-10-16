import DragSortableList from 'react-drag-sortable'
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Modal from 'src/components/Modal';
import FileUpload from 'src/components/FileUpload';
import Button, { ButtonOpacity } from 'src/components/Button';
import { Input, Textarea } from 'src/components/Input';
import { removeData, getFacilities, insertFacilities, getManage, updateManage, FILE_PATH, changeOrder } from 'src/utils/api';

const Fasilitas = () => {
	const [imgUpload, setImgUpload] = useState([])
	const [visible, setVisible] = useState(false)
	const [fasilitas, setFasilitas] = useState([])
	const [deskripsi, setDeskripsi] = useState()

	const updateDeskripsi = async () => {
		await updateManage({
			part: 'fasilitas',
			image: null,
			content: deskripsi
		})
	}

	const getFasilitas = async () => {
		const { data, status } = await getFacilities()
		const { data: d, status: s } = await getManage({ part: 'fasilitas' })
		if (s) {
			setDeskripsi(d.content)
		}
		if (status) {
			setFasilitas(data)
		}
	}

	const uploadFasilitas = async () => {
		if (imgUpload.length > 0) {
			const { data: msg } = await insertFacilities({ data: imgUpload })
			alert(msg)
			setVisible(false)
			setImgUpload([])
			getFasilitas()
		}
	}

	useEffect(() => {
		getFasilitas()
		setTitle('Fasilitas')
	}, [])

	const deleteData = async id => {
		const con = window.confirm('Hapus fasilitas?')
		if (con) {
			const { status } = await removeData({ table: 'tb_fasilitas', id })
			if (status) getFasilitas()
		}
	}

	const onSort = async (sortedList) => {
		const idSortedList = sortedList.reduce((ret, { id, rank }) => {
			ret[id] = rank
			return ret
		}, {})
		await changeOrder({ target: 'fasilitas', order: idSortedList })
	}
	const renderBanner = (banners) => {
		return banners.map(({ id, nama, foto }) => {
			return {
				id,
				classes: ['w-1/4 p-1'],
				content: <View className="relative">
					<div style={{ zIndex: 2, top: 0, right: 0 }} className="bc-dark p-3 absolute">
						<ButtonOpacity onClick={() => deleteData(id)}><i className="c-light f-5 ion-trash-a" /></ButtonOpacity>
					</div>
					<div className="o-h h-35">
						<img alt="" className="h-auto w-full" src={FILE_PATH + foto} />
					</div>
					{nama}
				</View>
			}
		})
	}
	return <>
		<Modal backDropClick={() => {
			if (imgUpload.length > 0) {
				const q = window.confirm('Ingin membatalkan upload fasilitas?')
				if (q) setVisible(false)
			} else setVisible(false)
		}} className="h-full pt-20 pb-20 mr-50 ml-50 p-5 jc-c" visible={visible}>
			<View flex className="brd-1 p-5 bc-light">
				<ScrollView>
					{
						imgUpload.rMap(({ foto, nama }, i) => <View className="ai-fe mb-5" direction="row">
							<img alt="" className="b-1 h-35 w-auto" src={foto} />
							<View className="ml-3" flex>
								<Input className="flex-1" value={nama} onChange={e => {
									let imgs = imgUpload.slice()
									imgs[i].nama = e.target.value
									setImgUpload(imgs)
								}} placeholder="Nama fasilitas" />
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
				<Button className="as-fe" onClick={uploadFasilitas}>Upload Fasilitas</Button></View>
		</Modal>
		<View flex>
			<div className="mr-5">Deskripsi</div>
			<View direction="row" className="mt-5 mb-5">
				<View flex className="mr-3">
					<Textarea value={deskripsi} onBlur={updateDeskripsi} className="flex-1" onChange={e => setDeskripsi(e.target.value)} />
				</View>
				<Button className="as-fs" onClick={() => {
					setImgUpload([])
					setVisible(true)
				}}>Tambah Fasilitas</Button>
			</View>
			<ScrollView>
				<DragSortableList
					items={renderBanner(fasilitas)}
					dropBackTransitionDuration={0.3}
					onSort={onSort}
					type="grid"
					placeholder={<div className="bc-grey h-full w-full p-5 ta-c ai-c jc-c">Drop here</div>}
				/>
			</ScrollView>
		</View>
	</>
}

export default Fasilitas