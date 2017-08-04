import {Map} from 'immutable';


const default_state = Map({
    data: Map(),
    columns: Map(),
    filters: Map(),
})

export const table = (state = default_state, action) => {
    switch (action.type) {
        case 'TABLE_DATA_SET': {
            console.log("--- TABLE_DATA_SET ---")
            console.log(action)
            let updated_state = state.set('data', action.data)
            updated_state = updated_state.set('columns', action.data.columns)

            return updated_state
        }
        case 'TABLE_FILTER_SET': {
            console.log('--Table reducer-- SET_TABLE_FILTER')

            let table_filter_state = state.get('table_filter')
            for(let filter of action.table_filter_value) {
                state.setIn(['filters', action.table_filter_value.key, ], map =>
                    map.set({id: filter.valueField, displayName: filter.textField}))
            }
            //console.log(filter_values)
            return state//.merge({table_filter: filter_values})
        }
            // i dont think this is needed; we should just have 2 actions
            // one to set the data and one to set the filter
        case 'FILTER_SET':

            // table_filtered is an object with array of objects property 'filtered'
            // each object represents a different column in the table
            // i.e. for a table with columns 'col1' and 'col2'
            //  table_filtered.filtered -> [obj1, obj2]
            // obj has properties 'id' and 'value'
            // 'id' is the column accessor (defined in the table columns)
            // 'value' is the string used to filter the column
            // TODO - update filter to accept multiple values per column
            state.merge()
            return state.merge({table_filter: action.table_filtered})

        case 'PAGE_GET':
            console.log(action.page_id)
            return state
        default:
            return default_state
    }
}
