import React, { useEffect, useState } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { getBanner, FILE_PATH, updateBanner, changeOrder } from '../../../utils/api';
import Gallery from 'src/components/Gallery';
import Button, { ButtonOpacity } from 'src/components/Button';
import FileUpload from 'src/components/FileUpload';
import { View } from 'src/components/Container';
import Modal from '../../../components/Modal';
import DragSortableList from 'react-drag-sortable'

const Banner = () => {
	const [bannerMobile, setBannerMobile] = useState([])
	const [bannerWeb, setBannerWeb] = useState([])
	const getData = async () => {
		const { data: bannerMobile } = await getBanner({ isMobile: true })
		const { data: bannerWeb } = await getBanner({ isMobile: false })
		setBannerWeb(bannerWeb)
		setBannerMobile(bannerMobile)
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
	const renderBanner = (banners, isMobile) => {
		return banners.map(({ isForBanner, id, image }) => {
			return {
				id,
				classes: ['w-1/4'],
				content: <div className="o-h h-30 p-1 relative">
					<div style={{ zIndex: 99, right: 0, top: 0 }} className="flex absolute bc-dark p-1 pr-3 pl-3">
						{isForBanner === '0' && <ButtonOpacity onClick={() => uploadFile({ id, isMobile })} className="mr-2">
							<i className="ion-checkmark-round c-light" />
						</ButtonOpacity>}
						<ButtonOpacity onClick={() => {
							const confirm = window.confirm('Yakin hapus file ini?')
							if (confirm) {
								uploadFile({ id, delete: true })
							}
						}}>
							<i className="ion-trash-a c-light" />
						</ButtonOpacity>
					</div>
					<img className="w-auto h-auto" alt="" src={FILE_PATH + image} />
				</div>
			}
		})
	}
	const onSort = async (sortedList) => {
		const idSortedList = sortedList.reduce((ret, { id, rank }) => {
			ret[id] = rank
			return ret
		}, {})
		await changeOrder({ target: 'banner', order: idSortedList })
	}
	return <>
		{[bannerWeb, bannerMobile].rMap(banner => {
			const isMobile = banner === bannerMobile ? true : false
			return <>
				<div className="flex ai-c jc-sb">
					<div>{isMobile ? 'Banner Mobile' : 'Banner Web'}</div>
					<View direction="row">
						<FileUpload
							toBase64
							multiple
							onChange={files => {
								const data = Array.isArray(files) ? files : [files]
								uploadFile({ data, isMobile })
							}}
						>
							<div className="mt-3 mb-3 brd-1 p-1 pr-3 pl-3 bc-blue c-light ai-c flex flex-row">
								<i className="mr-2 ion-plus-circled f-5" />
								<div>Tambah</div>
							</div>
						</FileUpload>
					</View>
				</div>
				<DragSortableList
					items={renderBanner(banner, isMobile)}
					dropBackTransitionDuration={0.3}
					onSort={onSort}
					type="grid"
					placeholder={<div className="bc-grey h-full w-full p-5 ta-c ai-c jc-c">Drop here</div>}
				/>
			</>
		})}
	</>
}

export default Banner