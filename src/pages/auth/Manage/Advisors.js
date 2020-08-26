import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Gallery from 'src/components/Gallery';
import Modal from 'src/components/Modal';
import FileUpload from 'src/components/FileUpload';
import Button, { ButtonOpacity } from 'src/components/Button';
import { Input } from 'src/components/Input';
import { FILE_PATH, getAdvisors, insertAdvisors, hideAdvisors } from 'src/utils/api';

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

	const uploadAdvisors = async () => {
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

	useEffect(() => {
		getData()
		setTitle('Board of Advisors')
	}, [])

	return <>
		<Modal backDropClick={() => setVisible(false)} className="h-full pt-20 pb-20 mr-50 ml-50 p-5 jc-c" visible={visible}>
			<View flex className="brd-5 p-5 bc-light">
				<View justify="sb" direction="row">
					<FileUpload
						isImage
						toBase64
						imgClass="w-10 h-10"
						onChange={({ file: foto }) => {
							setImgUpload([...imgUpload, { foto }])
						}}><i className="fa fa-plus f-10" /></FileUpload>
					<Button onClick={uploadAdvisors}>Upload Advisors</Button>
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
			<View direction="row" className="mt-5 mb-5">
				<Button className="p-5 as-c ai-c flex-wrap mr-3" onClick={async () => {
					const promises = advisors.map(async ({ id }) => {
						const { data } = await hideAdvisors({ id, hide: true })
						return data
					})
					await Promise.all(promises)
					getData()
				}}>Hide<br />All</Button>
				<Button className="p-5 as-c ai-c flex-wrap" onClick={() => {
					setImgUpload([])
					setVisible(true)
				}}>Tambah<br />Advisors</Button>
			</View>
			<ScrollView>
				<Gallery
					numColumns={4}
					data={advisors}
					renderItem={({ item: { id, nama_advisors, foto_advisors, hide } }) => <View className="p-2">
						<img alt="" className="h-auto w-full" src={FILE_PATH + foto_advisors} />
						<div className="flex jc-sb">
							<div>{nama_advisors}</div>
							<ButtonOpacity onClick={async () => {
								await hideAdvisors({ id, hide: !(hide === '1') })
								getData()
							}}><i className={`f-7 ion-eye${hide === '1' ? '-disabled' : ''}`} /></ButtonOpacity>
						</div>
					</View>}
				/>
			</ScrollView>
		</View>
	</>
}

export default Advisors