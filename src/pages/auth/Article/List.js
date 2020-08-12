import React, { useEffect, useState } from 'react';
import { getArticle } from 'src/utils/api';
import { View } from 'src/components/Container';
import { setTitle } from 'src/redux/actions/web';
import Button from 'src/components/Button';
import Select from 'src/components/Select';
import { useHistory } from 'react-router-dom';

const ListArticle = () => {
	const history = useHistory()
	const [state, _] = useState({
		data: [],
		total: 0,
		listPerPage: 10,
		totalPage: 1,
		page: 1
	})
	// eslint-disable-next-line no-unused-vars
	const { data, total, listPerPage, totalPage, page } = state
	const setState = value => _({ ...state, ...value })
	const dataPage = () => {
		const start = (page - 1) * listPerPage
		const end = (page * listPerPage) - 1
		return data.filter((a, i) => i >= start && i <= end)
	}
	const reRender = data => {
		const sisa = data.total % data.listPerPage
		data.totalPage = (data.total - sisa) / data.listPerPage + (sisa > 0 ? 1 : 0)
		if (data.totalPage < data.page)
			data.page = data.totalPage
		setState(data)
	}
	const getData = async () => {
		const { data, status } = await getArticle()
		if (status) {
			reRender({ ...state, ...data })
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
	const effect = () => {
		getData()
		setTitle('Daftar Artikel')
	}
	useEffect(effect, [])
	return <View id="article-list" flex justify="sb">
		<View id="top" direction="row">
			<Select value={listPerPage + " Data per halaman"}
				onSelect={({ item }) => reRender({ ...state, listPerPage: item })}
				render={({ item }) => <View className="pb-3">{item}</View>}
				data={[10, 15, 20, 25, 30, 50, 100]}
			/>
			<Button className="ml-5 ai-c" flex="" onClick={() => history.push('/article/post')}>Post artikel baru</Button>
		</View>
		{/* <ScrollView className="pt-5 pb-5"> */}
		<table className="mt-5 mb-5 text-left w-full">
			<thead className="flex w-full">
				<tr className="flex w-full">
					<th className="w-1/12 p-5">ID</th>
					<th className="w-3/12 p-5">Judul</th>
					<th className="w-3/12 p-5">Deskripsi</th>
					<th className="w-full p-5">Konten</th>
				</tr>
			</thead>
			<tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style={{ height: getBodyHeight() }}>
				{dataPage().rMap(article =>
					<tr className="flex w-full">
						<td className="w-1/12 p-5">{article.id}</td>
						<td className="w-3/12 p-5">{article.judul}</td>
						<td className="w-3/12 p-5">{article.deskripsi}</td>
						<td className="w-full p-5">{article.artikel}</td>
					</tr>
				)}
			</tbody>
		</table>
		{/* </ScrollView> */}
		<View id="bot" className="as-fe" direction="row">
			<Button className="w-15 h-15 brd-20 ai-c" disabled={page === 1} onClick={() => setState({ page: page - 1 })}>
				<i className="f-5 fa fa-chevron-left" />
			</Button>
			{Array.generateEmpty(totalPage).rMap((a, i) =>
				<Button className="f-5 ml-3 w-15 h-15 ai-c brd-20 p-0" disabled={i + 1 === page} onClick={() => setState({ page: i + 1 })}>{i + 1}</Button>
			)}
			<Button className="ml-3 w-15 h-15 brd-20 ai-c" disabled={page === totalPage} onClick={() => setState({ page: page + 1 })}>
				<i className="f-5 fa fa-chevron-right" />
			</Button>
		</View>
	</View>
}

export default ListArticle