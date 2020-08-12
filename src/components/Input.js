import React, { forwardRef } from 'react';

const Input = forwardRef(({
	className = "",
	value = "",
	...props
}, ref) => {
	return <input ref={ref} {...props} value={value} type="text" className={`bc-grey p-5 brd-3 ${className}`} />
})

const Textarea = forwardRef(({
	className = "",
	value = "",
	...props
}, ref) => {
	return <textarea ref={ref} {...props} value={value} className={`bc-grey p-5 brd-3 ${className}`} />
})

export { Input, Textarea }