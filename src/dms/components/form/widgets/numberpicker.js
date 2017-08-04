import React from 'react'

import numberLocalizer from 'react-widgets/lib/localizers/simple-number'
import NumberPicker from 'react-widgets/lib/NumberPicker'
import {getObjectKeyValue} from '../../../helperFunctions'

numberLocalizer()


const repeat = (pattern, count) => {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
        if (count & 1) 
        	result += pattern;
        count >>= 1
        pattern += pattern;
    }
    return result + pattern;
}


const determineNumberFormat = (numericScale) => {
	return "#,###."+repeat("0",numericScale)
}


const numberPicker = ({ input, data, ...attributes }) => {
	return (
		<NumberPicker 
            data={data}
			defaultValue={null}
            value = {input.value || null}
			min={attributes.minValue}
			max={attributes.maxValue}
			//step={(Number.isInteger(attributes.numericScale)) ? 1 : 0.1}
			onChange={input.onChange}
			format={determineNumberFormat(attributes.numericScaale || 0)}
            placeholder={getObjectKeyValue(attributes, 'placeholder', '')}
		/>
	);
}


export default numberPicker 