const actionUi = () => {
	return {
		type: 'GET_UI',
		payload: require('src/assets/ui.json')
	}
}

export default actionUi