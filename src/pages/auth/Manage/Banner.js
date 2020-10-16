import React, { useEffect, useState } from 'react';
import { setTitle } from 'src/redux/actions/web';
import { getBanner, FILE_PATH, updateBanner, changeOrder } from '../../../utils/api';
import { ButtonOpacity } from 'src/components/Button';
import FileUpload from 'src/components/FileUpload';
import { View } from 'src/components/Container';
import DragSortableList from 'react-drag-sortable'
import { Input } from 'src/components/Input';

const Banner = () => {
	const [bannerMobile, setBannerMobile] = useState([])
	const [bannerWeb, setBannerWeb] = useState([])
	const getData = async () => {
		const { data: bannerMobile } = await getBanner({ all: true, isMobile: true })
		const { data: bannerWeb } = await getBanner({ all: true, isMobile: false })
		setBannerWeb(bannerWeb)
		setBannerMobile(bannerMobile)
	}
	const changeBannerData = async params => {
		await updateBanner(params)
		// alert(data)
		getData()
	}
	useEffect(() => {
		setTitle('Banner')
		getData()
	}, [])
	const renderBanner = (banners, isMobile) => {
		return banners.map(({ visible, link, isForBanner, id, image }) => {
			visible = visible === '1'
			return {
				id,
				classes: ['w-1/4 p-1'],
				content: <>
					<div className="relative">
						<div style={{ zIndex: 99, right: 0, top: 0 }} className="flex absolute bc-dark p-1 pr-3 pl-3">
							{isForBanner === '0' && <ButtonOpacity title="Set for individual banner" onClick={() => changeBannerData({ id, isMobile })} className="mr-2">
								<i className="ion-checkmark-round c-light" />
							</ButtonOpacity>}
							{id && <ButtonOpacity title="Hide/unhide banner" onClick={() => changeBannerData({ id, visible: visible ? '0' : '1' })} className="mr-2">
								<i className={`${visible ? 'ion-eye' : 'ion-eye-disabled'} c-light`} />
							</ButtonOpacity>}
							<ButtonOpacity title="Delete banner" onClick={() => {
								const confirm = window.confirm('Yakin hapus file ini?')
								if (confirm) {
									changeBannerData({ id, delete: true })
								}
							}}>
								<i className="ion-trash-a c-light" />
							</ButtonOpacity>
						</div>
						<div>
							<div className={`${visible ? '' : 'opacity-1/2'} bc-grey-soft o-h h-35`}>
								<img className="w-auto h-auto" alt="" src={FILE_PATH + image} />
							</div>
							<Input placeholder="Forward Link" className="w-full mt-2" onBlur={({ target: { value } }) => changeBannerData({ id, link: value })} value={link} />
						</div>
					</div>
				</>
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
								changeBannerData({ data, isMobile })
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