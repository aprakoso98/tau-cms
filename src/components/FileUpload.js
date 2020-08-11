import React from 'react';

const FileUpload = ({ labelClass, className, isImage, imgClass, src, children, ...props }) => {
	const id = Math.randomInt(100000, 999999).toString()
	return <div className={className}>
		<label className={labelClass} htmlFor={id}>
			{
				children ? children :
					isImage && <img className={imgClass} alt="" src={src} />
			}
		</label>
		<input style={{ display: 'none' }} id={id} type="file" {...props} />
	</div>
}

export default FileUpload