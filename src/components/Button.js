import React, { forwardRef } from "react";

const ButtonOpacity = forwardRef((...args) => {
	const [{ justify = "c", flex = "flex-1", direction = 'row', className = '', ...props }, ref] = args
	return <button ref={ref} {...props} className={`${className} jc-${justify} ${flex} flex flex-${direction}`} />
});

const Button = forwardRef((...args) => {
	const [{ className = '', ...props }, ref] = args
	return <ButtonOpacity ref={ref} {...props} justify="c" className={`${className} pl-10 pr-10 brd-5 p-3 bc-grey`} />
});

export default Button

export { ButtonOpacity }