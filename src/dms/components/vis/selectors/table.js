import { createSelector } from 'reselect'
import moment from 'moment'
import React from 'react'
import { getConnectedComponents } from '../../../helperFunctions'
import ConnectedComponents from '../../form/components/connectedComponents'
import Multiselect from 'react-widgets/lib/Multiselect'
import {toJS} from 'immutable'

const getData = (state, props) => state.viz.dashboard.get('component_data').get(props.component_id).get('data').get('data') || null
const getColumns = (state, props) => state.viz.dashboard.get('component_data').get(props.component_id).get('data').get('columns') || null
const getId = (state, props) => props.component_id || null
const getDisplayName = (state, props) => props.component_name || null

const getSortMethod = (val)  => {
    switch(val.type) {
        case ('date'): {
            return ((a, b) => {
                    if (a === b) {
                      return 0
                    }
                    return moment(a).isBefore(b) ? 1 : -1
                })
        }
        default:
            return null
    }
}

// convert server data to react_table grokable columns
export const getTableData = createSelector(
    [getData, getColumns, getId, getDisplayName], (data, columns, id, displayName) => {
        let rt_columns = []
        if (data !== null && columns !== null) {
            columns.forEach(function(val, index) {

                let col = {
                    Header: val.displayName || null,
                    accessor: val.propName_ForDisplay || null,
                    id: val.propName_ForID || null,
                    type: val.filterType || null,
                    filterable: val.filterType ? true : false,
                    sortable: val.propName_ForSort || null,
                    possibleValues: val.possibleValues || [],
                    Filter: <ConnectedComponents componentString={val} prefix={displayName} key={"tableFilter-"+id+"-"+val.displayName+index} />
                }
                let sortMethod = getSortMethod(val)
                if (sortMethod) {
                    col['sortMethod'] = sortMethod
                }

                rt_columns.push(col)
            })
            
            return {
                data: data,
                columns: rt_columns,
            }
        }

        return null
    }
)
