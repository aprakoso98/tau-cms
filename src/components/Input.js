import React, { forwardRef } from 'react';

const Input = forwardRef(({
	className = "",
	...props
}, ref) => {
	return <input ref={ref} {...props} className={`bc-grey p-5 brd-3 mb-3 flex-1 ${className}`} />
})

const Textarea = forwardRef(({
	className = "",
	...props
}, ref) => {
	return <textarea ref={ref} {...props} className={`bc-grey p-5 brd-3 mb-3 flex-1 ${className}`} />
})

export { Input, Textarea }