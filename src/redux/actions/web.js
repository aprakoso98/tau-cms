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

const setScrollViewClass = classs => {
	const dispatch = store.dispatch
	dispatch(actionsWeb({ viewClass: classs }))
}

export default actionsWeb

export { setTitle, setScrollViewClass }