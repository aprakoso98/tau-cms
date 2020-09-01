import React, { useEffect, useState } from "react"
import { getManage, updateManage } from "src/utils/api"
import Gallery from "src/components/Gallery"
import { Input } from "src/components/Input"
import { setTitle } from "src/redux/actions/web"

const Kontak = () => {
	const [parts, setParts] = useState([])
	const getData = async () => {
		const { status, data } = await getManage()
		if (status) {
			setParts(data.filter(part => part.part.includes('kontak')))
		}
	}
	const onBlur = async ({ target: { value, id } }) => {
		await updateManage({ [id]: value })
	}
	const effect = () => {
		getData()
		setTitle('Kontak Kami')
	}
	useEffect(effect, [])
	return <Gallery
		scrollable
		data={parts}
		renderItem={({ item: part }) => {
			const placeholder = part.part.replace(/([a-z])([A-Z])/g, '$1 $2').ucwords()
			return <div className="flex flex-1 ai-c mb-3">
				<div className="w-2/5">{placeholder}</div>
				<Input className="w-full" placeholder={placeholder} onBlur={onBlur} id={part.part} value={part.content} />
			</div>
		}}
	/>
}

export default Kontak