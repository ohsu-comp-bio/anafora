import React from 'react'
import RangeContainer from './valueRange'
import FieldWrapper from './fieldWrapper'

import {Row, Col} from 'react-bootstrap'


const ConnectedComponents = (props) => {
  let componentString = props.componentString
  let allowRange = componentString.allowRange || false
  let className = "components-wrapper"
  let showTitle = props.showTitle || false
  let prefix = props.prefix || ''
  let count = 0
  let component = null

  if (allowRange){
    component =
          <Col className="field-title" xs={12} sm={10}>
            <RangeContainer
              key={prefix+"__componentgroup__"+componentString.enumName}
              componentString = {componentString}
              showTitle={showTitle}
              prefix={prefix}
            />
          </Col>
  }
  else {
    component = <FieldWrapper
                  key={prefix+"__component__"+componentString.enumName}
                  componentString={componentString}
                  count={count++}
                  prefix={prefix}
                  showTitle={showTitle}
                  displayName={componentString.displayName}
                />
  }

  return (
    <Row key={componentString.displayName+componentString.id} className={className}>
      {allowRange && showTitle &&
        <Col className="field-title" xs={12} sm={2}>
          <label>{componentString.displayName}</label>
        </Col>
      }

      {component}
    </Row>
  )
}


export default ConnectedComponents
