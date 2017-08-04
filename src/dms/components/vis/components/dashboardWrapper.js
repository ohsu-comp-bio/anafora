import React from 'react'
import { FormSection } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Form, Panel, Col, Button, ButtonToolbar} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import { updateFilterData } from '../action_creators/action_creators'
import * as actionCreators from '../../../search/actions'

// Generic wrapper for visualization components to render inside the dashboard
const submit = (values, formName, submitAction) => {
    submitAction(values, formName)
}

var componentName = ""
let DashboardWrapper = (props) => {
    const { element, count, handleSubmit, submitAction, reset, pristine, submitting} = props
    componentName = 'dashboardForm__' + element.get('component_id') + '--' + element.get('component_type')
    return (
        <div className='dashboard-component row' key={'dashboard--component__' + componentName}>
            <Form key={componentName}
            name={componentName}
            id={componentName}
            onSubmit={handleSubmit(fields => submit(fields, componentName, submitAction))}>
                <Col xs={12}>
                    <ButtonToolbar className="form-btn-wrapper">
                        <Button type="submit" bsStyle="primary" bsSize="small" disabled={pristine || submitting}>
                          Submit
                        </Button>
                        <Button type="reset" bsStyle="default" bsSize="small" disabled={pristine || submitting}
                            onClick={reset}>
                          Reset Values
                        </Button>
                    </ButtonToolbar>
                    <Panel bsStyle="default" header={element.get('component_name')}>
                         {React.createElement(
                             element.get('component'),
                             {
                                 key:element.get('component_name'),
                                 component_type:element.get('component_type'),
                                 component_name:componentName,
                                 component_id:element.get('component_id')
                             }
                         )}
                    </Panel>
                </Col>
            </Form>
        </div>
    )

}

DashboardWrapper = reduxForm({
})(DashboardWrapper)

export default DashboardWrapper
