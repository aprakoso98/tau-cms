const initState = {
	loggedIn: false,
	minimizedDrawer: false,
	documentReady: false,
	title: 'CMS',
	viewClass: '',
	article: {
		artikel: ''
	}
}

const reducerWeb = (state = initState, actions) => {
	switch (actions.type) {
		case 'GET_WEB':
			return { ...state, ...actions.payload }
		case 'GET_WEB_FULFILLED':
			return { ...state, ...actions.payload }
		case 'GET_WEB_REJECTED':
			return { ...state }
		default: return state
	}
}

export default reducerWeb