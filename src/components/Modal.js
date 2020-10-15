import React from 'react';
import { View } from 'src/components/Container';

const Modal = ({ wrapperClass = "", backDropClick, onOpen = () => { }, visible, style, className = "", ...props }) => {
	if (visible)
		onOpen()
	return <div className={`absolute w-full h-full ${wrapperClass}`} style={{ top: 0, left: 0, ...!visible && { display: 'none' } }}>
		<div className="bc-dark-tr absolute w-full h-full" style={{ zIndex: 999 }} onClick={backDropClick} />
		<View {...props} style={{ zIndex: 1000, ...style }} flex className={`relative ${className}`} />
	</div>
}

export default Modal