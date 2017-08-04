
// issue server request to get data
export const requestQueryData = (query_id) => {
    return {
        type: 'REQUEST_QUERY_DATA',
        query_id
    }
}

// after requestSearchData has returned,
export const processQueryData = (data) => {
    return {
        type: 'PROCESS_QUERY_DATA',
        data
    }
}

export const updateFilterData = (dashboard_filter, component_type, component_name, data_name) => {
    return {
        type: 'UPDATE_DASHBOARD_FILTER',
        dashboard_filter,
        component_name,
        component_type,
        data_name
    }
}

export const applySearchResult = (searchTermId) => {
    return {
        type: 'SEARCH_RESPONSE_FILTERS',
        searchTermId
    }
}

export const getSearchModels = (searchId, models) => {
    return {
        type: 'GET_SEARCH_MODELS',
        searchId: searchId,
        models: models
    }
}
