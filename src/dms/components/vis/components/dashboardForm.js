import React from 'react'
import { Form, Button,ButtonToolbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateFilterData } from '../action_creators/action_creators'
import * as actionCreators from '../../../search/actions'
import DashboardWrapper from './dashboardWrapper'
import Spinner from '../../../general/form/components/spinner'
import {Map} from 'immutable'

const formName = 'dashboardForm'

const DashboardForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, isLoading} = props
    const customSpinConfig = {
      lines: 10,
    };  // all configs at http://fgnass.github.io/spin.js/

    let count = 0

    return(
        
        <div className="dashboard-wrapper">
            {isLoading ? '\u00a0' : '' /*hack to fix vertical spacing*/ }
            <Spinner loaded={!isLoading} config={customSpinConfig}>
                <div className="spinner-wrapper-fix">
                {props.component_data.valueSeq().map(element =>
                    <DashboardWrapper
                        {...props}
                        form = {formName+'__' + element.get('component_id') + "--" + element.get('component_type')}
                        element={element}
                        count={count++}
                        key={'dashboard--wrapper__' + element.get('component_id') + "--" + element.get('component_type')}
                    />
                )}
                </div>
            </Spinner> 
            {isLoading ? '\u00a0' : '' /*hack to fix vertical spacing*/ }
        </div>
           
    )
}

const mapStateToProps = (state) => {
    // convert component_data into a structure that can be used
    // directly by the dasboard render() method
    let loadingStatus = Map(state.loadingStatus)

    return {
        data: state.viz.dashboard.get('data'),
        search_id: state.viz.dashboard.get('search_id'),
        component_data: state.viz.dashboard.get('component_data'),
        visualizations: state.viz.dashboard.get('visualizations'),
        isLoading: loadingStatus.get(formName) || false
    }
}
const mapDispatchToProps = (dispatch)  => {
  return bindActionCreators(
      { ...actionCreators, ...updateFilterData },
      dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardForm)
