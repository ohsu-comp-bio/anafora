import {Map} from 'immutable'

const default_state = Map({})

export const formDefs = (state = default_state, action) => {
    switch (action.type) {
        case 'ADD_FORM_DEF': {
            let updated_state = state

            if (action.data !== undefined && action.data !== null) { // or null?
                updated_state = updated_state.set(action.namespace, Object.assign(action.data, {modelName: action.modelName}))
            }

            return updated_state
        }

        default: {
            return state
        }
    }
}