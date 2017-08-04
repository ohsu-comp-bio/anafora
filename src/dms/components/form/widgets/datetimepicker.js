import React from 'react'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocaliser from 'react-widgets/lib/localizers/moment'

import {getObjectKeyValue} from '../../../helperFunctions'

momentLocaliser(moment)


const dateTimePicker = ({ input: { onChange, value }, data, ...rest }) => {

	return (
	  <DateTimePicker
	    onChange={onChange}
	    editFormat={'MM-DD-YYYY'}
	    format={'MM-DD-YYYY'}
	    time={getObjectKeyValue(rest.attributes, 'includeTime', true)}
	    value={!value ? null : new Date(value)}
	    placeholder={getObjectKeyValue(rest, 'placeholder', '')}
	  />
  )
}

export default dateTimePicker
