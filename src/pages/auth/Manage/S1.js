import React, { useEffect, useState } from 'react';
import Modal from 'src/components/Modal';
import { View, ScrollView } from 'src/components/Container';
import { Input, Textarea } from 'src/components/Input';
import Button, { ButtonOpacity } from 'src/components/Button';
import { setTitle } from 'src/redux/actions/web';
import { getS1Kategori, getS1, getManage, FILE_PATH, insertS1, updateS1, updateManage } from 'src/utils/api';
import JoditEditor from 'jodit-react';
// import FileUpload from 'src/components/FileUpload';
import { joditConfig } from 'src/utils/state';

let winState = {}

const S1 = ({ location, match: { params } }) => {
	const [view, setView] = useState('visi_prodi')
	const [state, _] = useState({
		programs: [],
		newProdi: {}
	})
	const editorConfig = {
		...joditConfig,
		editorCssClass: view
	}
	const setState = value => _({ ...winState, ...value })
	const getData = async () => {
		const { data: manage } = await getManage({ part: params.path })
		const { data: category } = await getS1Kategori()
		const promises = category.map(async cat => {
			const { data } = await getS1({ id_program: cat.id })
			return { ...cat, data }
		})
		const programs = await Promise.all(promises)
		setState({ ...manage, programs, modalVisible: false })
	}

	useEffect(() => {
		getData()
		setTitle(location.state.title)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])
	const article = ["visi_prodi", "misi_prodi", "kurikulum_prodi", "kompetensi_prodi", "dosen_prodi"]
	const onChangeNewProdi = (id, value) => {
		const newProdi = { ...state.newProdi }
		newProdi[id] = value
		setState({ newProdi })
	}
	const addProdi = async () => {
		let { newProdi } = state
		// if (newProdi.foto_prodi) {
		let resp
		const regex = new RegExp(FILE_PATH, "g")
		newProdi.id_program = state.programs[state.selectedCategory].id
		newProdi.visi_prodi = newProdi.visi_prodi.replace(regex, "$FILE_PATH")
		newProdi.misi_prodi = newProdi.misi_prodi.replace(regex, "$FILE_PATH")
		newProdi.kurikulum_prodi = newProdi.kurikulum_prodi.replace(regex, "$FILE_PATH")
		newProdi.kompetensi_prodi = newProdi.kompetensi_prodi.replace(regex, "$FILE_PATH")
		newProdi.dosen_prodi = newProdi.dosen_prodi.replace(regex, "$FILE_PATH")
		if (state.isNewProgram) {
			resp = await insertS1(newProdi)
		} else {
			resp = await updateS1(newProdi)
		}
		const { data } = resp
		alert(data)
		getData()
		// } else {
		// 	alert('Silahkan ubah gambar')
		// }
	}
	// const srcModal = () => {
	// 	let img = state.newProdi.foto_prodi
	// 	if (img && img.length > 50)
	// 		return img
	// 	else if (img && img.length < 50)
	// 		return FILE_PATH + img
	// 	return require('src/assets/images/1-1.jpg')
	// }
	winState = state
	return <>
		<Modal backDropClick={() => setState({ modalVisible: false })} className="p-10 pr-20 pl-20 w-full h-full" visible={state.modalVisible}>
			<div className="bc-light p-5 flex brd-1 flex-1 flex-col">
				<div className="ta-c">{state.isNewProgram ? 'Tambah Prodi' : 'Ubah Prodi'}</div>
				<div className="flex ai-c">
					{/* <FileUpload
						isImage
						toBase64
						onChange={img => onChangeNewProdi('foto_prodi', img.file)}
						imgClass="w-30 brd-1 o-h mr-3"
						src={srcModal()}
					/> */}
					<View flex>
						{/* <div className="flex mb-1">
							<Input placeholder="Dosen" value={state.newProdi.dosen_prodi} onChange={e => onChangeNewProdi('dosen_prodi', e.target.value)} className="flex-1" />
						</div> */}
						<Input placeholder="Nama" value={state.newProdi.nama_prodi} onChange={e => onChangeNewProdi('nama_prodi', e.target.value)} className="mb-1 flex-1" />
						<Input placeholder="Deskripsi" className="flex" value={state.newProdi.deskripsi_prodi} onChange={e => onChangeNewProdi('deskripsi_prodi', e.target.value)} />
					</View>
				</div>
				<div className="flex">
					{article.rMap(btn => <ButtonOpacity onClick={() => setView(btn)} className={`p-3 flex flex-1 ${btn === view ? 'c-link bb-2-link' : ''}`}>{btn.split('_')[0].ucwords()}</ButtonOpacity>)}
				</div>
				<JoditEditor
					value={state.newProdi[view] || ''}
					config={editorConfig}
					tabIndex={1}
					onBlur={e => onChangeNewProdi(view, e.target.innerHTML)}
				/>
				<View direction="row" className="as-fe">
					<Button className="mr-3" onClick={() => setState({ modalVisible: false, newProdi: {} })}>Batal</Button>
					<Button onClick={addProdi}>Submit</Button>
				</View>
			</div>
		</Modal>
		<View>
			<Textarea
				placeholder={location.state.title}
				value={state.content}
				className="flex-1"
				onBlur={async (e) => await updateManage({ part: params.path, content: e.target.value, image: null })}
				onChange={e => setState({ content: e.target.value })}
			/>
		</View>
		<ScrollView className="mt-5">
			{
				state.programs.rMap(({ nama, data: programs = [], opened }, i) => {
					return <View className="pr-3">
						<View className="mb-1" direction="row">
							<ButtonOpacity justify="fs" className={`flex-1 pb-5 pt-5 ai-c`} onClick={() => {
								const programs = state.programs.slice()
								const curr = programs[i]
								curr.opened = !curr.opened
								setState({ programs })
							}} children={nama} />
							<Button className="ai-c" onClick={() => {
								const programs = state.programs.slice()
								const curr = programs[i]
								curr.opened = true
								setState({ newProdi: {}, modalVisible: true, isNewProgram: true, programs, selectedCategory: i })
							}}>Tambah Program</Button>
						</View>
						{opened && programs.rMap(program => {
							return <View direction="row" className="ai-c mb-1">
								{/* <img alt="" className="mr-3 brd-1 o-h w-30" src={FILE_PATH + program.foto_prodi} /> */}
								<View flex>
									<div>{program.nama_prodi}</div>
									<div>{program.deskripsi_prodi}</div>
								</View>
								<Button onClick={() => {
									program.visi_prodi = program.visi_prodi.replace(/\$FILE_PATH/g, FILE_PATH)
									program.misi_prodi = program.misi_prodi.replace(/\$FILE_PATH/g, FILE_PATH)
									program.kurikulum_prodi = program.kurikulum_prodi.replace(/\$FILE_PATH/g, FILE_PATH)
									program.kompetensi_prodi = program.kompetensi_prodi.replace(/\$FILE_PATH/g, FILE_PATH)
									setState({ newProdi: program, isNewProgram: false, modalVisible: true, selectedCategory: i })
								}}>Edit</Button>
							</View>
						})}
					</View>
				})
			}
		</ScrollView>
	</>
}

export default S1