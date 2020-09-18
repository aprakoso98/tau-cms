/* eslint-disable no-redeclare */
import React, { useEffect, useState } from 'react';
import { getArticle, removeArticle } from 'src/utils/api';
import { View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Button, { ButtonOpacity } from 'src/components/Button';
import Select from 'src/components/Select';
import { useHistory, Link } from 'react-router-dom';
import { Input } from 'src/components/Input';

const ListArticle = () => {
	const history = useHistory()
	const [search, setSearch] = useState('')
	const [dataArticle, setDataArticle] = useState([])
	const [state, _] = useState({
		data: [],
		total: 0,
		listPerPage: 10,
		totalPage: 1,
		page: 1
	})
	const { data, listPerPage, totalPage, page } = state
	const setState = value => _({ ...state, ...value })
	const onChangeSearch = e => {
		const value = e.target.value
		const data = dataArticle.filter(({ tgl, judul, url }) => `${tgl}${judul}${url}`.toLowerCase().includes(value.toLowerCase()))
		reRender({ ...state, total: data.length, data })
		setSearch(value)
	}
	const dataPage = () => {
		let start = (page - 1) * listPerPage
		let end = (page * listPerPage) - 1
		return data.filter((a, i) => i >= start && i <= end)
	}
	const reRender = data => {
		const sisa = data.total % data.listPerPage
		data.totalPage = (data.total - sisa) / data.listPerPage + (sisa > 0 ? 1 : 0)
		if (data.totalPage < data.page) data.page = data.totalPage
		else data.page = 1
		setState(data)
	}
	const getData = async () => {
		let from = 0, dataArticle = []
		var { data: { data, total, limit }, status } = await getArticle()
		if (status) {
			if (Array.isArray(data)) {
				dataArticle = data
			}
		}
		if (status && data) {
			const sisa = total % limit
			const loop = (total - sisa) / limit + (sisa > 0 ? 1 : 0)
			for (let i = 1; i < loop; i++) {
				from = i * limit
				var { status, data: { data } } = await getArticle({ from, limit })
				if (status) {
					if (Array.isArray(data)) {
						dataArticle = [...dataArticle, ...data]
					}
				}
			}
			total = dataArticle.length
			reRender({ ...state, total, data: dataArticle })
			setDataArticle(dataArticle)
		}
	}
	const getBodyHeight = () => {
		var [p, t, b] = ['#article-list', ' #top', ' #bot']
		var [parent, ttop, bot, table] = [document.querySelector(p), document.querySelector(p + t), document.querySelector(p + b), document.querySelector(p + ' table')]
		if (parent && parent.clientHeight) {
			var thead = table.firstElementChild
			var { marginTop, marginBottom } = getComputedStyle(table)
			return parent.clientHeight - ttop.clientHeight - bot.clientHeight - thead.clientHeight - marginBottom.extractNumber() - marginTop.extractNumber()
		}
		return 0
	}
	const deleteArticle = async (id, judul, remove) => {
		if (remove) {
			const { status, data } = await removeArticle({ id })
			alert(data)
			if (status) getData()
		} else {
			const dialog = window.confirm(`Yakin hapus artikel ${judul}`)
			if (dialog) deleteArticle(id, judul, true)
		}
	}
	const effect = () => {
		getData()
		setTitle('Daftar Artikel')
	}
	useEffect(effect, [])

	const Pagination = () => {
		const max = 3
		const pagination = Array.generateEmpty(totalPage).filter((_, i) => {
			// eslint-disable-next-line no-mixed-operators
			return i === 0 || i + 1 === totalPage || i >= page - max && i <= page + max - 2
		})
		return pagination.rMap((i) => {
			const curr = i + 1 === page
			return <Button
				className="f-4 ml-3 w-10 h-10 ai-c brd-20 p-0"
				disabled={curr}
				onClick={() => setState({ page: i + 1 })}>{i + 1}</Button>
		})
	}

	return <View id="article-list" flex justify="sb">
		<View id="top" direction="row">
			<Select value={listPerPage + " Data per halaman"}
				onSelect={({ item }) => reRender({ ...state, listPerPage: item })}
				render={({ item }) => <View className="pb-3">{item}</View>}
				data={[10, 10, 20, 25, 30, 50, 100]}
			/>
			<Input placeholder="Cari artikel" value={search} isTypingOn={false} onChange={onChangeSearch} className="ml-5 flex flex-1" />
			<Button className="ml-5 ai-c" flex="" onClick={() => history.push('/article/post')}>Post artikel baru</Button>
		</View>
		{/* <ScrollView className="pt-5 pb-5"> */}
		<table className="mt-5 mb-5 text-left w-full">
			<thead className="flex w-full">
				<tr style={{ overflowY: 'scroll' }} className="flex w-full">
					<th className="w-4/12 p-3 o-wrap">Tanggal</th>
					<th className="w-3/12 p-3 o-wrap">Judul</th>
					<th className="w-4/12 p-3 o-wrap">URL</th>
					<th className="w-full p-3 o-wrap">Deskripsi</th>
					<th className="w-2/12 p-3 o-wrap" />
				</tr>
			</thead>
			<tbody className="bg-grey-light flex flex-col items-center overflow-y-scroll w-full" style={{ height: getBodyHeight() }}>
				{
					dataPage().rMap(article => {
						return <tr className="flex w-full">
							<td className="w-4/12 p-3 o-wrap">{article.tgl}</td>
							<td className="w-3/12 p-3 o-wrap">{article.judul}</td>
							<td className="w-4/12 p-3 o-wrap">{article.url}</td>
							<td className="w-full p-3 o-wrap">{article.deskripsi}</td>
							<td className="w-2/12 p-3 o-wrap">
								<div className="flex">
									<Link className="p-2" to={{ pathname: '/article/edit', state: article.url }}><i className="ion-edit" /></Link>
									<ButtonOpacity onClick={() => deleteArticle(article.id, article.judul)} className="p-2"><i className="c-link ion-trash-a" /></ButtonOpacity>
								</div>
							</td>
						</tr>
					})
				}
			</tbody>
		</table>
		{/* </ScrollView> */}
		<View id="bot" className="as-fe" direction="row">
			<Button className="w-10 h-10 brd-20 ai-c" disabled={page <= 1} onClick={() => setState({ page: page - 1 })}>
				<i className="f-4 fa fa-chevron-left" />
			</Button>
			<Pagination />
			<Button className="ml-3 w-10 h-10 brd-20 ai-c" disabled={page >= totalPage} onClick={() => setState({ page: page + 1 })}>
				<i className="f-4 fa fa-chevron-right" />
			</Button>
		</View>
	</View>
}

export default ListArticle