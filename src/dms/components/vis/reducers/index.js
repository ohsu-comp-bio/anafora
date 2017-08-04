import {combineReducers} from 'redux'
import {table} from './table'
import {dashboard} from './dashboard'

export const visReducer = combineReducers({
    table,
    dashboard,
})
