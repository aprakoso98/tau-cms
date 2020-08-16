import React from 'react';
import fileToBase64 from 'src/utils/toBase64';

const FileUpload = ({ toBase64, className, isImage, imgClass, src, onChange = () => { }, children, ...props }) => {
	const id = Math.randomInt(1000000, 9999999).toString()
	const id2 = Math.randomInt(1000000, 9999999).toString()
	return <>
		<label className={className} htmlFor={id + id2}>
			{
				children ? children :
					isImage && <img className={imgClass} alt="" src={src} />
			}
		</label>
		<input style={{ display: 'none' }} onChange={async e => {
			if (toBase64) {
				const files = await fileToBase64(e.target.files)
				if (Array.isArray(files)) {
					onChange(files)
				} else {
					const { name, image } = files
					onChange({ name, image })
				}
			} else {
				onChange(e)
			}
		}} id={id + id2} type="file" {...props} />
	</>
}

export default FileUpload