import React from 'react';
import fileToBase64 from 'src/utils/toBase64';

const FileUpload = ({ style, toBase64, className, isImage, imgClass, src, onChange = () => { }, children, ...props }) => {
	const id = Math.randomInt(1000000, 9999999).toString()
	const id2 = Math.randomInt(1000000, 9999999).toString()
	return <>
		<label style={{ cursor: 'pointer', ...style }} className={className} htmlFor={id + id2}>
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
					onChange(files)
				}
			} else {
				onChange(e)
			}
		}}  {...props} id={id + id2} {...isImage ? { accept: 'image/*' } : {}} type="file" />
	</>
}

export default FileUpload