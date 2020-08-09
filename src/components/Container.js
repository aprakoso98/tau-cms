import React, { useEffect, forwardRef } from 'react';
import { useState } from 'react';

const Container = forwardRef((...args) => {
	const [{ className = "", ...props }, ref] = args
	return <View ref={ref} {...props} className={className} />
})

const ScrollView = forwardRef((...args) => {
	let divRef
	const [{ top, bottom, className = "", viewClass = "", children, ...props }, refFwd] = args
	const [height, setHeight] = useState(0)
	const [child, setChild] = useState('')
	useEffect(() => {
		if (typeof refFwd === 'function')
			refFwd(divRef)
		setHeight(divRef.clientHeight)
		setTimeout(() => setChild(<>
			{top}
			<View className={viewClass}>{children}</View>
			{bottom}
		</>
		), 50)
	}, [divRef, refFwd, children, bottom, top, viewClass])
	return <View
		{...props}
		ref={ref => divRef = ref}
		style={height ? { overflowY: "auto", height, maxHeight: height } : {}}
		className={`${className} scroll-view flex-1`}
		children={child}
	/>
})

const View = forwardRef((...args) => {
	const [{ justify = "fs", direction = 'col', className = '', flex, ...props }, ref] = args
	return <div ref={ref} {...props} className={`${className} jc-${justify} ${flex ? 'flex-1' : ''} flex flex-${direction}`} />
});

export { Container, ScrollView, View }