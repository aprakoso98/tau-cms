import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'src/components/Container';
const Gallery = ({
	className = "",
	data,
	renderItem,
	numColumns,
	style,
	rowStyle,
	scrollable
}) => {
	const generateData = data => {
		let index = -1
		return data.reduce((arr, a, i) => {
			a = {
				index: i,
				item: a
			}
			if (i % numColumns === 0) {
				index++
				arr.push([a])
			} else {
				arr[index].push(a)
			}
			return arr
		}, [])
	}
	const styleRow = (arr, i) => {
		if (typeof rowStyle === 'function') {
			return rowStyle({ item: arr, index: i, i })
		}
		return rowStyle
	}
	const render = (arr, i) => {
		return <View flex direction="row" style={{ ...styleRow(arr, i) }}>
			{arr.rMap(({ item, index: i }) => {
				const render = renderItem({ item, i, index: i })
				if (item === '~')
					return <View flex {...render.props} > </View>
				return cloneElement(render, {
					style: render.props.style,
					flex: true
				})
			})}
		</View>
	}
	if (scrollable)
		return <ScrollView className={className}>
			{generateData(data).rMap(render)}
		</ScrollView>
	return <View style={style} className={className}>
		{generateData(data).rMap(render)}
	</View>
}

Gallery.defaultProps = {
	data: [],
	numColumns: 1
}

Gallery.propTypes = {
	rowStyle: PropTypes.object,
	style: PropTypes.object,
	data: PropTypes.array.isRequired,
	renderItem: PropTypes.func.isRequired,
	numColumns: PropTypes.number
}

export default Gallery