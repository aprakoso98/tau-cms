let typingTimer
const isTyping = (callback, timer = 500) => {
	clearTimeout(typingTimer)
	typingTimer = setTimeout(callback, timer)
}

export default isTyping