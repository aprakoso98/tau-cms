import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Gallery from 'src/components/Gallery';
import Modal from 'src/components/Modal';
import FileUpload from 'src/components/FileUpload';
import Button, { ButtonOpacity } from 'src/components/Button';
import { Input } from 'src/components/Input';
import { FILE_PATH, getAdvisors, insertAdvisors, hideAdvisors, removeData } from 'src/utils/api';
import Image from 'src/components/Image';

const Advisors = () => {
	const [imgUpload, setImgUpload] = useState([])
	const [visible, setVisible] = useState(false)
	const [advisors, setAdvisors] = useState([])

	const getData = async () => {
		const { data, status } = await getAdvisors()
		if (status) {
			setAdvisors(data)
		}
	}

	const deleteData = async id => {
		const con = window.confirm('Hapus advisor?')
		if (con) {
			const { status } = await removeData({ table: 'tb_advisors', id })
			if (status) getData()
		}
	}

	const uploadAdvisors = async () => {
		if (imgUpload.length > 0) {
			const promises = imgUpload.map(async img => {
				const { nama: nama_advisors, foto: foto_advisors } = img
				const { data } = await insertAdvisors({ nama_advisors, foto_advisors })
				return data
			})
			await Promise.all(promises)
			alert("Berhasil")
			setVisible(false)
			setImgUpload([])
			getData()
		}
	}

	const checkHidden = () => {
		let hide = false
		const visible = advisors.filter(s => s.hide === '0')
		if (visible.length > 0) {
			hide = true
		}
		return hide
	}

	useEffect(() => {
		getData()
		setTitle('Board of Advisors')
	}, [])

	return <>
		<Modal backDropClick={() => {
			if (imgUpload.length > 0) {
				const q = window.confirm('Ingin membatalkan upload advisors?')
				if (q) setVisible(false)
			} else setVisible(false)
		}} className="h-full pt-20 pb-20 mr-50 ml-50 p-5 jc-c" visible={visible}>
			<View flex className="brd-1 p-5 bc-light">
				<ScrollView>
					{
						imgUpload.rMap(({ foto, nama }, i) => <View className="ai-fe mb-5" direction="row">
							<Image alt="" className="b-1 h-35 w-auto" src={foto} />
							<View className="ml-3" flex>
								<Input className="flex-1" value={nama} onChange={e => {
									let imgs = imgUpload.slice()
									imgs[i].nama = e.target.value
									setImgUpload(imgs)
								}} placeholder="Nama advisor" />
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
				<Button className="as-fe" onClick={uploadAdvisors}>Upload Advisors</Button>
			</View>
		</Modal>
		<View flex>
			<View direction="row" className="mt-5 mb-5">
				<Button className="mr-3" onClick={async () => {
					const hide = checkHidden()
					const promises = advisors.map(async ({ id }) => {
						const { data } = await hideAdvisors({ id, hide })
						return data
					})
					await Promise.all(promises)
					getData()
				}}>{checkHidden() ? 'Hide All' : 'Show All'}</Button>
				<Button onClick={() => {
					setImgUpload([])
					setVisible(true)
				}}>Tambah Advisors</Button>
			</View>
			<ScrollView>
				<Gallery
					numColumns={4}
					data={advisors}
					renderItem={({ item: { id, nama_advisors, foto_advisors, hide } }) => <View className="relative m-2">
						<Image canZoom style={{ opacity: hide === '1' ? .5 : 1 }} alt="" className="h-auto w-full" src={FILE_PATH + foto_advisors} />
						<div>{nama_advisors}</div>
						<div style={{ zIndex: 1, top: 0, right: 0 }} className="flex bc-dark p-2 absolute">
							<ButtonOpacity onClick={() => deleteData(id)}><i className="mr-2 c-light f-5 ion-trash-a" /></ButtonOpacity>
							<ButtonOpacity onClick={async () => {
								await hideAdvisors({ id, hide: !(hide === '1') })
								getData()
							}}><i className={`f-5 c-light ion-eye${hide === '1' ? '-disabled' : ''}`} /></ButtonOpacity>
						</div>
					</View>}
				/>
			</ScrollView>
		</View>
	</>
}

export default Advisors