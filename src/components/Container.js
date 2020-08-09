import React, { useEffect, forwardRef } from 'react';
import { useState } from 'react';

const Container = ({ className = "", ...props }) => {
	return <View {...props} className={`flex-1 ${className}`} />
}

const ScrollView = forwardRef(({ className = "", children, ...props }, refFwd = () => { }) => {
	let divRef
	const [height, setHeight] = useState(0)
	const [child, setChild] = useState('')
	useEffect(() => {
		refFwd(divRef)
		setHeight(divRef.clientHeight)
		setTimeout(() => setChild(children), 50)
	}, [divRef, refFwd, children])
	return <View
		{...props}
		ref={ref => divRef = ref}
		style={height ? { overflowY: "auto", height, maxHeight: height } : {}}
		className={`${className} flex-1`}
		children={child}
	/>
})

const View = forwardRef(({ justify = "fs", direction = 'col', className = '', ...props }, ref) => {
	return <div ref={ref} {...props} className={`${className} jc-${justify} flex flex-${direction}`} />
});

export { Container, ScrollView, View }