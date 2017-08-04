import React from 'react'

import Multiselect from 'react-widgets/lib/Multiselect'
import {getObjectKeyValue} from '../../../helperFunctions'


const multiSelect = ({ input, data, attributes }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField = {getObjectKeyValue(attributes, 'valueField', "id")}
    textField = {getObjectKeyValue(attributes, 'textField', "displayName")}
    placeholder={getObjectKeyValue(attributes, 'placeholder', '')}
  />


export default multiSelect
