import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getArticle } from 'src/utils/api';
import { View } from 'src/components/Container';

const ListArticle = () => {
	// const history = useHistory()
	const [list, setList] = useState([])
	const getList = async () => {
		const { data, status } = await getArticle()
		if (status)
			setList(data)
	}
	useEffect(() => {
		getList()
	}, [getList])
	return list.rMap(a => <View>{JSON.stringify(a)}</View>)
}

export default ListArticle