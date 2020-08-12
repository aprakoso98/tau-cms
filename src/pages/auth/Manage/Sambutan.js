import React, { useState, useEffect } from 'react';
import { View } from 'src/components/Container';
import { Textarea } from 'src/components/Input';
import FileUpload from 'src/components/FileUpload';
import Button from 'src/components/Button';
import { getManage, updateManage, IMG_PATH } from 'src/utils/api';
import { setTitle } from 'src/redux/actions/web';

const Sambutan = () => {
	const [state, _] = useState({})
	const setState = v => _({ ...state, ...v })
	const updateData = async () => {
		// const { image, content } = state
		let { data } = await updateManage(state)
		alert(data)
	}
	const getData = async () => {
		let { data, status } = await getManage({ part: 'sambutan' })
		data.image = data.image === 'null' ? null : data.image
		if (status) {
			setState(data)
		}
	}
	const effect = () => {
		getData()
		setTitle('Sambutan Rektor TAU')
	}
	useEffect(effect, [])
	return <View>
		<View flex direction="row" className="mb-3">
			<FileUpload
				isImage
				toBase64
				imgClass="b-1 w-auto h-full"
				accept="image/*"
				className="h-35 mr-3"
				src={IMG_PATH + state.image}
				onChange={({ image }) => setState({ image })}
			/>
			<Textarea
				placeholder="Sambutan Rektor TAU"
				value={state.content}
				className="flex-1"
				onChange={e => setState({ content: e.target.value })}
			/>
		</View>
		<Button className="as-fe" onClick={updateData}>Update data</Button>
	</View>
}

export default Sambutan