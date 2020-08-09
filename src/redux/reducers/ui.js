const initState = {
	data: {},
	isError: false,
	isLoading: false
}

const reducerUi = (state = initState, actions) => {
	switch (actions.type) {
		case 'GET_UI':
			return {
				...state,
				data: actions.payload,
				isLoading: true
			}
		case 'GET_UI_FULFILLED':
			return {
				...state,
				data: actions.payload,
				isLoading: false
			}
		case 'GET_UI_REJECTED':
			return { ...initState }
		default: return state
	}
}

export default reducerUi