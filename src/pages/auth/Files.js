import React, { useState, useEffect } from 'react';
import { View } from 'src/components/Container';
import FileUpload from 'src/components/FileUpload';
import Gallery from 'src/components/Gallery';
import { Input } from 'src/components/Input';
import Button, { ButtonOpacity } from 'src/components/Button';
import { getFiles, updateFile, FILE_PATH } from 'src/utils/api';
import { setTitle } from 'src/redux/actions/web';

const imageType = ["png", "jpg", "jpeg", "gif"]
const videoType = ["mp4", "mkv"]

const Files = () => {
	const [search, setSearch] = useState('')
	const [files, _] = useState([])
	const [deletedFiles, __] = useState([])
	const pushFiles = imgs => _([...files, ...imgs])
	const deleteFile = i => {
		let imgs = files.slice()
		__([...deletedFiles, { id: imgs[i].id, deleted: true }])
		imgs.splice(i, 1)
		_(imgs)
	}
	const editFile = (i, img) => {
		let imgs = files.slice()
		imgs[i] = img
		_(imgs)
	}
	const updateData = async () => {
		let data = files.filter(a => a.changed || !a.id)
		data = [...data, ...deletedFiles]
		const { data: resp } = await updateFile({ data })
		alert(resp.msg)
		getData()
	}
	const getData = async () => {
		const { data, status } = await getFiles()
		if (status) _(data)
	}
	const [toast, setToast] = useState(false)
	useEffect(() => {
		setTitle('Daftar Files')
		getData()
	}, [])
	useEffect(() => {
		if (toast) setTimeout(() => setToast(false), 2000)
	}, [toast])
	return <View flex>
		{toast && <div style={{ zIndex: 99, bottom: 0, right: 0 }} className="bc-dark c-light p-1 pl-3 pr-3 m-2 brd-1 absolute">Copied</div>}
		<View direction="row">
			<FileUpload
				toBase64
				multiple
				className="as-c"
				onChange={imgs => {
					imgs = Array.isArray(imgs) ? imgs : [imgs]
					pushFiles(imgs)
				}}
			><i className="f-10 ion-plus-circled" /></FileUpload>
			<Input onChange={e => setSearch(e.target.value)} value={search} className="mr-3 ml-3 as-c flex-1" placeholder="Cari File..." />
		</View>
		<Gallery
			className="mt-3 mb-1"
			scrollable
			data={files.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))}
			numColumns={4}
			renderItem={({ item, i }) => <View flex className="m-1 relative">
				<div className="h-30 o-h ta-c">
					{
						imageType.includes(item.format) ? <img
							alt=""
							className="w-auto h-auto"
							src={item.file && item.file.length > 50 ? item.file : FILE_PATH + item.file}
						/> : videoType.includes(item.format) ? <video className="w-auto h-auto" controls>
							<source src={item.file && item.file.length > 50 ? item.file : FILE_PATH + item.file} />
						</video> : <i className="ion-document f-20 as-c" />
					}
				</div>
				<Input className="mt-3 w-full mr-2" placeholder="Nama gambar" value={item.name} onChange={e => editFile(i, { ...item, changed: true, name: e.target.value })} />
				<div className="absolute flex bc-dark pl-2 pr-2" style={{ right: 0, top: 0 }}>
					{item.id && <ButtonOpacity onClick={() => {
						(FILE_PATH + item.file).copyToClipboard()
						setToast(true)
					}} className="mr-2"><i className="c-light f-5 ion-ios7-copy-outline" /></ButtonOpacity>}
					<ButtonOpacity onClick={() => deleteFile(i)}><i className="c-light f-5 ion-trash-a" /></ButtonOpacity>
				</div>
			</View>}
		/>
		<Button className="as-fe" onClick={updateData}>Submit</Button>
	</View>
}

export default Files