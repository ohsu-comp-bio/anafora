import React from 'react'

import {getObjectKeyValue} from '../../../helperFunctions'

const textStyle = {
    display: 'block',
    width: '100%',
    height: '34px',
    padding: '6px 12px',
    color: '#555555',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
    outline: 0
}


const text = ({ input: { onChange, value }, attributes }) =>
    <input type="text"
        onChange={onChange}
        value={!value ? '' : value}
        style={textStyle}
        className="rw-focusblur"
        placeholder={getObjectKeyValue(attributes, 'placeholder', '')}
    />

export default text