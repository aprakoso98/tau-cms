import { updateFile } from "src/utils/api"

const stateObject = (val, set) => {
	return value => set({ ...val, ...value })
}

export default stateObject

export const uploadImages = async string => {
	const reg = new RegExp('data:image/([a-zA-Z]*);base64,([^"]*)', 'g')
	const matchImages = string.match(reg) || []
	const images = matchImages.map(file => {
		const format = file.substring("data:image/".length, file.indexOf(";base64"))
		const name = "".uuid()
		return { format, name, file }
	})
	const { status, data: { files: data, mod } } = await updateFile({ data: images })
	if (status) {
		let index = -1, o = 0
		const files = data.reduce((images, desc, i) => {
			if (i % mod === 0) {
				images.push({})
				index++
				o = 0
			}
			images[index][o === 0 ? 'file' : o === 1 ? 'name' : 'format'] = desc
			o++
			return images
		}, [])
		matchImages.forEach((img, i) => string = string.replace(img, `$FILE_PATH${files[i].file}`))
		return string
	}
	return
}

export const joditConfig = {
	spellcheck: true,
	toolbarButtonSize: 'large',
	buttons: [
		'bold', 'italic', 'underline', 'eraser', '|',
		'fontsize', 'brush', '|',
		'ul', 'ol', 'align', '|',
		'image', 'link', '|',
		'hr', '|',
		'undo', 'redo', 'preview'
	],
	uploader: {
		insertImageAsBase64URI: true
	}
}