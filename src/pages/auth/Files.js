import React, { useState, useEffect } from 'react';
import { View } from 'src/components/Container';
import FileUpload from 'src/components/FileUpload';
import Gallery from 'src/components/Gallery';
import { Input } from 'src/components/Input';
import Button, { ButtonOpacity } from 'src/components/Button';
import { getFiles, updateFile, FILE_PATH } from 'src/utils/api';
import { setTitle } from 'src/redux/actions/web';
import Modal from 'src/components/Modal';
import { updateFileFolder } from '../../utils/api';

export const imageType = ["png", "jpg", "jpeg", "gif"]
export const videoType = ["mp4", "mkv"]

const Files = ({ onlyPick, onPick }) => {
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
	const [fileFolders, setFileFolders] = useState([])
	const getData = async () => {
		const { data, status } = await getFiles()
		if (status) _(data)
		const { data: folders, status: statusFolders } = await getFiles({ getFolder: true })
		if (statusFolders) setFileFolders(folders)
		setMoveDialog(false)
	}
	const [toast, setToast] = useState(false)
	useEffect(() => {
		setTitle('Daftar Files')
		getData()
	}, [])
	useEffect(() => {
		if (toast) setTimeout(() => setToast(false), 2000)
	}, [toast])
	const [moveDialog, setMoveDialog] = useState(false)
	const [showNewFolder, setShowNewFolder] = useState(false)
	const [moveItem, setMoveItem] = useState({})
	const [newFolder, setNewFolder] = useState('')
	const sort = (a, b) => {
		if (a.folder < b.folder)
			return -1
		if (a.folder > b.folder)
			return 1
		return 0;
	}
	const ViewGallery = <Gallery
		className="mt-3 mb-1"
		scrollable
		data={files.sort(sort).filter(a => [a.folder.toLowerCase(), a.name.toLowerCase()].join('').includes(search.toLowerCase()))}
		numColumns={4}
		renderItem={({ item, i }) => {
			const filePath = item.file && item.file.length > 50 ? item.file : FILE_PATH + [item.folder, item.file].join('/')
			return <View onClick={() => onPick && onPick(item)} flex className={`m-1 w-1/4 relative ${onlyPick ? 'pointer' : ''}`}>
				<div className="h-30 o-h ta-c">
					{
						imageType.includes(item.format) ? <img
							alt=""
							className="w-auto h-auto"
							src={filePath}
						/> : videoType.includes(item.format) ? <video className="w-auto h-auto" controls>
							<source src={filePath} />
						</video> : <i className="ion-document f-20 as-c" />
					}
				</div>
				<View className="mt-3 ai-c" direction="row">
					{item.folder && <View className={onlyPick ? 'as-c' : 'mr-2'}>{`${item.folder}/${onlyPick ? item.name : ''}`}</View>}
					{!onlyPick && <Input placeholder="Nama file" className="w-full" value={item.name} onChange={e => editFile(i, { ...item, changed: true, name: e.target.value })} />}
				</View>
				{!onlyPick && <div className="absolute flex bc-dark pl-2 pr-2" style={{ right: 0, top: 0 }}>
					{item.id && <>
						<ButtonOpacity onClick={() => {
							setMoveDialog(true)
							setMoveItem(item)
						}}><i className="c-light f-5 ion-arrow-move" /></ButtonOpacity>
						<ButtonOpacity title="Copy path" onClick={() => {
							filePath.copyToClipboard()
							setToast(true)
						}} className="ml-2 mr-2"><i className="c-light f-5 ion-ios-copy-outline" /></ButtonOpacity>
					</>}
					<ButtonOpacity title="Delete" onClick={() => deleteFile(i)}><i className="c-light f-5 ion-trash-a" /></ButtonOpacity>
				</div>}
			</View>
		}}
	/>
	return <View flex>
		<Modal wrapperClass="flex ai-c jc-c pl-50 pr-50" className="brd-2 p-5 bc-light" backDropClick={() => setMoveDialog(false)} visible={moveDialog}>
			<View direction="row">
				{showNewFolder && <Input placeholder="Folder Name" value={newFolder} onChange={({ target: { value } }) => setNewFolder(value)} />}
				<Button onClick={() => {
					if (newFolder !== '') {
						setFileFolders([...fileFolders, { folder: newFolder }])
						setNewFolder('')
					}
					setShowNewFolder(!showNewFolder)
				}}>{showNewFolder ? 'Create' : 'New Folder'}</Button>
			</View>
			<View className="mt-3 mb-3">Pilih folder dibawah</View>
			<View className="flex-wrap" direction="row" style={{ margin: -5 }}>
				{
					fileFolders.map(({ folder }) => <Button onClick={async () => {
						await updateFileFolder({ id: moveItem.id, folder })
						getData()
					}} style={{ margin: 5 }} className="w-1/4">{folder ? `./${folder}` : './'}</Button>)
				}
			</View>
		</Modal>
		{toast && <div style={{ zIndex: 99, bottom: 0, right: 0 }} className="bc-dark c-light p-1 pl-3 pr-3 m-2 brd-1 absolute">Copied</div>}
		<View direction="row">
			{!onlyPick && <FileUpload
				toBase64
				multiple
				className="as-c mr-3"
				onChange={imgs => {
					imgs = Array.isArray(imgs) ? imgs : [imgs]
					pushFiles(imgs)
				}}
			><i className="f-10 ion-plus-circled" /></FileUpload>}
			<Input onChange={e => setSearch(e.target.value)} value={search} className="as-c flex-1" placeholder="Cari File..." />
		</View>
		{ViewGallery}
		{!onlyPick && <Button className="as-fe" onClick={updateData}>Submit</Button>}
	</View>
}

export default Files