import { updateFile, FILE_PATH } from "src/utils/api"
import toBase64 from "./toBase64"
import { imageType } from "src/pages/auth/Files"

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
	enableDragAndDropFileToEditor: false,
	toolbarButtonSize: 'large',
	buttons: [
		'bold', 'italic', 'underline', 'eraser', '|',
		'fontsize', 'brush', '|',
		'ul', 'ol', 'align', '|',
		'image', 'file', 'link', '|',
		'hr', '|',
		'undo', 'redo', 'preview'
	],
	uploader: {
		url: '/uploader.php',
		method: "post",
		prepareData: async function () {
			const input = document.querySelector('.jodit-popup-container input[type="file"]')
			const popupContent = document.querySelector('.jodit-popup-container .jodit-popup__content')
			const files = await toBase64(input.files)
			const { status, data: response } = await updateFile({ data: Array.isArray(files) ? files : [files] })
			if (status) {
				let index = -1, o = 0
				const { files: data, mod } = response
				const resp = data.reduce((images, desc, i) => {
					if (i % mod === 0) {
						images.push({})
						index++
						o = 0
					}
					images[index][o === 0 ? 'file' : o === 1 ? 'name' : 'format'] = desc
					images[index].isImage = imageType.includes(images[index].format)
					o++
					return images
				}, [])
				for (let i = 0; i < resp.length; i++) {
					const { name, file, isImage, format } = resp[i]
					const fullPath = FILE_PATH + file
					if (isImage) {
						this.jodit.selection.insertImage(fullPath, "", "")
					} else {
						this.jodit.selection.insertHTML(`<label class="mr-1"><a class="c-link" target="_blank" href="${fullPath}">${name}.${format}</a></label>`)
					}
				}
				popupContent.parentNode.remove(popupContent)
			} else {
				alert(response[2])
			}
		},
		error: () => null,
	}
}