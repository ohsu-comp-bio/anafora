import React from 'react'
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import FieldWrapper from './fieldWrapper'
import {Row, Col} from 'react-bootstrap'

import {getObjectKeyValue} from '../../../helperFunctions'
import formComponents from './formComponents'


/*
  TODOs:
    -Make value range expect a formName prop
    -Update setRange and stale handlers to use formName prop instead of prefix.split
    -use prefix for field name as currently done
*/
const ValueRange = (props) => {
  const {componentString} = props
  let possibleValues = componentString.possibleValues || null
  let count = 0
  let prefix = props.prefix || ''


  function setRangeValues(data) {
    console.log(data)

    let min = (
      (getObjectKeyValue(data, 'numericValueMin', null) !== null) ? data.numericValueMin :
      (getObjectKeyValue(data, 'dateValueMin', null) !== null) ? data.dateValueMin :
      null
    )

    let max = (
      (getObjectKeyValue(data, 'numericValueMax', null) !== null) ? data.numericValueMax :
      (getObjectKeyValue(data, 'dateValueMax', null) !== null) ? data.dateValueMax :
      null
    )

    let [formName, modelName] = prefix.split('__')

    props.onConnectedLookupChange(formName, prefix + "__" + componentString.enumName + '__1', min)
    props.onConnectedLookupChange(formName, prefix + "__" + componentString.enumName + '__0', max)
  }


  function indicateStaleDropdown() {
      // extract the namespace from the prefix
      let formName = null
      if (/searchForm/.test(prefix)) {
          formName= prefix.split('__')[0]
      } else if (/dashboardForm/.test(prefix)) {
          formName = prefix
      }

    props.onRangeValueChange(formName, prefix+"__"+componentString.enumName+"__lookup")
  }


  let vf = null, attribs = null
  if (possibleValues !== null) {
      vf = {valueField : "id", textField: "displayName"}
      attribs = Object.assign(vf, componentString)
  }

  //TODO: Fix for xs
  return (
    <Row>
      { (possibleValues !== null) ?

        <Col xs={12}>
        <Field
          key={prefix+"__"+componentString.id+componentString.enumName+"__lookup"}
          name={prefix+"__"+componentString.enumName+"__lookup"}
          component={formComponents["LOOKUP"]}
          data={componentString.possibleValues}
          attributes={attribs}
          onChange={data => {
            setRangeValues(data)
          }}
        />
        </Col>
        : null
      }
      <Col className="field-title range-pull-left" xs={12} sm={6} >
        <Row>
          <Col xs={12}>
            <FieldWrapper
              key={prefix+"__component__"+componentString.enumName+"__"+count}
              componentString={componentString}
              showTitle={false}
              count={count++}
              onChange={data => {
                indicateStaleDropdown(data)
              }}
              placeholder="From"
              prefix={prefix}
            />
          </Col>
          {/*<Col xs={11} xsOffset={1}>
            <label className="value-range-hint">From</label>
          </Col>*/}
        </Row>
      </Col>
      <Col className="field-title range-pull-right" xs={12} sm={6} >
        <Row>
          <Col xs={12}>
            <FieldWrapper
              key={prefix+"__component__"+componentString.enumName+"__"+count}
              componentString={componentString}
              showTitle={false}
              count={count++}
              onChange={data => {
                indicateStaleDropdown(data)
              }}
              placeholder="To"
              prefix={prefix}
            />
          </Col>

          {/*<Col xs={11} xsOffset={1}>
            <label className="value-range-hint">To</label>
          </Col>*/}
        </Row>
      </Col>
    </Row>
  )
}


const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch)  => {
    return {
      onConnectedLookupChange: (namespace, field, value) => {
        dispatch(change(namespace, field, value))
      },
      onRangeValueChange: (namespace, field) => {
        dispatch(change(namespace, field, null))
      }
    }
};

const RangeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ValueRange);


export default RangeContainer
