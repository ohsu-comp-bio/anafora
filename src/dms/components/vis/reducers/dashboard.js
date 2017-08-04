import {Map} from 'immutable'
import {getDashboardObject} from '../../../helperFunctions'


const default_state = Map({
    search_id: undefined,
    models: {
        ResultParticipants: {
            objectType: 'PARTICIPANT',
            format: 'TABULAR',
            displayName: 'Result Participants'
        },
        ResultSpecimens: {
            objectType: 'SPECIMEN',
            format: 'TABULAR',
            displayName: 'Result Specimens'
        },
        ResultTreatments: {
            objectType: 'TREATMENT',
            format: 'TABULAR',
            displayName: 'Result Treatments'
        }
    },
    component_data: Map()
})


// transform filter data from UI components to a
// standard filter object to send to server
// standard object template:
// component_name: [ {data_name: [values] } ]
// i.e.
// search_table: [ {optr: [1001, 1002]}, {gender: [male]} ]

const extractDashboardFilter = (action) => {
    switch (action.component_type) {
        case 'grid':
            let keys = []
            for (let filter of action.dashboard_filter) {
                keys.push(filter.id)
            }
            return keys

        default:
            return null
    }
}

// provide a mapping between sever format and react component types
const getDisplayType = (type) => {
    switch (type) {
        case 'TABULAR':
            return 'GRID'
        default:
            return
    }
}
const getComponentData = (element, type) => {
    switch (type) {
        case 'GRID':
            return Map({columns: element.columns || [], data: element.data || []})
        default:
            return Map()
    }
}

const processModels = (action, state) => {
    let updated_state = state
    if (action.data.searchTermID !== undefined)  { // or null?
        //let resp_data = action.response.reults || []
        let resp_data = action.data.results
        let dashboardModels = state.get('models')

        for (let index in resp_data) {
            let respModel = resp_data[index]
            let id = respModel.clientID
            let dashboardModel = dashboardModels[id]
            let displayType = getDisplayType(dashboardModel.format)
            //let data = getComponentData(result, displayType)
            let displayName = dashboardModel.displayName
            updated_state = updated_state.setIn(['component_data', id],
                Map({
                    component : getDashboardObject(displayType),
                    data: getComponentData(respModel, displayType),
                    component_name: displayName,
                    component_type: displayType,
                    component_id: id
                })
            )
        }

    }
    return updated_state
}

const processFilters = (action, state) => {
    let updated_state = state
    if (action.searchTermId !== undefined)  {
        updated_state = updated_state.set('search_id', action.searchTermId)
    }

    return updated_state
}

export const dashboard = (state = default_state, action) => {
    switch (action.type) {
        // wrap case statements in {} https://github.com/airbnb/javascript/blob/master/README.md#comparison--switch-blocks
        // to be called after REQUEST_QUERY_DATA returns
        // manipulate response data into format required for dashboard components
        case 'PROCESS_QUERY_DATA': {
            return processModels(action, state)
        }
        // called from UI events on dashboard components
        // on return, a saga will call REQUEST_QUERY_DATA to send the filters to the server
        // and get new data
        case 'UPDATE_DASHBOARD_FILTER': {
            return state.setIn(['dashboard_filter', action.component_name, action.data_name], extractDashboardFilter(action))
        }

        case 'SEARCH_RESPONSE_FILTERS': {
            return processFilters(action, state)
        }

        default: {
            return state
        }
    }
}
