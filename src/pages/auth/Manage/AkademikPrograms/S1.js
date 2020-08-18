import React, { useEffect, useState } from 'react';
import Modal from 'src/components/Modal';
import { View, ScrollView } from 'src/components/Container';
import { Input, Textarea } from 'src/components/Input';
import Button, { ButtonOpacity } from 'src/components/Button';
import { setTitle } from 'src/redux/actions/web';
import { insertProgramStudi, getManage, getProgramStudiKategori, getProgramStudi } from 'src/utils/api';

const S1 = ({ location, match: { params } }) => {
	const [state, _] = useState({
		category: [],
		programs: []
	})
	const setState = value => _({ ...state, ...value })
	const getData = async () => {
		const { data: manage } = await getManage({ part: params.path })
		const { data: category } = await getProgramStudiKategori()
		const { data: programs } = await getProgramStudi()
		const data = { ...state, ...manage, programs, category, imageNotChange: true }
		setState(data)
	}
	const updateData = async () => {
		const data = state.programs.filter(p => !p.id)
		const { data: resp, status } = await insertProgramStudi({ data })
		if (status) {
			getData()
		}
		alert(resp)
	}

	useEffect(() => {
		getData()
		setTitle(location.state.title)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])
	return <>
		<Modal backDropClick={() => setState({ modalVisible: false })} className="p-10 pr-50 pl-50 w-full h-full" visible={state.modalVisible}>
			<View className="w-full bc-light p-5 brd-5">
				<Input placeholder="Program baru" value={state.newProgram} onChange={e => setState({ newProgram: e.target.value })} />
				<Textarea className="mt-3" placeholder="Deskripsi program baru" value={state.newProgramDesc} onChange={e => setState({ newProgramDesc: e.target.value })} />
				<Button className="as-fe mt-3" onClick={() => {
					const programs = state.programs.slice()
					programs.push({
						nama: state.newProgram,
						deskripsi: state.newProgramDesc,
						bagian: state.selectedCategory
					})
					setState({ programs, modalVisible: false })
				}}>Tambah</Button>
			</View>
		</Modal>
		<View>
			<Textarea
				placeholder={location.state.title}
				value={state.content}
				className="flex-1"
				onChange={e => setState({ content: e.target.value })}
			/>
			<View className="mt-3" direction="row">
				<Input className="flex-1 mr-3" placeholder="Tambah kategori baru" value={state.newCategory} onChange={e => setState({ newCategory: e.target.value })} />
				<Button className="mb-3 mt-3 as-fe" onClick={() => {
					const category = state.category.slice()
					category.push({ id: '', nama: state.newCategory })
					setState({ category, newCategory: '' })
				}}>Tambah Category</Button>
			</View>
		</View>
		<ScrollView className="mt-5">
			<View>Programs</View>
			{
				state.category.rMap((c, i) => <View>
					<View direction="row" className="mb-3">
						<ButtonOpacity justify="fs" className={`flex-1 pb-5 pt-5 ai-c`} onClick={() => {
							const category = state.category.slice()
							const curr = category[i]
							curr.open = !curr.open
							setState({ category })
						}} children={c.nama} />
						<Button className="ai-c" onClick={() => {
							const category = state.category.slice()
							const curr = category[i]
							curr.open = true
							setState({ newProgram: '', newProgramDesc: '', modalVisible: true, category, selectedCategory: c.nama })
						}}>Tambah Program</Button>
					</View>
					{c.open && <View>
						{state.programs.filter(p => p.bagian === c.nama).rMap(p => <View>
							{p.bagian} - {p.nama}
						</View>)}
					</View>}
				</View>)
			}
		</ScrollView>
		<Button className="mb-3 mt-3 as-fe" onClick={updateData}>Update data</Button>
	</>
}

export default S1