import React, { forwardRef } from 'react';
import isTyping from 'src/utils/isTyping';

const Input = forwardRef(({
	onChange = () => { },
	className = "",
	value = "",
	isTypingOn = true,
	...props
}, ref) => {
	const setValue = e => {
		e.persist()
		if (isTypingOn) isTyping(() => onChange(e))
		else onChange(e)
	}
	return <input
		{...props}
		ref={ref}
		type="text"
		defaultValue={value}
		className={`bc-grey p-3 pr-5 pl-5 brd-3 ${className}`}
		onChange={setValue}
	/>
})

const Textarea = forwardRef(({
	onChange = () => { },
	className = "",
	value = "",
	isTypingOn = true,
	...props
}, ref) => {
	const setValue = e => {
		e.persist()
		if (isTypingOn) isTyping(() => onChange(e))
		else onChange(e)
	}
	return <textarea
		{...props}
		ref={ref}
		defaultValue={value}
		className={`bc-grey p-3 pr-5 pl-5 brd-3 ${className}`}
		onChange={setValue}
	/>
})

export { Input, Textarea }