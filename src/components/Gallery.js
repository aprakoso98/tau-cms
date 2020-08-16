import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'src/components/Container';
const Gallery = ({
	data,
	renderItem,
	numColumns,
	style,
	rowStyle,
	scrollable
}) => {
	const generateData = data => {
		let index = -1
		data = data.reduce((arr, a, i) => {
			if (i % numColumns === 0) {
				index++
				arr.push([a])
			} else {
				arr[index].push(a)
			}
			return arr
		}, [])
		return data.map(r => {
			if (r.length < numColumns) {
				r = [...r, ...Array.generateEmpty(numColumns - r.length, true).map(() => "~")]
			}
			return r
		})
	}
	const styleRow = (arr, i) => {
		if (typeof rowStyle === 'function') {
			return rowStyle({ item: arr, index: i, i })
		}
		return rowStyle
	}
	const render = (arr, i) => {
		return <View flex direction="row" style={{ ...styleRow(arr, i) }}>
			{arr.rMap((item, i) => {
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
		return <ScrollView>
			{generateData(data).rMap(render)}
		</ScrollView>
	return <View style={style}>
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