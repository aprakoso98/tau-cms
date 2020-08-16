import React, { useEffect } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { View } from 'src/components/Container';

const International = ({ location }) => {
	const getData = async () => { }
	useEffect(() => {
		getData()
		setTitle(location.state.title)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])

	return <View flex>
		
	</View>
}

export default International