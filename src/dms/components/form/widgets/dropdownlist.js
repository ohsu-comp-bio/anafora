import React from 'react'

import DropdownList from 'react-widgets/lib/DropdownList'
import {getObjectKeyValue} from '../../../helperFunctions'


const dropdownList = ({ input, data, attributes}) => (
    <DropdownList {...input}
        data={data}
        valueField = {getObjectKeyValue(attributes, 'valueField', "id")}
        textField = {getObjectKeyValue(attributes, 'textField', "displayName")}
        placeholder={getObjectKeyValue(attributes, 'placeholder', '')}
        onChange={input.onChange}
    />
)


export default dropdownList