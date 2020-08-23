import React, { useEffect } from "react"
import JoditEditor from "jodit-react"
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from "src/redux/actions/web";
import Button from "src/components/Button";

const Kemahasiswaan = ({ match, location }) => {
	const Web = useSelector(state => state.Web)
	const dispatch = useDispatch()
	useEffect(() => {
		setTitle('Kemahasiswaan')
	}, [location])
	return <>
		<JoditEditor
			value={Web.kemahasiswaan}
			onBlur={e => console.log(e.target.innerHTML)}
		/>
		<Button className="as-fe">Submit</Button>
	</>
}

export default Kemahasiswaan