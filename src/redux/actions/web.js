import store from '..';
const actionsWeb = (data) => {
	return {
		type: 'GET_WEB',
		payload: data
	}
}

const setTitle = (title = 'CMS') => {
	const dispatch = store.dispatch
	document.title = title + ' - Tanri Abeng University'
	dispatch(actionsWeb({ title }))
}

export default actionsWeb

export { setTitle }