import React, { useEffect, useState } from 'react';
import Modal from 'src/components/Modal';
import { View, ScrollView } from 'src/components/Container';
import { Input, Textarea } from 'src/components/Input';
import Button, { ButtonOpacity } from 'src/components/Button';
import { setTitle } from 'src/redux/actions/web';
import { getS1Kategori, getS1, getManage, IMG_PATH, insertS1, updateS1, updateManage } from 'src/utils/api';
import JoditEditor from 'jodit-react';
import FileUpload from 'src/components/FileUpload';

const S1 = ({ location, match: { params } }) => {
	const [state, _] = useState({
		programs: [],
		newProdi: {}
	})
	const setState = value => _({ ...state, ...value })
	const getData = async () => {
		const { data: manage } = await getManage({ part: params.path })
		const { data: category } = await getS1Kategori()
		const promises = category.map(async cat => {
			const { data } = await getS1({ id_program: cat.id })
			return { ...cat, data }
		})
		const programs = await Promise.all(promises)
		setState({ ...manage, programs })
		console.log({ ...manage, programs })
	}

	useEffect(() => {
		getData()
		setTitle(location.state.title)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])
	const [view, setView] = useState('visi_prodi')
	const article = ["visi_prodi", "misi_prodi", "kurikulum_prodi", "kompetensi_prodi"]
	const onChangeNewProdi = (id, value) => {
		const newProdi = { ...state.newProdi }
		newProdi[id] = value
		setState({ newProdi })
	}
	const addProdi = async () => {
		let { newProdi } = state
		if (newProdi.foto_prodi) {
			let resp
			newProdi.id_program = state.programs[state.selectedCategory].id
			if (state.isNewProgram) {
				resp = await insertS1(newProdi)
			} else {
				resp = await updateS1(newProdi)
			}
			const { data } = resp
			setState({ modalVisible: false })
			alert(data)
			getData()
		} else {
			alert('Silahkan ubah gambar')
		}
	}
	const srcModal = () => {
		let img = state.newProdi.foto_prodi
		if (img && img.length > 50)
			return img
		else if (img && img.length < 50)
			return IMG_PATH + img
		return require('src/assets/images/1-1.jpg')
	}
	return <>
		<Modal backDropClick={() => setState({ modalVisible: false })} className="p-10 pr-20 pl-20 w-full h-full" visible={state.modalVisible}>
			<div className="bc-light p-5 flex brd-5 flex-1 flex-col">
				<div className="ta-c">{state.isNewProgram ? 'Tambah Prodi' : 'Ubah Prodi'}</div>
				<div className="flex ai-c">
					<FileUpload
						isImage
						toBase64
						onChange={img => onChangeNewProdi('foto_prodi', img.image)}
						imgClass="w-30 brd-3 o-h mr-3"
						src={srcModal()}
					/>
					<View flex>
						<div className="flex mb-3">
							<Input placeholder="Nama" value={state.newProdi.nama_prodi} onChange={e => onChangeNewProdi('nama_prodi', e.target.value)} className="mr-3 flex-1" />
							<Input placeholder="Dosen" value={state.newProdi.dosen_prodi} onChange={e => onChangeNewProdi('dosen_prodi', e.target.value)} className="flex-1" />
						</div>
						<Input placeholder="Deskripsi" className="flex" value={state.newProdi.deskripsi_prodi} onChange={e => onChangeNewProdi('deskripsi_prodi', e.target.value)} />
					</View>
				</div>
				<div className="flex">
					{article.rMap(btn => <ButtonOpacity onClick={() => setView(btn)} className={`p-3 flex flex-1 ${btn === view ? 'c-link bb-2-link' : ''}`}>{btn.split('_')[0].ucwords()}</ButtonOpacity>)}
				</div>
				<JoditEditor
					value={state.newProdi[view] || ''}
					config={{ spellcheck: true, editorCssClass: view }}
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
				onBlur={async () => await updateManage({ part: params.path, content: state.content, image: null })}
				onChange={e => setState({ content: e.target.value })}
			/>
		</View>
		<ScrollView className="mt-5">
			{
				state.programs.rMap(({ nama, data: programs = [], opened }, i) => {
					return <View className="pr-3">
						<View className="mb-3" direction="row">
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
							return <View direction="row" className="ai-c mb-3">
								<img alt="" className="mr-3 brd-5 o-h w-30" src={IMG_PATH + program.foto_prodi} />
								<View flex>
									<div>{program.nama_prodi}</div>
									<div>{program.deskripsi_prodi}</div>
								</View>
								<Button onClick={() => setState({ newProdi: program, isNewProgram: false, modalVisible: true, selectedCategory: i })}>Edit</Button>
							</View>
						})}
					</View>
				})
			}
		</ScrollView>
	</>
}

export default S1