import { connect } from 'react-redux'
import Table from '../components/table'
import {getPage, setData} from '../action_creators/tableActionCreators'
import {updateFilterData} from '../action_creators/action_creators'
import {getTableData} from '../selectors/table'

const mapStateToProps = (state, ownProps) => {
    let data = getTableData(state, ownProps)
    return {
        data: data.data,
        columns: data.columns,
        display_name: ownProps.display_name,
        component_name: ownProps.component_name,
    }
}

const TableContainer = connect(
  mapStateToProps
)(Table)

export default TableContainer
