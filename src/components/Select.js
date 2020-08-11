import React, { useState } from 'react';
import { View } from './Container';
import { ButtonOpacity } from 'src/components/Button';

const Select = ({ onSelect = () => { }, value = "", render = () => { }, data }) => {
	const [visible, setVisible] = useState(false)
	return <ButtonOpacity flex="" justify="fs" direction="col" onClick={() => setVisible(!visible)}>
		<View className="w-full b-1 p-3 ai-c" justify="sb" direction="row">
			{value}
			<i className={`fa ml-5 fa-chevron-${visible ? 'up' : 'down'}`} />
		</View>
		<View style={!visible ? { display: 'none' } : {}} className="w-full relative">
			<View style={{ top: -1 }} className="p-5 bc-light b-1 absolute w-full b-bblrd-5 b-bbrrd-5">
				{data.rMap((item, i) => <ButtonOpacity justify="fs" onClick={() => {
					setVisible(false)
					onSelect({ item, i, index: i })
				}}>
					{render({ item, i, index: i })}
				</ButtonOpacity>)}
			</View>
		</View>
	</ButtonOpacity>
}

export default Select