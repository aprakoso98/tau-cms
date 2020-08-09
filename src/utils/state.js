const stateObject = (val, set) => {
	return value => set({ ...val, ...value })
}

export default stateObject 