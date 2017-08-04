import React from 'react'
import Calendar from 'react-widgets/lib/Calendar'
import {getObjectKeyValue} from '../../../helperFunctions'

//import moment from 'moment'
//import momentLocaliser from 'react-widgets/lib/localizers/moment'

const divStyle = {
	width: '350px'
}

const calendar = ({ input: { onChange, value }, attributes }) =>
  <Calendar
  	style={divStyle}
  	onChange={onChange}
    footer={attributes.showFooter || false}
    value={!value ? null : new Date(value)}
    placeholder={getObjectKeyValue(attributes, 'placeholder', '')}
  />

export default calendar