import React from 'react'
import { Field } from 'redux-form'
import {Col} from 'react-bootstrap'

import formComponents from './formComponents'


const getBaseFieldComponentType = (componentString) => {
  const enumName = componentString.filterType  || null
  const allowMultiple = componentString.allowMultiple || false

  switch (enumName) {
    case "LOOKUP":
      if (allowMultiple)
        return formComponents["MULTISELECT"]
      else
        return formComponents[enumName] || null
    default:
      return formComponents[enumName] || null
  }
}


//TODO: Fix for xs layout
const FieldWrapper = (props) => {
  const {componentString, count, onChange} = props
  let titleOverride = props.displayName || null
  let prefix = props.prefix || ''
  let placeholderText = props.placeholder || ''

  const componentType = getBaseFieldComponentType(componentString)

  let smWidthField = (props.showTitle !== false) ? 10 : 12

  //TODO: extract the row and col out into another component. It's too coupled to the various components right now.
  return (
    <div className="field-wrapper" key={componentString.id+"-wrapper-"+count}>
      { (props.showTitle !== false) ?
        <Col xs={12} sm={2} >
          <label>{(titleOverride !== null) ? titleOverride : componentString.displayName}</label>
        </Col>
      : ''}

      <Col xs={12} sm={smWidthField} >
        <Field
          key={prefix+"__"+componentString.id+componentString.enumName+"__"+count}
          name={prefix+"__"+componentString.enumName+"__"+count}
          component={componentType}
          //data={getBaseFieldData(componentString.possibleValues, componentString.dataType.displayName)}
          data={componentString.possibleValues || null}
          attributes={componentString}
          onChange={onChange}
          placeholder={placeholderText}
        />
      </Col>
    </div>
  )
}


export default FieldWrapper
