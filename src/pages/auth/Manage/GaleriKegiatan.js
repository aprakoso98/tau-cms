import DragSortableList from 'react-drag-sortable'
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Modal from 'src/components/Modal';
import FileUpload from 'src/components/FileUpload';
import Button, { ButtonOpacity } from 'src/components/Button';
import { Input, Textarea } from 'src/components/Input';
import { getGaleri, insertGaleri, getManage, updateManage, FILE_PATH, removeData, changeOrder } from 'src/utils/api';
import Files from '../Files';
import { useToggle } from 'src/utils/state';

const GaleriKegiatan = () => {
	const [imgUpload, setImgUpload] = useState([])
	const [visible, setVisible] = useState(true)
	const [fasilitas, setFasilitas] = useState([])
	const [deskripsi, setDeskripsi] = useState()
	const updateDeskripsi = async () => {
		await updateManage({
			part: 'galeri',
			image: null,
			content: deskripsi
		})
	}
	const onSort = async (sortedList) => {
		const idSortedList = sortedList.reduce((ret, { id, rank }) => {
			ret[id] = rank
			return ret
		}, {})
		await changeOrder({ target: 'galeri', order: idSortedList })
	}
	const renderBanner = (banners) => {
		return banners.map(({ is_embed, id, nama, deskripsi, media, is_video }) => {
			return {
				id,
				classes: ['w-1/4 p-1'],
				content: <View className="relative">
					<div style={{ zIndex: 2, top: 0, right: 0 }} className="bc-dark p-3 absolute">
						<ButtonOpacity onClick={() => deleteData(id)}><i className="c-light f-5 ion-trash-a" /></ButtonOpacity>
					</div>
					<div className="o-h h-35">
						{
							is_embed === '1' ?
								<iframe src={media} title="embed-show" /> :
								is_video === '1' ? <video className="b-1 h-auto w-full" controls>
									<source src={FILE_PATH + media} />
								</video> : <img alt="" className="h-auto w-full" src={FILE_PATH + media} />
						}
					</div>
					{nama} - {deskripsi}
				</View>
			}
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

	const deleteData = async id => {
		const con = window.confirm('Hapus galeri?')
		if (con) {
			const { status } = await removeData({ table: 'tb_galeri', id })
			if (status) getFasilitas()
		}
	}

	const uploadFasilitas = async () => {
		console.log(imgUpload)
		if (imgUpload.length > 0) {
			const { data: msg } = await insertGaleri({ data: imgUpload })
			alert(msg)
			setVisible(false)
			setImgUpload([])
			getFasilitas()
		}
	}

	const onChangeFile = ({ file: media }) => {
		setImgUpload([...imgUpload, { media, nama: '', deskripsi: '', is_embed: 0, isVideo: media.includes('video') }])
	}
	const [showFiles, toggleFiles] = useToggle()
	const onClickEmbed = (prevUrl = "") => {
		const url = window.prompt('Masukkan embed url :', prevUrl)
		if (url) {
			const valid = url.validURL()
			if (valid) {
				setImgUpload([...imgUpload, {
					media: url,
					nama: '',
					deskripsi: '',
					is_embed: 1
				}])
			} else {
				window.alert('URL yang anda masukkan tidak benar!')
				onClickEmbed(url)
			}
		}
	}
	useEffect(() => {
		getFasilitas()
		setTitle('Galeri & Kegiatan')
	}, [])

	return <>
		<Modal backDropClick={() => {
			if (imgUpload.length > 0) {
				const q = window.confirm('Ingin membatalkan upload galeri?')
				if (q) setVisible(false)
			} else setVisible(false)
		}} className="h-full pt-20 pb-20 mr-50 ml-50 p-5 jc-c" visible={visible}>
			<View flex className="brd-1 p-5 bc-light">
				<ScrollView>
					{
						imgUpload.rMap(({ fromFile, is_embed, media, nama, deskripsi }, i) => {
							media = fromFile ? FILE_PATH + media : media
							return <View className="ai-fe mb-5" direction="row">
								<div className="w-1/4">
									{media && is_embed ?
										<iframe title="show-embed" src={media} /> : media.includes('video') ?
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
									</View>
									<Textarea className="flex-1 mt-3" value={deskripsi} onChange={e => {
										let imgs = imgUpload.slice()
										imgs[i].deskripsi = e.target.value
										setImgUpload(imgs)
									}} placeholder="Deskripsi" />
								</View>
							</View>
						})
					}
					{showFiles && <div className="bc-grey-soft p-3 mb-2">
						<div>Pilih file dibawah ini</div>
						<Files onlyPick onPick={file => {
							toggleFiles()
							setImgUpload([...imgUpload, {
								id: file.id,
								fromFile: true,
								is_embed: 0,
								media: [file.folder, file.file].join('/'),
								nama: "",
								deskripsi: ""
							}])
						}} />
					</div>}
					<div className="flex">
						<FileUpload
							toBase64
							title="Upload Foto/Video"
							className="b-1 p-5 brd-1 as-fs"
							accept="image/*, video/*"
							imgClass="w-10 h-10"
							onChange={onChangeFile}><i className="fa fa-image f-10" /></FileUpload>
						<ButtonOpacity title="Embed URL" onClick={() => onClickEmbed()} className="mr-3 ml-3 b-1 p-5 brd-1 as-fs">
							<i className="fa fa-code f-10" />
						</ButtonOpacity>
						<ButtonOpacity title="Pick from file" onClick={() => toggleFiles()} className="b-1 p-5 brd-1 as-fs">
							<i className="fa fa-file f-10" />
						</ButtonOpacity>
					</div>
				</ScrollView>
				<Button className="as-fe" onClick={uploadFasilitas}>Upload Galeri</Button>
			</View>
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
				}}>Tambah Galeri</Button>
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

export default GaleriKegiatan