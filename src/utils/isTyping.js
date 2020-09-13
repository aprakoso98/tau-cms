let typingTimer
const isTyping = (callback, timer = 50) => {
	clearTimeout(typingTimer)
	typingTimer = setTimeout(callback, timer)
}

export default isTyping