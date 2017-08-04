import {Map} from 'immutable'

const default_state = Map({})

export const loadingStatus = (state = default_state, action) => {
    switch (action.type) {
        case 'FORM_LOADING_TRUE': {
            let updated_state = state

            let namespace = action.namespace
            updated_state = updated_state.set(namespace, true) 

            return updated_state
        }

        case 'FORM_LOADING_FALSE':{
            let updated_state = state

            let namespace = action.namespace
            updated_state = updated_state.set(namespace, false) 

            return updated_state
        }

        default: {
            return state
        }
    }
}