import React from 'react'

import SelectList from 'react-widgets/lib/SelectList'
import {getObjectKeyValue} from '../../../helperFunctions'


const selectList = ({ input, data, attributes }) =>
    <SelectList {...input}
        onBlur={() => input.onBlur()}
        data={data}
        placeholder={getObjectKeyValue(attributes, 'placeholder', '')}
    />


export default selectList;