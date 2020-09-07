import React, { forwardRef } from "react";

const ButtonOpacity = forwardRef((...args) => {
	const [{ disabled, onClick, justify = "c", flex, direction = 'row', className = '', ...props }, ref] = args
	return <button style={{ opacity: disabled ? .5 : 1 }} ref={ref} {...props} onClick={disabled ? null : onClick} className={`${className} jc-${justify} ${flex ? 'flex-1' : ''} flex flex-${direction}`} />
});

const Button = forwardRef((...args) => {
	const [{ className = '', replaceClass, justify = "c", ...props }, ref] = args
	return <ButtonOpacity ref={ref} {...props} justify={justify} className={`${!replaceClass && 'brd-1 p-1 pr-3 pl-3 bc-blue c-light'} ${className}`} />
});

export default Button

export { ButtonOpacity }