import React, { forwardRef } from 'react';

const Input = forwardRef(({
	className = "",
	...props
}, ref) => {
	return <input type="text" ref={ref} {...props} className={`bc-grey p-5 brd-3 ${className}`} />
})

const Textarea = forwardRef(({
	className = "",
	...props
}, ref) => {
	return <textarea ref={ref} {...props} className={`bc-grey p-5 brd-3 ${className}`} />
})

export { Input, Textarea }