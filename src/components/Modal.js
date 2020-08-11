import React from 'react';
import { View } from 'src/components/Container';

const Modal = ({ backDropClick, onOpen = () => { }, visible, style, className = "", ...props }) => {
	if (visible)
		onOpen()
	return <div className="absolute w-full h-full" style={{ top: 0, left: 0, ...!visible && { display: 'none' } }}>
		<div className="bc-dark-tr absolute w-full h-full" style={{ zIndex: 1 }} onClick={backDropClick} />
		<View {...props} style={{ zIndex: 2, ...style }} flex className={`relative ${className}`} />
	</div>
}

export default Modal