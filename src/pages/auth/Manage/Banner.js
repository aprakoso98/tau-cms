import React, { useEffect, useState } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { getBanner, FILE_PATH, updateBanner } from '../../../utils/api';
import Gallery from 'src/components/Gallery';
import { ButtonOpacity } from 'src/components/Button';
import FileUpload from 'src/components/FileUpload';

const Banner = props => {
	const [banner, setBanner] = useState([])
	const getData = async () => {
		const { data } = await getBanner()
		setBanner(data)
	}
	const uploadFile = async params => {
		const { data: resp } = await updateBanner(params)
		alert(resp)
		getData()
	}
	useEffect(() => {
		setTitle('Banner')
		getData()
	}, [])
	return <>
		<FileUpload
			toBase64
			multiple
			onChange={files => {
				const data = Array.isArray(files) ? files : [files]
				uploadFile({ data })
			}}
		><i className="ion-plus-circled f-10" /></FileUpload>
		<Gallery
			scrollable
			data={banner}
			numColumns={4}
			renderItem={({ item: { isForBanner, id, image } }) => <div className="o-h h-30 w-1/4 p-1 relative">
				{isForBanner === '0' && <div style={{ zIndex: 99, right: 0, top: 0 }} className="flex absolute bc-dark p-1 pr-3 pl-3">
					<ButtonOpacity onClick={() => uploadFile({ id })} className="mr-2"><i className="ion-checkmark-round c-light" /></ButtonOpacity>
					<ButtonOpacity onClick={() => uploadFile({ id, delete: true })}><i className="ion-trash-a c-light" /></ButtonOpacity>
				</div>}
				<img className="w-auto h-auto" alt="" src={FILE_PATH + image} />
			</div>}
		/>
	</>
}

export default Banner