import React, { forwardRef } from 'react';
import isTyping from 'src/utils/isTyping';

const Input = forwardRef(({
	onChange = () => { },
	className = "",
	value,
	isTypingOn = true,
	...props
}, ref) => {
	const setValue = e => {
		e.persist()
		if (isTypingOn) isTyping(() => onChange(e))
		else onChange(e)
	}
	return <input
		type="text"
		title={props.placeholder || props.id}
		{...props}
		ref={ref}
		defaultValue={value}
		className={`bc-light b-1 p-2 pr-5 pl-5 brd-1 ${className}`}
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
		className={`bc-light p-2 pr-5 pl-5 b-1 brd-1 ${className}`}
		onChange={setValue}
	/>
})

export { Input, Textarea }