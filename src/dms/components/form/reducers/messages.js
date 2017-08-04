import {Map} from 'immutable'

const default_state = Map({})

export const messages = (state = default_state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE': {
            let updated_state = state

            if (action.message !== undefined && action.message !== null) { // or null?
                let currentMessages = state.get('messageList')
                let messageCount = state.get('messageCount')

                if (currentMessages === undefined || currentMessages.length === 0) {
                    currentMessages = [] 
                }
                currentMessages.push(action.message)

                messageCount = currentMessages.length

                updated_state = updated_state.set('messageList', currentMessages)
                updated_state = updated_state.set('messageCount', messageCount)

                return updated_state
            }

            return state
        }

        case 'DISMISS_MESSAGE_BOX':{
            let updated_state = state

            updated_state = updated_state.delete('messageList')
            updated_state = updated_state.set('messageCount', 0)

            return updated_state
        }

        default: {
            return state
        }
    }
}