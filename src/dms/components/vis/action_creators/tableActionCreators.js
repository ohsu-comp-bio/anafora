export const getPage = (page_id) => {
    return {
        type: 'GET_PAGE',
        page_id
    }
}

export const setData = (data) => {
    return {
        type: 'TABLE_DATA_SET',
        data
    }
}
