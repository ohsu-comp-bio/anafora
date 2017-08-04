import React from 'react'

import Combobox from 'react-widgets/lib/Combobox'
import {getObjectKeyValue} from '../../../helperFunctions'


const comboBox = ({ input, data, attributes }) =>
  <Combobox {...input}
    data={data}
    valueField = {getObjectKeyValue(attributes, 'valueField', "id")}
    textField = {getObjectKeyValue(attributes, 'textField', "displayName")}
    placeholder={getObjectKeyValue(attributes, 'placeholder', '')}
    onChange={input.onChange}
  />

export default comboBox 