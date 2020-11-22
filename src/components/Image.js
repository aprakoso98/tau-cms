import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
import useLongPress from 'src/utils/useLongPress';
import jquery from 'jquery'

const Image = ({ onClick: onClickOverride = () => null, style, canZoom = false, src, ...rest }) => {
	const Web = useSelector(state => state.Web)
	const [isLandscape, setIsLandscape] = useState(false)
	const showHide = (a) => {
		const d = jquery('#root .jquery-preview-image')
		if (typeof a === 'boolean' && a) d.addClass('visible')
		else d.removeClass('visible')
	}
	const onLongPress = () => {
		if (canZoom) {
			const parent = jquery('#root .jquery-preview-image')
			if (parent.length > 0) {
				parent.removeClass('landscape potrait').addClass(isLandscape ? 'landscape' : 'potrait').toggleClass('visible').find('.img-wrapper').html(`<img src="${src}">`)
				// setTimeout(showHide, 2000)
			} else {
				jquery('#root').prepend(`<div class="jquery-preview-image"><div class="img-wrapper"></div>`)
				jquery('.jquery-preview-image').on('click', showHide)
				onLongPress()
			}
		}
	}
	const longPressEvent = useLongPress(onLongPress, onClickOverride)
	useEffect(() => {
		const img = new window.Image()
		img.src = src
		img.onload = () => setIsLandscape(img.naturalHeight < img.naturalWidth)
	}, [src])
	return Web.documentReady ? <LazyLoadImage
		effect="blur"
		{...longPressEvent}
		alt=""
		src={src}
		{...rest} /> : null
}

export default Image