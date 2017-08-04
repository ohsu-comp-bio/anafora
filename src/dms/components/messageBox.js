import React from 'react'
import {Alert, ListGroup, ListGroupItem} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import * as actionCreators from './actions' //TODO: move this stuff around so its not in all this file


let Message = (props) => {
    const {publicMessage, type/*, internalMessage, operationArea*/} = props

    const messageClassTypes = {
        Debug: 'success',
        Info: 'info',
        Warning: 'warning',
        Error: 'danger',
        Exception: 'danger' 
    }

    return (
        <ListGroupItem bsStyle={messageClassTypes[type]}>
            {type + ": " + publicMessage}
        </ListGroupItem>
    )
}

let MessageBox = (props) => {
    let {messages, messageCount, dismissMessageBoxAction} = props
    let elementCount = 0 //counter for keying individual messages

    return (
        <div className="message-box-wrapper">
            {messages !== undefined && messageCount > 0 ? 
                <Alert id="message-panel"  bsStyle="warning" onDismiss={dismissMessageBoxAction}>
                    <ListGroup className="message-panel-listgroup">
                        {messages.map(messageObject =>
                            <Message {...messageObject} key={"message_"+elementCount++} />
                        )}
                    </ListGroup>
                </Alert>
                :''
            }
        </div>
    )
}

//get form def here
const mapStateToProps = (state) => {
    let messageState = Map(state.messages)

    return {
        messages: messageState.get('messageList'),
        messageCount: messageState.get('messageCount')
    }
};

const mapDispatchToProps = (dispatch)  => {
    return bindActionCreators(
        actionCreators,
        dispatch
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox)