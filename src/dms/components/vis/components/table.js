import React from 'react'
import ReactTable from 'react-table'
import Multiselect from 'react-widgets/lib/Multiselect'

const Table = props => {
    const {data, columns, component_name} = props
    return(
        <ReactTable {...props}
            data={data}
            columns={columns}
            key={component_name + "__table"}
            className="-striped -highlight"
        />
    )
}

export default Table
