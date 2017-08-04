import { connect } from 'react-redux'
import DashboardForm from '../components/dashboardForm'
import {updateFilterData} from '../action_creators/action_creators'

const mapStateToProps = (state) => {
    // convert component_data into a structure that can be used
    // directly by the dasboard render() method
    return {
        data: state.viz.dashboard.get('data'),
        search_id: state.viz.dashboard.get('search_id'),
        component_data: state.viz.dashboard.get('component_data'),
        visualizations: state.viz.dashboard.get('visualizations')
    }
}

 const mapDispatchToProps = (dispatch) => {
    return {
        updateFilterData: (filter, component_type, component_name, data_name) => {
            dispatch(updateFilterData(filter, component_type, component_name, data_name))
        }
    }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardForm)

export default DashboardContainer
