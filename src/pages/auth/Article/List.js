import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { getArticle } from 'src/utils/api';
import { View, ScrollView } from 'src/components/Container';
import { setTitle, setScrollViewClass } from 'src/redux/actions/web';
import Button from 'src/components/Button';
import Select from 'src/components/Select';
import { useHistory } from 'react-router-dom';

let news
const ListArticle = () => {
	const history = useHistory()
	const [articles, setArticles] = useState({})
	const [index, setIndex] = useState(0)
	const [pages, setPages] = useState(1)
	const [articlePerPage, setArticlePerPage] = useState(10)
	const getList = async () => {
		const { data: { data, total }, status } = await getArticle({ from: index, limit: articlePerPage })
		if (status) {
			news = data
			setArticles({ total, data: generatePagingData(data, total, articlePerPage) })
		}
	}
	const generatePagingData = (data, total, aP) => {
		let sisa = total % aP
		let p = (total - sisa) / aP + (sisa > 0 ? 1 : 0)
		setPages(p)
		return Array.generateEmpty(p).map((_a, i) => {
			let min = i * aP
			let max = (i + 1) * aP
			return data.filter((_a, idx) => idx >= min && idx < max)
		})
	}
	const changePerPage = p => {
		setArticlePerPage(p)
		setArticles({ total: articles.total, data: generatePagingData(news, articles.total, p) })
	}

	useEffect(() => {
		getList()
		setTitle('Daftar Artikel')
	}, [])

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

	return <View id="article-list" flex justify="sb">
		<View id="top" direction="row">
			<Select value={articlePerPage + " Data per halaman"} onSelect={({ item }) => changePerPage(item)} render={({ item }) => <View className="pb-3">{item}</View>} data={[10, 15, 20, 25, 30, 50, 100]} />
			<Button className="ml-5 ai-c" flex="" onClick={() => history.push('/article/post')}>Post artikel baru</Button>
		</View>
		{/* <ScrollView className="pt-5 pb-5"> */}
		<table class="mt-5 mb-5 text-left w-full">
			<thead class="flex w-full">
				<tr class="flex w-full">
					<th className="w-1/12 p-5">ID</th>
					<th className="w-3/12 p-5">Judul</th>
					<th className="w-3/12 p-5">Deskripsi</th>
					<th className="w-full p-5">Konten</th>
				</tr>
			</thead>
			<tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style={{ height: getBodyHeight() }}>
				{articles.data && articles.data[index] && articles.data[index].rMap(article =>
					<tr class="flex w-full">
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
			<Button className="w-15 h-15 brd-20 ai-c" disabled={index === 0} onClick={() => setIndex(index - 1)}>
				<i className="f-5 fa fa-chevron-left" />
			</Button>
			{articles.data && articles.data.rMap((a, i) =>
				<Button className="f-5 ml-3 w-15 h-15 ai-c brd-20 p-0" disabled={i === index} onClick={() => setIndex(i)}>{i + 1}</Button>
			)}
			<Button className="ml-3 w-15 h-15 brd-20 ai-c" disabled={index === pages - 1} onClick={() => setIndex(index + 1)}>
				<i className="f-5 fa fa-chevron-right" />
			</Button>
		</View>
	</View>
}

export default ListArticle